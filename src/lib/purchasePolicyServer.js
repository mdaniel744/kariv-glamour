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

function ageInDays(value, now = Date.now()) {
  const stamp = Date.parse(value || '');
  return Number.isFinite(stamp) && stamp <= now ? Math.floor((now - stamp) / 86_400_000) : 0;
}

function latestTimestamp(...values) {
  const valid = values
    .map((value) => ({ value, stamp: Date.parse(value || '') }))
    .filter(({ stamp }) => Number.isFinite(stamp) && stamp <= Date.now())
    .sort((a, b) => b.stamp - a.stamp);
  return valid[0]?.value || null;
}

async function countCompletedDealerSales(dealerId) {
  // purchase_status is route-neutral. The fallback keeps the evaluator safe
  // while the migration is rolling out and counts historical escrow orders.
  const current = await supabaseAdmin
    .from('orders')
    .select('id', { count: 'exact', head: true })
    .eq('store_id', STORE_ID)
    .eq('dealer_user_id', dealerId)
    .or('purchase_status.eq.completed,escrow_status.eq.funds_released');
  if (!current.error && Number.isSafeInteger(current.count) && current.count >= 0) return current.count;

  const historical = await supabaseAdmin
    .from('orders')
    .select('id', { count: 'exact', head: true })
    .eq('store_id', STORE_ID)
    .eq('dealer_user_id', dealerId)
    .eq('escrow_status', 'funds_released');
  return !historical.error && Number.isSafeInteger(historical.count) && historical.count >= 0 ? historical.count : 0;
}

async function countOpenDealerDisputes(dealerId) {
  const { count, error } = await supabaseAdmin
    .from('disputes')
    .select('id, orders!inner(id)', { count: 'exact', head: true })
    .in('status', ['open', 'under_review'])
    .eq('orders.store_id', STORE_ID)
    .eq('orders.dealer_user_id', dealerId);
  // Missing metrics must never make a dealer appear safer. One open dispute
  // keeps the effective tier probationary/direct-ineligible until readable.
  return !error && Number.isSafeInteger(count) && count >= 0 ? count : 1;
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

  const [profileResult, applicationResult, completedSales, unresolvedDisputes, identities] = await Promise.all([
    supabaseAdmin
      .from('dealer_commerce_profiles')
      .select('*')
      .eq('store_id', STORE_ID)
      .eq('dealer_user_id', dealerId)
      .maybeSingle(),
    supabaseAdmin
      .from('dealer_applications')
      .select('company_name, status, reviewed_at, created_at')
      .eq('store_id', STORE_ID)
      .eq('dealer_user_id', dealerId)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle(),
    countCompletedDealerSales(dealerId),
    countOpenDealerDisputes(dealerId),
    loadIdentities([dealerId]).catch(() => new Map()),
  ]);

  const profileUnavailable = Boolean(profileResult.error);
  const profile = profileUnavailable ? null : profileResult.data;
  const latestApplication = applicationResult.error ? null : applicationResult.data;
  const application = latestApplication?.status === 'approved' ? latestApplication : null;
  const identity = identities.get(dealerId);
  // A reactivation or a newly reviewed application restarts probation. Use
  // the most recent authoritative event so an old activation date can never
  // mask a later suspension/re-approval cycle.
  const activatedAt = application
    ? latestTimestamp(profile?.reactivated_at, application.reviewed_at, application.created_at, profile?.activated_at)
    : null;

  return {
    dealerId,
    sellerName: latestApplication?.company_name || identity?.fullName || 'Dealer',
    approvedApplication: Boolean(application),
    sellerApproved: Boolean(application),
    sellerPendingApproval: latestApplication?.status === 'pending',
    configuredTier: profile?.tier || 'probationary',
    activeDays: ageInDays(activatedAt),
    completedSales,
    unresolvedDisputes,
    directSalesEnabled: !profileUnavailable && profile?.direct_sales_enabled === true,
    sellerVerified: Boolean(application && profile?.seller_verified === true),
    paymentDetailsVerified: Boolean(
      profile?.payment_details_verified_at &&
      String(profile?.payment_beneficiary_name || '').trim() &&
      String(profile?.payment_iban || '').trim() &&
      String(profile?.payment_bank_name || '').trim()
    ),
    // A missing row is the deliberate probationary/escrow default. A failed
    // read is different: unknown compliance must stop checkout rather than
    // making a suspended dealer look clear.
    escrowEnabled: profileUnavailable ? false : profile?.escrow_enabled !== false,
    complianceStatus: profileUnavailable ? 'review' : (profile?.compliance_status || 'clear'),
    refundStatus: profileUnavailable ? 'overdue' : (profile?.refund_status || 'clear'),
    underwritten: profile?.underwritten === true,
    policyRevision: Number.isInteger(Number(profile?.policy_revision))
      ? Number(profile.policy_revision)
      : 0,
    configuredDirectLimitEur: profile?.direct_limit_eur == null ? null : Number(profile.direct_limit_eur),
    activatedAt,
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
    completedSales: assessment?.completedSales || 0,
    activeDays: assessment?.activeDays || 0,
    unresolvedDisputes: assessment?.unresolvedDisputes || 0,
    policyRevision: assessment?.policyRevision || 0,
  };
}
