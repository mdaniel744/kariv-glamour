import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { compileFunction } from 'node:vm';
import ts from 'typescript';

const STORE_ID = 'kariv-store';

function fixture({ rows = [], orders = [], orderError = null, throws = false } = {}) {
  const calls = [];
  const imports = {
    'server-only': {},
    '@/lib/supabaseAdmin': { supabaseAdmin: { from(table) {
      const call = { table, filters: [] };
      calls.push(call);
      const query = {
        select(columns) { call.select = columns; return query; },
        eq(key, value) { call.filters.push(['eq', key, value]); return query; },
        in(key, value) { call.filters.push(['in', key, value]); return query; },
        order(key, value) { call.order = [key, value]; return query; },
        limit(value) { call.limit = value; return query; },
        then(resolve, reject) {
          if (table === 'orders' && throws) return Promise.reject(new Error('Order service unavailable')).then(resolve, reject);
          // Deliberately do not apply query filters: the helper must recheck
          // ownership before exposing snapshots, even with unexpected rows.
          return Promise.resolve({ data: table === 'orders' ? orders : rows, error: table === 'orders' ? orderError : null }).then(resolve, reject);
        },
      };
      return query;
    } } },
    '@/lib/supabaseData': { STORE_ID },
    '@/lib/orderShaping': { formatEscrowReference: (id) => id },
  };
  const source = readFileSync(new URL('../src/lib/dealerReviewsData.js', import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } });
  const module = { exports: {} };
  compileFunction(outputText, ['require', 'module', 'exports'])((name) => {
    assert.ok(name in imports, `Unexpected dependency: ${name}`);
    return imports[name];
  }, module, module.exports);
  return { ...module.exports, calls };
}

const review = {
  id: 'review-1', dealer_user_id: 'dealer-1', buyer_user_id: 'buyer-1', order_id: 'order-1',
  rating: 5, review_text: 'Excellent dealer and watch.', buyer_name: 'A buyer', status: 'approved',
};
const order = {
  id: 'order-1', store_id: STORE_ID, dealer_user_id: 'dealer-1', buyer_user_id: 'buyer-1',
  shipping_address: { name: 'Private person', street: 'Private street' }, payment_reference: 'private-payment',
  products: [
    { product_id: 'watch-1', title: 'Rolex Datejust', title_en: 'Rolex Datejust', title_de: 'Rolex Datejust Uhr', title_cs: 'Hodinky Rolex Datejust', image: 'https://cdn.example/watch.webp', quantity: 1, price: 7500, currency: 'EUR', conversion: { rate: 25 } },
    { product_id: 'watch-2', title: 'Omega Speedmaster', image: '/images/omega.webp', quantity: 2, price: 4500 },
  ],
};

test('purchased watches come only from the exact reviewed order and expose display fields', async () => {
  const { loadPublicDealerReviewsWithPurchases, calls } = fixture({ orders: [order] });
  const [result] = await loadPublicDealerReviewsWithPurchases([review], 'dealer-1');
  assert.deepEqual(result.purchasedWatches, [
    { title: 'Rolex Datejust', title_en: 'Rolex Datejust', title_de: 'Rolex Datejust Uhr', title_cs: 'Hodinky Rolex Datejust', image: 'https://cdn.example/watch.webp', quantity: 1 },
    { title: 'Omega Speedmaster', image: '/images/omega.webp', quantity: 2 },
  ]);
  const serialized = JSON.stringify(result);
  for (const privateValue of ['buyer-1', 'order-1', 'watch-1', 'private-payment', 'Private street', '7500', 'conversion', 'EUR']) {
    assert.ok(!serialized.includes(privateValue), `Public review must omit ${privateValue}`);
  }
  assert.deepEqual(calls[0], {
    table: 'orders', select: 'id,store_id,dealer_user_id,buyer_user_id,products', filters: [
      ['eq', 'store_id', STORE_ID], ['eq', 'dealer_user_id', 'dealer-1'],
      ['in', 'buyer_user_id', ['buyer-1']], ['in', 'id', ['order-1']],
    ],
  });
});

test('cross-tenant, dealer, buyer, or order mismatches never publish purchased watches', async () => {
  for (const mismatch of [{ store_id: 'other-store' }, { dealer_user_id: 'other-dealer' }, { buyer_user_id: 'other-buyer' }, { id: 'other-order' }]) {
    const { loadPublicDealerReviewsWithPurchases } = fixture({ orders: [{ ...order, ...mismatch }] });
    const [result] = await loadPublicDealerReviewsWithPurchases([review], 'dealer-1');
    assert.deepEqual(result.purchasedWatches, []);
    assert.equal(result.reviewText, review.review_text);
  }
  const { loadPublicDealerReviewsWithPurchases, calls } = fixture({ orders: [order] });
  const [result] = await loadPublicDealerReviewsWithPurchases([{ ...review, buyer_user_id: null }], 'dealer-1');
  assert.deepEqual(result.purchasedWatches, []);
  assert.equal(calls.length, 0);
});

test('unavailable and malformed order snapshots leave approved comments visible without invented watches', async () => {
  for (const settings of [{ orderError: { message: 'Unavailable' } }, { throws: true }, { orders: [] }, { orders: [{ ...order, products: '{}' }] }]) {
    const { loadPublicDealerReviewsWithPurchases } = fixture(settings);
    const [result] = await loadPublicDealerReviewsWithPurchases([review], 'dealer-1');
    assert.deepEqual(result.purchasedWatches, []);
    assert.equal(result.reviewText, review.review_text);
  }
});

test('snapshot projection supports saved translations and ignores malformed items and unsafe images', () => {
  const { mapPurchasedWatchSnapshots } = fixture();
  assert.deepEqual(mapPurchasedWatchSnapshots([null, 'watch', [], {}, { title_en: 'English watch', image: 'javascript:alert(1)', quantity: -1 }]), [
    { title: 'English watch', title_en: 'English watch', image: '' },
  ]);
});

test('approved dealer profile reviews use the same purchase enrichment and approval scope', async () => {
  const { loadApprovedDealerReviews, calls } = fixture({ rows: [review], orders: [order] });
  const result = await loadApprovedDealerReviews('dealer-1', 25);
  assert.equal(result[0].purchasedWatches.length, 2);
  assert.deepEqual(calls[0].filters, [['eq', 'store_id', STORE_ID], ['eq', 'dealer_user_id', 'dealer-1'], ['eq', 'status', 'approved']]);
  assert.equal(calls[0].limit, 25);
});
