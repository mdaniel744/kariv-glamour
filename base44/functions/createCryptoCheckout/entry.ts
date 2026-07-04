import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// ════════════════════════════════════════════════════════════════
// createCryptoCheckout — Creates a hosted crypto payment checkout
// Provider adapter is inlined (backend functions can't share local imports)
// ════════════════════════════════════════════════════════════════

const SANDBOX_MODE = Deno.env.get('CRYPTO_ENVIRONMENT') !== 'production';

// ─── NOWPayments adapter (inlined) ───────────────────────────
function getCryptoProvider() {
  const providerName = Deno.env.get('CRYPTO_PROVIDER') || 'nowpayments';
  if (providerName === 'nowpayments') {
    return {
      baseUrl: SANDBOX_MODE ? 'https://api-sandbox.nowpayments.io/v1' : 'https://api.nowpayments.io/v1',

      async createCheckout(order) {
        const apiKey = Deno.env.get('CRYPTO_API_KEY');
        if (!apiKey) throw new Error('CRYPTO_API_KEY not configured');

        const response = await fetch(this.baseUrl + '/invoice', {
          method: 'POST',
          headers: { 'x-api-key': apiKey, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            price_amount: order.amount,
            price_currency: (order.currency || 'eur').toLowerCase(),
            order_id: order.id,
            order_description: 'Kariv Glamour Order ' + order.escrowReference,
            success_url: order.successUrl,
            cancel_url: order.cancelUrl
          })
        });

        if (!response.ok) throw new Error('Provider error: ' + response.status);
        const data = await response.json();
        return {
          checkoutId: data.id || data.invoice_id,
          checkoutUrl: data.invoice_url,
          amount: data.price_amount,
          currency: data.price_currency,
          expiresAt: data.expires_at || new Date(Date.now() + 30 * 60 * 1000).toISOString()
        };
      },

      async getCheckout(checkoutId) {
        const apiKey = Deno.env.get('CRYPTO_API_KEY');
        if (!apiKey) throw new Error('CRYPTO_API_KEY not configured');
        const response = await fetch(this.baseUrl + '/invoice/' + checkoutId, {
          headers: { 'x-api-key': apiKey }
        });
        if (!response.ok) throw new Error('Provider error');
        const data = await response.json();
        return {
          status: this.normalizeStatus(data.payment_status),
          amount: data.price_amount,
          currency: data.price_currency,
          transactionHash: data.txid
        };
      },

      normalizeStatus(status) {
        if (!status) return 'pending';
        const s = status.toLowerCase();
        if (s.includes('confirmed') || s.includes('finished') || s === 'paid') return 'confirmed';
        if (s.includes('confirming') || s.includes('waiting')) return 'confirming';
        if (s.includes('expired') || s.includes('timeout')) return 'expired';
        if (s.includes('failed') || s.includes('error')) return 'failed';
        if (s.includes('refund')) return 'refunded';
        return 'pending';
      }
    };
  }
  throw new Error('Unsupported crypto provider: ' + providerName);
}

function isCryptoConfigured() {
  return !!(Deno.env.get('CRYPTO_API_KEY') && Deno.env.get('CRYPTO_PROVIDER'));
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    let user = null;
    try { user = await base44.auth.me(); } catch (e) { return Response.json({ error: 'Unauthorized' }, { status: 401 }); }
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json().catch(function() { return {}; });
    const orderId = body.orderId;
    if (!orderId || typeof orderId !== 'string') {
      return Response.json({ error: 'Order ID is required' }, { status: 400 });
    }

    if (!isCryptoConfigured()) {
      return Response.json({ error: 'Crypto payments are not yet available. Please contact support.' }, { status: 503 });
    }

    const order = await base44.asServiceRole.entities.Orders.get(orderId);
    if (!order) return Response.json({ error: 'Order not found' }, { status: 404 });
    if (order.buyerId !== user.id) return Response.json({ error: 'Not your order' }, { status: 403 });
    if (order.escrowStatus !== 'dealer_accepted') return Response.json({ error: 'Order is not ready for payment' }, { status: 400 });
    if (order.paymentStatus === 'Paid') return Response.json({ error: 'Order is already paid' }, { status: 400 });

    if (!order.products || !order.products[0]) return Response.json({ error: 'Order has no products' }, { status: 400 });
    const product = await base44.asServiceRole.entities.Products.get(order.products[0].productId);
    if (!product) return Response.json({ error: 'Product no longer exists' }, { status: 404 });

    if (order.reservationExpiresAt) {
      if (new Date(order.reservationExpiresAt) < new Date()) {
        return Response.json({ error: 'Payment reservation has expired' }, { status: 400 });
      }
    }

    const provider = getCryptoProvider();
    const appUrl = 'https://karivglamour.com';

    const checkout = await provider.createCheckout({
      id: order.id,
      amount: order.totalAmount,
      currency: order.currency || 'EUR',
      escrowReference: order.escrowReference,
      buyerId: user.id,
      successUrl: appUrl + '/portal/orders/' + order.id,
      cancelUrl: appUrl + '/portal/orders/' + order.id
    });

    await base44.asServiceRole.entities.Orders.update(orderId, {
      paymentProvider: Deno.env.get('CRYPTO_PROVIDER'),
      providerCheckoutId: checkout.checkoutId,
      paymentCurrency: checkout.currency,
      paymentAmount: checkout.amount,
      reservationExpiresAt: checkout.expiresAt
    });

    return Response.json({
      checkoutUrl: checkout.checkoutUrl,
      amount: checkout.amount,
      currency: checkout.currency,
      expiresAt: checkout.expiresAt,
      escrowReference: order.escrowReference
    });
  } catch (error) {
    console.error('createCryptoCheckout error:', error);
    return Response.json({ error: 'Failed to create crypto checkout' }, { status: 500 });
  }
});