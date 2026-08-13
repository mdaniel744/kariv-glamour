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

export function isTrueProductFlag(value) {
  if (value === true || value === 1) return true;
  return ['true', '1', 'yes', 'on'].includes(normalizeFilterValue(value));
}

function effectivePrice(product) {
  const regularPrice = Number(product.price);
  const salePrice = Number(product.salePrice);
  if (Number.isFinite(salePrice) && salePrice > 0) return salePrice;
  return Number.isFinite(regularPrice) ? regularPrice : 0;
}

function matchesSearch(product, query) {
  const requested = normalizeFilterValue(query);
  if (!requested) return true;

  return [
    product.productTitle,
    product.productTitle_en,
    product.productTitle_de,
    product.brand,
    product.collection,
    product.model,
    product.referenceNumber,
    product.productDescription,
    product.productDescription_en,
    product.productDescription_de,
  ].some((value) => normalizeFilterValue(value).includes(requested));
}

export function productMatchesSearchPayload(product, payload) {
  if (!matchesSelectedValues(product.brand, payload.brands)) return false;

  // Older and dealer-created listings may have the watch family in the
  // model/title while their collection relation is empty. Treat the landing
  // page's collection parameter as a family query across all three fields.
  if (!matchesSelectedValues([
    product.collection,
    product.model,
    product.productTitle,
    product.productTitle_en,
    product.productTitle_de,
  ], payload.collections, { contains: true })) return false;

  if (!matchesSelectedValues(product.condition, payload.conditions)) return false;
  if (!matchesSelectedValues(product.availability, payload.availability)) return false;
  if (!matchesGender(product.gender, payload.genders)) return false;
  if (!matchesSelectedValues(product.caseMaterial, payload.materials, { contains: true })) return false;
  if (!matchesSelectedValues(product.dialColor, payload.dialColors)) return false;
  if (!matchesSelectedValues(product.movementType, payload.movementTypes, { contains: true })) return false;
  if (payload.isNewArrival === true && !isTrueProductFlag(product.isNewArrival)) return false;
  if (payload.isCertifiedPreOwned === true && !isTrueProductFlag(product.isCertifiedPreOwned)) return false;
  if (payload.isVintage === true && !isTrueProductFlag(product.isVintage)) return false;

  const price = effectivePrice(product);
  if (payload.minPrice !== null && payload.minPrice !== undefined && price < payload.minPrice) return false;
  if (payload.maxPrice !== null && payload.maxPrice !== undefined && price > payload.maxPrice) return false;

  const productionYear = Number(product.yearOfProduction || 0);
  if (payload.yearFrom !== null && payload.yearFrom !== undefined && productionYear < payload.yearFrom) return false;
  if (payload.yearTo !== null && payload.yearTo !== undefined && productionYear > payload.yearTo) return false;

  return matchesSearch(product, payload.search);
}
