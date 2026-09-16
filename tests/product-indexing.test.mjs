import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { compileFunction } from 'node:vm';
import ts from 'typescript';
import * as seo from '../src/lib/seo.js';
import * as merchant from '../src/lib/productMerchant.js';
import * as indexing from '../src/lib/productIndexing.js';
import * as slug from '../src/lib/slug.js';

const source = readFileSync(new URL('../app/[locale]/product/[slug]/page.jsx', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
  fileName: 'page.jsx',
});

function productRoute(getProductBySlug) {
  const imports = {
    react: {}, 'react/jsx-runtime': {},
    'next/navigation': { notFound() { throw new Error('HTTP_404'); } },
    '@/lib/base44Server': { getProductBySlug },
    '@/lib/seo': seo, '@/lib/productMerchant': merchant, '@/lib/productIndexing': indexing, '@/lib/slug': slug,
    '@/lib/exchangeRatesServer': {}, '@/lib/currencyContext': {},
    '@/components/product/ProductPageSections': {},
    '@/components/next-pages/ProductDetailPageClient': {},
  };
  const module = { exports: {} };
  compileFunction(outputText, ['require', 'module', 'exports'])((specifier) => {
    assert.ok(specifier in imports, `Unexpected dependency: ${specifier}`);
    return imports[specifier];
  }, module, module.exports);
  return module.exports;
}

const watch = {
  slug: 'test-watch', isPublished: true, productTitle: 'English watch', productDescription: 'English description',
  productTitle_en: 'English watch', productDescription_en: 'English description',
  productTitle_de: 'Deutsche Uhr', productDescription_de: 'Deutsche Beschreibung',
  productTitle_cs: 'České hodinky', productDescription_cs: '<p>Český popis hodinek.</p>',
};
const params = (locale = 'en') => ({ params: Promise.resolve({ locale, slug: watch.slug }) });

test('published translated products explicitly allow indexing in all three storefront languages', async () => {
  const route = productRoute(async () => watch);
  for (const locale of ['en', 'de', 'cs']) {
    const metadata = await route.generateMetadata(params(locale));
    assert.equal(metadata.robots.index, true);
    assert.equal(metadata.robots.googleBot.index, true);
    assert.equal(metadata.alternates.canonical, `/${locale}/product/test-watch`);
    assert.equal(metadata.alternates.languages.cs, '/cs/product/test-watch');
  }
});

test('a genuinely missing Czech description excludes only the incomplete Czech product page', async () => {
  const route = productRoute(async () => ({ ...watch, productDescription_cs: '' }));
  for (const locale of ['en', 'de', 'cs']) {
    const metadata = await route.generateMetadata(params(locale));
    assert.equal(metadata.robots.index, locale !== 'cs');
    assert.equal(metadata.robots.googleBot.index, locale !== 'cs');
    assert.equal(metadata.alternates.languages.cs, undefined);
  }
});

test('published Czech watches with no description in any language remain searchable without relaxing Merchant checks', async () => {
  const product = { ...watch, productDescription: '', productDescription_en: '', productDescription_de: '', productDescription_cs: '' };
  const route = productRoute(async () => product);
  const metadata = await route.generateMetadata(params('cs'));
  assert.equal(metadata.robots.index, true);
  assert.equal(metadata.robots.googleBot.index, true);
  assert.equal(metadata.alternates.languages.cs, '/cs/product/test-watch');
  assert.equal(merchant.hasCzechProductCopy(product), false);
  assert.equal(merchant.buildProductMerchantSchema({ ...product, price: 1000, currency: 'CZK' }, {
    locale: 'cs', url: 'https://24kariv.com/cs/product/test-watch',
  }).offers, undefined);
});

test('Czech eligibility follows the actual description fallback and requires a saved Czech title', () => {
  const product = { ...watch, productDescription: '', productDescription_en: '', productDescription_cs: '' };
  assert.equal(indexing.isProductIndexable(product, 'cs'), false, 'a German fallback must not masquerade as Czech');
  assert.equal(indexing.isProductIndexable({ ...product, productDescription_de: '' }, 'cs'), true);
  assert.equal(indexing.isProductIndexable({ ...watch, productTitle_cs: '' }, 'cs'), false);
});

test('Czech Search snippets do not use untranslated descriptions when no Czech prose is saved', () => {
  const product = { ...watch, productDescription_cs: '', shortDescription: 'English summary', metaDescription: 'English metadata' };
  assert.equal(merchant.productMetaDescription(product, 'cs'), '');
  assert.equal(merchant.productMetaDescription(product, 'en'), 'English metadata');
  assert.equal(merchant.productMetaDescription({ ...product, shortDescription_cs: 'České shrnutí' }, 'cs'), 'České shrnutí');
});

test('empty markup is not mistaken for an untranslated description or a meaningful Czech title', () => {
  const product = { ...watch, productDescription: '<p> </p>', productDescription_en: '', productDescription_de: '', productDescription_cs: '' };
  assert.equal(indexing.isProductIndexable(product, 'cs'), true);
  assert.equal(indexing.isProductIndexable({ ...product, productTitle_cs: '<p>&nbsp;</p>' }, 'cs'), false);
});

test('the sitemap uses the same Search eligibility helper as product metadata', () => {
  const sitemap = readFileSync(new URL('../app/sitemap.js', import.meta.url), 'utf8');
  assert.match(sitemap, /if \(!isProductIndexable\(product, locale\)\) continue/);
  assert.match(sitemap, /isProductIndexable\(product, 'cs'\) \? \{ cs:/);
  assert.doesNotMatch(sitemap, /hasCzechProductCopy/);
});

test('unpublished products never become indexable through their metadata', async () => {
  const route = productRoute(async () => ({ ...watch, isPublished: false }));
  for (const locale of ['en', 'de', 'cs']) {
    assert.equal((await route.generateMetadata(params(locale))).robots.index, false);
  }
});

test('confirmed missing products remain not-found and noindex', async () => {
  const route = productRoute(async () => null);
  assert.equal((await route.generateMetadata(params())).robots.index, false);
  await assert.rejects(route.default(params()), /HTTP_404/);
});

test('failed product or translation reads never produce successful noindex metadata or false 404s', async () => {
  const failure = new Error('Temporary catalogue failure');
  const route = productRoute(async () => { throw failure; });
  await assert.rejects(route.generateMetadata(params('cs')), failure);
  await assert.rejects(route.default(params('cs')), failure);
});
