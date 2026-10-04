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

NEXT_PUBLIC_VAPID_PUBLIC_KEY=...

# Optional: fills missing DE/EN product title and description fields on save
OPENAI_API_KEY=sk-...
OPENAI_TRANSLATION_MODEL=gpt-5-mini

# Contact form email delivery (server-side; sends via SMTP through info@24kariv.com)
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=info@24kariv.com
SMTP_PASSWORD=...
# Optional override; defaults to Kariv Glamour <info@24kariv.com>
CONTACT_FROM_EMAIL="Kariv Glamour <info@24kariv.com>"
```

The public contact form submits to `/api/contact` and sends plain-text messages to
`info@24kariv.com` over SMTP (via `nodemailer`), using that same mailbox's own
credentials to authenticate — no third-party email API involved. Configure
`SMTP_HOST`/`SMTP_PORT`/`SMTP_USER`/`SMTP_PASSWORD` on the Kariv server (and in
`.env.local` for local delivery) and restart the app with updated environment
variables. If delivery is not configured or the mail server rejects a message,
the form shows an error rather than claiming it was sent; the direct email
link remains available.
On the VPS, keep the password outside Git and restart with
`pm2 restart kariv --update-env` after setting it. Confirm one real form
submission reaches the support inbox before treating delivery as live.

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

- Image fields (products, brands, collections, payment proof) use a real upload pipeline to a public-read Supabase Storage bucket via drag-and-drop/click-to-browse uploaders — no more paste-a-URL.
- Orders, escrow (bank transfer only for v1), disputes, and customer profiles are live, backed by real Supabase tables. Dealer marketplace profile/review pages remain deferred (no schema yet). See `AGENTS.md` for details.
- Browser push notifications (order/escrow status changes) are live — see `AGENTS.md` for the subscription flow.
