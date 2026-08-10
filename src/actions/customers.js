'use server';

import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { requireUser, requireAdmin } from '@/lib/serverAuth';
import { STORE_ID } from '@/lib/supabaseData';
import { loadIdentities } from '@/lib/orderIdentities';

const EMPTY_PROFILE = { phoneNumber: '', streetAddress: '', city: '', postalCode: '', country: '' };

export async function getMyProfile() {
  const user = await requireUser();
  const { data, error } = await supabaseAdmin
    .from('customers')
    .select('billing_address')
    .eq('store_id', STORE_ID)
    .eq('clerk_user_id', user.id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return { ...EMPTY_PROFILE, ...(data?.billing_address || {}) };
}

export async function saveMyProfile({ phoneNumber, streetAddress, city, postalCode, country }) {
  const user = await requireUser();
  const { error } = await supabaseAdmin
    .from('customers')
    .upsert(
      {
        store_id: STORE_ID,
        clerk_user_id: user.id,
        billing_address: { phoneNumber, streetAddress, city, postalCode, country },
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'store_id,clerk_user_id' }
    );
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function getAdminCustomers({ limit = 50 } = {}) {
  await requireAdmin();
  const { data, error } = await supabaseAdmin
    .from('customers')
    .select('*')
    .eq('store_id', STORE_ID)
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) throw new Error(error.message);

  const rows = data || [];
  const identities = await loadIdentities(rows.map(r => r.clerk_user_id));
  return rows.map(r => ({
    id: r.id,
    userId: r.clerk_user_id,
    fullName: identities.get(r.clerk_user_id)?.fullName || 'Unknown',
    email: identities.get(r.clerk_user_id)?.email || '',
    phone: r.billing_address?.phoneNumber || identities.get(r.clerk_user_id)?.phone || '',
  }));
}
