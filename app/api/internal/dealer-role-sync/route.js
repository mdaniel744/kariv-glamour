import { timingSafeEqual } from 'node:crypto';
import { setUserRole } from '@/lib/serverAuth';
import { STORE_ID } from '@/lib/supabaseData';

// Dealer-application approval was moved out of this app and into the shared
// Ecom King dashboard, which only has access to the shared Supabase project —
// not this store's Clerk instance. Nothing was left to grant the Clerk
// `dealer` role once an application is approved there, so every approved
// dealer stayed permanently unable to use any dealer-only action (listing
// creation, responding to inquiries, etc.), even though their application
// correctly shows as approved. This endpoint is the missing link: point a
// Supabase database webhook at it (fires on dealer_applications UPDATE) and
// it grants the Clerk role whenever status becomes 'approved'.
function authorized(request) {
  const expected = process.env.DEALER_ROLE_SYNC_SECRET;
  if (!expected) return false;
  const header = request.headers.get('authorization') || '';
  const provided = header.startsWith('Bearer ') ? header.slice(7) : '';
  const expectedBuf = Buffer.from(expected);
  const providedBuf = Buffer.from(provided);
  if (expectedBuf.length !== providedBuf.length) return false;
  return timingSafeEqual(expectedBuf, providedBuf);
}

export async function POST(request) {
  if (!authorized(request)) {
    return Response.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  // Accepts either a raw Supabase database-webhook payload
  // ({ table, record, old_record }) or a direct { dealerUserId, storeId } call.
  const record = body?.record || body;
  const table = body?.table;
  if (table && table !== 'dealer_applications') {
    return Response.json({ ok: false, error: 'Unexpected table' }, { status: 400 });
  }

  const storeId = record?.store_id || record?.storeId;
  const dealerUserId = record?.dealer_user_id || record?.dealerUserId;
  const status = record?.status;

  if (storeId !== STORE_ID) {
    return Response.json({ ok: true, skipped: 'different store' });
  }
  if (typeof dealerUserId !== 'string' || !dealerUserId.trim()) {
    return Response.json({ ok: false, error: 'Missing dealer_user_id' }, { status: 400 });
  }
  if (status !== 'approved') {
    return Response.json({ ok: true, skipped: 'not an approval' });
  }

  try {
    await setUserRole(dealerUserId.trim(), 'dealer');
    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ ok: false, error: error.message || 'Failed to grant dealer role' }, { status: 500 });
  }
}
