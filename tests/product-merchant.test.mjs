import test from 'node:test';
import assert from 'node:assert/strict';
import { testSeller } from './fixtures/marketplace.mjs';
import { readFileSync } from 'node:fs';
import {
  buildProductMerchantSchema, getProductAvailability, getProductCondition, getProductPricing,
  merchantPlainText, productIdentifiers, productMetaDescription,
} from '../src/lib/productMerchant.js';
import { selectShopResults } from '../src/lib/shopSearch.js';

const options = { locale: 'en', url: 'https://24kariv.com/en/product/watch' };
const product = {
  seller: testSeller, ownershipVerificationStatus: 'verified',
  id: 'watch', isPublished: true, productTitle_en: 'Example watch', productTitle_de: 'Beispieluhr',
  productDescription_en: '<p>Blue dial &amp; steel case.</p>', productDescription_de: '<p>Blaues Zifferblatt &amp; Stahlgehäuse.</p>',
  price: 3000, salePrice: 2500, currency: 'EUR', stockQuantity: 1, availability: 'In Stock', condition: 'Excellent',
};

test('active price only uses a positive saved sale below a valid regular price', () => {
  assert.equal(getProductPricing(product).price, 2500);
  for (const salePrice of [0, -100, 3000, 4000, Infinity, 'not a price', null]) {
    const pricing = getProductPricing({ ...product, salePrice });
    assert.equal(pricing.price, 3000);
    assert.equal(pricing.salePrice, null);
  }
  assert.equal(getProductPricing({ price: '3000', salePrice: '2500' }).price, 2500);
  assert.equal(getProductPricing({ price: null, salePrice: 2500 }).price, null);
});

test('the product schema and shop sort use the same active amount', () => {
  const a = { ...product, id: 'a', salePrice: 9000 };
  const b = { ...product, id: 'b', price: 4000, salePrice: 2000 };
  assert.deepEqual(selectShopResults([a, b], { sort: 'price_low' }).items.map(({ id }) => id), ['b', 'a']);
  assert.equal(buildProductMerchantSchema(a, options).offers.price, 3000);
  assert.equal(buildProductMerchantSchema(b, options).offers.price, 2000);
  assert.equal(selectShopResults([a], { maxPrice: 3500 }).totalCount, 1);
});

test('schema and display retain the stored currency rather than treating every amount as EUR', () => {
  assert.equal(getProductPricing({ ...product, currency: ' usd ' }).currency, 'USD');
  assert.equal(buildProductMerchantSchema({ ...product, currency: 'USD' }, options).offers.priceCurrency, 'USD');
  assert.equal(getProductPricing({ ...product, currency: '' }).currency, 'EUR');
  assert.equal(getProductPricing({ ...product, currency: 'not-currency' }).currency, null);
});

test('stock zero, missing stock, reservations and coming-soon watches are not advertised as purchasable', () => {
  assert.equal(getProductAvailability(product).inStock, true);
  for (const updates of [
    { stockQuantity: 0 }, { stockQuantity: -1 }, { stockQuantity: null }, { stockQuantity: 'unknown' },
    { availability: 'Reserved' }, { availability: 'Coming Soon' }, { availability: 'Sold' }, { isPublished: false },
  ]) {
    const availability = getProductAvailability({ ...product, ...updates });
    assert.equal(availability.inStock, false);
    assert.equal(availability.schema, 'https://schema.org/OutOfStock');
  }
  assert.equal(getProductAvailability({ ...product, availability: 'Reserved' }).labelKey, 'reserved');
});

test('only explicit known condition evidence is included and unworn never implies new', () => {
  assert.equal(getProductCondition({ condition: 'New' }), 'https://schema.org/NewCondition');
  assert.equal(getProductCondition({ condition: 'Excellent' }), 'https://schema.org/UsedCondition');
  assert.equal(getProductCondition({ condition: 'Refurbished' }), 'https://schema.org/RefurbishedCondition');
  for (const condition of ['Unworn', '', 'Unknown']) assert.equal(getProductCondition({ condition }), undefined);
});

test('only saved MPN and valid GTIN data is supplied, never a made-up reference substitute', () => {
  assert.deepEqual(productIdentifiers({ referenceNumber: '116500LN', gtin: 'not-known', sku: 'N/A', mpn: '' }), {});
  assert.deepEqual(productIdentifiers({ sku: 'KG-1', mpn: '116500LN', gtin: '4006381333931' }), {
    sku: 'KG-1', mpn: '116500LN', gtin13: '4006381333931',
  });
  for (const gtin of ['4006381333932', '0000000000000', '12345', 'https://example.com/gtin/4006381333931']) {
    assert.deepEqual(productIdentifiers({ gtin }), {});
  }
});

test('descriptions are readable plain text without tags, script contents or encoded entities', () => {
  assert.equal(merchantPlainText('<p>Geh&auml;use &amp; Zifferblatt &#8212; 40&nbsp;mm</p><script>bad()</script>'), 'Gehäuse & Zifferblatt — 40 mm');
  assert.equal(merchantPlainText('<style>body {color:red}</style><div>Steel</div>'), 'Steel');
  assert.equal(merchantPlainText('&#x1F550; &#0;'), '🕐');
  for (const locale of ['en', 'de']) {
    const schema = buildProductMerchantSchema(product, { ...options, locale });
    assert.equal(schema.name, product[`productTitle_${locale}`]);
    assert.ok(!schema.description.includes('<p>'));
    assert.ok(!schema.description.includes('&amp;'));
  }
});

test('full product schema keeps the description while meta snippets finish at a word boundary', () => {
  const description = 'A precise description of the particular watch. '.repeat(20);
  const input = { ...product, productDescription_en: `<p>${description}</p>` };
  assert.equal(buildProductMerchantSchema(input, options).description, description.trim());
  const meta = productMetaDescription(input, 'en', 70);
  assert.ok(meta.length <= 70);
  assert.ok(meta.endsWith('…'));
  assert.ok(description.startsWith(meta.slice(0, -1) + ' '));
});

test('missing/invalid price, currency or publication status does not produce a fabricated offer', () => {
  for (const updates of [{ price: null }, { price: 0 }, { price: -1 }, { currency: 'not valid' }, { isPublished: false }]) {
    assert.equal(buildProductMerchantSchema({ ...product, ...updates }, options).offers, undefined);
  }
  assert.equal(buildProductMerchantSchema({ ...product, stockQuantity: 0 }, options).offers.availability, 'https://schema.org/OutOfStock');
});

test('real product images resolve to absolute URLs and unsupported image schemes are excluded', () => {
  const schema = buildProductMerchantSchema({ ...product, productImages: ['/images/watch.png', 'https://cdn.test/watch.png', 'javascript:alert(1)'] }, options);
  assert.deepEqual(schema.image, ['https://24kariv.com/images/watch.png', 'https://cdn.test/watch.png']);
  assert.equal(schema.aggregateRating, undefined);
  assert.equal(schema.offers.priceValidUntil, undefined);
  assert.equal(schema.offers.hasMerchantReturnPolicy, undefined);
});

test('visible product and card prices use the same helpers as structured data and unavailable purchases are disabled', () => {
  const detail = readFileSync(new URL('../src/page-content/ProductDetail.jsx', import.meta.url), 'utf8');
  const card = readFileSync(new URL('../src/components/shared/ProductCard.jsx', import.meta.url), 'utf8');
  for (const source of [detail, card]) {
    assert.match(source, /useStorefrontPricing\(\)/);
    assert.match(source, /getPricing\(product\)/);
    assert.match(source, /formatPrice\(pricing\.price, pricing\.currency\)/);
    assert.doesNotMatch(source, /formatPrice\(product\.(salePrice|price)\)/);
  }
  assert.match(detail, /disabled=\{!canPurchase\}/);
  assert.match(detail, /if \(!canPurchase\) return/);
  const route = readFileSync(new URL('../app/[locale]/product/[slug]/page.jsx', import.meta.url), 'utf8');
  assert.match(route, /buildProductMerchantSchema\(product, \{ locale, url: productUrl, exchangeRates \}\)/);
  assert.doesNotMatch(route, /PreOrder|referenceNumber \|\| undefined|salePrice \|\| product\.price/);
});
