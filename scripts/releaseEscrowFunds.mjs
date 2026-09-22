// Protected-order and reservation maintenance job. It identifies orders that
// have passed their 14-day inspection window so an administrator can complete
// the real dealer payout and record its reference. It never claims or records
// a payout merely because time elapsed. Run on a schedule (see ecosystem.config.cjs) via PM2's
// --cron-restart, not Supabase pg_cron — this is Kariv-specific business
// logic (dispute freeze, buyer notification), not something that belongs
// in a Supabase project shared with two other stores.
//
// Run manually with:
//   node --env-file=.env.local scripts/releaseEscrowFunds.mjs

import { createClient } from '@supabase/supabase-js';

// supabase-js initializes a Realtime client (unused here — we only do
// plain select/update calls) that requires a native WebSocket global.
// Node 22+ has one built in; the VPS runs Node 20, where it doesn't exist
// outside the Next.js app's own runtime — polyfill it for this standalone
// script specifically.
if (typeof globalThis.WebSocket === 'undefined') {
  const { default: WebSocket } = await import('ws');
  globalThis.WebSocket = WebSocket;
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const STORE_ID = process.env.NEXT_PUBLIC_STORE_ID;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY || !STORE_ID) {
  console.error('[releaseEscrowFunds] Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY / NEXT_PUBLIC_STORE_ID');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, { auth: { persistSession: false } });

const FOURTEEN_DAYS_MS = 14 * 24 * 60 * 60 * 1000;

async function main() {
  const cutoff = new Date(Date.now() - FOURTEEN_DAYS_MS).toISOString();

  const { data: candidates, error: fetchError } = await supabase
    .from('orders')
    .select('id, delivery_confirmed_at')
    .eq('store_id', STORE_ID)
    .eq('purchase_route', 'escrow')
    .eq('escrow_status', 'verified')
    .lte('delivery_confirmed_at', cutoff);

  if (fetchError) {
    console.error('[releaseEscrowFunds] Failed to fetch candidates:', fetchError.message);
    process.exit(1);
  }

  // Payout itself happens outside this job. The admin order screen requires a
  // completed bank/provider reference and the database writes an immutable
  // financial event before the order can become completed.
  const payoutDue = (candidates || []).length;

  const now = new Date().toISOString();
  const { count: overdueProofReviews, error: proofReviewError } = await supabase
    .from('orders')
    .select('id', { count: 'exact', head: true })
    .eq('store_id', STORE_ID)
    .eq('escrow_status', 'dealer_accepted')
    .eq('purchase_status', 'awaiting_payment')
    .not('payment_reference', 'is', null)
    .lte('payment_review_deadline', now);

  if (proofReviewError) {
    console.error('[releaseEscrowFunds] Failed to count overdue payment-proof reviews:', proofReviewError.message);
  }

  console.log(`[releaseEscrowFunds] protectedPayoutsDue=${payoutDue} overdueProofReviews=${overdueProofReviews ?? 'unavailable'}`);
}

main().then(() => process.exit(0)).catch(e => {
  console.error('[releaseEscrowFunds] Unexpected error:', e);
  process.exit(1);
});
