// Pure, dependency-free — safe to import from client or server code.
// Maps snake_case orders/order_messages/disputes rows onto the exact
// camelCase field names every existing buyer/dealer/admin screen already
// reads (those screens were built against the old Base44 shape and were
// never renamed — this file bridges the gap instead).

import { publicSellerSnapshot, sellerDisplayName } from './marketplace.js';

export function formatEscrowReference(id) {
  return 'KG-' + String(id).replace(/-/g, '').slice(0, 8).toUpperCase();
}

export function deriveOrderStatus(escrowStatus) {
  if (escrowStatus === 'funds_released') return 'Delivered';
  if (escrowStatus === 'shipped' || escrowStatus === 'verified') return 'Shipped';
  if (escrowStatus === 'cancelled') return 'Cancelled';
  return 'Processing';
}

export function derivePaymentStatus({ escrowStatus, paymentReference, justificationMessage }) {
  if (['funds_secured', 'shipped', 'verified', 'funds_released'].includes(escrowStatus)) return 'Paid';
  if (justificationMessage) return 'Justification Requested';
  if (paymentReference) return 'Awaiting Confirmation';
  return 'Pending';
}

export function mapOrderLineItem(item) {
  return {
    productId: item.product_id,
    productTitle: item.title,
    ...Object.fromEntries(['en', 'de', 'cs'].flatMap((language) => item[`title_${language}`] ? [[`productTitle_${language}`, item[`title_${language}`]]] : [])),
    brand: item.brand || '',
    condition: item.condition || '',
    price: item.price,
    currency: item.currency,
    featuredImage: item.image,
    quantity: item.quantity,
    sellerSnapshot: publicSellerSnapshot(item.seller_snapshot),
  };
}

// identities: Map<clerkUserId, {fullName, email, phone}> from loadIdentities()
// justificationMessage: string|null — always null until Phase 6 wires the
// order_messages.kind-based derivation.
export function mapOrderRow(row, { justificationMessage = null, identities = new Map() } = {}) {
  const products = Array.isArray(row.products) ? row.products.map(mapOrderLineItem) : [];
  const buyerIdentity = identities.get(row.buyer_user_id);

  return {
    id: row.id,
    escrowReference: formatEscrowReference(row.id),
    escrowStatus: row.escrow_status,
    orderStatus: deriveOrderStatus(row.escrow_status),
    paymentMethod: row.payment_method,
    paymentStatus: derivePaymentStatus({
      escrowStatus: row.escrow_status,
      paymentReference: row.payment_reference,
      justificationMessage,
    }),
    justificationMessage,
    paymentProofUrl: row.payment_reference || null,
    products,
    totalAmount: row.total_amount,
    currency: row.currency,
    shippingDetails: row.shipping_address || null,
    shippingStatus: row.shipping_status,
    trackingNumber: row.tracking_number || '',
    deliveryConfirmedAt: row.delivery_confirmed_at,
    buyerId: row.buyer_user_id,
    dealerId: row.dealer_user_id,
    customerName: buyerIdentity?.fullName || '',
    customerEmail: buyerIdentity?.email || '',
    dealerName: products[0]?.sellerSnapshot ? sellerDisplayName(products[0].sellerSnapshot) : '',
    idempotencyKey: row.idempotency_key,
    created_date: row.created_at,
    updated_date: row.updated_at,
  };
}

export function mapOrderMessageRow(row, { order, identities = new Map() } = {}) {
  const buyerIdentity = order ? identities.get(order.buyer_user_id) : null;
  const senderIdentity = identities.get(row.sender_user_id);
  return {
    id: row.id,
    orderId: row.order_id,
    orderReference: order ? formatEscrowReference(order.id) : null,
    sender: row.sender,
    isRead: row.is_read,
    subject: row.subject || '',
    body: row.message,
    buyerId: order?.buyer_user_id || null,
    buyerEmail: buyerIdentity?.email || '',
    buyerName: buyerIdentity?.fullName || '',
    senderName: senderIdentity?.fullName || (row.sender === 'admin' ? 'Kariv Glamour' : ''),
    created_date: row.created_at,
  };
}

// Buyer/dealer-facing — mediator_notes must NEVER appear here.
export function mapDisputeRowForBuyer(row) {
  return {
    id: row.id,
    orderId: row.order_id,
    reason: row.reason,
    description: row.description,
    status: row.status,
    resolved_at: row.resolved_at,
    created_date: row.created_at,
  };
}

export function mapDisputeRowForAdmin(row) {
  return {
    ...mapDisputeRowForBuyer(row),
    resolution: row.mediator_notes,
    mediatorNotes: row.mediator_notes,
    openedBy: row.opened_by,
    resolvedBy: row.resolved_by,
  };
}
