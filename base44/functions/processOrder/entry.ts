import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// ════════════════════════════════════════════════════════════════
// processOrder — Protected order creation, status updates, payments
// Fail-closed: 401 if no auth, 403 if unauthorized, 400 if invalid
// Idempotency: same idempotencyKey returns existing order
// Server-side price validation: never trusts client-supplied prices
// Inventory reservation with expiration
// Escrow state machine enforcement
// ════════════════════════════════════════════════════════════════

const RESERVATION_DURATION_MS = 30 * 60 * 1000; // 30 minutes
const ESCROW_TRANSITIONS = {
  pending_review: ['dealer_accepted', 'cancelled'],
  dealer_accepted: ['funds_secured', 'cancelled'],
  funds_secured: ['shipped', 'cancelled'],
  shipped: ['verified'],
  verified: ['funds_released'],
  funds_released: [],
  cancelled: []
};

function isValidTransition(from, to) {
  const allowed = ESCROW_TRANSITIONS[from];
  return allowed ? allowed.includes(to) : false;
}

async function requireAuth(base44) {
  let user = null;
  try { user = await base44.auth.me(); } catch (e) { return null; }
  return user;
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // ── FAIL CLOSED: require authentication ──
    const user = await requireAuth(base44);
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json().catch(function() { return {}; });
    const action = body.action;

    // ════════════════════════════════════════════════════════════════
    // ACTION: create — buyer initiates a purchase
    // ════════════════════════════════════════════════════════════════
    if (action === 'create') {
      const productId = body.productId;
      const shippingDetails = body.shippingDetails;
      const idempotencyKey = body.idempotencyKey;

      // Validate required fields
      if (!productId || typeof productId !== 'string') {
        return Response.json({ error: 'Product ID is required' }, { status: 400 });
      }
      if (!shippingDetails || !shippingDetails.fullName || !shippingDetails.street || !shippingDetails.city || !shippingDetails.postalCode || !shippingDetails.country) {
        return Response.json({ error: 'Complete shipping details are required' }, { status: 400 });
      }

      // ── Idempotency check: if idempotencyKey provided, check for existing order ──
      if (idempotencyKey) {
        try {
          const existing = await base44.asServiceRole.entities.Orders.filter({ idempotencyKey: idempotencyKey });
          if (existing && existing.length > 0) {
            // Return the existing order — do NOT create a duplicate
            return Response.json({ order: existing[0], escrowReference: existing[0].escrowReference, idempotent: true });
          }
        } catch (e) { /* idempotency check is best-effort */ }
      }

      // ── Server-side product fetch: NEVER trust client-supplied prices ──
      const product = await base44.asServiceRole.entities.Products.get(productId);
      if (!product) {
        return Response.json({ error: 'Product not found' }, { status: 404 });
      }

      // ── Availability check: prevent ordering unavailable products ──
      if (product.availability === 'Sold' || product.availability === 'Reserved') {
        return Response.json({ error: 'This product is no longer available' }, { status: 400 });
      }

      // ── Server-side price: use the current product record price ──
      const serverPrice = product.salePrice || product.price;
      if (!serverPrice || serverPrice <= 0) {
        return Response.json({ error: 'Invalid product price' }, { status: 400 });
      }

      // ── Derive dealer identity from the product, not from the client ──
      let dealerName = '';
      let dealerId = '';
      let dealerEmail = '';
      try {
        if (product.created_by_id) {
          const dealer = await base44.asServiceRole.entities.User.get(product.created_by_id);
          if (dealer) {
            dealerId = dealer.id;
            dealerName = dealer.full_name || dealer.email;
            dealerEmail = dealer.email;
          }
        }
      } catch (e) { /* product may not have a creator */ }

      // ── Generate reservation and escrow reference ──
      const now = new Date();
      const reservationExpiresAt = new Date(now.getTime() + RESERVATION_DURATION_MS).toISOString();
      const escrowRef = 'KRV-' + now.getTime().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 8).toUpperCase();

      // ── Create order with server-validated data ──
      const order = await base44.asServiceRole.entities.Orders.create({
        customerName: user.full_name || user.email,
        customerEmail: user.email,
        buyerId: user.id,
        buyerEmail: user.email,
        dealerId: dealerId,
        dealerEmail: dealerEmail,
        dealerName: dealerName,
        products: [{
          productId: product.id,
          productTitle: product.productTitle,
          price: serverPrice, // Server-validated price
          quantity: 1,
          brand: product.brand,
          condition: product.condition,
          featuredImage: product.featuredImage
        }],
        totalAmount: serverPrice, // Server-validated total
        currency: product.currency || 'EUR',
        orderStatus: 'Pending',
        escrowStatus: 'pending_review',
        paymentStatus: 'Pending',
        shippingStatus: 'Pending',
        shippingAddress: shippingDetails.fullName + ', ' + shippingDetails.street + ', ' + shippingDetails.city + ', ' + shippingDetails.postalCode + ', ' + shippingDetails.country,
        shippingDetails: shippingDetails,
        escrowReference: escrowRef,
        reservationExpiresAt: reservationExpiresAt,
        idempotencyKey: idempotencyKey || null,
        notes: ''
      });

      // ── Reserve the product ──
      await base44.asServiceRole.entities.Products.update(product.id, { availability: 'Reserved' });

      return Response.json({ order: order, escrowReference: escrowRef });
    }

    // ════════════════════════════════════════════════════════════════
    // ACTION: update_escrow — admin updates escrow status
    // ════════════════════════════════════════════════════════════════
    if (action === 'update_escrow') {
      // Require admin
      if (user.role !== 'admin') {
        return Response.json({ error: 'Admin access required' }, { status: 403 });
      }

      const orderId = body.orderId;
      const newEscrowStatus = body.escrowStatus;
      const newPaymentStatus = body.paymentStatus;
      const newOrderStatus = body.orderStatus;
      const newShippingStatus = body.shippingStatus;
      const trackingNumber = body.trackingNumber;

      if (!orderId) {
        return Response.json({ error: 'Order ID is required' }, { status: 400 });
      }

      const existingOrder = await base44.asServiceRole.entities.Orders.get(orderId);
      if (!existingOrder) {
        return Response.json({ error: 'Order not found' }, { status: 404 });
      }

      // Prevent self-acceptance: non-admins cannot manage their own order.
      // Admins are exempt so they can manage all orders (including test orders they placed).
      if (existingOrder.buyerId === user.id && user.role !== 'admin') {
        return Response.json({ error: 'You cannot manage an order you placed yourself' }, { status: 403 });
      }

      // ── Validate escrow state transition ──
      if (newEscrowStatus && !isValidTransition(existingOrder.escrowStatus, newEscrowStatus)) {
        return Response.json({
          error: 'Invalid status transition from ' + existingOrder.escrowStatus + ' to ' + newEscrowStatus
        }, { status: 400 });
      }

      // ── Prevent invalid payment transitions ──
      // Cannot go directly from Pending to Paid without going through escrow flow
      if (newPaymentStatus === 'Paid' && existingOrder.escrowStatus === 'pending_review') {
        return Response.json({ error: 'Cannot mark as paid before escrow is accepted' }, { status: 400 });
      }

      const updateData = {};
      if (newEscrowStatus) updateData.escrowStatus = newEscrowStatus;
      if (newPaymentStatus) updateData.paymentStatus = newPaymentStatus;
      if (newOrderStatus) updateData.orderStatus = newOrderStatus;
      if (newShippingStatus) updateData.shippingStatus = newShippingStatus;
      if (trackingNumber) updateData.trackingNumber = trackingNumber;

      const updated = await base44.asServiceRole.entities.Orders.update(orderId, updateData);

      // If funds released, mark product as Sold
      if (newEscrowStatus === 'funds_released' && updated.products && updated.products[0] && updated.products[0].productId) {
        await base44.asServiceRole.entities.Products.update(updated.products[0].productId, { availability: 'Sold' });
      }

      // If cancelled, release the product reservation
      if (newEscrowStatus === 'cancelled' && updated.products && updated.products[0] && updated.products[0].productId) {
        await base44.asServiceRole.entities.Products.update(updated.products[0].productId, { availability: 'In Stock' });
      }

      return Response.json({ order: updated });
    }

    // ════════════════════════════════════════════════════════════════
    // ACTION: select_payment — buyer selects payment method
    // ════════════════════════════════════════════════════════════════
    if (action === 'select_payment') {
      const orderId = body.orderId;
      const paymentMethod = body.paymentMethod;

      if (!orderId) return Response.json({ error: 'Order ID is required' }, { status: 400 });
      if (!['bank_transfer', 'crypto'].includes(paymentMethod)) {
        return Response.json({ error: 'Invalid payment method' }, { status: 400 });
      }

      const order = await base44.asServiceRole.entities.Orders.get(orderId);
      if (!order) return Response.json({ error: 'Order not found' }, { status: 404 });

      // Ownership check
      if (order.buyerId !== user.id) {
        return Response.json({ error: 'Not your order' }, { status: 403 });
      }

      // State check
      if (order.escrowStatus !== 'dealer_accepted') {
        return Response.json({ error: 'Order not ready for payment' }, { status: 400 });
      }

      const updated = await base44.asServiceRole.entities.Orders.update(orderId, { paymentMethod: paymentMethod });
      return Response.json({ order: updated });
    }

    // ════════════════════════════════════════════════════════════════
    // ACTION: confirm_payment_sent — buyer confirms bank transfer sent
    // ════════════════════════════════════════════════════════════════
    if (action === 'confirm_payment_sent') {
      const orderId = body.orderId;
      const paymentProofUrl = body.paymentProofUrl;
      if (!orderId) return Response.json({ error: 'Order ID is required' }, { status: 400 });

      // Require proof of payment upload
      if (!paymentProofUrl || typeof paymentProofUrl !== 'string') {
        return Response.json({ error: 'Proof of payment is required' }, { status: 400 });
      }

      const order = await base44.asServiceRole.entities.Orders.get(orderId);
      if (!order) return Response.json({ error: 'Order not found' }, { status: 404 });

      // Ownership check
      if (order.buyerId !== user.id) {
        return Response.json({ error: 'Not your order' }, { status: 403 });
      }

      // State check
      if (order.escrowStatus !== 'dealer_accepted') {
        return Response.json({ error: 'Order not ready for payment' }, { status: 400 });
      }
      if (!order.paymentMethod) {
        return Response.json({ error: 'Select a payment method first' }, { status: 400 });
      }
      if (order.paymentStatus === 'Awaiting Confirmation') {
        return Response.json({ error: 'Payment already confirmed as sent' }, { status: 400 });
      }

      const updated = await base44.asServiceRole.entities.Orders.update(orderId, {
        paymentStatus: 'Awaiting Confirmation',
        paymentProofUrl: paymentProofUrl,
        justificationMessage: '',
        notes: (order.notes || '') + '\n[' + new Date().toISOString() + '] Buyer confirmed payment sent via ' + order.paymentMethod + '. Proof uploaded: ' + paymentProofUrl
      });
      return Response.json({ order: updated });
    }

    // ════════════════════════════════════════════════════════════════
    // ACTION: request_justification — admin emails buyer for more info
    // ════════════════════════════════════════════════════════════════
    if (action === 'request_justification') {
      if (user.role !== 'admin') {
        return Response.json({ error: 'Admin access required' }, { status: 403 });
      }

      const orderId = body.orderId;
      const subject = body.subject;
      const message = body.message;

      if (!orderId) return Response.json({ error: 'Order ID is required' }, { status: 400 });
      if (!subject || typeof subject !== 'string' || !subject.trim()) {
        return Response.json({ error: 'Email subject is required' }, { status: 400 });
      }
      if (!message || typeof message !== 'string' || !message.trim()) {
        return Response.json({ error: 'Email message is required' }, { status: 400 });
      }

      const order = await base44.asServiceRole.entities.Orders.get(orderId);
      if (!order) return Response.json({ error: 'Order not found' }, { status: 404 });

      // Send email to the buyer
      if (order.buyerEmail) {
        await base44.asServiceRole.integrations.Core.SendEmail({
          to: order.buyerEmail,
          subject: subject.trim(),
          body: message.trim()
        });
      }

      const updated = await base44.asServiceRole.entities.Orders.update(orderId, {
        paymentStatus: 'Justification Requested',
        justificationMessage: message.trim(),
        notes: (order.notes || '') + '\n[' + new Date().toISOString() + '] Admin requested justification (subject: ' + subject.trim() + ')'
      });

      return Response.json({ order: updated });
    }

    // ════════════════════════════════════════════════════════════════
    // ACTION: cancel — buyer cancels their own pending order
    // ════════════════════════════════════════════════════════════════
    if (action === 'cancel') {
      const orderId = body.orderId;
      if (!orderId) return Response.json({ error: 'Order ID is required' }, { status: 400 });

      const order = await base44.asServiceRole.entities.Orders.get(orderId);
      if (!order) return Response.json({ error: 'Order not found' }, { status: 404 });

      // Ownership check
      if (order.buyerId !== user.id && user.role !== 'admin') {
        return Response.json({ error: 'Not your order' }, { status: 403 });
      }

      // Can only cancel if in early stages
      if (!['pending_review', 'dealer_accepted'].includes(order.escrowStatus)) {
        return Response.json({ error: 'Order cannot be cancelled at this stage' }, { status: 400 });
      }

      const updated = await base44.asServiceRole.entities.Orders.update(orderId, {
        escrowStatus: 'cancelled',
        orderStatus: 'Cancelled'
      });

      // Release the product reservation
      if (updated.products && updated.products[0] && updated.products[0].productId) {
        await base44.asServiceRole.entities.Products.update(updated.products[0].productId, { availability: 'In Stock' });
      }

      return Response.json({ order: updated });
    }

    return Response.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    console.error('processOrder error:', error);
    // Generic error — never expose stack traces
    return Response.json({ error: 'An error occurred processing your request' }, { status: 500 });
  }
});