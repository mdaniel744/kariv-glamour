import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { compileFunction } from 'node:vm';
import ts from 'typescript';

function loadActions({ existingRow, translations = {}, generated = {}, translationWriteError = null } = {}) {
  const writes = [];
  const reads = [];
  const translationInputs = [];
  let slugSequence = 0;
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
        async maybeSingle() {
          reads.push({ table, filters: this.filters });
          if (table === 'categories') {
            return { data: { id: this.filters.find(([key]) => key === 'id')?.[1] }, error: null };
          }
          return { data: null, error: null };
        },
        then(resolve) { writes.push({ table, ...this }); return Promise.resolve({ error: table === 'translations' ? translationWriteError : null }).then(resolve); },
      };
      return query;
    },
  };
  const imports = {
    'node:crypto': { randomUUID: () => String(++slugSequence).padStart(8, '0') },
    'next/cache': { revalidatePath() {} },
    '@/lib/supabaseAdmin': { supabaseAdmin: client },
    '@/lib/serverAuth': { requireAdmin: async () => {}, requireDealer: async () => ({ id: 'dealer' }) },
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
    await fixture.actions[action]({ productTitle_en: 'English original', brand: 'Rolex', collection: 'Datejust', price: 7500 });
    const rows = fixture.writes.find((write) => write.table === 'translations').value;
    assert.equal(rows.length, 3, action);
    assert.ok(rows.every((row) => row.store_id === 'kariv-store' && row.entity_id === 'new-watch'));
    assert.deepEqual(Object.fromEntries(rows.map((row) => [row.locale, row.translator])), { de: 'openai', en: 'human', cs: 'openai' });
  }
});

test('SEO source columns and translated SEO fields are saved for new listings', async () => {
  const fixture = loadActions({ generated: { metaTitle_de: 'SEO-Titel', metaTitle_cs: 'SEO název', metaDescription_de: 'Beschreibung', metaDescription_cs: 'Popis' } });
  await fixture.actions.createProduct({ productTitle_en: 'Watch', metaTitle_en: 'English SEO', metaDescription_en: 'English description' });
  const product = fixture.writes.find((write) => write.table === 'products').value;
  assert.equal(product.meta_title, 'English SEO');
  assert.equal(product.meta_description, 'English description');
  const rows = fixture.writes.find((write) => write.table === 'translations').value;
  assert.equal(rows.filter((row) => ['metaTitle', 'metaDescription'].includes(row.field_name)).length, 6);
});

test('dealer form saves Ecom classification, media metadata and all watch attributes as a tenant-owned draft', async () => {
  const fixture = loadActions();
  await fixture.actions.createDealerListing({
    productTitle_en: 'Omega Seamaster 300', brand: 'Omega', collection: 'Seamaster',
    categoryId: 'category-1', referenceNumber: '234.30', sku: 'WATCH-123',
    price: 7500, salePrice: 7000, stockQuantity: 2, currency: 'EUR',
    merchantCondition: 'used', badge: 'New Arrival', mpn: 'MPN-123',
    googleProductCategory: 'Apparel & Accessories > Jewelry > Watches',
    googleMerchantTitle: 'Omega Seamaster 300 watch',
    googleMerchantDescription: 'A pre-owned Omega watch.',
    productImages: ['https://example.com/one.jpg', 'https://example.com/two.jpg'],
    imageTitles: ['Front', 'Back'], imageAlts: ['Watch front', 'Watch back'],
    imageDescriptions: ['Front view', 'Caseback view'],
    model: 'Seamaster 300', caseDiameter: '41 mm', functions: 'Date',
    waterResistance: '300 m', crystalType: 'Sapphire', powerReserve: '60 h',
    serviceHistory: 'Serviced 2024', polishedStatus: 'Unpolished',
    originalPartsStatus: 'Original', warrantyType: 'Dealer', warrantyDuration: '12 months',
    scopeOfDelivery: 'Watch and papers', boxIncluded: false, papersIncluded: true,
    attributes: { 'Dial Finish': 'Sunburst', 'Lug Width': '20 mm', Authentication: 'Authenticated', authentication: 'Authenticated' },
    authenticationStatus: 'Authenticated',
    featured: true,
  });
  const row = fixture.writes.find((write) => write.table === 'products').value;
  assert.equal(row.store_id, 'kariv-store');
  assert.equal(row.dealer_id, 'dealer');
  assert.equal(row.status, 'draft');
  assert.match(row.slug, /-00000001$/);
  assert.equal(row.is_featured, false, 'dealers cannot grant featured placement');
  assert.equal(row.category_id, 'category-1');
  assert.equal(row.stock_quantity, 2);
  assert.equal(row.sku, 'WATCH-123');
  assert.equal(row.mpn, 'MPN-123');
  assert.equal(row.condition, 'used');
  assert.equal(row.google_product_category, 'Apparel & Accessories > Jewelry > Watches');
  assert.deepEqual(row.image_alts, ['Watch front', 'Watch back']);
  assert.equal(row.attributes['Dial Finish'], 'Sunburst');
  assert.equal(row.attributes['Lug Width'], '20 mm');
  assert.equal(row.attributes.Authentication, 'Pending', 'dealers cannot authenticate their own watches');
  assert.equal(row.attributes.authentication, undefined);
  assert.equal(row.attributes['Water Resistance'], '300 m');
  assert.equal(row.attributes['Scope of Delivery'], 'Watch and papers');
  assert.equal(row.attributes['Box Included'], false);
  assert.ok(fixture.reads.find((read) => read.table === 'categories')?.filters.some(([key, value]) => key === 'store_id' && value === 'kariv-store'));
});

test('dealer edits cannot replace an admin-set authentication status', async () => {
  const fixture = loadActions({ existingRow: {
    id: 'watch', name: 'Watch', slug: 'watch', attributes: { Authentication: 'Authenticated' },
  } });
  await fixture.actions.updateDealerListing('watch', {
    attributes: { Authentication: 'Pending', 'Dial Finish': 'Sunburst' },
    authenticationStatus: 'Pending',
  });
  const row = fixture.writes.find((write) => write.table === 'products').value;
  assert.equal(row.attributes.Authentication, 'Authenticated');
  assert.equal(row.attributes['Dial Finish'], 'Sunburst');
});

test('a saved dealer draft is reported as created even if its translation write fails', async () => {
  const fixture = loadActions({ translationWriteError: { message: 'Translation table unavailable' } });
  const result = await fixture.actions.createDealerListing({ productTitle_en: 'English watch title', brand: 'Rolex', collection: 'Datejust', price: 7500 });
  assert.equal(result.id, 'new-watch');
  assert.match(result.translationWarning, /saved.*translations need attention/);
  assert.equal(fixture.writes.filter((write) => write.table === 'products' && write.operation === 'insert').length, 1);
});

test('dealer creation rejects incomplete watches and invalid stock before any write', async () => {
  for (const payload of [
    { productTitle_en: 'Watch', brand: 'Rolex', collection: 'Datejust', price: 0 },
    { productTitle_en: 'Watch', brand: 'Rolex', collection: '', price: 7500 },
    { productTitle_en: 'Watch', brand: 'Rolex', collection: 'Datejust', price: 7500, stockQuantity: -1 },
  ]) {
    const fixture = loadActions();
    await assert.rejects(fixture.actions.createDealerListing(payload));
    assert.equal(fixture.writes.length, 0);
  }
});

test('two watches with the same title receive distinct dealer listing URLs', async () => {
  const fixture = loadActions();
  const payload = { productTitle_en: 'Rolex Datejust', brand: 'Rolex', collection: 'Datejust', price: 7500 };
  await fixture.actions.createDealerListing(payload);
  await fixture.actions.createDealerListing(payload);
  const slugs = fixture.writes.filter((write) => write.table === 'products' && write.operation === 'insert')
    .map((write) => write.value.slug);
  assert.equal(slugs.length, 2);
  assert.notEqual(slugs[0], slugs[1]);
});
