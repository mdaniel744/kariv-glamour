import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { compileFunction } from 'node:vm';
import React from 'react';
import * as jsxRuntime from 'react/jsx-runtime';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';
import * as purchasePolicyUi from '../src/lib/purchasePolicyUi.js';

const localeFiles = Object.fromEntries(
  ['en', 'de', 'cs'].map((locale) => [
    locale,
    JSON.parse(readFileSync(new URL(`../src/locales/${locale}/common.json`, import.meta.url), 'utf8')),
  ]),
);

function loadSource(path, imports) {
  const { outputText } = ts.transpileModule(
    readFileSync(new URL(`../${path}`, import.meta.url), 'utf8'),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
      },
      fileName: path,
    },
  );
  const module = { exports: {} };
  compileFunction(outputText, ['require', 'module', 'exports'])((specifier) => {
    assert.ok(specifier in imports, `Unexpected dependency: ${specifier}`);
    return imports[specifier];
  }, module, module.exports);
  return module.exports;
}

function localizedText(locale, key, values = {}) {
  const normalized = key.startsWith('common:') ? key.slice('common:'.length) : key;
  const value = normalized.split('.').reduce((current, segment) => current?.[segment], localeFiles[locale]);
  if (typeof value !== 'string') return key;
  return value.replace(/{{\s*([^}\s]+)\s*}}/g, (_match, name) => String(values[name] ?? ''));
}

function renderProduct(product) {
  const icon = () => null;
  const Wrapper = ({ children, ...props }) => React.createElement('div', props, children);
  const imports = {
    react: React,
    'react/jsx-runtime': jsxRuntime,
    'next/navigation': { useRouter: () => ({ push() {} }) },
    'react-i18next': { useTranslation: () => ({ t: (key, values) => localizedText('en', key, values) }) },
    'lucide-react': Object.fromEntries([
      'Award', 'CheckCircle2', 'ChevronRight', 'FileText', 'HandCoins', 'Heart', 'Lock',
      'MessageCircle', 'RotateCcw', 'Send', 'ShieldCheck', 'ShoppingBag', 'Store', 'Truck',
    ].map((name) => [name, icon])),
    '@/actions/dealerInquiries': {
      createDealerInquiry: async () => ({ ok: true }),
      createKarivOffer: async () => ({ ok: true }),
    },
    '@/components/LocalizedLink': ({ to, children, ...props }) => React.createElement('a', { href: to, ...props }, children),
    '@/components/ui/dialog': {
      Dialog: Wrapper,
      DialogContent: Wrapper,
      DialogDescription: Wrapper,
      DialogHeader: Wrapper,
      DialogTitle: Wrapper,
    },
    '@/components/ui/use-toast': { useToast: () => ({ toast() {} }) },
    '@/lib/AuthContext': { useAuth: () => ({ isAuthenticated: true }) },
    '@/lib/languageContext': { useLanguage: () => ({ localePath: (path) => `/en${path}` }) },
    '@/lib/slug': { productSlug: (item) => item.slug || item.id },
  };
  imports['@/components/product/ContactSellerDialog'] = loadSource(
    'src/components/product/ContactSellerDialog.jsx',
    imports,
  );
  imports['@/components/product/KarivOfferDialog'] = loadSource(
    'src/components/product/KarivOfferDialog.jsx',
    imports,
  );

  Object.assign(imports, {
    '@/lib/dataClient': { dataClient: { entities: { Products: {} } } },
    '@/lib/base44Data': { asArray: (rows) => rows || [] },
    '@/lib/cartContext': {
      useCart: () => ({
        addToCart() {},
        toggleWishlist() {},
        isInCart: () => false,
        isInWishlist: () => false,
      }),
    },
    '@/lib/localize': { useLocalizedField: () => ({ localize: (item, field) => item?.[field] || '' }) },
    '@/lib/currencyContext': {
      useStorefrontPricing: () => ({
        locale: 'en',
        getPricing: (item) => ({ price: item.price, currency: item.currency || 'EUR' }),
        formatMoney: (amount, currency) => `${currency} ${amount}`,
      }),
    },
    '@/hooks/useAttributeLabel': { useAttributeLabel: () => (value) => value },
    '@/components/shared/TrustBar': () => null,
    '@/components/checkout/BuyNowAuthModal': () => null,
    '@/components/shared/SafeHtml': ({ html }) => React.createElement('div', null, html),
    '@/components/product/ProductGallery': ({ title }) => React.createElement('div', null, title),
    '@/components/product/ProductDealerCard': () => null,
    '@/components/product/RelatedProducts': () => null,
    '@/lib/productMerchant': {
      getProductAvailability: () => ({ inStock: true }),
      productLocalizedText: (item, field, locale) => item?.[`${field}_${locale}`] || (locale === 'en' ? item?.[field] : '') || '',
    },
    '@/lib/purchasePolicyUi': purchasePolicyUi,
  });

  const ProductDetail = loadSource('src/page-content/ProductDetail.jsx', imports).default;
  return renderToStaticMarkup(React.createElement(ProductDetail, {
    id: product.id,
    initialProduct: product,
  }));
}

const baseProduct = {
  id: 'watch-1',
  slug: 'example-watch',
  productTitle: 'Example Watch',
  productDescription: 'A watch description.',
  brand: 'Rolex',
  price: 12000,
  currency: 'EUR',
  stockQuantity: 1,
  availability: 'In Stock',
  productImages: ['/watch.webp'],
};

test('dealer-owned product renders standard cart actions plus Contact Seller choices', () => {
  const html = renderProduct({
    ...baseProduct,
    dealerId: 'dealer-1',
    dealerName: 'Chronos Prague',
  });

  assert.match(html, />Contact Seller</);
  assert.match(html, />Add to Cart</);
  assert.match(html, />Buy Now</);
  assert.match(html, />Request a quote</);
  assert.match(html, />Make an offer</);
  assert.doesNotMatch(html, />Ask an Expert</);
});

test('Kariv-owned product shows Counter Offer without dealer actions or ownership disclosure', () => {
  const html = renderProduct({ ...baseProduct, dealerId: null });

  assert.match(html, />Counter Offer</);
  assert.doesNotMatch(html, />Contact Seller</);
  assert.doesNotMatch(html, />Request a quote</);
  assert.match(html, />Make an offer</);
  assert.doesNotMatch(html, /Sold by Kariv Glamour/);
  assert.doesNotMatch(html, /Kariv-owned inventory/);
  assert.doesNotMatch(html, /href="\/customer-service"/);
  assert.match(html, /Your offer \(EUR\)/);
  assert.match(html, /Message \(optional\)/);
  assert.match(html, />Submit offer</);
});

test('all storefront languages define the seller contact action labels', () => {
  const requiredKeys = [
    'button',
    'title',
    'description',
    'requestQuote',
    'requestQuoteDescription',
    'makeOffer',
    'makeOfferDescription',
    'submit',
  ];

  for (const locale of ['en', 'de', 'cs']) {
    const contact = localeFiles[locale].pages?.productDetail?.sellerContact;
    for (const key of requiredKeys) {
      assert.equal(typeof contact?.[key], 'string', `${locale} sellerContact.${key} must exist`);
      assert.ok(contact[key].trim(), `${locale} sellerContact.${key} must not be empty`);
    }
  }
});

test('all storefront languages define the Kariv counter-offer form', () => {
  const formKeys = [
    'title', 'description', 'offerAmount', 'messageLabel', 'messagePlaceholder', 'notice',
    'submit', 'sending', 'sentTitle', 'sentDescription', 'viewOffers', 'signInRequired',
    'signIn', 'register', 'invalidOffer', 'errorTitle', 'errorDescription', 'loading',
  ];
  for (const locale of ['en', 'de', 'cs']) {
    const label = localeFiles[locale].pages?.productDetail?.counterOffer;
    assert.equal(typeof label, 'string', `${locale} productDetail.counterOffer must exist`);
    assert.ok(label.trim(), `${locale} productDetail.counterOffer must not be empty`);
    const form = localeFiles[locale].pages?.productDetail?.karivOffer;
    for (const key of formKeys) {
      assert.equal(typeof form?.[key], 'string', `${locale} productDetail.karivOffer.${key} must exist`);
      assert.ok(form[key].trim(), `${locale} productDetail.karivOffer.${key} must not be empty`);
    }
  }
});

test('product detail delegates wishlist control to the image gallery', () => {
  const detail = readFileSync(new URL('../src/page-content/ProductDetail.jsx', import.meta.url), 'utf8');
  const gallery = readFileSync(new URL('../src/components/product/ProductGallery.jsx', import.meta.url), 'utf8');

  assert.match(detail, /onToggleWishlist=\{\(\) => toggleWishlist\(product\)\}/);
  assert.doesNotMatch(detail, /onClick=\{\(\) => toggleWishlist\(product\)\}/);
  assert.match(gallery, /aria-pressed=\{wishlisted\}/);
  assert.match(gallery, /<Heart/);
  assert.equal((gallery.match(/aria-label=\{labels\.wishlist\}/g) || []).length, 1);
  assert.ok(
    gallery.indexOf('aria-label={labels.wishlist}') > gallery.indexOf('</CarouselContent>'),
    'the single wishlist control must sit above the carousel viewport rather than inside a moving slide',
  );
  assert.ok(
    gallery.indexOf('aria-label={labels.wishlist}') < gallery.indexOf('</Carousel>'),
    'the wishlist control must remain anchored inside the relative carousel root',
  );
  const wishlistButton = gallery.slice(
    gallery.lastIndexOf('<button', gallery.indexOf('aria-label={labels.wishlist}')),
    gallery.indexOf('</button>', gallery.indexOf('aria-label={labels.wishlist}')),
  );
  assert.match(wishlistButton, /className="[^"]*absolute/);
});
