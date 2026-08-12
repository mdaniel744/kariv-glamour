'use server';

import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { requireUser } from '@/lib/serverAuth';
import { STORE_ID } from '@/lib/supabaseData';

function mapNotificationRow(row) {
  return {
    id: row.id,
    type: row.type,
    title: row.title,
    body: row.body,
    linkPath: row.link_path,
    isRead: !!row.read_at,
    createdAt: row.created_at,
  };
}

export async function getMyNotifications() {
  const user = await requireUser();
  const { data, error } = await supabaseAdmin
    .from('notifications')
    .select('*')
    .eq('store_id', STORE_ID)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(30);
  if (error) throw new Error(error.message);
  return (data || []).map(mapNotificationRow);
}

export async function markNotificationRead(id) {
  const user = await requireUser();
  const { error } = await supabaseAdmin
    .from('notifications')
    .update({ read_at: new Date().toISOString() })
    .eq('id', id)
    .eq('store_id', STORE_ID)
    .eq('user_id', user.id);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function markAllNotificationsRead() {
  const user = await requireUser();
  const { error } = await supabaseAdmin
    .from('notifications')
    .update({ read_at: new Date().toISOString() })
    .eq('store_id', STORE_ID)
    .eq('user_id', user.id)
    .is('read_at', null);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

// endpoint is the natural dedup key (one row per browser/device subscription,
// UNIQUE(endpoint) on the shared side) — re-subscribing the same browser just
// re-points it at whichever user is currently signed in.
export async function subscribeToPush({ endpoint, p256dh, auth }) {
  const user = await requireUser();
  if (!endpoint || !p256dh || !auth) return { ok: false, error: 'Invalid subscription.' };
  const { error } = await supabaseAdmin
    .from('push_subscriptions')
    .upsert(
      { store_id: STORE_ID, user_id: user.id, endpoint, p256dh, auth },
      { onConflict: 'endpoint' }
    );
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
