import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { compileFunction } from 'node:vm';
import ts from 'typescript';
import * as purchasePolicy from '../src/lib/purchasePolicy.js';

const source = readFileSync(new URL('../src/lib/purchasePolicyServer.js', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
});

function fixture({
  destinations = [],
  destinationError = null,
  profile = null,
  profileError = null,
  application = null,
  applicationError = null,
  completedSales = 0,
  ordersError = null,
  unresolvedDisputes = 0,
  disputesError = null,
} = {}) {
  const reads = [];
  const database = {
    from(table) {
      const filters = [];
      const result = table === 'store_payment_destinations'
        ? { data: destinations, error: destinationError }
        : table === 'dealer_commerce_profiles'
          ? { data: profile, error: profileError }
          : table === 'dealer_applications'
            ? { data: application, error: applicationError }
            : table === 'orders'
              ? { data: null, error: ordersError, count: completedSales }
              : table === 'disputes'
                ? { data: null, error: disputesError, count: unresolvedDisputes }
                : null;
      assert.ok(result, `Unexpected table: ${table}`);
      const finish = () => {
        reads.push({ table, filters });
        return Promise.resolve(result);
      };
      const query = {
        select() { return query; },
        eq(field, value) { filters.push([field, value]); return query; },
        in(field, values) {
          filters.push([field, values]);
          return table === 'store_payment_destinations' ? finish() : query;
        },
        order() { return query; },
        limit() { return query; },
        maybeSingle: finish,
        or() { return finish(); },
        then(resolve, reject) { return finish().then(resolve, reject); },
      };
      return query;
    },
  };
  const imports = {
    'server-only': {},
    './supabaseAdmin.js': { isSupabaseAdminConfigured: true, supabaseAdmin: database },
    './supabaseData.js': { STORE_ID: 'kariv' },
    './orderIdentities.js': { loadIdentities: async () => new Map() },
    './exchangeRatesServer.js': { getCzkExchangeRates: async () => { throw new Error('EUR policy must not fetch rates'); } },
    './purchasePolicy.js': purchasePolicy,
  };
  const module = { exports: {} };
  compileFunction(outputText, ['require', 'module', 'exports'])((specifier) => {
    assert.ok(specifier in imports, `Unmocked dependency ${specifier}`);
    return imports[specifier];
  }, module, module.exports);
  return { getProductPurchasePolicy: module.exports.getProductPurchasePolicy, reads };
}

const karivProduct = {
  id: 'watch-1', dealer_id: null, price: 4000, sale_price: 3500, currency: 'EUR',
};
const dealerProduct = {
  id: 'watch-2', dealer_id: 'dealer-new', price: 4496, sale_price: null, currency: 'EUR',
};

test('Kariv-owned inventory keeps direct checkout when marketplace payment tables are not deployed', async () => {
  const f = fixture({ destinationError: { message: 'missing migration' } });
  const policy = await f.getProductPurchasePolicy(karivProduct);

  assert.equal(policy.purchaseRoute, purchasePolicy.PURCHASE_ROUTES.KARIV_DIRECT);
  assert.equal(policy.directEligible, true);
  assert.equal(policy.sourceValueEur, 3500);
  assert.deepEqual(policy.reasonCodes, ['kariv_owned_inventory']);
  assert.deepEqual(f.reads, []);
});

test('dealer-routing payment records do not reclassify Kariv-owned inventory', async () => {
  for (const destination of [
    { purchase_route: 'kariv_direct', beneficiary_name: 'Kariv Glamour s.r.o.', iban: 'CZ00', bank_name: 'Bank', verified_at: null },
    { purchase_route: 'kariv_direct', beneficiary_name: 'Kariv Glamour s.r.o.', iban: '', bank_name: 'Bank', verified_at: '2026-09-21T00:00:00Z' },
  ]) {
    const f = fixture({ destinations: [destination] });
    const policy = await f.getProductPurchasePolicy(karivProduct);
    assert.equal(policy.purchaseRoute, purchasePolicy.PURCHASE_ROUTES.KARIV_DIRECT);
    assert.deepEqual(policy.reasonCodes, ['kariv_owned_inventory']);
    assert.deepEqual(f.reads, []);
  }
});

test('Kariv checkout remains direct with a complete platform payment account', async () => {
  const f = fixture({ destinations: [{
    purchase_route: 'kariv_direct',
    beneficiary_name: 'Kariv Glamour s.r.o.',
    iban: 'CZ6508000000001234567899',
    bank_name: 'Czech Bank',
    verified_at: '2026-09-21T00:00:00Z',
  }] });
  const policy = await f.getProductPurchasePolicy(karivProduct);

  assert.equal(policy.purchaseRoute, purchasePolicy.PURCHASE_ROUTES.KARIV_DIRECT);
  assert.equal(policy.directEligible, true);
  assert.equal(policy.sourceValueEur, 3500);
  assert.deepEqual(f.reads, []);
});

test('an approved new dealer with no commerce history uses protected checkout', async () => {
  const f = fixture({
    profile: null,
    destinations: [{
      purchase_route: 'escrow',
      beneficiary_name: 'Kariv Glamour s.r.o.',
      iban: 'CZ6508000000001234567899',
      bank_name: 'Czech Bank',
      verified_at: '2026-09-21T00:00:00Z',
    }],
    application: {
      company_name: 'New Dealer Ltd',
      status: 'approved',
      reviewed_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    },
  });

  const policy = await f.getProductPurchasePolicy(dealerProduct);

  assert.equal(policy.sellerName, 'New Dealer Ltd');
  assert.equal(policy.dealerTier, purchasePolicy.DEALER_TIERS.PROBATIONARY);
  assert.equal(policy.completedSales, 0);
  assert.equal(policy.purchaseRoute, purchasePolicy.PURCHASE_ROUTES.ESCROW);
  assert.equal(policy.escrowRequired, true);
  assert.equal(policy.directEligible, false);
  assert.ok(policy.reasonCodes.includes('dealer_probationary'));
});

test('a missing routing migration remains under review instead of opening a broken checkout', async () => {
  const f = fixture({
    profileError: {
      code: 'PGRST205',
      message: "Could not find the table 'public.dealer_commerce_profiles' in the schema cache",
    },
    destinationError: {
      code: 'PGRST205',
      message: "Could not find the table 'public.store_payment_destinations' in the schema cache",
    },
    application: {
      company_name: 'New Dealer Ltd',
      status: 'approved',
      reviewed_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    },
  });

  const policy = await f.getProductPurchasePolicy(dealerProduct);

  assert.equal(policy.purchaseRoute, purchasePolicy.PURCHASE_ROUTES.MANUAL_REVIEW);
  assert.equal(policy.escrowRequired, false);
});

test('real dealer-profile read failures remain under review', async () => {
  const f = fixture({
    profileError: { code: 'PGRST000', message: 'Database connection failed' },
    destinations: [{
      purchase_route: 'escrow',
      beneficiary_name: 'Kariv Glamour s.r.o.',
      iban: 'CZ6508000000001234567899',
      bank_name: 'Czech Bank',
      verified_at: '2026-09-21T00:00:00Z',
    }],
    application: {
      company_name: 'Approved Dealer Ltd',
      status: 'approved',
      reviewed_at: '2026-09-21T00:00:00Z',
      created_at: '2026-09-21T00:00:00Z',
    },
  });

  const policy = await f.getProductPurchasePolicy(dealerProduct);

  assert.equal(policy.purchaseRoute, purchasePolicy.PURCHASE_ROUTES.MANUAL_REVIEW);
  assert.equal(policy.escrowRequired, false);
  assert.ok(policy.reasonCodes.includes('compliance_review'));
});

test('latest pending application routes through escrow without pretending the dealer is approved', async () => {
  const f = fixture({
    application: { company_name: 'Pending Dealer', status: 'pending', created_at: new Date().toISOString() },
    destinations: [{ purchase_route: 'escrow', beneficiary_name: 'Kariv', iban: 'CZ00', bank_name: 'Bank', verified_at: new Date().toISOString() }],
    profile: { tier: 'trusted', direct_sales_enabled: true, seller_verified: true },
    completedSales: 100,
  });
  const policy = await f.getProductPurchasePolicy(dealerProduct);
  assert.equal(policy.sellerApproved, false);
  assert.equal(policy.dealerTier, 'probationary');
  assert.equal(policy.purchaseRoute, purchasePolicy.PURCHASE_ROUTES.ESCROW);
  assert.ok(policy.reasonCodes.includes('seller_pending_approval'));
  assert.ok(f.reads.filter((read) => ['dealer_applications', 'dealer_commerce_profiles'].includes(read.table))
    .every((read) => read.filters.some(([field, value]) => field === 'store_id' && value === 'kariv')));
});

test('missing, rejected or unreadable applications do not become pending onboarding', async () => {
  for (const application of [null, { status: 'rejected' }, { status: 'suspended' }]) {
    const f = fixture({
      application,
      destinations: [{ purchase_route: 'escrow', beneficiary_name: 'Kariv', iban: 'CZ00', bank_name: 'Bank', verified_at: new Date().toISOString() }],
    });
    assert.equal((await f.getProductPurchasePolicy(dealerProduct)).purchaseRoute, purchasePolicy.PURCHASE_ROUTES.MANUAL_REVIEW);
  }
  const unavailable = fixture({ application: { status: 'pending' }, applicationError: { message: 'Unavailable' } });
  assert.equal((await unavailable.getProductPurchasePolicy(dealerProduct)).purchaseRoute, purchasePolicy.PURCHASE_ROUTES.MANUAL_REVIEW);
});

test('unavailable dispute counts cannot qualify an enterprise dealer for direct payment', async () => {
  const f = fixture({
    application: { status: 'approved', company_name: 'Dealer', created_at: '2025-01-01' },
    profile: { tier: 'enterprise', underwritten: true, direct_sales_enabled: true, seller_verified: true,
      direct_limit_eur: 100000, payment_details_verified_at: '2026-01-01', payment_beneficiary_name: 'Dealer',
      payment_iban: 'CZ00', payment_bank_name: 'Bank' },
    completedSales: 100,
    unresolvedDisputes: null,
    destinations: [{ purchase_route: 'escrow', beneficiary_name: 'Kariv', iban: 'CZ00', bank_name: 'Bank', verified_at: '2026-01-01' }],
  });
  const policy = await f.getProductPurchasePolicy(dealerProduct);
  assert.equal(policy.purchaseRoute, purchasePolicy.PURCHASE_ROUTES.ESCROW);
  assert.ok(policy.reasonCodes.includes('unresolved_disputes'));
});
