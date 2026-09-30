import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createInstance } from 'i18next';
import { positivePage, searchShopProducts, selectShopResults } from '../src/lib/shopSearch.js';

const products = Array.from({ length: 1205 }, (_, index) => ({
  id: `watch-${String(index).padStart(4, '0')}`,
  isPublished: true,
  productTitle: `Watch ${index}`,
  brand: index < 1000 ? 'Rolex' : 'Omega',
  collection: index < 1000 ? 'Datejust' : 'Speedmaster',
  referenceNumber: `REF-${index}`,
  gender: index % 2 ? 'Women' : 'Men',
  price: index + 1000,
  created_date: new Date(Date.UTC(2026, 0, 1, 0, index)).toISOString(),
}));

test('shop source is not truncated to a display limit and totals cover the complete catalogue', async () => {
  const calls = [];
  const entity = { listPublished: async (...args) => { calls.push(args); return products; } };
  const results = await searchShopProducts(entity, { page: 1, pageSize: 24 });
  assert.deepEqual(calls, [[]], 'no 500-item cap or display-page limit may be passed to the catalogue');
  assert.equal(results.totalCount, 1205);
  assert.equal(results.totalPages, 51);
  assert.equal(results.items.length, 24);
  assert.equal(results.hasMore, true);
});

test('search can find a product beyond both the old 500 cap and one 1000-row response', () => {
  const result = selectShopResults(products, { search: 'Omega REF-1204' });
  assert.equal(result.totalCount, 1);
  assert.deepEqual(result.items.map(({ id }) => id), ['watch-1204']);
  assert.equal(selectShopResults(products, { search: 'REF-1204 Rolex' }).totalCount, 0);
});

test('all display pages expose each matching product exactly once with stable ordering', () => {
  const first = selectShopResults(products, { sort: 'price_low' });
  const ids = [];
  for (let page = 1; page <= first.totalPages; page++) {
    const result = selectShopResults(products, { page, sort: 'price_low' });
    assert.equal(result.totalCount, products.length);
    assert.equal(result.hasMore, page < first.totalPages);
    ids.push(...result.items.map(({ id }) => id));
  }
  assert.deepEqual(ids, products.map(({ id }) => id));
});

test('filters use the same complete catalogue and exclude unpublished entries', () => {
  const input = [...products, { ...products[1204], id: 'draft', isPublished: false }];
  const result = selectShopResults(input, { brands: ['Omega'], genders: ['Women'] });
  assert.equal(result.totalCount, 102);
  assert.ok(result.items.every((product) => product.brand === 'Omega' && product.gender === 'Women'));
  assert.equal(selectShopResults(input, {}).totalCount, 1205);
});

test('model sibling exclusions and multiple selected families are preserved', () => {
  const input = ['Royal Oak', 'Royal Oak Offshore', 'Code 11.59'].map((collection, index) => ({
    id: String(index), isPublished: true, brand: 'Audemars Piguet', collection,
  }));
  assert.equal(selectShopResults(input, { models: ['Royal Oak'] }).totalCount, 1);
  assert.equal(selectShopResults(input, { models: ['Royal Oak', 'Code 11.59'] }).totalCount, 2);
});

test('price and alphabetical sort follow displayed sale price and selected-language title', () => {
  const input = [
    { id: 'a', isPublished: true, price: 3000, salePrice: 1000, productTitle: 'Zulu', productTitle_de: 'Anfang' },
    { id: 'b', isPublished: true, price: 2000, productTitle: 'Alpha', productTitle_de: 'Ziel' },
  ];
  assert.deepEqual(selectShopResults(input, { sort: 'price_low' }).items.map(({ id }) => id), ['a', 'b']);
  assert.deepEqual(selectShopResults(input, { sort: 'name_asc', locale: 'en' }).items.map(({ id }) => id), ['b', 'a']);
  assert.deepEqual(selectShopResults(input, { sort: 'name_asc', locale: 'de' }).items.map(({ id }) => id), ['a', 'b']);
});

test('localized searches match across title, brand, reference and rich-text fields', () => {
  const input = [{
    id: 'a', isPublished: true, brand: 'Omega', referenceNumber: '123.45',
    productTitle_en: 'Blue dial', productTitle_de: 'Blaues Zifferblatt',
    productDescription_de: '<p>Gehäuse aus <strong>Stahl</strong></p>',
  }];
  assert.equal(selectShopResults(input, { search: 'Stahl omega 123.45' }).totalCount, 1);
  assert.equal(selectShopResults(input, { search: 'blue omega' }).totalCount, 1);
  assert.equal(selectShopResults(input, { search: 'Omega red' }).totalCount, 0);
  assert.equal(selectShopResults(input, { search: 'strong' }).totalCount, 0);
});

test('brand searches exclude other makers that mention the brand in descriptions', () => {
  const input = [
    { id: 'omega', isPublished: true, brand: 'Omega', productTitle: 'Speedmaster', productDescription: 'An alternative to the Rolex Submariner', created_date: '2026-09-03' },
    { id: 'rolex-datejust', isPublished: true, brand: 'Rolex', productTitle: 'Rolex Datejust', productDescription: 'A subtle dial', created_date: '2026-09-02' },
    { id: 'rolex-sub', isPublished: true, brand: 'Rolex', productTitle: 'Submariner Date 126610LN', created_date: '2026-01-01' },
    { id: 'legacy-rolex', isPublished: true, brand: '', productTitle: 'Rolex Submariner 16610', created_date: '2025-01-01' },
  ];
  const results = selectShopResults(input, { search: 'rolex sub' });
  assert.deepEqual(results.items.map(({ id }) => id), ['legacy-rolex', 'rolex-sub']);
  assert.equal(results.totalCount, 2);
});

test('title matches rank above description mentions unless a shopper chooses a different sort', () => {
  const input = [
    { id: 'mention', isPublished: true, brand: 'Rolex', productTitle: 'Rolex Datejust', productDescription: 'Similar to a Rolex Submariner', created_date: '2026-09-02' },
    { id: 'actual', isPublished: true, brand: 'Rolex', productTitle: 'Submariner Date', created_date: '2026-01-01' },
  ];
  assert.deepEqual(selectShopResults(input, { search: 'rolex submariner' }).items.map(({ id }) => id), ['actual', 'mention']);
  assert.deepEqual(selectShopResults(input, { search: 'rolex submariner', sort: 'newest' }).items.map(({ id }) => id), ['mention', 'actual']);
  assert.equal(selectShopResults(input, { search: 'similar rolex' }).totalCount, 1, 'descriptions remain searchable');
});

test('invalid pages normalize and a stale bookmarked page resolves to a valid results page', () => {
  for (const value of [null, '', 'abc', -1, 0, Infinity]) assert.equal(positivePage(value), 1);
  assert.equal(positivePage('2.5'), 2);
  const result = selectShopResults(products, { page: 999, search: 'REF-1204' });
  assert.equal(result.page, 1);
  assert.equal(result.items.length, 1);
  assert.equal(selectShopResults(products, { search: 'no matching watch', page: 999 }).page, 1);
});

test('a catalogue read failure is not reported as a successful partial or zero count', async () => {
  await assert.rejects(searchShopProducts({ listPublished: async () => { throw new Error('Fetch failed'); } }, {}), /Fetch failed/);
});

test('English and German search headings interpolate the real query, including punctuation', async () => {
  for (const locale of ['en', 'de']) {
    const common = JSON.parse(readFileSync(new URL(`../src/locales/${locale}/common.json`, import.meta.url), 'utf8'));
    const instance = createInstance();
    await instance.init({ lng: locale, resources: { [locale]: { common } }, defaultNS: 'common', interpolation: { escapeValue: false } });
    const query = 'A. Lange & Söhne 1815';
    const heading = instance.t('shop.searchResults', { query });
    assert.ok(heading.includes(query));
    assert.ok(!heading.includes('{query}'));
    assert.equal(instance.t('shop.showResults', { count: 1205 }).includes('1205'), true);
  }
});

test('shop clears filter paging, corrects clamped pages and keeps counts hidden while loading', () => {
  const source = readFileSync(new URL('../src/page-content/Shop.jsx', import.meta.url), 'utf8');
  assert.match(source, /handleFiltersChange = \(newFilters\) => \{[\s\S]*?setPage\(1\)[\s\S]*?syncURL\(newFilters, 1, nextSort\)/);
  assert.match(source, /handleClearFilters = \(\) => \{[\s\S]*?setPage\(1\)[\s\S]*?syncURL\(\{ \.\.\.DEFAULT_FILTERS \}, 1, 'newest'\)/);
  assert.match(source, /if \(results\.page !== page\)[\s\S]*?syncURL\(filters, results\.page, sortBy\)/);
  assert.match(source, /loading \? '…' : error \? t\('common:error'\)/);
  assert.doesNotMatch(source, /LOCAL_SEARCH_LIMIT|functions\.invoke\('searchProducts'/);
});
