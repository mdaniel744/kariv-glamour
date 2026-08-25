import 'server-only';
import { createClient } from '@supabase/supabase-js';

// Service-role client — bypasses RLS entirely. Server-only, never imported
// from a client component. Every caller MUST apply its own ownership/role
// check before using this (store_id scoping, dealer_id/dealer_user_id
// filters, admin-role checks) — the key itself enforces nothing.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isSupabaseAdminConfigured = Boolean(supabaseUrl && serviceRoleKey);

// Public catalog pages should still render in local development when the
// production database credentials are intentionally unavailable. Mutating
// admin/dealer actions remain unavailable until the real environment is set.
export const supabaseAdmin = isSupabaseAdminConfigured
  ? createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } })
  : null;
