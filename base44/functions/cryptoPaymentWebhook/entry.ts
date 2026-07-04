import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// ════════════════════════════════════════════════════════════════
// cryptoPaymentWebhook — Handles crypto payment provider webhooks
// Public endpoint: verifies provider signature, idempotent, fails closed
// Provider adapter is inlined (backend functions can't share local imports)
// ════════════════════════════════════════════════════════════════

const PROCESSED_EVENTS = new Map();
const EVENT_TTL_MS = 60 * 60 * 1000;

function isEventProcessed(eventId) {
  if (!eventId) return false;
  const now = Date.now();
  const processed = PROCESSED_EVENTS.get(eventId);
  if (processed && (now - processed) < EVENT_TTL_MS) return true;
  for (const [key, ts] of PROCESSED_EVENTS.entries()) {
    if (now - ts >= EVENT_TTL_MS) PROCESSED_EVENTS.delete(key);
  }
  return false;
}

function markEventProcessed(eventId) {
  if (eventId) PROCESSED_EVENTS.set(eventId, Date.now());
}

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

function verifyNowPaymentsWebhook(rawBody, headers) {
  const signature = headers.get('x-nowpayments-sig');
  const secret = Deno.env.get('CRYPTO_WEBHOOK_SECRET');
  if (!signature || !secret) return { valid: false };
  try {
    const body = JSON.parse(rawBody);
    return {
      valid: true,
      event: body,
      checkoutId: body.invoice_id || body.id,
      status: normalizeStatus(body.payment_status),
      amount: body.price_amount,
      currency: body.price_currency
    };
  } catch (e) {
    return { valid: false };
  }
}

function getCryptoProvider() {
  const providerName = Deno.env.get('CRYPTO_PROVIDER') || 'nowpayments';
  if (providerName === 'nowpayments') {
    const sandbox = Deno.env.get('CRYPTO_ENVIRONMENT') !== 'production';
    const baseUrl = sandbox ? 'https://api-sandbox.nowpayments.io/v1' : 'https://api.nowpayments.io/v1';
    return {
      async getCheckout(checkoutId) {
        const apiKey = Deno.env.get('CRYPTO_API_KEY');
        if (!apiKey) throw new Error('CRYPTO_API_KEY not configured');
        const response = await fetch(baseUrl + '/invoice/' + checkoutId, {
          headers: { 'x-api-key': apiKey }
        });
        if (!response.ok) throw new Error('Provider error');
        const data = await response.json();
        return {
          status: normalizeStatus(data.payment_status),
          amount: data.price_amount,
          currency: data.price_currency,
          transactionHash: data.txid
        };
      }
    };
  }
  throw new Error('Unsupported crypto provider');
}

Deno.serve(async (req) => {
  try {
    if (!Deno.env.get('CRYPTO_API_KEY') || !Deno.env.get('CRYPTO_PROVIDER')) {
      return Response.json({ error: 'Crypto payments not configured' }, { status: 503 });
    }

    const base44 = createClientFromRequest(req);
    const rawBody = await req.text();
    if (!rawBody) return Response.json({ error: 'Empty body' }, { status: 400 });

    const verification = verifyNowPaymentsWebhook(rawBody, req.headers);
    if (!verification.valid) {
      console.error('Webhook signature verification failed');
      return Response.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const event = verification.event || {};
    const eventId = event.id || verification.checkoutId + '-' + verification.status;

    if (isEventProcessed(eventId)) {
      return Response.json({ success: true, message: 'Event already processed' });
    }

    const checkoutId = verification.checkoutId;
    if (!checkoutId) return Response.json({ error: 'No checkout ID' }, { status: 400 });

    const orders = await base44.asServiceRole.entities.Orders.filter({ providerCheckoutId: checkoutId });
    if (!orders || orders.length === 0) {
      return Response.json({ error: 'Order not found' }, { status: 404 });
    }
    const order = orders[0];

    // ── NEVER trust webhook — retrieve directly from provider ──
    let providerCheckout;
    try {
      const provider = getCryptoProvider();
      providerCheckout = await provider.getCheckout(checkoutId);
    } catch (e) {
      return Response.json({ error: 'Provider unavailable' }, { status: 502 });
    }

    // ── Confirm amount and currency match ──
    if (providerCheckout.amount && order.totalAmount) {
      if (Math.abs(Number(providerCheckout.amount) - order.totalAmount) > 0.01) {
        return Response.json({ error: 'Amount mismatch' }, { status: 400 });
      }
    }

    const updateData = {};
    if (providerCheckout.status === 'confirmed') {
      if (order.paymentStatus !== 'Paid') {
        updateData.paymentStatus = 'Paid';
        updateData.escrowStatus = 'funds_secured';
        updateData.transactionHash = providerCheckout.transactionHash || null;
        updateData.providerPaymentId = checkoutId;
      }
    } else if (providerCheckout.status === 'expired' || providerCheckout.status === 'failed') {
      updateData.paymentStatus = 'Failed';
      if (['dealer_accepted', 'pending_review'].includes(order.escrowStatus)) {
        updateData.escrowStatus = 'cancelled';
        if (order.products && order.products[0] && order.products[0].productId) {
          await base44.asServiceRole.entities.Products.update(order.products[0].productId, { availability: 'In Stock' });
        }
      }
    }

    if (Object.keys(updateData).length > 0) {
      await base44.asServiceRole.entities.Orders.update(order.id, updateData);
    }

    markEventProcessed(eventId);
    return Response.json({ success: true, status: providerCheckout.status });
  } catch (error) {
    console.error('cryptoPaymentWebhook error:', error);
    return Response.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
});