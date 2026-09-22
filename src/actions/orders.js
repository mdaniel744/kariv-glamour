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
import { getCzkExchangeRates } from '@/lib/exchangeRatesServer';
import { matchesCheckoutPrice } from '@/lib/currencyConversion';
import { loadCatalogTranslations } from '@/lib/catalogTranslations';
import { getProductPurchasePolicy } from '@/lib/purchasePolicyServer';
import { PURCHASE_POLICY_VERSION, PURCHASE_ROUTES, purchasePolicySnapshot } from '@/lib/purchasePolicy';

const PAYMENT_PROOF_BUCKET = 'kariv-payment-proofs';
const PAYMENT_PROOF_URL_TTL_SECONDS = 5 * 60;

function privateProofPrefix(order) {
  return `${STORE_ID}/${order.id}/${order.buyer_user_id}/`;
}

function isOwnedPrivateProofKey(order, proofKey) {
  if (typeof proofKey !== 'string' || /^https?:\/\//i.test(proofKey)) return false;
  const prefix = privateProofPrefix(order);
  const fileName = proofKey.startsWith(prefix) ? proofKey.slice(prefix.length) : '';
  return !fileName.includes('/') && /^[0-9a-f-]{36}\.(?:pdf|webp)$/i.test(fileName);
}

async function finalizePrivatePaymentProof(stagedKey, prefix, extension) {
  const bucket = supabaseAdmin.storage.from(PAYMENT_PROOF_BUCKET);
  const { data: stagedFile, error: downloadError } = await bucket.download(stagedKey);
  if (downloadError || !stagedFile) throw new Error(downloadError?.message || 'The staged payment proof could not be read.');

  const immutableKey = `${prefix}${crypto.randomUUID()}.${extension}`;
  const contentType = extension === 'pdf' ? 'application/pdf' : 'image/webp';
  const bytes = Buffer.from(await stagedFile.arrayBuffer());
  const { error: uploadError } = await bucket.upload(immutableKey, bytes, {
    contentType,
    cacheControl: 'no-store',
    upsert: false,
  });
  if (uploadError) throw new Error(uploadError.message);
  return immutableKey;
}

function projectOrderForAudience(order, audience) {
  if (audience !== 'dealer') return order;
  const fulfillmentReady = ['funds_secured', 'shipped', 'verified', 'funds_released'].includes(order.escrowStatus);
  return {
    ...order,
    buyerId: undefined,
    customerEmail: '',
    customerName: fulfillmentReady ? order.customerName : 'Buyer',
    shippingDetails: fulfillmentReady ? order.shippingDetails : null,
    paymentProofUrl: order.purchaseRoute === PURCHASE_ROUTES.DEALER_DIRECT ? order.paymentProofUrl : null,
    justificationMessage: null,
  };
}

async function shapeRows(rows, { includePolicyAudit = false, audience = 'buyer' } = {}) {
  const hydratedRows = await attachPrivateOrderData(rows);
  const ids = hydratedRows.flatMap(r => [r.buyer_user_id, r.dealer_user_id]);
  const identities = await loadIdentities(ids);
  return hydratedRows.map((row) => {
    const shaped = mapOrderRow(row, { identities, includePolicyAudit });
    // payment_reference stores a private object key. Only expose a temporary
    // URL after the surrounding query has established this audience's access.
    shaped.paymentProofUrl = row.payment_proof_signed_url || null;
    return projectOrderForAudience(shaped, audience);
  });
}

async function attachPrivateOrderData(rows) {
  const orderIds = rows.map((row) => row.id).filter(Boolean);
  if (!orderIds.length) return rows;
  let instructionsByOrder = new Map();
  let auditsByOrder = new Map();
  try {
    const directOrderIds = rows
      .filter((row) => row.purchase_route === PURCHASE_ROUTES.DEALER_DIRECT)
      .map((row) => row.id)
      .filter(Boolean);
    const [instructionResult, auditResult] = await Promise.all([
      supabaseAdmin
        .from('order_payment_instructions')
        .select('order_id, instructions')
        .eq('store_id', STORE_ID)
        .in('order_id', orderIds),
      directOrderIds.length
        ? supabaseAdmin
          .from('order_purchase_policy_audits')
          .select('order_id, source_value_eur, dealer_policy_revision')
          .eq('store_id', STORE_ID)
          .in('order_id', directOrderIds)
        : Promise.resolve({ data: [], error: null }),
    ]);
    if (!instructionResult.error) {
      instructionsByOrder = new Map((instructionResult.data || []).map((item) => [item.order_id, item.instructions]));
    }
    if (!auditResult.error) {
      auditsByOrder = new Map((auditResult.data || []).map((item) => [item.order_id, item]));
    }
  } catch {
    // The order can still be displayed safely without private instructions.
  }

  return Promise.all(rows.map(async (row) => {
    const awaitingUnsubmittedPayment = row.escrow_status === 'dealer_accepted'
      && (!row.purchase_status || row.purchase_status === 'awaiting_payment')
      && !row.payment_reference;
    let paymentInstructions = awaitingUnsubmittedPayment
      ? (instructionsByOrder.get(row.id) || '')
      : '';

    // Dealer bank details are copied at acceptance, but remain visible only
    // while the dealer is still eligible under the exact policy revision the
    // buyer accepted. Any suspension, dispute, refund hold or approval change
    // therefore fails closed before the buyer sees a payment destination.
    if (paymentInstructions && row.purchase_route === PURCHASE_ROUTES.DEALER_DIRECT) {
      const audit = auditsByOrder.get(row.id);
      if (!audit || !row.dealer_user_id) {
        paymentInstructions = '';
      } else {
        try {
          const { data: eligible, error } = await supabaseAdmin.rpc('kariv_dealer_direct_eligible', {
            p_store_id: STORE_ID,
            p_dealer_user_id: row.dealer_user_id,
            p_source_value_eur: audit.source_value_eur,
            p_expected_policy_revision: audit.dealer_policy_revision,
          });
          if (error || eligible !== true) paymentInstructions = '';
        } catch {
          paymentInstructions = '';
        }
      }
    }

    let signedUrl = null;
    if (isOwnedPrivateProofKey(row, row.payment_reference) && supabaseAdmin?.storage) {
      try {
        const { data, error } = await supabaseAdmin.storage
          .from(PAYMENT_PROOF_BUCKET)
          .createSignedUrl(row.payment_reference, PAYMENT_PROOF_URL_TTL_SECONDS);
        if (!error) signedUrl = data?.signedUrl || null;
      } catch {
        signedUrl = null;
      }
    }
    return {
      ...row,
      seller_payment_instructions: paymentInstructions,
      payment_proof_signed_url: signedUrl,
    };
  }));
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

async function shapeOrderDetail(row, { includePolicyAudit = false, audience = 'buyer' } = {}) {
  const [hydratedRow] = await attachPrivateOrderData([row]);
  const [justificationMessage, identities] = await Promise.all([
    loadJustificationMessage(hydratedRow.id),
    loadIdentities([hydratedRow.buyer_user_id, hydratedRow.dealer_user_id]),
  ]);
  const shaped = mapOrderRow(hydratedRow, { justificationMessage, identities, includePolicyAudit });
  shaped.paymentProofUrl = hydratedRow.payment_proof_signed_url || null;
  return projectOrderForAudience(shaped, audience);
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

export async function createOrder({
  productId,
  shippingDetails,
  idempotencyKey,
  locale = 'en',
  expectedPrice,
  expectedCurrency,
  expectedPurchaseRoute,
  expectedSellerKey,
  buyerRequestsProtection = false,
}) {
  const user = await requireUser();
  if (!['en', 'de', 'cs'].includes(locale)) return { ok: false, error: 'Unsupported checkout language.' };
  if (typeof idempotencyKey !== 'string' || !idempotencyKey || idempotencyKey.length > 150) return { ok: false, error: 'Invalid checkout reference.' };

  const { data: existing } = await supabaseAdmin
    .from('orders')
    .select('*')
    .eq('store_id', STORE_ID)
    .eq('idempotency_key', idempotencyKey)
    .eq('buyer_user_id', user.id)
    .maybeSingle();
  if (existing) return { ok: true, order: await shapeOrderDetail(existing) };
  if (user.emailVerified !== true) {
    return { ok: false, error: 'Verify your email address before reserving a watch.' };
  }
  // These values only prove which terms the buyer reviewed. They never choose
  // the live route or seller: both are recalculated below from current,
  // tenant-scoped records. Check them after an idempotent replay so a retry of
  // an already-created order remains safe across client upgrades.
  if (
    ![PURCHASE_ROUTES.KARIV_DIRECT, PURCHASE_ROUTES.DEALER_DIRECT, PURCHASE_ROUTES.ESCROW].includes(expectedPurchaseRoute) ||
    (expectedSellerKey !== 'kariv' && !/^dealer:[^:\s]{1,200}$/.test(expectedSellerKey || ''))
  ) {
    return { ok: false, error: 'The purchase terms could not be verified. Please refresh checkout and try again.' };
  }

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
  const exchangeRates = locale === 'cs' ? await getCzkExchangeRates() : null;
  const pricing = getProductPricing({ price: product.price, salePrice: product.sale_price, currency: product.currency }, { locale, exchangeRates });
  if (pricing.price == null || !pricing.currency) return { ok: false, error: locale === 'cs' ? 'Cenu v Kč nyní nelze ověřit. Zkuste to prosím později. Objednávka nebyla vytvořena.' : 'This watch does not currently have a valid purchase price. Please contact us.' };
  // Client amounts are only a confirmation check, never an input to pricing.
  // A changed listing/rate requires the buyer to see and accept the new total.
  if (!matchesCheckoutPrice(pricing, expectedPrice, expectedCurrency)) return {
    ok: false, code: 'PRICE_CHANGED', pricing,
    error: locale === 'cs' ? 'Cena byla aktualizována. Zkontrolujte novou částku a znovu potvrďte objednávku.' : locale === 'de' ? 'Der Preis wurde aktualisiert. Bitte prüfen und bestätigen Sie den neuen Gesamtbetrag.' : 'The price has been updated. Please review and confirm the new total.',
  };
  const price = pricing.price;
  // The client may ask for additional protection, but never chooses or sends
  // a route. Recompute from the fresh product, dealer record and current
  // source-currency value immediately before inserting the order.
  const purchasePolicy = await getProductPurchasePolicy(product, {
    buyerRequestsProtection: buyerRequestsProtection === true,
  });
  if (!purchasePolicy) return { ok: false, error: 'Unable to verify how this purchase should be processed.' };
  if (purchasePolicy.purchaseRoute === PURCHASE_ROUTES.MANUAL_REVIEW) {
    return {
      ok: false,
      code: 'MANUAL_REVIEW_REQUIRED',
      error: 'This purchase needs a Kariv review before checkout. Please contact our support team.',
    };
  }
  // This is a confirmation check, not a client-selected route. If live dealer
  // state changes while checkout is open, require the buyer to review and
  // accept the newly displayed payment recipient/protection terms.
  const evaluatedSellerKey = purchasePolicy.sellerType === 'dealer' && purchasePolicy.dealerId
    ? `dealer:${purchasePolicy.dealerId}`
    : 'kariv';
  if (
    purchasePolicy.purchaseRoute !== expectedPurchaseRoute ||
    evaluatedSellerKey !== expectedSellerKey
  ) {
    return {
      ok: false,
      code: 'PURCHASE_ROUTE_CHANGED',
      error: locale === 'cs'
        ? 'Prodejce nebo podmínky platby a ochrany se během objednávky změnily. Zkontrolujte prosím aktualizované údaje a objednávku znovu potvrďte.'
        : locale === 'de'
          ? 'Der Verkäufer oder die Zahlungs- und Schutzbedingungen haben sich während des Checkouts geändert. Bitte prüfen Sie die aktualisierten Angaben und bestätigen Sie erneut.'
          : 'The seller or payment and protection terms changed while checkout was open. Please review the updated details and confirm your order again.',
    };
  }

  const translations = await loadCatalogTranslations(supabaseAdmin, STORE_ID, 'product', [product.id]).catch(() => ({}));
  const translatedProduct = translations[product.id] || {};
  const lineItem = {
    product_id: product.id,
    title: product.name,
    ...Object.fromEntries(['en', 'de', 'cs'].flatMap((language) => translatedProduct[`productTitle_${language}`] ? [[`title_${language}`, translatedProduct[`productTitle_${language}`]]] : [])),
    brand: product.brands?.name || '',
    condition: attrs['Condition'] || '',
    price,
    currency: pricing.currency,
    image: Array.isArray(product.images) ? product.images[0] : null,
    quantity: 1,
    ...(pricing.conversion ? { conversion: pricing.conversion } : {}),
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
    // escrow_status remains populated for backward compatibility with the
    // established portal/admin lifecycle. purchase_route/purchase_status are
    // the route-neutral source of truth for all new UI and reporting.
    escrow_status: purchasePolicy.purchaseRoute === PURCHASE_ROUTES.KARIV_DIRECT ? 'dealer_accepted' : 'pending_review',
    purchase_route: purchasePolicy.purchaseRoute,
    purchase_status: purchasePolicy.purchaseRoute === PURCHASE_ROUTES.KARIV_DIRECT
      ? 'awaiting_payment'
      : 'awaiting_seller_confirmation',
    // Record only a protection choice the server actually accepted. A caller
    // can request protection, but cannot make Kariv-owned inventory or an
    // otherwise ineligible route look protected in the audit trail.
    buyer_selected_protection: purchasePolicy.reasonCodes.includes('buyer_requested_protection'),
    purchase_policy_version: PURCHASE_POLICY_VERSION,
    purchase_policy_snapshot: purchasePolicySnapshot(purchasePolicy),
    shipping_status: 'not_shipped',
    shipping_address: shippingDetails,
    idempotency_key: idempotencyKey,
  };

  const sourcePrice = Number.isFinite(Number(product.sale_price)) && Number(product.sale_price) > 0 && Number(product.sale_price) < Number(product.price)
    ? Number(product.sale_price)
    : Number(product.price);
  const sourceCurrency = String(product.currency || '').trim().toUpperCase();
  const { data: createdId, error } = await supabaseAdmin.rpc('create_kariv_order_with_reservation', {
    p_store_id: STORE_ID,
    p_product_id: product.id,
    p_buyer_user_id: user.id,
    p_dealer_user_id: product.dealer_id || null,
    p_products: row.products,
    p_total_amount: row.total_amount,
    p_currency: row.currency,
    p_payment_method: row.payment_method,
    p_escrow_status: row.escrow_status,
    p_purchase_route: row.purchase_route,
    p_purchase_status: row.purchase_status,
    p_buyer_selected_protection: row.buyer_selected_protection,
    p_purchase_policy_version: row.purchase_policy_version,
    p_purchase_policy_snapshot: row.purchase_policy_snapshot,
    p_shipping_status: row.shipping_status,
    p_shipping_address: row.shipping_address,
    p_idempotency_key: row.idempotency_key,
    p_expected_source_price: sourcePrice,
    p_expected_source_currency: sourceCurrency,
    p_expected_source_value_eur: purchasePolicy.sourceValueEur,
    p_expected_policy_revision: product.dealer_id ? (purchasePolicy.policyRevision || 0) : null,
  });
  if (error) {
    if (error.code === '23505') {
      const { data: raced } = await supabaseAdmin
        .from('orders').select('*').eq('store_id', STORE_ID).eq('idempotency_key', idempotencyKey).eq('buyer_user_id', user.id).maybeSingle();
      if (raced) return { ok: true, order: await shapeOrderDetail(raced) };
    }
    if (/price changed|seller changed|eligibility changed|purchase route is not valid/i.test(error.message || '')) {
      return { ok: false, code: 'PURCHASE_ROUTE_CHANGED', error: 'The product or seller changed while checkout was open. Please review the updated details and confirm again.' };
    }
    if (/no longer available/i.test(error.message || '')) {
      return { ok: false, error: 'This watch has already sold.' };
    }
    if (/payment destination is not configured/i.test(error.message || '')) {
      return { ok: false, code: 'MANUAL_REVIEW_REQUIRED', error: 'Payment setup for this purchase is temporarily unavailable. Please contact Kariv support.' };
    }
    return { ok: false, error: error.message };
  }

  const { data: created, error: createdReadError } = await supabaseAdmin
    .from('orders')
    .select('*')
    .eq('id', createdId)
    .eq('store_id', STORE_ID)
    .eq('buyer_user_id', user.id)
    .maybeSingle();
  if (createdReadError || !created) return { ok: false, error: createdReadError?.message || 'The order was created but could not be loaded.' };

  // Save this as the buyer's default shipping profile for next time.
  await supabaseAdmin.from('customers').upsert(
    { store_id: STORE_ID, clerk_user_id: user.id, shipping_address: shippingDetails, updated_at: new Date().toISOString() },
    { onConflict: 'store_id,clerk_user_id' }
  );

  return { ok: true, order: await shapeOrderDetail(created) };
}

export async function selectPaymentMethod(orderId, paymentMethod) {
  const user = await requireUser();
  // Crypto checkout is intentionally deferred. Enforce the same restriction
  // on the server so the unfinished provider flow cannot be reached by
  // calling this action directly.
  if (paymentMethod !== 'bank_transfer') return { ok: false, error: 'Invalid payment method.' };

  const { data: orderRow } = await supabaseAdmin
    .from('orders').select('*').eq('id', orderId).eq('store_id', STORE_ID).eq('buyer_user_id', user.id).maybeSingle();
  if (!orderRow) return { ok: false, error: 'Order not found.' };
  const awaitingPayment = orderRow.escrow_status === 'dealer_accepted' &&
    (!orderRow.purchase_status || orderRow.purchase_status === 'awaiting_payment');
  if (!awaitingPayment) {
    return { ok: false, error: 'Payment method can only be selected once the dealer has accepted the order.' };
  }

  let updateQuery = supabaseAdmin
    .from('orders')
    .update({ payment_method: paymentMethod, updated_at: new Date().toISOString() })
    .eq('id', orderId)
    .eq('store_id', STORE_ID)
    .eq('buyer_user_id', user.id)
    .eq('escrow_status', 'dealer_accepted');
  if (orderRow.purchase_status) updateQuery = updateQuery.eq('purchase_status', 'awaiting_payment');
  const { data, error } = await updateQuery.select().maybeSingle();
  if (error) return { ok: false, error: error.message };
  if (!data) return { ok: false, error: 'This order changed while you were updating payment. Please refresh.' };
  return { ok: true, order: await shapeOrderDetail(data) };
}

export async function confirmPaymentSent(orderId, paymentProofKey) {
  const user = await requireUser();
  const expectedPrefix = `${STORE_ID}/${orderId}/${user.id}/`;
  const fileName = typeof paymentProofKey === 'string' && paymentProofKey.startsWith(expectedPrefix)
    ? paymentProofKey.slice(expectedPrefix.length)
    : '';
  if (
    /^https?:\/\//i.test(paymentProofKey || '') ||
    fileName.includes('/') ||
    !/^pending\.(?:pdf|webp)$/i.test(fileName)
  ) {
    return { ok: false, error: 'Upload payment proof from this order before confirming payment.' };
  }

  const { data: currentOrder } = await supabaseAdmin
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .eq('store_id', STORE_ID)
    .eq('buyer_user_id', user.id)
    .maybeSingle();
  if (!currentOrder) return { ok: false, error: 'Order not found.' };
  if (currentOrder.payment_reference) {
    if (isOwnedPrivateProofKey(currentOrder, currentOrder.payment_reference)) {
      return { ok: true, order: await shapeOrderDetail(currentOrder) };
    }
    return { ok: false, error: 'This order already has payment evidence that requires Kariv support review.' };
  }

  const extension = fileName.endsWith('.pdf') ? 'pdf' : 'webp';
  let immutableProofKey;
  try {
    immutableProofKey = await finalizePrivatePaymentProof(paymentProofKey, expectedPrefix, extension);
  } catch (finalizeError) {
    return { ok: false, error: finalizeError.message || 'The private payment proof could not be finalized.' };
  }

  const { data: submitted, error } = await supabaseAdmin.rpc('submit_kariv_payment_proof', {
    p_store_id: STORE_ID,
    p_order_id: orderId,
    p_buyer_user_id: user.id,
    p_proof_key: immutableProofKey,
  });
  if (error || submitted !== true) {
    // A lost RPC response is ambiguous. Check the row before deleting the
    // immutable object so evidence that was actually committed is preserved.
    const { data: afterFailure } = await supabaseAdmin
      .from('orders')
      .select('payment_reference')
      .eq('id', orderId)
      .eq('store_id', STORE_ID)
      .eq('buyer_user_id', user.id)
      .maybeSingle();
    if (afterFailure?.payment_reference !== immutableProofKey) {
      await supabaseAdmin.storage.from(PAYMENT_PROOF_BUCKET).remove([immutableProofKey]).catch(() => {});
    }
    if (afterFailure?.payment_reference === immutableProofKey) {
      const { data: committedOrder } = await supabaseAdmin
        .from('orders').select('*').eq('id', orderId).eq('store_id', STORE_ID).eq('buyer_user_id', user.id).maybeSingle();
      if (committedOrder) {
        await supabaseAdmin.storage.from(PAYMENT_PROOF_BUCKET).remove([paymentProofKey]).catch(() => {});
        return { ok: true, order: await shapeOrderDetail(committedOrder) };
      }
    }
    const message = error?.message || 'This order changed while proof was being submitted. Please refresh.';
    if (/eligibility changed|policy assessment|seller approval/i.test(message)) {
      return { ok: false, code: 'PURCHASE_ROUTE_CHANGED', error: 'The seller payment terms changed. Please contact Kariv support before sending payment.' };
    }
    return { ok: false, error: message };
  }

  await supabaseAdmin.storage.from(PAYMENT_PROOF_BUCKET).remove([paymentProofKey]).catch(() => {});

  const { data: updated, error: readError } = await supabaseAdmin
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .eq('store_id', STORE_ID)
    .eq('buyer_user_id', user.id)
    .maybeSingle();
  if (readError || !updated) return { ok: false, error: readError?.message || 'Payment proof was submitted but the order could not be refreshed.' };
  return { ok: true, order: await shapeOrderDetail(updated) };
}

export async function cancelMyUnpaidOrder(orderId) {
  const user = await requireUser();
  const { data: orderRow, error } = await supabaseAdmin
    .from('orders')
    .select('id, payment_reference')
    .eq('id', orderId)
    .eq('store_id', STORE_ID)
    .eq('buyer_user_id', user.id)
    .maybeSingle();
  if (error || !orderRow) return { ok: false, error: 'Order not found.' };
  if (orderRow.payment_reference) return { ok: false, error: 'Contact Kariv support to cancel after submitting payment proof.' };
  return cancelReservedOrder(orderId, { audience: 'buyer' });
}

export async function flagOrder(orderId, reason, description) {
  const user = await requireUser();
  const normalizedReason = typeof reason === 'string' ? reason.trim() : '';
  const normalizedDescription = typeof description === 'string' ? description.trim() : '';
  if (!normalizedReason || normalizedReason.length > 100 || normalizedDescription.length < 10 || normalizedDescription.length > 4000) {
    return { ok: false, error: 'Choose a reason and provide a short description of the issue.' };
  }

  // The database function locks the parent order while it validates the
  // review window and inserts the dispute. That makes it atomic with the
  // scheduled/admin completion function.
  const { data: disputeId, error } = await supabaseAdmin.rpc('open_kariv_order_dispute', {
    p_store_id: STORE_ID,
    p_order_id: orderId,
    p_buyer_user_id: user.id,
    p_reason: normalizedReason,
    p_description: normalizedDescription,
  });
  if (error || !disputeId) return { ok: false, error: error?.message || 'Unable to open this dispute.' };
  const { data } = await supabaseAdmin.from('disputes').select('*').eq('id', disputeId).maybeSingle();
  return data ? { ok: true, dispute: mapDisputeRowForBuyer(data) } : { ok: false, error: 'Unable to load the new dispute.' };
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
  return shapeRows(data || [], { audience: 'dealer' });
}

async function getOwnedDealerOrder(orderId, dealerUserId) {
  const { data, error } = await supabaseAdmin
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .eq('store_id', STORE_ID)
    .eq('dealer_user_id', dealerUserId)
    .maybeSingle();
  return error ? null : data;
}

async function cancelReservedOrder(orderId, { audience = 'buyer' } = {}) {
  const { data: cancelled, error } = await supabaseAdmin.rpc('cancel_kariv_order_before_payment', {
    p_store_id: STORE_ID,
    p_order_id: orderId,
  });
  if (error) return { ok: false, error: error.message };
  if (!cancelled) return { ok: false, error: 'This order can no longer be cancelled automatically. Contact Kariv support.' };
  const { data: updated } = await supabaseAdmin
    .from('orders').select('*').eq('id', orderId).eq('store_id', STORE_ID).maybeSingle();
  return updated ? { ok: true, order: await shapeOrderDetail(updated, { audience }) } : { ok: false, error: 'Order not found.' };
}

export async function declineDealerOrder(orderId) {
  const user = await requireDealer();
  const orderRow = await getOwnedDealerOrder(orderId, user.id);
  if (!orderRow) return { ok: false, error: 'Order not found.' };
  if (orderRow.escrow_status !== 'pending_review' || orderRow.purchase_status !== 'awaiting_seller_confirmation') {
    return { ok: false, error: 'Only an order awaiting seller confirmation can be declined.' };
  }
  return cancelReservedOrder(orderId, { audience: 'dealer' });
}

export async function acceptProtectedDealerOrder(orderId) {
  const user = await requireDealer();
  const orderRow = await getOwnedDealerOrder(orderId, user.id);
  if (!orderRow) return { ok: false, error: 'Order not found.' };
  if (orderRow.purchase_route !== PURCHASE_ROUTES.ESCROW) {
    return { ok: false, error: 'Only a protected dealer order can use this acceptance action.' };
  }
  if (orderRow.escrow_status !== 'pending_review' || orderRow.purchase_status !== 'awaiting_seller_confirmation') {
    return { ok: false, error: 'This order is no longer awaiting your confirmation.' };
  }
  const lineItem = Array.isArray(orderRow.products) ? orderRow.products[0] : null;
  const sourcePrice = lineItem?.conversion?.source_price ?? lineItem?.price;
  const sourceCurrency = lineItem?.conversion?.source_currency ?? lineItem?.currency ?? orderRow.currency;
  const currentPolicy = await getProductPurchasePolicy({
    dealer_id: user.id,
    price: sourcePrice,
    sale_price: null,
    currency: sourceCurrency,
  }, { buyerRequestsProtection: true });
  if (!currentPolicy || currentPolicy.purchaseRoute !== PURCHASE_ROUTES.ESCROW) {
    return { ok: false, error: 'This protected order requires a Kariv policy review before it can be accepted.' };
  }
  const { data: accepted, error: acceptanceError } = await supabaseAdmin.rpc('accept_kariv_protected_order', {
    p_store_id: STORE_ID,
    p_order_id: orderId,
    p_dealer_user_id: user.id,
  });
  if (acceptanceError || accepted !== true) {
    return { ok: false, error: acceptanceError?.message || 'Unable to accept this protected order.' };
  }
  const { data: updated } = await supabaseAdmin
    .from('orders').select('*').eq('id', orderId).eq('store_id', STORE_ID).eq('dealer_user_id', user.id).maybeSingle();
  return updated ? { ok: true, order: await shapeOrderDetail(updated, { audience: 'dealer' }) } : { ok: false, error: 'Order not found.' };
}

export async function acceptDirectDealerOrder(orderId) {
  const user = await requireDealer();

  const { data: orderRow, error } = await supabaseAdmin
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .eq('store_id', STORE_ID)
    .eq('dealer_user_id', user.id)
    .maybeSingle();
  if (error || !orderRow) return { ok: false, error: 'Order not found.' };
  if (orderRow.purchase_route !== PURCHASE_ROUTES.DEALER_DIRECT) {
    return { ok: false, error: 'Only a direct dealer order can be accepted with seller payment instructions.' };
  }
  if (orderRow.escrow_status !== 'pending_review' || orderRow.purchase_status !== 'awaiting_seller_confirmation') {
    return { ok: false, error: 'This order is no longer awaiting your confirmation.' };
  }
  const lineItem = Array.isArray(orderRow.products) ? orderRow.products[0] : null;
  const sourcePrice = lineItem?.conversion?.source_price ?? lineItem?.price;
  const sourceCurrency = lineItem?.conversion?.source_currency ?? lineItem?.currency ?? orderRow.currency;
  const currentPolicy = await getProductPurchasePolicy({
    dealer_id: user.id,
    price: sourcePrice,
    sale_price: null,
    currency: sourceCurrency,
  });
  if (!currentPolicy || currentPolicy.purchaseRoute !== PURCHASE_ROUTES.DEALER_DIRECT) {
    return { ok: false, error: 'Your current dealer status no longer permits direct payment. Contact Kariv support to review this order.' };
  }

  const { data: accepted, error: acceptanceError } = await supabaseAdmin.rpc('accept_kariv_direct_order', {
    p_store_id: STORE_ID,
    p_order_id: orderId,
    p_dealer_user_id: user.id,
  });
  if (acceptanceError || accepted !== true) {
    return { ok: false, error: acceptanceError?.message || 'Unable to accept this order.' };
  }
  const { data: updated } = await supabaseAdmin
    .from('orders').select('*').eq('id', orderId).eq('store_id', STORE_ID).eq('dealer_user_id', user.id).maybeSingle();
  return updated ? { ok: true, order: await shapeOrderDetail(updated, { audience: 'dealer' }) } : { ok: false, error: 'Order not found.' };
}

export async function confirmDirectDealerPaymentReceived(orderId) {
  const user = await requireDealer();
  const { data: orderRow, error } = await supabaseAdmin
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .eq('store_id', STORE_ID)
    .eq('dealer_user_id', user.id)
    .maybeSingle();
  if (error || !orderRow) return { ok: false, error: 'Order not found.' };
  if (orderRow.purchase_route !== PURCHASE_ROUTES.DEALER_DIRECT) {
    return { ok: false, error: 'Only a direct dealer order can be confirmed by the seller.' };
  }
  if (orderRow.escrow_status !== 'dealer_accepted' || orderRow.purchase_status !== 'awaiting_payment') {
    return { ok: false, error: 'This order is not awaiting direct payment.' };
  }
  if (!orderRow.payment_reference) {
    return { ok: false, error: 'Wait for the buyer to submit payment proof before confirming receipt.' };
  }
  const { data: confirmed, error: confirmationError } = await supabaseAdmin.rpc('confirm_kariv_direct_payment_received', {
    p_store_id: STORE_ID,
    p_order_id: orderId,
    p_dealer_user_id: user.id,
  });
  if (confirmationError || confirmed !== true) {
    return { ok: false, error: confirmationError?.message || 'Unable to confirm this direct payment.' };
  }
  const { data: updated } = await supabaseAdmin
    .from('orders').select('*').eq('id', orderId).eq('store_id', STORE_ID).eq('dealer_user_id', user.id).maybeSingle();
  return updated ? { ok: true, order: await shapeOrderDetail(updated, { audience: 'dealer' }) } : { ok: false, error: 'Order not found.' };
}

export async function shipDirectDealerOrder(orderId, trackingNumber) {
  const user = await requireDealer();
  const tracking = typeof trackingNumber === 'string' ? trackingNumber.trim() : '';
  if (tracking.length < 3 || tracking.length > 200) {
    return { ok: false, error: 'Provide a valid tracking number.' };
  }
  const { data: orderRow, error } = await supabaseAdmin
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .eq('store_id', STORE_ID)
    .eq('dealer_user_id', user.id)
    .maybeSingle();
  if (error || !orderRow) return { ok: false, error: 'Order not found.' };
  if (orderRow.purchase_route !== PURCHASE_ROUTES.DEALER_DIRECT) {
    return { ok: false, error: 'Only a direct dealer order can be shipped by the seller.' };
  }
  if (orderRow.escrow_status !== 'funds_secured' || orderRow.purchase_status !== 'paid') {
    return { ok: false, error: 'Confirm receipt of the direct payment before shipping.' };
  }
  const result = await transitionEscrow(orderRow, 'shipped', { tracking_number: tracking });
  if (!result.ok) return result;
  return { ok: true, order: await shapeOrderDetail(result.order, { audience: 'dealer' }) };
}

export async function shipProtectedDealerOrder(orderId, trackingNumber) {
  const user = await requireDealer();
  const tracking = typeof trackingNumber === 'string' ? trackingNumber.trim() : '';
  if (tracking.length < 3 || tracking.length > 200) return { ok: false, error: 'Provide a valid tracking number.' };
  const orderRow = await getOwnedDealerOrder(orderId, user.id);
  if (!orderRow) return { ok: false, error: 'Order not found.' };
  if (orderRow.purchase_route !== PURCHASE_ROUTES.ESCROW) {
    return { ok: false, error: 'Only a protected dealer order can use this shipping action.' };
  }
  if (orderRow.escrow_status !== 'funds_secured' || orderRow.purchase_status !== 'paid') {
    return { ok: false, error: 'Protected funds must be confirmed before shipping.' };
  }
  const result = await transitionEscrow(orderRow, 'shipped', { tracking_number: tracking });
  if (!result.ok) return result;
  return { ok: true, order: await shapeOrderDetail(result.order, { audience: 'dealer' }) };
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
  return shapeRows(data || [], { includePolicyAudit: true });
}

export async function getAdminOrder(orderId) {
  await requireAdmin();
  const { data, error } = await supabaseAdmin
    .from('orders').select('*').eq('id', orderId).eq('store_id', STORE_ID).maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) return null;
  return shapeOrderDetail(data, { includePolicyAudit: true });
}

export async function getAdminDashboardStats() {
  await requireAdmin();

  const [products, orders, customers, brands, recent] = await Promise.all([
    supabaseAdmin.from('products').select('id', { count: 'exact', head: true }).eq('store_id', STORE_ID),
    supabaseAdmin.from('orders').select('id', { count: 'exact', head: true }).eq('store_id', STORE_ID),
    supabaseAdmin.from('customers').select('id', { count: 'exact', head: true }).eq('store_id', STORE_ID),
    supabaseAdmin.from('brands').select('id', { count: 'exact', head: true }).eq('store_id', STORE_ID),
    supabaseAdmin.from('orders').select('id, buyer_user_id, total_amount, escrow_status, purchase_status, created_at')
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
      orderStatus: deriveOrderStatus(o.escrow_status, o.purchase_status),
    })),
  };
}

// ---- Escrow transitions — single enforcement choke point ----

async function transitionEscrow(orderRow, nextStatus, extraFields = {}) {
  if (!isValidEscrowTransition(orderRow.escrow_status, nextStatus)) {
    return { ok: false, error: `Cannot move an order from "${orderRow.escrow_status}" to "${nextStatus}".` };
  }

  if (nextStatus === 'shipped') {
    const tracking = String(extraFields.tracking_number || orderRow.tracking_number || '').trim();
    if (tracking.length < 3 || tracking.length > 200) {
      return { ok: false, error: 'Add a valid tracking number before marking this order as shipped.' };
    }
    extraFields = { ...extraFields, tracking_number: tracking };
  }

  if (nextStatus === 'funds_released') {
    const { data: openDisputes, error: disputeCheckError } = await supabaseAdmin
      .from('disputes').select('id').eq('order_id', orderRow.id).in('status', ['open', 'under_review']);
    if (disputeCheckError) return { ok: false, error: 'Unable to verify dispute status. The order was not completed.' };
    if (openDisputes?.length) {
      return { ok: false, error: 'This order has an open dispute — resolve it before releasing funds.' };
    }
  }

  const shippingStatus =
    nextStatus === 'shipped' ? 'shipped' :
    (nextStatus === 'verified' || nextStatus === 'funds_released') ? 'delivered' :
    orderRow.shipping_status;

  const purchaseStatus =
    nextStatus === 'pending_review' ? 'awaiting_seller_confirmation' :
    nextStatus === 'dealer_accepted' ? 'awaiting_payment' :
    nextStatus === 'funds_secured' ? 'paid' :
    nextStatus === 'shipped' ? 'shipped' :
    nextStatus === 'verified' ? 'delivered' :
    nextStatus === 'funds_released' ? 'completed' :
    nextStatus === 'cancelled' ? 'cancelled' :
    orderRow.purchase_status;

  const transitionFields = {
    escrow_status: nextStatus,
    purchase_status: purchaseStatus,
    shipping_status: shippingStatus,
    updated_at: new Date().toISOString(),
    ...(nextStatus === 'verified' && !orderRow.delivery_confirmed_at
      ? { delivery_confirmed_at: new Date().toISOString() }
      : {}),
    ...(nextStatus === 'funds_secured' ? { inventory_reserved: false } : {}),
    ...(nextStatus === 'funds_secured' ? { reservation_expires_at: null } : {}),
    ...extraFields,
  };

  const { data, error } = await supabaseAdmin
    .from('orders')
    .update(transitionFields)
    .eq('id', orderRow.id)
    .eq('escrow_status', orderRow.escrow_status) // optimistic-concurrency guard
    .select()
    .maybeSingle();

  if (error) return { ok: false, error: error.message };
  if (!data) return { ok: false, error: 'This order was just updated elsewhere — please refresh and try again.' };
  return { ok: true, order: data };
}

export async function updateEscrowStatus(orderId, nextStatus) {
  const admin = await requireAdmin();
  const { data: orderRow, error } = await supabaseAdmin.from('orders').select('*').eq('id', orderId).eq('store_id', STORE_ID).maybeSingle();
  if (error || !orderRow) return { ok: false, error: 'Order not found.' };
  if (
    nextStatus === 'dealer_accepted' &&
    orderRow.dealer_user_id
  ) {
    return { ok: false, error: 'The assigned dealer must accept this order through their seller portal.' };
  }
  if (
    orderRow.purchase_route === PURCHASE_ROUTES.DEALER_DIRECT &&
    ['funds_secured', 'shipped'].includes(nextStatus)
  ) {
    return { ok: false, error: nextStatus === 'funds_secured'
      ? 'The verified dealer must confirm receipt of a direct payment.'
      : 'The verified dealer must add tracking and mark this direct order as shipped.' };
  }
  if (nextStatus === 'funds_secured' && !orderRow.payment_reference) {
    return { ok: false, error: 'Payment proof must be submitted before payment can be confirmed.' };
  }
  if (nextStatus === 'cancelled') {
    const { data: cancelled, error: cancellationError } = await supabaseAdmin.rpc('cancel_kariv_order_before_payment', {
      p_store_id: STORE_ID,
      p_order_id: orderId,
    });
    if (cancellationError) return { ok: false, error: cancellationError.message };
    if (!cancelled) return { ok: false, error: 'Paid or fulfilled orders require the dedicated dispute/refund workflow.' };
    const { data: cancelledOrder } = await supabaseAdmin.from('orders').select('*').eq('id', orderId).eq('store_id', STORE_ID).maybeSingle();
    return cancelledOrder ? { ok: true, order: await shapeOrderDetail(cancelledOrder) } : { ok: false, error: 'Order not found.' };
  }
  if (nextStatus === 'funds_released') {
    if (orderRow.purchase_route === PURCHASE_ROUTES.ESCROW) {
      return { ok: false, error: 'Complete the dealer payout first, then record its transaction reference with the protected-payout action.' };
    }
    const { data: completed, error: completionError } = await supabaseAdmin.rpc('complete_kariv_order_after_review', {
      p_store_id: STORE_ID,
      p_order_id: orderId,
      p_financial_reference: null,
      p_recorded_by: admin.id,
    });
    if (completionError) return { ok: false, error: completionError.message };
    if (!completed) return { ok: false, error: 'The 14-day review period has not ended or an open dispute is blocking completion.' };
    const { data: completedOrder } = await supabaseAdmin.from('orders').select('*').eq('id', orderId).eq('store_id', STORE_ID).maybeSingle();
    return completedOrder ? { ok: true, order: await shapeOrderDetail(completedOrder) } : { ok: false, error: 'Order not found.' };
  }
  const result = await transitionEscrow(orderRow, nextStatus);
  if (!result.ok) return result;
  return { ok: true, order: await shapeOrderDetail(result.order) };
}

export async function completeProtectedPayout(orderId, financialReference) {
  const admin = await requireAdmin();
  const reference = typeof financialReference === 'string' ? financialReference.trim() : '';
  if (reference.length < 3 || reference.length > 250) {
    return { ok: false, error: 'Enter the completed bank or payment-provider payout reference.' };
  }

  const { data: orderRow, error } = await supabaseAdmin
    .from('orders').select('id, purchase_route').eq('id', orderId).eq('store_id', STORE_ID).maybeSingle();
  if (error || !orderRow) return { ok: false, error: 'Order not found.' };
  if (orderRow.purchase_route !== PURCHASE_ROUTES.ESCROW) {
    return { ok: false, error: 'Only a protected order can record a Kariv dealer payout.' };
  }

  const { data: completed, error: completionError } = await supabaseAdmin.rpc('complete_kariv_order_after_review', {
    p_store_id: STORE_ID,
    p_order_id: orderId,
    p_financial_reference: reference,
    p_recorded_by: admin.id,
  });
  if (completionError) return { ok: false, error: completionError.message };
  if (!completed) return { ok: false, error: 'The inspection period has not ended or an open dispute is blocking payout.' };

  const { data: completedOrder } = await supabaseAdmin
    .from('orders').select('*').eq('id', orderId).eq('store_id', STORE_ID).maybeSingle();
  return completedOrder
    ? { ok: true, order: await shapeOrderDetail(completedOrder) }
    : { ok: false, error: 'Order not found.' };
}

export async function rejectPaymentProof({ orderId, reason, cancelOrder = false }) {
  const admin = await requireAdmin();
  const normalizedReason = typeof reason === 'string' ? reason.trim() : '';
  if (normalizedReason.length < 5 || normalizedReason.length > 1000) {
    return { ok: false, error: 'Explain clearly why the payment proof was rejected (5–1,000 characters).' };
  }

  const { data: rejected, error } = await supabaseAdmin.rpc('reject_kariv_payment_proof', {
    p_store_id: STORE_ID,
    p_order_id: orderId,
    p_recorded_by: admin.id,
    p_reason: normalizedReason,
    p_cancel_order: cancelOrder === true,
  });
  if (error) return { ok: false, error: error.message };
  if (rejected !== true) return { ok: false, error: 'This order no longer has a payment proof awaiting review.' };

  const { data: updated, error: readError } = await supabaseAdmin
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .eq('store_id', STORE_ID)
    .maybeSingle();
  if (readError || !updated) return { ok: false, error: readError?.message || 'The proof decision was saved but the order could not be refreshed.' };
  return { ok: true, order: await shapeOrderDetail(updated, { includePolicyAudit: true }) };
}

export async function refundOrderBeforeDelivery({ orderId, financialReference, notes = '' }) {
  const admin = await requireAdmin();
  const reference = typeof financialReference === 'string' ? financialReference.trim() : '';
  const normalizedNotes = typeof notes === 'string' ? notes.trim() : '';
  if (reference.length < 3 || reference.length > 250) {
    return { ok: false, error: 'Complete the refund first, then enter its bank or payment-provider reference.' };
  }
  if (normalizedNotes.length > 2000) return { ok: false, error: 'Refund notes must be under 2,000 characters.' };

  const { data: refunded, error } = await supabaseAdmin.rpc('refund_kariv_order_before_delivery', {
    p_store_id: STORE_ID,
    p_order_id: orderId,
    p_financial_reference: reference,
    p_notes: normalizedNotes || null,
    p_recorded_by: admin.id,
  });
  if (error) return { ok: false, error: error.message };
  if (!refunded) return { ok: false, error: 'This order is no longer eligible for the pre-delivery refund workflow.' };

  const { data: updated } = await supabaseAdmin
    .from('orders').select('*').eq('id', orderId).eq('store_id', STORE_ID).maybeSingle();
  return updated ? { ok: true, order: await shapeOrderDetail(updated) } : { ok: false, error: 'Order not found.' };
}

export async function updateTrackingNumber(orderId, trackingNumber) {
  await requireAdmin();
  const tracking = typeof trackingNumber === 'string' ? trackingNumber.trim() : '';
  if (tracking.length < 3 || tracking.length > 200) {
    return { ok: false, error: 'Provide a valid tracking number.' };
  }
  const { data, error } = await supabaseAdmin
    .from('orders').update({ tracking_number: tracking, updated_at: new Date().toISOString() }).eq('id', orderId).eq('store_id', STORE_ID).select().maybeSingle();
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
  const { data: orderRow } = await supabaseAdmin
    .from('orders').select('id').eq('id', orderId).eq('store_id', STORE_ID).maybeSingle();
  if (!orderRow) return { ok: false, error: 'Order not found.' };
  const { error } = await supabaseAdmin.from('order_messages').update({ is_read: true }).eq('order_id', orderId).eq('recipient_role', 'buyer').eq('sender', 'buyer');
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function getAdminOrderDispute(orderId) {
  await requireAdmin();
  const { data: orderRow } = await supabaseAdmin
    .from('orders').select('id').eq('id', orderId).eq('store_id', STORE_ID).maybeSingle();
  if (!orderRow) return null;
  const { data, error } = await supabaseAdmin
    .from('disputes').select('*').eq('order_id', orderId).order('created_at', { ascending: false }).limit(1).maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) return null;

  const { data: financialEvent, error: financialEventError } = await supabaseAdmin
    .from('order_financial_events')
    .select('event_type, purchase_route, amount, currency, external_reference, recorded_by, created_at')
    .eq('store_id', STORE_ID)
    .eq('order_id', orderId)
    .eq('dispute_id', data.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  if (financialEventError) throw new Error(financialEventError.message);

  return {
    ...mapDisputeRowForAdmin(data),
    financialEvent: financialEvent ? {
      eventType: financialEvent.event_type,
      purchaseRoute: financialEvent.purchase_route,
      amount: financialEvent.amount,
      currency: financialEvent.currency,
      externalReference: financialEvent.external_reference,
      recordedBy: financialEvent.recorded_by,
      createdAt: financialEvent.created_at,
    } : null,
  };
}

export async function resolveDispute({ disputeId, outcome, mediatorNotes, financialReference }) {
  const admin = await requireAdmin();
  if (!['release_funds', 'refund', 'close_order'].includes(outcome)) return { ok: false, error: 'Invalid dispute outcome.' };
  const normalizedFinancialReference = typeof financialReference === 'string' ? financialReference.trim() : '';
  if (['release_funds', 'refund'].includes(outcome) && normalizedFinancialReference.length < 3) {
    return { ok: false, error: 'Enter the completed refund or payout transaction reference before resolving this dispute.' };
  }
  if (normalizedFinancialReference.length > 250) {
    return { ok: false, error: 'The completed transaction reference must be 250 characters or fewer.' };
  }
  const { data, error } = await supabaseAdmin.rpc('resolve_kariv_order_dispute', {
    p_store_id: STORE_ID,
    p_dispute_id: disputeId,
    p_outcome: outcome,
    p_financial_reference: normalizedFinancialReference,
    p_mediator_notes: typeof mediatorNotes === 'string' ? mediatorNotes.trim() : '',
    p_resolved_by: admin.id,
  });
  if (error || data !== true) return { ok: false, error: error?.message || 'The dispute could not be resolved.' };
  return { ok: true };
}
