# Kariv Glamour

A Next.js 15 (App Router) luxury watch marketplace. Data lives in Supabase, auth is handled by Clerk.

## Prerequisites

1. Clone the repository.
2. Install dependencies: `pnpm install`.
3. Node.js 20+.

## Environment Variables

Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_STORE_ID=your_store_id
NEXT_PUBLIC_SITE_URL=http://localhost:5511

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_or_live_...
CLERK_SECRET_KEY=sk_test_or_live_...
```

`NEXT_PUBLIC_STORE_ID` scopes every Supabase query to this store's rows — the Supabase project is shared with other stores on the same platform.

## Run Locally

```bash
pnpm run dev -p 5511
```

## Build

```bash
pnpm build
```

## Notes

- No file upload infrastructure exists — image fields (products, brands, collections) are plain URL text fields. Upload externally (ImageKit) and paste the resulting URL.
- Orders, escrow, and the dealer marketplace (profiles/reviews) are deferred — their UI is present but safely disabled/stubbed pending a Supabase schema and payment integration for that area. See `AGENTS.md` for details.
