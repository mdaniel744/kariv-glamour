import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const actions = await readFile(new URL('../src/actions/dealerPurchasePolicies.js', import.meta.url), 'utf8');
const adminPage = await readFile(new URL('../src/page-content/admin/AdminDealerPurchaseRules.jsx', import.meta.url), 'utf8');

test('dealer policy writes are admin-only and scoped to the Kariv tenant', () => {
  assert.match(actions, /await requireAdmin\(\)/);
  assert.match(actions, /\.eq\('store_id', STORE_ID\)/);
  assert.match(actions, /store_id: STORE_ID/);
  assert.match(actions, /onConflict: 'store_id,dealer_user_id'/);
});

test('unsafe policy combinations fail closed', () => {
  assert.match(actions, /tier === 'probationary'[\s\S]*directSalesEnabled = false/);
  assert.match(actions, /!sellerVerified \|\| !paymentDetailsVerified \|\| complianceStatus !== 'clear' \|\| refundStatus !== 'clear'/);
  assert.match(actions, /tier === 'enterprise' && !underwritten/);
  assert.match(actions, /if \(!approvedApplication\) directSalesEnabled = false/);
  assert.match(actions, /Standard dealers cannot exceed a €10,000/);
  assert.match(actions, /Trusted dealers cannot exceed a €50,000/);
});

test('admin explains the agreed dealer tiers and live checkout re-evaluation', () => {
  assert.match(adminPage, /90\+ days and 10\+ completed sales/);
  assert.match(adminPage, /180\+ days and 25\+ completed sales/);
  assert.match(adminPage, /Checkout re-evaluates live sales history and unresolved disputes/);
  assert.match(adminPage, /Dealer approval and account roles remain exclusively managed in the Ecom King dashboard/);
});
