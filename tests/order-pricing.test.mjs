import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { compileFunction } from 'node:vm';
import ts from 'typescript';
import * as productMerchant from '../src/lib/productMerchant.js';
import * as orderShaping from '../src/lib/orderShaping.js';
import * as escrowConstants from '../src/lib/escrowConstants.js';
import * as currencyConversion from '../src/lib/currencyConversion.js';
import * as purchasePolicy from '../src/lib/purchasePolicy.js';

// Execute the real server action with an entirely in-memory database and auth
// boundary. This cannot access Supabase, write an order or contact a customer.
const { outputText } = ts.transpileModule(readFileSync(new URL('../src/actions/orders.js', import.meta.url), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
});
const baseProduct = {
  id: 'watch', store_id: 'kariv', status: 'active', stock_quantity: 1,
  name: 'Watch', price: 3000, sale_price: 2500, currency: 'CHF', brands: { name: 'Example' },
};

function fixture({ product = baseProduct, existing = null, signedIn = true, emailVerified = true, policyResolver = null } = {}) {
  const writes = [];
  const reads = [];
  const rpcCalls = [];
  const policyCalls = [];
  let createdOrder = null;
  let authCalls = 0;
  const database = {
    async rpc(name, args) {
      assert.equal(name, 'create_kariv_order_with_reservation');
      rpcCalls.push({ name, args });
      createdOrder = {
        id: 'order-1',
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
      writes.push({ table: 'orders', row: createdOrder });
      return { data: createdOrder.id, error: null };
    },
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
          const row = table === 'products' ? product : table === 'orders' ? (existing || createdOrder) : null;
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
      requireUser: async () => { authCalls++; if (!signedIn) throw new Error('Sign in required'); return { id: 'buyer', emailVerified }; },
      requireDealer: () => { throw new Error('Unexpected dealer operation'); },
      requireAdmin: () => { throw new Error('Unexpected admin operation'); },
    },
    '@/lib/supabaseData': { STORE_ID: 'kariv' },
    '@/lib/catalogTranslations': { loadCatalogTranslations: async () => ({}) },
    '@/lib/orderIdentities': { loadIdentities: async () => new Map() },
    '@/lib/orderShaping': orderShaping,
    '@/lib/escrowConstants': escrowConstants,
    '@/lib/productMerchant': productMerchant,
    '@/lib/currencyConversion': currencyConversion,
    '@/lib/exchangeRatesServer': { getCzkExchangeRates: async () => { throw new Error('English checkout must not fetch exchange rates'); } },
    '@/lib/purchasePolicy': purchasePolicy,
    '@/lib/purchasePolicyServer': {
      getProductPurchasePolicy: async (watch, options = {}) => {
        policyCalls.push({ watch, options });
        const regularPrice = Number(watch.price);
        const candidateSalePrice = Number(watch.sale_price);
        const currentSourcePrice = Number.isFinite(candidateSalePrice) && candidateSalePrice > 0 && candidateSalePrice < regularPrice
          ? candidateSalePrice
          : regularPrice;
        return policyResolver
          ? policyResolver(watch, options)
          : purchasePolicy.evaluatePurchasePolicy({
            dealerId: watch.dealer_id || null,
            sellerApproved: Boolean(watch.dealer_id),
            sourceValueEur: currentSourcePrice,
            buyerRequestsProtection: options.buyerRequestsProtection,
          });
      },
    },
  };
  const module = { exports: {} };
  compileFunction(outputText, ['require', 'module', 'exports'])((specifier) => {
    assert.ok(specifier in imports, `Unmocked dependency ${specifier}`);
    return imports[specifier];
  }, module, module.exports);
  return { createOrder: module.exports.createOrder, reads, writes, rpcCalls, policyCalls, authCalls: () => authCalls };
}

const input = { productId: 'watch', shippingDetails: { fullName: 'Test buyer', country: 'CZ' }, idempotencyKey: 'test-key', locale: 'en', expectedPrice: 2500, expectedCurrency: 'CHF', expectedPurchaseRoute: 'kariv_direct', expectedSellerKey: 'kariv' };

test('real order action snapshots the shared validated current price and recorded currency', async () => {
  for (const [sale_price, expected] of [[2500, 2500], [null, 3000], [0, 3000], [-20, 3000], [4000, 3000], [3000, 3000]]) {
    const f = fixture({ product: { ...baseProduct, sale_price } });
    const result = await f.createOrder({ ...input, expectedPrice: expected, total: 1, price: 1, currency: 'USD' });
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
    assert.equal(row.purchase_route, 'kariv_direct');
    assert.equal(row.purchase_status, 'awaiting_seller_confirmation');
    assert.equal(row.purchase_policy_version, purchasePolicy.PURCHASE_POLICY_VERSION);
    assert.equal(row.purchase_policy_snapshot.purchase_route, 'kariv_direct');
    assert.deepEqual(row.shipping_address, input.shippingDetails);
    assert.equal(row.inventory_reserved, false);
    assert.equal(row.reservation_expires_at, null);
    assert.equal(f.rpcCalls.length, 0);
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

test('a signed-in buyer can place an ordinary order without an extra email-verification gate', async () => {
  const f = fixture({ emailVerified: false });
  const result = await f.createOrder(input);
  assert.equal(result.ok, true);
  assert.equal(f.reads.some(({ table }) => table === 'products'), true);
  assert.equal(f.rpcCalls.length, 0);
  assert.ok(f.writes.some(({ table }) => table === 'orders'));
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

test('server approval—not legacy dealer metrics or a client route—selects marketplace checkout', async () => {
  const dealerProduct = { ...baseProduct, dealer_id: 'dealer-1', currency: 'EUR' };
  const healthyDealer = {
    dealerId: 'dealer-1', sellerName: 'Prague Timepieces s.r.o.', configuredTier: 'standard',
    activeDays: 100, completedSales: 12, unresolvedDisputes: 0,
    directSalesEnabled: true, sellerApproved: true, sellerVerified: true, paymentDetailsVerified: true, escrowEnabled: true,
    complianceStatus: 'clear', refundStatus: 'clear', sourceValueEur: 2500,
  };
  const f = fixture({
    product: dealerProduct,
    policyResolver: (_watch, options) => purchasePolicy.evaluatePurchasePolicy({
      ...healthyDealer,
      buyerRequestsProtection: options.buyerRequestsProtection,
    }),
  });
  const result = await f.createOrder({
    ...input,
    expectedCurrency: 'EUR',
    expectedPurchaseRoute: 'dealer_direct',
    expectedSellerKey: 'dealer:dealer-1',
    purchaseRoute: 'kariv_direct',
    buyerRequestsProtection: false,
  });
  assert.equal(result.ok, true);
  const row = f.writes.find(({ table }) => table === 'orders').row;
  assert.equal(row.purchase_route, 'dealer_direct');
  assert.equal(row.purchase_policy_snapshot.purchase_route, 'dealer_direct');
  assert.equal(row.purchase_policy_snapshot.seller_name, 'Prague Timepieces s.r.o.');
  assert.equal(row.buyer_selected_protection, false);
  assert.equal(f.rpcCalls.length, 0);
  assert.equal(f.policyCalls[0].options.buyerRequestsProtection, false);
});

test('a client cannot mark Kariv-owned inventory as buyer-protected', async () => {
  const f = fixture();
  const result = await f.createOrder({
    ...input,
    buyerRequestsProtection: true,
  });
  assert.equal(result.ok, true);
  const row = f.writes.find(({ table }) => table === 'orders').row;
  assert.equal(row.purchase_route, 'kariv_direct');
  assert.equal(row.buyer_selected_protection, false);
  assert.equal(row.purchase_policy_snapshot.reason_codes, undefined);
});

test('approved dealers use one marketplace route, while an unapproved dealer cannot create an order', async () => {
  const dealerProduct = { ...baseProduct, dealer_id: 'dealer-1', currency: 'EUR' };
  const dealer = {
    dealerId: 'dealer-1', configuredTier: 'standard', activeDays: 100, completedSales: 12,
    directSalesEnabled: true, sellerApproved: true, sellerVerified: true, paymentDetailsVerified: true, escrowEnabled: true,
    complianceStatus: 'clear', refundStatus: 'clear', sourceValueEur: 2500,
  };
  const approvedFixture = fixture({
    product: dealerProduct,
    policyResolver: (_watch, options) => purchasePolicy.evaluatePurchasePolicy({ ...dealer, buyerRequestsProtection: options.buyerRequestsProtection }),
  });
  const approvedResult = await approvedFixture.createOrder({ ...input, expectedCurrency: 'EUR', expectedPurchaseRoute: 'dealer_direct', expectedSellerKey: 'dealer:dealer-1', buyerRequestsProtection: true });
  assert.equal(approvedResult.ok, true);
  const approvedRow = approvedFixture.writes.find(({ table }) => table === 'orders').row;
  assert.equal(approvedRow.purchase_route, 'dealer_direct');
  assert.equal(approvedRow.buyer_selected_protection, false);
  assert.equal(approvedRow.purchase_policy_snapshot.buyer_selected_protection, false);
  assert.equal(approvedRow.purchase_policy_snapshot.reason_codes, undefined);

  const heldFixture = fixture({
    product: dealerProduct,
    policyResolver: () => purchasePolicy.evaluatePurchasePolicy({ ...dealer, sellerApproved: false }),
  });
  const heldResult = await heldFixture.createOrder({ ...input, expectedCurrency: 'EUR', expectedPurchaseRoute: 'dealer_direct', expectedSellerKey: 'dealer:dealer-1' });
  assert.equal(heldResult.ok, false);
  assert.equal(heldResult.code, 'MANUAL_REVIEW_REQUIRED');
  assert.equal(heldResult.policy, undefined);
  assert.equal(heldFixture.writes.length, 0);
});

test('a live route change requires the buyer to review terms again', async () => {
  const dealerProduct = { ...baseProduct, dealer_id: 'dealer-1', currency: 'EUR' };
  const f = fixture({
    product: dealerProduct,
    policyResolver: () => purchasePolicy.evaluatePurchasePolicy({
      dealerId: 'dealer-1',
      sellerApproved: true,
      sellerVerified: true,
      configuredTier: 'probationary',
      escrowEnabled: true,
      sourceValueEur: 2500,
    }),
  });
  const result = await f.createOrder({
    ...input,
    expectedCurrency: 'EUR',
    expectedPurchaseRoute: 'escrow',
    expectedSellerKey: 'dealer:dealer-1',
  });
  assert.equal(result.ok, false);
  assert.equal(result.code, 'PURCHASE_ROUTE_CHANGED');
  assert.equal(result.purchaseRoute, undefined);
  assert.equal(result.buyerMayChooseProtection, undefined);
  assert.equal(f.writes.length, 0);
});

test('a seller reassignment with the same route requires the buyer to review terms again', async () => {
  const dealerProduct = { ...baseProduct, dealer_id: 'dealer-2', currency: 'EUR' };
  const f = fixture({
    product: dealerProduct,
    policyResolver: () => purchasePolicy.evaluatePurchasePolicy({
      dealerId: 'dealer-2', configuredTier: 'standard', activeDays: 100, completedSales: 12,
      directSalesEnabled: true, sellerApproved: true, sellerVerified: true, paymentDetailsVerified: true, escrowEnabled: true,
      complianceStatus: 'clear', refundStatus: 'clear', sourceValueEur: 2500,
    }),
  });
  const result = await f.createOrder({
    ...input,
    expectedCurrency: 'EUR',
    expectedPurchaseRoute: 'dealer_direct',
    expectedSellerKey: 'dealer:dealer-1',
  });
  assert.equal(result.ok, false);
  assert.equal(result.code, 'PURCHASE_ROUTE_CHANGED');
  assert.equal(f.writes.length, 0);
});

test('checkout uses current pricing; the order portal displays saved amounts without recalculation', () => {
  const checkout = readFileSync(new URL('../src/page-content/Checkout.jsx', import.meta.url), 'utf8');
  assert.match(checkout, /useStorefrontPricing\(\)/);
  assert.match(checkout, /getPricing\(product \|\| \{\}\)/);
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

test('order presentation preserves the checkout-time verified seller of record', () => {
  const identities = new Map([['dealer-1', { fullName: 'Changed account name' }]]);
  const shaped = orderShaping.mapOrderRow({
    id: 'order-1',
    buyer_user_id: 'buyer',
    dealer_user_id: 'dealer-1',
    products: [],
    purchase_route: 'dealer_direct',
    purchase_policy_snapshot: { seller_name: 'Prague Timepieces s.r.o.' },
  }, { identities });
  assert.equal(shaped.dealerName, 'Prague Timepieces s.r.o.');
});
