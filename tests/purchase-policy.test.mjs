import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PURCHASE_ROUTES,
  convertSourceValueToEur,
  evaluatePurchasePolicy,
  purchasePolicySnapshot,
} from '../src/lib/purchasePolicy.js';

test('Kariv-owned inventory always uses traditional direct checkout', () => {
  const policy = evaluatePurchasePolicy({ sourceValueEur: 80_000, buyerRequestsProtection: true });
  assert.equal(policy.sellerType, 'kariv');
  assert.equal(policy.purchaseRoute, PURCHASE_ROUTES.KARIV_DIRECT);
  assert.equal(policy.dealerId, null);
  assert.equal(policy.escrowRequired, false);
});

test('an approved dealer is immediately eligible for marketplace checkout', () => {
  const policy = evaluatePurchasePolicy({
    dealerId: 'dealer-1',
    sellerName: 'Prague Timepieces s.r.o.',
    sellerApproved: true,
    sourceValueEur: 8_000,
  });

  assert.equal(policy.sellerApproved, true);
  assert.equal(policy.dealerTier, null);
  assert.equal(policy.purchaseRoute, PURCHASE_ROUTES.ESCROW);
  assert.equal(policy.escrowRequired, true);
  assert.equal(policy.directEligible, false);
  assert.equal(policy.buyerMayChooseProtection, false);
  assert.deepEqual(policy.reasonCodes, ['dealer_approved']);
});

test('tier, history, disputes, profile toggles and price caps do not restrict an approved dealer', () => {
  const policy = evaluatePurchasePolicy({
    dealerId: 'dealer-1',
    sellerApproved: true,
    configuredTier: 'probationary',
    activeDays: 0,
    completedSales: 0,
    unresolvedDisputes: 12,
    directSalesEnabled: false,
    sellerVerified: false,
    paymentDetailsVerified: false,
    escrowEnabled: false,
    complianceStatus: 'suspended',
    refundStatus: 'overdue',
    configuredDirectLimitEur: 1,
    sourceValueEur: 1_000_000,
  });

  assert.equal(policy.purchaseRoute, PURCHASE_ROUTES.ESCROW);
  assert.deepEqual(policy.reasonCodes, ['dealer_approved']);
});

test('pending, rejected, missing and revoked dealer approval remain blocked', () => {
  for (const input of [
    {},
    { sellerPendingApproval: true },
    { sellerApproved: false, applicationStatus: 'rejected' },
    { sellerApproved: false, applicationStatus: 'revoked' },
  ]) {
    const policy = evaluatePurchasePolicy({ dealerId: 'dealer-1', ...input });
    assert.equal(policy.purchaseRoute, PURCHASE_ROUTES.MANUAL_REVIEW);
    assert.deepEqual(policy.reasonCodes, ['seller_not_approved']);
  }
});

test('only store-level marketplace payment readiness can pause an approved dealer checkout', () => {
  const policy = evaluatePurchasePolicy({
    dealerId: 'dealer-1',
    sellerApproved: true,
    platformEscrowPaymentReady: false,
  });
  assert.equal(policy.purchaseRoute, PURCHASE_ROUTES.MANUAL_REVIEW);
  assert.deepEqual(policy.reasonCodes, ['marketplace_payment_destination_unavailable']);
});

test('buyer flags cannot change the fixed approved-dealer marketplace route', () => {
  const policy = evaluatePurchasePolicy({
    dealerId: 'dealer-1',
    sellerApproved: true,
    buyerRequestsProtection: true,
  });
  assert.equal(policy.purchaseRoute, PURCHASE_ROUTES.ESCROW);
  assert.equal(policy.buyerMayChooseProtection, false);
  assert.equal(purchasePolicySnapshot(policy).buyer_selected_protection, false);
});

test('source currency conversion remains available for immutable order auditing', () => {
  const rates = { rates: { CZK: 1, EUR: 25, CHF: 26 } };
  assert.equal(convertSourceValueToEur(250_000, 'CZK', rates), 10_000);
  assert.equal(convertSourceValueToEur(10_000, 'CHF', rates), 10_400);
  assert.equal(convertSourceValueToEur(10_000, 'USD', rates), null);
});

test('policy snapshots preserve the approved dealer and protected route without legacy metrics', () => {
  const policy = evaluatePurchasePolicy({
    dealerId: 'dealer-1',
    sellerName: 'Prague Timepieces s.r.o.',
    sellerApproved: true,
    sourceValueEur: 8_000,
  });
  const snapshot = purchasePolicySnapshot(policy);
  assert.equal(snapshot.purchase_route, 'escrow');
  assert.equal(snapshot.seller_type, 'dealer');
  assert.equal(snapshot.dealer_id, 'dealer-1');
  assert.equal(snapshot.seller_name, 'Prague Timepieces s.r.o.');
  assert.equal(snapshot.buyer_selected_protection, false);
  assert.equal(snapshot.dealer_tier, undefined);
  assert.equal(snapshot.direct_limit_eur, undefined);
  assert.equal(snapshot.reason_codes, undefined);
  assert.match(snapshot.evaluated_at, /^\d{4}-\d{2}-\d{2}T/);
});
