// Pure purchase-routing policy. Keep this module dependency-free so the same
// rules can be used by server actions, rendered product pages and tests.

export const PURCHASE_POLICY_VERSION = 2;

export const PURCHASE_ROUTES = Object.freeze({
  KARIV_DIRECT: 'kariv_direct',
  DEALER_DIRECT: 'dealer_direct',
  ESCROW: 'escrow',
  MANUAL_REVIEW: 'manual_review',
});

export const DEALER_TIERS = Object.freeze({
  PROBATIONARY: 'probationary',
  STANDARD: 'standard',
  TRUSTED: 'trusted',
  ENTERPRISE: 'enterprise',
});

export const DEFAULT_DIRECT_LIMITS_EUR = Object.freeze({
  probationary: 0,
  standard: 10_000,
  trusted: 25_000,
  enterprise: null,
});

const TIER_RANK = Object.freeze({ probationary: 0, standard: 1, trusted: 2, enterprise: 3 });
const TIER_MAX_LIMITS_EUR = Object.freeze({ probationary: 0, standard: 10_000, trusted: 50_000, enterprise: null });

function positiveNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : null;
}

function allowedTier(value) {
  return Object.hasOwn(TIER_RANK, value) ? value : DEALER_TIERS.PROBATIONARY;
}

export function deriveEffectiveDealerTier({
  configuredTier = DEALER_TIERS.PROBATIONARY,
  activeDays = 0,
  completedSales = 0,
  stablePerformance = false,
  excellentPerformance = false,
  underwritten = false,
} = {}) {
  const ceiling = allowedTier(configuredTier);
  const days = Number.isFinite(Number(activeDays)) ? Math.max(0, Number(activeDays)) : 0;
  const sales = Number.isFinite(Number(completedSales)) ? Math.max(0, Number(completedSales)) : 0;

  // Enterprise is never earned from volume alone. It must be explicitly
  // approved and independently underwritten.
  if (ceiling === DEALER_TIERS.ENTERPRISE && underwritten && excellentPerformance) {
    return DEALER_TIERS.ENTERPRISE;
  }

  if (
    TIER_RANK[ceiling] >= TIER_RANK[DEALER_TIERS.TRUSTED] &&
    days >= 180 && sales >= 25 && excellentPerformance
  ) return DEALER_TIERS.TRUSTED;

  if (
    TIER_RANK[ceiling] >= TIER_RANK[DEALER_TIERS.STANDARD] &&
    days >= 90 && sales >= 10 && stablePerformance
  ) return DEALER_TIERS.STANDARD;

  return DEALER_TIERS.PROBATIONARY;
}

export function resolveDirectLimitEur(tier, configuredLimitEur) {
  const normalizedTier = allowedTier(tier);
  if (normalizedTier === DEALER_TIERS.PROBATIONARY) return 0;

  const configured = positiveNumber(configuredLimitEur);
  const defaultLimit = DEFAULT_DIRECT_LIMITS_EUR[normalizedTier];
  if (normalizedTier === DEALER_TIERS.ENTERPRISE) return configured;

  const requested = configured ?? defaultLimit;
  return Math.min(requested, TIER_MAX_LIMITS_EUR[normalizedTier]);
}

// CNB fixes currencies as CZK per unit. Comparing in EUR means first valuing
// the source amount in CZK, then dividing by the EUR fixing. The checkout
// stores the localized amount separately; this stable source value alone is
// used for tier thresholds.
export function convertSourceValueToEur(amount, currency, exchangeRates) {
  const value = positiveNumber(amount);
  const code = String(currency || '').trim().toUpperCase();
  if (value == null || !/^[A-Z]{3}$/.test(code)) return null;
  if (code === 'EUR') return Math.round((value + Number.EPSILON) * 100) / 100;

  const sourceRate = code === 'CZK' ? 1 : Number(exchangeRates?.rates?.[code]);
  const euroRate = Number(exchangeRates?.rates?.EUR);
  if (!(sourceRate > 0) || !(euroRate > 0)) return null;
  const converted = value * sourceRate / euroRate;
  return Number.isFinite(converted) && converted > 0
    ? Math.round((converted + Number.EPSILON) * 100) / 100
    : null;
}

export function evaluatePurchasePolicy({
  dealerId = null,
  sellerName = '',
  sellerApproved = false,
  sourceValueEur = null,
} = {}) {
  if (!dealerId) {
    return {
      policyVersion: PURCHASE_POLICY_VERSION,
      sellerType: 'kariv',
      sellerApproved: true,
      dealerId: null,
      sellerName: 'Kariv Glamour',
      dealerTier: null,
      purchaseRoute: PURCHASE_ROUTES.KARIV_DIRECT,
      directEligible: true,
      escrowRequired: false,
      buyerMayChooseProtection: false,
      directLimitEur: null,
      sourceValueEur: positiveNumber(sourceValueEur),
      reasonCodes: ['kariv_owned_inventory'],
    };
  }

  const euroValue = positiveNumber(sourceValueEur);

  // Dealer approval is the sole account-level storefront gate. Pending,
  // rejected, revoked, missing, or unreadable applications remain blocked;
  // an approved application needs no additional tier, account-age, sales,
  // dispute, per-dealer payment, or commerce-profile qualification.
  if (!sellerApproved) {
    return {
      policyVersion: PURCHASE_POLICY_VERSION,
      sellerType: 'dealer', sellerApproved: false, dealerId, sellerName, dealerTier: null,
      purchaseRoute: PURCHASE_ROUTES.MANUAL_REVIEW,
      directEligible: false, escrowRequired: false, buyerMayChooseProtection: false,
      directLimitEur: null, sourceValueEur: euroValue,
      reasonCodes: ['seller_not_approved'],
    };
  }

  // Once Kariv approves a dealer application, that seller uses the same
  // ordinary account checkout as first-party inventory. No tier, sales-count,
  // escrow, bank-destination or probation rule is allowed to block an order.
  return {
    policyVersion: PURCHASE_POLICY_VERSION,
    sellerType: 'dealer', sellerApproved: true, dealerId, sellerName, dealerTier: null,
    purchaseRoute: PURCHASE_ROUTES.DEALER_DIRECT,
    directEligible: true,
    escrowRequired: false,
    buyerMayChooseProtection: false,
    directLimitEur: null, sourceValueEur: euroValue,
    reasonCodes: ['dealer_approved'],
  };
}

export function purchasePolicySnapshot(policy) {
  return {
    version: policy.policyVersion,
    seller_type: policy.sellerType,
    dealer_id: policy.dealerId,
    seller_name: policy.sellerName || '',
    purchase_route: policy.purchaseRoute,
    buyer_selected_protection: policy.reasonCodes.includes('buyer_requested_protection'),
    evaluated_at: new Date().toISOString(),
  };
}
