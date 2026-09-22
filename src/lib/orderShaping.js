// Pure, dependency-free — safe to import from client or server code.
// Maps snake_case orders/order_messages/disputes rows onto the exact
// camelCase field names every existing buyer/dealer/admin screen already
// reads (those screens were built against the old Base44 shape and were
// never renamed — this file bridges the gap instead).

export function formatEscrowReference(id) {
  return 'KG-' + String(id).replace(/-/g, '').slice(0, 8).toUpperCase();
}

export function deriveOrderStatus(escrowStatus, purchaseStatus = null) {
  if (purchaseStatus === 'completed' || purchaseStatus === 'delivered') return 'Delivered';
  if (purchaseStatus === 'shipped') return 'Shipped';
  if (purchaseStatus === 'cancelled') return 'Cancelled';
  if (purchaseStatus) return 'Processing';
  if (escrowStatus === 'funds_released') return 'Delivered';
  if (escrowStatus === 'shipped' || escrowStatus === 'verified') return 'Shipped';
  if (escrowStatus === 'cancelled') return 'Cancelled';
  return 'Processing';
}

export function derivePaymentStatus({ escrowStatus, purchaseStatus, paymentReference, justificationMessage }) {
  if (['paid', 'shipped', 'delivered', 'completed'].includes(purchaseStatus)) return 'Paid';
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
  };
}

// identities: Map<clerkUserId, {fullName, email, phone}> from loadIdentities()
// justificationMessage: string|null — always null until Phase 6 wires the
// order_messages.kind-based derivation.
export function mapOrderRow(row, { justificationMessage = null, identities = new Map(), includePolicyAudit = false } = {}) {
  const products = Array.isArray(row.products) ? row.products.map(mapOrderLineItem) : [];
  const buyerIdentity = identities.get(row.buyer_user_id);
  const dealerIdentity = row.dealer_user_id ? identities.get(row.dealer_user_id) : null;
  const purchaseRoute = row.purchase_route || (row.dealer_user_id ? 'escrow' : 'kariv_direct');
  const policySnapshot = row.purchase_policy_snapshot || null;
  const orderReference = formatEscrowReference(row.id);

  const shaped = {
    id: row.id,
    orderReference,
    escrowReference: orderReference,
    escrowStatus: row.escrow_status,
    purchaseRoute,
    isProtected: purchaseRoute === 'escrow',
    purchaseStatus: row.purchase_status || null,
    buyerSelectedProtection: row.buyer_selected_protection === true,
    orderStatus: deriveOrderStatus(row.escrow_status, row.purchase_status),
    paymentMethod: row.payment_method,
    paymentStatus: derivePaymentStatus({
      escrowStatus: row.escrow_status,
      purchaseStatus: row.purchase_status,
      paymentReference: row.payment_reference,
      justificationMessage,
    }),
    justificationMessage,
    paymentProofUrl: row.payment_reference || null,
    paymentReviewDeadline: row.payment_review_deadline || null,
    sellerPaymentInstructions: row.seller_payment_instructions || '',
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
    // Keep the verified business shown as seller of record stable for the
    // lifetime of the order. Clerk identity changes must not rewrite who the
    // buyer was told they were paying at checkout.
    dealerName: policySnapshot?.seller_name || dealerIdentity?.fullName || '',
    idempotencyKey: row.idempotency_key,
    inventoryReserved: row.inventory_reserved === true,
    reservationExpiresAt: row.reservation_expires_at || null,
    created_date: row.created_at,
    updated_date: row.updated_at,
  };

  if (includePolicyAudit) {
    shaped.purchasePolicyVersion = row.purchase_policy_version ?? policySnapshot?.version ?? 0;
    shaped.policySnapshot = policySnapshot;
    shaped.routeDecision = {
      purchaseRoute,
      reasonCodes: policySnapshot?.reason_codes || [],
      dealerTier: policySnapshot?.dealer_tier || null,
      directLimitEur: policySnapshot?.direct_limit_eur ?? null,
      sourceValueEur: policySnapshot?.source_value_eur ?? null,
    };
  }

  return shaped;
}

export function mapOrderMessageRow(row, { order = null, identities = new Map() } = {}) {
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
