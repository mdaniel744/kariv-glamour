/**
 * Same slug convention used by AdminProducts/AdminBrands/AdminCollections/AdminGuides:
 * lowercase, non-alphanumeric runs collapsed to a single hyphen.
 */
export function slugify(text) {
  return (text || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

/**
 * A product's canonical slug. Only 8 of 35 live products have a real
 * `slug` value in Base44 today — the rest fall back to a slug generated
 * from the title so every product still resolves to a stable URL.
 */
export function productSlug(product) {
  return product?.slug || slugify(product?.productTitle) || product?.id || '';
}
