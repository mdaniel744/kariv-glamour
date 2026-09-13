import test from 'node:test';
import assert from 'node:assert/strict';
import { parseCnbRates, convertToCzk, isUsableCnbSnapshot, matchesCheckoutPrice } from '../src/lib/currencyConversion.js';
import { getProductPricing, buildProductMerchantSchema } from '../src/lib/productMerchant.js';
import { selectShopResults } from '../src/lib/shopSearch.js';
import { formatPrice } from '../src/lib/constants.js';

const now = Date.parse('2026-09-13T12:00:00Z');
const feed = '11 Sep 2026 #176\nCountry|Currency|Amount|Code|Rate\nEMU|euro|1|EUR|24.260\nJapan|yen|100|JPY|14.100\nUSA|dollar|1|USD|21.500\n';
const rates = parseCnbRates(feed, now);
const options = { locale: 'cs', exchangeRates: rates, now };

test('official CNB format normalizes per-unit rates including 100-unit currencies', () => {
  assert.equal(rates.date, '2026-09-11');
  assert.equal(rates.rates.EUR, 24.26);
  assert.equal(convertToCzk(100, 'JPY', rates, now), 14.1);
  assert.equal(convertToCzk(1000, 'EUR', rates, now), 24260);
  assert.equal(convertToCzk(100.99, 'EUR', rates, now), 2450.02);
});

test('reject malformed, missing, future and stale fixings with no 1:1 fallback', () => {
  for (const bad of ['', '<html>error</html>', feed.replace('24.260', '-1'), feed.replace('1|EUR', '0|EUR'), feed.replace('11 Sep', '31 Feb'), feed.replace('11 Sep', '30 Sep'), feed.replace('11 Sep', '01 Sep')]) assert.throws(() => parseCnbRates(bad, now));
  assert.equal(isUsableCnbSnapshot(rates, now + 10 * 86400000), false);
  assert.equal(convertToCzk(100, 'EUR', null, now), null);
  assert.equal(convertToCzk(100, 'XXX', rates, now), null);
  for (const amount of [null, '', -5, Infinity, NaN, 1e308]) assert.equal(convertToCzk(amount, 'CZK', null, now), null);
  assert.equal(convertToCzk(100, 'CZK', null, now), 100);
});

test('only Czech converts originals and genuine sale prices; no mutation or zero-priced offer', () => {
  const product = { price: 1000, salePrice: 900, currency: 'EUR' };
  const snapshot = structuredClone(product);
  const cz = getProductPricing(product, options);
  assert.equal(cz.price, 21834);
  assert.equal(cz.regularPrice, 24260);
  assert.equal(cz.salePrice, 21834);
  assert.equal(cz.currency, 'CZK');
  assert.deepEqual(cz.conversion, { source_price: 900, source_currency: 'EUR', rate: 24.26, rate_date: '2026-09-11', source: 'CNB' });
  for (const locale of ['en', 'de']) assert.deepEqual(getProductPricing(product, { ...options, locale }), { price: 900, regularPrice: 1000, salePrice: 900, currency: 'EUR' });
  assert.deepEqual(product, snapshot);
  assert.equal(getProductPricing({ price: 0.000001 }, options).price, null);
  assert.equal(getProductPricing(product, { locale: 'cs' }).price, null);
});

test('CZK checkout confirmation cannot be replaced by EUR, strings or manipulated totals', () => {
  const pricing = getProductPricing({ price: 1000 }, options);
  assert.equal(matchesCheckoutPrice(pricing, 24260, 'CZK'), true);
  for (const [amount, currency] of [[1000, 'EUR'], [24260, 'EUR'], ['24260', 'CZK'], [0, 'CZK'], [24259.99, 'CZK'], [Infinity, 'CZK']]) assert.equal(matchesCheckoutPrice(pricing, amount, currency), false);
  assert.equal(matchesCheckoutPrice({ price: null, currency: 'CZK' }, null, 'CZK'), false);
  assert.match(formatPrice(24260, 'CZK', 'cs'), /Kč/);
});

test('Czech search thresholds compare displayed CZK prices including discounted watches', () => {
  const exchangeRates = { ...rates, date: new Date().toISOString().slice(0, 10) };
  const products = [
    { id: 'a', price: 1000, isPublished: true },
    { id: 'b', price: 1500, salePrice: 500, isPublished: true },
  ];
  const result = selectShopResults(products, { locale: 'cs', exchangeRates, minPrice: 10000, maxPrice: 15000 });
  assert.deepEqual(result.items.map(p => p.id), ['b']);
  assert.deepEqual(selectShopResults(products, { locale: 'cs', minPrice: 1 }).items, []);
  assert.deepEqual(selectShopResults(products, { locale: 'en', maxPrice: 700 }).items.map(p => p.id), ['b']);
});

test('Czech structured offers use the same CZK amount and disappear when FX is unavailable', () => {
  const exchangeRates = { ...rates, date: new Date().toISOString().slice(0, 10) };
  const product = { price: 1000, currency: 'EUR', isPublished: true, availability: 'In Stock', stockQuantity: 1, productTitle_cs: 'Hodinky', productDescription_cs: 'Popis hodinek.' };
  const schema = buildProductMerchantSchema(product, { locale: 'cs', exchangeRates, url: 'https://24kariv.com/cs/product/test' });
  assert.equal(schema.offers.priceCurrency, 'CZK');
  assert.equal(schema.offers.price, getProductPricing(product, { locale: 'cs', exchangeRates }).price);
  assert.equal(buildProductMerchantSchema(product, { locale: 'cs', url: 'https://24kariv.com/cs/product/test' }).offers, undefined);
  assert.equal(buildProductMerchantSchema({ ...product, productDescription_cs: '' }, { locale: 'cs', exchangeRates, url: 'https://24kariv.com/cs/product/test' }).offers, undefined);
});
