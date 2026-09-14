import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { compileFunction } from 'node:vm';
import ts from 'typescript';
import * as slugHelpers from '../src/lib/slug.js';

const source = readFileSync(new URL('../src/lib/base44Server.js', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  fileName: 'base44Server.js',
});

function createFixture(initialProducts = [], { filter, get, mode = 'production', maxCacheBytes = Infinity } = {}) {
  let products = initialProducts;
  let now = 0;
  const stored = new Map();
  const filterCalls = [];
  const getCalls = [];
  const errors = [];
  const defaultFilter = (query, sort, limit, offset = 0) => {
    const rows = products.filter((product) => Object.entries(query).every(([field, value]) => product[field] === value));
    if (sort) {
      const descending = sort.startsWith('-');
      const field = descending ? sort.slice(1) : sort;
      rows.sort((a, b) => String(a[field] || '').localeCompare(String(b[field] || '')) * (descending ? -1 : 1));
    }
    return limit ? rows.slice(offset, offset + limit) : rows.slice(offset);
  };
  const imports = {
    'server-only': {},
    // Treat every helper call as a separate request so React's request-local
    // memoization cannot conceal accidental persistent caching of checkout.
    react: { cache: (callback) => callback },
    'next/cache': {
      unstable_cache: (callback, keyParts, { revalidate }) => async (...args) => {
        const key = JSON.stringify([keyParts, args]);
        const cached = stored.get(key);
        if (cached && cached.expiresAt > now) return cached.value;
        // Model Next's persistent cache boundary: retain successful values,
        // including null, but never retain a rejected database read.
        const value = await callback(...args);
        if (JSON.stringify(value).length > maxCacheBytes) throw new Error('Cache entry is too large');
        stored.set(key, { value, expiresAt: now + revalidate * 1000 });
        return value;
      },
    },
    '@/lib/slug': slugHelpers,
    '@/lib/supabaseData': {
      STORE_ID: 'test-store',
      Products: {
        filter: async (...args) => {
          filterCalls.push(args);
          return filter ? filter(...args, defaultFilter) : defaultFilter(...args);
        },
        get: async (id) => {
          getCalls.push(id);
          return get ? get(id) : products.find((product) => product.id === id) || null;
        },
      },
      Brands: { filter: async () => [{ slug: 'rolex', brandName: 'Rolex' }] },
      Collections: { filter: async () => [] },
      LegalPages: {},
    },
    '@/lib/legalPageFallbacks': {},
    '@/lib/supabaseAdmin': {},
    '@/lib/orderIdentities': {},
    '@/lib/dealerReviewsData': {},
  };
  const module = { exports: {} };
  compileFunction(outputText, ['require', 'module', 'exports', 'console', 'process'])((specifier) => {
    assert.ok(specifier in imports, `Unexpected dependency: ${specifier}`);
    return imports[specifier];
  }, module, module.exports, { error: (...args) => errors.push(args) }, { env: { NODE_ENV: mode } });
  return {
    ...module.exports,
    filterCalls, getCalls, errors,
    setProducts: (rows) => { products = rows; },
    advance: (milliseconds) => { now += milliseconds; },
  };
}

const watch = {
  id: 'watch-1', slug: 'rolex-datejust', brand: 'Rolex', isPublished: true,
  productTitle: 'Rolex Datejust', productTitle_de: 'Rolex Datejust Uhr',
  productTitle_en: 'Rolex Datejust Watch', productDescription_de: 'Deutsche Beschreibung',
  productDescription_en: 'English description', price: 9000, created_date: '2026-01-01',
};

test('development brand previews bypass the persistent cache size limit without losing products', async () => {
  const largeWatch = { ...watch, productDescription_en: 'A'.repeat(3 * 1024 * 1024) };
  const fixture = createFixture([largeWatch], { mode: 'development', maxCacheBytes: 2 * 1024 * 1024 });
  assert.deepEqual((await fixture.getBrandPageData('rolex', 'Rolex')).products, [largeWatch]);
  fixture.setProducts([{ ...largeWatch, price: 9500 }]);
  assert.equal((await fixture.getBrandPageData('rolex', 'Rolex')).products[0].price, 9500);
  assert.deepEqual(fixture.errors, []);
});

test('repeated public product visits reuse a short cache without losing translated fields', async () => {
  const fixture = createFixture([watch]);
  assert.deepEqual(await fixture.getProductBySlug(watch.slug), watch);
  fixture.setProducts([{ ...watch, price: 9500 }]);
  assert.deepEqual(await fixture.getProductBySlug(watch.slug), watch);
  assert.equal(fixture.filterCalls.length, 1);
  fixture.advance(61_000);
  assert.equal((await fixture.getProductBySlug(watch.slug)).price, 9500);
  assert.equal(fixture.filterCalls.length, 2);
});

test('a failed exact product read is retried on the next visit instead of caching a missing page', async () => {
  let fail = true;
  const fixture = createFixture([watch], {
    filter: (...args) => {
      if (fail) { fail = false; throw new Error('temporary database failure'); }
      return args.at(-1)(...args.slice(0, -1));
    },
  });
  assert.equal(await fixture.getProductBySlug(watch.slug), null);
  assert.deepEqual(await fixture.getProductBySlug(watch.slug), watch);
  assert.equal(fixture.filterCalls.length, 2);
});

test('legacy title-derived product slugs still resolve and blank requests skip the database', async () => {
  const legacyWatch = { ...watch, slug: '', productTitle: 'Rolex Datejust 36' };
  const fixture = createFixture([legacyWatch]);
  assert.equal(await fixture.getProductBySlug(''), null);
  assert.equal(fixture.filterCalls.length, 0);
  assert.deepEqual(await fixture.getProductBySlug('rolex-datejust-36'), legacyWatch);
  assert.deepEqual(fixture.filterCalls.map(([query]) => query), [
    { slug: 'rolex-datejust-36' }, { isPublished: true },
  ]);
});

test('a failed legacy-slug fallback cannot poison the public product cache', async () => {
  const legacyWatch = { ...watch, slug: '', productTitle: 'Rolex Datejust 36' };
  let failFallback = true;
  const fixture = createFixture([legacyWatch], {
    filter: (...args) => {
      if (args[0].isPublished && failFallback) {
        failFallback = false;
        throw new Error('temporary fallback database failure');
      }
      return args.at(-1)(...args.slice(0, -1));
    },
  });
  assert.equal(await fixture.getProductBySlug('rolex-datejust-36'), null);
  assert.deepEqual(await fixture.getProductBySlug('rolex-datejust-36'), legacyWatch);
  assert.equal(fixture.filterCalls.length, 4);
});

test('related products reuse the published brand catalog, newest first, excluding the current watch', async () => {
  const fixture = createFixture([
    watch,
    { ...watch, id: 'older', slug: 'older', created_date: '2025-01-01' },
    { ...watch, id: 'newer', slug: 'newer', created_date: '2026-03-01' },
    { ...watch, id: 'draft', slug: 'draft', isPublished: false, created_date: '2026-04-01' },
    { ...watch, id: 'omega', slug: 'omega', brand: 'Omega', created_date: '2026-05-01' },
  ]);
  await fixture.getBrandPageData('rolex', 'Rolex');
  assert.deepEqual((await fixture.getRelatedProducts(watch)).map((product) => product.id), ['newer', 'older']);
  assert.deepEqual((await fixture.getRelatedProducts(watch, 1)).map((product) => product.id), ['newer']);
  assert.equal(fixture.filterCalls.length, 1);
  assert.deepEqual(fixture.filterCalls[0], [{ brand: 'Rolex', isPublished: true }, '-created_date']);
});

test('checkout product-by-id reads stay fresh across requests even when the public page is cached', async () => {
  const fixture = createFixture([watch]);
  await fixture.getProductBySlug(watch.slug);
  assert.equal((await fixture.getProductById(watch.id)).price, 9000);
  fixture.setProducts([{ ...watch, price: 9500, stockQuantity: 0 }]);
  const refreshed = await fixture.getProductById(watch.id);
  assert.equal(refreshed.price, 9500);
  assert.equal(refreshed.stockQuantity, 0);
  assert.deepEqual(fixture.getCalls, [watch.id, watch.id]);
  assert.equal(fixture.filterCalls.length, 1);
});
