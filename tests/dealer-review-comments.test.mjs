import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { compileFunction } from 'node:vm';
import ts from 'typescript';
import * as ratingHelpers from '../src/lib/dealerRatingSummaries.js';
import { formatEscrowReference } from '../src/lib/orderShaping.js';

const STORE_ID = 'kariv-store';
const VERSION = '2026-09-20T10:00:00.000Z';
const NEW_COMMENT = 'The dealer was helpful after delivery and the watch arrived as described.';

function compile(path, imports) {
  const source = readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  });
  const module = { exports: {} };
  compileFunction(outputText, ['require', 'module', 'exports'])((name) => {
    assert.ok(name in imports, `Unexpected dependency in ${path}: ${name}`);
    return imports[name];
  }, module, module.exports);
  return module.exports;
}

const defaultReview = {
  id: 'review-1', store_id: STORE_ID, dealer_user_id: 'dealer-1', buyer_user_id: 'buyer-1',
  buyer_name: 'Verified buyer', order_id: 'order-1', rating: 4, title: 'Very good purchase',
  review_text: 'Original approved buyer comment.', status: 'approved',
  reviewed_by: 'admin-1', reviewed_at: VERSION, created_at: '2026-09-19T10:00:00.000Z', updated_at: VERSION,
};
const defaultOrder = {
  id: 'order-1', store_id: STORE_ID, dealer_user_id: 'dealer-1', buyer_user_id: 'buyer-1',
  purchase_status: 'completed', escrow_status: 'not_applicable', created_at: '2026-09-18T10:00:00.000Z',
  products: [
    { product_id: 'watch-1', title: 'Rolex Datejust', title_en: 'Rolex Datejust', title_de: 'Rolex Datejust Uhr', title_cs: 'Hodinky Rolex Datejust', image: '/watch-1.webp', quantity: 1, price: 8500, currency: 'EUR' },
    { product_id: 'watch-2', title: 'Omega Speedmaster', image: '/watch-2.webp', quantity: 2, price: 4500, currency: 'EUR' },
  ],
  shipping_address: { street: 'Private address' }, payment_reference: 'Private payment reference',
};

function fixture({
  reviews = [defaultReview], orders = [defaultOrder], userId = 'buyer-1',
  missingPurchaseStatus = false, beforeUpdate = null, readError = null, updateError = null, adminId = null,
} = {}) {
  const tables = { dealer_reviews: structuredClone(reviews), orders: structuredClone(orders) };
  const calls = [];
  const invalidated = [];
  const supabaseAdmin = {
    from(table) {
      const call = { table, action: 'read', filters: [] };
      calls.push(call);
      function execute(single = false) {
        if (call.table === 'dealer_reviews' && call.action === 'read' && readError) {
          return Promise.resolve({ data: null, error: readError });
        }
        if (call.table === 'orders' && call.or && missingPurchaseStatus) {
          return Promise.resolve({ data: null, error: { code: '42703', message: 'column orders.purchase_status does not exist' } });
        }
        if (call.action === 'update') {
          beforeUpdate?.(tables, call);
          if (updateError) return Promise.resolve({ data: null, error: updateError });
        }
        if (call.action === 'insert') {
          const row = { id: 'review-new', created_at: VERSION, ...call.values };
          tables[table].push(row);
          return Promise.resolve({ data: structuredClone(single ? row : [row]), error: null });
        }
        let rows = (tables[table] || []).filter((row) => call.filters.every(([kind, key, value]) => (
          kind === 'in' ? value.includes(row[key]) : row[key] === value
        )));
        if (call.or) {
          assert.equal(call.or, 'purchase_status.eq.completed,escrow_status.eq.funds_released');
          rows = rows.filter((row) => row.purchase_status === 'completed' || row.escrow_status === 'funds_released');
        }
        if (call.order) {
          const [key, options] = call.order;
          rows.sort((left, right) => String(left[key]).localeCompare(String(right[key])) * (options.ascending === false ? -1 : 1));
        }
        if (call.action === 'update') rows.forEach((row) => Object.assign(row, call.values));
        return Promise.resolve({ data: structuredClone(single ? rows[0] || null : rows), error: null });
      }
      const query = {
        select(columns = '*') { call.select = columns; return query; },
        eq(key, value) { call.filters.push(['eq', key, value]); return query; },
        in(key, value) { call.filters.push(['in', key, value]); return query; },
        or(value) { call.or = value; return query; },
        order(key, options) { call.order = [key, options]; return query; },
        update(values) { call.action = 'update'; call.values = structuredClone(values); return query; },
        insert(values) { call.action = 'insert'; call.values = structuredClone(values); return query; },
        maybeSingle() { return execute(true); },
        single() { return execute(true); },
        then(resolve, reject) { return execute().then(resolve, reject); },
      };
      return query;
    },
  };
  const dataHelpers = compile('src/lib/dealerReviewsData.js', {
    'server-only': {}, '@/lib/supabaseAdmin': { supabaseAdmin },
    '@/lib/supabaseData': { STORE_ID }, '@/lib/orderShaping': { formatEscrowReference },
  });
  const actions = compile('src/actions/dealerReviews.js', {
    'next/cache': { revalidatePath: (...args) => invalidated.push(args) },
    '@/lib/supabaseAdmin': { supabaseAdmin },
    '@/lib/serverAuth': {
      requireUser: async () => ({ id: userId, fullName: 'Verified buyer' }),
      requireAdmin: async () => {
        if (adminId) return { id: adminId };
        throw new Error('Buyers must not call admin authorization.');
      },
    },
    '@/lib/supabaseData': { STORE_ID },
    '@/lib/orderShaping': { formatEscrowReference },
    '@/lib/orderIdentities': { loadIdentities: async () => new Map() },
    '@/lib/dealerReviewsData': dataHelpers,
    '@/lib/dealerRatingSummaries': ratingHelpers,
  });
  return { actions, calls, tables, invalidated };
}

function updateInput(extra = {}) {
  return { reviewId: 'review-1', reviewText: NEW_COMMENT, expectedUpdatedAt: VERSION, ...extra };
}

test('a verified buyer can revise feedback without admin approval or changing the original rating or title', async () => {
  for (const status of ['approved', 'pending', 'rejected']) {
    const { actions, tables, calls, invalidated } = fixture({ reviews: [{ ...defaultReview, status }] });
    const result = await actions.updateDealerReviewComment(updateInput({
      reviewText: `  ${NEW_COMMENT}  `, status: 'approved', rating: 1, title: 'Tampered title',
      dealerId: 'other-dealer', orderId: 'other-order', reviewedBy: 'fake-admin',
    }));
    assert.equal(result.ok, true);
    assert.equal(result.review.status, 'approved');
    assert.equal(result.review.rating, defaultReview.rating);
    assert.equal(result.review.title, defaultReview.title);
    assert.equal(result.review.reviewText, NEW_COMMENT);
    assert.equal(result.review.reviewedBy, null);
    assert.equal(result.review.reviewedAt, null);
    assert.notEqual(result.review.updated_date, VERSION);
    assert.equal(tables.dealer_reviews[0].order_id, defaultReview.order_id);
    assert.equal(tables.dealer_reviews[0].dealer_user_id, defaultReview.dealer_user_id);
    const mutation = calls.find((call) => call.action === 'update');
    assert.deepEqual(Object.keys(mutation.values).sort(), ['review_text', 'reviewed_at', 'reviewed_by', 'status', 'updated_at']);
    assert.deepEqual(mutation.filters, [
      ['eq', 'id', 'review-1'], ['eq', 'store_id', STORE_ID], ['eq', 'buyer_user_id', 'buyer-1'],
      ['eq', 'dealer_user_id', 'dealer-1'], ['eq', 'order_id', 'order-1'], ['eq', 'updated_at', VERSION],
    ]);
    assert.deepEqual(invalidated, [
      ['/de/dealer-profile/dealer-1'], ['/en/dealer-profile/dealer-1'], ['/cs/dealer-profile/dealer-1'],
      ['/[locale]/product/[slug]', 'page'],
    ]);
  }
});

test('a completed purchase publishes a review immediately without an administrator', async () => {
  const { actions, tables, calls, invalidated } = fixture({ reviews: [] });
  const result = await actions.submitDealerReview({
    dealerId: 'dealer-1', orderId: 'order-1', rating: 5,
    title: 'Excellent dealer', reviewText: 'The watch arrived as described and the purchase was smooth.',
  });
  assert.equal(result.ok, true);
  assert.equal(result.review.status, 'approved');
  assert.equal(tables.dealer_reviews[0].status, 'approved');
  assert.equal(tables.dealer_reviews[0].reviewed_by, null);
  assert.equal(tables.dealer_reviews[0].order_id, 'order-1');
  assert.equal(calls.find((call) => call.action === 'insert').values.store_id, STORE_ID);
  assert.equal(invalidated.length, 4);
});

test('a buyer cannot publish twice or submit against another tenant or buyer order', async () => {
  const duplicate = fixture();
  const duplicateResult = await duplicate.actions.submitDealerReview({
    dealerId: 'dealer-1', orderId: 'order-1', rating: 5, reviewText: NEW_COMMENT,
  });
  assert.equal(duplicateResult.ok, false);
  assert.ok(duplicate.calls.every((call) => call.action !== 'insert'));

  for (const mismatch of [{ store_id: 'other-store' }, { buyer_user_id: 'other-buyer' }, { dealer_user_id: 'other-dealer' }]) {
    const { actions, calls } = fixture({ reviews: [], orders: [{ ...defaultOrder, ...mismatch }] });
    const result = await actions.submitDealerReview({
      dealerId: 'dealer-1', orderId: 'order-1', rating: 5, reviewText: NEW_COMMENT,
    });
    assert.equal(result.ok, false);
    assert.ok(calls.every((call) => call.action !== 'insert'));
  }
});

test('legacy pending-review backfill is limited to matching completed Kariv purchases', () => {
  const migration = readFileSync(new URL('../supabase/migrations/20260926090000_publish_completed_kariv_dealer_reviews.sql', import.meta.url), 'utf8');
  for (const required of [
    "review.status = 'pending'", 'purchase.id = review.order_id',
    'purchase.store_id = review.store_id', 'purchase.buyer_user_id = review.buyer_user_id',
    'purchase.dealer_user_id = review.dealer_user_id', "purchase.purchase_status = 'completed'",
    "purchase.escrow_status = 'funds_released'", "review.store_id = '7efd71bc-0287-4f40-8a2f-1de330c49522'::uuid",
  ]) assert.ok(migration.includes(required), `Missing backfill guard: ${required}`);
  assert.doesNotMatch(migration, /alter table/i);
});

test('delivery or an unconfirmed purchase cannot publish a review', async () => {
  for (const status of ['delivered', 'shipped', 'cancelled']) {
    const { actions, calls } = fixture({ reviews: [], orders: [{
      ...defaultOrder, purchase_status: status, escrow_status: status === 'delivered' ? 'verified' : 'not_applicable',
    }] });
    const result = await actions.submitDealerReview({
      dealerId: 'dealer-1', orderId: 'order-1', rating: 5,
      reviewText: 'The watch arrived as described and the purchase was smooth.',
    });
    assert.equal(result.ok, false);
    assert.match(result.error, /completed order/);
    assert.ok(calls.every((call) => call.action !== 'insert'));
  }
});

test('comment reads and mutations are scoped to the logged-in owner and Kariv tenant', async () => {
  for (const settings of [{ userId: 'other-buyer' }, { reviews: [{ ...defaultReview, store_id: 'other-store' }] }, { reviews: [] }]) {
    const { actions, calls } = fixture(settings);
    const result = await actions.updateDealerReviewComment(updateInput());
    assert.equal(result.ok, false);
    assert.equal(result.error, 'Review not found.');
    assert.ok(calls.every((call) => call.action !== 'update'));
    assert.ok(calls.every((call) => call.table !== 'orders'));
    assert.deepEqual(calls[0].filters, [
      ['eq', 'id', 'review-1'], ['eq', 'store_id', STORE_ID], ['eq', 'buyer_user_id', settings.userId || 'buyer-1'],
    ]);
  }
});

test('comment updates recheck the exact completed order, dealer, tenant, and buyer association', async () => {
  for (const mismatch of [
    { id: 'other-order' }, { dealer_user_id: 'other-dealer' }, { store_id: 'other-store' },
    { buyer_user_id: 'other-buyer' }, { purchase_status: 'shipped', escrow_status: 'verified' },
  ]) {
    const { actions, calls } = fixture({ orders: [{ ...defaultOrder, ...mismatch }] });
    const result = await actions.updateDealerReviewComment(updateInput());
    assert.equal(result.ok, false);
    assert.match(result.error, /verified buyers with a completed order/);
    assert.ok(calls.every((call) => call.action !== 'update'));
    assert.deepEqual(calls.find((call) => call.table === 'orders').filters, [
      ['eq', 'id', 'order-1'], ['eq', 'store_id', STORE_ID], ['eq', 'buyer_user_id', 'buyer-1'], ['eq', 'dealer_user_id', 'dealer-1'],
    ]);
  }
});

test('a stale comment form cannot overwrite a newer review version', async () => {
  const { actions, calls } = fixture();
  const result = await actions.updateDealerReviewComment(updateInput({ expectedUpdatedAt: '2026-09-01T10:00:00.000Z' }));
  assert.equal(result.ok, false);
  assert.match(result.error, /changed/);
  assert.equal(calls.length, 1);
});

test('optimistic update fails safely if another change occurs between verification and writing', async () => {
  const { actions, calls, tables, invalidated } = fixture({ beforeUpdate(tables) {
    Object.assign(tables.dealer_reviews[0], { updated_at: '2026-09-21T11:00:00.000Z', review_text: 'A newer saved buyer comment.' });
  } });
  const result = await actions.updateDealerReviewComment(updateInput());
  assert.equal(result.ok, false);
  assert.match(result.error, /changed/);
  assert.equal(tables.dealer_reviews[0].review_text, 'A newer saved buyer comment.');
  assert.equal(tables.dealer_reviews[0].status, 'approved');
  assert.ok(calls.find((call) => call.action === 'update').filters.some((filter) => filter[1] === 'updated_at' && filter[2] === VERSION));
  assert.deepEqual(invalidated, []);
});

test('unchanged text does not reset approval or create another review', async () => {
  const { actions, calls, invalidated } = fixture();
  const result = await actions.updateDealerReviewComment(updateInput({ reviewText: defaultReview.review_text }));
  assert.equal(result.ok, true);
  assert.equal(result.review.status, 'approved');
  assert.equal(result.review.reviewedBy, 'admin-1');
  assert.ok(calls.every((call) => call.action !== 'update'));
  assert.deepEqual(invalidated, []);
});

test('invalid comment requests are rejected before any database lookup', async () => {
  for (const input of [
    { reviewId: '' }, { expectedUpdatedAt: '' }, { reviewText: ' short ' }, { reviewText: 'x'.repeat(2001) },
  ]) {
    const { actions, calls } = fixture();
    const result = await actions.updateDealerReviewComment(updateInput(input));
    assert.equal(result.ok, false);
    assert.equal(calls.length, 0);
  }
});

test('eligibility returns all and only the authenticated buyer’s completed purchases for this dealer', async () => {
  const eligibleOrders = [
    defaultOrder,
    { ...defaultOrder, id: 'order-2', created_at: '2026-09-19T10:00:00.000Z', purchase_status: 'completed' },
    { ...defaultOrder, id: 'order-3', created_at: '2026-09-17T10:00:00.000Z', purchase_status: null, escrow_status: 'funds_released' },
  ];
  const hiddenOrders = [
    { ...defaultOrder, id: 'foreign-store', store_id: 'other-store' },
    { ...defaultOrder, id: 'foreign-buyer', buyer_user_id: 'other-buyer' },
    { ...defaultOrder, id: 'foreign-dealer', dealer_user_id: 'other-dealer' },
    { ...defaultOrder, id: 'not-completed', purchase_status: 'shipped', escrow_status: 'verified' },
    { ...defaultOrder, id: 'delivered-not-completed', purchase_status: 'delivered', escrow_status: 'verified' },
  ];
  const rejectedReview = { ...defaultReview, id: 'review-3', order_id: 'order-3', status: 'rejected' };
  const { actions, calls } = fixture({ reviews: [defaultReview, rejectedReview], orders: [...eligibleOrders, ...hiddenOrders] });
  const result = await actions.getDealerReviewEligibility('dealer-1');
  assert.equal(result.ok, true);
  assert.deepEqual(result.reviewableOrders.map((order) => order.id), ['order-2', 'order-1', 'order-3']);
  assert.equal(result.eligibleOrder.id, 'order-2');
  assert.equal(result.submittedReview.id, 'review-1');
  assert.equal(result.reviewableOrders[1].review.status, 'approved');
  assert.equal(result.reviewableOrders[2].review.status, 'rejected');
  assert.deepEqual(result.reviewableOrders[0].purchasedWatches, [
    { title: 'Rolex Datejust', title_en: 'Rolex Datejust', title_de: 'Rolex Datejust Uhr', title_cs: 'Hodinky Rolex Datejust', image: '/watch-1.webp', quantity: 1 },
    { title: 'Omega Speedmaster', image: '/watch-2.webp', quantity: 2 },
  ]);
  const watches = JSON.stringify(result.reviewableOrders[0].purchasedWatches);
  for (const privateField of ['product_id', 'watch-1"', 'price', 'currency', 'shipping_address', 'payment_reference']) {
    assert.ok(!watches.includes(privateField));
  }
  assert.deepEqual(calls[0].filters, [
    ['eq', 'store_id', STORE_ID], ['eq', 'buyer_user_id', 'buyer-1'], ['eq', 'dealer_user_id', 'dealer-1'],
  ]);
  assert.deepEqual(calls[1].filters, [
    ['eq', 'store_id', STORE_ID], ['eq', 'buyer_user_id', 'buyer-1'], ['eq', 'dealer_user_id', 'dealer-1'],
    ['in', 'order_id', ['order-2', 'order-1', 'order-3']],
  ]);
});

test('legacy installations allow comments only on released escrow and keep all ownership filters', async () => {
  const released = { ...defaultOrder, purchase_status: undefined, escrow_status: 'funds_released' };
  const { actions, calls } = fixture({ missingPurchaseStatus: true, orders: [released] });
  assert.equal((await actions.updateDealerReviewComment(updateInput())).ok, true);
  const orderCalls = calls.filter((call) => call.table === 'orders');
  assert.equal(orderCalls.length, 2);
  assert.deepEqual(orderCalls[1].filters, [
    ['eq', 'id', 'order-1'], ['eq', 'store_id', STORE_ID], ['eq', 'buyer_user_id', 'buyer-1'],
    ['eq', 'dealer_user_id', 'dealer-1'], ['eq', 'escrow_status', 'funds_released'],
  ]);
  const eligibility = fixture({ missingPurchaseStatus: true, orders: [released, { ...released, id: 'pending-escrow', escrow_status: 'verified' }] });
  const result = await eligibility.actions.getDealerReviewEligibility('dealer-1');
  assert.deepEqual(result.reviewableOrders.map((order) => order.id), ['order-1']);
  assert.ok(eligibility.calls[1].filters.some((filter) => filter[1] === 'escrow_status' && filter[2] === 'funds_released'));
});

test('review service failures return a useful failure without mutating or reporting success', async () => {
  for (const settings of [
    { readError: { code: 'PGRST205', message: 'Missing table' } },
    { updateError: { message: 'Temporary service failure' } },
  ]) {
    const { actions, tables, invalidated } = fixture(settings);
    const result = await actions.updateDealerReviewComment(updateInput());
    assert.equal(result.ok, false);
    assert.ok(result.error);
    assert.equal(tables.dealer_reviews[0].review_text, defaultReview.review_text);
    assert.deepEqual(invalidated, []);
  }
});

test('admin moderation cannot publish a missing or stale comment version', async () => {
  for (const version of [undefined, '2026-09-01T10:00:00.000Z']) {
    const { actions, tables, calls, invalidated } = fixture({
      reviews: [{ ...defaultReview, status: 'pending', reviewed_by: null, reviewed_at: null }],
      adminId: 'admin-2',
    });
    const result = await actions.moderateDealerReview('review-1', 'approved', version);
    assert.equal(result.ok, false);
    assert.match(result.error, /[Rr]efresh/);
    assert.equal(tables.dealer_reviews[0].status, 'pending');
    assert.equal(tables.dealer_reviews[0].reviewed_by, null);
    assert.equal(tables.dealer_reviews[0].review_text, defaultReview.review_text);
    assert.deepEqual(invalidated, []);
    if (!version) assert.equal(calls.length, 0, 'missing review version must be rejected before writing');
    else {
      assert.deepEqual(calls[0].filters, [
        ['eq', 'id', 'review-1'], ['eq', 'store_id', STORE_ID],
      ]);
      assert.ok(calls.every((call) => call.action !== 'update'));
    }
  }
});

test('administrator cannot publish a legacy review for an incomplete purchase', async () => {
  const { actions, calls, invalidated } = fixture({
    reviews: [{ ...defaultReview, status: 'pending' }],
    orders: [{ ...defaultOrder, purchase_status: 'delivered', escrow_status: 'verified' }],
    adminId: 'admin-2',
  });
  const result = await actions.moderateDealerReview('review-1', 'approved', VERSION);
  assert.equal(result.ok, false);
  assert.match(result.error, /completed purchase/);
  assert.ok(calls.every((call) => call.action !== 'update'));
  assert.deepEqual(invalidated, []);
});

test('admin can approve the exact reviewed version and the dashboard passes the displayed version', async () => {
  const { actions, tables, calls, invalidated } = fixture({
    reviews: [{ ...defaultReview, status: 'pending', reviewed_by: null, reviewed_at: null }], adminId: 'admin-2',
  });
  const result = await actions.moderateDealerReview('review-1', 'approved', VERSION);
  assert.equal(result.ok, true);
  assert.equal(result.review.status, 'approved');
  assert.equal(result.review.reviewedBy, 'admin-2');
  assert.equal(result.review.reviewText, defaultReview.review_text);
  assert.equal(tables.dealer_reviews[0].rating, defaultReview.rating);
  assert.equal(tables.dealer_reviews[0].title, defaultReview.title);
  assert.deepEqual(calls[2].filters, [
    ['eq', 'id', 'review-1'], ['eq', 'store_id', STORE_ID], ['eq', 'updated_at', VERSION],
  ]);
  assert.equal(invalidated.length, 4);
  const dashboardSource = readFileSync(new URL('../src/page-content/admin/AdminDealerReviews.jsx', import.meta.url), 'utf8');
  assert.match(dashboardSource, /moderateDealerReview\(reviewId, nextStatus, updatedAt\)/);
  assert.match(dashboardSource, /review\.updated_date/);
});
