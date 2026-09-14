// GENERATED from marketplace migrations against an isolated PostgreSQL fixture.
// Regenerate with node scripts/marketplace-types.mjs --apply; full shared-DB generation requires its connection.
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface DealerProfilesRow {
  id: string;
  store_id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  seller_type: string;
  public_name: string | null;
  legal_name: string | null;
  slug: string | null;
  external_seller_id: string | null;
  registered_address_line_1: string | null;
  registered_address_line_2: string | null;
  registered_city: string | null;
  registered_postal_code: string | null;
  registered_country_code: string | null;
  company_registration_number: string | null;
  vat_id: string | null;
  public_support_email: string | null;
  public_phone: string | null;
  website_url: string | null;
  logo_url: string | null;
  profile_description_en: string | null;
  profile_description_cs: string | null;
  profile_description_de: string | null;
  professional_seller_confirmed_at: string | null;
  approval_status: string;
  approved_at: string | null;
  approved_by: string | null;
  merchant_feed_eligible: boolean;
  accepted_free_eu_shipping_at: string | null;
  accepted_returns_policy_at: string | null;
  accepted_warranty_rules_at: string | null;
  is_demo: boolean;
  deleted_at: string | null;
}

export interface DealerReviewsRow {
  id: string;
  store_id: string;
  dealer_user_id: string;
  buyer_user_id: string;
  buyer_name: string;
  order_id: string;
  rating: number | null;
  title: string;
  review_text: string;
  status: string;
  reviewed_by: string | null;
  reviewed_at: string | null;
  created_at: string | null;
  updated_at: string | null;
  locale: string;
  is_verified_purchase: boolean;
  internal_moderation_reason: string | null;
  deleted_at: string | null;
}

export interface DealerStaffRow {
  store_id: string;
  dealer_user_id: string;
  user_id: string;
}

export interface MarketplaceAuditRow {
  id: string;
  store_id: string;
  entity_type: string;
  entity_id: string;
  actor_id: string;
  reason: string;
  before_data: Json | null;
  after_data: Json | null;
  created_at: string;
}

export interface MarketplaceIdentifierRegistryRow {
  store_id: string;
  kind: string;
  identifier: string;
  entity_key: string;
  created_at: string;
}

export interface MarketplaceSellerCountersRow {
  store_id: string;
  last_value: number;
}

export interface MarketplaceSettingsRow {
  store_id: string;
  environment: string;
  enabled: boolean;
  policy_version: string;
}
