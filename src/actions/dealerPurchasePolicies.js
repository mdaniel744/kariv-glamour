'use server';

import { revalidatePath } from 'next/cache';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { requireAdmin } from '@/lib/serverAuth';
import { STORE_ID } from '@/lib/supabaseData';
import { loadIdentities } from '@/lib/orderIdentities';
import { loadDealerCommerceAssessment } from '@/lib/purchasePolicyServer';
import { deriveEffectiveDealerTier, resolveDirectLimitEur } from '@/lib/purchasePolicy';

const DEALER_TIERS = new Set(['probationary', 'standard', 'trusted', 'enterprise']);
const COMPLIANCE_STATUSES = new Set(['clear', 'review', 'suspended']);
const REFUND_STATUSES = new Set(['clear', 'overdue']);
const PLATFORM_PAYMENT_ROUTES = new Set(['kariv_direct', 'escrow']);

function nullableDate(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function nullableMoney(value) {
  if (value === '' || value == null) return null;
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : null;
}

function shapePolicy(row) {
  return {
    dealerUserId: row.dealer_user_id,
    tier: row.tier,
    activatedAt: row.activated_at,
    reactivatedAt: row.reactivated_at,
    directSalesEnabled: !!row.direct_sales_enabled,
    directLimitEur: row.direct_limit_eur == null ? null : Number(row.direct_limit_eur),
    escrowEnabled: row.escrow_enabled !== false,
    complianceStatus: row.compliance_status,
    refundStatus: row.refund_status,
    sellerVerified: !!row.seller_verified,
    underwritten: !!row.underwritten,
    paymentBeneficiaryName: row.payment_beneficiary_name || '',
    paymentIban: row.payment_iban || '',
    paymentBic: row.payment_bic || '',
    paymentBankName: row.payment_bank_name || '',
    paymentDetailsVerified: !!row.payment_details_verified_at,
    paymentDetailsVerifiedAt: row.payment_details_verified_at || null,
    policyRevision: Number(row.policy_revision || 0),
    updatedAt: row.updated_at,
    updatedBy: row.updated_by || '',
  };
}

function defaultPolicy(dealerUserId, activatedAt = null) {
  return {
    dealerUserId,
    tier: 'probationary',
    activatedAt,
    reactivatedAt: null,
    directSalesEnabled: false,
    directLimitEur: null,
    escrowEnabled: true,
    complianceStatus: 'clear',
    refundStatus: 'clear',
    sellerVerified: false,
    underwritten: false,
    paymentBeneficiaryName: '',
    paymentIban: '',
    paymentBic: '',
    paymentBankName: '',
    paymentDetailsVerified: false,
    paymentDetailsVerifiedAt: null,
    policyRevision: 0,
    updatedAt: null,
    updatedBy: '',
  };
}

function shapePaymentDestination(row, route) {
  return {
    purchaseRoute: route,
    beneficiaryName: row?.beneficiary_name || '',
    iban: row?.iban || '',
    bic: row?.bic || '',
    bankName: row?.bank_name || '',
    verified: !!row?.verified_at,
    verifiedAt: row?.verified_at || null,
    updatedAt: row?.updated_at || null,
  };
}

export async function listPlatformPaymentDestinations() {
  await requireAdmin();
  const { data, error } = await supabaseAdmin
    .from('store_payment_destinations')
    .select('*')
    .eq('store_id', STORE_ID)
    .in('purchase_route', [...PLATFORM_PAYMENT_ROUTES]);
  if (error) throw new Error(error.message);
  const byRoute = new Map((data || []).map((row) => [row.purchase_route, row]));
  return [...PLATFORM_PAYMENT_ROUTES].map((route) => shapePaymentDestination(byRoute.get(route), route));
}

export async function updatePlatformPaymentDestination(input) {
  const admin = await requireAdmin();
  const purchaseRoute = input?.purchaseRoute;
  if (!PLATFORM_PAYMENT_ROUTES.has(purchaseRoute)) return { ok: false, error: 'Invalid payment route.' };

  const beneficiaryName = typeof input?.beneficiaryName === 'string' ? input.beneficiaryName.trim() : '';
  const iban = typeof input?.iban === 'string' ? input.iban.replace(/\s+/g, '').toUpperCase() : '';
  const bic = typeof input?.bic === 'string' ? input.bic.replace(/\s+/g, '').toUpperCase() : '';
  const bankName = typeof input?.bankName === 'string' ? input.bankName.trim() : '';
  const verified = input?.verified === true;
  if (verified && (
    !beneficiaryName ||
    !/^[A-Z]{2}[A-Z0-9]{13,32}$/.test(iban) ||
    !bankName ||
    (bic && !/^[A-Z0-9]{8}([A-Z0-9]{3})?$/.test(bic))
  )) {
    return { ok: false, error: 'Verification requires a beneficiary, valid IBAN, bank name, and (when provided) a valid BIC/SWIFT.' };
  }

  const row = {
    store_id: STORE_ID,
    purchase_route: purchaseRoute,
    beneficiary_name: beneficiaryName || null,
    iban: iban || null,
    bic: bic || null,
    bank_name: bankName || null,
    verified_at: verified ? new Date().toISOString() : null,
    verified_by: verified ? admin.id : null,
    updated_at: new Date().toISOString(),
    updated_by: admin.id,
  };
  const { data, error } = await supabaseAdmin
    .from('store_payment_destinations')
    .upsert(row, { onConflict: 'store_id,purchase_route' })
    .select()
    .single();
  if (error) return { ok: false, error: error.message };

  for (const locale of ['en', 'de', 'cs']) {
    revalidatePath(`/${locale}/admin/dealer-purchase-rules`);
    revalidatePath(`/${locale}/shop`);
  }
  return { ok: true, destination: shapePaymentDestination(data, purchaseRoute) };
}

/**
 * Tenant-scoped administration view of every approved or actively listing
 * dealer. Missing policy rows intentionally appear as probationary/escrow-only
 * so a deployment can never silently grant direct-payment privileges.
 */
export async function listDealerPurchasePolicies() {
  await requireAdmin();

  const [applicationsResult, profilesResult, listingsResult] = await Promise.all([
    supabaseAdmin
      .from('dealer_applications')
      .select('dealer_user_id, company_name, contact_email, status, reviewed_at, created_at')
      .eq('store_id', STORE_ID)
      .order('created_at', { ascending: false }),
    supabaseAdmin
      .from('dealer_commerce_profiles')
      .select('*')
      .eq('store_id', STORE_ID)
      .order('updated_at', { ascending: false }),
    supabaseAdmin
      .from('products')
      .select('dealer_id')
      .eq('store_id', STORE_ID)
      .not('dealer_id', 'is', null),
  ]);

  if (applicationsResult.error) throw new Error(applicationsResult.error.message);
  if (profilesResult.error) throw new Error(profilesResult.error.message);
  if (listingsResult.error) throw new Error(listingsResult.error.message);

  const applicationRows = applicationsResult.data || [];
  const profiles = profilesResult.data || [];
  const listingRows = listingsResult.data || [];
  const applicationsByDealer = new Map();
  // Rows are newest-first. Only the latest application is authoritative;
  // an older approved row must not override a later rejection/revocation.
  for (const application of applicationRows) {
    if (application.dealer_user_id && !applicationsByDealer.has(application.dealer_user_id)) {
      applicationsByDealer.set(application.dealer_user_id, application);
    }
  }

  const profilesByDealer = new Map(profiles.map((profile) => [profile.dealer_user_id, profile]));
  const dealerIds = [...new Set([
    ...applicationsByDealer.keys(),
    ...profiles.map((profile) => profile.dealer_user_id),
    ...listingRows.map((listing) => listing.dealer_id),
  ].filter(Boolean))];
  const [identities, assessments] = await Promise.all([
    loadIdentities(dealerIds).catch(() => new Map()),
    Promise.all(dealerIds.map((dealerId) => loadDealerCommerceAssessment(dealerId).catch(() => null))),
  ]);
  const assessmentsByDealer = new Map(dealerIds.map((dealerId, index) => [dealerId, assessments[index]]));

  return dealerIds.map((dealerUserId) => {
    const application = applicationsByDealer.get(dealerUserId);
    const approvedApplication = application?.status === 'approved' ? application : null;
    const identity = identities.get(dealerUserId);
    const policy = profilesByDealer.has(dealerUserId)
      ? shapePolicy(profilesByDealer.get(dealerUserId))
      : defaultPolicy(dealerUserId, approvedApplication?.reviewed_at || approvedApplication?.created_at || null);
    const assessment = assessmentsByDealer.get(dealerUserId);
    const cleanPerformance = assessment?.complianceStatus === 'clear'
      && assessment?.refundStatus === 'clear'
      && assessment?.unresolvedDisputes === 0;
    const effectiveTier = deriveEffectiveDealerTier({
      configuredTier: assessment?.configuredTier || policy.tier,
      activeDays: assessment?.activeDays || 0,
      completedSales: assessment?.completedSales || 0,
      stablePerformance: cleanPerformance,
      excellentPerformance: cleanPerformance,
      underwritten: assessment?.underwritten || false,
    });

    return {
      ...policy,
      companyName: application?.company_name || identity?.fullName || 'Dealer',
      contactEmail: application?.contact_email || identity?.email || '',
      applicationApprovedAt: approvedApplication?.reviewed_at || approvedApplication?.created_at || null,
      hasApprovedApplication: !!approvedApplication,
      listingCount: listingRows.filter((listing) => listing.dealer_id === dealerUserId).length,
      hasSavedPolicy: profilesByDealer.has(dealerUserId),
      effectiveTier,
      activeDays: assessment?.activeDays || 0,
      completedSales: assessment?.completedSales || 0,
      unresolvedDisputes: assessment?.unresolvedDisputes ?? 1,
      effectiveDirectLimitEur: resolveDirectLimitEur(effectiveTier, assessment?.configuredDirectLimitEur),
    };
  }).sort((a, b) => a.companyName.localeCompare(b.companyName));
}

export async function updateDealerPurchasePolicy(input) {
  const admin = await requireAdmin();
  const dealerUserId = typeof input?.dealerUserId === 'string' ? input.dealerUserId.trim() : '';
  const tier = input?.tier;
  const complianceStatus = input?.complianceStatus;
  const refundStatus = input?.refundStatus;

  if (!dealerUserId) return { ok: false, error: 'Dealer is required.' };
  if (!DEALER_TIERS.has(tier)) return { ok: false, error: 'Invalid dealer tier.' };
  if (!COMPLIANCE_STATUSES.has(complianceStatus)) return { ok: false, error: 'Invalid compliance status.' };
  if (!REFUND_STATUSES.has(refundStatus)) return { ok: false, error: 'Invalid refund status.' };

  const activatedAt = nullableDate(input.activatedAt);
  const reactivatedAt = nullableDate(input.reactivatedAt);
  let directSalesEnabled = !!input.directSalesEnabled;
  let directLimitEur = nullableMoney(input.directLimitEur);
  let escrowEnabled = input.escrowEnabled !== false;
  const sellerVerified = !!input.sellerVerified;
  const underwritten = !!input.underwritten;
  const paymentBeneficiaryName = typeof input.paymentBeneficiaryName === 'string' ? input.paymentBeneficiaryName.trim() : '';
  const paymentIban = typeof input.paymentIban === 'string' ? input.paymentIban.replace(/\s+/g, '').toUpperCase() : '';
  const paymentBic = typeof input.paymentBic === 'string' ? input.paymentBic.replace(/\s+/g, '').toUpperCase() : '';
  const paymentBankName = typeof input.paymentBankName === 'string' ? input.paymentBankName.trim() : '';
  const paymentDetailsVerified = !!input.paymentDetailsVerified;

  // The admin screen must not be able to weaken the agreed guardrails. The
  // server-side purchase evaluator repeats these checks when an order is made.
  if (tier === 'probationary') {
    directSalesEnabled = false;
    directLimitEur = null;
    escrowEnabled = true;
  }
  if (!sellerVerified || !paymentDetailsVerified || complianceStatus !== 'clear' || refundStatus !== 'clear') {
    directSalesEnabled = false;
  }
  if (tier === 'enterprise' && !underwritten) {
    directSalesEnabled = false;
  }
  if (directSalesEnabled && directLimitEur == null) {
    return { ok: false, error: 'A direct-payment limit is required when direct sales are enabled.' };
  }
  if (paymentDetailsVerified && (
    !paymentBeneficiaryName ||
    !/^[A-Z]{2}[A-Z0-9]{13,32}$/.test(paymentIban) ||
    !paymentBankName ||
    (paymentBic && !/^[A-Z0-9]{8}([A-Z0-9]{3})?$/.test(paymentBic))
  )) {
    return { ok: false, error: 'Verified payout details require a beneficiary, valid IBAN, bank name, and (when provided) a valid BIC/SWIFT.' };
  }
  if (tier === 'standard' && directLimitEur != null && directLimitEur > 10000) {
    return { ok: false, error: 'Standard dealers cannot exceed a €10,000 direct-payment limit.' };
  }
  if (tier === 'trusted' && directLimitEur != null && directLimitEur > 50000) {
    return { ok: false, error: 'Trusted dealers cannot exceed a €50,000 direct-payment limit.' };
  }

  // A policy may only be created for an approved or already-active Kariv
  // dealer. This prevents an arbitrary Clerk user id receiving seller rights.
  const [{ data: application }, { count: listingCount }, { data: existing }] = await Promise.all([
    supabaseAdmin
      .from('dealer_applications')
      .select('id, status')
      .eq('store_id', STORE_ID)
      .eq('dealer_user_id', dealerUserId)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabaseAdmin
      .from('products')
      .select('id', { count: 'exact', head: true })
      .eq('store_id', STORE_ID)
      .eq('dealer_id', dealerUserId),
    supabaseAdmin
      .from('dealer_commerce_profiles')
      .select('dealer_user_id, policy_revision')
      .eq('store_id', STORE_ID)
      .eq('dealer_user_id', dealerUserId)
      .maybeSingle(),
  ]);
  const approvedApplication = application?.status === 'approved' ? application : null;
  if (!approvedApplication && !existing && !listingCount) {
    return { ok: false, error: 'Only an approved or actively listing dealer can receive a purchase policy.' };
  }
  if (!approvedApplication) directSalesEnabled = false;
  const effectiveSellerVerified = Boolean(approvedApplication && sellerVerified);

  const row = {
    store_id: STORE_ID,
    dealer_user_id: dealerUserId,
    tier,
    activated_at: activatedAt,
    reactivated_at: reactivatedAt,
    direct_sales_enabled: directSalesEnabled,
    direct_limit_eur: directLimitEur,
    escrow_enabled: escrowEnabled,
    compliance_status: complianceStatus,
    refund_status: refundStatus,
    seller_verified: effectiveSellerVerified,
    underwritten,
    payment_beneficiary_name: paymentBeneficiaryName || null,
    payment_iban: paymentIban || null,
    payment_bic: paymentBic || null,
    payment_bank_name: paymentBankName || null,
    payment_details_verified_at: paymentDetailsVerified ? new Date().toISOString() : null,
    payment_details_verified_by: paymentDetailsVerified ? admin.id : null,
    updated_by: admin.id,
    updated_at: new Date().toISOString(),
    // Every administrator change invalidates any checkout assessment that was
    // made against the previous routing controls. The atomic order function
    // compares this revision again while holding its transaction locks.
    policy_revision: Number(existing?.policy_revision || 0) + 1,
  };

  const { data, error } = await supabaseAdmin
    .from('dealer_commerce_profiles')
    .upsert(row, { onConflict: 'store_id,dealer_user_id' })
    .select()
    .single();
  if (error) return { ok: false, error: error.message };

  for (const locale of ['en', 'de', 'cs']) {
    revalidatePath(`/${locale}/admin/dealer-purchase-rules`);
    revalidatePath(`/${locale}/dealer-profile/${dealerUserId}`);
  }

  return { ok: true, policy: shapePolicy(data) };
}
