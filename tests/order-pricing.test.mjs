import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { compileFunction } from 'node:vm';
import ts from 'typescript';
import * as productMerchant from '../src/lib/productMerchant.js';
import * as orderShaping from '../src/lib/orderShaping.js';
import * as escrowConstants from '../src/lib/escrowConstants.js';

// Execute the real server action with an entirely in-memory database and auth
// boundary. This cannot access Supabase, write an order or contact a customer.
const { outputText } = ts.transpileModule(readFileSync(new URL('../src/actions/orders.js', import.meta.url), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
});
const baseProduct = {
  id: 'watch', store_id: 'kariv', status: 'active', stock_quantity: 1,
  name: 'Watch', price: 3000, sale_price: 2500, currency: 'CHF', brands: { name: 'Example' },
};

function fixture({ product = baseProduct, existing = null, signedIn = true } = {}) {
  const writes = [];
  const reads = [];
  let authCalls = 0;
  const database = {
    from(table) {
      const filters = [];
      let inserted;
      const query = {
        select() { return query; },
        eq(key, value) { filters.push([key, value]); return query; },
        order() { return query; },
        limit() { return query; },
        async maybeSingle() {
          reads.push({ table, filters: [...filters] });
          const row = table === 'products' ? product : table === 'orders' ? existing : null;
          return { data: row && filters.every(([key, value]) => row[key] === value) ? row : null, error: null };
        },
        insert(row) { inserted = { id: 'order-1', ...row }; writes.push({ table, row }); return query; },
        async single() { return { data: inserted, error: null }; },
        async upsert(row) { writes.push({ table, row }); return { error: null }; },
        then(resolve, reject) {
          if (table !== 'order_messages') throw new Error(`Unexpected fixture query ${table}`);
          return Promise.resolve({ data: [], error: null }).then(resolve, reject);
        },
      };
      return query;
    },
  };
  const imports = {
    '@/lib/supabaseAdmin': { supabaseAdmin: database },
    '@/lib/serverAuth': {
      requireUser: async () => { authCalls++; if (!signedIn) throw new Error('Sign in required'); return { id: 'buyer' }; },
      requireDealer: () => { throw new Error('Unexpected dealer operation'); },
      requireAdmin: () => { throw new Error('Unexpected admin operation'); },
    },
    '@/lib/supabaseData': { STORE_ID: 'kariv' },
    '@/lib/orderIdentities': { loadIdentities: async () => new Map() },
    '@/lib/orderShaping': orderShaping,
    '@/lib/escrowConstants': escrowConstants,
    '@/lib/productMerchant': productMerchant,
  };
  const module = { exports: {} };
  compileFunction(outputText, ['require', 'module', 'exports'])((specifier) => {
    assert.ok(specifier in imports, `Unmocked dependency ${specifier}`);
    return imports[specifier];
  }, module, module.exports);
  return { createOrder: module.exports.createOrder, reads, writes, authCalls: () => authCalls };
}

const input = { productId: 'watch', shippingDetails: { fullName: 'Test buyer', country: 'CZ' }, idempotencyKey: 'test-key' };

test('real order action snapshots the shared validated current price and recorded currency', async () => {
  for (const [sale_price, expected] of [[2500, 2500], [null, 3000], [0, 3000], [-20, 3000], [4000, 3000], [3000, 3000]]) {
    const f = fixture({ product: { ...baseProduct, sale_price } });
    const result = await f.createOrder({ ...input, total: 1, price: 1, currency: 'USD' });
    assert.equal(result.ok, true);
    const row = f.writes.find(({ table }) => table === 'orders').row;
    assert.equal(row.total_amount, expected);
    assert.equal(row.products[0].price, expected);
    assert.equal(row.currency, 'CHF');
    assert.equal(row.products[0].currency, 'CHF');
    assert.equal(row.buyer_user_id, 'buyer');
    assert.equal(row.store_id, 'kariv');
    assert.equal(row.payment_method, 'bank_transfer');
    assert.equal(row.escrow_status, 'pending_review');
    assert.deepEqual(row.shipping_address, input.shippingDetails);
    assert.equal(result.order.totalAmount, expected);
    assert.equal(result.order.currency, 'CHF');
    assert.equal(f.authCalls(), 1);
    assert.deepEqual(f.reads.find(({ table }) => table === 'products').filters, [['id', 'watch'], ['store_id', 'kariv']]);
  }
});

test('invalid offers fail before any order or profile write', async () => {
  for (const updates of [{ price: null }, { price: 0 }, { price: -1 }, { price: 'broken' }, { currency: 'not currency' }]) {
    const f = fixture({ product: { ...baseProduct, ...updates } });
    const result = await f.createOrder(input);
    assert.equal(result.ok, false);
    assert.match(result.error, /valid purchase price/);
    assert.equal(f.writes.length, 0);
  }
});

test('active status, stock, tenant scope and sign-in boundaries still protect order creation', async () => {
  for (const updates of [{ status: 'draft' }, { stock_quantity: 0 }, { store_id: 'other-store' }]) {
    const f = fixture({ product: { ...baseProduct, ...updates } });
    assert.equal((await f.createOrder(input)).ok, false);
    assert.equal(f.writes.length, 0);
  }
  const f = fixture({ signedIn: false });
  await assert.rejects(f.createOrder(input), /Sign in required/);
  assert.equal(f.reads.length, 0);
  assert.equal(f.writes.length, 0);
});

test('replaying an existing order returns its historical amount without repricing or new writes', async () => {
  const existing = {
    id: 'existing-order', store_id: 'kariv', buyer_user_id: 'buyer', idempotency_key: 'test-key',
    total_amount: 2750, currency: 'GBP', products: [{ product_id: 'watch', title: 'Original watch', price: 2750, currency: 'GBP', quantity: 1 }],
  };
  const f = fixture({ existing, product: { ...baseProduct, price: 9000 } });
  const result = await f.createOrder(input);
  assert.equal(result.order.totalAmount, 2750);
  assert.equal(result.order.currency, 'GBP');
  assert.equal(result.order.products[0].price, 2750);
  assert.equal(f.reads.some(({ table }) => table === 'products'), false);
  assert.equal(f.writes.length, 0);
});

test('checkout uses current pricing; the order portal displays saved amounts without recalculation', () => {
  const checkout = readFileSync(new URL('../src/page-content/Checkout.jsx', import.meta.url), 'utf8');
  assert.match(checkout, /getProductPricing\(product \|\| \{\}\)/);
  assert.match(checkout, /formatPrice\(pricing.price, pricing.currency\)/);
  assert.match(checkout, /if \(!availableToPurchase\) return false/);
  assert.match(checkout, /if \(!canSubmit\(\) \|\| submitting\) return/);
  assert.doesNotMatch(checkout, /salePrice \|\| product.price/);
  for (const file of ['PortalOrders', 'PortalOrderDetail']) {
    const portal = readFileSync(new URL(`../src/page-content/portal/${file}.jsx`, import.meta.url), 'utf8');
    assert.match(portal, /formatPrice\(order.totalAmount, order.currency \|\| 'EUR'\)/);
    assert.doesNotMatch(portal, /getProductPricing|salePrice/);
  }
});
