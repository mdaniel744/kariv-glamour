// Shared business rules. Public projections deliberately omit internal IDs/notes.
export const EXTERNAL_SELLER_ID = /^[0-9A-Za-z.~_-]{1,50}$/;
export const MARKETPLACE_POLICY_VERSION = '2026-09-free-eu-v1';
export const SELLER_FIELDS = [
  'public_name', 'legal_name', 'slug', 'registered_address_line_1', 'registered_address_line_2',
  'registered_city', 'registered_postal_code', 'registered_country_code', 'company_registration_number',
  'vat_id', 'public_support_email', 'public_phone', 'website_url', 'logo_url',
  'profile_description_en', 'profile_description_cs', 'profile_description_de',
];
export function sellerValidation(seller, { demoAllowed = false } = {}) {
  if (!seller) return ['missing_seller'];
  const errors = [];
  if (!['marketplace_owned', 'third_party'].includes(seller.seller_type)) errors.push('invalid_seller_type');
  if (seller.is_demo && !demoAllowed) errors.push('demo_seller');
  if (seller.is_demo && seller.merchant_feed_eligible) errors.push('demo_feed_eligible');
  if (seller.seller_type === 'marketplace_owned' && seller.external_seller_id) errors.push('owned_external_id');
  if (seller.seller_type === 'third_party' && !EXTERNAL_SELLER_ID.test(seller.external_seller_id || '')) errors.push('invalid_external_seller_id');
  if (!seller.is_demo) {
    for (const field of ['public_name', 'legal_name', 'slug', 'registered_address_line_1', 'registered_city',
      'registered_postal_code', 'registered_country_code', 'company_registration_number', 'public_support_email']) {
      if (typeof seller[field] !== 'string' || !seller[field].trim()) errors.push('missing_' + field);
    }
    if (!/^[A-Z]{2}$/.test(seller.registered_country_code || '')) errors.push('invalid_country');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(seller.public_support_email || '')) errors.push('invalid_email');
    for (const field of ['professional_seller_confirmed_at', 'accepted_free_eu_shipping_at',
      'accepted_returns_policy_at', 'accepted_warranty_rules_at']) {
      if (!seller[field] || !Number.isFinite(Date.parse(seller[field]))) errors.push('missing_' + field);
    }
  }
  for (const field of ['logo_url', 'website_url']) {
    if (seller[field] && !/^https:\/\/[^\s]+$/i.test(seller[field])) errors.push('invalid_' + field);
  }
  return [...new Set(errors)];
}
export function isSellerPublic(seller, { demoAllowed = false } = {}) {
  return Boolean(seller && seller.approval_status === 'approved' && !seller.deleted_at &&
    (!seller.is_demo || demoAllowed) && seller.public_name && seller.legal_name);
}
export function isVerifiedSeller(seller) {
  return isSellerPublic(seller) && Boolean(seller.professional_seller_confirmed_at);
}
export function publicSeller(seller, options) {
  if (!isSellerPublic(seller, options)) return null;
  return Object.fromEntries(['user_id', 'seller_type', ...SELLER_FIELDS, 'professional_seller_confirmed_at',
    'approval_status', 'is_demo', 'average_rating', 'review_count', 'rating_distribution']
    .map(key => [key, seller[key] ?? null]));
}
export function sellerDisplayName(seller) {
  return seller?.seller_type === 'marketplace_owned' ? seller.legal_name : seller?.public_name || seller?.legal_name || '';
}
export function canPurchaseFromSeller(product, options) {
  return Boolean(isSellerPublic(product?.seller, options) &&
    (product.ownershipVerificationStatus === 'verified' ||
      (options?.demoAllowed && product.ownershipVerificationStatus === 'demo')));
}
export function sellerSnapshot(seller) {
  return {
    ...Object.fromEntries(['user_id', 'seller_type', ...SELLER_FIELDS, 'professional_seller_confirmed_at']
      .map(key => [key, seller[key] ?? null])),
    policy_version: MARKETPLACE_POLICY_VERSION,
    external_seller_id: seller.external_seller_id || null,
  };
}
export function publicSellerSnapshot(snapshot) {
  if (!snapshot) return null; // Legacy orders are explicitly unknown.
  return Object.fromEntries(['user_id', 'seller_type', ...SELLER_FIELDS, 'professional_seller_confirmed_at', 'policy_version']
    .filter(key => Object.hasOwn(snapshot, key)).map(key => [key, snapshot[key]]));
}
export function sellerOrganization(seller, url) {
  if (!isSellerPublic(seller)) return undefined;
  return {
    '@type': 'Organization', name: sellerDisplayName(seller), legalName: seller.legal_name,
    url, email: seller.public_support_email || undefined, telephone: seller.public_phone || undefined,
    address: {
      '@type': 'PostalAddress', streetAddress: [seller.registered_address_line_1, seller.registered_address_line_2].filter(Boolean).join(', '),
      addressLocality: seller.registered_city, postalCode: seller.registered_postal_code,
      addressCountry: seller.registered_country_code,
    },
  };
}
export function summarizeApprovedReviews(reviews = []) {
  const approved = reviews.filter(r => r.status === 'approved' && !r.deleted_at && Number.isInteger(Number(r.rating)) && Number(r.rating) >= 1 && Number(r.rating) <= 5);
  const distribution = Object.fromEntries([1, 2, 3, 4, 5].map(n => [n, approved.filter(r => Number(r.rating) === n).length]));
  return { totalReviews: approved.length, averageRating: approved.length ? Math.round(approved.reduce((n, r) => n + Number(r.rating), 0) / approved.length * 10) / 10 : 0, distribution };
}
export function groupBySeller(products) {
  const groups = new Map();
  for (const product of products) {
    const id = product.seller?.user_id || 'unresolved';
    if (!groups.has(id)) groups.set(id, { id, seller: product.seller || null, products: [] });
    groups.get(id).products.push(product);
  }
  return [...groups.values()];
}
