// Repeatable data-transfer benchmark, not a live-page speed measurement.
// Run: node tests/catalog-query-benchmark.mjs [baseline-commit]
// Both adapters visit the same four brand pages against 300 synthetic watches.
// No network requests, local environment files, or real credentials are used.
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
// Pin the pre-optimization version so future commits do not change the baseline.
const baselineCommit = process.argv[2] || 'd44b131b89cafb6e2f5ce29d7c4504a83bbb7439';
const baselineSource = execFileSync('git', ['show', `${baselineCommit}:src/lib/supabaseData.js`], { cwd: root, encoding: 'utf8' });
const baselineModule = baselineSource.replace(
  "'@supabase/supabase-js'",
  JSON.stringify(import.meta.resolve('@supabase/supabase-js')),
);
const envNames = ['NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY', 'NEXT_PUBLIC_STORE_ID'];
const previousEnv = envNames.map((name) => process.env[name]);
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://benchmark.test';
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'benchmark-test-anon-key';
process.env.NEXT_PUBLIC_STORE_ID = 'benchmark-store';

const rows = { brands: [], collections: [], products: [], translations: [] };
function translate(type, id, field, value) {
  for (const locale of ['en', 'de']) rows.translations.push({ store_id: 'benchmark-store', entity_type: type, entity_id: id, field_name: field, locale, value: `${value} ${locale}` });
}
for (let brandIndex = 0; brandIndex < 15; brandIndex++) {
  const brand = { id: `brand-${brandIndex}`, slug: `brand-${brandIndex}`, name: `Brand ${brandIndex}`, store_id: 'benchmark-store', long_description: 'Brand editorial. '.repeat(100) };
  rows.brands.push(brand);
  translate('brand', brand.id, 'brandName', brand.name);
  for (let collectionIndex = 0; collectionIndex < 10; collectionIndex++) {
    const collection = { id: `${brand.id}-collection-${collectionIndex}`, slug: `collection-${collectionIndex}`, brand_id: brand.id, name: `Collection ${collectionIndex}`, store_id: 'benchmark-store', description: 'Collection editorial. '.repeat(50) };
    rows.collections.push(collection);
    translate('collection', collection.id, 'collectionName', collection.name);
    for (let productIndex = 0; productIndex < 2; productIndex++) {
      const product = {
        id: `${collection.id}-watch-${productIndex}`, slug: `${collection.id}-watch-${productIndex}`,
        brand_id: brand.id, collection_id: collection.id, name: `${brand.name} ${collection.name} ${productIndex}`,
        store_id: 'benchmark-store', status: 'active', price: 2000 + brandIndex * 100 + collectionIndex,
        created_at: `2026-08-${String(collectionIndex + 1).padStart(2, '0')}T00:00:00Z`,
        attributes: { Gender: 'Unisex', 'Case Material': 'Steel', 'Dial Color': 'Black' },
        description: 'Detailed watch condition and specifications. '.repeat(50),
        images: [0, 1, 2, 3].map((imageIndex) => `https://media.example.test/${collection.id}-${productIndex}-${imageIndex}.webp`),
      };
      rows.products.push(product);
      translate('product', product.id, 'productTitle', product.name);
    }
  }
}

function matches(row, field, expression) {
  if (expression.startsWith('eq.')) return String(row[field]) === expression.slice(3);
  if (expression.startsWith('in.(')) return expression.slice(4, -1).split(',').includes(String(row[field]));
  throw new Error(`Unexpected benchmark condition: ${field} ${expression}`);
}

async function measure(moduleUrl) {
  const metrics = { requests: 0, productRows: 0, translationRows: 0, responseBytes: 0 };
  globalThis.fetch = async (input) => {
    const url = new URL(input);
    assert.equal(url.origin, 'https://benchmark.test', 'live network requests are forbidden');
    const table = url.pathname.split('/').at(-1);
    let result = rows[table].filter((row) => [...url.searchParams].every(([field, expression]) => ['select', 'order', 'offset', 'limit'].includes(field) || matches(row, field, expression)));
    const offset = Number(url.searchParams.get('offset') || 0);
    const limit = Number(url.searchParams.get('limit') || result.length);
    result = result.slice(offset, offset + limit);
    const projection = url.searchParams.get('select');
    if (projection !== '*') result = result.map((row) => Object.fromEntries(projection.split(',').map((field) => [field.trim(), row[field.trim()]])));
    const body = JSON.stringify(result);
    metrics.requests++;
    metrics.productRows += table === 'products' ? result.length : 0;
    metrics.translationRows += table === 'translations' ? result.length : 0;
    metrics.responseBytes += Buffer.byteLength(body);
    return new Response(body, { headers: { 'Content-Type': 'application/json' } });
  };
  const { Products, Brands, Collections } = await import(moduleUrl);
  const snapshots = [];
  const visits = [];
  for (const brandIndex of [0, 1, 2, 0]) {
    const before = { ...metrics };
    const [brand] = await Brands.filter({ slug: `brand-${brandIndex}` }, '-created_date', 1);
    const [products, collections] = await Promise.all([
      Products.filter({ brand: brand.brandName, isPublished: true }, '-created_date'),
      Collections.filter({ brand: brand.brandName }, 'collectionName'),
    ]);
    snapshots.push({ brand, products, collections });
    visits.push({ brand: brand.brandName, ...Object.fromEntries(Object.entries(metrics).map(([key, value]) => [key, value - before[key]])) });
  }
  return { metrics, visits, snapshots };
}

const previousFetch = globalThis.fetch;
try {
  const baseline = await measure(`data:text/javascript;base64,${Buffer.from(baselineModule).toString('base64')}`);
  const optimized = await measure(new URL('../src/lib/supabaseData.js?benchmark', import.meta.url).href);
  assert.deepEqual(optimized.snapshots, baseline.snapshots, 'all displayed catalog results must remain identical');
  console.log(JSON.stringify({
    basis: 'Local fixtures only: 300 watches, 15 brands, four identical brand visits; no network latency or Next/browser timings measured.',
    baselineCommit,
    baseline: baseline.metrics,
    optimized: optimized.metrics,
    reductionPercent: Object.fromEntries(Object.entries(baseline.metrics).map(([key, value]) => [key, Number(((1 - optimized.metrics[key] / value) * 100).toFixed(1))])),
    optimizedVisits: optimized.visits,
    sameResults: true,
  }, null, 2));
} finally {
  globalThis.fetch = previousFetch;
  envNames.forEach((name, index) => {
    if (previousEnv[index] === undefined) delete process.env[name];
    else process.env[name] = previousEnv[index];
  });
}
