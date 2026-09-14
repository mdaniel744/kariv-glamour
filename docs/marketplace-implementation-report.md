# Marketplace implementation report

Date: 14 September 2026.

## Status and deployment gate

Local implementation and isolated tests are available. **The real staging/production rollout is NOT complete.** This checkout has no Supabase/Clerk environment configuration; the user confirmed the variables exist in Ecom King only. No real catalog audit, profile import, production migration, product assignment, live checkout or Merchant submission was performed. The local changes are prepared for version control; production push remains gated on database readiness.

**Do not deploy this code before reviewing/applying the database migrations and verified ownership mapping.** The storefront intentionally refuses purchases when seller/ownership verification is missing. Deploying it against an unmigrated or unassigned catalog would hide seller data or prevent checkout. Coordinate a maintenance window/transactional rollout with the shared database owner.

## Architecture and implementation

See marketplace-implementation-audit.md for the initial architecture audit.

- Existing Next.js 15 / React / Supabase / Clerk / Tailwind-Radix stack retained.
- dealer_profiles is canonical, keyed by (store_id,user_id). products.dealer_id remains the only seller reference; no conflicting product seller_id field.
- Explicit kariv-owned identity is created by init from existing company facts, as a draft without fabricated acceptance evidence or a fake Clerk account. Its external seller ID is null.
- Permanent sequential kg-seller-NNNN IDs, unique stable kg-watch-UUID IDs and a permanent registry. Seller hard deletion is refused; suspension/soft deletion never recycles identifiers.
- Ownership states, actor/source reason and transaction audit. No automatic assignment to Kariv for missing dealer IDs.
- Database publication/checkout guards, tenant scoping, stale-preview detection and immutable order snapshots.
- Existing verified-purchase review flow extended: pending by default; no self/staff reviews; one active review per user/dealer; five new submissions/hour; editing requeues; short edit cooldown; owner deletion; super_admin moderation with internal reasons and transactional audit.
- Aggregates use all approved/nondeleted reviews, not a capped page. Dealer reviews have sorting/pagination and 45-second refresh. Product seller displays share a batched 45-second poll; order snapshots never use current profile refresh.
- Public projections omit Google IDs, reviewer accounts/emails, order references and moderation notes. Public names/actual legal names are not translated.
- Seller presentation in shared ProductCard, near product purchase controls, seller-grouped cart, checkout, confirmation, customer order detail, admin order detail and payment instructions. Single-watch payment flow is preserved.
- Historical orders without snapshots display an explicit unavailable/legacy explanation. Current dealer details are not silently substituted.
- Clerk lookups skip the canonical Kariv-owned/demo keys because they are not actual Clerk accounts.
- Main admin Marketplace screen: dealer table/edit/approval/suspension/restore, legal/policy validation, counts, ownership CSV export/preview/apply with downloadable before snapshot, moderation, audit and feed diagnostics. Existing dealer application/role approval remains read-only here and belongs to Ecom King.
- Dealer profile editor uses canonical server actions instead of the old unavailable compatibility entity. Dealer changes return profile to pending and disable its feeds. Policy checkboxes record explicit acceptance only; professional verification is administrative.
- Four dynamic feeds and localized seller copy (Czech, German, English). No payouts, commissions, split payments or new authentication/backend introduced.

Public profile routes retain /{locale}/dealer-profile/{user_id}; product URLs are unchanged.

## Migrations and generated types

Prepared, NOT applied to a real database:

1. supabase/migrations/20260914090000_marketplace_sellers.sql
2. supabase/migrations/20260914091000_marketplace_reviews_and_actions.sql

New tables: marketplace_settings, marketplace_seller_counters, marketplace_identifier_registry, dealer_profiles (if absent), dealer_staff, marketplace_audit. Existing products/dealer_reviews gain additive columns. Existing order JSON stores the snapshot without a separate order-item schema.

Foreign keys are used for dealer staff. Seller existence/tenant enforcement on shared products is a scoped trigger rather than a global foreign key: a global constraint would break other stores whose dealers are outside this model. Existing unknown relationships remain intact until reviewed.

Private tables use RLS with no anonymous write policies; privileged actions use the existing service role after Clerk checks. Identifier registry and audit are append-only to that role. Review/ownership RPCs are not executable by anonymous/authenticated database roles. Additional parent-order tenant checks were added to admin message-read and dispute lookup actions.

The first migration refuses an already-existing dealer_profiles table if marketplace_settings is absent. This is deliberate: the unseen shared platform schema/permissions must be reviewed rather than silently taken over. Migrations were exercised with an isolated PostgreSQL fixture, not the actual shared schema. Shared-platform compatibility still needs confirmation.

src/types/marketplace.generated.d.ts is generated from the new migrations in isolated PostgreSQL. It is NOT represented as a production schema dump. The platform owner must regenerate the full shared database types after real migration, using their approved Supabase connection/tooling.

## Measured counts — fixture, not live inventory

The SQL demo command ran against a completely synthetic in-memory PostgreSQL database:

| Measure | Before | After simulated apply |
|---|---:|---:|
| Synthetic products | 670 | 670 |
| Third-party demo dealers | 0 | 18 |
| Demo-assigned products | 0 | 540 |
| Unassigned / ambiguous products | 670 | 130 |
| Feed-enabled products | 0 | 0 |
| Generated reviews | 0 | 0 |

Dealer-by-dealer distribution:

| Stable internal key | Fictional display name | Products |
|---|---|---:|
| demo-dealer-01 | Vltava Time Atelier (Demo) | 30 |
| demo-dealer-02 | Crown & Calibre (Demo) | 30 |
| demo-dealer-03 | Meridian Watch House (Demo) | 30 |
| demo-dealer-04 | Aurelian Timepieces (Demo) | 30 |
| demo-dealer-05 | Bohemian Watch Gallery (Demo) | 30 |
| demo-dealer-06 | Pendulum & Co. (Demo) | 30 |
| demo-dealer-07 | Silver Bridge Watches (Demo) | 30 |
| demo-dealer-08 | Northlight Horology (Demo) | 30 |
| demo-dealer-09 | The Calibre Room (Demo) | 30 |
| demo-dealer-10 | Cedar & Steel Watches (Demo) | 30 |
| demo-dealer-11 | Arc & Anchor Timepieces (Demo) | 30 |
| demo-dealer-12 | Astral Watch Gallery (Demo) | 30 |
| demo-dealer-13 | Heritage Hour Atelier (Demo) | 30 |
| demo-dealer-14 | Velvet Crown Watches (Demo) | 30 |
| demo-dealer-15 | Stonebridge Timepieces (Demo) | 30 |
| demo-dealer-16 | Orion Watch Cabinet (Demo) | 30 |
| demo-dealer-17 | Copper Dial Collective (Demo) | 30 |
| demo-dealer-18 | Evergreen Watch House (Demo) | 30 |

These names are fictional demonstration branding, not verified business identities or invented company registrations. They remain `is_demo=true` and ineligible for production display/feeds. Internal keys, slugs and permanent external seller IDs do not change. Re-running the demo command refreshes older default seed names only, preserves manually customized profiles, audits each actual name change and writes `dealer-changes.json`. The complete before/after seller snapshots are included in the reports. Production names must come from actual vendor records.

Tests rerun the plan on the same database state: zero additional assignments and the same mapping. Extra/new input that would change previous demo mapping is refused. Fixture connections are in-memory and close after the run; JSON/CSV evidence remains under ignored reports/marketplace. This is not the user's selected staging catalog.

The remaining 130 products were deliberately NOT claimed as Kariv-owned without evidence. Public queries/feeds/structured data exclude demo sellers entirely; the demo runner validates the database simulation, not a public staging dealer preview.

Actual live total, current dealer count, missing-owner count, status/stock counts, verified ownership totals and live feed eligibility remain **unavailable**. Prior sitemap counts (670 en/de, 629 cs) are not database counts.

Sample feed fixtures produced one owned and one third-party offer in each language; all were clearly TEST data and never submitted. These are distinct from the all-demo ownership dataset, which has zero eligible offers.

## Operator commands

Use repository root with development dependencies installed. A .env.local is not loaded implicitly by these scripts: export variables through the approved environment or use Node's --env-file=.env.local option.

Required SQL runner configuration: DATABASE_URL, explicit NEXT_PUBLIC_STORE_ID. Also set MARKETPLACE_ENVIRONMENT for init/demo. Demo against a non-fixture database additionally requires MARKETPLACE_DEMO_DATABASE_HOST to exactly match the intended non-production database hostname AND a matching non-production marketplace_settings row. Never label a production database as staging.

Do not paste secrets into chat or commit environment/backup files.

### Isolated verification (no credentials)

```powershell
node scripts/marketplace.mjs demo --fixture --environment development
node scripts/marketplace.mjs demo --fixture --environment development --actor local-fixture-test --apply
node scripts/marketplace-feeds.mjs --sample --apply
node scripts/marketplace-types.mjs --apply
npm test
npm run lint
npm run typecheck
npm run build
```

### Real database, authorized operator only

Every database operation defaults to dry-run. Dry-run schema/assignment operations execute inside a transaction then roll back; reports show the projected after state. Apply requires --apply, --actor and --confirm-store EXACT_TENANT_UUID. Do not copy the placeholder literally.

```powershell
node --env-file=.env.local scripts/marketplace.mjs audit
node --env-file=.env.local scripts/marketplace.mjs migrate
node --env-file=.env.local scripts/marketplace.mjs migrate --apply --actor CLERK_MAIN_ADMIN_ID --confirm-store EXACT_TENANT_UUID
node --env-file=.env.local scripts/marketplace.mjs init --environment staging
node --env-file=.env.local scripts/marketplace.mjs init --environment staging --apply --actor CLERK_MAIN_ADMIN_ID --confirm-store EXACT_TENANT_UUID
node --env-file=.env.local scripts/marketplace.mjs import-dealers --file data/marketplace-dealers.private.json
node --env-file=.env.local scripts/marketplace.mjs assign --file data/marketplace-assignments.private.csv
```

For a production connection use the truthful production environment, never demo. Get the shared database owner's approval before applying schema changes. Copy the 18 blank slots in data/marketplace-dealers.template.json into an ignored private input and fill verified facts. Import creates drafts only and never overwrites existing legal profiles. Confirm each real Clerk dealer account in Ecom King. Use main admin to review legal information/policy evidence before approving.

Review before.json, plan.json, mapping.csv (demo), after.json and summary.json in the timestamped report directory BEFORE using the same command with --apply/--actor/--confirm-store. A changed verified owner additionally requires --allow-verified-override plus a reason. The admin CSV screen also requires a reviewed preview and backup download.

Assignment CSV columns: product_id,seller_id,verification_status,reason. Here seller_id is an import label for the existing dealer_profiles.user_id; the product database column stays dealer_id. CSV/JSON product mapping must come from verified business records.

After approved sellers and reviewed ownership are ready:

```powershell
node --env-file=.env.local scripts/marketplace.mjs activate --confirm-ownership-reviewed yes
node --env-file=.env.local scripts/marketplace.mjs feed-enable --file path/to/reviewed-product-ids.json --reason "Reviewed Merchant eligibility"
```

Preview first, then explicitly apply with the required actor/store flags. Activation enables new publication/checkout guards. Feed opt-in is separate, uses a reviewed ID list, and database validation still refuses ineligible ownership/sellers. The main admin feed diagnostics verify actual translations, prices, conditions and images after flags are enabled.

### Rollback

Keep the timestamped before.json and after.json files together and access-restricted.

```powershell
node --env-file=.env.local scripts/marketplace.mjs rollback --file reports/marketplace/RUN/before.json --after reports/marketplace/RUN/after.json
```

Review the plan/results, then repeat with --apply --actor CLERK_MAIN_ADMIN_ID --confirm-store EXACT_TENANT_UUID. Rollback compares current ownership with that run's after snapshot and refuses intervening changes. It restores only ownership/evidence/feed fields, not product content or historical orders. Immutable generated feed IDs and ID registry entries are retained, never recycled. Dealer profiles are not hard-deleted; suspend/soft-delete through reviewed administrative maintenance.

The before backup covers all products, so unrelated later ownership changes deliberately stop bulk rollback for manual reconciliation. If an old seller is no longer eligible, constraints can also stop rollback; do not bypass them. Structural rollback means reverting application deployment after shared-platform review, not dropping shared tables.

## Verification results

- 190 tests passed, including real migration/trigger tests in isolated WASM PostgreSQL, demo-name refresh/idempotence, permission tests with authenticated/anonymous fixtures, localization, price/feed consistency and existing application regressions.
- Isolated demo command: successful, 18 × 30 = 540 assignments; no real DB connection.
- Four local sample feeds generated and validated. Zero submissions.
- Production build: passed. Existing unused-variable and Next ESLint-plugin warnings remain.
- Lint (quiet/error-level): passed.
- Standalone JavaScript typecheck: NOT passed. Most recent run reported 616 repository-wide diagnostics; new marketplace modules had no matching errors after their fixes. Build success must not be represented as a clean standalone typecheck.
- git diff --check: passed (Windows line-ending notices only).
- No real Supabase integration test, live Clerk sign-in/review moderation E2E, mobile browser workflow, real order/payment test, production schema introspection or live Google validator submission could be performed without the configured environment/approved accounts.
- No existing browser E2E runner was available; isolated server rendering and action/database tests do not replace staging acceptance.

## Remaining data and external work

1. Configure this checkout's environment, or execute the approved operator workflow in Ecom King's authorized environment. Supabase API keys alone do not grant SQL migration access. Shared schema review remains required.
2. Supply/verify actual product-to-dealer mapping; import real dealers; reconcile legacy ambiguous ownership without guessing. The business target of 540 third-party products is not evidence of ownership.
3. Kariv facts reused: Kariv Glamour s.r.o.; Sokolovská 428/130, Karlín, 18600 Praha, CZ; IČO 03964761; VAT CZ03964761; info@karivglamour.com. No phone number or professional/policy confirmation was fabricated. Determine any required public phone and genuine acceptance evidence before approval.
4. Real dealers' company/contact/policy data are still missing locally. Registered sellers must be professional businesses before using the verification badge.
5. Existing reviews need a matching-order audit before backfilling the new verified-purchase flag. Existing approved text/ratings were not deleted. Duplicated legacy active reviews require human review, not arbitrary removal.
6. Add dealer staff memberships from actual authorized accounts; do not infer employees from names/email.
7. Ecom King must respect canonical seller references, ownership checks and snapshots in its imports/listing/publication/order workflows. Database guards are the final enforcement layer; missing data should be resolved there, not bypassed.
8. Transactional emails/invoices and detailed payment/return/complaint templates are outside this repo. Ecom King must render each order item's saved seller_snapshot fields (excluding external_seller_id), not current seller profile fields. Legacy orders use the same explicit unknown-seller explanation. Do not rewrite old snapshots.
9. Existing escrow/payout legal descriptions require business/legal confirmation; this task did not implement new payments or certify regulatory compliance.
10. Run the staging acceptance sequence: approved real dealer, Kariv-owned watch, ambiguous watch, suspended dealer, new order snapshot, pending review, moderation, edit/requeue, both cs/de pages, four feeds, and another tenant's unchanged workflows. Confirm public names/markup agree.
11. Complete manual Merchant Center marketplace/advanced account conversion, verification, shipping/returns configuration, feed destinations and diagnostics as described in google-merchant-marketplace-setup.md. Approval cannot be guaranteed by code.

## Main files

- Core: src/lib/marketplace.js, marketplaceCopy.js, marketplaceAssignments.js, marketplaceServer.js, useLiveSeller.js, merchantFeed.js, merchantFeedServer.js.
- Actions: src/actions/marketplace.js, dealerReviews.js; guarded products.js and orders.js.
- UI: src/components/marketplace/SellerIdentity.jsx; shared product/dealer/review components; AdminMarketplace; canonical DealerProfile/DealerProfileSettings; existing cart/checkout/order surfaces.
- Routes: existing dealer-profile route; existing admin route extension; app/feeds/merchant/[locale]/[group]/route.js.
- Operations: scripts/marketplace.mjs, marketplace-demo-dealers.mjs, marketplace-test-database.mjs, marketplace-feeds.mjs, marketplace-types.mjs.
- Data/types: data/marketplace-dealers.template.json; src/types/marketplace.generated.d.ts.
- Tests: marketplace.test.mjs, marketplace-database.test.mjs, marketplace-auth.test.mjs, tests/fixtures/marketplace.mjs and adapted existing pricing/localization/render fixtures.

Earlier uncommitted Google verification and free-EU-shipping work was preserved.
