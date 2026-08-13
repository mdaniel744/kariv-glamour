// 14-day escrow auto-release job. Finds orders that have sat in `verified`
// past their inspection window and releases funds, unless a dispute is
// still open. Run on a schedule (see ecosystem.config.cjs) via PM2's
// --cron-restart, not Supabase pg_cron — this is Kariv-specific business
// logic (dispute freeze, buyer notification), not something that belongs
// in a Supabase project shared with two other stores.
//
// Idempotent by construction: the update is conditioned on
// escrow_status = 'verified', so running this twice in a row is a no-op
// the second time. Safe to re-run after a crash.
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
    .eq('escrow_status', 'verified')
    .lte('delivery_confirmed_at', cutoff);

  if (fetchError) {
    console.error('[releaseEscrowFunds] Failed to fetch candidates:', fetchError.message);
    process.exit(1);
  }

  if (!candidates.length) {
    console.log('[releaseEscrowFunds] checked=0 released=0 frozen=0');
    return;
  }

  const ids = candidates.map(o => o.id);
  const { data: openDisputes, error: disputeError } = await supabase
    .from('disputes')
    .select('order_id')
    .in('order_id', ids)
    .in('status', ['open', 'under_review']);

  if (disputeError) {
    console.error('[releaseEscrowFunds] Failed to check disputes:', disputeError.message);
    process.exit(1);
  }

  const frozenIds = new Set((openDisputes || []).map(d => d.order_id));
  let released = 0;

  for (const order of candidates) {
    if (frozenIds.has(order.id)) continue;

    const { data, error } = await supabase
      .from('orders')
      .update({ escrow_status: 'funds_released', updated_at: new Date().toISOString() })
      .eq('id', order.id)
      .eq('escrow_status', 'verified') // guard against a concurrent admin/dispute transition
      .select('id')
      .maybeSingle();

    if (error) {
      console.error(`[releaseEscrowFunds] Failed to release order ${order.id}:`, error.message);
      continue;
    }
    if (!data) continue; // someone else moved it between fetch and update — skip

    // Best-effort system message. sender_user_id/subject/kind columns may
    // not exist yet or may be non-nullable in ways this doesn't anticipate
    // — a failure here shouldn't block the release itself.
    await supabase.from('order_messages').insert({
      order_id: order.id,
      sender: 'admin',
      sender_user_id: 'system',
      recipient_role: 'buyer',
      subject: 'Funds Released',
      message: 'The 14-day inspection period has ended with no dispute filed. Funds have been released to the dealer.',
      kind: 'message',
      is_read: false,
    });

    released += 1;
  }

  console.log(`[releaseEscrowFunds] checked=${candidates.length} released=${released} frozen=${frozenIds.size}`);
}

main().then(() => process.exit(0)).catch(e => {
  console.error('[releaseEscrowFunds] Unexpected error:', e);
  process.exit(1);
});
