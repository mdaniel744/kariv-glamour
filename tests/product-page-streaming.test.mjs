import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { compileFunction } from 'node:vm';
import React from 'react';
import * as jsxRuntime from 'react/jsx-runtime';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';
import { mergeCatalogTranslations } from '../src/lib/catalogTranslations.js';
import { localizedField } from '../src/lib/seo.js';
import * as productMerchant from '../src/lib/productMerchant.js';
import * as productIndexing from '../src/lib/productIndexing.js';
import * as locales from '../src/lib/locales.js';
import { attributeLabel } from '../src/lib/attributeLabels.js';
import * as purchasePolicyUi from '../src/lib/purchasePolicyUi.js';

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
  id: 'watch-1', slug: 'rolex-daytona', productTitle: 'Rolex Daytona Steel', brand: 'Rolex',
  price: 12000, stockQuantity: 1, availability: 'In Stock', isPublished: true, dealerId: 'dealer-1',
  productImages: ['/watch.webp'], productDescription: 'Watch description',
};

function fixture({ related = async () => [], dealer = async () => null, dealerPreview = dealer } = {}) {
  const effects = [];
  const icon = () => null;
  let locale = 'en';
  const imports = {
    react: { ...React, useEffect: (effect) => effects.push(effect) },
    'react/jsx-runtime': jsxRuntime,
    'next/navigation': { useRouter: () => ({ push() {} }), notFound: () => { throw new Error('Not found'); } },
    'react-i18next': { useTranslation: () => ({ t: (key) => key }) },
    'lucide-react': Object.fromEntries(['Heart', 'ShieldCheck', 'Truck', 'RotateCcw', 'Award', 'ChevronLeft', 'ChevronRight', 'MessageCircle', 'Lock', 'ShoppingBag', 'Store'].map((key) => [key, icon])),
    '@/components/LocalizedLink': ({ to, children, ...props }) => React.createElement('a', { ...props, href: to }, children),
    '@/lib/dataClient': { dataClient: { entities: { Products: { get: async () => watch, filter: related } } } },
    '@/lib/base44Data': { asArray: (rows) => rows || [] },
    '@/lib/cartContext': { useCart: () => ({ addToCart() {}, toggleWishlist() {}, isInCart: () => false, isInWishlist: () => false }) },
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
    '@/lib/productIndexing': productIndexing,
    '@/lib/purchasePolicyUi': purchasePolicyUi,
    '@/lib/purchasePolicyServer': {
      getProductPurchasePolicy: async (product) => ({
        sellerType: product.dealerId ? 'dealer' : 'kariv',
        dealerId: product.dealerId || null,
        sellerName: product.dealerId ? 'Dealer' : 'Kariv Glamour',
        dealerTier: product.dealerId ? 'probationary' : null,
        purchaseRoute: product.dealerId ? 'escrow' : 'kariv_direct',
        directEligible: !product.dealerId,
        escrowRequired: Boolean(product.dealerId),
        buyerMayChooseProtection: false,
        directLimitEur: product.dealerId ? 0 : null,
        reasonCodes: product.dealerId ? ['dealer_probationary'] : ['kariv_owned_inventory'],
      }),
    },
    '@/components/shared/TrustBar': () => null,
    '@/components/checkout/BuyNowAuthModal': () => null,
    '@/components/product/ContactSellerDialog': () => React.createElement('button', null, 'pages.productDetail.sellerContact.button'),
    '@/components/product/KarivOfferDialog': () => React.createElement('button', null, 'pages.productDetail.counterOffer'),
    '@/components/product/DealerCustomerReviewsPreview': ({ dealer: preview }) => React.createElement('section', null, preview.displayName),
    '@/components/product/ProductDealerRating': () => null,
    '@/components/shared/SafeHtml': ({ html }) => React.createElement('div', null, html),
    '@/components/product/ProductGallery': ({ title }) => React.createElement('div', { 'data-gallery': true }, title),
    '@/components/dealer/StarRating': () => null,
    '@/components/shared/MediaImage': ({ src }) => React.createElement('img', { src }),
    '@/lib/media': { getMediaVariant: (src) => src },
    '@/actions/dealerReviews': { getDealerRatingSummary: async () => null },
    '@/lib/base44Server': { getProductBySlug: async () => watch, getRelatedProducts: related, getDealerProfileSummary: dealer },
    '@/lib/productDealerPreviewServer': { getProductDealerPreviewData: dealerPreview },
    '@/lib/slug': { productSlug: (product) => product.slug },
    '@/lib/seo': {
      getSiteUrl: () => 'https://example.test', localizedField: (record, key) => record?.[key] || '',
      localizedMetadata: (data) => data, safeJsonLd: JSON.stringify, SUPPORTED_LOCALES: ['en', 'de', 'cs'],
    },
  };
  for (const [specifier, path] of [
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
  assert.equal(client.props.dealerReviewSlot.type, React.Suspense);

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
    dealerReviewSlot: unresolvedSlot(client.props.dealerReviewSlot),
  }));
  assert.match(html, /data-gallery="true"/);
  assert.match(html, /Rolex Daytona Steel/);
  assert.match(html, /EUR 12000/);
  assert.match(html, /pages\.productDetail\.(?:buyNow|buyWithProtection)/);
});

test('optional dealer/related failures leave the main details and dealer fallback visible', async (t) => {
  t.mock.method(console, 'error', () => {});
  const fail = async () => { throw new Error('Temporary optional service failure'); };
  const { route } = fixture({ dealer: fail, related: fail });
  const tree = await route.default({ params: { locale: 'en', slug: watch.slug } });
  const client = clientElement(tree);
  const dealerSection = client.props.dealerSlot.props.children;
  const relatedSection = client.props.relatedSlot.props.children;
  const dealerReviewSection = client.props.dealerReviewSlot.props.children;
  const [dealerNode, relatedNode, dealerReviewNode] = await Promise.all([
    dealerSection.type(dealerSection.props), relatedSection.type(relatedSection.props), dealerReviewSection.type(dealerReviewSection.props),
  ]);
  assert.equal(relatedNode, null);
  assert.equal(dealerReviewNode, null);
  const html = renderToStaticMarkup(React.cloneElement(client, { dealerSlot: dealerNode, relatedSlot: relatedNode, dealerReviewSlot: dealerReviewNode }));
  assert.match(html, /Rolex Daytona Steel/);
  assert.match(html, /data-gallery="true"/);
  assert.match(html, /View Dealer Profile/);
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
  const dealerReviewSection = client.props.dealerReviewSlot.props.children;
  const html = renderToStaticMarkup(React.cloneElement(client, {
    dealerSlot: await dealerSection.type(dealerSection.props),
    relatedSlot: await relatedSection.type(relatedSection.props),
    dealerReviewSlot: await dealerReviewSection.type(dealerReviewSection.props),
  }));
  assert.match(html, /Example Watches s\.r\.o\./);
  assert.match(html, /dealer-logo\.webp/);
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
  assert.match(html, /Legacy dealer/);
});

test('storefront cards, detail headings, descriptions and metadata follow the selected product language', () => {
  const titles = { en: 'Steel watch English', de: 'Stahluhr Deutsch', cs: 'Ocelové hodinky česky' };
  const descriptions = { en: 'English watch description.', de: 'Deutsche Uhrenbeschreibung.', cs: 'Český popis hodinek.' };
  const summaries = { en: 'English summary', de: 'Deutsche Kurzbeschreibung', cs: 'Český krátký popis' };
  const rows = ['en', 'de', 'cs'].flatMap((locale) => [
    { entity_id: watch.id, locale, field_name: 'name', value: titles[locale] },
    { entity_id: watch.id, locale, field_name: 'description', value: `<p>${descriptions[locale]}</p>` },
    { entity_id: watch.id, locale, field_name: 'short_description', value: summaries[locale] },
    { entity_id: watch.id, locale, field_name: 'meta_title', value: `SEO ${titles[locale]}` },
    { entity_id: watch.id, locale, field_name: 'meta_description', value: `SEO ${summaries[locale]}` },
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
    assert.ok(detailHtml.includes('data-product-short-description'));
    assert.ok(detailHtml.includes(summaries[locale]));
    assert.equal(productMerchant.productMetaTitle(product, locale), `SEO ${title}`);
    assert.equal(productMerchant.productMetaDescription(product, locale), `SEO ${summaries[locale]}`);
    assert.ok(cardHtml.includes(locale === 'cs' ? 'CZK 291120' : 'EUR 12000'));
    assert.ok(detailHtml.includes(locale === 'cs' ? 'CZK 291120' : 'EUR 12000'));
    assert.ok(!cardHtml.includes(otherTitle));
    assert.ok(!detailHtml.includes(otherTitle));
    assert.equal(localizedField(product, 'productTitle', locale), title);
    assert.equal(localizedField(product, 'productDescription', locale), `<p>${description}</p>`);
  }
});
