'use server';

import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { requireAdmin, requireUser } from '@/lib/serverAuth';
import { STORE_ID } from '@/lib/supabaseData';

// No anon SELECT policy exists on dealer_applications (by design) — these
// all use the service-role key, which is why they had to wait for it.
//
// Read-only by design: approval authority for dealer applications lives
// exclusively in the Ecom King dashboard now. This side no longer writes
// status/reviewed_by/reviewed_at or calls Clerk to grant the dealer role —
// /admin just displays applications for visibility.

export async function listDealerApplications() {
  await requireAdmin();
  const { data, error } = await supabaseAdmin
    .from('dealer_applications')
    .select('*')
    .eq('store_id', STORE_ID)
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data || [];
}

export async function getMyDealerApplication() {
  const user = await requireUser();
  const { data, error } = await supabaseAdmin
    .from('dealer_applications')
    .select('*')
    .eq('store_id', STORE_ID)
    .eq('dealer_user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1);
  if (error) throw new Error(error.message);
  return data?.[0] || null;
}
