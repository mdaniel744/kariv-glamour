import 'server-only';
import { isSupabaseAdminConfigured, supabaseAdmin } from './supabaseAdmin.js';
import { STORE_ID } from './supabaseData.js';
import { loadIdentities } from './orderIdentities.js';
import { getCzkExchangeRates } from './exchangeRatesServer.js';
import { convertSourceValueToEur, evaluatePurchasePolicy } from './purchasePolicy.js';

function currentSourcePrice(product = {}) {
  const regular = Number(product.price);
  const proposedSale = Number(product.sale_price ?? product.salePrice);
  if (!(regular > 0) || !Number.isFinite(regular)) return null;
  return Number.isFinite(proposedSale) && proposedSale > 0 && proposedSale < regular ? proposedSale : regular;
}

async function loadPlatformPaymentReadiness() {
  if (!isSupabaseAdminConfigured || !supabaseAdmin) return { karivDirect: false, escrow: false };
  const { data, error } = await supabaseAdmin
    .from('store_payment_destinations')
    .select('purchase_route, beneficiary_name, iban, bank_name, verified_at')
    .eq('store_id', STORE_ID)
    .in('purchase_route', ['kariv_direct', 'escrow']);
  if (error) return { karivDirect: false, escrow: false };
  const ready = new Set((data || [])
    .filter((row) => row.verified_at && String(row.beneficiary_name || '').trim() && String(row.iban || '').trim() && String(row.bank_name || '').trim())
    .map((row) => row.purchase_route));
  return { karivDirect: ready.has('kariv_direct'), escrow: ready.has('escrow') };
}

export async function loadDealerCommerceAssessment(dealerId) {
  if (!dealerId || !isSupabaseAdminConfigured || !supabaseAdmin) return null;

  const [applicationResult, identities] = await Promise.all([
    supabaseAdmin
      .from('dealer_applications')
      .select('company_name, status, reviewed_at, created_at')
      .eq('store_id', STORE_ID)
      .eq('dealer_user_id', dealerId)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle(),
    loadIdentities([dealerId]).catch(() => new Map()),
  ]);

  const latestApplication = applicationResult.error ? null : applicationResult.data;
  const application = latestApplication?.status === 'approved' ? latestApplication : null;
  const identity = identities.get(dealerId);

  return {
    dealerId,
    sellerName: latestApplication?.company_name || identity?.fullName || 'Dealer',
    approvedApplication: Boolean(application),
    sellerApproved: Boolean(application),
    sellerPendingApproval: latestApplication?.status === 'pending',
    policyRevision: 0,
    applicationApprovedAt: application?.reviewed_at || application?.created_at || null,
  };
}

// Accepts a product id or an already-loaded product row/shaped product. The
// buyer may request protection, but cannot select a route: the server always
// recomputes that route from current catalogue and dealer data.
export async function getProductPurchasePolicy(productOrId, { buyerRequestsProtection = false } = {}) {
  let product = productOrId;
  if (typeof productOrId === 'string') {
    if (!isSupabaseAdminConfigured || !supabaseAdmin) return null;
    const { data, error } = await supabaseAdmin
      .from('products')
      .select('id, dealer_id, price, sale_price, currency')
      .eq('store_id', STORE_ID)
      .eq('id', productOrId)
      .maybeSingle();
    if (error || !data) return null;
    product = data;
  }
  if (!product) return null;

  const dealerId = product.dealer_id || product.dealerId || null;
  const sourcePrice = currentSourcePrice(product);
  const sourceCurrency = String(product.currency || 'EUR').trim().toUpperCase();
  if (!dealerId) {
    // Kariv-owned inventory keeps the existing first-party cart and checkout
    // flow. The marketplace payment-destination records belong to dealer
    // routing and may not exist until that rollout is completed; using their
    // absence to gate first-party products made every Kariv watch appear
    // unavailable even though its catalogue stock was valid.
    return evaluatePurchasePolicy({
      sourceValueEur: sourceCurrency === 'EUR' ? sourcePrice : null,
      platformDirectPaymentReady: true,
    });
  }
  if (!isSupabaseAdminConfigured || !supabaseAdmin) {
    // Public pages must not crash in environments where the service-role
    // connection is intentionally unavailable. Unknown dealer approval is a
    // manual-review state; it must never silently become direct or protected.
    return evaluatePurchasePolicy({
      dealerId,
      sellerName: product.dealer_name || product.dealerName || 'Dealer',
      sellerApproved: false,
      sourceValueEur: sourceCurrency === 'EUR' ? sourcePrice : null,
    });
  }

  const [assessment, exchangeRates, paymentReadiness] = await Promise.all([
    loadDealerCommerceAssessment(dealerId),
    sourceCurrency === 'EUR' ? Promise.resolve(null) : getCzkExchangeRates(),
    loadPlatformPaymentReadiness(),
  ]);
  const sourceValueEur = convertSourceValueToEur(sourcePrice, sourceCurrency, exchangeRates);
  const policy = evaluatePurchasePolicy({
    ...assessment,
    dealerId,
    platformEscrowPaymentReady: paymentReadiness.escrow,
    sourceValueEur,
    buyerRequestsProtection: buyerRequestsProtection === true,
  });

  return {
    ...policy,
    policyRevision: 0,
  };
}
