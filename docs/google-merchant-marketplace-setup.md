# Google Merchant marketplace setup

Status: application preparation only. No Merchant account conversion, feed submission or approval has been performed.

## Account and feed separation

Kariv-owned inventory belongs in the marketplace's own seller/account structure. Approved third-party inventory belongs in the appropriate multi-seller structure. Each third-party offer carries the dealer's permanent external_seller_id. Owned offers omit that field. Do not create a separate public marketing page about Google's account architecture. Google's marketplace guidance describes these distinctions: [Marketplace setup](https://support.google.com/merchants/answer/14228975?hl=en), [multi-seller accounts](https://support.google.com/merchants/answer/15108683?hl=en).

Some dealers may later require dedicated single-seller handling (for example independent campaign or policy needs). Agree that structure with Google before changing account routing; preserve existing product and seller identifiers. The app does not create accounts, transfer offers between accounts, or manage dealer advertising bills.

## Endpoints after deployment

| Inventory | Czech | German |
|---|---|---|
| Kariv-owned | /feeds/merchant/cs/kariv.xml | /feeds/merchant/de/kariv.xml |
| Third-party | /feeds/merchant/cs/dealers.xml | /feeds/merchant/de/dealers.xml |

Prefix with https://24kariv.com. Routes are dynamic and return no-store XML. Missing database configuration or unavailable Czech exchange rates returns HTTP 503, not a misleading empty successful feed. Invalid locale/group returns 404.

Every export checks publication/stock, explicitly verified ownership, product AND seller feed opt-in, approved/nondeleted/non-demo seller, legal/policy completeness, immutable IDs, genuine localized title/description, image, known condition, brand, URL and price/currency. Exclusions are reported in the main admin Marketplace diagnostics. Different seller group is a normal exclusion when comparing one feed with the whole catalog.

Prices come from the same product pricing helper used by the storefront and checkout. Czech uses the existing CNB conversion and CZK; German requires EUR for this feed. A non-EUR German offer is diagnosed/excluded rather than silently converted differently from its landing page. Czech and German use the same stable feed ID for a watch. Existing valid saved GTIN/MPN are retained; no product identifiers are invented. [Product data specification](https://support.google.com/merchants/answer/7052112?hl=en-GB).

Shipping is zero for CZ/DE, consistent with the owner's free-EU-shipping instruction. Merchant account shipping/returns settings still need to be set separately and matched with each seller's accepted policies.

## Configuration

Runtime uses the existing NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY and NEXT_PUBLIC_STORE_ID. Public canonical links remain 24kariv.com. The service key stays server-side. Google OAuth credentials are not required by these read-only feed routes.

The SQL operator runner additionally requires DATABASE_URL with migration privileges and an explicit NEXT_PUBLIC_STORE_ID. A Supabase service-role API key is not a SQL connection string. Ecom King's configured values do not automatically configure a different local checkout.

Never run demo mode on a production database. Feed diagnostics expose details only through a Clerk super_admin action. The XML necessarily contains Google's required seller ID, but storefront cards, profiles, order displays and JSON-LD never do.

## Validation commands

From repository root (full development dependencies installed):

```powershell
node scripts/marketplace-feeds.mjs --sample
node scripts/marketplace-feeds.mjs --sample --apply
node scripts/marketplace-feeds.mjs --fixture path/to/shaped-catalog-fixture.json
node --test tests/marketplace.test.mjs tests/marketplace-database.test.mjs tests/marketplace-auth.test.mjs
```

Default is dry-run/no output writes. --apply on the feed command writes local fixture XML and diagnostics under ignored reports/marketplace, never uploads. Fixture input is { products: [...], sellers: [...], exchangeRates: ... } using the same shaped catalog fields as the storefront. Sample data is TEST-only, not production offers.

Use /{locale}/admin/marketplace → feeds for live, all-row diagnostics once connected. Reconcile included/excluded counts with the ownership audit. Validate actual landing pages in both languages, images, amounts, stock and seller names before submitting these URLs to Google.

## Manual Merchant Center checklist

1. Verify/claim 24kariv.com in the correct business account; the existing Google ownership meta tag is retained.
2. Request/confirm the suitable marketplace/advanced account configuration with Google. Do not claim that application code completed this.
3. Configure separate own-inventory and third-party multi-seller destinations, IDs, Czech targeting and CZK. Add German targeting/EUR only after the German market is ready.
4. Configure business/contact, shipping (free EU), delivery estimates, returns and seller policies consistently.
5. Submit the matching feeds only after diagnostics and actual seller ownership have been reviewed.
6. Check Merchant diagnostics, account warnings, landing-page crawls and suspended/missing sellers; fix causes before resubmission.

The external identifier's purpose and constraints are described by Google: [external seller ID](https://support.google.com/merchants/answer/11537846?hl=en-GB). It is immutable in this implementation and never derived from names or email addresses.

## Structured data

Offer.seller uses the same visible contractual seller name. Dealer service reviews are not watch reviews, so they never populate Product.aggregateRating or Product.review. Approved third-party profile reviews may populate Organization markup only when visibly displayed. No demo markup or Kariv self-serving aggregate markup is emitted. This is not a guarantee of review-rich-result eligibility. [Merchant listing markup](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing), [review snippet eligibility](https://developers.google.com/search/docs/appearance/structured-data/review-snippet), [structured-data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).

Google retains responsibility for account conversion, policy decisions and approval.
