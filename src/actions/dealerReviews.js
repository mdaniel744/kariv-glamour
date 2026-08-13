'use server';

import { revalidatePath } from 'next/cache';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { requireAdmin, requireUser } from '@/lib/serverAuth';
import { STORE_ID } from '@/lib/supabaseData';
import { formatEscrowReference } from '@/lib/orderShaping';
import { loadIdentities } from '@/lib/orderIdentities';
import {
  loadApprovedDealerReviews,
  mapDealerReviewRow,
  summarizeDealerReviews,
} from '@/lib/dealerReviewsData';

const ELIGIBLE_ESCROW_STATUSES = ['verified', 'funds_released'];
const REVIEW_STATUSES = ['pending', 'approved', 'rejected'];

function reviewServiceError(error) {
  if (error?.code === '42P01') {
    return 'Dealer reviews are not configured in the database yet.';
  }
  return error?.message || 'Unable to complete the review request.';
}

function revalidateDealerProfile(dealerId) {
  revalidatePath(`/de/dealer-profile/${dealerId}`);
  revalidatePath(`/en/dealer-profile/${dealerId}`);
}

export async function getDealerRatingSummary(dealerId) {
  try {
    const reviews = await loadApprovedDealerReviews(dealerId, 500);
    const identities = await loadIdentities([dealerId]);
    const identity = identities.get(dealerId);
    return {
      displayName: identity?.fullName || '',
      verifiedStatus: 'verified',
      ...summarizeDealerReviews(reviews),
    };
  } catch (error) {
    console.error('Unable to load dealer rating summary:', error?.message || error);
    return { displayName: '', verifiedStatus: 'verified', averageRating: 0, totalReviews: 0 };
  }
}

export async function getDealerReviewEligibility(dealerId) {
  const user = await requireUser();
  if (!dealerId) return { ok: false, error: 'Dealer not found.' };

  const { data: orders, error: orderError } = await supabaseAdmin
    .from('orders')
    .select('id, escrow_status, created_at')
    .eq('store_id', STORE_ID)
    .eq('buyer_user_id', user.id)
    .eq('dealer_user_id', dealerId)
    .in('escrow_status', ELIGIBLE_ESCROW_STATUSES)
    .order('created_at', { ascending: false });

  if (orderError) return { ok: false, error: orderError.message };
  if (!orders?.length) return { ok: true, eligibleOrder: null, submittedReview: null };

  const { data: existing, error: reviewError } = await supabaseAdmin
    .from('dealer_reviews')
    .select('*')
    .eq('store_id', STORE_ID)
    .eq('buyer_user_id', user.id)
    .in('order_id', orders.map((order) => order.id));

  if (reviewError) return { ok: false, error: reviewServiceError(reviewError) };

  const existingByOrder = new Map((existing || []).map((review) => [review.order_id, review]));
  const eligible = orders.find((order) => {
    const review = existingByOrder.get(order.id);
    return !review || review.status === 'rejected';
  });
  const submitted = orders
    .map((order) => existingByOrder.get(order.id))
    .find((review) => review && review.status !== 'rejected');

  return {
    ok: true,
    eligibleOrder: eligible
      ? { id: eligible.id, escrowReference: formatEscrowReference(eligible.id) }
      : null,
    submittedReview: submitted ? mapDealerReviewRow(submitted) : null,
  };
}

export async function submitDealerReview({ dealerId, orderId, rating, title = '', reviewText = '' }) {
  const user = await requireUser();
  const numericRating = Number(rating);
  const cleanTitle = String(title).trim();
  const cleanReview = String(reviewText).trim();

  if (!dealerId || !orderId) return { ok: false, error: 'Dealer and order are required.' };
  if (!Number.isInteger(numericRating) || numericRating < 1 || numericRating > 5) {
    return { ok: false, error: 'Choose a rating from one to five stars.' };
  }
  if (cleanTitle.length > 120) return { ok: false, error: 'The review title is too long.' };
  if (cleanReview.length < 10 || cleanReview.length > 2000) {
    return { ok: false, error: 'The review must be between 10 and 2,000 characters.' };
  }

  const { data: order, error: orderError } = await supabaseAdmin
    .from('orders')
    .select('id, dealer_user_id, escrow_status')
    .eq('id', orderId)
    .eq('store_id', STORE_ID)
    .eq('buyer_user_id', user.id)
    .eq('dealer_user_id', dealerId)
    .in('escrow_status', ELIGIBLE_ESCROW_STATUSES)
    .maybeSingle();

  if (orderError || !order) {
    return { ok: false, error: 'Only verified buyers with a completed order can review this dealer.' };
  }

  const { data: existing, error: existingError } = await supabaseAdmin
    .from('dealer_reviews')
    .select('*')
    .eq('store_id', STORE_ID)
    .eq('order_id', orderId)
    .maybeSingle();

  if (existingError) return { ok: false, error: reviewServiceError(existingError) };
  if (existing && existing.buyer_user_id !== user.id) {
    return { ok: false, error: 'This order already has a review.' };
  }
  if (existing && existing.status !== 'rejected') {
    return { ok: false, error: 'A review for this order has already been submitted.' };
  }

  const values = {
    store_id: STORE_ID,
    dealer_user_id: dealerId,
    buyer_user_id: user.id,
    buyer_name: user.fullName || 'Verified Buyer',
    order_id: orderId,
    rating: numericRating,
    title: cleanTitle,
    review_text: cleanReview,
    status: 'pending',
    reviewed_by: null,
    reviewed_at: null,
    updated_at: new Date().toISOString(),
  };

  const mutation = existing
    ? supabaseAdmin.from('dealer_reviews').update(values).eq('id', existing.id).select().single()
    : supabaseAdmin.from('dealer_reviews').insert(values).select().single();
  const { data, error } = await mutation;

  if (error) {
    if (error.code === '23505') return { ok: false, error: 'A review for this order has already been submitted.' };
    return { ok: false, error: reviewServiceError(error) };
  }

  revalidateDealerProfile(dealerId);
  return { ok: true, review: mapDealerReviewRow(data) };
}

export async function listAdminDealerReviews({ status = 'pending', limit = 200 } = {}) {
  await requireAdmin();
  let query = supabaseAdmin
    .from('dealer_reviews')
    .select('*')
    .eq('store_id', STORE_ID)
    .order('created_at', { ascending: false })
    .limit(limit);
  if (REVIEW_STATUSES.includes(status)) query = query.eq('status', status);

  const { data, error } = await query;
  if (error) throw new Error(reviewServiceError(error));
  const rows = data || [];
  const identities = await loadIdentities(rows.map((row) => row.dealer_user_id));

  return rows.map((row) => ({
    ...mapDealerReviewRow(row),
    dealerName: identities.get(row.dealer_user_id)?.fullName || 'Dealer',
  }));
}

export async function moderateDealerReview(reviewId, status) {
  const admin = await requireAdmin();
  if (!['approved', 'rejected'].includes(status)) {
    return { ok: false, error: 'Choose approve or reject.' };
  }

  const { data, error } = await supabaseAdmin
    .from('dealer_reviews')
    .update({
      status,
      reviewed_by: admin.id,
      reviewed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', reviewId)
    .eq('store_id', STORE_ID)
    .select()
    .maybeSingle();

  if (error) return { ok: false, error: reviewServiceError(error) };
  if (!data) return { ok: false, error: 'Review not found.' };
  revalidateDealerProfile(data.dealer_user_id);
  return { ok: true, review: mapDealerReviewRow(data) };
}
