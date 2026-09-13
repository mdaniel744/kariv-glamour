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

function matchesSearch(product, query) {
  const requested = normalizeFilterValue(query);
  if (!requested) return true;

  const searchable = [
    product.productTitle,
    product.productTitle_en,
    product.productTitle_de,
    product.productTitle_cs,
    product.brand,
    product.collection,
    product.model,
    product.referenceNumber,
    product.productDescription,
    product.productDescription_en,
    product.productDescription_de,
    product.productDescription_cs,
  ].map((value) => normalizeFilterValue(String(value ?? '').replace(/<[^>]*>/g, ' '))).join(' ');
  // A shopper may enter a brand and a reference saved in separate fields,
  // or words in a different order from the listing title. Every search term
  // must match, but they need not be one contiguous phrase in a single field.
  return requested.split(' ').every((term) => searchable.includes(term));
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
