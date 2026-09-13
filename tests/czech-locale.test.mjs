import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { DEFAULT_LOCALE, PRODUCT_SOURCE_LOCALE, SUPPORTED_LOCALES, normalizeLocale, localizedValue } from '../src/lib/locales.js';
import { localeAlternates, localizedMetadata } from '../src/lib/seo.js';
import { mergeCatalogTranslations } from '../src/lib/catalogTranslations.js';
import { selectShopResults } from '../src/lib/shopSearch.js';

const read = (path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8');

test('Czech language tags remain distinct from the country and existing defaults', () => {
  assert.deepEqual(SUPPORTED_LOCALES, ['de', 'en', 'cs']);
  assert.equal(DEFAULT_LOCALE, 'de');
  assert.equal(PRODUCT_SOURCE_LOCALE, 'en');
  assert.equal(normalizeLocale('cs-CZ'), 'cs');
  assert.equal(normalizeLocale('cs_CZ'), 'cs');
  assert.equal(normalizeLocale('cz', null), null);
  assert.equal(normalizeLocale('fr'), 'de');
});

test('Czech storefront metadata includes all reciprocal language alternatives', () => {
  assert.deepEqual(localeAlternates('shop'), { de: '/de/shop', en: '/en/shop', cs: '/cs/shop', 'x-default': '/de/shop' });
  const metadata = localizedMetadata({ locale: 'cs', path: 'shop', title: 'Hodinky', description: 'Luxusní hodinky' });
  assert.equal(metadata.alternates.canonical, '/cs/shop');
  assert.equal(metadata.openGraph.locale, 'cs_CZ');
  assert.deepEqual(metadata.openGraph.alternateLocale, ['de_DE', 'en_US']);
  assert.match(read('app/[locale]/layout.jsx'), /subsets: \['latin', 'latin-ext'\]/);
  assert.match(read('app/sitemap.js'), /cs:.*\/cs\/product\//);
});

test('existing catalog translation rows normalize and select Czech copy', () => {
  const translations = mergeCatalogTranslations('product', [
    { entity_id: 'watch', field_name: 'name', locale: 'cs-CZ', value: 'Hodinky s modrým ciferníkem' },
    { entity_id: 'watch', field_name: 'description', locale: 'cs', value: '<p>Ocelové pouzdro.</p>' },
    { entity_id: 'watch', field_name: 'name', locale: 'en', value: 'Blue dial watch' },
  ]);
  assert.equal(localizedValue(translations.watch, 'productTitle', 'cs'), 'Hodinky s modrým ciferníkem');
  assert.equal(localizedValue(translations.watch, 'productDescription', 'cs'), '<p>Ocelové pouzdro.</p>');
  assert.equal(localizedValue(translations.watch, 'productTitle', 'en'), 'Blue dial watch');
});

test('shop search and sorting use Czech title and description without translated attributes', () => {
  const products = [
    { id: 'a', isPublished: true, productTitle: 'Zulu', productTitle_cs: 'Anděl', productDescription_cs: 'Modrý ciferník' },
    { id: 'b', isPublished: true, productTitle: 'Alpha', productTitle_cs: 'Žluté hodinky' },
  ];
  assert.equal(selectShopResults(products, { query: 'modry cifernik', locale: 'cs' }).items[0].id, 'a');
  assert.deepEqual(selectShopResults(products, { locale: 'cs', sort: 'name_asc' }).items.map(({ id }) => id), ['a', 'b']);
});
