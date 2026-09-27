const BRAND_ALIASES = { bvlgari: ['bvlgari', 'bulgari'] };

// Some legacy catalogue rows have the wrong brand_id. Do not promote those
// watches as related links just because the database brand filter found them.
export function matchesBrandIdentity(product, brand) {
  const firstBrandWord = String(brand || '').toLowerCase().split(/[\s-]/)[0];
  if (!firstBrandWord) return false;
  const terms = new Set(String([
    product?.productTitle_en,
    product?.productTitle,
    product?.slug,
  ].filter(Boolean).join(' ')).toLowerCase().split(/[^a-z0-9]+/).filter(Boolean));
  return (BRAND_ALIASES[firstBrandWord] || [firstBrandWord]).some((word) => terms.has(word));
}
