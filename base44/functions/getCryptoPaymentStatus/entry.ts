import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// getCryptoPaymentStatus — Buyer checks their crypto payment status
// Retrieves current status from provider, not just local DB

function normalizeStatus(status) {
  if (!status) return 'pending';
  const s = status.toLowerCase();
  if (s.includes('confirmed') || s.includes('finished') || s === 'paid') return 'confirmed';
  if (s.includes('confirming') || s.includes('waiting')) return 'confirming';
  if (s.includes('expired') || s.includes('timeout')) return 'expired';
  if (s.includes('failed') || s.includes('error')) return 'failed';
  if (s.includes('refund')) return 'refunded';
  return 'pending';
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    let user = null;
    try { user = await base44.auth.me(); } catch (e) { return Response.json({ error: 'Unauthorized' }, { status: 401 }); }
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json().catch(function() { return {}; });
    const orderId = body.orderId;
    if (!orderId) return Response.json({ error: 'Order ID is required' }, { status: 400 });

    const order = await base44.asServiceRole.entities.Orders.get(orderId);
    if (!order) return Response.json({ error: 'Order not found' }, { status: 404 });
    if (order.buyerId !== user.id && user.role !== 'admin') {
      return Response.json({ error: 'Not your order' }, { status: 403 });
    }

    if (!order.providerCheckoutId || !Deno.env.get('CRYPTO_API_KEY')) {
      return Response.json({
        paymentStatus: order.paymentStatus,
        escrowStatus: order.escrowStatus,
        providerStatus: null
      });
    }

    let providerStatus = 'pending';
    let transactionHash = order.transactionHash;
    try {
      const sandbox = Deno.env.get('CRYPTO_ENVIRONMENT') !== 'production';
      const baseUrl = sandbox ? 'https://api-sandbox.nowpayments.io/v1' : 'https://api.nowpayments.io/v1';
      const apiKey = Deno.env.get('CRYPTO_API_KEY');
      const response = await fetch(baseUrl + '/invoice/' + order.providerCheckoutId, {
        headers: { 'x-api-key': apiKey }
      });
      if (response.ok) {
        const data = await response.json();
        providerStatus = normalizeStatus(data.payment_status);
        if (data.txid) transactionHash = data.txid;
      }
    } catch (e) {
      return Response.json({
        paymentStatus: order.paymentStatus,
        escrowStatus: order.escrowStatus,
        providerStatus: 'unavailable'
      });
    }

    return Response.json({
      paymentStatus: order.paymentStatus,
      escrowStatus: order.escrowStatus,
      providerStatus: providerStatus,
      transactionHash: transactionHash,
      amount: order.paymentAmount || order.totalAmount,
      currency: order.paymentCurrency || order.currency
    });
  } catch (error) {
    console.error('getCryptoPaymentStatus error:', error);
    return Response.json({ error: 'Failed to get payment status' }, { status: 500 });
  }
});