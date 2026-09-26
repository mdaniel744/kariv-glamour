import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { compileFunction } from 'node:vm';
import React from 'react';
import * as jsxRuntime from 'react/jsx-runtime';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';
import {
  buildDealerRatingSummaries,
  normalizePublicDealerIds,
} from '../src/lib/dealerRatingSummaries.js';

const localeFiles = Object.fromEntries(
  ['en', 'de', 'cs'].map((locale) => [
    locale,
    JSON.parse(readFileSync(new URL(`../src/locales/${locale}/common.json`, import.meta.url), 'utf8')),
  ]),
);

function loadSource(path, imports) {
  const { outputText } = ts.transpileModule(
    readFileSync(new URL(`../${path}`, import.meta.url), 'utf8'),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
      },
      fileName: path,
    },
  );
  const module = { exports: {} };
  compileFunction(outputText, ['require', 'module', 'exports'])((specifier) => {
    assert.ok(specifier in imports, `Unexpected dependency: ${specifier}`);
    return imports[specifier];
  }, module, module.exports);
  return module.exports;
}

function translate(locale, key, values = {}) {
  const value = key.split('.').reduce((current, segment) => current?.[segment], localeFiles[locale]);
  if (typeof value !== 'string') return key;
  return value.replace(/{{\s*([^}\s]+)\s*}}/g, (_match, name) => String(values[name] ?? ''));
}

function resolvedQuery(result, calls) {
  const query = {
    select(...args) { calls.push(['select', ...args]); return query; },
    eq(...args) { calls.push(['eq', ...args]); return query; },
    in(...args) { calls.push(['in', ...args]); return query; },
    or(...args) { calls.push(['or', ...args]); return query; },
    limit(...args) { calls.push(['limit', ...args]); return query; },
    order(...args) { calls.push(['order', ...args]); return query; },
    range(...args) { calls.push(['range', ...args]); return query; },
    then(resolve, reject) { return Promise.resolve(result).then(resolve, reject); },
  };
  return query;
}

async function loadDealerReviewActions({ supabaseAdmin, loadIdentities = async () => new Map() }) {
  const helper = await import('../src/lib/dealerRatingSummaries.js');
  return loadSource('src/actions/dealerReviews.js', {
    'next/cache': { revalidatePath() {} },
    '@/lib/supabaseAdmin': { supabaseAdmin },
    '@/lib/serverAuth': { requireAdmin: async () => ({}), requireUser: async () => ({ id: 'buyer-1' }) },
    '@/lib/supabaseData': { STORE_ID: 'kariv-store' },
    '@/lib/orderShaping': { formatEscrowReference: (id) => id },
    '@/lib/orderIdentities': { loadIdentities },
    '@/lib/dealerReviewsData': { mapDealerReviewRow: (row) => row },
    '@/lib/dealerRatingSummaries': helper,
  });
}

async function renderDealerRating(props, locale = 'en') {
  const Star = ({ className }) => React.createElement('i', {
    'data-star': true,
    'data-filled': className.includes('fill-amber-400') ? 'true' : 'false',
  });
  const imports = {
    react: React,
    'react/jsx-runtime': jsxRuntime,
    'lucide-react': { Star, Store: () => React.createElement('i', { 'data-store': true }) },
    'react-i18next': {
      useTranslation: () => ({
        t: (key, values) => translate(locale, key, values),
        i18n: { resolvedLanguage: locale, language: locale },
      }),
    },
    '@/components/LocalizedLink': ({ to, children, ...linkProps }) => (
      React.createElement('a', { href: `/${locale}${to}`, ...linkProps }, children)
    ),
    '@/actions/dealerReviews': { getDealerRatingSummaries: async () => ({}) },
    '@/lib/dealerRatingSummaries': await import('../src/lib/dealerRatingSummaries.js'),
  };
  const Component = loadSource('src/components/product/ProductDealerRating.jsx', imports).default;
  return renderToStaticMarkup(React.createElement(Component, props));
}

test('dealer summary aggregation exposes only dealers whose latest application is approved', () => {
  const summaries = buildDealerRatingSummaries({
    dealerIds: ['dealer-1', 'dealer-2', 'dealer-1'],
    reviewRows: [
      { dealer_user_id: 'dealer-1', rating: 5, status: 'approved' },
      { dealer_user_id: 'dealer-1', rating: 4, status: 'approved' },
      { dealer_user_id: 'dealer-1', rating: 1, status: 'pending' },
      { dealer_user_id: 'foreign-dealer', rating: 5, status: 'approved' },
    ],
    applicationRows: [
      { dealer_user_id: 'dealer-1', company_name: 'Old Name', status: 'approved', created_at: '2025-01-01' },
      { dealer_user_id: 'dealer-1', company_name: 'Prague Watch House', status: 'approved', created_at: '2026-01-01' },
      { dealer_user_id: 'dealer-2', company_name: 'Pending Name', status: 'pending', created_at: '2026-01-01' },
    ],
    identitiesById: new Map([
      ['dealer-1', { fullName: 'Fallback One' }],
      ['dealer-2', { fullName: 'Fallback Two' }],
    ]),
  });

  assert.deepEqual(summaries['dealer-1'], {
    displayName: 'Prague Watch House',
    verifiedStatus: 'verified',
    averageRating: 4.5,
    totalReviews: 2,
    ratingsAvailable: true,
  });
  assert.equal(summaries['dealer-2'], undefined);
  assert.equal(summaries['foreign-dealer'], undefined);
});

test('public dealer ID input is deduplicated, validated, and capped', () => {
  const ids = Array.from({ length: 60 }, (_value, index) => `dealer-${index}`);
  assert.equal(normalizePublicDealerIds([...ids, 'dealer-1', '', 'x'.repeat(161)]).length, 50);
  assert.equal(normalizePublicDealerIds('dealer-1').length, 0);
});

test('batch action treats a PGRST205 review-table response as unavailable, not zero reviews', async () => {
  const reviewCalls = [];
  const applicationCalls = [];
  const supabaseAdmin = {
    from(table) {
      if (table === 'dealer_reviews') {
        return resolvedQuery({ data: null, error: { code: 'PGRST205', message: 'Missing table' } }, reviewCalls);
      }
      if (table === 'dealer_applications') {
        return resolvedQuery({
          data: [{
            dealer_user_id: 'dealer-1',
            company_name: 'Prague Watch House',
            status: 'approved',
            created_at: '2026-01-01',
          }],
          error: null,
        }, applicationCalls);
      }
      throw new Error(`Unexpected table: ${table}`);
    },
  };
  const actions = await loadDealerReviewActions({
    supabaseAdmin,
    loadIdentities: async () => new Map([['dealer-1', { fullName: 'Fallback Dealer' }]]),
  });

  const summaries = await actions.getDealerRatingSummaries(['dealer-1']);
  assert.deepEqual(summaries['dealer-1'], {
    displayName: 'Prague Watch House',
    verifiedStatus: 'verified',
    averageRating: 0,
    totalReviews: 0,
    ratingsAvailable: false,
  });
  assert.ok(reviewCalls.some((call) => call[0] === 'eq' && call[1] === 'store_id' && call[2] === 'kariv-store'));
  assert.ok(applicationCalls.some((call) => call[0] === 'in' && call[1] === 'dealer_user_id'));
});

test('batch summaries page through every approved review and never load an unapproved identity', async () => {
  const ratingRows = Array.from({ length: 1005 }, (_value, index) => ({
    id: `review-${String(index).padStart(4, '0')}`,
    store_id: 'kariv-store',
    dealer_user_id: 'dealer-1',
    rating: index % 2 ? 4 : 5,
    status: 'approved',
  }));
  const ranges = [];
  const identityRequests = [];
  const supabaseAdmin = {
    from(table) {
      const filters = [];
      let selectedOptions = {};
      let range = null;
      const query = {
        select(_columns, options = {}) { selectedOptions = options; return query; },
        eq(key, value) { filters.push([key, value]); return query; },
        in(key, values) { filters.push([key, values]); return query; },
        order() { return query; },
        range(from, to) { range = [from, to]; ranges.push(range); return query; },
        then(resolve, reject) {
          if (table === 'dealer_applications') {
            return Promise.resolve({
              data: [
                { dealer_user_id: 'dealer-1', company_name: 'Approved House', status: 'approved', created_at: '2026-09-01' },
                { dealer_user_id: 'dealer-2', company_name: 'Pending House', status: 'pending', created_at: '2026-09-01' },
              ],
              error: null,
            }).then(resolve, reject);
          }
          let rows = ratingRows.filter((row) => filters.every(([key, value]) => (
            Array.isArray(value) ? value.includes(row[key]) : row[key] === value
          )));
          const count = selectedOptions.count === 'exact' ? rows.length : null;
          if (range) rows = rows.slice(range[0], range[1] + 1);
          return Promise.resolve({ data: rows, count, error: null }).then(resolve, reject);
        },
      };
      return query;
    },
  };
  const actions = await loadDealerReviewActions({
    supabaseAdmin,
    loadIdentities: async (ids) => {
      identityRequests.push(ids);
      return new Map([['dealer-1', { fullName: 'Approved User' }]]);
    },
  });

  const summaries = await actions.getDealerRatingSummaries(['dealer-1', 'dealer-2']);
  assert.equal(summaries['dealer-1'].totalReviews, 1005);
  assert.equal(summaries['dealer-2'], undefined);
  assert.deepEqual(identityRequests, [['dealer-1']]);
  assert.deepEqual(ranges, [[0, 999], [1000, 1999]]);
});

test('review eligibility accepts completed purchases or released escrow, never merely verified escrow', async () => {
  const orderCalls = [];
  const supabaseAdmin = {
    from(table) {
      assert.equal(table, 'orders');
      return resolvedQuery({ data: [], error: null }, orderCalls);
    },
  };
  const actions = await loadDealerReviewActions({ supabaseAdmin });
  const result = await actions.getDealerReviewEligibility('dealer-1');
  assert.equal(result.ok, true);
  const eligibilityFilter = orderCalls.find((call) => call[0] === 'or')?.[1] || '';
  assert.match(eligibilityFilter, /purchase_status\.eq\.completed/);
  assert.match(eligibilityFilter, /escrow_status\.eq\.funds_released/);
  assert.doesNotMatch(eligibilityFilter, /delivered/);
  assert.doesNotMatch(eligibilityFilter, /verified/);
});

test('dealer-profile review invalidation includes every storefront locale', () => {
  const source = readFileSync(new URL('../src/actions/dealerReviews.js', import.meta.url), 'utf8');
  for (const locale of ['en', 'de', 'cs']) {
    const expected = 'revalidatePath(`/' + locale + '/dealer-profile/${dealerId}`)';
    assert.ok(source.includes(expected), `missing ${locale} dealer-profile invalidation`);
  }
});

test('catalogue rating cache is time-bounded and unavailable responses are not persisted', () => {
  const source = readFileSync(new URL('../src/components/product/ProductDealerRating.jsx', import.meta.url), 'utf8');
  assert.match(source, /SUMMARY_CACHE_TTL_MS/);
  assert.match(source, /expiresAt <= Date\.now\(\)/);
  assert.match(source, /summary\.ratingsAvailable !== false/);
});

test('dealer product card metadata shows seller, stars, count, and seller profile link', async () => {
  const html = await renderDealerRating({
    dealerId: 'dealer-1',
    initialSummary: {
      displayName: 'Prague Watch House',
      averageRating: 4.5,
      totalReviews: 12,
      ratingsAvailable: true,
    },
  });

  assert.match(html, /Sold by Prague Watch House/);
  assert.match(html, /4\.5 · 12 reviews/);
  assert.match(html, /href="\/en\/dealer-profile\/dealer-1"/);
  assert.equal((html.match(/data-star="true"/g) || []).length, 5);
  assert.equal((html.match(/data-filled="true"/g) || []).length, 5);
  assert.match(html, /pointer-events-auto/);
});

test('new dealer remains visibly rated at zero while Kariv-owned cards show no dealer metadata', async () => {
  const newDealer = await renderDealerRating({
    dealerId: 'dealer-new',
    initialSummary: { displayName: 'New Dealer', averageRating: 0, totalReviews: 0, ratingsAvailable: true },
  });
  assert.match(newDealer, /0\.0 · 0 reviews/);
  assert.equal((newDealer.match(/data-filled="true"/g) || []).length, 0);

  const karivOwned = await renderDealerRating({ dealerId: null });
  assert.equal(karivOwned, '');
});

test('missing review service is not presented as a zero-review rating', async () => {
  const html = await renderDealerRating({
    dealerId: 'dealer-unavailable',
    initialSummary: {
      displayName: 'Dealer With Unavailable Reviews',
      averageRating: 0,
      totalReviews: 0,
      ratingsAvailable: false,
    },
  });

  assert.match(html, /Reviews unavailable/);
  assert.doesNotMatch(html, /0\.0 · 0 reviews/);
  assert.equal((html.match(/data-star="true"/g) || []).length, 5);
});

test('catalogue product cards keep dealer identity and reviews on the product page', () => {
  const card = readFileSync(new URL('../src/components/shared/ProductCard.jsx', import.meta.url), 'utf8');
  const shop = readFileSync(new URL('../src/page-content/Shop.jsx', import.meta.url), 'utf8');
  const brand = readFileSync(new URL('../src/page-content/BrandDetail.jsx', import.meta.url), 'utf8');

  assert.doesNotMatch(card, /ProductDealerRating/);
  assert.doesNotMatch(card, /dealerId=\{product\.dealerId\}/);
  assert.match(shop, /<ProductCard/);
  assert.match(brand, /<ProductCard/);
});

test('all storefront languages define dealer card labels', () => {
  for (const locale of ['en', 'de', 'cs']) {
    const labels = localeFiles[locale].components?.productCard;
    for (const key of ['soldBy', 'verifiedDealer', 'viewDealer', 'ratingAndReviews', 'loadingReviews', 'reviewsUnavailable']) {
      assert.equal(typeof labels?.[key], 'string', `${locale} productCard.${key} must exist`);
      assert.ok(labels[key].trim(), `${locale} productCard.${key} must not be empty`);
    }
  }
});
