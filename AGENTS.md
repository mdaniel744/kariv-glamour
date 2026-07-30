# AGENTS.md

## Project Context

Kariv Glamour is a Next.js 15 (App Router) luxury watch marketplace. It was originally a Base44 app migrated from Vite; Base44 has since been fully removed. The backend is now:

- **Supabase** (Postgres) for all data — a shared multi-tenant project also serving two other stores ("Die Containers", "STF Container B.V."). Kariv's rows are scoped by `store_id`. See `src/lib/supabaseData.js` for the catalog data layer (Products/Brands/Collections/FAQ/Guides/LegalPages/WebsiteString), `src/lib/dataClient.js` for the compatibility shim other components call through, and `src/lib/base44Server.js` for server-side reads (name is legacy, content is Supabase-backed).
- **Clerk** for auth (`@clerk/nextjs`) — a separate Clerk application from whatever the platform's own staff/admin dashboard uses. Route protection lives in `middleware.js` (`clerkMiddleware` + role checks via Clerk's Backend API, since Clerk doesn't populate Supabase's `auth.uid()`).
- **No file upload infrastructure** — image fields (`products.images`, brand logos, collection images) are plain text URL fields. The convention is to upload externally (ImageKit) and paste the URL; there is no Supabase Storage bucket on this platform.

Treat this as user-owned application code, keep changes focused on the user's request, and preserve existing project conventions.

## Known scope: orders/escrow/dealer-marketplace is deferred

Orders, order messages, disputes, dealer profiles, and dealer reviews have no Supabase tables yet — this is deliberate, not an oversight. Checkout, Cart's checkout button, Portal Orders/Mails, Dealer Dashboard/Sales, public dealer profiles, and Admin Orders/Customers are all safely stubbed/disabled rather than wired to anything real. Do not build against these without confirming the deferral has been lifted.

Any write that needs to check "does this belong to the current user" (dealer listings, admin CRUD, anything Clerk-authenticated) must happen server-side using the Supabase **service-role key** with an explicit ownership filter in the query — never rely on Postgres RLS keyed off `auth.uid()`, since Clerk sessions don't populate it.

## Key Files

- `src/lib/dataClient.js`: the shared client object (`entities.Products.filter(...)`, etc.) most components import — Supabase-backed for migrated entities, throws a clear "not yet available" error for deferred ones.
- `src/lib/supabaseData.js`: the actual Supabase queries + shape adapters (mapping Supabase rows to the field names the UI expects, e.g. `productTitle`, `caseDiameter`).
- `src/lib/AuthContext.jsx`: thin shim over Clerk hooks, exposing the same `user`/`isAuthenticated`/`logout` shape every consumer already expects.
- `middleware.js`: locale-prefix redirects + Clerk route protection, in one function.
- `.env.local`: local-only environment values (Supabase URL/anon key, Clerk publishable/secret key); never commit secrets.

## Working Notes

- `pnpm install` / `pnpm build` / `pnpm run dev -p <port>` — standard Next.js commands, nothing Base44-specific remains.
- Run the relevant checks from `package.json` before finishing code changes; `pnpm build` is the strongest available signal since it type-checks and prerenders every route.
- Before adding a new Supabase table or altering a shared one (`products`, `categories`, `attributes`, etc.), confirm with whoever owns the platform's Supabase project — it's shared with two other stores.
