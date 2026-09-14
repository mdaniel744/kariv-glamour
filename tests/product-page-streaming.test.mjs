import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { compileFunction } from 'node:vm';
import React from 'react';
import * as jsxRuntime from 'react/jsx-runtime';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';
import * as marketplace from '../src/lib/marketplace.js';
import * as marketplaceCopy from '../src/lib/marketplaceCopy.js';
import { testSeller } from './fixtures/marketplace.mjs';
import { mergeCatalogTranslations } from '../src/lib/catalogTranslations.js';
import { localizedField } from '../src/lib/seo.js';
import * as productMerchant from '../src/lib/productMerchant.js';
import * as locales from '../src/lib/locales.js';
import { attributeLabel } from '../src/lib/attributeLabels.js';

const exchangeRates = { source: 'CNB', date: new Date().toISOString().slice(0, 10), rates: { EUR: 24.26, CZK: 1 } };

function loadSource(path, imports) {
  const { outputText } = ts.transpileModule(readFileSync(new URL(`../${path}`, import.meta.url), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
    fileName: path,
  });
  const module = { exports: {} };
  compileFunction(outputText, ['require', 'module', 'exports'])((specifier) => {
    assert.ok(specifier in imports, `Unexpected dependency: ${specifier}`);
    return imports[specifier];
  }, module, module.exports);
  return module.exports;
}

const watch = {
  seller: testSeller, ownershipVerificationStatus: 'verified',
  id: 'watch-1', slug: 'rolex-daytona', productTitle: 'Rolex Daytona Steel', brand: 'Rolex',
  price: 12000, stockQuantity: 1, availability: 'In Stock', isPublished: true, dealerId: 'dealer-1',
  productImages: ['/watch.webp'], productDescription: 'Watch description',
};

function fixture({ related = async () => [], dealer = async () => null } = {}) {
  const effects = [];
  const icon = () => null;
  let locale = 'en';
  const imports = {
    '@/lib/marketplace': marketplace,
    '@/lib/marketplaceCopy': marketplaceCopy,
    react: { ...React, useEffect: (effect) => effects.push(effect) },
    'react/jsx-runtime': jsxRuntime,
    'next/navigation': { useRouter: () => ({ push() {} }), notFound: () => { throw new Error('Not found'); } },
    'react-i18next': { useTranslation: () => ({ t: (key) => key }) },
    'lucide-react': Object.fromEntries(['Heart', 'ShieldCheck', 'Truck', 'RotateCcw', 'Award', 'ChevronLeft', 'ChevronRight', 'MessageCircle', 'Lock', 'Store'].map((key) => [key, icon])),
    '@/components/LocalizedLink': ({ to, children, ...props }) => React.createElement('a', { ...props, href: to }, children),
    '@/lib/dataClient': { dataClient: { entities: { Products: { get: async () => watch, filter: related } } } },
    '@/lib/base44Data': { asArray: (rows) => rows || [] },
    '@/lib/cartContext': { useCart: () => ({ toggleWishlist() {}, isInWishlist: () => false }) },
    '@/lib/AuthContext': { useAuth: () => ({ isAuthenticated: false }) },
    '@/lib/languageContext': { useLanguage: () => ({ locale, localePath: (path) => `/${locale}${path}` }) },
    '@/lib/constants': { formatPrice: (price) => `EUR ${price}` },
    '@/lib/locales': locales,
    '@/hooks/useAttributeLabel': { useAttributeLabel: () => (value) => attributeLabel(value, locale) },
    '@/lib/exchangeRatesServer': { getCzkExchangeRates: async () => exchangeRates },
    '@/lib/currencyContext': {
      CurrencyProvider: ({ children }) => children,
      useStorefrontPricing: () => ({ locale, getPricing: (product) => productMerchant.getProductPricing(product, { locale, exchangeRates }), formatMoney: (price, currency = 'EUR') => `${currency} ${price}` }),
    },
    '@/lib/productMerchant': productMerchant,
    '@/components/shared/TrustBar': () => null,
    '@/components/checkout/BuyNowAuthModal': () => null,
    '@/components/shared/SafeHtml': ({ html }) => React.createElement('div', null, html),
    '@/components/product/ProductGallery': ({ title }) => React.createElement('div', { 'data-gallery': true }, title),
    '@/components/dealer/StarRating': () => null,
    '@/components/shared/MediaImage': ({ src }) => React.createElement('img', { src }),
    '@/lib/media': { getMediaVariant: (src) => src },
    '@/actions/dealerReviews': { getDealerRatingSummary: async () => null },
    '@/lib/base44Server': { getProductBySlug: async () => watch, getRelatedProducts: related, getDealerProfileSummary: dealer },
    '@/lib/slug': { productSlug: (product) => product.slug },
    '@/lib/seo': {
      getSiteUrl: () => 'https://example.test', localizedField: (record, key) => record?.[key] || '',
      localizedMetadata: (data) => data, safeJsonLd: JSON.stringify, SUPPORTED_LOCALES: ['en', 'de', 'cs'],
    },
  };
  for (const [specifier, path] of [
    ['@/lib/useLiveSeller', 'src/lib/useLiveSeller.js'],
    ['@/components/marketplace/SellerIdentity', 'src/components/marketplace/SellerIdentity.jsx'],
    ['@/lib/localize', 'src/lib/localize.jsx'],
    ['@/components/shared/ProductCard', 'src/components/shared/ProductCard.jsx'],
    ['@/components/product/ProductDealerCard', 'src/components/product/ProductDealerCard.jsx'],
    ['@/components/product/RelatedProducts', 'src/components/product/RelatedProducts.jsx'],
    ['@/components/product/ProductPageSections', 'src/components/product/ProductPageSections.jsx'],
    ['@/page-content/ProductDetail', 'src/page-content/ProductDetail.jsx'],
    ['@/components/next-pages/ProductDetailPageClient', 'src/components/next-pages/ProductDetailPageClient.jsx'],
  ]) imports[specifier] = loadSource(path, imports);
  const route = loadSource('app/[locale]/product/[slug]/page.jsx', imports);
  return {
    route, effects, Detail: imports['@/page-content/ProductDetail'].default,
    Card: imports['@/components/shared/ProductCard'].default,
    setLocale: (value) => { locale = value; },
  };
}

function clientElement(tree) {
  const provider = React.Children.toArray(tree.props.children).find((element) => typeof element.type === 'function');
  return provider.props.children;
}

test('product route returns the selected watch before unresolved dealer and related reads', async () => {
  const never = new Promise(() => {});
  const { route } = fixture({ dealer: () => never, related: () => never });
  const blocked = Symbol('blocked');
  const tree = await Promise.race([
    route.default({ params: Promise.resolve({ locale: 'en', slug: watch.slug }) }),
    new Promise((resolve) => setImmediate(() => resolve(blocked))),
  ]);
  assert.notEqual(tree, blocked, 'optional network reads must not block primary route output');
  const client = clientElement(tree);
  assert.equal(client.props.product.id, watch.id);
  assert.equal(client.props.dealerSlot.type, React.Suspense);
  assert.equal(client.props.relatedSlot.type, React.Suspense);

  // React 18's plain HTML renderer cannot execute async server components.
  // Start the actual section readers, then represent each unresolved server
  // slot as a suspending leaf to exercise the real client/detail layout.
  function unresolvedSlot(slot) {
    const section = slot.props.children;
    const work = section.type(section.props);
    const Pending = () => { throw work; };
    return React.cloneElement(slot, {}, React.createElement(Pending));
  }
  const html = renderToStaticMarkup(React.cloneElement(client, {
    dealerSlot: unresolvedSlot(client.props.dealerSlot),
    relatedSlot: unresolvedSlot(client.props.relatedSlot),
  }));
  assert.match(html, /data-gallery="true"/);
  assert.match(html, /Rolex Daytona Steel/);
  assert.match(html, /EUR 12000/);
  assert.match(html, /pages\.productDetail\.buyNow/);
});

test('optional dealer/related failures leave the main details and dealer fallback visible', async (t) => {
  t.mock.method(console, 'error', () => {});
  const fail = async () => { throw new Error('Temporary optional service failure'); };
  const { route } = fixture({ dealer: fail, related: fail });
  const tree = await route.default({ params: { locale: 'en', slug: watch.slug } });
  const client = clientElement(tree);
  const dealerSection = client.props.dealerSlot.props.children;
  const relatedSection = client.props.relatedSlot.props.children;
  const [dealerNode, relatedNode] = await Promise.all([
    dealerSection.type(dealerSection.props), relatedSection.type(relatedSection.props),
  ]);
  assert.equal(relatedNode, null);
  const html = renderToStaticMarkup(React.cloneElement(client, { dealerSlot: dealerNode, relatedSlot: relatedNode }));
  assert.match(html, /Rolex Daytona Steel/);
  assert.match(html, /data-gallery="true"/);
  assert.match(html, /TEST Approved Dealer/);
  assert.match(html, /dealer-profile\/dealer-1/);
});

test('resolved dealer company name/logo and related cards preserve their existing display', async () => {
  const { route } = fixture({
    dealer: async () => ({ displayName: 'Example Watches s.r.o.', logoImage: '/dealer-logo.webp' }),
    related: async () => [{ id: 'watch-2', productTitle: 'Related Rolex Watch' }],
  });
  const client = clientElement(await route.default({ params: { locale: 'en', slug: watch.slug } }));
  const dealerSection = client.props.dealerSlot.props.children;
  const relatedSection = client.props.relatedSlot.props.children;
  const html = renderToStaticMarkup(React.cloneElement(client, {
    dealerSlot: await dealerSection.type(dealerSection.props),
    relatedSlot: await relatedSection.type(relatedSection.props),
  }));
  assert.match(html, /TEST Approved Dealer/);
  assert.doesNotMatch(html, /Example Watches/); // Clerk/display fallbacks cannot override approved identity.
  assert.match(html, /Related Rolex Watch/);
});

test('legacy detail props still render recommendations without server slots', () => {
  const { Detail } = fixture();
  const html = renderToStaticMarkup(React.createElement(Detail, {
    id: watch.id, initialProduct: watch,
    initialRelated: [{ id: 'legacy-related', productTitle: 'Legacy related watch' }],
    initialDealerProfile: { displayName: 'Legacy dealer' },
  }));
  assert.match(html, /Rolex Daytona Steel/);
  assert.match(html, /Legacy related watch/);
  assert.doesNotMatch(html, /Legacy dealer/);
  assert.match(html, /TEST Approved Dealer/);
});

test('storefront cards, detail headings, descriptions and metadata follow the selected product language', () => {
  const titles = { en: 'Steel watch English', de: 'Stahluhr Deutsch', cs: 'Ocelové hodinky česky' };
  const descriptions = { en: 'English watch description.', de: 'Deutsche Uhrenbeschreibung.', cs: 'Český popis hodinek.' };
  const rows = ['en', 'de', 'cs'].flatMap((locale) => [
    { entity_id: watch.id, locale, field_name: 'name', value: titles[locale] },
    { entity_id: watch.id, locale, field_name: 'description', value: `<p>${descriptions[locale]}</p>` },
  ]);
  const product = { ...watch, ...mergeCatalogTranslations('product', rows)[watch.id] };
  const { Card, Detail, setLocale } = fixture();
  // Reuse exactly the same record while changing only the selected language.
  for (const locale of ['de', 'cs', 'en', 'de']) {
    setLocale(locale);
    const title = titles[locale];
    const description = descriptions[locale];
    const otherTitle = locale === 'de' ? 'Steel watch English' : 'Stahluhr Deutsch';
    const cardHtml = renderToStaticMarkup(React.createElement(Card, { product }));
    const detailHtml = renderToStaticMarkup(React.createElement(Detail, { id: product.id, initialProduct: product }));
    assert.ok(cardHtml.includes(title));
    assert.ok(detailHtml.includes(title));
    assert.ok(detailHtml.includes(description));
    assert.ok(cardHtml.includes(locale === 'cs' ? 'CZK 291120' : 'EUR 12000'));
    assert.ok(detailHtml.includes(locale === 'cs' ? 'CZK 291120' : 'EUR 12000'));
    assert.ok(!cardHtml.includes(otherTitle));
    assert.ok(!detailHtml.includes(otherTitle));
    assert.equal(localizedField(product, 'productTitle', locale), title);
    assert.equal(localizedField(product, 'productDescription', locale), `<p>${description}</p>`);
  }
});
