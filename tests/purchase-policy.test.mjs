import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PURCHASE_ROUTES,
  convertSourceValueToEur,
  deriveEffectiveDealerTier,
  evaluatePurchasePolicy,
  purchasePolicySnapshot,
} from '../src/lib/purchasePolicy.js';

const healthyDealer = {
  dealerId: 'dealer-1',
  sellerName: 'Prague Timepieces s.r.o.',
  configuredTier: 'standard',
  activeDays: 100,
  completedSales: 12,
  unresolvedDisputes: 0,
  directSalesEnabled: true,
  sellerApproved: true,
  sellerVerified: true,
  paymentDetailsVerified: true,
  escrowEnabled: true,
  complianceStatus: 'clear',
  refundStatus: 'clear',
  sourceValueEur: 8_000,
};

test('Kariv-owned inventory always uses traditional direct checkout', () => {
  const policy = evaluatePurchasePolicy({ sourceValueEur: 80_000, buyerRequestsProtection: true });
  assert.equal(policy.sellerType, 'kariv');
  assert.equal(policy.purchaseRoute, PURCHASE_ROUTES.KARIV_DIRECT);
  assert.equal(policy.dealerId, null);
  assert.equal(policy.escrowRequired, false);
});

test('Kariv and protected checkout stop when the verified platform payment destination is unavailable', () => {
  const kariv = evaluatePurchasePolicy({ sourceValueEur: 5_000, platformDirectPaymentReady: false });
  assert.equal(kariv.purchaseRoute, PURCHASE_ROUTES.MANUAL_REVIEW);
  assert.deepEqual(kariv.reasonCodes, ['kariv_payment_destination_unavailable']);

  const protectedDealer = evaluatePurchasePolicy({
    ...healthyDealer,
    activeDays: 10,
    completedSales: 1,
    platformEscrowPaymentReady: false,
  });
  assert.equal(protectedDealer.purchaseRoute, PURCHASE_ROUTES.MANUAL_REVIEW);
  assert.ok(protectedDealer.reasonCodes.includes('escrow_payment_destination_unavailable'));
});

test('dealer tier requires both account age and completed sales', () => {
  assert.equal(deriveEffectiveDealerTier({ configuredTier: 'trusted', activeDays: 180, completedSales: 24, stablePerformance: true, excellentPerformance: true }), 'standard');
  assert.equal(deriveEffectiveDealerTier({ configuredTier: 'trusted', activeDays: 179, completedSales: 25, stablePerformance: true, excellentPerformance: true }), 'standard');
  assert.equal(deriveEffectiveDealerTier({ configuredTier: 'trusted', activeDays: 180, completedSales: 25, stablePerformance: true, excellentPerformance: true }), 'trusted');
  assert.equal(deriveEffectiveDealerTier({ configuredTier: 'enterprise', activeDays: 500, completedSales: 500, stablePerformance: true, excellentPerformance: true, underwritten: false }), 'trusted');
});

test('new/probationary dealers and watches above a tier limit require escrow', () => {
  const newDealer = evaluatePurchasePolicy({ ...healthyDealer, activeDays: 20, completedSales: 2 });
  assert.equal(newDealer.dealerTier, 'probationary');
  assert.equal(newDealer.purchaseRoute, PURCHASE_ROUTES.ESCROW);
  assert.ok(newDealer.reasonCodes.includes('dealer_probationary'));

  const highValue = evaluatePurchasePolicy({ ...healthyDealer, sourceValueEur: 10_000.01 });
  assert.equal(highValue.purchaseRoute, PURCHASE_ROUTES.ESCROW);
  assert.ok(highValue.reasonCodes.includes('above_direct_limit'));

  const staleBuyerRequest = evaluatePurchasePolicy({
    ...healthyDealer,
    activeDays: 20,
    completedSales: 2,
    buyerRequestsProtection: true,
  });
  assert.equal(staleBuyerRequest.purchaseRoute, PURCHASE_ROUTES.ESCROW);
  assert.ok(staleBuyerRequest.reasonCodes.includes('dealer_probationary'));
  assert.ok(!staleBuyerRequest.reasonCodes.includes('buyer_requested_protection'));
});

test('unknown or rejected dealer approval cannot be bypassed with buyer-selected protection', () => {
  const policy = evaluatePurchasePolicy({
    ...healthyDealer,
    sellerApproved: false,
    buyerRequestsProtection: true,
  });
  assert.equal(policy.purchaseRoute, PURCHASE_ROUTES.MANUAL_REVIEW);
  assert.equal(policy.escrowRequired, false);
  assert.deepEqual(policy.reasonCodes, ['seller_not_approved']);
});

test('identified pending dealers must use escrow even with old direct-sale qualifications', () => {
  const policy = evaluatePurchasePolicy({
    ...healthyDealer,
    configuredTier: 'enterprise', activeDays: 365, completedSales: 100, underwritten: true,
    sellerApproved: false, sellerPendingApproval: true,
  });
  assert.equal(policy.sellerApproved, false);
  assert.equal(policy.dealerTier, 'probationary');
  assert.equal(policy.purchaseRoute, PURCHASE_ROUTES.ESCROW);
  assert.equal(policy.directEligible, false);
  assert.equal(policy.escrowRequired, true);
  assert.equal(policy.buyerMayChooseProtection, false);
  assert.ok(policy.reasonCodes.includes('seller_pending_approval'));
});

test('pending onboarding does not override compliance, refund, or payment-setup blocks', () => {
  for (const override of [
    { complianceStatus: 'review' }, { complianceStatus: 'suspended' },
    { refundStatus: 'overdue' }, { escrowEnabled: false }, { platformEscrowPaymentReady: false },
  ]) {
    const policy = evaluatePurchasePolicy({ ...healthyDealer, sellerApproved: false, sellerPendingApproval: true, ...override });
    assert.equal(policy.purchaseRoute, PURCHASE_ROUTES.MANUAL_REVIEW);
    assert.equal(policy.directEligible, false);
    assert.equal(policy.escrowRequired, false);
  }
});

test('approved dealers without a commerce profile fail safely into probationary escrow', () => {
  const policy = evaluatePurchasePolicy({
    dealerId: 'approved-new-dealer',
    sellerApproved: true,
    sellerVerified: false,
    escrowEnabled: true,
    sourceValueEur: 2_000,
  });
  assert.equal(policy.dealerTier, 'probationary');
  assert.equal(policy.purchaseRoute, PURCHASE_ROUTES.ESCROW);
  assert.ok(policy.reasonCodes.includes('dealer_probationary'));
  assert.ok(policy.reasonCodes.includes('seller_not_verified'));
  assert.ok(policy.reasonCodes.includes('payment_destination_unverified'));
});

test('direct checkout requires an admin-verified dealer payment destination', () => {
  const policy = evaluatePurchasePolicy({ ...healthyDealer, paymentDetailsVerified: false });
  assert.equal(policy.purchaseRoute, PURCHASE_ROUTES.ESCROW);
  assert.ok(policy.reasonCodes.includes('payment_destination_unverified'));
});

test('established healthy dealer can sell directly and buyer can elect protection', () => {
  const direct = evaluatePurchasePolicy(healthyDealer);
  assert.equal(direct.dealerTier, 'standard');
  assert.equal(direct.purchaseRoute, PURCHASE_ROUTES.DEALER_DIRECT);
  assert.equal(direct.directLimitEur, 10_000);
  assert.equal(direct.buyerMayChooseProtection, true);

  const protectedPurchase = evaluatePurchasePolicy({ ...healthyDealer, buyerRequestsProtection: true });
  assert.equal(protectedPurchase.purchaseRoute, PURCHASE_ROUTES.ESCROW);
  assert.deepEqual(protectedPurchase.reasonCodes, ['buyer_requested_protection']);
});

test('compliance or refund holds require manual review rather than pretending escrow cures the risk', () => {
  for (const override of [{ complianceStatus: 'review' }, { refundStatus: 'overdue' }]) {
    const policy = evaluatePurchasePolicy({ ...healthyDealer, ...override });
    assert.equal(policy.purchaseRoute, PURCHASE_ROUTES.MANUAL_REVIEW);
    assert.equal(policy.directEligible, false);
    assert.equal(policy.escrowRequired, false);
  }
});

test('trusted direct limit defaults to EUR 25,000 and can be explicitly raised only to EUR 50,000', () => {
  const base = { ...healthyDealer, configuredTier: 'trusted', activeDays: 200, completedSales: 30 };
  assert.equal(evaluatePurchasePolicy({ ...base, sourceValueEur: 25_000 }).purchaseRoute, PURCHASE_ROUTES.DEALER_DIRECT);
  assert.equal(evaluatePurchasePolicy({ ...base, sourceValueEur: 25_001 }).purchaseRoute, PURCHASE_ROUTES.ESCROW);
  const raised = evaluatePurchasePolicy({ ...base, sourceValueEur: 49_000, configuredDirectLimitEur: 75_000 });
  assert.equal(raised.directLimitEur, 50_000);
  assert.equal(raised.purchaseRoute, PURCHASE_ROUTES.DEALER_DIRECT);
});

test('custom limits, enterprise underwriting, disputes, and unavailable protection all fail safely', () => {
  const lowerStandardCap = evaluatePurchasePolicy({
    ...healthyDealer,
    configuredDirectLimitEur: 5_000,
    sourceValueEur: 5_001,
  });
  assert.equal(lowerStandardCap.purchaseRoute, PURCHASE_ROUTES.ESCROW);
  assert.ok(lowerStandardCap.reasonCodes.includes('above_direct_limit'));

  const enterpriseWithoutLimit = evaluatePurchasePolicy({
    ...healthyDealer,
    configuredTier: 'enterprise',
    activeDays: 365,
    completedSales: 100,
    underwritten: true,
    configuredDirectLimitEur: null,
  });
  assert.equal(enterpriseWithoutLimit.purchaseRoute, PURCHASE_ROUTES.ESCROW);
  assert.ok(enterpriseWithoutLimit.reasonCodes.includes('direct_limit_not_configured'));

  const disputed = evaluatePurchasePolicy({ ...healthyDealer, unresolvedDisputes: 1 });
  assert.equal(disputed.purchaseRoute, PURCHASE_ROUTES.ESCROW);
  assert.ok(disputed.reasonCodes.includes('unresolved_disputes'));

  const protectionUnavailable = evaluatePurchasePolicy({
    ...healthyDealer,
    escrowEnabled: false,
    buyerRequestsProtection: true,
  });
  assert.equal(protectionUnavailable.purchaseRoute, PURCHASE_ROUTES.MANUAL_REVIEW);
  assert.deepEqual(protectionUnavailable.reasonCodes, ['buyer_protection_unavailable']);
});

test('source currency is converted to a stable EUR reference while the order snapshot remains buyer-safe', () => {
  const rates = { rates: { CZK: 1, EUR: 25, CHF: 26 } };
  assert.equal(convertSourceValueToEur(250_000, 'CZK', rates), 10_000);
  assert.equal(convertSourceValueToEur(10_000, 'CHF', rates), 10_400);
  assert.equal(convertSourceValueToEur(10_000, 'USD', rates), null);

  const policy = evaluatePurchasePolicy(healthyDealer);
  const snapshot = purchasePolicySnapshot(policy);
  assert.equal(snapshot.purchase_route, 'dealer_direct');
  assert.equal(snapshot.seller_type, 'dealer');
  assert.equal(snapshot.dealer_id, 'dealer-1');
  assert.equal(snapshot.buyer_selected_protection, false);
  assert.equal(snapshot.dealer_tier, undefined);
  assert.equal(snapshot.direct_limit_eur, undefined);
  assert.equal(snapshot.reason_codes, undefined);
  assert.match(snapshot.evaluated_at, /^\d{4}-\d{2}-\d{2}T/);
});
