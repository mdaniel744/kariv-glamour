import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { compileFunction } from 'node:vm';
import ts from 'typescript';
import * as marketplace from '../src/lib/marketplace.js';
import { testSeller } from './fixtures/marketplace.mjs';

function loadActions({ existingRow, translations = {}, generated = {} } = {}) {
  const writes = [];
  const reads = [];
  const translationInputs = [];
  const client = {
    from(table) {
      const query = {
        filters: [], operation: 'read', value: undefined,
        select() { return this; },
        eq(field, value) { this.filters.push([field, value]); return this; },
        limit() { return this; },
        update(value) { this.operation = 'update'; this.value = value; return this; },
        insert(value) { this.operation = 'insert'; this.value = value; return this; },
        upsert(value) { this.operation = 'upsert'; this.value = value; return this; },
        async single() {
          if (this.operation === 'insert') { writes.push({ table, ...this }); return { data: { id: 'new-watch' }, error: null }; }
          reads.push({ table, filters: this.filters });
          return { data: existingRow, error: existingRow ? null : new Error('not found') };
        },
        then(resolve) { writes.push({ table, ...this }); return Promise.resolve({ error: null }).then(resolve); },
      };
      return query;
    },
  };
  const imports = {
    '@/lib/marketplace': marketplace,
    '@/lib/marketplaceServer': { loadSeller: async key => key ? testSeller : null, requireActiveDealer: async () => testSeller },
    'next/cache': { revalidatePath() {} },
    '@/lib/supabaseAdmin': { supabaseAdmin: client },
    '@/lib/serverAuth': { requireAdmin: async () => ({ id: 'admin' }), requireDealer: async () => ({ id: 'dealer' }) },
    '@/lib/supabaseData': { STORE_ID: 'kariv-store', shapeProductRows: async (rows) => rows, Products: { invalidate() {} } },
    '@/lib/slug': { slugify: (name) => name.toLowerCase().replaceAll(' ', '-') },
    '@/lib/locales': { SUPPORTED_LOCALES: ['de', 'en', 'cs'] },
    '@/lib/catalogTranslations': { loadCatalogTranslations: async (_client, storeId, entity, ids) => {
      assert.equal(storeId, 'kariv-store'); assert.equal(entity, 'product');
      return { [ids[0]]: translations };
    } },
    '@/lib/productTranslation': { translateMissingProductContent: async (payload) => {
      translationInputs.push(payload);
      return { payload: { ...payload, ...generated }, automaticKeys: new Set(Object.keys(generated)), warning: '' };
    } },
  };
  const source = readFileSync(new URL('../src/actions/products.js', import.meta.url), 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const module = { exports: {} };
  compileFunction(compiled, ['require', 'module', 'exports'])((name) => {
    assert.ok(name in imports, name); return imports[name];
  }, module, module.exports);
  return { actions: module.exports, writes, reads, translationInputs };
}

test('product edits merge saved English and Czech without changing a legacy URL', async () => {
  const fixture = loadActions({
    existingRow: { id: 'watch', name: 'Deutscher Titel', description: 'Beschreibung', slug: 'legacy-watch-url' },
    translations: { productTitle_en: 'English original', productTitle_de: 'Korrigierter Titel', productTitle_cs: 'Ručně upravený název' },
  });
  await fixture.actions.updateProduct('watch', { productTitle: 'Deutscher Titel', productTitle_en: '', slug: 'accidental-editor-slug' });
  assert.equal(fixture.translationInputs[0].productTitle_en, 'English original');
  assert.equal(fixture.translationInputs[0].productTitle_cs, 'Ručně upravený název');
  const saved = fixture.writes.find((write) => write.table === 'products');
  assert.equal(saved.value.name, 'English original');
  assert.equal(saved.value.slug, 'legacy-watch-url');
  assert.ok(saved.filters.some(([key, value]) => key === 'store_id' && value === 'kariv-store'));
  assert.ok(fixture.reads[0].filters.some(([key, value]) => key === 'store_id' && value === 'kariv-store'));
  assert.equal(fixture.writes.filter((write) => write.table === 'translations').length, 0,
    'unchanged translations must keep their existing provenance and timestamps');
});

test('dealer English source edits preserve saved target corrections and require tenant ownership', async () => {
  const fixture = loadActions({
    existingRow: { id: 'watch', name: 'Previous English title', slug: 'stable-slug' },
    translations: { productTitle_en: 'Previous English title', productTitle_cs: 'Opravený český název' },
  });
  await fixture.actions.updateDealerListing('watch', { productTitle: 'New English title', productTitle_en: 'New English title' });
  assert.equal(fixture.translationInputs[0].productTitle_en, 'New English title');
  assert.equal(fixture.translationInputs[0].productTitle_cs, 'Opravený český název');
  for (const query of [...fixture.reads, ...fixture.writes.filter((write) => write.table === 'products')]) {
    assert.ok(query.filters.some(([key, value]) => key === 'store_id' && value === 'kariv-store'));
    assert.ok(query.filters.some(([key, value]) => key === 'dealer_id' && value === 'dealer'));
  }
  const rows = fixture.writes.find((write) => write.table === 'translations').value;
  assert.equal(rows.length, 1);
  assert.equal(rows[0].locale, 'en');
  assert.equal(rows[0].value, 'New English title');
  assert.equal(rows[0].translator, 'human');
});

test('a non-content edit does not rewrite any saved source or target rows', async () => {
  const translations = Object.fromEntries(['productTitle', 'productDescription', 'shortDescription'].flatMap((field) =>
    ['en', 'de', 'cs'].map((locale) => [`${field}_${locale}`, `${field} saved ${locale}`])));
  for (const action of ['updateProduct', 'updateDealerListing']) {
    const fixture = loadActions({
      existingRow: { id: 'watch', name: translations.productTitle_en, slug: 'stable-slug' },
      translations,
    });
    await fixture.actions[action]('watch', { price: 1200 });
    assert.equal(fixture.writes.filter((write) => write.table === 'translations').length, 0, action);
    assert.equal(fixture.writes.find((write) => write.table === 'products').value.price, 1200);
  }
});

test('only changed human fields and missing generated targets are upserted', async () => {
  const fixture = loadActions({
    existingRow: { id: 'watch', name: 'English original', slug: 'stable-slug' },
    translations: { productTitle_en: 'English original', productTitle_de: 'Gespeicherter Titel' },
    generated: { productTitle_cs: 'Nový český překlad' },
  });
  await fixture.actions.updateProduct('watch', { productTitle_en: 'Edited English title' });
  const rows = fixture.writes.find((write) => write.table === 'translations').value;
  assert.deepEqual(rows.map(({ locale, value, translator }) => ({ locale, value, translator })), [
    { locale: 'en', value: 'Edited English title', translator: 'human' },
    { locale: 'cs', value: 'Nový český překlad', translator: 'openai' },
  ]);
  assert.ok(rows.every((row) => row.store_id === 'kariv-store' && row.entity_id === 'watch'));
});

test('an explicitly edited target is saved as human without touching other translations', async () => {
  const fixture = loadActions({
    existingRow: { id: 'watch', name: 'English original', slug: 'stable-slug' },
    translations: { productTitle_en: 'English original', productTitle_de: 'Deutscher Titel', productTitle_cs: 'Původní český název' },
  });
  await fixture.actions.updateProduct('watch', { productTitle_cs: 'Ručně opravený český název' });
  const rows = fixture.writes.find((write) => write.table === 'translations').value;
  assert.equal(rows.length, 1);
  assert.equal(rows[0].locale, 'cs');
  assert.equal(rows[0].value, 'Ručně opravený český název');
  assert.equal(rows[0].translator, 'human');
});

test('new admin and dealer listings still save English originals and generated targets', async () => {
  for (const action of ['createProduct', 'createDealerListing']) {
    const fixture = loadActions({ generated: { productTitle_de: 'Deutscher Titel', productTitle_cs: 'Český název' } });
    await fixture.actions[action]({ productTitle_en: 'English original', dealerId: testSeller.user_id });
    const rows = fixture.writes.find((write) => write.table === 'translations').value;
    assert.equal(rows.length, 3, action);
    assert.ok(rows.every((row) => row.store_id === 'kariv-store' && row.entity_id === 'new-watch'));
    assert.deepEqual(Object.fromEntries(rows.map((row) => [row.locale, row.translator])), { de: 'openai', en: 'human', cs: 'openai' });
  }
});
