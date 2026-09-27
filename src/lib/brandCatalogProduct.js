const UNUSED_BRAND_PAGE_FIELDS = [
  'productDescription', 'productDescription_en', 'productDescription_de', 'productDescription_cs',
  'shortDescription', 'shortDescription_en', 'shortDescription_de', 'shortDescription_cs',
  'metaDescription', 'metaDescription_en', 'metaDescription_de', 'metaDescription_cs',
  'imageTitles', 'imageAlts', 'imageDescriptions',
];

// Brand grids use product attributes and galleries, but not the long copy
// reserved for the individual product page. Avoid serializing it for every
// watch in a large brand catalogue.
export function brandCatalogProduct(product) {
  const summary = { ...product };
  for (const field of UNUSED_BRAND_PAGE_FIELDS) delete summary[field];
  return summary;
}
