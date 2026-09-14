// Non-production test fixture; none of these are real seller credentials/details.
export const testSeller = {
  user_id: 'dealer-1', seller_type: 'third_party', public_name: 'TEST Approved Dealer', legal_name: 'TEST Dealer Company',
  slug: 'test-approved-dealer', external_seller_id: 'kg-seller-0001',
  registered_address_line_1: 'TEST address', registered_city: 'TEST city', registered_postal_code: '00000',
  registered_country_code: 'CZ', company_registration_number: 'TEST-ONLY', public_support_email: 'test@example.invalid',
  approval_status: 'approved', professional_seller_confirmed_at: '2026-01-01T00:00:00Z',
  accepted_free_eu_shipping_at: '2026-01-01T00:00:00Z', accepted_returns_policy_at: '2026-01-01T00:00:00Z',
  accepted_warranty_rules_at: '2026-01-01T00:00:00Z', is_demo: false, merchant_feed_eligible: true,
  logo_url: 'https://example.invalid/test-logo.webp',
};
export const testOwnedSeller = { ...testSeller, user_id: 'kariv-owned', seller_type: 'marketplace_owned',
  public_name: 'TEST Kariv', legal_name: 'TEST marketplace company', external_seller_id: null };
export const testWatch = {
  id: '00000000-0000-4000-8000-000000000001', slug: 'test-watch', productTitle_en: 'TEST watch',
  productDescription_en: 'TEST English description.', productTitle_de: 'TEST Uhr', productDescription_de: 'TEST deutsche Beschreibung.',
  productTitle_cs: 'TEST hodinky', productDescription_cs: 'TEST český popis.',
  brand: 'TEST brand', price: 1000, salePrice: 900, currency: 'EUR', condition: 'Excellent',
  stockQuantity: 1, availability: 'In Stock', isPublished: true, productImages: ['https://example.invalid/test-watch.webp'],
  dealerId: testSeller.user_id, seller: testSeller, ownershipVerificationStatus: 'verified',
  merchantFeedEligible: true, stableFeedId: 'kg-watch-00000000-0000-4000-8000-000000000001',
};
export const testRates = () => ({ source: 'CNB', date: new Date().toISOString().slice(0, 10), rates: { EUR: 24.26, CZK: 1 } });
