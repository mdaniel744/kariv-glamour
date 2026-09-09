import test from 'node:test';
import assert from 'node:assert/strict';
import { createPublicReferenceLoader, loadFilteredCatalogRows } from '../src/lib/catalogQueries.js';

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

function useFixtureEndpoint(t) {
  Products.invalidate();
  const requests = [];
  t.mock.method(globalThis, 'fetch', async (input) => {
    const url = new URL(input);
    assert.equal(url.origin, 'https://catalog.test', 'tests must never access a live service');
    const table = url.pathname.split('/').at(-1);
    requests.push({ table, params: url.searchParams });
    let rows = [...fixtures[table]];
    for (const [field, expression] of url.searchParams) {
      if (field === 'select') continue;
      if (field === 'or') {
        rows = rows.filter((row) => splitExpressions(expression.slice(1, -1)).some((part) => {
          const dot = part.indexOf('.');
          return matches(row, part.slice(0, dot), part.slice(dot + 1));
        }));
      } else {
        rows = rows.filter((row) => matches(row, field, expression));
      }
    }
    return new Response(JSON.stringify(rows), { headers: { 'Content-Type': 'application/json' } });
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
  for (const request of requests.filter((request) => request.table !== 'translations')) {
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
