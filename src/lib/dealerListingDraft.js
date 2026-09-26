// Dealer listings use the same flexible attribute vocabulary as the Ecom
// product editor. These shortcuts simply make common watch details faster to
// enter; every other configured attribute remains available in the editor.
export const WATCH_ATTRIBUTE_FIELDS = [
  ['condition', 'Condition'],
  ['model', 'Model'],
  ['gender', 'Gender'],
  ['yearOfProduction', 'Year of Production'],
  ['caseDiameter', 'Case Diameter'],
  ['caseMaterial', 'Case Material'],
  ['braceletMaterial', 'Bracelet Material'],
  ['dialColor', 'Dial Color'],
  ['watchShape', 'Watch Shape'],
  ['movementType', 'Movement Type'],
  ['functions', 'Functions'],
  ['waterResistance', 'Water Resistance'],
  ['crystalType', 'Crystal Type'],
  ['powerReserve', 'Power Reserve'],
  ['serviceHistory', 'Service History'],
  ['polishedStatus', 'Polished Status'],
  ['originalPartsStatus', 'Original Parts Status'],
  ['warrantyType', 'Warranty Type'],
  ['warrantyDuration', 'Warranty Duration'],
  ['scopeOfDelivery', 'Scope of Delivery'],
];

const SHORTCUT_KEYS = new Set([
  ...WATCH_ATTRIBUTE_FIELDS.map(([, name]) => name.toLowerCase()),
  'collection', 'authentication', 'box included', 'papers included',
  'isnewarrival', 'iscertifiedpreowned', 'isvintage',
]);

export function emptyDealerListing() {
  return {
    productTitle: '', brand: '', collection: '', model: '', referenceNumber: '',
    condition: 'Excellent', merchantCondition: 'used', yearOfProduction: '',
    gender: 'Men', caseDiameter: '', caseMaterial: '', braceletMaterial: '',
    dialColor: '', watchShape: 'Round', movementType: '', functions: '',
    waterResistance: '', crystalType: '', powerReserve: '', serviceHistory: '',
    polishedStatus: '', originalPartsStatus: '', warrantyType: '',
    warrantyDuration: '', scopeOfDelivery: '', boxIncluded: false,
    papersIncluded: false, isNewArrival: false, isCertifiedPreOwned: false,
    isVintage: false, productDescription: '', shortDescription: '',
    metaTitle: '', metaDescription: '', price: '', salePrice: '',
    currency: 'EUR', stockQuantity: 1, categoryId: '', sku: '', mpn: '',
    badge: '', googleProductCategory: '', googleMerchantTitle: '',
    googleMerchantDescription: '', productImages: [], imageTitles: [],
    imageAlts: [], imageDescriptions: [], customAttributes: [],
  };
}

export function dealerListingFromProduct(product) {
  const attributes = product?.attributes || {};
  return {
    ...emptyDealerListing(),
    ...product,
    productTitle: product.productTitle_en || product.productTitle || '',
    shortDescription: product.shortDescription_en || product.shortDescription || '',
    productDescription: product.productDescription_en || product.productDescription || '',
    metaTitle: product.metaTitle_en || product.metaTitle || '',
    metaDescription: product.metaDescription_en || product.metaDescription || '',
    price: product.price ?? '',
    salePrice: product.salePrice ?? '',
    customAttributes: Object.entries(attributes)
      .filter(([key, value]) => !SHORTCUT_KEYS.has(key.toLowerCase()) && typeof value === 'string')
      .map(([key, value]) => ({ key, value })),
  };
}

export function validateDealerListing(draft) {
  if (!String(draft.productTitle || '').trim()) return 'Add a watch title.';
  if (!String(draft.brand || '').trim()) return 'Select a brand.';
  if (!String(draft.collection || '').trim()) return 'Select a collection.';
  if (!Number.isFinite(Number(draft.price)) || Number(draft.price) <= 0) return 'Enter a price above zero.';
  if (!Number.isInteger(Number(draft.stockQuantity)) || Number(draft.stockQuantity) < 0) return 'Stock must be a whole number of zero or more.';
  if (draft.salePrice !== '' && draft.salePrice != null &&
      (!Number.isFinite(Number(draft.salePrice)) || Number(draft.salePrice) <= 0 || Number(draft.salePrice) >= Number(draft.price))) {
    return 'Sale price must be above zero and below the regular price.';
  }
  if (draft.productImages.length > 20) return 'Use no more than 20 photos per watch.';
  const names = new Set();
  for (const { key, value } of draft.customAttributes || []) {
    if (!String(key || '').trim() && !String(value || '').trim()) continue;
    if (!String(key || '').trim() || !String(value || '').trim()) return 'Each extra attribute needs a name and value.';
    const normalized = String(key).trim().toLowerCase();
    if (SHORTCUT_KEYS.has(normalized)) return `Use the watch-details field for ${key}.`;
    if (names.has(normalized)) return `Remove the duplicate ${key} attribute.`;
    names.add(normalized);
  }
  return null;
}

export function dealerListingPayload(draft) {
  const attributes = {};
  for (const { key, value } of draft.customAttributes || []) {
    if (String(key || '').trim() && String(value || '').trim()) {
      attributes[String(key).trim()] = String(value).trim();
    }
  }
  return {
    ...draft,
    customAttributes: undefined,
    attributes,
    sourceLocale: 'en',
    productTitle: String(draft.productTitle).trim(),
    productTitle_en: String(draft.productTitle).trim(),
    shortDescription_en: String(draft.shortDescription || '').trim(),
    productDescription_en: String(draft.productDescription || '').trim(),
    metaTitle_en: String(draft.metaTitle || '').trim(),
    metaDescription_en: String(draft.metaDescription || '').trim(),
    price: Number(draft.price),
    salePrice: draft.salePrice === '' || draft.salePrice == null ? null : Number(draft.salePrice),
    stockQuantity: Number(draft.stockQuantity),
    yearOfProduction: draft.yearOfProduction ? Number(draft.yearOfProduction) : '',
    imageTitles: draft.productImages.map((_, index) => draft.imageTitles?.[index] || ''),
    imageAlts: draft.productImages.map((_, index) => draft.imageAlts?.[index] || ''),
    imageDescriptions: draft.productImages.map((_, index) => draft.imageDescriptions?.[index] || ''),
    // Approval and homepage merchandising are never dealer-controlled.
    authenticationStatus: undefined,
    isFeatured: undefined,
    featured: undefined,
  };
}

export async function saveDealerListingBatch(drafts, createListing, onProgress = () => {}) {
  const failures = [];
  const warnings = [];
  let created = 0;
  for (let index = 0; index < drafts.length; index += 1) {
    onProgress(index + 1, drafts.length);
    try {
      const result = await createListing(dealerListingPayload(drafts[index]));
      created += 1;
      if (result.translationWarning) warnings.push(result.translationWarning);
    } catch (error) {
      failures.push({ draft: drafts[index], error: error?.message || 'Could not save this watch.' });
    }
  }
  return { created, failures, warnings };
}
