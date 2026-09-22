import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { compileFunction } from 'node:vm';
import ts from 'typescript';
import { getProductPricing } from '../src/lib/productMerchant.js';
import { matchesCheckoutPrice } from '../src/lib/currencyConversion.js';
import * as orderShaping from '../src/lib/orderShaping.js';
import * as purchasePolicy from '../src/lib/purchasePolicy.js';

const today = new Date().toISOString().slice(0, 10);
const snapshot = { date: today, source: 'CNB', rates: { EUR: 24.2, USD: 22, CZK: 1 } };
const product = { id: 'watch', store_id: 'kariv', name: 'Watch', price: 1000, sale_price: 800, currency: 'EUR', stock_quantity: 1, status: 'active', dealer_id: 'dealer', images: [], brands: { name: 'Rolex' } };

function checkout({ watch = product, rates = snapshot, existing = null } = {}) {
  const reads = [];
  const writes = [];
  let createdOrder = null;
  let rateCalls = 0;
  const client = {
    async rpc(name, args) {
      assert.equal(name, 'create_kariv_order_with_reservation');
      createdOrder = {
        id: '12345678-order',
        store_id: args.p_store_id,
        buyer_user_id: args.p_buyer_user_id,
        dealer_user_id: args.p_dealer_user_id,
        products: args.p_products,
        total_amount: args.p_total_amount,
        currency: args.p_currency,
        payment_method: args.p_payment_method,
        escrow_status: args.p_escrow_status,
        purchase_route: args.p_purchase_route,
        purchase_status: args.p_purchase_status,
        buyer_selected_protection: args.p_buyer_selected_protection,
        purchase_policy_version: args.p_purchase_policy_version,
        purchase_policy_snapshot: args.p_purchase_policy_snapshot,
        shipping_status: args.p_shipping_status,
        shipping_address: args.p_shipping_address,
        idempotency_key: args.p_idempotency_key,
        inventory_reserved: true,
      };
      writes.push({ table: 'orders', value: createdOrder });
      return { data: createdOrder.id, error: null };
    },
    from(table) {
      const query = {
        filters: [], value: null, operation: 'read',
        select() { return this; }, eq(field, value) { this.filters.push([field, value]); return this; },
        order() { return this; }, limit() { return this; },
        insert(value) { this.operation = 'insert'; this.value = value; return this; },
        upsert(value) { this.operation = 'upsert'; this.value = value; return this; },
        async maybeSingle() {
          reads.push({ table, filters: this.filters });
          if (table === 'products') return { data: watch, error: null };
          if (table === 'orders') return { data: existing || createdOrder, error: null };
          throw new Error('Unexpected read ' + table);
        },
        async single() {
          assert.equal(table, 'orders'); assert.equal(this.operation, 'insert');
          writes.push({ table, value: this.value });
          return { data: { id: '12345678-order', ...this.value }, error: null };
        },
        then(resolve) {
          if (this.operation !== 'read') writes.push({ table, value: this.value });
          return Promise.resolve({ data: [], error: null }).then(resolve);
        },
      };
      return query;
    },
  };
  const imports = {
    '@/lib/supabaseAdmin': { supabaseAdmin: client },
    '@/lib/serverAuth': { requireUser: async () => ({ id: 'buyer', emailVerified: true }), requireDealer() {}, requireAdmin() {} },
    '@/lib/supabaseData': { STORE_ID: 'kariv' },
    '@/lib/catalogTranslations': { loadCatalogTranslations: async () => ({ watch: { productTitle_cs: 'České hodinky', productTitle_en: 'English watch' } }) },
    '@/lib/orderIdentities': { loadIdentities: async () => new Map() },
    '@/lib/orderShaping': orderShaping,
    '@/lib/escrowConstants': { isValidEscrowTransition: () => false },
    '@/lib/productMerchant': { getProductPricing },
    '@/lib/currencyConversion': { matchesCheckoutPrice },
    '@/lib/exchangeRatesServer': { getCzkExchangeRates: async () => { rateCalls++; return rates; } },
    '@/lib/purchasePolicy': purchasePolicy,
    '@/lib/purchasePolicyServer': {
      getProductPurchasePolicy: async (item, { buyerRequestsProtection = false } = {}) => purchasePolicy.evaluatePurchasePolicy({
        dealerId: item.dealer_id || null,
        sellerApproved: Boolean(item.dealer_id),
        sourceValueEur: item.sale_price || item.price,
        buyerRequestsProtection,
      }),
    },
  };
  const source = readFileSync(new URL('../src/actions/orders.js', import.meta.url), 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const module = { exports: {} };
  compileFunction(compiled, ['require', 'module', 'exports'])((name) => {
    assert.ok(name in imports, name); return imports[name];
  }, module, module.exports);
  return { createOrder: module.exports.createOrder, reads, writes, get rateCalls() { return rateCalls; } };
}

const request = { productId: 'watch', shippingDetails: { fullName: 'Buyer', street: 'Example 1', city: 'Praha', country: 'CZ', postalCode: '18600' }, idempotencyKey: 'checkout-reference', locale: 'cs', expectedPrice: 19360, expectedCurrency: 'CZK', expectedPurchaseRoute: 'dealer_direct', expectedSellerKey: 'dealer:dealer' };

test('Czech checkout stores real CZK order and line totals computed from fresh EUR sale price', async () => {
  const fixture = checkout();
  const response = await fixture.createOrder({ ...request, totalAmount: 1, exchangeRates: { EUR: 0.001 }, currency: 'EUR' });
  assert.equal(response.ok, true);
  assert.equal(response.order.totalAmount, 19360);
  assert.equal(response.order.currency, 'CZK');
  assert.equal(response.order.products[0].price, 19360);
  assert.equal(response.order.products[0].currency, 'CZK');
  assert.equal(response.order.products[0].productTitle_cs, 'České hodinky');
  const saved = fixture.writes.find(({ table }) => table === 'orders').value;
  assert.equal(saved.products[0].conversion.source_price, 800);
  assert.equal(saved.products[0].conversion.source_currency, 'EUR');
  assert.equal(saved.products[0].conversion.rate, 24.2);
  assert.equal(saved.products[0].conversion.rate_date, today);
  assert.equal(saved.payment_method, 'bank_transfer');
  assert.equal(saved.purchase_route, 'dealer_direct');
  assert.equal(saved.purchase_status, 'awaiting_seller_confirmation');
  assert.equal(saved.purchase_policy_snapshot.purchase_route, 'dealer_direct');
  assert.equal(saved.store_id, 'kariv');
  assert.equal(saved.buyer_user_id, 'buyer');
  for (const read of fixture.reads) assert.ok(read.filters.some(([key, value]) => key === 'store_id' && value === 'kariv'));
  assert.ok(fixture.reads.find(({ table }) => table === 'orders').filters.some(([key, value]) => key === 'buyer_user_id' && value === 'buyer'));
});

test('changed conversion requires explicit reapproval and never stores the stale or tampered total', async () => {
  const fixture = checkout({ rates: { ...snapshot, rates: { ...snapshot.rates, EUR: 25 } } });
  const response = await fixture.createOrder(request);
  assert.equal(response.ok, false);
  assert.equal(response.code, 'PRICE_CHANGED');
  assert.equal(response.pricing.price, 20000);
  assert.equal(response.pricing.currency, 'CZK');
  assert.equal(fixture.writes.length, 0);
  const retry = await fixture.createOrder({ ...request, expectedPrice: response.pricing.price });
  assert.equal(retry.ok, true);
  assert.equal(retry.order.totalAmount, 20000);
});

test('unavailable or stale rates stop Czech checkout instead of falling back to euros', async () => {
  for (const rates of [null, { ...snapshot, date: '2000-01-01' }, { ...snapshot, rates: { USD: 22 } }]) {
    const fixture = checkout({ rates });
    const response = await fixture.createOrder(request);
    assert.equal(response.ok, false);
    assert.equal(fixture.writes.length, 0);
  }
});

test('English/German orders retain the saved catalogue currency and never request CNB rates', async () => {
  for (const locale of ['en', 'de']) for (const currency of ['EUR', 'USD']) {
    const fixture = checkout({ watch: { ...product, currency }, rates: null });
    const response = await fixture.createOrder({ ...request, locale, expectedPrice: 800, expectedCurrency: currency });
    assert.equal(response.ok, true);
    assert.equal(response.order.totalAmount, 800);
    assert.equal(response.order.currency, currency);
    assert.equal(fixture.rateCalls, 0);
    assert.equal(fixture.writes.find(({ table }) => table === 'orders').value.products[0].conversion, undefined);
  }
});

test('invalid checkout language, wrong expected currency, and unavailable stock cannot create an order', async () => {
  for (const override of [{ locale: 'cz' }, { expectedCurrency: 'EUR' }, { expectedPrice: 1 }, { expectedPrice: '19360' }, { idempotencyKey: '' }]) {
    const fixture = checkout();
    assert.equal((await fixture.createOrder({ ...request, ...override })).ok, false);
    assert.equal(fixture.writes.length, 0);
  }
  for (const override of [{ status: 'draft' }, { stock_quantity: 0 }]) {
    const fixture = checkout({ watch: { ...product, ...override } });
    assert.equal((await fixture.createOrder(request)).ok, false);
    assert.equal(fixture.rateCalls, 0);
    assert.equal(fixture.writes.length, 0);
  }
});

test('retrying a completed order preserves its original CZK amount even after the rate changes', async () => {
  const fixture = checkout({ rates: null, existing: {
    id: 'existing-order', store_id: 'kariv', buyer_user_id: 'buyer', dealer_user_id: 'dealer',
    total_amount: 19000, currency: 'CZK', products: [{ product_id: 'watch', price: 19000, currency: 'CZK', quantity: 1 }],
    escrow_status: 'pending_review', payment_method: 'bank_transfer',
  } });
  const response = await fixture.createOrder(request);
  assert.equal(response.ok, true);
  assert.equal(response.order.totalAmount, 19000);
  assert.equal(response.order.currency, 'CZK');
  assert.equal(fixture.rateCalls, 0);
  assert.equal(fixture.writes.length, 0);
});
