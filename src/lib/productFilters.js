import { getProductPricing } from './productMerchant.js';

function toArray(value) {
  if (Array.isArray(value)) return value;
  return value === null || value === undefined || value === '' ? [] : [value];
}

export function normalizeFilterValue(value) {
  return String(value ?? '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function matchesSelectedValues(candidates, selectedValues, { contains = false } = {}) {
  const selected = toArray(selectedValues).map(normalizeFilterValue).filter(Boolean);
  if (!selected.length) return true;

  const normalizedCandidates = toArray(candidates).map(normalizeFilterValue).filter(Boolean);
  return selected.some((requested) => normalizedCandidates.some((candidate) => (
    contains ? candidate.includes(requested) : candidate === requested
  )));
}

export function canonicalizeGender(value) {
  const normalized = normalizeFilterValue(value);
  const aliases = {
    women: ['women', 'woman', 'womens', 'women s', 'female', 'lady', 'ladies', 'damen', 'damenuhr', 'damenuhren'],
    men: ['men', 'man', 'mens', 'men s', 'male', 'gentleman', 'gentlemen', 'herren', 'herrenuhr', 'herrenuhren'],
    unisex: ['unisex'],
  };

  for (const [canonical, values] of Object.entries(aliases)) {
    if (values.includes(normalized)) return canonical;
  }
  return normalized;
}

function matchesGender(productGender, selectedGenders) {
  const selected = toArray(selectedGenders).map(canonicalizeGender).filter(Boolean);
  if (!selected.length) return true;
  return selected.includes(canonicalizeGender(productGender));
}

const MODEL_FILTER_RULES = {
  datejust: {
    aliases: ['datejust'],
    excludes: ['lady datejust', 'datejust lady'],
  },
  'cosmograph daytona': {
    aliases: ['cosmograph daytona', 'daytona'],
  },
  'royal oak': {
    aliases: ['royal oak'],
    excludes: ['royal oak offshore', 'royal oak concept'],
  },
  'santos de cartier': {
    aliases: ['santos de cartier', 'santos'],
    excludes: ['santos dumont'],
  },
};

function matchesModelFamilies(product, selectedModels) {
  const selected = toArray(selectedModels).map(normalizeFilterValue).filter(Boolean);
  if (!selected.length) return true;

  const candidates = [
    product.collection,
    product.model,
    product.productTitle,
    product.productTitle_en,
    product.productTitle_de,
    product.productTitle_cs,
  ].map(normalizeFilterValue).filter(Boolean);

  return selected.some((requested) => {
    const rule = MODEL_FILTER_RULES[requested] || { aliases: [requested] };
    const matchesAlias = rule.aliases.some((alias) => (
      candidates.some((candidate) => candidate.includes(alias))
    ));
    const matchesExcludedFamily = (rule.excludes || []).some((excluded) => (
      candidates.some((candidate) => candidate.includes(excluded))
    ));

    return matchesAlias && !matchesExcludedFamily;
  });
}

export function isTrueProductFlag(value) {
  if (value === true || value === 1) return true;
  return ['true', '1', 'yes', 'on'].includes(normalizeFilterValue(value));
}

function effectivePrice(product, payload) {
  return getProductPricing(product, payload).price;
}

function searchWords(value) {
  return normalizeFilterValue(String(value ?? '').replace(/<[^>]*>/g, ' ')).split(' ').filter(Boolean);
}

function hasSearchTerm(words, term, allowShortPrefix = false) {
  return words.some((word) => word === term || (term.length >= (allowShortPrefix ? 3 : 5) && word.startsWith(term)));
}

// A brand mentioned in another seller's description is not evidence that the
// watch is made by that brand. The shop passes a brand constraint when the
// shopper explicitly names one of the catalogue's brands.
export function productSearchScore(product, query, requiredBrand = '') {
  const requested = normalizeFilterValue(query);
  if (!requested) return 0;

  const titles = [
    product.productTitle,
    product.productTitle_en,
    product.productTitle_de,
    product.productTitle_cs,
  ].map((value) => searchWords(value));
  const titlePhrases = titles.map((words) => words.join(' '));
  if (requiredBrand && normalizeFilterValue(product.brand) !== requiredBrand) {
    // A few legacy watches have no brand relation, but clearly name their
    // maker in the title. Never admit an explicitly different brand here.
    if (product.brand || !titlePhrases.some((title) => ` ${title} `.includes(` ${requiredBrand} `))) return -1;
  }
  const titleWords = titles.flat();
  const brandWords = searchWords(product.brand);
  const detailWords = [product.collection, product.model, product.referenceNumber]
    .flatMap((value) => searchWords(value));
  const descriptionWords = [
    product.productDescription,
    product.productDescription_en,
    product.productDescription_de,
    product.productDescription_cs,
  ].flatMap((value) => searchWords(value));
  const brandTerms = new Set(requiredBrand.split(' '));
  const terms = requested.split(' ');
  let score = 0;

  // Every keyword must match a real word (or a useful prefix), but keywords
  // may be spread across title, description, brand, model and reference.
  for (const term of terms) {
    if (hasSearchTerm(titleWords, term, true)) score += brandTerms.has(term) ? 100 : 200;
    else if (hasSearchTerm(brandWords, term, true)) score += 60;
    else if (hasSearchTerm(detailWords, term, true)) score += 40;
    else if (hasSearchTerm(descriptionWords, term)) score += 5;
    else return -1;
  }
  if (titlePhrases.some((title) => title.includes(requested))) score += 500;
  const modelTerms = terms.filter((term) => !brandTerms.has(term));
  if (modelTerms.length && modelTerms.every((term) => hasSearchTerm(titleWords, term, true))) score += 100;
  return score;
}

function matchesSearch(product, query) {
  return productSearchScore(product, query) >= 0;
}

export function productMatchesSearchPayload(product, payload) {
  if (!matchesSelectedValues(product.brand, payload.brands)) return false;
  if (!matchesModelFamilies(product, payload.models)) return false;

  // Older and dealer-created listings may have the watch family in the
  // model/title while their collection relation is empty. Treat the landing
  // page's collection parameter as a family query across all three fields.
  if (!matchesSelectedValues([
    product.collection,
    product.model,
    product.productTitle,
    product.productTitle_en,
    product.productTitle_de,
    product.productTitle_cs,
  ], payload.collections, { contains: true })) return false;

  if (!matchesSelectedValues(product.condition, payload.conditions)) return false;
  if (!matchesSelectedValues(product.availability, payload.availability)) return false;
  if (!matchesGender(product.gender, payload.genders)) return false;
  if (!matchesSelectedValues(product.caseMaterial, payload.materials, { contains: true })) return false;
  if (!matchesSelectedValues(product.dialColor, payload.dialColors)) return false;
  if (!matchesSelectedValues(product.movementType, payload.movementTypes, { contains: true })) return false;
  if (payload.isNewArrival === true && !isTrueProductFlag(product.isNewArrival)) return false;
  if (payload.isCertifiedPreOwned === true && !isTrueProductFlag(product.isCertifiedPreOwned)) return false;
  if (payload.isVintage === true && !(
    isTrueProductFlag(product.isVintage) ||
    normalizeFilterValue(product.condition) === 'vintage'
  )) return false;

  const price = effectivePrice(product, payload);
  if (price == null && (payload.minPrice != null || payload.maxPrice != null)) return false;
  if (payload.minPrice !== null && payload.minPrice !== undefined && price < payload.minPrice) return false;
  if (payload.maxPrice !== null && payload.maxPrice !== undefined && price > payload.maxPrice) return false;

  const productionYear = Number(product.yearOfProduction || 0);
  if (payload.yearFrom !== null && payload.yearFrom !== undefined && productionYear < payload.yearFrom) return false;
  if (payload.yearTo !== null && payload.yearTo !== undefined && productionYear > payload.yearTo) return false;

  return matchesSearch(product, payload.search);
}
