import { localizedField } from './seo.js';
import { stripHtmlToText } from './sanitize.js';

const SCHEMA = 'https://schema.org/';
const CURRENCIES = typeof Intl.supportedValuesOf === 'function' ? new Set(Intl.supportedValuesOf('currency')) : null;
const ENTITIES = {
  amp: '&', quot: '"', apos: "'", nbsp: ' ', lt: '<', gt: '>', copy: '©', reg: '®', trade: '™',
  ndash: '–', mdash: '—', hellip: '…', bull: '•', euro: '€', pound: '£', yen: '¥',
  auml: 'ä', ouml: 'ö', uuml: 'ü', Auml: 'Ä', Ouml: 'Ö', Uuml: 'Ü', szlig: 'ß',
  eacute: 'é', Eacute: 'É', egrave: 'è', agrave: 'à', acirc: 'â', ocirc: 'ô', ccedil: 'ç',
};

export function merchantPlainText(value) {
  const withoutHiddenContent = String(value || '').replace(/<(script|style|template)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, ' ');
  return stripHtmlToText(withoutHiddenContent).replace(/&(#x[0-9a-f]+|#\d+|[a-z][a-z0-9]+);/gi, (entity, name) => {
    if (!name.startsWith('#')) return ENTITIES[name] ?? entity;
    const codePoint = name[1].toLowerCase() === 'x' ? Number.parseInt(name.slice(2), 16) : Number.parseInt(name.slice(1), 10);
    return codePoint > 0 && codePoint <= 0x10ffff && !(codePoint >= 0xd800 && codePoint <= 0xdfff)
      ? String.fromCodePoint(codePoint) : '';
  }).replace(/\s+/g, ' ').trim();
}

export function productMetaDescription(product, locale, maxLength = 320) {
  const text = merchantPlainText(
    localizedField(product, 'metaDescription', locale) || localizedField(product, 'shortDescription', locale) ||
    localizedField(product, 'productDescription', locale)
  );
  if (text.length <= maxLength) return text;
  const excerpt = text.slice(0, maxLength - 1);
  const wordEnd = excerpt.lastIndexOf(' ');
  return `${(wordEnd > 0 ? excerpt.slice(0, wordEnd) : excerpt).trimEnd()}…`;
}

function positiveAmount(value) {
  if (value == null || value === '') return null;
  const amount = Number(value);
  return Number.isFinite(amount) && amount > 0 ? amount : null;
}

export function getProductPricing(product = {}) {
  const regularPrice = positiveAmount(product.price);
  const proposedSale = positiveAmount(product.salePrice);
  const salePrice = regularPrice != null && proposedSale != null && proposedSale < regularPrice ? proposedSale : null;
  const recordedCurrency = String(product.currency || 'EUR').trim().toUpperCase();
  const currency = /^[A-Z]{3}$/.test(recordedCurrency) && (!CURRENCIES || CURRENCIES.has(recordedCurrency))
    ? recordedCurrency : null;
  return { price: salePrice ?? regularPrice, regularPrice, salePrice, currency };
}

export function getProductAvailability(product = {}) {
  const state = String(product.availability || '').trim().toLowerCase();
  const quantity = product.stockQuantity == null || product.stockQuantity === '' ? null : Number(product.stockQuantity);
  const inStock = product.isPublished === true && state === 'in stock' && Number.isFinite(quantity) && quantity > 0;
  return {
    inStock,
    schema: `${SCHEMA}${inStock ? 'InStock' : 'OutOfStock'}`,
    labelKey: inStock ? 'inStock' : state === 'reserved' ? 'reserved' : state === 'coming soon' ? 'comingSoon' :
      state === 'sold' ? 'sold' : 'currentlyUnavailable',
  };
}

export function getProductCondition(product = {}) {
  const condition = String(product.condition || '').trim().toLowerCase();
  if (condition === 'new' || condition === 'neu') return `${SCHEMA}NewCondition`;
  if (['refurbished', 'generalüberholt'].includes(condition)) return `${SCHEMA}RefurbishedCondition`;
  if (['excellent', 'very good', 'good', 'vintage', 'used', 'pre-owned', 'gebraucht'].includes(condition)) return `${SCHEMA}UsedCondition`;
  // Unworn describes wear, not ownership/history. Do not infer a new item.
  return undefined;
}

function knownIdentifier(value) {
  const identifier = typeof value === 'string' ? value.trim() : '';
  return identifier && !/^(?:n\/?a|none|unknown|not available|-+)$/i.test(identifier) ? identifier : undefined;
}

export function productIdentifiers(product = {}) {
  const result = {};
  const sku = knownIdentifier(product.sku);
  const mpn = knownIdentifier(product.mpn);
  if (sku) result.sku = sku;
  if (mpn) result.mpn = mpn;
  // Use only an explicitly saved GTIN with a valid length and check digit.
  // A watch reference is not automatically a GTIN or a verified MPN.
  const gtin = knownIdentifier(product.gtin);
  if (gtin && /^(?:\d{8}|\d{12}|\d{13}|\d{14})$/.test(gtin) && !/^0+$/.test(gtin)) {
    const reversed = [...gtin].reverse().map(Number);
    const sum = reversed.reduce((total, digit, index) => total + digit * (index % 2 ? 3 : 1), 0);
    if (sum % 10 === 0) result[`gtin${gtin.length}`] = gtin;
  }
  return result;
}

export function buildProductMerchantSchema(product, { locale, url }) {
  const pricing = getProductPricing(product);
  const availability = getProductAvailability(product);
  const images = [...new Set([
    ...(Array.isArray(product.productImages) ? product.productImages : []), product.featuredImage,
  ].map((image) => {
    if (typeof image !== 'string' || !image.trim()) return null;
    try {
      const resolved = new URL(image, url);
      return ['https:', 'http:'].includes(resolved.protocol) ? resolved.href : null;
    } catch { return null; }
  }).filter(Boolean))];
  const description = merchantPlainText(localizedField(product, 'productDescription', locale) || localizedField(product, 'shortDescription', locale));
  return {
    '@context': SCHEMA.slice(0, -1), '@type': 'Product', '@id': `${url}#product`,
    name: merchantPlainText(localizedField(product, 'productTitle', locale)),
    description: description || undefined,
    image: images.length ? images : undefined,
    ...productIdentifiers(product),
    brand: product.brand ? { '@type': 'Brand', name: product.brand } : undefined,
    category: 'Luxury Watches',
    ...(product.isPublished === true && pricing.price != null && pricing.currency ? {
      offers: {
        '@type': 'Offer', url, price: pricing.price, priceCurrency: pricing.currency,
        availability: availability.schema, itemCondition: getProductCondition(product),
      },
    } : {}),
  };
}
