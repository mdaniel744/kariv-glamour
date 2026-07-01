import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { action, orderId, productId, paymentMethod, shippingDetails, notes } = body;

    // ACTION: create — buyer initiates a purchase
    if (action === 'create') {
      const product = await base44.asServiceRole.entities.Products.get(productId);
      if (!product) return Response.json({ error: 'Product not found' }, { status: 404 });
      if (product.availability === 'Sold') return Response.json({ error: 'Product is no longer available' }, { status: 400 });

      const escrowRef = 'KRV-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
      const price = product.salePrice || product.price;

      // Get dealer info from product creator
      let dealerName = '';
      let dealerId = '';
      try {
        const dealer = await base44.asServiceRole.entities.User.get(product.created_by_id);
        if (dealer) {
          dealerId = dealer.id;
          dealerName = dealer.full_name || dealer.email;
        }
      } catch (e) { /* product may not have a creator */ }

      const order = await base44.asServiceRole.entities.Orders.create({
        customerName: user.full_name || user.email,
        customerEmail: user.email,
        buyerId: user.id,
        dealerId: dealerId,
        dealerName: dealerName,
        products: [{
          productId: product.id,
          productTitle: product.productTitle,
          price: price,
          quantity: 1,
          brand: product.brand,
          condition: product.condition,
          featuredImage: product.featuredImage
        }],
        totalAmount: price,
        currency: product.currency || 'EUR',
        orderStatus: 'Pending',
        escrowStatus: 'pending_review',
        paymentStatus: 'Pending',
        shippingStatus: 'Pending',
        shippingAddress: shippingDetails ? `${shippingDetails.fullName}, ${shippingDetails.street}, ${shippingDetails.city}, ${shippingDetails.postalCode}, ${shippingDetails.country}` : '',
        shippingDetails: shippingDetails || null,
        paymentMethod: paymentMethod || null,
        escrowReference: escrowRef,
        notes: notes || ''
      });

      // Update product availability to Reserved
      await base44.asServiceRole.entities.Products.update(product.id, { availability: 'Reserved' });

      return Response.json({ order, escrowReference: escrowRef });
    }

    // ACTION: update_escrow — admin updates escrow status
    if (action === 'update_escrow') {
      if (user.role !== 'admin') return Response.json({ error: 'Admin only' }, { status: 403 });
      const { escrowStatus, paymentStatus, orderStatus, shippingStatus, trackingNumber } = body;

      // Fetch order to prevent self-acceptance (admin cannot accept their own order)
      const existingOrder = await base44.asServiceRole.entities.Orders.get(orderId);
      if (!existingOrder) return Response.json({ error: 'Order not found' }, { status: 404 });
      if (existingOrder.buyerId === user.id) {
        return Response.json({ error: 'Security: You cannot manage an order you placed yourself. Another admin must handle it.' }, { status: 403 });
      }

      const updateData = {};
      if (escrowStatus) updateData.escrowStatus = escrowStatus;
      if (paymentStatus) updateData.paymentStatus = paymentStatus;
      if (orderStatus) updateData.orderStatus = orderStatus;
      if (shippingStatus) updateData.shippingStatus = shippingStatus;
      if (trackingNumber) updateData.trackingNumber = trackingNumber;

      const updated = await base44.asServiceRole.entities.Orders.update(orderId, updateData);

      // If funds released, update product to Sold
      if (escrowStatus === 'funds_released' && updated.products?.[0]?.productId) {
        await base44.asServiceRole.entities.Products.update(updated.products[0].productId, { availability: 'Sold' });
      }

      return Response.json({ order: updated });
    }

    // ACTION: select_payment — buyer selects payment method after dealer accepts
    if (action === 'select_payment') {
      const order = await base44.asServiceRole.entities.Orders.get(orderId);
      if (!order) return Response.json({ error: 'Order not found' }, { status: 404 });
      if (order.buyerId !== user.id) return Response.json({ error: 'Not your order' }, { status: 403 });
      if (order.escrowStatus !== 'dealer_accepted') return Response.json({ error: 'Order not ready for payment' }, { status: 400 });
      if (!['bank_transfer', 'crypto'].includes(paymentMethod)) return Response.json({ error: 'Invalid payment method' }, { status: 400 });

      const updated = await base44.asServiceRole.entities.Orders.update(orderId, { paymentMethod });
      return Response.json({ order: updated });
    }

    // ACTION: confirm_payment_sent — buyer confirms they have sent the payment
    if (action === 'confirm_payment_sent') {
      const order = await base44.asServiceRole.entities.Orders.get(orderId);
      if (!order) return Response.json({ error: 'Order not found' }, { status: 404 });
      if (order.buyerId !== user.id) return Response.json({ error: 'Not your order' }, { status: 403 });
      if (order.escrowStatus !== 'dealer_accepted') return Response.json({ error: 'Order not ready for payment' }, { status: 400 });
      if (!order.paymentMethod) return Response.json({ error: 'Select a payment method first' }, { status: 400 });
      if (order.paymentStatus === 'Awaiting Confirmation') return Response.json({ error: 'Payment already confirmed as sent' }, { status: 400 });

      const updated = await base44.asServiceRole.entities.Orders.update(orderId, {
        paymentStatus: 'Awaiting Confirmation',
        notes: (order.notes || '') + `\n[${new Date().toISOString()}] Buyer confirmed payment sent via ${order.paymentMethod}.`
      });
      return Response.json({ order: updated });
    }

    return Response.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});