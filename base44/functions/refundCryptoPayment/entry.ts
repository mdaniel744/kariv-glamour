import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// refundCryptoPayment — Admin-only crypto payment refund

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    let user = null;
    try { user = await base44.auth.me(); } catch (e) { return Response.json({ error: 'Unauthorized' }, { status: 401 }); }
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    if (!Deno.env.get('CRYPTO_API_KEY') || !Deno.env.get('CRYPTO_PROVIDER')) {
      return Response.json({ error: 'Crypto payments not configured' }, { status: 503 });
    }

    const body = await req.json().catch(function() { return {}; });
    const orderId = body.orderId;
    if (!orderId) return Response.json({ error: 'Order ID is required' }, { status: 400 });

    const order = await base44.asServiceRole.entities.Orders.get(orderId);
    if (!order) return Response.json({ error: 'Order not found' }, { status: 404 });
    if (!order.providerCheckoutId) return Response.json({ error: 'No crypto payment for this order' }, { status: 400 });
    if (order.paymentStatus !== 'Paid') return Response.json({ error: 'Order is not in a paid state' }, { status: 400 });

    // NOWPayments doesn't support API refunds for all cases —
    // some refunds must be processed through the provider dashboard
    try {
      const sandbox = Deno.env.get('CRYPTO_ENVIRONMENT') !== 'production';
      const baseUrl = sandbox ? 'https://api-sandbox.nowpayments.io/v1' : 'https://api.nowpayments.io/v1';
      const apiKey = Deno.env.get('CRYPTO_API_KEY');
      const amount = body.amount || order.paymentAmount || order.totalAmount;

      const response = await fetch(baseUrl + '/payout', {
        method: 'POST',
        headers: { 'x-api-key': apiKey, 'Content-Type': 'application/json' },
        body: JSON.stringify({ payment_id: order.providerCheckoutId, amount: amount })
      });

      if (!response.ok) throw new Error('Provider error: ' + response.status);
      const data = await response.json();

      await base44.asServiceRole.entities.Orders.update(orderId, {
        paymentStatus: 'Refunded',
        orderStatus: 'Refunded',
        escrowStatus: 'cancelled'
      });

      if (order.products && order.products[0] && order.products[0].productId) {
        await base44.asServiceRole.entities.Products.update(order.products[0].productId, { availability: 'In Stock' });
      }

      return Response.json({ success: true, refundId: data.id || data.payout_id });
    } catch (e) {
      return Response.json({ error: 'Refund must be processed through provider dashboard' }, { status: 500 });
    }
  } catch (error) {
    console.error('refundCryptoPayment error:', error);
    return Response.json({ error: 'Failed to process refund' }, { status: 500 });
  }
});