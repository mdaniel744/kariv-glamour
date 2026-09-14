'use server';
import { revalidatePath } from 'next/cache';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { requireAdmin, requireMainAdmin, requireDealer } from '@/lib/serverAuth';
import { STORE_ID, Products } from '@/lib/supabaseData';
import { SELLER_FIELDS, sellerValidation, publicSeller, summarizeApprovedReviews } from '@/lib/marketplace';
import { loadSeller } from '@/lib/marketplaceServer';
import { ownershipCounts, parseAssignmentCsv, validateAssignments, assignmentCsv, ownershipBackup } from '@/lib/marketplaceAssignments';
import { loadMerchantFeed } from '@/lib/merchantFeedServer';
function refresh() { Products.invalidate(); revalidatePath('/[locale]', 'layout'); }
async function allRows(table, columns = '*') {
  // PostgREST cannot infer a row type from a runtime-selected projection.
  /** @type {Array<Record<string, any>>} */
  const rows = [];
  for (let offset = 0; ; offset += 500) {
    const { data, error } = await supabaseAdmin.from(table).select(columns).eq('store_id', STORE_ID).order('id').range(offset, offset + 499);
    if (error) throw new Error(error.message);
    rows.push(...data); if (data.length < 500) return rows;
  }
}
async function ownershipData() {
  const [products, sellers] = await Promise.all([allRows('products', 'id,name,dealer_id,status,stock_quantity,ownership_verification_status,ownership_verified_at,ownership_verified_by,merchant_feed_eligible,stable_feed_id'), allRows('dealer_profiles')]);
  return { products, sellers };
}
export async function getApprovedSellerOptions() {
  await requireAdmin();
  const { data, error } = await supabaseAdmin.from('dealer_profiles').select('user_id,public_name,legal_name,seller_type,approval_status,is_demo')
    .eq('store_id', STORE_ID).eq('approval_status', 'approved').eq('is_demo', false).is('deleted_at', null);
  if (error) throw new Error(error.message);
  return (data || []).map(publicSeller).filter(Boolean);
}
export async function getMarketplaceData() {
  await requireMainAdmin();
  const [{ products, sellers }, reviews, audit] = await Promise.all([ownershipData(), allRows('dealer_reviews'),
    supabaseAdmin.from('marketplace_audit').select('*').eq('store_id', STORE_ID).order('created_at', { ascending: false }).limit(100)]);
  if (audit.error) throw new Error(audit.error.message);
  return { products, sellers: sellers.map(s => ({ ...s, ...summarizeApprovedReviews(reviews.filter(r => r.dealer_user_id === s.user_id)),
    productCount: products.filter(p => p.dealer_id === s.user_id).length })), audit: audit.data, counts: ownershipCounts(products, sellers) };
}
export async function saveMainSeller(key, input, reason) {
  try {
    const admin = await requireMainAdmin();
    const current = await loadSeller(key);
    if (!current) throw new Error('Dealer not found');
    const allowed = [...SELLER_FIELDS, 'approval_status', 'merchant_feed_eligible', 'professional_seller_confirmed_at',
      'accepted_free_eu_shipping_at', 'accepted_returns_policy_at', 'accepted_warranty_rules_at'];
    const values = Object.fromEntries(allowed.filter(k => Object.hasOwn(input, k)).map(k => [k, input[k] === '' ? null : input[k]]));
    if (values.approval_status && values.approval_status !== 'approved') values.merchant_feed_eligible = false;
    const updated = { ...current, ...values };
    if (updated.approval_status === 'approved') {
      const errors = sellerValidation(updated, { demoAllowed: current.is_demo });
      if (errors.length) throw new Error(errors.join(', '));
    }
    const { error } = await supabaseAdmin.rpc('kariv_save_seller', { p_store: STORE_ID, p_key: key, p_actor: admin.id, p_values: values, p_reason: reason });
    if (error) throw new Error(error.message);
    refresh(); return { ok: true };
  } catch (error) { return { ok: false, error: error.message }; }
}
export async function previewOwnershipImport(csv, allowVerifiedOverride = false) {
  await requireMainAdmin();
  const { products, sellers } = await ownershipData();
  const plan = validateAssignments(parseAssignmentCsv(csv), products, sellers, { allowVerifiedOverride });
  return { plan, before: ownershipBackup(products.filter(p => plan.some(row => row.product_id === p.id))) };
}
export async function applyOwnershipImport(csv, preview, allowVerifiedOverride = false) {
  try {
    const admin = await requireMainAdmin();
    const next = await previewOwnershipImport(csv, allowVerifiedOverride);
    if (JSON.stringify(next.plan) !== JSON.stringify(preview)) throw new Error('Data changed since preview. Preview again.');
    const { data, error } = await supabaseAdmin.rpc('kariv_assign_products', { p_store: STORE_ID, p_actor: admin.id, p_plan: next.plan, p_override: allowVerifiedOverride });
    if (error) throw new Error(error.message);
    refresh(); return { ok: true, changed: data };
  } catch (error) { return { ok: false, error: error.message }; }
}
export async function exportOwnershipCsv() {
  await requireMainAdmin();
  const { products } = await ownershipData();
  return assignmentCsv(products.map(p => ({ product_id: p.id, seller_id: p.dealer_id || '', verification_status: p.ownership_verification_status || 'ambiguous', reason: '' })));
}
export async function getFeedDiagnostics() {
  await requireMainAdmin();
  const result = {};
  for (const locale of ['cs', 'de']) for (const type of ['marketplace_owned', 'third_party']) {
    try { const feed = await loadMerchantFeed(locale, type); result[locale + '/' + type] = { summary: feed.summary, excluded: feed.excluded }; }
    catch (error) { result[locale + '/' + type] = { error: error.message }; }
  }
  return result;
}
export async function getMySellerProfile() {
  const dealer = await requireDealer();
  const seller = await loadSeller(dealer.id);
  if (!seller) return null;
  return Object.fromEntries([...SELLER_FIELDS, 'approval_status'].map(k => [k, seller[k] ?? null]));
}
export async function saveMySellerProfile(input) {
  try {
    const dealer = await requireDealer();
    const seller = await loadSeller(dealer.id);
    if (!seller || seller.approval_status === 'suspended' || seller.deleted_at) throw new Error('Dealer profile unavailable');
    /** @type {Record<string, string | boolean>} */
    const values = Object.fromEntries(SELLER_FIELDS.filter(k => Object.hasOwn(input, k)).map(k => [k, String(input[k] || '').trim().slice(0, 10000)]));
    for (const key of ['logo_url', 'website_url']) if (values[key] && !/^https:\/\//.test(String(values[key]))) throw new Error('Public links must use HTTPS');
    values.approval_status = 'pending'; values.merchant_feed_eligible = false;
    // A fresh, explicit checkbox action records acceptance. Never infer consent.
    for (const key of ['accepted_free_eu_shipping_at', 'accepted_returns_policy_at', 'accepted_warranty_rules_at']) {
      if (input[key] === true) values[key] = new Date().toISOString();
    }
    const { error } = await supabaseAdmin.rpc('kariv_save_seller', { p_store: STORE_ID, p_key: dealer.id, p_actor: dealer.id, p_values: values, p_reason: 'Dealer profile submission for main administrator review' });
    if (error) throw new Error(error.message);
    refresh(); return { ok: true };
  } catch (error) { return { ok: false, error: error.message }; }
}
