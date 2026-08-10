'use server';

import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { requireAdmin, requireUser, setUserRole } from '@/lib/serverAuth';
import { STORE_ID } from '@/lib/supabaseData';

// No anon SELECT policy exists on dealer_applications (by design) — these
// all use the service-role key, which is why they had to wait for it.

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

export async function approveDealerApplication(id) {
  const admin = await requireAdmin();
  const { data: application, error: fetchError } = await supabaseAdmin
    .from('dealer_applications')
    .select('*')
    .eq('id', id)
    .single();
  if (fetchError || !application) throw new Error('Application not found');

  const { error } = await supabaseAdmin
    .from('dealer_applications')
    .update({ status: 'approved', reviewed_by: admin.id, reviewed_at: new Date().toISOString() })
    .eq('id', id);
  if (error) throw new Error(error.message);

  await setUserRole(application.dealer_user_id, 'dealer');
}

export async function rejectDealerApplication(id) {
  const admin = await requireAdmin();
  const { error } = await supabaseAdmin
    .from('dealer_applications')
    .update({ status: 'rejected', reviewed_by: admin.id, reviewed_at: new Date().toISOString() })
    .eq('id', id);
  if (error) throw new Error(error.message);
}
