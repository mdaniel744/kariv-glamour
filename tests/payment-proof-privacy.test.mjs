import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const [storageAction, orderAction, uploader, orderDetail, adminOrderDetail, maintenanceJob, migration] = await Promise.all([
  readFile(new URL('../src/actions/storage.js', import.meta.url), 'utf8'),
  readFile(new URL('../src/actions/orders.js', import.meta.url), 'utf8'),
  readFile(new URL('../src/components/escrow/PaymentProofUploader.jsx', import.meta.url), 'utf8'),
  readFile(new URL('../src/page-content/portal/PortalOrderDetail.jsx', import.meta.url), 'utf8'),
  readFile(new URL('../src/page-content/admin/AdminOrderDetail.jsx', import.meta.url), 'utf8'),
  readFile(new URL('../scripts/releaseEscrowFunds.mjs', import.meta.url), 'utf8'),
  readFile(new URL('../supabase/migrations/20260921090000_create_purchase_routing.sql', import.meta.url), 'utf8'),
]);

test('payment evidence uses an order-owned private bucket, not public catalogue media', () => {
  assert.match(storageAction, /export async function uploadPaymentProof\(orderId, formData\)/);
  assert.match(storageAction, /const PAYMENT_PROOF_BUCKET = 'kariv-payment-proofs'/);
  assert.match(storageAction, /\.eq\('buyer_user_id', buyerId\)/);
  assert.match(storageAction, /const prefix = paymentProofPrefix\(orderId, user\.id\)/);
  assert.match(storageAction, /path = `\$\{prefix\}pending\.(?:pdf|webp)`/);
  assert.match(storageAction, /upsert: true/);
  assert.match(storageAction, /return \{ ok: true, key: path, previewUrl/);
  assert.match(storageAction, /purpose === 'payment-proof'[\s\S]*Payment proof must be uploaded from its order page/);
  assert.doesNotMatch(storageAction, /uploadPrivatePaymentProof[\s\S]{0,1500}getPublicUrl/);

  assert.match(migration, /'kariv-payment-proofs',[\s\S]*false,[\s\S]*10485760/);
  assert.match(migration, /on conflict \(id\) do update[\s\S]*public = false/);
});

test('proof review is bounded, auditable, and can release a fraudulent reservation', () => {
  assert.match(migration, /create table if not exists public\.order_payment_proof_events/);
  assert.match(migration, /event_type in \('submitted', 'rejected_reopen', 'rejected_cancel'\)/);
  assert.match(migration, /v_prior_submissions >= 3/);
  assert.match(migration, /create or replace function public\.reject_kariv_payment_proof/);
  assert.match(migration, /case when p_cancel_order then 'rejected_cancel' else 'rejected_reopen' end/);
  assert.match(migration, /now\(\) \+ interval '6 hours'/);
  assert.match(migration, /cancel_kariv_order_before_payment\(p_store_id, p_order_id\)/);
  assert.match(migration, /revoke all on function public\.reject_kariv_payment_proof[\s\S]*grant execute on function public\.reject_kariv_payment_proof/);
  assert.match(orderAction, /export async function rejectPaymentProof/);
  assert.match(orderAction, /rpc\('reject_kariv_payment_proof'/);
  assert.match(adminOrderDetail, /Reject & Request Correction/);
  assert.match(adminOrderDetail, /Reject & Cancel Reservation/);
  assert.match(maintenanceJob, /overdueProofReviews/);
});

test('revoked dealers cannot keep exposing copied direct-payment instructions', () => {
  assert.match(orderAction, /row\.purchase_route === PURCHASE_ROUTES\.DEALER_DIRECT/);
  assert.match(orderAction, /rpc\('kariv_dealer_direct_eligible'/);
  assert.match(orderAction, /if \(error \|\| eligible !== true\) paymentInstructions = ''/);
  assert.match(orderAction, /&& !row\.payment_reference/);
});

test('payment-proof submission is atomic, ownership-bound and policy-revalidated', () => {
  assert.match(migration, /create or replace function public\.submit_kariv_payment_proof/);
  assert.match(migration, /buyer_user_id = p_buyer_user_id[\s\S]*for update/);
  assert.match(migration, /or nullif\(trim\(v_order\.payment_reference\), ''\) is not null/);
  assert.match(migration, /storage\.objects[\s\S]*bucket_id = 'kariv-payment-proofs'[\s\S]*name = p_proof_key/);
  assert.match(migration, /kariv_dealer_direct_eligible\([\s\S]*v_audit\.source_value_eur[\s\S]*v_audit\.dealer_policy_revision/);
  assert.match(migration, /kariv_dealer_protected_eligible\([\s\S]*v_audit\.dealer_policy_revision/);
  assert.match(migration, /payment_reference = p_proof_key/);
  assert.match(migration, /payment_review_deadline = v_deadline/);
  assert.match(migration, /v_deadline := coalesce\(v_order\.payment_review_deadline, now\(\) \+ interval '72 hours'\)/);
  assert.match(migration, /revoke all on function public\.submit_kariv_payment_proof[\s\S]*grant execute on function public\.submit_kariv_payment_proof/);
});

test('the storefront persists opaque keys and only exposes short-lived signed previews', () => {
  assert.match(uploader, /uploadPaymentProof\(orderId, formData\)/);
  assert.match(uploader, /onUploaded\(res\.key\)/);
  assert.match(orderDetail, /<PaymentProofUploader[\s\S]*orderId=\{order\.id\}/);
  assert.match(orderAction, /createSignedUrl\(row\.payment_reference, PAYMENT_PROOF_URL_TTL_SECONDS\)/);
  assert.match(orderAction, /PAYMENT_PROOF_URL_TTL_SECONDS = 5 \* 60/);
  assert.match(orderAction, /finalizePrivatePaymentProof\(paymentProofKey, expectedPrefix, extension\)/);
  assert.match(orderAction, /const immutableKey = `\$\{prefix\}\$\{crypto\.randomUUID\(\)\}/);
  assert.match(orderAction, /upsert: false/);
  assert.match(orderAction, /\^https\?:\\\/\\\//i);
  assert.match(orderAction, /rpc\('submit_kariv_payment_proof'/);
  assert.match(migration, /v_file_name !~ '\^\[0-9a-fA-F-\]\{36\}\\\.\(pdf\|webp\)\$'/);
  assert.doesNotMatch(orderAction, /update\(\{ payment_reference: paymentProof/);
});
