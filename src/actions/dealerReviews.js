'use server';

import { revalidatePath } from 'next/cache';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { requireMainAdmin, requireUser } from '@/lib/serverAuth';
import { STORE_ID, Products } from '@/lib/supabaseData';
import { formatEscrowReference } from '@/lib/orderShaping';
import { mapDealerReviewRow } from '@/lib/dealerReviewsData';
import { loadSeller, loadDealerPage } from '@/lib/marketplaceServer';
import { publicSeller } from '@/lib/marketplace';
import { merchantPlainText } from '@/lib/productMerchant';

const ELIGIBLE = ['verified', 'funds_released'];
function refresh() {
  Products.invalidate();
  revalidatePath('/[locale]', 'layout');
}
async function reviewerAllowed(user, dealerId) {
  const seller = await loadSeller(dealerId);
  if (!publicSeller(seller)) throw new Error('Dealer is not available.');
  if (user.id === dealerId) throw new Error('You cannot review your own dealership.');
  const { data, error } = await supabaseAdmin.from('dealer_staff').select('user_id')
    .eq('store_id', STORE_ID).eq('dealer_user_id', dealerId).eq('user_id', user.id).maybeSingle();
  if (error) throw new Error(error.message);
  if (data) throw new Error('Dealer staff cannot review their own dealership.');
}
function content(input) {
  const rating = Number(input.rating);
  const title = merchantPlainText(String(input.title || ''));
  const review_text = merchantPlainText(String(input.reviewText || ''));
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) throw new Error('Choose one to five stars.');
  if (title.length > 120 || review_text.length < 10 || review_text.length > 2000) throw new Error('Use a title under 120 characters and a review of 10–2,000 characters.');
  return { rating, title, review_text, locale: ['cs', 'de', 'en'].includes(input.locale) ? input.locale : 'en' };
}
export async function getPublicDealerPage(dealerId, options) { return loadDealerPage(dealerId, options); }
export async function getPublicSellerSummaries(keys) {
  if (!Array.isArray(keys) || keys.length > 100 || keys.some(k => typeof k !== 'string' || k.length > 200)) throw new Error('Invalid seller request');
  const ids = [...new Set(keys)];
  if (!ids.length) return [];
  const [sellers, ratings] = await Promise.all([
    supabaseAdmin.from('marketplace_public_sellers').select('*').eq('store_id', STORE_ID).in('user_id', ids),
    supabaseAdmin.from('marketplace_public_ratings').select('*').eq('store_id', STORE_ID).in('dealer_user_id', ids),
  ]);
  if (sellers.error || ratings.error) throw new Error('Seller summaries unavailable');
  return (sellers.data || []).map(seller => publicSeller({ ...seller,
    ...(ratings.data || []).find(rating => rating.dealer_user_id === seller.user_id) })).filter(Boolean);
}
export async function getDealerRatingSummary(dealerId) {
  const seller = publicSeller(await loadSeller(dealerId));
  if (!seller) return { seller: null, averageRating: 0, totalReviews: 0 };
  const { data, error } = await supabaseAdmin.from('marketplace_public_ratings').select('*')
    .eq('store_id', STORE_ID).eq('dealer_user_id', dealerId).maybeSingle();
  if (error) throw new Error(error.message);
  return { seller: { ...seller, average_rating: Number(data?.average_rating || 0), review_count: Number(data?.review_count || 0) },
    displayName: seller.public_name, averageRating: Number(data?.average_rating || 0), totalReviews: Number(data?.review_count || 0) };
}
export async function getDealerReviewEligibility(dealerId) {
  try {
    const user = await requireUser();
    await reviewerAllowed(user, dealerId);
    const [{ data: orders, error }, { data: reviews, error: reviewError }] = await Promise.all([
      supabaseAdmin.from('orders').select('id').eq('store_id', STORE_ID).eq('buyer_user_id', user.id)
        .eq('dealer_user_id', dealerId).in('escrow_status', ELIGIBLE).order('created_at', { ascending: false }),
      supabaseAdmin.from('dealer_reviews').select('*').eq('store_id', STORE_ID).eq('buyer_user_id', user.id)
        .eq('dealer_user_id', dealerId).is('deleted_at', null).order('created_at', { ascending: false }),
    ]);
    if (error || reviewError) throw new Error((error || reviewError).message);
    const active = reviews?.find(r => ['pending', 'approved'].includes(r.status)) || reviews?.[0];
    const unused = orders?.find(o => !reviews?.some(r => r.order_id === o.id));
    return { ok: true, submittedReview: active ? mapDealerReviewRow(active) : null,
      eligibleOrder: !active && unused ? { id: unused.id, escrowReference: formatEscrowReference(unused.id) } : null };
  } catch (error) { return { ok: false, error: error.message }; }
}
export async function submitDealerReview(input) {
  try {
    const user = await requireUser();
    await reviewerAllowed(user, input.dealerId);
    const values = content(input);
    const { data: order, error: orderError } = await supabaseAdmin.from('orders').select('id')
      .eq('store_id', STORE_ID).eq('id', input.orderId).eq('buyer_user_id', user.id)
      .eq('dealer_user_id', input.dealerId).in('escrow_status', ELIGIBLE).maybeSingle();
    if (orderError || !order) throw new Error('A verified purchase from this dealer is required.');
    const { data, error } = await supabaseAdmin.from('dealer_reviews').insert({
      ...values, store_id: STORE_ID, dealer_user_id: input.dealerId, buyer_user_id: user.id,
      buyer_name: user.fullName || 'Buyer', order_id: order.id, status: 'pending',
      is_verified_purchase: true,
    }).select().single();
    if (error) throw new Error(error.message);
    refresh(); return { ok: true, review: mapDealerReviewRow(data) };
  } catch (error) { return { ok: false, error: error.message }; }
}
export async function editMyDealerReview(reviewId, input) {
  try {
    const user = await requireUser();
    const { data, error } = await supabaseAdmin.from('dealer_reviews')
      .update({ ...content(input), status: 'pending', reviewed_at: null, reviewed_by: null })
      .eq('store_id', STORE_ID).eq('id', reviewId).eq('buyer_user_id', user.id).is('deleted_at', null).select().maybeSingle();
    if (error || !data) throw new Error(error?.message || 'Review not found.');
    refresh(); return { ok: true, review: mapDealerReviewRow(data) };
  } catch (error) { return { ok: false, error: error.message }; }
}
export async function deleteMyDealerReview(reviewId) {
  try {
    const user = await requireUser();
    const { data, error } = await supabaseAdmin.from('dealer_reviews').update({ deleted_at: new Date().toISOString() })
      .eq('store_id', STORE_ID).eq('id', reviewId).eq('buyer_user_id', user.id).is('deleted_at', null).select('id').maybeSingle();
    if (error || !data) throw new Error(error?.message || 'Review not found.');
    refresh(); return { ok: true };
  } catch (error) { return { ok: false, error: error.message }; }
}
export async function listAdminDealerReviews({ status = 'pending', limit = 200 } = {}) {
  await requireMainAdmin();
  let query = supabaseAdmin.from('dealer_reviews').select('*').eq('store_id', STORE_ID).is('deleted_at', null)
    .order('created_at', { ascending: false }).limit(Math.max(1, Math.min(500, Number(limit) || 200)));
  if (['pending', 'approved', 'rejected', 'spam'].includes(status)) query = query.eq('status', status);
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  const keys = [...new Set((data || []).map(r => r.dealer_user_id))];
  const sellers = await Promise.all(keys.map(loadSeller));
  const names = new Map(sellers.filter(Boolean).map(s => [s.user_id, s.public_name]));
  return (data || []).map(row => ({ ...mapDealerReviewRow(row),
    dealerName: names.get(row.dealer_user_id) || 'Unresolved seller',
    internalReason: row.internal_moderation_reason || '', orderReference: formatEscrowReference(row.order_id) }));
}
export async function moderateDealerReview(reviewId, status, reason = '') {
  try {
    const admin = await requireMainAdmin();
    if (!['approved', 'rejected', 'spam'].includes(status)) throw new Error('Invalid moderation action.');
    if (status !== 'approved' && !reason.trim()) throw new Error('An internal reason is required.');
    const { error } = await supabaseAdmin.rpc('kariv_moderate_review', {
      p_store: STORE_ID, p_id: reviewId, p_actor: admin.id, p_status: status, p_reason: reason.trim(),
    });
    if (error) throw new Error(error.message);
    refresh(); return { ok: true };
  } catch (error) { return { ok: false, error: error.message }; }
}
