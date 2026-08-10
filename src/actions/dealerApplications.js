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

// Returns {ok, ...} / {ok:false, error} rather than throwing — thrown Error
// messages get stripped to a generic digest by Next.js in production, which
// is why this button silently failed before: the real reason never reached
// the toast.
export async function approveDealerApplication(id) {
  const admin = await requireAdmin();
  const { data: application, error: fetchError } = await supabaseAdmin
    .from('dealer_applications')
    .select('*')
    .eq('id', id)
    .eq('store_id', STORE_ID)
    .single();
  if (fetchError || !application) return { ok: false, error: 'Application not found.' };

  if (!application.dealer_user_id) {
    return { ok: false, error: 'This application has no linked user account, so the dealer role cannot be granted.' };
  }

  // Grant the Clerk role first: it's idempotent, so if the DB write below
  // fails, pressing Approve again just re-runs both steps safely. Doing the
  // DB write first would risk a row marked "approved" whose user never
  // actually became a dealer, with no way to retry from the UI.
  try {
    await setUserRole(application.dealer_user_id, 'dealer');
  } catch (e) {
    return { ok: false, error: `Could not grant the dealer role in Clerk (user ${application.dealer_user_id}): ${e.message}. The application status was not changed.` };
  }

  const { error } = await supabaseAdmin
    .from('dealer_applications')
    .update({ status: 'approved', reviewed_by: admin.id, reviewed_at: new Date().toISOString() })
    .eq('id', id)
    .eq('store_id', STORE_ID);
  if (error) {
    return { ok: false, error: `The dealer role was granted, but the application status could not be saved (${error.message}). Press Approve again to retry.` };
  }

  return { ok: true };
}

export async function rejectDealerApplication(id) {
  const admin = await requireAdmin();
  const { data, error } = await supabaseAdmin
    .from('dealer_applications')
    .update({ status: 'rejected', reviewed_by: admin.id, reviewed_at: new Date().toISOString() })
    .eq('id', id)
    .eq('store_id', STORE_ID)
    .select('id');
  if (error) return { ok: false, error: error.message };
  if (!data?.length) return { ok: false, error: 'Application not found.' };
  return { ok: true };
}
