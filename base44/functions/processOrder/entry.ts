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

      // Create a mail record so the buyer can see and respond in their Mails tab
      await base44.asServiceRole.entities.OrderMessage.create({
        orderId: orderId,
        buyerId: order.buyerId,
        buyerEmail: order.buyerEmail,
        buyerName: order.customerName,
        orderReference: order.escrowReference,
        subject: subject.trim(),
        body: message.trim(),
        sender: 'admin',
        isRead: false
      });

      return Response.json({ order: updated });
    }

    // ════════════════════════════════════════════════════════════════
    // ACTION: send_message — buyer replies in a mail thread
    // ════════════════════════════════════════════════════════════════
    if (action === 'send_message') {
      const orderId = body.orderId;
      const subject = body.subject;
      const message = body.message;

      if (!orderId) return Response.json({ error: 'Order ID is required' }, { status: 400 });
      if (!message || typeof message !== 'string' || !message.trim()) {
        return Response.json({ error: 'Message is required' }, { status: 400 });
      }

      const order = await base44.asServiceRole.entities.Orders.get(orderId);
      if (!order) return Response.json({ error: 'Order not found' }, { status: 404 });

      // Only the buyer who owns the order can send messages
      if (order.buyerId !== user.id) {
        return Response.json({ error: 'Not your order' }, { status: 403 });
      }

      const msg = await base44.asServiceRole.entities.OrderMessage.create({
        orderId: orderId,
        buyerId: user.id,
        buyerEmail: order.buyerEmail,
        buyerName: order.customerName,
        orderReference: order.escrowReference,
        subject: (subject || '').trim() || 'Re: ' + (order.escrowReference || 'Your Order'),
        body: message.trim(),
        sender: 'buyer',
        isRead: false
      });

      return Response.json({ message: msg });
    }

    // ════════════════════════════════════════════════════════════════
    // ACTION: admin_reply — admin replies in a mail thread
    // ════════════════════════════════════════════════════════════════
    if (action === 'admin_reply') {
      if (user.role !== 'admin') {
        return Response.json({ error: 'Admin access required' }, { status: 403 });
      }

      const orderId = body.orderId;
      const subject = body.subject;
      const message = body.message;

      if (!orderId) return Response.json({ error: 'Order ID is required' }, { status: 400 });
      if (!message || typeof message !== 'string' || !message.trim()) {
        return Response.json({ error: 'Message is required' }, { status: 400 });
      }

      const order = await base44.asServiceRole.entities.Orders.get(orderId);
      if (!order) return Response.json({ error: 'Order not found' }, { status: 404 });

      if (order.buyerEmail) {
        await base44.asServiceRole.integrations.Core.SendEmail({
          to: order.buyerEmail,
          subject: (subject || '').trim() || 'Re: ' + (order.escrowReference || 'Your Order'),
          body: message.trim()
        });
      }

      const msg = await base44.asServiceRole.entities.OrderMessage.create({
        orderId: orderId,
        buyerId: order.buyerId,
        buyerEmail: order.buyerEmail,
        buyerName: order.customerName,
        orderReference: order.escrowReference,
        subject: (subject || '').trim() || 'Re: ' + (order.escrowReference || 'Your Order'),
        body: message.trim(),
        sender: 'admin',
        isRead: false
      });

      return Response.json({ message: msg });
    }

    // ════════════════════════════════════════════════════════════════
    // ACTION: confirm_courier_delivery — admin marks delivery confirmed by courier
    // Transitions shipped → verified, starts the 14-day inspection hold
    // ════════════════════════════════════════════════════════════════
    if (action === 'confirm_courier_delivery') {
      if (user.role !== 'admin') {
        return Response.json({ error: 'Admin access required' }, { status: 403 });
      }

      const orderId = body.orderId;
      if (!orderId) return Response.json({ error: 'Order ID is required' }, { status: 400 });

      const order = await base44.asServiceRole.entities.Orders.get(orderId);
      if (!order) return Response.json({ error: 'Order not found' }, { status: 404 });

      // State check — can only confirm delivery when order is shipped
      if (order.escrowStatus !== 'shipped') {
        return Response.json({ error: 'Order must be in shipped state to confirm delivery' }, { status: 400 });
      }

      const confirmedAt = new Date().toISOString();
      const updated = await base44.asServiceRole.entities.Orders.update(orderId, {
        escrowStatus: 'verified',
        shippingStatus: 'Delivered',
        deliveryConfirmedAt: confirmedAt,
        notes: (order.notes || '') + '\n[' + confirmedAt + '] Courier confirmed delivery. 14-day inspection period started.'
      });

      // Notify buyer that delivery was confirmed and inspection period has begun
      if (order.buyerEmail) {
        try {
          await base44.asServiceRole.integrations.Core.SendEmail({
            to: order.buyerEmail,
            subject: 'Delivery Confirmed — 14-Day Inspection Period Started',
            body: 'Dear ' + order.customerName + ',\n\nOur courier service has confirmed delivery of your order ' + order.escrowReference + '. Your 14-day inspection period has now begun.\n\nDuring this period, your payment is held securely in escrow. If you have any concerns about the watch, you may flag this order to open a dispute case and our mediation team will review it.\n\nIf no dispute is filed within 14 days, funds will be automatically released to the dealer and the transaction will be marked complete.\n\nBest regards,\nThe Kariv Glamour Team'
          });
        } catch (e) { /* email failure should not block */ }
      }

      return Response.json({ order: updated });
    }

    // ════════════════════════════════════════════════════════════════
    // ACTION: flag_order — buyer flags the order during the 14-day window
    // Opens a dispute case; freezes escrow auto-release until resolved
    // ════════════════════════════════════════════════════════════════
    if (action === 'flag_order') {
      const orderId = body.orderId;
      const reason = body.reason;
      const description = body.description;
      if (!orderId) return Response.json({ error: 'Order ID is required' }, { status: 400 });
      if (!reason || !['authenticity_issue', 'condition_mismatch', 'item_not_received', 'damaged_in_transit', 'not_as_described', 'other'].includes(reason)) {
        return Response.json({ error: 'Valid reason is required' }, { status: 400 });
      }
      if (!description || typeof description !== 'string' || !description.trim()) {
        return Response.json({ error: 'Description is required' }, { status: 400 });
      }

      const order = await base44.asServiceRole.entities.Orders.get(orderId);
      if (!order) return Response.json({ error: 'Order not found' }, { status: 404 });

      // Ownership check — only the buyer who owns the order can flag it
      if (order.buyerId !== user.id) {
        return Response.json({ error: 'Not your order' }, { status: 403 });
      }

      // State check — can only flag during the inspection period (verified status)
      if (order.escrowStatus !== 'verified') {
        return Response.json({ error: 'Order can only be flagged during the inspection period' }, { status: 400 });
      }

      // Check for existing open dispute
      const existing = await base44.asServiceRole.entities.Dispute.filter({ orderId: orderId });
      const hasOpen = existing && existing.some(d => ['open', 'under_review'].includes(d.status));
      if (hasOpen) {
        return Response.json({ error: 'A dispute is already open for this order' }, { status: 400 });
      }

      const dispute = await base44.asServiceRole.entities.Dispute.create({
        orderId: orderId,
        escrowReference: order.escrowReference,
        buyerId: order.buyerId,
        buyerEmail: order.buyerEmail,
        buyerName: order.customerName,
        dealerId: order.dealerId,
        dealerName: order.dealerName,
        reason: reason,
        description: description.trim(),
        status: 'open'
      });

      // Update order notes
      await base44.asServiceRole.entities.Orders.update(orderId, {
        notes: (order.notes || '') + '\n[' + new Date().toISOString() + '] Buyer flagged order. Reason: ' + reason + '. Dispute case opened.'
      });

      return Response.json({ dispute: dispute });
    }

    // ════════════════════════════════════════════════════════════════
    // ACTION: resolve_dispute — admin/mediator resolves a dispute case
    // ════════════════════════════════════════════════════════════════
    if (action === 'resolve_dispute') {
      if (user.role !== 'admin') {
        return Response.json({ error: 'Admin access required' }, { status: 403 });
      }

      const disputeId = body.disputeId;
      const resolution = body.resolution;
      const mediatorNotes = body.mediatorNotes;
      const outcome = body.outcome; // 'resolved_buyer' | 'resolved_dealer'
      const orderAction = body.orderAction; // 'release_funds' | 'refund' | null

      if (!disputeId) return Response.json({ error: 'Dispute ID is required' }, { status: 400 });
      if (!['resolved_buyer', 'resolved_dealer', 'withdrawn'].includes(outcome)) {
        return Response.json({ error: 'Valid outcome is required' }, { status: 400 });
      }

      const dispute = await base44.asServiceRole.entities.Dispute.get(disputeId);
      if (!dispute) return Response.json({ error: 'Dispute not found' }, { status: 404 });

      const updated = await base44.asServiceRole.entities.Dispute.update(disputeId, {
        status: outcome,
        resolution: resolution || '',
        mediatorNotes: mediatorNotes || '',
        resolvedAt: new Date().toISOString()
      });

      // If mediator decides in buyer's favor with refund, cancel the order
      if (orderAction === 'refund') {
        const order = await base44.asServiceRole.entities.Orders.get(dispute.orderId);
        if (order) {
          await base44.asServiceRole.entities.Orders.update(dispute.orderId, {
            escrowStatus: 'cancelled',
            orderStatus: 'Refunded',
            paymentStatus: 'Refunded'
          });
          if (order.products && order.products[0] && order.products[0].productId) {
            await base44.asServiceRole.entities.Products.update(order.products[0].productId, { availability: 'In Stock' });
          }
        }
      }

      // If mediator decides in dealer's favor, release funds
      if (orderAction === 'release_funds') {
        const order = await base44.asServiceRole.entities.Orders.get(dispute.orderId);
        if (order) {
          await base44.asServiceRole.entities.Orders.update(dispute.orderId, {
            escrowStatus: 'funds_released',
            orderStatus: 'Delivered',
            paymentStatus: 'Paid'
          });
          if (order.products && order.products[0] && order.products[0].productId) {
            await base44.asServiceRole.entities.Products.update(order.products[0].productId, { availability: 'Sold' });
          }
        }
      }

      return Response.json({ dispute: updated });
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