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
  configuredTier = DEALER_TIERS.PROBATIONARY,
  activeDays = 0,
  completedSales = 0,
  unresolvedDisputes = 0,
  directSalesEnabled = false,
  sellerApproved = false,
  sellerPendingApproval = false,
  sellerVerified = false,
  paymentDetailsVerified = false,
  platformDirectPaymentReady = true,
  platformEscrowPaymentReady = true,
  escrowEnabled = true,
  complianceStatus = 'clear',
  refundStatus = 'clear',
  underwritten = false,
  configuredDirectLimitEur = null,
  sourceValueEur = null,
  buyerRequestsProtection = false,
} = {}) {
  if (!dealerId) {
    if (!platformDirectPaymentReady) {
      return {
        policyVersion: PURCHASE_POLICY_VERSION,
        sellerType: 'kariv', sellerApproved: true, dealerId: null, sellerName: 'Kariv Glamour', dealerTier: null,
        purchaseRoute: PURCHASE_ROUTES.MANUAL_REVIEW,
        directEligible: false, escrowRequired: false, buyerMayChooseProtection: false,
        directLimitEur: null, sourceValueEur: positiveNumber(sourceValueEur),
        reasonCodes: ['kariv_payment_destination_unavailable'],
      };
    }
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

  const openDisputes = Number.isFinite(Number(unresolvedDisputes))
    ? Math.max(0, Number(unresolvedDisputes))
    : 0;
  const clearCompliance = complianceStatus === 'clear';
  const clearRefunds = refundStatus === 'clear';
  const cleanHealth = clearCompliance && clearRefunds && openDisputes === 0;
  const stablePerformance = cleanHealth;
  const excellentPerformance = cleanHealth;
  const dealerTier = sellerApproved ? deriveEffectiveDealerTier({
    configuredTier,
    activeDays,
    completedSales,
    stablePerformance,
    excellentPerformance,
    underwritten,
  }) : DEALER_TIERS.PROBATIONARY;
  const directLimitEur = resolveDirectLimitEur(dealerTier, configuredDirectLimitEur);
  const euroValue = positiveNumber(sourceValueEur);
  const healthHold = !clearCompliance || !clearRefunds;

  // An identified onboarding dealer can sell through Kariv protection while
  // awaiting approval. Missing, rejected or unreadable applications are not
  // onboarding and must never be silently promoted into a payment route.
  if (!sellerApproved && !sellerPendingApproval) {
    return {
      policyVersion: PURCHASE_POLICY_VERSION,
      sellerType: 'dealer', sellerApproved: false, dealerId, sellerName, dealerTier,
      purchaseRoute: PURCHASE_ROUTES.MANUAL_REVIEW,
      directEligible: false, escrowRequired: false, buyerMayChooseProtection: false,
      directLimitEur, sourceValueEur: euroValue,
      reasonCodes: ['seller_not_approved'],
    };
  }

  if (healthHold) {
    return {
      policyVersion: PURCHASE_POLICY_VERSION,
      sellerType: 'dealer', sellerApproved, dealerId, sellerName, dealerTier,
      purchaseRoute: PURCHASE_ROUTES.MANUAL_REVIEW,
      directEligible: false, escrowRequired: false, buyerMayChooseProtection: false,
      directLimitEur, sourceValueEur: euroValue,
      reasonCodes: [
        ...(clearCompliance ? [] : [`compliance_${complianceStatus || 'review'}`]),
        ...(clearRefunds ? [] : [`refund_${refundStatus || 'overdue'}`]),
      ],
    };
  }

  const directBlockers = [
    ...(!sellerApproved ? ['seller_pending_approval'] : []),
    ...(!sellerVerified ? ['seller_not_verified'] : []),
    ...(!paymentDetailsVerified ? ['payment_destination_unverified'] : []),
    ...(!directSalesEnabled ? ['direct_sales_disabled'] : []),
    ...(dealerTier === DEALER_TIERS.PROBATIONARY ? ['dealer_probationary'] : []),
    ...(openDisputes > 0 ? ['unresolved_disputes'] : []),
    ...(euroValue == null ? ['value_conversion_unavailable'] : []),
    ...(euroValue != null && directLimitEur != null && euroValue > directLimitEur ? ['above_direct_limit'] : []),
    ...(directLimitEur == null ? ['direct_limit_not_configured'] : []),
  ];

  // A buyer choice is meaningful only when this order otherwise qualifies
  // for direct dealer payment. A stale or crafted request must not relabel a
  // mandatory protected route as voluntarily selected in the audit record.
  if (directBlockers.length === 0 && buyerRequestsProtection) {
    return {
      policyVersion: PURCHASE_POLICY_VERSION,
      sellerType: 'dealer', sellerApproved: true, dealerId, sellerName, dealerTier,
      purchaseRoute: escrowEnabled && platformEscrowPaymentReady ? PURCHASE_ROUTES.ESCROW : PURCHASE_ROUTES.MANUAL_REVIEW,
      directEligible: false,
      escrowRequired: escrowEnabled && platformEscrowPaymentReady,
      buyerMayChooseProtection: false,
      directLimitEur, sourceValueEur: euroValue,
      reasonCodes: [escrowEnabled && platformEscrowPaymentReady ? 'buyer_requested_protection' : 'buyer_protection_unavailable'],
    };
  }

  if (directBlockers.length === 0) {
    return {
      policyVersion: PURCHASE_POLICY_VERSION,
      sellerType: 'dealer', sellerApproved: true, dealerId, sellerName, dealerTier,
      purchaseRoute: PURCHASE_ROUTES.DEALER_DIRECT,
      directEligible: true,
      escrowRequired: false,
      // Optional protection is only actionable when Kariv has a verified
      // protected-payment destination. Do not advertise a choice that the
      // server would subsequently have to reject at checkout.
      buyerMayChooseProtection: Boolean(escrowEnabled && platformEscrowPaymentReady),
      directLimitEur, sourceValueEur: euroValue,
      reasonCodes: ['dealer_direct_eligible'],
    };
  }

  return {
    policyVersion: PURCHASE_POLICY_VERSION,
    sellerType: 'dealer', sellerApproved, dealerId, sellerName, dealerTier,
    purchaseRoute: escrowEnabled && platformEscrowPaymentReady ? PURCHASE_ROUTES.ESCROW : PURCHASE_ROUTES.MANUAL_REVIEW,
    directEligible: false,
    escrowRequired: Boolean(escrowEnabled && platformEscrowPaymentReady),
    buyerMayChooseProtection: false,
    directLimitEur, sourceValueEur: euroValue,
    reasonCodes: escrowEnabled && platformEscrowPaymentReady
      ? directBlockers
      : [...directBlockers, platformEscrowPaymentReady ? 'escrow_unavailable' : 'escrow_payment_destination_unavailable'],
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
