import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const policy = await readFile(new URL('../src/lib/purchasePolicy.js', import.meta.url), 'utf8');
const serverPolicy = await readFile(new URL('../src/lib/purchasePolicyServer.js', import.meta.url), 'utf8');
const adminLayout = await readFile(new URL('../src/page-content/admin/AdminLayout.jsx', import.meta.url), 'utf8');
const legacyRoute = await readFile(new URL('../src/page-content/admin/AdminDealerPurchaseRules.jsx', import.meta.url), 'utf8');

test('approved dealer checkout has no tier, age, sales, dispute or per-dealer payment gate', () => {
  const dealerBranch = policy.slice(policy.indexOf('// Dealer approval is the sole'), policy.indexOf('export function purchasePolicySnapshot'));
  assert.match(dealerBranch, /if \(!sellerApproved\)/);
  assert.match(dealerBranch, /purchaseRoute: PURCHASE_ROUTES\.ESCROW/);
  assert.match(dealerBranch, /reasonCodes: \['dealer_approved'\]/);
  assert.doesNotMatch(dealerBranch, /completedSales|activeDays|unresolvedDisputes|configuredTier|directLimitEur,/);
});

test('storefront policy reads only the latest application instead of a commerce profile', () => {
  const assessment = serverPolicy.slice(
    serverPolicy.indexOf('export async function loadDealerCommerceAssessment'),
    serverPolicy.indexOf('// Accepts a product id'),
  );
  assert.match(assessment, /from\('dealer_applications'\)/);
  assert.match(assessment, /order\('created_at', \{ ascending: false \}\)/);
  assert.equal((assessment.match(/\.limit\(1\)/g) || []).length, 1);
  assert.doesNotMatch(assessment, /dealer_commerce_profiles|from\('orders'\)|from\('disputes'\)/);
});

test('the legacy dealer purchase-rules screen is no longer advertised in admin navigation', () => {
  assert.doesNotMatch(adminLayout, /to: '\/admin\/dealer-purchase-rules'/);
  assert.match(adminLayout, /to: '\/admin\/dealer-applications'/);
  assert.match(legacyRoute, /Dealer purchase restrictions are paused/);
  assert.match(legacyRoute, /latest application is approved/);
  assert.doesNotMatch(legacyRoute, /90\+ days|10\+ completed sales|Direct-payment limit|Save rules/);
});
