'use server';

import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { requireUser, requireDealer, requireAdmin } from '@/lib/serverAuth';
import { STORE_ID } from '@/lib/supabaseData';
import { loadIdentities } from '@/lib/orderIdentities';
import {
  mapOrderRow,
  mapOrderMessageRow,
  mapDisputeRowForBuyer,
  mapDisputeRowForAdmin,
  deriveOrderStatus,
} from '@/lib/orderShaping';
import { isValidEscrowTransition } from '@/lib/escrowConstants';
import { getProductPricing } from '@/lib/productMerchant';

async function shapeRows(rows) {
  const ids = rows.flatMap(r => [r.buyer_user_id, r.dealer_user_id]);
  const identities = await loadIdentities(ids);
  return rows.map(r => mapOrderRow(r, { identities }));
}

// Newest 'justification_request' message counts only if it's newer than the
// newest 'payment_sent' — self-clears once the buyer re-uploads proof, no
// field to manually reset. Uses select('*') and reads m.kind defensively:
// if the order_messages.kind/subject migration hasn't landed yet, m.kind is
// just undefined for every row and this safely returns null.
async function loadJustificationMessage(orderId) {
  const { data } = await supabaseAdmin
    .from('order_messages')
    .select('*')
    .eq('order_id', orderId)
    .order('created_at', { ascending: false })
    .limit(20);
  const rows = data || [];
  const lastJustification = rows.find(m => m.kind === 'justification_request');
  if (!lastJustification) return null;
  const lastPaymentSent = rows.find(m => m.kind === 'payment_sent');
  if (lastPaymentSent && new Date(lastPaymentSent.created_at) > new Date(lastJustification.created_at)) return null;
  return lastJustification.message;
}

async function shapeOrderDetail(row) {
  const [justificationMessage, identities] = await Promise.all([
    loadJustificationMessage(row.id),
    loadIdentities([row.buyer_user_id, row.dealer_user_id]),
  ]);
  return mapOrderRow(row, { justificationMessage, identities });
}

// ============================================================================
// Buyer
// ============================================================================

export async function getMyOrders({ limit = 50 } = {}) {
  const user = await requireUser();
  const { data, error } = await supabaseAdmin
    .from('orders')
    .select('*')
    .eq('store_id', STORE_ID)
    .eq('buyer_user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) throw new Error(error.message);
  return shapeRows(data || []);
}

export async function getMyOrder(orderId) {
  const user = await requireUser();
  const { data, error } = await supabaseAdmin
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .eq('store_id', STORE_ID)
    .eq('buyer_user_id', user.id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) return null;
  return shapeOrderDetail(data);
}

export async function createOrder({ productId, shippingDetails, idempotencyKey }) {
  const user = await requireUser();

  const { data: existing } = await supabaseAdmin
    .from('orders')
    .select('*')
    .eq('store_id', STORE_ID)
    .eq('idempotency_key', idempotencyKey)
    .maybeSingle();
  if (existing) return { ok: true, order: await shapeOrderDetail(existing) };

  const { data: product, error: productError } = await supabaseAdmin
    .from('products')
    .select('*, brands(name)')
    .eq('id', productId)
    .eq('store_id', STORE_ID)
    .maybeSingle();
  if (productError || !product) return { ok: false, error: 'This watch is no longer available.' };
  if (product.status !== 'active') return { ok: false, error: 'This watch is no longer available for purchase.' };
  if ((product.stock_quantity ?? 0) < 1) return { ok: false, error: 'This watch has already sold.' };

  const attrs = product.attributes || {};
  // Recompute from the fresh, tenant-scoped database row, never a client total.
  const pricing = getProductPricing({ price: product.price, salePrice: product.sale_price, currency: product.currency });
  if (pricing.price == null || !pricing.currency) return { ok: false, error: 'This watch does not currently have a valid purchase price. Please contact us.' };
  const price = pricing.price;
  const lineItem = {
    product_id: product.id,
    title: product.name,
    brand: product.brands?.name || '',
    condition: attrs['Condition'] || '',
    price,
    currency: pricing.currency,
    image: Array.isArray(product.images) ? product.images[0] : null,
    quantity: 1,
  };

  const row = {
    store_id: STORE_ID,
    buyer_user_id: user.id,
    dealer_user_id: product.dealer_id || null,
    products: [lineItem],
    total_amount: price,
    currency: pricing.currency,
    // orders.payment_method is NOT NULL on the live table. Originally this
    // was meant to stay unset until the buyer picks a method once the
    // dealer accepts — but with crypto deferred, bank_transfer is the only
    // option anyway, so default to it here rather than blocking on a
    // schema change. Revisit (make it nullable, or let this be a real
    // choice again) if/when crypto payments come back.
    payment_method: 'bank_transfer',
    escrow_status: 'pending_review',
    shipping_status: 'not_shipped',
    shipping_address: shippingDetails,
    idempotency_key: idempotencyKey,
  };

  const { data: created, error } = await supabaseAdmin.from('orders').insert(row).select().single();
  if (error) {
    if (error.code === '23505') {
      const { data: raced } = await supabaseAdmin
        .from('orders').select('*').eq('store_id', STORE_ID).eq('idempotency_key', idempotencyKey).maybeSingle();
      if (raced) return { ok: true, order: await shapeOrderDetail(raced) };
    }
    return { ok: false, error: error.message };
  }

  // Save this as the buyer's default shipping profile for next time.
  await supabaseAdmin.from('customers').upsert(
    { store_id: STORE_ID, clerk_user_id: user.id, shipping_address: shippingDetails, updated_at: new Date().toISOString() },
    { onConflict: 'store_id,clerk_user_id' }
  );

  return { ok: true, order: await shapeOrderDetail(created) };
}

export async function selectPaymentMethod(orderId, paymentMethod) {
  const user = await requireUser();
  if (!['bank_transfer', 'crypto'].includes(paymentMethod)) return { ok: false, error: 'Invalid payment method.' };

  const { data: orderRow } = await supabaseAdmin
    .from('orders').select('*').eq('id', orderId).eq('store_id', STORE_ID).eq('buyer_user_id', user.id).maybeSingle();
  if (!orderRow) return { ok: false, error: 'Order not found.' };
  if (orderRow.escrow_status !== 'dealer_accepted') {
    return { ok: false, error: 'Payment method can only be selected once the dealer has accepted the order.' };
  }

  const { data, error } = await supabaseAdmin
    .from('orders').update({ payment_method: paymentMethod, updated_at: new Date().toISOString() }).eq('id', orderId).select().maybeSingle();
  if (error) return { ok: false, error: error.message };
  return { ok: true, order: await shapeOrderDetail(data) };
}

export async function confirmPaymentSent(orderId, paymentProofUrl) {
  const user = await requireUser();
  if (!/^https?:\/\//.test(paymentProofUrl || '')) {
    return { ok: false, error: 'Please provide a valid link to your proof of payment.' };
  }

  const { data: orderRow } = await supabaseAdmin
    .from('orders').select('*').eq('id', orderId).eq('store_id', STORE_ID).eq('buyer_user_id', user.id).maybeSingle();
  if (!orderRow) return { ok: false, error: 'Order not found.' };

  const { data, error } = await supabaseAdmin
    .from('orders').update({ payment_reference: paymentProofUrl, updated_at: new Date().toISOString() }).eq('id', orderId).select().maybeSingle();
  if (error) return { ok: false, error: error.message };

  // Clears any open justification request. Silently ignored if the
  // order_messages.kind/subject migration hasn't landed yet.
  await supabaseAdmin.from('order_messages').insert({
    order_id: orderId, sender: 'buyer', sender_user_id: user.id, recipient_role: 'buyer',
    subject: 'Payment sent', message: 'Buyer submitted proof of payment.', kind: 'payment_sent', is_read: false,
  });

  return { ok: true, order: await shapeOrderDetail(data) };
}

export async function flagOrder(orderId, reason, description) {
  const user = await requireUser();
  const { data: orderRow } = await supabaseAdmin
    .from('orders').select('id, escrow_status').eq('id', orderId).eq('store_id', STORE_ID).eq('buyer_user_id', user.id).maybeSingle();
  if (!orderRow) return { ok: false, error: 'Order not found.' };
  if (orderRow.escrow_status !== 'verified') {
    return { ok: false, error: 'Disputes can only be opened during the 14-day inspection period.' };
  }

  const { data: openExisting } = await supabaseAdmin
    .from('disputes').select('id').eq('order_id', orderId).in('status', ['open', 'under_review']).maybeSingle();
  if (openExisting) return { ok: false, error: 'A dispute is already open on this order.' };

  const { data, error } = await supabaseAdmin
    .from('disputes').insert({ order_id: orderId, opened_by: user.id, reason, description, status: 'open' }).select().single();
  if (error) return { ok: false, error: error.message };
  return { ok: true, dispute: mapDisputeRowForBuyer(data) };
}

export async function getMyOrderDispute(orderId) {
  const user = await requireUser();
  const { data: orderRow } = await supabaseAdmin
    .from('orders').select('id').eq('id', orderId).eq('store_id', STORE_ID).eq('buyer_user_id', user.id).maybeSingle();
  if (!orderRow) return null;
  const { data, error } = await supabaseAdmin
    .from('disputes').select('*').eq('order_id', orderId).order('created_at', { ascending: false }).limit(1).maybeSingle();
  if (error) throw new Error(error.message);
  return data ? mapDisputeRowForBuyer(data) : null;
}

export async function getMyOrderMessages({ limit = 200 } = {}) {
  const user = await requireUser();
  const { data: myOrders } = await supabaseAdmin
    .from('orders').select('id, buyer_user_id').eq('store_id', STORE_ID).eq('buyer_user_id', user.id);
  const orders = myOrders || [];
  if (!orders.length) return [];
  const orderMap = new Map(orders.map(o => [o.id, o]));

  // Scoped to the buyer conversation only — recipient_role distinguishes
  // which two-party thread a row belongs to (buyer<->staff vs
  // dealer<->staff); sender alone can't tell them apart since both threads
  // use sender:'admin' for the staff side.
  const { data, error } = await supabaseAdmin
    .from('order_messages').select('*').in('order_id', orders.map(o => o.id)).eq('recipient_role', 'buyer').in('sender', ['buyer', 'admin']).order('created_at', { ascending: false }).limit(limit);
  if (error) throw new Error(error.message);
  const rows = data || [];
  const identities = await loadIdentities(rows.map(m => m.sender_user_id).concat(orders.map(o => o.buyer_user_id)));
  return rows.map(m => mapOrderMessageRow(m, { order: orderMap.get(m.order_id), identities }));
}

export async function sendOrderMessage(orderId, subject, message) {
  const user = await requireUser();
  const { data: orderRow } = await supabaseAdmin
    .from('orders').select('id, buyer_user_id').eq('id', orderId).eq('store_id', STORE_ID).eq('buyer_user_id', user.id).maybeSingle();
  if (!orderRow) return { ok: false, error: 'Order not found.' };

  const { data, error } = await supabaseAdmin
    .from('order_messages')
    .insert({ order_id: orderId, sender: 'buyer', sender_user_id: user.id, recipient_role: 'buyer', subject, message, kind: 'message', is_read: false })
    .select().single();
  if (error) return { ok: false, error: error.message };

  const identities = await loadIdentities([user.id]);
  return { ok: true, message: mapOrderMessageRow(data, { order: orderRow, identities }) };
}

export async function markMyOrderThreadRead(orderId) {
  const user = await requireUser();
  const { data: orderRow } = await supabaseAdmin
    .from('orders').select('id').eq('id', orderId).eq('store_id', STORE_ID).eq('buyer_user_id', user.id).maybeSingle();
  if (!orderRow) return { ok: false, error: 'Order not found.' };
  const { error } = await supabaseAdmin.from('order_messages').update({ is_read: true }).eq('order_id', orderId).eq('recipient_role', 'buyer').eq('sender', 'admin');
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

// ============================================================================
// Dealer
// ============================================================================

export async function getMySales({ limit = 50 } = {}) {
  const user = await requireDealer();
  const { data, error } = await supabaseAdmin
    .from('orders')
    .select('*')
    .eq('store_id', STORE_ID)
    .eq('dealer_user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) throw new Error(error.message);
  return shapeRows(data || []);
}

export async function getMyDealerOrderMessages({ limit = 200 } = {}) {
  const user = await requireDealer();
  const { data: myOrders } = await supabaseAdmin
    .from('orders').select('id, dealer_user_id').eq('store_id', STORE_ID).eq('dealer_user_id', user.id);
  const orders = myOrders || [];
  if (!orders.length) return [];
  const orderMap = new Map(orders.map(o => [o.id, o]));

  // Scoped to the dealer conversation only — mirrors getMyOrderMessages'
  // buyer scoping. recipient_role is what actually separates the two
  // two-party threads sharing this table; sender alone can't, since both
  // use sender:'admin' for the staff side. Only admin sees the full
  // three-way conversation.
  const { data, error } = await supabaseAdmin
    .from('order_messages').select('*').in('order_id', orders.map(o => o.id)).eq('recipient_role', 'dealer').in('sender', ['dealer', 'admin']).order('created_at', { ascending: false }).limit(limit);
  if (error) throw new Error(error.message);
  const rows = data || [];
  const identities = await loadIdentities(rows.map(m => m.sender_user_id));
  return rows.map(m => mapOrderMessageRow(m, { order: orderMap.get(m.order_id), identities }));
}

export async function sendDealerOrderMessage(orderId, subject, message) {
  const user = await requireDealer();
  const { data: orderRow } = await supabaseAdmin
    .from('orders').select('id, dealer_user_id').eq('id', orderId).eq('store_id', STORE_ID).eq('dealer_user_id', user.id).maybeSingle();
  if (!orderRow) return { ok: false, error: 'Order not found.' };

  const { data, error } = await supabaseAdmin
    .from('order_messages')
    .insert({ order_id: orderId, sender: 'dealer', sender_user_id: user.id, recipient_role: 'dealer', subject, message, kind: 'message', is_read: false })
    .select().single();
  if (error) return { ok: false, error: error.message };

  const identities = await loadIdentities([user.id]);
  return { ok: true, message: mapOrderMessageRow(data, { order: orderRow, identities }) };
}

// Dealer can only delete their own sent messages — never staff's or (there
// isn't one, but hypothetically) a buyer's. Deletes the row outright, which
// also removes it from Dashboard Agent's staff-side thread view since this
// is a shared table — that's a deliberate product choice made with the
// operator, not an oversight.
export async function deleteDealerOrderMessage(messageId) {
  const user = await requireDealer();
  const { data: msg } = await supabaseAdmin
    .from('order_messages').select('id, order_id, sender, sender_user_id').eq('id', messageId).maybeSingle();
  if (!msg || msg.sender !== 'dealer' || msg.sender_user_id !== user.id) {
    return { ok: false, error: 'Message not found.' };
  }
  const { data: orderRow } = await supabaseAdmin
    .from('orders').select('id').eq('id', msg.order_id).eq('store_id', STORE_ID).eq('dealer_user_id', user.id).maybeSingle();
  if (!orderRow) return { ok: false, error: 'Message not found.' };

  const { error } = await supabaseAdmin.from('order_messages').delete().eq('id', messageId);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function markMyDealerOrderThreadRead(orderId) {
  const user = await requireDealer();
  const { data: orderRow } = await supabaseAdmin
    .from('orders').select('id').eq('id', orderId).eq('store_id', STORE_ID).eq('dealer_user_id', user.id).maybeSingle();
  if (!orderRow) return { ok: false, error: 'Order not found.' };
  const { error } = await supabaseAdmin.from('order_messages').update({ is_read: true }).eq('order_id', orderId).eq('recipient_role', 'dealer').eq('sender', 'admin');
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

// ============================================================================
// Admin
// ============================================================================

export async function getAdminOrders({ limit = 50 } = {}) {
  await requireAdmin();
  const { data, error } = await supabaseAdmin
    .from('orders')
    .select('*')
    .eq('store_id', STORE_ID)
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) throw new Error(error.message);
  return shapeRows(data || []);
}

export async function getAdminOrder(orderId) {
  await requireAdmin();
  const { data, error } = await supabaseAdmin
    .from('orders').select('*').eq('id', orderId).eq('store_id', STORE_ID).maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) return null;
  return shapeOrderDetail(data);
}

export async function getAdminDashboardStats() {
  await requireAdmin();

  const [products, orders, customers, brands, recent] = await Promise.all([
    supabaseAdmin.from('products').select('id', { count: 'exact', head: true }).eq('store_id', STORE_ID),
    supabaseAdmin.from('orders').select('id', { count: 'exact', head: true }).eq('store_id', STORE_ID),
    supabaseAdmin.from('customers').select('id', { count: 'exact', head: true }).eq('store_id', STORE_ID),
    supabaseAdmin.from('brands').select('id', { count: 'exact', head: true }).eq('store_id', STORE_ID),
    supabaseAdmin.from('orders').select('id, buyer_user_id, total_amount, escrow_status, created_at')
      .eq('store_id', STORE_ID).order('created_at', { ascending: false }).limit(5),
  ]);

  const recentOrders = recent.data || [];
  const identities = await loadIdentities(recentOrders.map(o => o.buyer_user_id));

  return {
    products: products.count || 0,
    orders: orders.count || 0,
    customers: customers.count || 0,
    brands: brands.count || 0,
    recentOrders: recentOrders.map(o => ({
      id: o.id,
      customerName: identities.get(o.buyer_user_id)?.fullName || 'Unknown buyer',
      customerEmail: identities.get(o.buyer_user_id)?.email || '',
      totalAmount: o.total_amount,
      orderStatus: deriveOrderStatus(o.escrow_status),
    })),
  };
}

// ---- Escrow transitions — single enforcement choke point ----

async function transitionEscrow(orderRow, nextStatus, extraFields = {}) {
  if (!isValidEscrowTransition(orderRow.escrow_status, nextStatus)) {
    return { ok: false, error: `Cannot move an order from "${orderRow.escrow_status}" to "${nextStatus}".` };
  }

  if (nextStatus === 'funds_released') {
    const { data: openDisputes } = await supabaseAdmin
      .from('disputes').select('id').eq('order_id', orderRow.id).in('status', ['open', 'under_review']);
    if (openDisputes?.length) {
      return { ok: false, error: 'This order has an open dispute — resolve it before releasing funds.' };
    }
  }

  const shippingStatus =
    nextStatus === 'shipped' ? 'shipped' :
    (nextStatus === 'verified' || nextStatus === 'funds_released') ? 'delivered' :
    orderRow.shipping_status;

  const { data, error } = await supabaseAdmin
    .from('orders')
    .update({ escrow_status: nextStatus, shipping_status: shippingStatus, updated_at: new Date().toISOString(), ...extraFields })
    .eq('id', orderRow.id)
    .eq('escrow_status', orderRow.escrow_status) // optimistic-concurrency guard
    .select()
    .maybeSingle();

  if (error) return { ok: false, error: error.message };
  if (!data) return { ok: false, error: 'This order was just updated elsewhere — please refresh and try again.' };
  return { ok: true, order: data };
}

export async function updateEscrowStatus(orderId, nextStatus) {
  await requireAdmin();
  const { data: orderRow, error } = await supabaseAdmin.from('orders').select('*').eq('id', orderId).eq('store_id', STORE_ID).maybeSingle();
  if (error || !orderRow) return { ok: false, error: 'Order not found.' };
  const result = await transitionEscrow(orderRow, nextStatus);
  if (!result.ok) return result;
  return { ok: true, order: await shapeOrderDetail(result.order) };
}

export async function updateTrackingNumber(orderId, trackingNumber) {
  await requireAdmin();
  const { data, error } = await supabaseAdmin
    .from('orders').update({ tracking_number: trackingNumber, updated_at: new Date().toISOString() }).eq('id', orderId).eq('store_id', STORE_ID).select().maybeSingle();
  if (error) return { ok: false, error: error.message };
  if (!data) return { ok: false, error: 'Order not found.' };
  return { ok: true, order: await shapeOrderDetail(data) };
}

export async function confirmCourierDelivery(orderId) {
  await requireAdmin();
  const { data: orderRow, error } = await supabaseAdmin.from('orders').select('*').eq('id', orderId).eq('store_id', STORE_ID).maybeSingle();
  if (error || !orderRow) return { ok: false, error: 'Order not found.' };
  const result = await transitionEscrow(orderRow, 'verified', { delivery_confirmed_at: new Date().toISOString() });
  if (!result.ok) return result;
  return { ok: true, order: await shapeOrderDetail(result.order) };
}

// Scoped to recipient_role='buyer' throughout — our own /admin's message
// UI was built buyer-only (hardcoded buyer-name labeling, no dealer
// distinction) and predates dealer messaging entirely. Dealer<->staff
// conversations now live on Dashboard Agent's own tool, not here.
export async function getAdminOrderMessages(orderId) {
  await requireAdmin();
  const { data: orderRow } = await supabaseAdmin.from('orders').select('id, buyer_user_id').eq('id', orderId).eq('store_id', STORE_ID).maybeSingle();
  if (!orderRow) return [];
  const { data, error } = await supabaseAdmin
    .from('order_messages').select('*').eq('order_id', orderId).eq('recipient_role', 'buyer').order('created_at', { ascending: false }).limit(100);
  if (error) throw new Error(error.message);
  const rows = data || [];
  const identities = await loadIdentities(rows.map(m => m.sender_user_id).concat([orderRow.buyer_user_id]));
  return rows.map(m => mapOrderMessageRow(m, { order: orderRow, identities }));
}

export async function getAdminMessagesOverview({ limit = 200 } = {}) {
  await requireAdmin();
  const { data: orders } = await supabaseAdmin.from('orders').select('id, buyer_user_id').eq('store_id', STORE_ID);
  const rows2 = orders || [];
  if (!rows2.length) return [];
  const orderMap = new Map(rows2.map(o => [o.id, o]));

  const { data, error } = await supabaseAdmin
    .from('order_messages').select('*').in('order_id', rows2.map(o => o.id)).eq('recipient_role', 'buyer').order('created_at', { ascending: false }).limit(limit);
  if (error) throw new Error(error.message);
  const rows = data || [];
  const identities = await loadIdentities(rows.map(m => m.sender_user_id).concat(rows2.map(o => o.buyer_user_id)));
  return rows.map(m => mapOrderMessageRow(m, { order: orderMap.get(m.order_id), identities }));
}

export async function adminReplyToOrder(orderId, subject, message) {
  const admin = await requireAdmin();
  const { data: orderRow } = await supabaseAdmin.from('orders').select('id, buyer_user_id').eq('id', orderId).eq('store_id', STORE_ID).maybeSingle();
  if (!orderRow) return { ok: false, error: 'Order not found.' };

  const { data, error } = await supabaseAdmin
    .from('order_messages')
    .insert({ order_id: orderId, sender: 'admin', sender_user_id: admin.id, recipient_role: 'buyer', subject, message, kind: 'message', is_read: false })
    .select().single();
  if (error) return { ok: false, error: error.message };

  const identities = await loadIdentities([admin.id, orderRow.buyer_user_id]);
  return { ok: true, message: mapOrderMessageRow(data, { order: orderRow, identities }) };
}

export async function requestJustification(orderId, subject, message) {
  const admin = await requireAdmin();
  const { data: orderRow } = await supabaseAdmin.from('orders').select('*').eq('id', orderId).eq('store_id', STORE_ID).maybeSingle();
  if (!orderRow) return { ok: false, error: 'Order not found.' };

  const { error } = await supabaseAdmin
    .from('order_messages')
    .insert({ order_id: orderId, sender: 'admin', sender_user_id: admin.id, recipient_role: 'buyer', subject, message, kind: 'justification_request', is_read: false });
  if (error) return { ok: false, error: error.message };

  return { ok: true, order: await shapeOrderDetail(orderRow) };
}

export async function markAdminOrderThreadRead(orderId) {
  await requireAdmin();
  const { error } = await supabaseAdmin.from('order_messages').update({ is_read: true }).eq('order_id', orderId).eq('recipient_role', 'buyer').eq('sender', 'buyer');
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function getAdminOrderDispute(orderId) {
  await requireAdmin();
  const { data, error } = await supabaseAdmin
    .from('disputes').select('*').eq('order_id', orderId).order('created_at', { ascending: false }).limit(1).maybeSingle();
  if (error) throw new Error(error.message);
  return data ? mapDisputeRowForAdmin(data) : null;
}

export async function resolveDispute({ disputeId, outcome, mediatorNotes }) {
  const admin = await requireAdmin();
  const { data: dispute } = await supabaseAdmin.from('disputes').select('*').eq('id', disputeId).maybeSingle();
  if (!dispute) return { ok: false, error: 'Dispute not found.' };

  const { data: orderRow } = await supabaseAdmin.from('orders').select('*').eq('id', dispute.order_id).eq('store_id', STORE_ID).maybeSingle();
  if (!orderRow) return { ok: false, error: 'Order not found.' };

  const nextStatus = outcome === 'release_funds' ? 'funds_released' : 'cancelled';
  const transition = await transitionEscrow(orderRow, nextStatus);
  if (!transition.ok) return transition;

  const { error } = await supabaseAdmin
    .from('disputes')
    .update({
      status: outcome === 'release_funds' ? 'resolved_dealer' : 'resolved_buyer',
      mediator_notes: mediatorNotes,
      resolved_by: admin.id,
      resolved_at: new Date().toISOString(),
    })
    .eq('id', disputeId);
  if (error) return { ok: false, error: error.message };

  return { ok: true };
}
