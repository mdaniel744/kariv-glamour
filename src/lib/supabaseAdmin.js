import 'server-only';
import { createClient } from '@supabase/supabase-js';

// Service-role client — bypasses RLS entirely. Server-only, never imported
// from a client component. Every caller MUST apply its own ownership/role
// check before using this (store_id scoping, dealer_id/dealer_user_id
// filters, admin-role checks) — the key itself enforces nothing.
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);
