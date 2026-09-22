import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const migration = await readFile(
  new URL('../supabase/migrations/20260921090000_create_purchase_routing.sql', import.meta.url),
  'utf8',
);
const approvalOnlyMigration = await readFile(
  new URL('../supabase/migrations/20260922130000_approved_dealer_checkout.sql', import.meta.url),
  'utf8',
);

test('purchase routing migration is explicitly limited to the Kariv tenant', () => {
  assert.match(migration, /store_id = '7efd71bc-0287-4f40-8a2f-1de330c49522'::uuid/);
  assert.match(migration, /restricted to the Kariv tenant/);
  assert.doesNotMatch(migration, /alter column purchase_route set default/i);
  assert.doesNotMatch(migration, /alter column purchase_route set not null/i);
});

test('last-unit checkout and unpaid cancellation are atomic and idempotent', () => {
  assert.match(migration, /create or replace function public\.create_kariv_order_with_reservation/);
  assert.match(migration, /from public\.products[\s\S]*for update/);
  assert.match(migration, /pg_advisory_xact_lock/);
  assert.match(migration, /set stock_quantity = stock_quantity - 1/);
  assert.match(migration, /create or replace function public\.cancel_kariv_order_before_payment/);
  assert.match(migration, /if v_order\.inventory_reserved is true/);
  assert.match(migration, /set stock_quantity = coalesce\(stock_quantity, 0\) \+ 1/);
});

test('deployment stops for unreconciled legacy inventory instead of guessing stock', () => {
  assert.match(migration, /non-cancelled historical orders without a valid product id/);
  assert.match(migration, /historical non-cancelled sold orders whose products still have positive stock/);
  assert.match(migration, /Kariv has legacy unpaid orders/);
  assert.match(migration, /raise exception[\s\S]*Reconcile them before migration/);
});

test('shared database collisions and nullable routing inputs fail closed', () => {
  assert.match(migration, /private table name\(s\) already exist and require manual schema review/);
  assert.match(migration, /purchase_route is not null[\s\S]*purchase_route in/);
  assert.match(migration, /purchase_status is not null[\s\S]*purchase_status in/);
  assert.match(migration, /p_buyer_selected_protection is true and p_purchase_route is distinct from 'escrow'/);
  assert.match(migration, /p_payment_method is distinct from 'bank_transfer'/);
  assert.match(migration, /p_purchase_policy_version is distinct from 2/);
});

test('the original migration established transaction-safe dealer routing', () => {
  const protectedEligibility = migration.match(
    /create or replace function public\.kariv_dealer_protected_eligible[\s\S]*?\n\$\$;/,
  )?.[0] || '';
  const directEligibility = migration.match(
    /create or replace function public\.kariv_dealer_direct_eligible[\s\S]*?\n\$\$;/,
  )?.[0] || '';
  const createOrder = migration.match(
    /create or replace function public\.create_kariv_order_with_reservation[\s\S]*?\n\$\$;/,
  )?.[0] || '';
  const acceptProtected = migration.match(
    /create or replace function public\.accept_kariv_protected_order[\s\S]*?\n\$\$;/,
  )?.[0] || '';

  assert.match(protectedEligibility, /from public\.dealer_applications[\s\S]*order by created_at desc[\s\S]*limit 1/);
  assert.match(protectedEligibility, /coalesce\(v_application_status, ''\) not in \('pending', 'approved'\)/);
  assert.match(protectedEligibility, /v_profile\.escrow_enabled is true/);
  assert.match(protectedEligibility, /v_profile\.compliance_status = 'clear'/);
  assert.match(protectedEligibility, /v_profile\.refund_status = 'clear'/);
  assert.match(protectedEligibility, /p_expected_policy_revision, -1\) = 0/);

  assert.match(directEligibility, /public\.kariv_dealer_protected_eligible/);
  assert.match(directEligibility, /v_application_status = 'approved'/);
  assert.match(directEligibility, /v_profile\.direct_sales_enabled is true/);
  assert.match(directEligibility, /v_profile\.payment_details_verified_at is not null/);

  assert.match(createOrder, /nullif\(trim\(p_buyer_user_id\), ''\) is null/);
  assert.match(createOrder, /p_purchase_route = 'escrow'[\s\S]*public\.kariv_dealer_protected_eligible/);
  assert.match(createOrder, /from public\.store_payment_destinations[\s\S]*v_destination\.verified_at is null/);
  assert.match(acceptProtected, /public\.kariv_dealer_protected_eligible/);
});

test('the latest migration makes admin approval the sole dealer-level checkout gate', () => {
  assert.match(approvalOnlyMigration, /create or replace function public\.kariv_dealer_protected_eligible/);
  assert.match(approvalOnlyMigration, /from public\.dealer_applications[\s\S]*order by created_at desc[\s\S]*limit 1/);
  assert.match(approvalOnlyMigration, /return coalesce\(v_application_status = 'approved', false\)/);
  assert.doesNotMatch(approvalOnlyMigration, /from public\.dealer_commerce_profiles|v_completed_sales|v_open_disputes|v_direct_limit|v_effective_tier/);
  assert.match(approvalOnlyMigration, /p_store_id <> '7efd71bc-0287-4f40-8a2f-1de330c49522'::uuid/);
  assert.match(approvalOnlyMigration, /revoke all on function public\.kariv_dealer_protected_eligible/);
  assert.match(approvalOnlyMigration, /grant execute on function public\.kariv_dealer_protected_eligible[\s\S]*to service_role/);
});

test('payout details and purchase RPCs are service-role only', () => {
  assert.match(migration, /revoke all on table public\.order_payment_instructions from anon, authenticated/);
  assert.match(migration, /revoke all on table public\.dealer_commerce_profiles from anon, authenticated/);
  for (const fn of [
    'create_kariv_order_with_reservation',
    'submit_kariv_payment_proof',
    'reject_kariv_payment_proof',
    'cancel_kariv_order_before_payment',
    'accept_kariv_direct_order',
    'open_kariv_order_dispute',
    'complete_kariv_order_after_review',
    'resolve_kariv_order_dispute',
  ]) {
    assert.match(migration, new RegExp(`revoke all on function public\\.${fn}`));
    assert.match(migration, new RegExp(`grant execute on function public\\.${fn}`));
  }
});
