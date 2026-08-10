# AGENTS.md

## Project Context

Kariv Glamour is a Next.js 15 (App Router) luxury watch marketplace. It was originally a Base44 app migrated from Vite; Base44 has since been fully removed. The backend is now:

- **Supabase** (Postgres) for all data — a shared multi-tenant project also serving two other stores ("Die Containers", "STF Container B.V."). Kariv's rows are scoped by `store_id`. See `src/lib/supabaseData.js` for the catalog data layer (Products/Brands/Collections/FAQ/Guides/LegalPages/WebsiteString), `src/lib/dataClient.js` for the compatibility shim other components call through, and `src/lib/base44Server.js` for server-side reads (name is legacy, content is Supabase-backed).
- **Clerk** for auth (`@clerk/nextjs`) — a separate Clerk application from whatever the platform's own staff/admin dashboard uses. Route protection lives in `middleware.js` (`clerkMiddleware` + role checks via Clerk's Backend API, since Clerk doesn't populate Supabase's `auth.uid()`).
- **Image fields are plain text URL columns** (`products.images`, brand logos, collection images, inline images in rich-text description). Historically these were paste-an-external-URL-only (ImageKit); the platform has since added a real upload pipeline writing to a public-read Supabase Storage bucket (`store-images`), so URLs may now be either external or `https://<project>.supabase.co/storage/v1/object/public/store-images/...`. Our own upload UI (`PaymentProofUploader.jsx`, `PortalListingForm.jsx`) still uses the paste-a-URL pattern — worth revisiting now that real upload exists, but no functional blocker either way since both URL shapes are just `https://` links.

Treat this as user-owned application code, keep changes focused on the user's request, and preserve existing project conventions.

## Orders/escrow/payments — live

Orders, order messages, disputes, and customers are real Supabase-backed tables now (`orders`, `order_messages`, `disputes`, `customers`), read/written via `src/actions/orders.js` and `src/actions/customers.js`. Checkout, Cart's checkout button, Portal Orders/Mails/Sales, and Admin Orders/Customers are all live. Still deferred: `dealer_profiles`/`dealer_reviews` (public dealer profile pages, review flow) — no tables exist for these yet.

**Crypto payments are deferred for v1** — only `bank_transfer` ships. `PaymentMethodSelector.jsx` filters `PAYMENT_METHODS` down to bank-only at render time (the constant itself still lists both, so re-enabling crypto later is a one-line change); `CryptoCheckoutButton.jsx` and the crypto branch of `PaymentMethodSelector.jsx` are left in place but unused.

Conventions established in `src/actions/orders.js` — follow these for any new order-related code:
- **Derived fields, not extra columns.** `escrowReference` (`KG-` + first 8 hex chars of the order uuid), `paymentStatus`, `orderStatus` are computed in `src/lib/orderShaping.js` from `escrow_status`/`payment_reference`, not stored. `paymentProofUrl` reuses `orders.payment_reference` directly (validated as `^https?://` at write time — no Supabase Storage on this platform, same paste-a-URL convention as everywhere else).
- **`{ok:true,...}` / `{ok:false,error}` return shape for mutations**, not thrown errors — Next.js strips thrown Server Action error messages to a generic digest in production, so a caught-and-thrown error is invisible to the user. Read-only actions (`getMyOrders`, etc.) still throw on failure, matching the rest of the codebase.
- **Escrow transitions all funnel through one `transitionEscrow()` helper** (internal to `orders.js`) that enforces `isValidEscrowTransition()` from `escrowConstants.js`, refuses `verified → funds_released` while a dispute is open, and uses an optimistic-concurrency write (`.eq('escrow_status', current)`) since supabase-js has no transactions.
- **`order_messages`/`disputes` have no `store_id`/buyer column** — ownership is only established by joining through `orders` first. Never look one up by its own id without re-verifying the parent order's owner.
- The 14-day auto-release job (`scripts/releaseEscrowFunds.mjs`) runs standalone via PM2 cron (`ecosystem.config.cjs`, hourly), not as part of the Next.js app — it's Kariv-specific business logic, not something that belongs in the shared Supabase project's own scheduling.

Any write that needs to check "does this belong to the current user" (orders, dealer listings, admin CRUD, anything Clerk-authenticated) must happen server-side using the Supabase **service-role key** with an explicit ownership filter in the query — never rely on Postgres RLS keyed off `auth.uid()`, since Clerk sessions don't populate it.

## Key Files

- `src/lib/dataClient.js`: the shared client object (`entities.Products.filter(...)`, etc.) most components import — Supabase-backed for migrated entities, throws a clear "not yet available" error for deferred ones. Orders/customers bypass this shim entirely (see below) — its "load everything then filter in JS" shape is wrong for per-user data.
- `src/lib/supabaseData.js`: the actual Supabase queries + shape adapters (mapping Supabase rows to the field names the UI expects, e.g. `productTitle`, `caseDiameter`).
- `src/actions/orders.js`, `src/actions/customers.js`: order/escrow/dispute/messaging/customer-profile server actions — the pattern to mirror for anything else in this domain.
- `src/lib/orderShaping.js`: pure snake_case-DB-row → camelCase-UI-field mapping for orders/messages/disputes (the `shapeProductRows` equivalent).
- `src/lib/escrowConstants.js`: the escrow status enum, valid-transition table, and payment method list — single source of truth, enforced server-side in `orders.js`'s `transitionEscrow()`.
- `src/lib/AuthContext.jsx`: thin shim over Clerk hooks, exposing the same `user`/`isAuthenticated`/`logout` shape every consumer already expects.
- `middleware.js`: locale-prefix redirects + Clerk route protection, in one function.
- `.env.local`: local-only environment values (Supabase URL/anon key, Clerk publishable/secret key); never commit secrets.

## Working Notes

- `pnpm install` / `pnpm build` / `pnpm run dev -p <port>` — standard Next.js commands, nothing Base44-specific remains.
- Run the relevant checks from `package.json` before finishing code changes; `pnpm build` is the strongest available signal since it type-checks and prerenders every route.
- Before adding a new Supabase table or altering a shared one (`products`, `categories`, `attributes`, etc.), confirm with whoever owns the platform's Supabase project — it's shared with two other stores.
