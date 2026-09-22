import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { compileFunction } from 'node:vm';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as jsxRuntime from 'react/jsx-runtime';
import ts from 'typescript';

const STORE_ID = '7efd71bc-0287-4f40-8a2f-1de330c49522';

function compile(path, imports) {
  const source = readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
    fileName: path,
  });
  const module = { exports: {} };
  compileFunction(outputText, ['require', 'module', 'exports'])((specifier) => {
    assert.ok(specifier in imports, `Unexpected dependency in ${path}: ${specifier}`);
    return imports[specifier];
  }, module, module.exports);
  return module.exports;
}

test('public dealer reviews exclude private buyer, order, and moderation identifiers', () => {
  const { mapPublicDealerReviewRow } = compile('src/lib/dealerReviewsData.js', {
    'server-only': {},
    '@/lib/supabaseAdmin': { supabaseAdmin: null },
    '@/lib/supabaseData': { STORE_ID },
    '@/lib/orderShaping': { formatEscrowReference: (id) => id },
  });
  const publicReview = mapPublicDealerReviewRow({
    id: 'review-1',
    dealer_user_id: 'private-dealer-id',
    buyer_user_id: 'private-buyer-id',
    buyer_name: 'Verified Buyer',
    order_id: 'private-order-id',
    reviewed_by: 'private-moderator-id',
    rating: 5,
    title: 'Excellent',
    review_text: 'A public review.',
    status: 'approved',
    created_at: '2026-09-20T00:00:00.000Z',
    updated_at: '2026-09-21T00:00:00.000Z',
  });

  assert.deepEqual(publicReview, {
    id: 'review-1',
    buyerName: 'Verified Buyer',
    rating: 5,
    title: 'Excellent',
    reviewText: 'A public review.',
    isVerifiedPurchase: true,
    created_date: '2026-09-20T00:00:00.000Z',
    purchasedWatches: [],
  });
});

function serverFixture({ applicationStatus = 'approved', reviewError = null, reviewHeadResult = undefined, reviewRows = null, onSelect = null } = {}) {
  const tables = {
    dealer_applications: [{
      dealer_user_id: 'dealer-1', store_id: STORE_ID, company_name: 'Prague Watch House',
      country: 'Czech Republic', status: applicationStatus, created_at: '2026-09-20T00:00:00.000Z',
    }],
    products: [
      { id: 'p1', store_id: STORE_ID, dealer_id: 'dealer-1', status: 'active', stock_quantity: 1 },
      { id: 'p2', store_id: STORE_ID, dealer_id: 'dealer-1', status: 'active', stock_quantity: 2 },
      { id: 'p3', store_id: STORE_ID, dealer_id: 'dealer-1', status: 'active', stock_quantity: 0 },
    ],
    orders: [
      { id: 'o1', store_id: STORE_ID, dealer_user_id: 'dealer-1', buyer_user_id: 'buyer-1', purchase_status: 'completed', escrow_status: 'not_applicable', products: [{ product_id: 'p1', title: 'Rolex Datejust', title_de: 'Rolex Datejust Uhr', image: '/watch.webp', quantity: 1, price: 7500, currency: 'EUR' }] },
      { id: 'o2', store_id: STORE_ID, dealer_user_id: 'dealer-1', purchase_status: 'pending', escrow_status: 'funds_released' },
      { id: 'o3', store_id: STORE_ID, dealer_user_id: 'dealer-1', purchase_status: 'delivered', escrow_status: 'awaiting_payment' },
      { id: 'o4', store_id: STORE_ID, dealer_user_id: 'dealer-1', purchase_status: 'pending', escrow_status: 'awaiting_payment' },
    ],
    dealer_reviews: reviewRows || [
      { id: 'r1', store_id: STORE_ID, dealer_user_id: 'dealer-1', buyer_user_id: 'buyer-1', status: 'approved', rating: 5, title: 'Excellent', review_text: 'Excellent service.', buyer_name: 'Buyer One', order_id: 'o1', created_at: '2026-09-20T00:00:00.000Z' },
      { id: 'r2', store_id: STORE_ID, dealer_user_id: 'dealer-1', status: 'approved', rating: 4, title: 'Very good', review_text: 'Very good service.', buyer_name: 'Buyer Two', order_id: 'o2', created_at: '2026-09-19T00:00:00.000Z' },
      { id: 'r3', store_id: STORE_ID, dealer_user_id: 'dealer-1', status: 'approved', rating: 5, title: 'Recommended', review_text: 'I recommend them.', buyer_name: 'Buyer Three', order_id: 'o3', created_at: '2026-09-18T00:00:00.000Z' },
      { id: 'r4', store_id: STORE_ID, dealer_user_id: 'dealer-1', status: 'pending', rating: 1, title: 'Hidden', review_text: 'Not approved yet.', buyer_name: 'Buyer Four', order_id: 'o4', created_at: '2026-09-21T00:00:00.000Z' },
    ],
  };

  function from(table) {
    const filters = [];
    const inFilters = [];
    const greaterThan = [];
    let orFilter = '';
    let orderBy = null;
    let limitValue = null;
    let rangeValue = null;
    let countMode = false;
    let head = false;

    function execute() {
      if (table === 'dealer_reviews' && head && reviewHeadResult !== undefined) {
        return Promise.resolve(reviewHeadResult);
      }
      if (table === 'dealer_reviews' && reviewError) {
        return Promise.resolve({ data: null, count: null, error: reviewError });
      }
      let rows = [...(tables[table] || [])];
      rows = rows.filter((row) => filters.every(([key, value]) => row[key] === value));
      rows = rows.filter((row) => inFilters.every(([key, values]) => values.includes(row[key])));
      rows = rows.filter((row) => greaterThan.every(([key, value]) => Number(row[key]) > Number(value)));
      if (orFilter) {
        rows = rows.filter((row) => ['completed', 'delivered'].includes(row.purchase_status) || row.escrow_status === 'funds_released');
      }
      if (orderBy) {
        const direction = orderBy.ascending ? 1 : -1;
        rows.sort((left, right) => String(left[orderBy.key] || '').localeCompare(String(right[orderBy.key] || '')) * direction);
      }
      const count = countMode ? rows.length : null;
      if (rangeValue) rows = rows.slice(rangeValue[0], rangeValue[1] + 1);
      if (limitValue != null) rows = rows.slice(0, limitValue);
      return Promise.resolve({ data: head ? null : structuredClone(rows), count, error: null });
    }

    const query = {
      select(_columns, options = {}) {
        onSelect?.({ table, columns: _columns, options });
        countMode = options.count === 'exact';
        head = options.head === true;
        return query;
      },
      eq(key, value) { filters.push([key, value]); return query; },
      in(key, values) { inFilters.push([key, values]); return query; },
      gt(key, value) { greaterThan.push([key, value]); return query; },
      or(value) { orFilter = value; return query; },
      order(key, options = {}) { orderBy = { key, ascending: options.ascending !== false }; return query; },
      limit(value) { limitValue = value; return query; },
      range(from, to) { rangeValue = [from, to]; return query; },
      async maybeSingle() { const result = await execute(); return { data: result.data?.[0] || null, error: result.error }; },
      then(resolve, reject) { return execute().then(resolve, reject); },
    };
    return query;
  }

  const dealerReviewsData = compile('src/lib/dealerReviewsData.js', {
    'server-only': {},
    '@/lib/supabaseAdmin': { supabaseAdmin: { from } },
    '@/lib/supabaseData': { STORE_ID },
    '@/lib/orderShaping': { formatEscrowReference: (id) => id },
  });
  return compile('src/lib/productDealerPreviewServer.js', {
    'server-only': {},
    react: { cache: (fn) => fn },
    '@/lib/supabaseAdmin': { isSupabaseAdminConfigured: true, supabaseAdmin: { from } },
    '@/lib/supabaseData': { STORE_ID },
    '@/lib/orderIdentities': { loadIdentities: async () => new Map([['dealer-1', { fullName: 'Dealer User', imageUrl: '/dealer.webp' }]]) },
    '@/lib/dealerReviewsData': dealerReviewsData,
  });
}

test('approved dealer preview exposes exact sales/listings and approved review distribution', async () => {
  const { getProductDealerPreviewData } = serverFixture();
  const result = await getProductDealerPreviewData('dealer-1');
  assert.equal(result.approved, true);
  assert.equal(result.displayName, 'Prague Watch House');
  assert.equal(result.country, 'Czech Republic');
  assert.equal(result.activeListingsAvailable, true);
  assert.equal(result.activeListings, 2);
  assert.equal(result.completedSalesAvailable, true);
  assert.equal(result.completedSales, 3);
  assert.equal(result.ratingsAvailable, true);
  assert.equal(result.totalReviews, 3);
  assert.equal(result.averageRating, 4.7);
  assert.deepEqual(result.distribution, [
    { star: 1, count: 0 }, { star: 2, count: 0 }, { star: 3, count: 0 },
    { star: 4, count: 1 }, { star: 5, count: 2 },
  ]);
  assert.deepEqual(result.recentReviews.map((review) => review.id), ['r1', 'r2', 'r3']);
  assert.deepEqual(result.recentReviews[0].purchasedWatches, [{
    title: 'Rolex Datejust', title_de: 'Rolex Datejust Uhr', image: '/watch.webp', quantity: 1,
  }]);
});

test('dealer rating totals remain exact beyond a normal result page without transferring every review', async () => {
  const selected = [];
  const reviewRows = Array.from({ length: 1507 }, (_value, index) => ({
    id: `review-${String(index).padStart(4, '0')}`,
    store_id: STORE_ID,
    dealer_user_id: 'dealer-1',
    status: 'approved',
    rating: (index % 5) + 1,
    title: 'Verified purchase',
    review_text: 'A public review.',
    buyer_name: 'Verified Buyer',
    buyer_user_id: `private-buyer-${index}`,
    order_id: `private-order-${index}`,
    reviewed_by: 'private-moderator',
    created_at: `2026-09-${String((index % 28) + 1).padStart(2, '0')}T00:00:00.000Z`,
  }));
  const { getProductDealerPreviewData } = serverFixture({
    reviewRows,
    onSelect: (selection) => selected.push(selection),
  });

  const result = await getProductDealerPreviewData('dealer-1');
  assert.equal(result.totalReviews, 1507);
  assert.equal(result.averageRating, 3);
  assert.deepEqual(result.distribution, [
    { star: 1, count: 302 }, { star: 2, count: 302 }, { star: 3, count: 301 },
    { star: 4, count: 301 }, { star: 5, count: 301 },
  ]);
  assert.equal(result.recentReviews.length, 3);
  assert.equal(result.recentReviews[0].buyerId, undefined);
  assert.equal(result.recentReviews[0].orderId, undefined);
  assert.equal(result.recentReviews[0].reviewedBy, undefined);

  const reviewSelections = selected.filter((selection) => selection.table === 'dealer_reviews');
  const countSelections = reviewSelections.filter((selection) => selection.options?.head === true);
  assert.equal(countSelections.length, 5);
  assert.ok(countSelections.every((selection) => selection.columns === 'id'));
  assert.ok(reviewSelections.some((selection) => (
    selection.columns === 'id,buyer_name,rating,title,review_text,created_at,order_id,buyer_user_id,dealer_user_id'
  )));
});

test('unapproved dealer never receives a public product-page profile preview', async () => {
  const { getProductDealerPreviewData } = serverFixture({ applicationStatus: 'pending' });
  assert.equal(await getProductDealerPreviewData('dealer-1'), null);
});

test('missing review migration is distinct from a dealer with zero reviews', async () => {
  const { getProductDealerPreviewData } = serverFixture({ reviewError: { code: 'PGRST205', message: 'table not found' } });
  const result = await getProductDealerPreviewData('dealer-1');
  assert.equal(result.approved, true);
  assert.equal(result.ratingsAvailable, false);
  assert.equal(result.reviewsConfigured, false);
  assert.equal(result.totalReviews, null);
  assert.equal(result.activeListings, 2);
});

test('missing review table reported by GET overrides successful or empty HEAD responses', async () => {
  for (const count of [null, 0]) {
    const { getProductDealerPreviewData } = serverFixture({
      reviewError: { code: 'PGRST205', message: 'table not found' },
      reviewHeadResult: { data: null, count, error: null, status: count === null ? 204 : 200 },
    });
    const result = await getProductDealerPreviewData('dealer-1');
    assert.equal(result.approved, true);
    assert.equal(result.displayName, 'Prague Watch House');
    assert.equal(result.ratingsAvailable, false);
    assert.equal(result.reviewsConfigured, false);
    assert.equal(result.recentReviewsAvailable, false);
    assert.equal(result.totalReviews, null);
    assert.deepEqual(result.distribution, []);
    assert.deepEqual(result.recentReviews, []);
    assert.equal(result.activeListings, 2);
    assert.equal(result.completedSales, 3);
  }
});

test('absent or malformed exact review counts never masquerade as genuine zero ratings', async () => {
  for (const count of [null, undefined, NaN, -1]) {
    const { getProductDealerPreviewData } = serverFixture({
      reviewHeadResult: { data: null, count, error: null, status: 204 },
    });
    const result = await getProductDealerPreviewData('dealer-1');
    assert.equal(result.ratingsAvailable, false);
    assert.equal(result.totalReviews, null);
    assert.deepEqual(result.distribution, []);
    assert.equal(result.reviewsConfigured, true);
    assert.equal(result.recentReviewsAvailable, true);
    assert.equal(result.recentReviews.length, 3);
  }
});

test('explicit zero counts and an empty successful review query remain a genuine zero-review dealer', async () => {
  const { getProductDealerPreviewData } = serverFixture({ reviewRows: [] });
  const result = await getProductDealerPreviewData('dealer-1');
  assert.equal(result.approved, true);
  assert.equal(result.ratingsAvailable, true);
  assert.equal(result.reviewsConfigured, true);
  assert.equal(result.recentReviewsAvailable, true);
  assert.equal(result.averageRating, 0);
  assert.equal(result.totalReviews, 0);
  assert.deepEqual(result.distribution, [1, 2, 3, 4, 5].map((star) => ({ star, count: 0 })));
  assert.deepEqual(result.recentReviews, []);
});

function t(key, values = {}) {
  const labels = {
    'pages.productDetail.dealerPreview.verifiedDealer': 'Verified dealer',
    'pages.productDetail.dealerPreview.viewProfile': 'View dealer profile',
    'pages.productDetail.dealerPreview.watchesSold': 'Watches sold',
    'pages.productDetail.dealerPreview.activeListings': 'Active listings',
    'pages.productDetail.dealerPreview.ratingCount': `${values.count} customer reviews`,
    'pages.productDetail.dealerPreview.customerReviews': 'Customer Reviews',
    'pages.productDetail.dealerPreview.reviewIntro': 'Verified buyer reviews',
    'pages.productDetail.dealerPreview.ratingBreakdownLabel': `${values.stars} stars: ${values.percentage}, ${values.count} reviews`,
    'pages.productDetail.dealerPreview.ratingsUnavailable': 'Ratings unavailable',
    'components.dealerReviews.ratingOutOfFive': `${values.rating} out of 5 stars`,
  };
  return labels[key] || key;
}

test('rendered preview shows dealer identity, deciding metrics, distribution and recent reviews', () => {
  const icon = () => null;
  const Preview = compile('src/components/product/DealerCustomerReviewsPreview.jsx', {
    react: React,
    'react/jsx-runtime': jsxRuntime,
    'lucide-react': Object.fromEntries(['BadgeCheck', 'MapPin', 'PackageCheck', 'ShoppingBag', 'Star'].map((name) => [name, icon])),
    'react-i18next': { useTranslation: () => ({ t }) },
    '@/components/LocalizedLink': ({ to, children, ...props }) => React.createElement('a', { href: to, ...props }, children),
    '@/components/dealer/StarRating': ({ rating }) => React.createElement('span', { 'data-stars': rating }, `${rating} stars`),
    '@/components/dealer/DealerReviewCard': ({ review }) => React.createElement('article', null, review.title),
    '@/components/dealer/DealerReviewComposer': () => null,
    '@/components/shared/MediaImage': ({ src }) => React.createElement('img', { src, alt: '' }),
    '@/lib/media': { getMediaVariant: (src) => src },
  }).default;
  const dealer = {
    approved: true, dealerId: 'dealer-1', displayName: 'Prague Watch House', country: 'Czech Republic', logoImage: '/dealer.webp',
    activeListingsAvailable: true, activeListings: 12, completedSalesAvailable: true, completedSales: 27,
    ratingsAvailable: true, reviewsConfigured: true, recentReviewsAvailable: true, averageRating: 4.7, totalReviews: 3,
    distribution: [{ star: 1, count: 0 }, { star: 2, count: 0 }, { star: 3, count: 0 }, { star: 4, count: 1 }, { star: 5, count: 2 }],
    recentReviews: [{ id: 'r1', title: 'Excellent seller' }],
  };
  const html = renderToStaticMarkup(React.createElement(Preview, { dealer }));
  assert.match(html, /Prague Watch House/);
  assert.match(html, /Czech Republic/);
  assert.match(html, />27</);
  assert.match(html, />12</);
  assert.match(html, /4\.7/);
  assert.match(html, /3 customer reviews/);
  assert.match(html, /67%/);
  assert.match(html, /5 stars: 67%, 2 reviews/);
  assert.equal((html.match(/role="img"/g) || []).length, 5);
  for (let star = 5; star > 1; star -= 1) {
    assert.ok(
      html.indexOf(`${star} stars:`) < html.indexOf(`${star - 1} stars:`),
      `expected ${star}-star bar before ${star - 1}-star bar`,
    );
  }
  assert.match(html, /Excellent seller/);
  assert.match(html, /dealer-profile\/dealer-1/);

  const unavailableHtml = renderToStaticMarkup(React.createElement(Preview, {
    dealer: { ...dealer, ratingsAvailable: false, totalReviews: null, distribution: [] },
  }));
  assert.equal((unavailableHtml.match(/role="img"/g) || []).length, 5);
  assert.match(unavailableHtml, /5 out of 5 stars: Ratings unavailable/);
  assert.doesNotMatch(unavailableHtml, />0%<|0 customer reviews/);
  for (let star = 5; star > 1; star -= 1) {
    assert.ok(unavailableHtml.indexOf(`${star} out of 5 stars:`) < unavailableHtml.indexOf(`${star - 1} out of 5 stars:`));
  }

  const zeroHtml = renderToStaticMarkup(React.createElement(Preview, {
    dealer: { ...dealer, totalReviews: 0, averageRating: 0, distribution: [1, 2, 3, 4, 5].map((star) => ({ star, count: 0 })), recentReviews: [] },
  }));
  assert.equal((zeroHtml.match(/role="img"/g) || []).length, 5);
  assert.match(zeroHtml, /5 stars: 0%, 0 reviews/);
});

test('compact sold-by card shows zero reviews and a distinct unavailable state', () => {
  const icon = () => null;
  const Card = compile('src/components/product/ProductDealerCard.jsx', {
    react: React,
    'react/jsx-runtime': jsxRuntime,
    'lucide-react': { ChevronRight: icon, Store: icon },
    '@/components/LocalizedLink': ({ to, children, ...props }) => React.createElement('a', { href: to, ...props }, children),
    '@/components/dealer/StarRating': ({ rating }) => React.createElement('span', { 'data-stars': rating }),
    '@/components/shared/MediaImage': () => null,
    '@/lib/media': { getMediaVariant: (src) => src },
    '@/lib/languageContext': { useLanguage: () => ({ locale: 'en' }) },
  }).default;
  const product = { dealerId: 'dealer-1' };
  const zeroHtml = renderToStaticMarkup(React.createElement(Card, {
    product,
    initialProfile: { displayName: 'New Dealer', ratingsAvailable: true, averageRating: 0, totalReviews: 0 },
  }));
  assert.match(zeroHtml, /0\.0 \(0 reviews\)/);

  const unavailableHtml = renderToStaticMarkup(React.createElement(Card, {
    product,
    initialProfile: { displayName: 'New Dealer', ratingsAvailable: false },
  }));
  assert.match(unavailableHtml, /Ratings unavailable/);
  assert.doesNotMatch(unavailableHtml, /0\.0 \(0 reviews\)/);
});

test('dealer customer reviews render after related products and the trust banner', () => {
  const source = readFileSync(new URL('../src/page-content/ProductDetail.jsx', import.meta.url), 'utf8');
  assert.ok(source.indexOf('relatedSlot') < source.indexOf('<TrustBar />'));
  assert.ok(source.indexOf('<TrustBar />') < source.lastIndexOf('dealerReviewSlot'));
});
