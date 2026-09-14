# Marketplace implementation audit

Audit date: 14 September 2026. This is the pre-change audit.

## Observed architecture

- Next.js 15 App Router, React 18, Tailwind/Radix, Poppins design tokens.
- Supabase Postgres is shared across tenants. Every new read and write must be scoped to Kariv's configured store_id.
- Clerk supplies customer/dealer identities. Roles are buyer, dealer, admin and super_admin. super_admin is the highest existing role.
- products.dealer_id is the existing seller reference (Clerk user ID, text). orders.dealer_user_id and dealer_reviews.dealer_user_id use the same identity.
- dealer_profiles is planned but deferred; the current profile editor uses an unavailable compatibility entity. Public profiles currently fall back to application/Clerk information.
- One existing migration defines dealer_reviews. No checked-in complete database schema or generated database types are present.
- dealer_reviews already requires a qualifying order (verified/funds_released), pending moderation, rating 1–5, and a unique order. Preserve the purchase requirement under the brief's existing-business-rule exception.
- Dealer role/application approval belongs to the external Ecom King dashboard. This implementation will manage marketplace profile approval using super_admin, without changing application approvals or granting Clerk roles.
- Czech, German and English already work through react-i18next, locale routes and catalog translations. Preserve English.
- ProductCard is shared across catalog grids; ProductDealerCard is the detail seller card. Cart currently places one watch per checkout; keep that payment contract and group cart display by seller.
- orders.products stores JSON line items; use immutable seller_snapshot on these line items. Historical orders currently have dealer_user_id but no legal seller snapshot.
- No invoice generator or transactional email sender exists in this repository. Payment instructions/order portal are present; external Ecom King owns the bank instructions and email/invoice work.
- Product/Offer JSON-LD is in productMerchant.js; dealer ratings currently use Store markup. No Merchant feed exporter exists.
- Public catalog uses short Next caches and reference caches. Notifications poll every 45 seconds; use that existing polling pattern for rating refresh.
- Current commands: npm test, npm run lint, npm run typecheck, npm run build. The old AGENTS.md statement that there is no test suite is outdated.

## Database counts and access

No .env.local or process Supabase/store/database credentials are configured in this checkout. No database connector is available. Consequently **actual total, per-dealer counts, null dealer count, status/stock counts, dealer approval counts and review counts are unavailable**. Do not substitute the expected approximately 670 for a measured database total.

The user subsequently confirmed that the variables were added in Ecom King, not this checkout. Those settings do not automatically become available to this process. No credentials were extracted from another application, no real database migration was attempted, and no production ownership was assigned.

The preceding live-site audit found 670 English/German product sitemap entries and 629 Czech entries. Those are public sitemap counts, not an all-status database inventory, and cannot establish legal ownership or the number of real dealers. The exact discrepancy from 670 must be calculated by the read-only audit command when the intended database is connected.

## Chosen migration

Extend dealer_profiles keyed by (store_id, user_id); preserve products.dealer_id as the only product seller reference. The key also supports an explicit kariv-owned record, without creating a fake Clerk account. Add seller staff membership separately for authorization/self-review checks.

Use transaction-safe counters and a permanent identifier registry, database immutability constraints, soft deletion, scoped triggers and server-only privileged actions. Product ownership starts pending/ambiguous, never inferred from a missing dealer ID. Existing catalog values/statuses/order history are not rewritten.

Additive migrations require an explicit Kariv store setting and are not auto-executed by deployment. Per-store activation records isolate shared-database enforcement. Production backfill accepts reviewed product mappings; demo allocation runs only in an explicitly non-production dataset. Both default to dry-run and save rollback/audit evidence.

Extend dealer_reviews rather than replace it; use super_admin for moderation, transactional audit/rate limits, server-derived purchase checks and approved-only aggregates. Keep private review fields behind the service role.

Store public seller projection in catalog responses; snapshot legal seller identity at order creation. Four XML feeds use the same seller eligibility, localized price and product identifier helpers. Account conversion is manual.

## Existing changes to preserve

The working tree already contains the requested Google verification metadata and free-EU-shipping/address-validation work. These are retained. No commit, push, production migration, role grant or catalog ownership reassignment is implied by this audit.
