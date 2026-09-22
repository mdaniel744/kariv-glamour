import test from 'node:test';
import assert from 'node:assert/strict';
import {
  checkoutPath,
  isProtectedPurchase,
  publicPurchasePolicy,
  readPurchasePolicy,
} from '../src/lib/purchasePolicyUi.js';
import { readFileSync } from 'node:fs';

test('Kariv-owned products use the traditional direct route', () => {
  const policy = readPurchasePolicy({ id: 'kariv-watch', created_by_id: 'kariv-admin' });
  assert.equal(policy.sellerType, 'kariv');
  assert.equal(policy.purchaseRoute, 'kariv_direct');
  assert.equal(policy.buyerMayChooseProtection, false);
});

test('legacy dealer products fail closed to protected checkout', () => {
  const policy = readPurchasePolicy({ id: 'dealer-watch', dealerId: 'dealer-1' });
  assert.equal(policy.sellerType, 'dealer');
  assert.equal(policy.purchaseRoute, 'escrow');
  assert.equal(isProtectedPurchase(policy), true);
});

test('eligible direct dealer purchase can opt into protection', () => {
  const policy = readPurchasePolicy({
    id: 'dealer-watch',
    purchasePolicy: {
      sellerType: 'dealer',
      dealerId: 'dealer-1',
      sellerName: 'Prague Watch House',
      purchaseRoute: 'dealer_direct',
      directEligible: true,
      buyerMayChooseProtection: true,
    },
  });

  assert.equal(isProtectedPurchase(policy, false), false);
  assert.equal(isProtectedPurchase(policy, true), true);
  assert.equal(checkoutPath('dealer-watch', true), '/checkout/dealer-watch?protection=kariv');
});

test('direct dealers use the traditional cart only while optional protection is off', () => {
  const direct = readPurchasePolicy({
    id: 'dealer-watch',
    dealerId: 'dealer-1',
    purchasePolicy: {
      sellerType: 'dealer',
      dealerId: 'dealer-1',
      purchaseRoute: 'dealer_direct',
      buyerMayChooseProtection: true,
    },
  });
  const escrow = readPurchasePolicy({
    id: 'probationary-watch',
    dealerId: 'dealer-new',
    purchasePolicy: {
      sellerType: 'dealer',
      dealerId: 'dealer-new',
      purchaseRoute: 'escrow',
    },
  });

  assert.equal(direct.purchaseRoute === 'dealer_direct' && !isProtectedPurchase(direct, false), true);
  assert.equal(direct.purchaseRoute === 'dealer_direct' && !isProtectedPurchase(direct, true), false);
  assert.equal(escrow.purchaseRoute === 'dealer_direct' && !isProtectedPurchase(escrow, false), false);
  assert.equal(isProtectedPurchase(escrow, false), true);
});

test('public policy projection excludes internal assessment metrics', () => {
  const result = publicPurchasePolicy({
    sellerType: 'dealer',
    dealerId: 'dealer-1',
    sellerName: 'Prague Watch House',
    dealerTier: 'standard',
    purchaseRoute: 'dealer_direct',
    directEligible: true,
    escrowRequired: false,
    buyerMayChooseProtection: true,
    directLimitEur: 10_000,
    reasonCodes: ['dealer_direct_eligible'],
    unresolvedDisputes: 0,
    completedSales: 15,
  });

  assert.equal(result.completedSales, undefined);
  assert.equal(result.unresolvedDisputes, undefined);
  assert.equal(result.dealerTier, undefined);
  assert.equal(result.directLimitEur, undefined);
  assert.equal(result.reasonCodes, undefined);
  assert.equal(result.purchaseRoute, 'dealer_direct');
});

test('authentication redirect preserves an optional protection route', () => {
  const middleware = readFileSync(new URL('../middleware.js', import.meta.url), 'utf8');
  assert.match(middleware, /searchParams\.set\('returnTo', `\$\{pathname\}\$\{search\}`\)/);
});

test('manual-review products keep their safety blocker without showing the removed disclosure card', () => {
  const detail = readFileSync(new URL('../src/page-content/ProductDetail.jsx', import.meta.url), 'utf8');
  assert.match(detail, /isManualReview[\s\S]*purchaseUnderReview/);
  assert.match(detail, /\{!isManualReview && !isKarivOwned && \(/);
  assert.doesNotMatch(detail, /manualReviewDisclosure/);
  assert.doesNotMatch(detail, /karivDirectDisclosure/);
  assert.match(detail, /protectedDisclosure/);
  assert.match(detail, /directDealerDisclosure/);
});

test('direct-dealer cart and buy-now paths preserve both sign-in gates', () => {
  const detail = readFileSync(new URL('../src/page-content/ProductDetail.jsx', import.meta.url), 'utf8');
  const cart = readFileSync(new URL('../src/page-content/Cart.jsx', import.meta.url), 'utf8');

  assert.match(detail, /const usesTraditionalCart = isKarivOwned \|\| \([\s\S]*purchasePolicy\.purchaseRoute === 'dealer_direct' && !protectedPurchase/);
  assert.match(detail, /if \(!canPurchase \|\| !usesTraditionalCart\) return/);
  assert.match(detail, /if \(!isAuthenticated\) \{ setShowAuthModal\(true\); return; \}/);
  assert.match(detail, /<BuyNowAuthModal[\s\S]*open=\{showAuthModal && canPurchase\}/);
  assert.match(cart, /if \(!isAuthenticated\) \{ setShowAuthModal\(true\); return; \}/);
  assert.match(cart, /<BuyNowAuthModal[\s\S]*continueTo=\{checkoutPath\}/);
});
