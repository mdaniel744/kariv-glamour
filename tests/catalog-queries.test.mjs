import test from 'node:test';
import assert from 'node:assert/strict';
import { createPublicReferenceLoader, loadFilteredCatalogRows } from '../src/lib/catalogQueries.js';
import { searchShopProducts } from '../src/lib/shopSearch.js';

// Run the actual data adapter against an in-memory HTTP endpoint. No live
// database credentials or requests are used by these tests.
const envNames = ['NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY', 'NEXT_PUBLIC_STORE_ID'];
const previousEnv = envNames.map((name) => process.env[name]);
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://catalog.test';
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'catalog-test-anon-key';
process.env.NEXT_PUBLIC_STORE_ID = 'kariv';
const { Products, Brands, Collections } = await import('../src/lib/supabaseData.js');
envNames.forEach((name, index) => {
  if (previousEnv[index] === undefined) delete process.env[name];
  else process.env[name] = previousEnv[index];
});

const fixtures = {
  brands: [
    { id: 'rolex', store_id: 'kariv', slug: 'rolex', name: 'Rolex' },
    { id: 'omega', store_id: 'kariv', slug: 'omega', name: 'Omega' },
    { id: 'other-rolex', store_id: 'other', slug: 'rolex', name: 'Rolex' },
  ],
  collections: [
    { id: 'daytona', store_id: 'kariv', brand_id: 'rolex', slug: 'daytona', name: 'Daytona' },
    { id: 'datejust', store_id: 'kariv', brand_id: 'rolex', slug: 'datejust', name: 'Datejust' },
    { id: 'speedmaster', store_id: 'kariv', brand_id: 'omega', slug: 'speedmaster', name: 'Speedmaster' },
  ],
  products: [
    { id: 'p1', store_id: 'kariv', name: 'Daytona', slug: 'daytona-steel', brand_id: 'rolex', collection_id: 'daytona', status: 'active', created_at: '2026-01-01', price: 100 },
    { id: 'p2', store_id: 'kariv', name: 'Speedmaster', slug: 'speedmaster', brand_id: 'omega', collection_id: 'speedmaster', status: 'active', created_at: '2026-01-02', price: 200 },
    { id: 'p3', store_id: 'kariv', name: 'Vintage Daytona', brand_id: 'rolex', attributes: { Collection: 'Daytona' }, status: 'active', created_at: '2026-01-03', price: 300 },
    { id: 'p4', store_id: 'kariv', name: 'Draft Daytona', brand_id: 'rolex', collection_id: 'daytona', status: 'draft', created_at: '2026-01-04' },
    { id: 'p5', store_id: 'other', name: 'Other store watch', brand_id: 'rolex', collection_id: 'daytona', status: 'active' },
    { id: 'p6', store_id: 'kariv', name: 'Datejust', brand_id: 'rolex', collection_id: 'datejust', attributes: { Collection: 'Daytona' }, status: 'active', created_at: '2026-01-06' },
  ],
  translations: [
    { entity_type: 'product', entity_id: 'p1', field_name: 'productTitle', locale: 'de', value: 'Daytona Deutsch' },
    { entity_type: 'product', entity_id: 'p2', field_name: 'productTitle', locale: 'de', value: 'Speedmaster Deutsch' },
    { entity_type: 'product', entity_id: 'p3', field_name: 'name', locale: 'de', value: 'Vintage Daytona Deutsch' },
    { entity_type: 'product', entity_id: 'p3', field_name: 'description', locale: 'de', value: 'Produktbeschreibung' },
    { entity_type: 'product', entity_id: 'p3', field_name: 'short_description', locale: 'de', value: 'Kurzbeschreibung' },
    { entity_type: 'brand', entity_id: 'rolex', field_name: 'name', locale: 'de', value: 'Rolex Deutsch' },
    { entity_type: 'brand', entity_id: 'rolex', field_name: 'disclaimer', locale: 'de', value: 'Markenhinweis' },
    { entity_type: 'collection', entity_id: 'daytona', field_name: 'name', locale: 'de', value: 'Daytona Kollektion' },
  ],
};
fixtures.translations = fixtures.translations.map((row) => ({ store_id: 'kariv', ...row }));

function splitExpressions(value) {
  const parts = [];
  let depth = 0;
  let start = 0;
  let quoted = false;
  for (let i = 0; i < value.length; i++) {
    if (value[i] === '"' && value[i - 1] !== '\\') quoted = !quoted;
    if (quoted) continue;
    if (value[i] === '(') depth++;
    if (value[i] === ')') depth--;
    if (value[i] === ',' && depth === 0) {
      parts.push(value.slice(start, i));
      start = i + 1;
    }
  }
  parts.push(value.slice(start));
  return parts;
}

function matches(row, field, expression) {
  const [column, attribute] = field.split('->>');
  const value = attribute ? row[column]?.[attribute] : row[column];
  const dot = expression.indexOf('.');
  const op = expression.slice(0, dot);
  const operand = expression.slice(dot + 1);
  if (op === 'eq') return value != null && String(value) === operand;
  if (op === 'neq') return value != null && String(value) !== operand;
  if (op === 'is') return operand === 'null' ? value == null : String(value) === operand;
  if (op === 'in') {
    const allowed = splitExpressions(operand.slice(1, -1)).map((item) => item.startsWith('"') ? JSON.parse(item) : item);
    return allowed.includes(String(value));
  }
  throw new Error(`Unexpected test filter: ${expression}`);
}

function useFixtureEndpoint(t, { rowLimit = 1000, omitCount = false, failProductOffset = null, emptyProductOffset = null, failTranslationOffset = null, emptyTranslationOffset = null, invalidate = true } = {}) {
  if (invalidate) Products.invalidate();
  const requests = [];
  t.mock.method(globalThis, 'fetch', async (input) => {
    const url = new URL(input);
    assert.equal(url.origin, 'https://catalog.test', 'tests must never access a live service');
    const table = url.pathname.split('/').at(-1);
    requests.push({ table, params: url.searchParams });
    let rows = [...fixtures[table]];
    for (const [field, expression] of url.searchParams) {
      if (['select', 'order', 'offset', 'limit'].includes(field)) continue;
      if (field === 'or') {
        rows = rows.filter((row) => splitExpressions(expression.slice(1, -1)).some((part) => {
          const dot = part.indexOf('.');
          return matches(row, part.slice(0, dot), part.slice(dot + 1));
        }));
      } else {
        rows = rows.filter((row) => matches(row, field, expression));
      }
    }
    const order = url.searchParams.get('order');
    if (order) rows.sort((a, b) => {
      for (const entry of order.split(',')) {
        const [field, direction] = entry.split('.');
        const comparison = String(a[field] || '').localeCompare(String(b[field] || ''));
        if (comparison) return direction === 'desc' ? -comparison : comparison;
      }
      return 0;
    });
    const total = rows.length;
    const offset = Number(url.searchParams.get('offset') || 0);
    if (table === 'products' && offset === failProductOffset) {
      return new Response(JSON.stringify({ message: 'Catalogue page failed' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
    if (table === 'translations' && offset === failTranslationOffset) {
      return new Response(JSON.stringify({ message: 'Translation page failed' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
    const limit = Math.min(Number(url.searchParams.get('limit') || rowLimit), rowLimit);
    rows = rows.slice(offset, offset + limit);
    if (table === 'products' && offset === emptyProductOffset) rows = [];
    if (table === 'translations' && offset === emptyTranslationOffset) rows = [];
    return new Response(JSON.stringify(rows), { headers: {
      'Content-Type': 'application/json', 'Content-Range': `${offset}-${offset + rows.length - 1}/${omitCount ? '*' : total}`,
    } });
  });
  return requests;
}

test('brand queries narrow products before translations and retain sorting/offset semantics', async (t) => {
  const requests = useFixtureEndpoint(t);
  const rows = await Products.filter({ brand: 'Rolex', isPublished: true }, '-created_date', 1, 1);
  assert.deepEqual(rows.map((row) => row.id), ['p3']);
  const products = requests.find((request) => request.table === 'products');
  assert.equal(products.params.get('brand_id'), 'in.(rolex)');
  assert.equal(products.params.get('status'), 'eq.active');
  const translations = requests.find((request) => request.table === 'translations');
  assert.equal(translations.params.get('entity_id'), 'in.(p1,p3,p6)');
  for (const request of requests) {
    assert.equal(request.params.get('store_id'), 'eq.kariv');
  }
});

test('product ID/slug reads request only that product and keep its translated fields', async (t) => {
  const requests = useFixtureEndpoint(t);
  const byId = await Products.get('p1');
  assert.equal(byId.productTitle_de, 'Daytona Deutsch');
  assert.equal(requests.find((request) => request.table === 'products').params.get('id'), 'eq.p1');
  assert.equal(requests.find((request) => request.table === 'translations').params.get('entity_id'), 'in.(p1)');
  const bySlug = await Products.filter({ slug: 'speedmaster' });
  assert.deepEqual(bySlug.map((row) => row.id), ['p2']);
  assert.equal(requests.findLast((request) => request.table === 'products').params.get('slug'), 'eq.speedmaster');
});

test('product translation failures reject rather than caching untranslated noindex candidates', async (t) => {
  t.mock.method(console, 'error', () => {});
  useFixtureEndpoint(t, { failTranslationOffset: 0 });
  await assert.rejects(Products.get('p1'), { message: 'Translation page failed' });
  await assert.rejects(Products.filter({ slug: 'daytona-steel' }), { message: 'Translation page failed' });
  await assert.rejects(Products.listPublished(), { message: 'Translation page failed' });
  t.mock.restoreAll();
  useFixtureEndpoint(t, { invalidate: false });
  assert.equal((await Products.listPublished()).find(({ id }) => id === 'p1').productTitle_de, 'Daytona Deutsch');
});

test('genuinely absent translations remain distinct from a failed translation read', async (t) => {
  useFixtureEndpoint(t);
  const product = await Products.get('p6');
  assert.equal(product.productTitle, 'Datejust');
  assert.equal(product.productTitle_cs, undefined);
  assert.equal(product.productDescription_cs, undefined);
});

test('translation pagination does not drop saved fields when a smaller server cap omits the count', async (t) => {
  useFixtureEndpoint(t, { rowLimit: 1, omitCount: true });
  const product = await Products.get('p3');
  assert.equal(product.productTitle_de, 'Vintage Daytona Deutsch');
  assert.equal(product.productDescription_de, 'Produktbeschreibung');
  assert.equal(product.shortDescription_de, 'Kurzbeschreibung');
});

test('incomplete translation responses cannot masquerade as missing product translations', async (t) => {
  t.mock.method(console, 'error', () => {});
  useFixtureEndpoint(t, { rowLimit: 1, emptyTranslationOffset: 1 });
  await assert.rejects(Products.get('p3'), /translation response was incomplete/);
});

test('collection queries include legacy attribute-only watches but reject conflicting collection IDs', async (t) => {
  const requests = useFixtureEndpoint(t);
  const rows = await Products.filter({ brand: ['Rolex', 'Omega'], collection: 'Daytona', isPublished: true }, 'price');
  assert.deepEqual(rows.map((row) => row.id), ['p1', 'p3']);
  const params = requests.find((request) => request.table === 'products').params;
  assert.equal(params.get('brand_id'), 'in.(rolex,omega)');
  assert.match(params.get('or'), /collection_id\.in/);
  assert.match(params.get('or'), /attributes->>Collection\.in/);
});

test('brand and collection detail lookups are scoped before loading translations', async (t) => {
  const requests = useFixtureEndpoint(t);
  const brands = await Brands.filter({ slug: 'rolex' });
  assert.deepEqual(brands.map((row) => row.id), ['rolex']);
  const collections = await Collections.filter({ brand: 'Omega' });
  assert.deepEqual(collections.map((row) => row.id), ['speedmaster']);
  assert.equal(requests.find((request) => request.table === 'brands').params.get('slug'), 'eq.rolex');
  assert.equal(requests.find((request) => request.table === 'collections').params.get('brand_id'), 'in.(omega)');
});

test('unknown or empty brand selections do not fetch the product catalog', async (t) => {
  const requests = useFixtureEndpoint(t);
  assert.deepEqual(await Products.filter({ brand: 'Missing Brand' }), []);
  assert.deepEqual(await Products.filter({ brand: [] }), []);
  assert.equal(requests.filter((request) => request.table === 'products').length, 0);
  assert.equal(requests.filter((request) => request.table === 'translations').length, 0);
});

test('missing configuration remains an empty catalog', async () => {
  assert.deepEqual(await loadFilteredCatalogRows(null, 'kariv', 'products', { brand: 'Rolex' }), []);
});

test('public reference cache deduplicates in-flight reads and retries errors', async () => {
  let calls = 0;
  const load = createPublicReferenceLoader(async () => {
    calls++;
    return { rolex: { name: 'Rolex' } };
  });
  const [first, second] = await Promise.all([load(), load()]);
  assert.equal(first, second);
  assert.equal(await load(), first);
  assert.equal(calls, 1);
  let failures = 0;
  const retry = createPublicReferenceLoader(async () => {
    if (failures++ === 0) throw new Error('Temporary failure');
    return {};
  });
  await assert.rejects(retry, /Temporary failure/);
  assert.deepEqual(await retry(), {});
  assert.equal(failures, 2);
});

test('warm list caches never replace scoped brand, ID or slug queries', async (t) => {
  const requests = useFixtureEndpoint(t);
  await Products.list();
  await Products.list();
  assert.equal(requests.filter((request) => request.table === 'products').length, 1);
  const rolex = await Products.filter({ brand: 'Rolex', isPublished: true });
  const omega = await Products.filter({ brand: 'Omega', isPublished: true });
  assert.deepEqual(rolex.map((row) => row.id), ['p1', 'p3', 'p6']);
  assert.deepEqual(omega.map((row) => row.id), ['p2']);
  await Products.get('p1');
  const slugResult = await Products.filter({ slug: 'speedmaster' });
  assert.deepEqual(slugResult.map((row) => row.id), ['p2']);
  const productRequests = requests.filter((request) => request.table === 'products');
  assert.equal(productRequests.length, 5);
  assert.equal(productRequests[1].params.get('brand_id'), 'in.(rolex)');
  assert.equal(productRequests[2].params.get('brand_id'), 'in.(omega)');
  assert.equal(productRequests[3].params.get('id'), 'eq.p1');
  assert.equal(productRequests[4].params.get('slug'), 'eq.speedmaster');
});

test('product invalidation refreshes the public list immediately', async (t) => {
  useFixtureEndpoint(t);
  const originalPrice = fixtures.products[0].price;
  t.after(() => { fixtures.products[0].price = originalPrice; Products.invalidate(); });
  assert.equal((await Products.list()).find((row) => row.id === 'p1').price, originalPrice);
  fixtures.products[0].price = 999;
  assert.equal((await Products.list()).find((row) => row.id === 'p1').price, originalPrice);
  Products.invalidate();
  assert.equal((await Products.list()).find((row) => row.id === 'p1').price, 999);
});

test('reference edits invalidate names embedded in other cached catalog lists', async (t) => {
  useFixtureEndpoint(t);
  const originalBrand = fixtures.brands[0].name;
  const originalCollection = fixtures.collections[0].name;
  t.after(() => {
    fixtures.brands[0].name = originalBrand;
    fixtures.collections[0].name = originalCollection;
    Products.invalidate();
  });
  await Promise.all([Products.list(), Collections.list(), Brands.list()]);
  fixtures.brands[0].name = 'Rolex Updated';
  Brands.invalidate();
  assert.equal((await Products.list()).find((row) => row.id === 'p1').brand, 'Rolex Updated');
  assert.equal((await Collections.list()).find((row) => row.id === 'daytona').brand, 'Rolex Updated');
  fixtures.collections[0].name = 'Daytona Updated';
  Collections.invalidate();
  assert.equal((await Products.list()).find((row) => row.id === 'p1').collection, 'Daytona Updated');
  const matches = await Products.filter({ brand: 'Rolex Updated', collection: 'Daytona Updated', isPublished: true });
  assert.deepEqual(matches.map((row) => row.id), ['p1']);
});

test('raw dashboard translation fields still map to the public UI fields', async (t) => {
  useFixtureEndpoint(t);
  const product = await Products.get('p3');
  assert.equal(product.productTitle_de, 'Vintage Daytona Deutsch');
  assert.equal(product.productDescription_de, 'Produktbeschreibung');
  assert.equal(product.shortDescription_de, 'Kurzbeschreibung');
  const brand = await Brands.get('rolex');
  assert.equal(brand.brandName_de, 'Rolex Deutsch');
  assert.equal(brand.brandDisclaimer_de, 'Markenhinweis');
  const collection = await Collections.get('daytona');
  assert.equal(collection.collectionName_de, 'Daytona Kollektion');
});

test('invalidating an in-flight read cannot repopulate or clear the newer cache', async () => {
  const resolves = [];
  const load = createPublicReferenceLoader(() => new Promise((resolve) => resolves.push(resolve)));
  const oldRead = load();
  await Promise.resolve();
  load.invalidate();
  const freshRead = load();
  await Promise.resolve();
  assert.equal(resolves.length, 2, 'invalidation starts a fresh read immediately');
  resolves[0]('old');
  assert.equal(await oldRead, 'old');
  const sharedFreshRead = load();
  await Promise.resolve();
  assert.equal(resolves.length, 2, 'old completion must not discard the fresh in-flight request');
  resolves[1]('fresh');
  assert.equal(await freshRead, 'fresh');
  assert.equal(await sharedFreshRead, 'fresh');
  assert.equal(await load(), 'fresh', 'old result must not return to the cache');
});

test('the latest dashboard title and rich description win over older aliases in either return order', async (t) => {
  const previous = fixtures.translations;
  t.after(() => { fixtures.translations = previous; Products.invalidate(); });
  fixtures.translations = ['en', 'de'].flatMap((locale) => [
    { store_id: 'kariv', entity_type: 'product', entity_id: 'p1', field_name: 'name', locale, value: `Current ${locale} title`, updated_at: '2026-09-10T10:00:00Z' },
    { store_id: 'kariv', entity_type: 'product', entity_id: 'p1', field_name: 'productTitle', locale, value: 'Old untranslated title', updated_at: '2026-09-09T10:00:00Z' },
    { store_id: 'kariv', entity_type: 'product', entity_id: 'p1', field_name: 'description', locale, value: `<p>Current ${locale} description</p>`, updated_at: '2026-09-10T10:00:00Z' },
    { store_id: 'kariv', entity_type: 'product', entity_id: 'p1', field_name: 'productDescription', locale, value: 'Old untranslated description', updated_at: '2026-09-09T10:00:00Z' },
  ]);
  useFixtureEndpoint(t);
  const product = await Products.get('p1');
  for (const locale of ['en', 'de']) {
    assert.equal(product[`productTitle_${locale}`], `Current ${locale} title`);
    assert.equal(product[`productDescription_${locale}`], `<p>Current ${locale} description</p>`);
  }
  fixtures.translations.reverse();
  assert.deepEqual(await Products.get('p1'), product);
});

test('bulk catalog reads include all translations beyond a single response row limit', async (t) => {
  const oldProducts = fixtures.products;
  const oldTranslations = fixtures.translations;
  t.after(() => { fixtures.products = oldProducts; fixtures.translations = oldTranslations; Products.invalidate(); });
  fixtures.products = Array.from({ length: 220 }, (_, index) => ({
    id: `bulk-${index}`, store_id: 'kariv', name: `Base ${index}`, status: 'active', brand_id: 'rolex',
  }));
  fixtures.translations = fixtures.products.flatMap(({ id }) => ['en', 'de'].flatMap((locale) =>
    ['name', 'description', 'short_description'].map((field_name) => ({
      store_id: 'kariv', entity_type: 'product', entity_id: id, field_name, locale, value: `${id} ${field_name} ${locale}`,
    }))
  ));
  // 1,320 translation rows overall; also test a server cap smaller than
  // one requested page so pagination uses the response's actual row count.
  const requests = useFixtureEndpoint(t, { rowLimit: 250 });
  const products = await Products.list();
  assert.equal(products.length, 220);
  for (const product of products) for (const locale of ['de', 'en']) {
    assert.equal(product[`productTitle_${locale}`], `${product.id} name ${locale}`);
    assert.equal(product[`productDescription_${locale}`], `${product.id} description ${locale}`);
    assert.equal(product[`shortDescription_${locale}`], `${product.id} short_description ${locale}`);
  }
  const reads = requests.filter((request) => request.table === 'translations');
  assert.ok(reads.some((read) => read.params.get('offset') === '250'));
  assert.ok(reads.every((read) => read.params.get('entity_id').split(',').length <= 50));
});

test('translation reads never merge values from another store', async (t) => {
  const previous = fixtures.translations;
  t.after(() => { fixtures.translations = previous; Products.invalidate(); });
  fixtures.translations = [...previous, {
    store_id: 'other', entity_type: 'product', entity_id: 'p1', field_name: 'name', locale: 'de', value: 'Wrong store', updated_at: '2099-01-01',
  }];
  const requests = useFixtureEndpoint(t);
  assert.equal((await Products.get('p1')).productTitle_de, 'Daytona Deutsch');
  assert.equal(requests.find((request) => request.table === 'translations').params.get('store_id'), 'eq.kariv');
});

test('shop totals and searches include every catalogue page beyond 1000 rows while retaining tenant and publication scope', async (t) => {
  const previous = fixtures.products;
  t.after(() => { fixtures.products = previous; Products.invalidate(); });
  fixtures.products = Array.from({ length: 1200 }, (_, index) => ({
    id: `watch-${String(index).padStart(4, '0')}`, store_id: 'kariv',
    name: `Watch ${index}`, brand_id: 'omega', status: 'active', reference_number: `REF-${index}`,
  }));
  fixtures.products.push(
    { id: 'watch-draft', store_id: 'kariv', name: 'Draft', status: 'draft' },
    { id: 'other-tenant', store_id: 'other', name: 'Another store watch', status: 'active' },
  );
  const requests = useFixtureEndpoint(t, { rowLimit: 200 });
  const results = await searchShopProducts(Products, {});
  assert.equal(results.totalCount, 1200);
  assert.equal(results.totalPages, 50);
  assert.equal((await searchShopProducts(Products, { search: 'Omega REF-1199' })).items[0].id, 'watch-1199');
  const reads = requests.filter(({ table }) => table === 'products');
  assert.deepEqual(reads.map(({ params }) => Number(params.get('offset'))), [0, 200, 400, 600, 800, 1000]);
  for (const { params } of reads) {
    assert.equal(params.get('store_id'), 'eq.kariv');
    assert.equal(params.get('status'), 'eq.active');
    assert.equal(params.get('order'), 'id.asc');
  }
  assert.equal((await Products.list()).length, 1201, 'compatibility API retains non-public rows if an existing caller is allowed to read them');
});

test('catalogue pagination stops correctly at an exact response-page boundary', async (t) => {
  const previous = fixtures.products;
  t.after(() => { fixtures.products = previous; Products.invalidate(); });
  fixtures.products = Array.from({ length: 1000 }, (_, index) => ({
    id: `watch-${String(index).padStart(4, '0')}`, store_id: 'kariv', name: `Watch ${index}`, status: 'active',
  }));
  const requests = useFixtureEndpoint(t);
  assert.equal((await Products.list()).length, 1000);
  assert.deepEqual(requests.filter(({ table }) => table === 'products').map(({ params }) => Number(params.get('offset'))), [0, 500]);
});

test('published shop reads share the public cache and refresh after catalogue invalidation', async (t) => {
  const requests = useFixtureEndpoint(t);
  const originalPrice = fixtures.products[0].price;
  t.after(() => { fixtures.products[0].price = originalPrice; Products.invalidate(); });
  const [first, second] = await Promise.all([Products.listPublished(), Products.listPublished()]);
  assert.equal(first, second);
  assert.ok(first.every((row) => row.isPublished));
  fixtures.products[0].price = 567;
  assert.equal((await Products.listPublished()).find(({ id }) => id === 'p1').price, originalPrice);
  assert.equal(requests.filter(({ table }) => table === 'products').length, 1);
  Products.invalidate();
  assert.equal((await Products.listPublished()).find(({ id }) => id === 'p1').price, 567);
  assert.equal(requests.filter(({ table }) => table === 'products').length, 2);
});

test('catalogue pagination handles a lower server cap even when a count is unavailable', async (t) => {
  const requests = useFixtureEndpoint(t, { rowLimit: 2, omitCount: true });
  assert.equal((await Products.list()).length, 5);
  assert.deepEqual(requests.filter(({ table }) => table === 'products').map(({ params }) => Number(params.get('offset'))), [0, 2, 4, 5]);
});

test('failed or incomplete catalogue pages reject the count rather than returning partial results', async (t) => {
  useFixtureEndpoint(t, { rowLimit: 2, failProductOffset: 2 });
  await assert.rejects(searchShopProducts(Products, {}), { message: 'Catalogue page failed' });
  t.mock.restoreAll();
  useFixtureEndpoint(t, { rowLimit: 2, emptyProductOffset: 2 });
  await assert.rejects(searchShopProducts(Products, {}), /catalogue response was incomplete/);
});
