import 'server-only';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { STORE_ID } from '@/lib/supabaseData';
import { summarizeApprovedReviews } from '@/lib/marketplace';

// Public review projection: no account IDs, order IDs, email or moderation notes.
export function mapDealerReviewRow(row) {
  return {
    id: row.id, dealerId: row.dealer_user_id, buyerName: row.buyer_name || 'Buyer',
    rating: Number(row.rating), title: row.title || '', reviewText: row.review_text,
    status: row.status, isVerifiedPurchase: row.is_verified_purchase === true,
    created_date: row.created_at, updated_date: row.updated_at,
  };
}
export function summarizeDealerReviews(reviews) { return summarizeApprovedReviews(reviews); }
export async function loadApprovedDealerReviews(dealerId, limit = 20, { sort = 'newest', offset = 0 } = {}) {
  if (!dealerId || !supabaseAdmin) return [];
  const start = Math.max(0, Math.min(100000, Math.floor(Number(offset) || 0)));
  const count = Math.max(1, Math.min(100, Math.floor(Number(limit) || 20)));
  let query = supabaseAdmin.from('dealer_reviews').select('*')
    .eq('store_id', STORE_ID).eq('dealer_user_id', dealerId).eq('status', 'approved').is('deleted_at', null);
  if (sort === 'highest' || sort === 'lowest') query = query.order('rating', { ascending: sort === 'lowest' });
  const { data, error } = await query.order('created_at', { ascending: false }).order('id').range(start, start + count - 1);
  if (error) throw new Error(error.message);
  return (data || []).map(mapDealerReviewRow);
}
