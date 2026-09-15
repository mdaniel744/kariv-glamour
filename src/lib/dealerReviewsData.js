import 'server-only';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { STORE_ID } from '@/lib/supabaseData';
import { formatEscrowReference } from '@/lib/orderShaping';

export function mapDealerReviewRow(row) {
  return {
    id: row.id,
    dealerId: row.dealer_user_id,
    buyerId: row.buyer_user_id,
    buyerName: row.buyer_name || 'Verified Buyer',
    orderId: row.order_id,
    orderReference: formatEscrowReference(row.order_id),
    rating: Number(row.rating),
    title: row.title || '',
    reviewText: row.review_text,
    status: row.status,
    isVerifiedPurchase: true,
    reviewedBy: row.reviewed_by || null,
    reviewedAt: row.reviewed_at || null,
    created_date: row.created_at,
    updated_date: row.updated_at,
  };
}

export function summarizeDealerReviews(reviews) {
  const totalReviews = reviews.length;
  const averageRating = totalReviews
    ? reviews.reduce((total, review) => total + Number(review.rating || 0), 0) / totalReviews
    : 0;

  return {
    averageRating: Math.round(averageRating * 10) / 10,
    totalReviews,
  };
}

export async function loadApprovedDealerReviews(dealerId, limit = 50) {
  if (!dealerId) return [];
  const { data, error } = await supabaseAdmin
    .from('dealer_reviews')
    .select('*')
    .eq('store_id', STORE_ID)
    .eq('dealer_user_id', dealerId)
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    if (error.code === '42P01') return [];
    throw new Error(error.message);
  }
  return (data || []).map(mapDealerReviewRow);
}
