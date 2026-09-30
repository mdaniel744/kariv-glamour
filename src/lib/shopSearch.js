import { normalizeFilterValue, productMatchesSearchPayload, productSearchScore } from './productFilters.js';
import { getProductPricing } from './productMerchant.js';

export const SHOP_PAGE_SIZE = 24;

const SORT_FIELDS = {
  newest: ['created_date', -1],
  oldest: ['created_date', 1],
  price_low: ['price', 1],
  price_high: ['price', -1],
  name_asc: ['productTitle', 1],
  name_desc: ['productTitle', -1],
};

export function positivePage(value) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 1 ? Math.floor(number) : 1;
}

function sortValue(product, field, locale, exchangeRates) {
  if (field === 'price') {
    return getProductPricing(product, { locale, exchangeRates }).price;
  }
  if (field === 'productTitle') return product[`productTitle_${locale}`] || product.productTitle;
  return product[field];
}

function requestedBrand(products, query) {
  const normalizedQuery = ` ${normalizeFilterValue(query)} `;
  const brands = new Set(products.map((product) => normalizeFilterValue(product.brand)).filter(Boolean));
  const named = [...brands].filter((brand) => normalizedQuery.includes(` ${brand} `));
  return named.length === 1 ? named[0] : '';
}

// Filter the full public catalogue before sorting or taking a display page.
// A display limit must never become the source of the catalogue total.
export function selectShopResults(products, payload = {}) {
  const locale = ['de', 'en', 'cs'].includes(payload.locale) ? payload.locale : 'en';
  const search = normalizeFilterValue(payload.search);
  const sort = payload.sort || (search ? 'relevance' : 'newest');
  const [field, direction] = SORT_FIELDS[sort] || SORT_FIELDS.newest;
  const brand = search ? requestedBrand(products, payload.search) : '';
  const scores = new Map();
  const filterPayload = search ? { ...payload, search: '' } : payload;
  const sorted = products.filter((product) => {
    if (product.isPublished !== true || !productMatchesSearchPayload(product, filterPayload)) return false;
    if (!search) return true;
    const score = productSearchScore(product, payload.search, brand);
    if (score < 0) return false;
    scores.set(product, score);
    return true;
  }).sort((a, b) => {
    if (search && sort === 'relevance') {
      const scoreDifference = scores.get(b) - scores.get(a);
      if (scoreDifference) return scoreDifference;
    }
    const av = sortValue(a, field, locale, payload.exchangeRates);
    const bv = sortValue(b, field, locale, payload.exchangeRates);
    if (av === bv) return String(a.id || '').localeCompare(String(b.id || ''));
    const aMissing = av == null || (typeof av === 'number' && !Number.isFinite(av));
    const bMissing = bv == null || (typeof bv === 'number' && !Number.isFinite(bv));
    if (aMissing && bMissing) return String(a.id || '').localeCompare(String(b.id || ''));
    if (aMissing) return 1;
    if (bMissing) return -1;
    return direction * (typeof av === 'string' ? av.localeCompare(String(bv), locale) : av - bv);
  });

  const pageSize = Math.min(positivePage(payload.pageSize || SHOP_PAGE_SIZE), 48);
  const totalCount = sorted.length;
  const totalPages = Math.ceil(totalCount / pageSize);
  const page = Math.min(positivePage(payload.page), Math.max(1, totalPages));
  const offset = (page - 1) * pageSize;
  return {
    items: sorted.slice(offset, offset + pageSize),
    totalCount,
    totalPages,
    page,
    hasMore: page < totalPages,
  };
}

export async function searchShopProducts(productsEntity, payload) {
  // listPublished caches and shares in-flight public catalogue reads.
  // Deliberately omit a limit: the database loader follows every response page.
  const products = await productsEntity.listPublished();
  return selectShopResults(Array.isArray(products) ? products : [], payload);
}
