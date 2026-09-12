import test from 'node:test';
import assert from 'node:assert/strict';
import { mergeCatalogTranslations, loadCatalogTranslations } from '../src/lib/catalogTranslations.js';

const row = { entity_id: 'watch', field_name: 'name', locale: 'en', value: 'Dashboard English' };

test('legacy duplicate fields prefer dashboard names independent of database return order', () => {
  const rows = [row, { ...row, field_name: 'productTitle', value: 'Old base copy' }];
  assert.deepEqual(mergeCatalogTranslations('product', rows), { watch: { productTitle_en: 'Dashboard English' } });
  assert.deepEqual(mergeCatalogTranslations('product', rows.toReversed()), mergeCatalogTranslations('product', rows));
});

test('a newer storefront editor translation still overrides an older dashboard translation', () => {
  assert.equal(mergeCatalogTranslations('product', [
    { ...row, updated_at: '2026-09-09' },
    { ...row, field_name: 'productTitle', value: 'Latest edit', updated_at: '2026-09-10' },
  ]).watch.productTitle_en, 'Latest edit');
});

test('blank values do not erase saved translations and regional locale codes normalize', () => {
  const translations = mergeCatalogTranslations('product', [
    { ...row, locale: 'en-GB' },
    { ...row, locale: 'de_DE', value: 'Deutscher Titel' },
    { ...row, locale: 'DE', value: '  ', updated_at: '2099-01-01' },
    { ...row, locale: 'fr', value: 'French ignored' },
    { ...row, field_name: 'description', locale: 'de', value: '<p>Beschreibung mit <strong>Details</strong>.</p>' },
  ]);
  assert.deepEqual(translations.watch, {
    productTitle_en: 'Dashboard English', productTitle_de: 'Deutscher Titel',
    productDescription_de: '<p>Beschreibung mit <strong>Details</strong>.</p>',
  });
});

test('empty reads need no network and database errors are surfaced to the caller', async () => {
  assert.deepEqual(await loadCatalogTranslations(null, 'store', 'product', ['watch']), {});
  assert.deepEqual(await loadCatalogTranslations({}, 'store', 'product', []), {});
  const error = new Error('Temporary translation error');
  const query = {
    select() { return this; }, eq() { return this; }, in() { return this; }, order() { return this; },
    range() { return Promise.resolve({ error }); },
  };
  await assert.rejects(loadCatalogTranslations({ from: () => query }, 'store', 'product', ['watch']), error);
});
