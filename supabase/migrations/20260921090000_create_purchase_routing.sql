-- Kariv purchase-routing policy. This is tenant-scoped because the Supabase
-- project is shared; no defaults or rows are created for another storefront.

-- These are new private tables owned by this migration. Because the database
-- is shared by multiple storefronts, never reuse or change permissions on a
-- pre-existing table with the same name: stop and require a schema review.
do $$
declare
  v_existing text;
begin
  select string_agg(name, ', ' order by name) into v_existing
  from unnest(array[
    'dealer_commerce_profiles',
    'order_payment_instructions',
    'order_purchase_policy_audits',
    'store_payment_destinations',
    'order_financial_events',
    'order_payment_proof_events'
  ]) as candidate(name)
  where to_regclass('public.' || name) is not null;

  if v_existing is not null then
    raise exception 'Purchase-routing migration stopped because private table name(s) already exist and require manual schema review: %', v_existing;
  end if;
end $$;

create table if not exists public.dealer_commerce_profiles (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null,
  dealer_user_id text not null,
  tier text not null default 'probationary'
    check (tier in ('probationary', 'standard', 'trusted', 'enterprise')),
  activated_at timestamptz,
  reactivated_at timestamptz,
  direct_sales_enabled boolean not null default false,
  direct_limit_eur numeric(14,2)
    check (direct_limit_eur is null or direct_limit_eur > 0),
  escrow_enabled boolean not null default true,
  compliance_status text not null default 'clear'
    check (compliance_status in ('clear', 'review', 'suspended')),
  refund_status text not null default 'clear'
    check (refund_status in ('clear', 'overdue')),
  seller_verified boolean not null default false,
  underwritten boolean not null default false,
  payment_beneficiary_name text,
  payment_iban text,
  payment_bic text,
  payment_bank_name text,
  payment_details_verified_at timestamptz,
  payment_details_verified_by text,
  policy_revision bigint not null default 1 check (policy_revision > 0),
  updated_by text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (store_id, dealer_user_id)
);

alter table public.dealer_commerce_profiles
  add column if not exists policy_revision bigint not null default 1;

create or replace function public.bump_kariv_dealer_policy_revision()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if tg_op = 'INSERT' then
    if new.store_id = '7efd71bc-0287-4f40-8a2f-1de330c49522'::uuid then
      perform pg_advisory_xact_lock(hashtextextended(new.store_id::text || ':dealer-policy:' || new.dealer_user_id, 0));
      new.policy_revision := greatest(coalesce(new.policy_revision, 1), 1);
    end if;
  else
    if (old.store_id = '7efd71bc-0287-4f40-8a2f-1de330c49522'::uuid
        or new.store_id = '7efd71bc-0287-4f40-8a2f-1de330c49522'::uuid)
      and (new.store_id is distinct from old.store_id or new.dealer_user_id is distinct from old.dealer_user_id)
    then
      raise exception 'Kariv dealer policy identities cannot be reassigned.';
    end if;
    if old.store_id = '7efd71bc-0287-4f40-8a2f-1de330c49522'::uuid then
      perform pg_advisory_xact_lock(hashtextextended(old.store_id::text || ':dealer-policy:' || old.dealer_user_id, 0));
      new.policy_revision := old.policy_revision + 1;
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists dealer_commerce_profiles_kariv_revision on public.dealer_commerce_profiles;
create trigger dealer_commerce_profiles_kariv_revision
before insert or update on public.dealer_commerce_profiles
for each row execute function public.bump_kariv_dealer_policy_revision();

create or replace function public.lock_kariv_dealer_application_change()
returns trigger
language plpgsql
set search_path = public
as $$
declare
  v_store_id uuid;
  v_dealer_user_id text;
begin
  if tg_op = 'INSERT' then
    v_store_id := new.store_id;
    v_dealer_user_id := new.dealer_user_id;
  elsif tg_op = 'DELETE' then
    v_store_id := old.store_id;
    v_dealer_user_id := old.dealer_user_id;
  else
    if (old.store_id = '7efd71bc-0287-4f40-8a2f-1de330c49522'::uuid
        or new.store_id = '7efd71bc-0287-4f40-8a2f-1de330c49522'::uuid)
      and (new.store_id is distinct from old.store_id or new.dealer_user_id is distinct from old.dealer_user_id)
    then
      raise exception 'Kariv dealer application identities cannot be reassigned.';
    end if;
    v_store_id := new.store_id;
    v_dealer_user_id := new.dealer_user_id;
  end if;

  if v_store_id = '7efd71bc-0287-4f40-8a2f-1de330c49522'::uuid
    and nullif(trim(v_dealer_user_id), '') is not null
  then
    perform pg_advisory_xact_lock(hashtextextended(v_store_id::text || ':dealer-policy:' || v_dealer_user_id, 0));
    -- Updating the profile only to refresh its revision intentionally
    -- invalidates unpaid direct orders assessed against an older approval.
    update public.dealer_commerce_profiles
    set updated_at = now()
    where store_id = v_store_id and dealer_user_id = v_dealer_user_id;
  end if;
  if tg_op = 'DELETE' then return old; end if;
  return new;
end;
$$;

drop trigger if exists dealer_applications_kariv_policy_lock on public.dealer_applications;
create trigger dealer_applications_kariv_policy_lock
before insert or update or delete on public.dealer_applications
for each row execute function public.lock_kariv_dealer_application_change();

create or replace function public.invalidate_kariv_dealer_policy_for_dispute()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_order_id uuid := case when tg_op = 'DELETE' then old.order_id else new.order_id end;
  v_store_id uuid;
  v_dealer_user_id text;
  v_old_is_kariv boolean := false;
  v_new_is_kariv boolean := false;
begin
  if tg_op = 'UPDATE' and new.order_id is distinct from old.order_id then
    select exists (
      select 1 from public.orders
      where id = old.order_id and store_id = '7efd71bc-0287-4f40-8a2f-1de330c49522'::uuid
    ) into v_old_is_kariv;
    select exists (
      select 1 from public.orders
      where id = new.order_id and store_id = '7efd71bc-0287-4f40-8a2f-1de330c49522'::uuid
    ) into v_new_is_kariv;
    if v_old_is_kariv or v_new_is_kariv then
      raise exception 'Kariv disputes cannot be reassigned to another order.';
    end if;
  end if;

  select store_id, dealer_user_id into v_store_id, v_dealer_user_id
  from public.orders
  where id = v_order_id;

  if v_store_id = '7efd71bc-0287-4f40-8a2f-1de330c49522'::uuid
    and nullif(trim(v_dealer_user_id), '') is not null
  then
    perform pg_advisory_xact_lock(hashtextextended(v_store_id::text || ':dealer-policy:' || v_dealer_user_id, 0));
    update public.dealer_commerce_profiles
    set updated_at = now()
    where store_id = v_store_id and dealer_user_id = v_dealer_user_id;
  end if;

  if tg_op = 'DELETE' then return old; end if;
  return new;
end;
$$;

drop trigger if exists disputes_kariv_policy_invalidation on public.disputes;
create trigger disputes_kariv_policy_invalidation
before insert or update or delete on public.disputes
for each row execute function public.invalidate_kariv_dealer_policy_for_dispute();

create index if not exists dealer_commerce_profiles_store_tier_idx
  on public.dealer_commerce_profiles (store_id, tier, dealer_user_id);

alter table public.dealer_commerce_profiles enable row level security;

comment on table public.dealer_commerce_profiles is
  'Tenant-scoped admin controls for dealer purchase routing. Server-side evaluation also derives account age, completed sales and open disputes from source records.';

alter table public.orders
  add column if not exists purchase_route text,
  add column if not exists purchase_status text,
  add column if not exists buyer_selected_protection boolean,
  add column if not exists purchase_policy_version smallint,
  add column if not exists purchase_policy_snapshot jsonb,
  add column if not exists inventory_reserved boolean,
  add column if not exists reservation_expires_at timestamptz,
  add column if not exists payment_review_deadline timestamptz;

-- Payment evidence is never public catalogue media. Only server actions using
-- the service-role client read or write this bucket; no authenticated/anon
-- storage policy is created for it.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'kariv-payment-proofs',
  'kariv-payment-proofs',
  false,
  10485760,
  array['application/pdf', 'image/webp']::text[]
)
on conflict (id) do update
set public = false,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

create table if not exists public.order_payment_instructions (
  order_id uuid primary key references public.orders(id) on delete cascade,
  store_id uuid not null,
  dealer_user_id text,
  instructions text not null check (char_length(instructions) between 20 and 2000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_purchase_policy_audits (
  order_id uuid primary key references public.orders(id) on delete cascade,
  store_id uuid not null,
  product_id uuid not null,
  dealer_user_id text,
  source_value_eur numeric(14,2),
  dealer_policy_revision bigint,
  created_at timestamptz not null default now(),
  check (source_value_eur is null or source_value_eur > 0),
  check (dealer_policy_revision is null or dealer_policy_revision >= 0)
);

alter table public.order_purchase_policy_audits enable row level security;

create index if not exists order_purchase_policy_audits_product_idx
  on public.order_purchase_policy_audits (store_id, product_id, order_id);

-- Catalogue/admin/import writes must not make a one-off watch available again
-- while checkout holds it. The checkout and cancellation functions change
-- the product only before the private audit becomes active or after they have
-- atomically moved the order out of its reserving state.
create or replace function public.guard_kariv_reserved_product_mutation()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_store_id uuid := case when tg_op = 'DELETE' then old.store_id else new.store_id end;
  v_product_id uuid := old.id;
  v_has_active_reservation boolean := false;
  v_has_non_cancelled_sale boolean := false;
begin
  if tg_op = 'UPDATE'
    and (old.store_id = '7efd71bc-0287-4f40-8a2f-1de330c49522'::uuid
      or new.store_id = '7efd71bc-0287-4f40-8a2f-1de330c49522'::uuid)
    and new.store_id is distinct from old.store_id
  then
    raise exception 'A product cannot be moved into or out of the Kariv tenant.';
  end if;

  if v_store_id = '7efd71bc-0287-4f40-8a2f-1de330c49522'::uuid then
    select exists (
      select 1
      from public.order_purchase_policy_audits a
      join public.orders o on o.id = a.order_id and o.store_id = a.store_id
      where a.store_id = v_store_id
        and a.product_id = v_product_id
        and o.escrow_status in ('pending_review', 'dealer_accepted')
        and coalesce(o.purchase_status, '') in ('awaiting_seller_confirmation', 'awaiting_payment')
    ) into v_has_active_reservation;

    select exists (
      select 1
      from public.order_purchase_policy_audits a
      join public.orders o on o.id = a.order_id and o.store_id = a.store_id
      where a.store_id = v_store_id
        and a.product_id = v_product_id
        and o.escrow_status <> 'cancelled'
        and coalesce(o.purchase_status, '') <> 'cancelled'
    ) into v_has_non_cancelled_sale;

    if v_has_active_reservation then
      raise exception 'This Kariv product has an active checkout reservation.';
    end if;

    if v_has_non_cancelled_sale then
      if tg_op = 'DELETE' then
        raise exception 'A sold Kariv product cannot be deleted without an audited return.';
      elsif new.dealer_id is distinct from old.dealer_id
        or coalesce(new.stock_quantity, 0) > coalesce(old.stock_quantity, 0)
      then
        raise exception 'A sold Kariv product cannot be reassigned or returned to stock without an audited return.';
      end if;
    end if;
  end if;
  if tg_op = 'DELETE' then return old; end if;
  return new;
end;
$$;

drop trigger if exists products_kariv_reservation_guard on public.products;
create trigger products_kariv_reservation_guard
before update or delete on public.products
for each row execute function public.guard_kariv_reserved_product_mutation();

create index if not exists order_payment_instructions_store_dealer_idx
  on public.order_payment_instructions (store_id, dealer_user_id, order_id);

alter table public.order_payment_instructions enable row level security;

create table if not exists public.store_payment_destinations (
  store_id uuid not null,
  purchase_route text not null check (purchase_route in ('kariv_direct', 'escrow')),
  beneficiary_name text,
  iban text,
  bic text,
  bank_name text,
  verified_at timestamptz,
  verified_by text,
  updated_at timestamptz not null default now(),
  updated_by text,
  primary key (store_id, purchase_route)
);

alter table public.store_payment_destinations enable row level security;

create table if not exists public.order_financial_events (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null,
  order_id uuid not null references public.orders(id) on delete restrict,
  dispute_id uuid references public.disputes(id) on delete restrict,
  event_type text not null check (event_type in (
    'kariv_refund_completed',
    'external_refund_completed',
    'protected_refund_completed',
    'protected_payout_completed'
  )),
  purchase_route text not null check (purchase_route in ('kariv_direct', 'dealer_direct', 'escrow')),
  amount numeric(14,2) not null check (amount >= 0),
  currency text not null check (char_length(currency) between 3 and 8),
  external_reference text not null check (char_length(trim(external_reference)) between 3 and 250),
  recorded_by text not null,
  notes text,
  created_at timestamptz not null default now(),
  unique (order_id, event_type)
);

create index if not exists order_financial_events_store_order_idx
  on public.order_financial_events (store_id, order_id, created_at desc);

alter table public.order_financial_events enable row level security;

create table if not exists public.order_payment_proof_events (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null,
  order_id uuid not null references public.orders(id) on delete restrict,
  proof_key text not null check (char_length(proof_key) between 20 and 1000),
  event_type text not null check (event_type in ('submitted', 'rejected_reopen', 'rejected_cancel')),
  reason text,
  recorded_by text not null,
  created_at timestamptz not null default now()
);

create index if not exists order_payment_proof_events_store_order_idx
  on public.order_payment_proof_events (store_id, order_id, created_at desc);

alter table public.order_payment_proof_events enable row level security;

-- These records contain dealer payout destinations. Application access is
-- exclusively through tenant-scoped service-role server actions; no browser
-- role receives direct table privileges.
revoke all on table public.order_payment_instructions from anon, authenticated;
revoke all on table public.order_purchase_policy_audits from anon, authenticated;
revoke all on table public.dealer_commerce_profiles from anon, authenticated;
revoke all on table public.store_payment_destinations from anon, authenticated;
revoke all on table public.order_financial_events from anon, authenticated;
revoke all on table public.order_payment_proof_events from anon, authenticated;
grant all on table public.order_payment_instructions to service_role;
grant all on table public.order_purchase_policy_audits to service_role;
grant all on table public.dealer_commerce_profiles to service_role;
grant all on table public.store_payment_destinations to service_role;
grant select, insert on table public.order_financial_events to service_role;
grant select, insert on table public.order_payment_proof_events to service_role;

comment on table public.order_payment_instructions is
  'Service-role-only, order-specific instructions for dealer-direct payment. Kept outside shared orders rows so bank details are not exposed by an existing orders SELECT policy.';

comment on table public.order_purchase_policy_audits is
  'Private checkout-time risk inputs used to revalidate dealer eligibility atomically. Kept outside the buyer-readable shared orders row.';

comment on table public.order_payment_proof_events is
  'Immutable service-role audit trail for submitted and rejected private payment evidence. Proof objects are retained for operational review even when an order is reopened or cancelled.';

-- A non-cancelled order without a valid product link cannot participate in
-- the sold/reserved inventory guard. Abort and report instead of silently
-- leaving historical inventory outside the new safety boundary.
do $$
declare
  v_invalid_count bigint;
  v_examples text;
begin
  select count(*) into v_invalid_count
  from public.orders
  where store_id = '7efd71bc-0287-4f40-8a2f-1de330c49522'::uuid
    and coalesce(escrow_status, '') <> 'cancelled'
    and coalesce(products -> 0 ->> 'product_id', '') !~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$';

  select string_agg(id::text, ', ' order by id::text) into v_examples
  from (
    select id
    from public.orders
    where store_id = '7efd71bc-0287-4f40-8a2f-1de330c49522'::uuid
      and coalesce(escrow_status, '') <> 'cancelled'
      and coalesce(products -> 0 ->> 'product_id', '') !~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
    order by id
    limit 10
  ) sample;

  if v_invalid_count > 0 then
    raise exception 'Kariv has % non-cancelled historical orders without a valid product id. Reconcile them before migration. Sample order ids: %',
      v_invalid_count, coalesce(v_examples, 'unavailable');
  end if;
end $$;

-- Historical order rows receive only the product link needed by the sold
-- inventory guard. They are not retroactively granted a dealer-policy
-- revision or treated as a new checkout assessment.
insert into public.order_purchase_policy_audits (
  order_id, store_id, product_id, dealer_user_id, source_value_eur, dealer_policy_revision
)
select
  o.id,
  o.store_id,
  case
    when (o.products -> 0 ->> 'product_id') ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
      then (o.products -> 0 ->> 'product_id')::uuid
  end,
  o.dealer_user_id,
  null,
  null
from public.orders o
where o.store_id = '7efd71bc-0287-4f40-8a2f-1de330c49522'::uuid
  and (o.products -> 0 ->> 'product_id') ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
on conflict (order_id) do nothing;

-- Historical paid/delivered orders may pre-date atomic stock reservation. Do
-- not guess whether a positive quantity represents a legitimate relisting or
-- an unreconciled sold watch. Abort with a count so an operator can review the
-- affected products and explicitly set the correct availability before this
-- migration enables new checkout reservations.
do $$
declare
  v_mismatch_count bigint;
  v_examples text;
begin
  select count(*), string_agg(mismatch, ', ' order by mismatch)
  into v_mismatch_count, v_examples
  from (
    select (o.id::text || ' -> ' || p.id::text) as mismatch
    from public.orders o
    join public.products p
      on p.id = case
        when (o.products -> 0 ->> 'product_id') ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
          then (o.products -> 0 ->> 'product_id')::uuid
      end
      and p.store_id = o.store_id
    where o.store_id = '7efd71bc-0287-4f40-8a2f-1de330c49522'::uuid
      and (o.products -> 0 ->> 'product_id') ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
      and o.escrow_status in ('funds_secured', 'shipped', 'verified', 'funds_released')
      and coalesce(p.stock_quantity, 0) > 0
    order by o.id
    limit 10
  ) sample;

  select count(*) into v_mismatch_count
  from public.orders o
  join public.products p
    on p.id = case
      when (o.products -> 0 ->> 'product_id') ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
        then (o.products -> 0 ->> 'product_id')::uuid
    end
    and p.store_id = o.store_id
  where o.store_id = '7efd71bc-0287-4f40-8a2f-1de330c49522'::uuid
    and (o.products -> 0 ->> 'product_id') ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
    and o.escrow_status in ('funds_secured', 'shipped', 'verified', 'funds_released')
    and coalesce(p.stock_quantity, 0) > 0;

  if v_mismatch_count > 0 then
    raise exception 'Kariv has % historical non-cancelled sold orders whose products still have positive stock. Review and reconcile them before migration. Sample order -> product ids: %',
      v_mismatch_count, coalesce(v_examples, 'unavailable');
  end if;
end $$;

comment on table public.order_financial_events is
  'Private immutable evidence that a refund or protected payout was completed outside this application before an administrator resolved a Kariv dispute. Direct-order case closure without a money movement is deliberately not recorded as a financial event.';

-- Preserve the historical meaning of existing orders. Dealer orders were
-- created by the escrow-only implementation; Kariv-owned orders are direct.
update public.orders
set purchase_route = case
  when dealer_user_id is null then 'kariv_direct'
  else 'escrow'
end
where purchase_route is null
  and store_id = '7efd71bc-0287-4f40-8a2f-1de330c49522'::uuid;

update public.orders
set purchase_status = case escrow_status
  when 'pending_review' then 'awaiting_seller_confirmation'
  when 'dealer_accepted' then 'awaiting_payment'
  when 'funds_secured' then 'paid'
  when 'shipped' then 'shipped'
  when 'verified' then 'delivered'
  when 'funds_released' then 'completed'
  when 'cancelled' then 'cancelled'
  else 'pending'
end
where purchase_status is null
  and store_id = '7efd71bc-0287-4f40-8a2f-1de330c49522'::uuid;

update public.orders
set purchase_policy_version = 0,
    purchase_policy_snapshot = jsonb_build_object(
      'version', 0,
      'purchase_route', purchase_route
    )
where purchase_policy_snapshot is null
  and store_id = '7efd71bc-0287-4f40-8a2f-1de330c49522'::uuid;

-- Do not guess how to reserve stock for old unpaid orders. Stop the rollout
-- until the operator has either cancelled or deliberately reconciled each
-- legacy order; silently continuing could sell the same one-off watch twice.
do $$
begin
  if exists (
    select 1 from public.orders
    where store_id = '7efd71bc-0287-4f40-8a2f-1de330c49522'::uuid
      and escrow_status in ('pending_review', 'dealer_accepted')
      and coalesce(purchase_status, case escrow_status when 'pending_review' then 'awaiting_seller_confirmation' else 'awaiting_payment' end)
        in ('awaiting_seller_confirmation', 'awaiting_payment')
  ) then
    raise exception 'Kariv has legacy unpaid orders. Reconcile or cancel them before enabling transactional inventory reservations.';
  end if;
end $$;

-- Historical completed/cancelled orders did not reserve inventory through
-- this migration and therefore must never add stock if later reprocessed.
update public.orders
set inventory_reserved = false,
    reservation_expires_at = null
where inventory_reserved is null
  and store_id = '7efd71bc-0287-4f40-8a2f-1de330c49522'::uuid;

-- Do not add global defaults or NOT NULL requirements to these shared order
-- columns. Kariv writes every routing field explicitly; other tenants remain
-- untouched until they deliberately adopt the same policy model.

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'orders_purchase_route_check'
      and conrelid = 'public.orders'::regclass
  ) then
    alter table public.orders add constraint orders_purchase_route_check
      check (
        store_id <> '7efd71bc-0287-4f40-8a2f-1de330c49522'::uuid
        or (
          purchase_route is not null
          and purchase_route in ('kariv_direct', 'dealer_direct', 'escrow', 'manual_review')
        )
      ) not valid;
  end if;
  if not exists (
    select 1 from pg_constraint
    where conname = 'orders_purchase_status_check'
      and conrelid = 'public.orders'::regclass
  ) then
    alter table public.orders add constraint orders_purchase_status_check
      check (
        store_id <> '7efd71bc-0287-4f40-8a2f-1de330c49522'::uuid
        or (
          purchase_status is not null
          and purchase_status in (
            'pending', 'awaiting_seller_confirmation', 'awaiting_payment', 'paid',
            'shipped', 'delivered', 'completed', 'cancelled'
          )
        )
      ) not valid;
  end if;
end $$;

-- VALIDATE uses a lighter lock than adding an immediately-valid constraint.
-- The shared orders table deliberately receives no new non-concurrent index
-- in this migration; operational indexes can be added in a maintenance
-- window after checking the shared project's query plans.
alter table public.orders validate constraint orders_purchase_route_check;
alter table public.orders validate constraint orders_purchase_status_check;

comment on column public.orders.purchase_policy_snapshot is
  'Buyer-safe checkout-time record: policy version, route, seller of record, buyer protection choice and evaluation time. Internal risk inputs are intentionally excluded from this shared table.';

comment on column public.orders.inventory_reserved is
  'Kariv-only checkout reservation marker. True only while a newly created order holds one unit before payment; other tenants and historical rows remain untouched.';

comment on column public.orders.reservation_expires_at is
  'Deadline for an unpaid Kariv inventory hold. The scheduled order-maintenance job releases expired holds that have no submitted payment proof.';

comment on column public.orders.payment_review_deadline is
  'Kariv-only deadline for staff or the receiving dealer to review submitted private payment evidence. Proof submission sets a fresh, bounded 72-hour window.';

-- Protected dealer checkout is available only to an identified seller whose
-- latest application is either in ordinary onboarding (`pending`) or already
-- approved. Rejected, suspended and unknown applications fail closed. A
-- missing commerce profile is deliberately treated as revision
-- 0/probationary: it can use protection, but can never be paid directly. Any
-- saved profile must keep escrow enabled and its compliance/refund state clear;
-- its revision invalidates stale checkout assessments.
create or replace function public.kariv_dealer_protected_eligible(
  p_store_id uuid,
  p_dealer_user_id text,
  p_expected_policy_revision bigint
) returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_application_status text;
  v_profile public.dealer_commerce_profiles%rowtype;
begin
  if p_store_id <> '7efd71bc-0287-4f40-8a2f-1de330c49522'::uuid
    or nullif(trim(p_dealer_user_id), '') is null
  then
    return false;
  end if;

  perform pg_advisory_xact_lock(hashtextextended(
    p_store_id::text || ':dealer-policy:' || p_dealer_user_id,
    0
  ));

  select status into v_application_status
  from public.dealer_applications
  where store_id = p_store_id and dealer_user_id = p_dealer_user_id
  order by created_at desc
  limit 1;
  if coalesce(v_application_status, '') not in ('pending', 'approved') then
    return false;
  end if;

  select * into v_profile
  from public.dealer_commerce_profiles
  where store_id = p_store_id and dealer_user_id = p_dealer_user_id
  for share;

  if not found then
    return coalesce(p_expected_policy_revision, -1) = 0;
  end if;

  return coalesce(
    v_profile.policy_revision = p_expected_policy_revision
      and v_profile.escrow_enabled is true
      and v_profile.compliance_status = 'clear'
      and v_profile.refund_status = 'clear',
    false
  );
end;
$$;

-- Direct eligibility is repeated inside the database transaction so a
-- concurrent policy, dispute, account-age, sales-count or cap change cannot
-- turn an otherwise protected order into a direct dealer payment.
create or replace function public.kariv_dealer_direct_eligible(
  p_store_id uuid,
  p_dealer_user_id text,
  p_source_value_eur numeric,
  p_expected_policy_revision bigint
) returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_profile public.dealer_commerce_profiles%rowtype;
  v_application_status text;
  v_application_at timestamptz;
  v_active_since timestamptz;
  v_completed_sales bigint;
  v_open_disputes bigint;
  v_effective_tier text := 'probationary';
  v_direct_limit numeric;
begin
  if public.kariv_dealer_protected_eligible(
    p_store_id, p_dealer_user_id, p_expected_policy_revision
  ) is not true then
    return false;
  end if;

  select * into v_profile
  from public.dealer_commerce_profiles
  where store_id = p_store_id and dealer_user_id = p_dealer_user_id;
  if not found then return false; end if;

  select status, coalesce(reviewed_at, created_at)
  into v_application_status, v_application_at
  from public.dealer_applications
  where store_id = p_store_id and dealer_user_id = p_dealer_user_id
  order by created_at desc
  limit 1;

  v_active_since := greatest(v_profile.activated_at, v_profile.reactivated_at, v_application_at);

  select count(*) into v_completed_sales
  from public.orders
  where store_id = p_store_id
    and dealer_user_id = p_dealer_user_id
    and (purchase_status = 'completed' or escrow_status = 'funds_released');

  select count(*) into v_open_disputes
  from public.disputes d
  join public.orders o on o.id = d.order_id
  where o.store_id = p_store_id
    and o.dealer_user_id = p_dealer_user_id
    and d.status in ('open', 'under_review');

  if v_profile.tier = 'enterprise'
    and v_profile.underwritten is true
  then
    v_effective_tier := 'enterprise';
  elsif v_profile.tier in ('trusted', 'enterprise')
    and v_active_since <= now() - interval '180 days'
    and v_completed_sales >= 25
  then
    v_effective_tier := 'trusted';
  elsif v_profile.tier in ('standard', 'trusted', 'enterprise')
    and v_active_since <= now() - interval '90 days'
    and v_completed_sales >= 10
  then
    v_effective_tier := 'standard';
  end if;

  v_direct_limit := case v_effective_tier
    when 'standard' then least(coalesce(v_profile.direct_limit_eur, 10000), 10000)
    when 'trusted' then least(coalesce(v_profile.direct_limit_eur, 25000), 50000)
    when 'enterprise' then v_profile.direct_limit_eur
    else 0
  end;

  return coalesce(
    v_application_status = 'approved'
      and v_profile.policy_revision = p_expected_policy_revision
      and v_profile.seller_verified is true
      and v_profile.direct_sales_enabled is true
      and v_profile.compliance_status = 'clear'
      and v_profile.refund_status = 'clear'
      and v_profile.payment_details_verified_at is not null
      and nullif(trim(v_profile.payment_beneficiary_name), '') is not null
      and nullif(trim(v_profile.payment_iban), '') is not null
      and nullif(trim(v_profile.payment_bank_name), '') is not null
      and v_open_disputes = 0
      and coalesce(p_source_value_eur, 0) > 0
      and v_direct_limit is not null
      and p_source_value_eur <= v_direct_limit,
    false
  );
end;
$$;

-- Reserve the one-off watch and create its order in a single transaction.
-- The app still performs localized pricing and policy evaluation, while this
-- database boundary prevents two buyers from ordering the last unit between
-- a separate stock read and order insert.
drop function if exists public.create_kariv_order_with_reservation(uuid, uuid, text, text, jsonb, numeric, text, text, text, text, text, boolean, smallint, jsonb, text, jsonb, text, numeric, text);

create or replace function public.create_kariv_order_with_reservation(
  p_store_id uuid,
  p_product_id uuid,
  p_buyer_user_id text,
  p_dealer_user_id text,
  p_products jsonb,
  p_total_amount numeric,
  p_currency text,
  p_payment_method text,
  p_escrow_status text,
  p_purchase_route text,
  p_purchase_status text,
  p_buyer_selected_protection boolean,
  p_purchase_policy_version smallint,
  p_purchase_policy_snapshot jsonb,
  p_shipping_status text,
  p_shipping_address jsonb,
  p_idempotency_key text,
  p_expected_source_price numeric,
  p_expected_source_currency text,
  p_expected_source_value_eur numeric,
  p_expected_policy_revision bigint
) returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_product public.products%rowtype;
  v_order_id uuid;
  v_source_price numeric;
  v_destination public.store_payment_destinations%rowtype;
  v_instructions text;
  v_active_reservations bigint;
begin
  if p_store_id <> '7efd71bc-0287-4f40-8a2f-1de330c49522'::uuid then
    raise exception 'This checkout function is restricted to the Kariv tenant.';
  end if;

  if nullif(trim(p_buyer_user_id), '') is null or nullif(trim(p_idempotency_key), '') is null then
    raise exception 'Buyer and idempotency references are required.';
  end if;

  perform pg_advisory_xact_lock(hashtextextended(
    p_store_id::text || ':buyer-reservations:' || p_buyer_user_id,
    0
  ));

  -- This lock is keyed independently of the selected product. It prevents a
  -- retried request from creating two orders even if a malformed/concurrent
  -- client reuses the same key for different product ids.
  perform pg_advisory_xact_lock(hashtextextended(
    p_store_id::text || ':' || p_buyer_user_id || ':' || p_idempotency_key,
    0
  ));

  select id into v_order_id
  from public.orders
  where store_id = p_store_id
    and buyer_user_id = p_buyer_user_id
    and idempotency_key = p_idempotency_key
  limit 1;
  if found then return v_order_id; end if;

  select count(*) into v_active_reservations
  from public.order_purchase_policy_audits a
  join public.orders o on o.id = a.order_id and o.store_id = a.store_id
  where o.store_id = p_store_id
    and o.buyer_user_id = p_buyer_user_id
    and o.escrow_status in ('pending_review', 'dealer_accepted')
    and coalesce(o.purchase_status, '') in ('awaiting_seller_confirmation', 'awaiting_payment');
  if v_active_reservations >= 3 then
    raise exception 'You already have the maximum number of active unpaid watch reservations.';
  end if;

  select * into v_product
  from public.products
  where id = p_product_id and store_id = p_store_id
  for update;
  if not found then raise exception 'Product not found.'; end if;

  if v_product.status <> 'active' or coalesce(v_product.stock_quantity, 0) < 1 then
    raise exception 'This watch is no longer available.';
  end if;
  if v_product.dealer_id is distinct from p_dealer_user_id then
    raise exception 'The seller changed while checkout was open.';
  end if;
  if (p_products -> 0 ->> 'product_id') is distinct from p_product_id::text then
    raise exception 'Order line does not match the reserved product.';
  end if;

  v_source_price := case
    when v_product.sale_price is not null
      and v_product.sale_price > 0
      and v_product.sale_price < v_product.price
      then v_product.sale_price
    else v_product.price
  end;
  if v_source_price is distinct from p_expected_source_price
    or upper(trim(v_product.currency)) is distinct from upper(trim(p_expected_source_currency))
  then
    raise exception 'The product price changed while checkout was open.';
  end if;

  if p_purchase_route is null
    or p_purchase_route = 'manual_review'
    or (p_dealer_user_id is null and p_purchase_route <> 'kariv_direct')
    or (p_dealer_user_id is not null and p_purchase_route not in ('dealer_direct', 'escrow'))
    or (p_purchase_route = 'kariv_direct' and (p_escrow_status is distinct from 'dealer_accepted' or p_purchase_status is distinct from 'awaiting_payment'))
    or (p_purchase_route in ('dealer_direct', 'escrow') and (p_escrow_status is distinct from 'pending_review' or p_purchase_status is distinct from 'awaiting_seller_confirmation'))
    or p_buyer_selected_protection is null
    or (p_buyer_selected_protection is true and p_purchase_route is distinct from 'escrow')
    or p_payment_method is distinct from 'bank_transfer'
    or p_purchase_policy_version is distinct from 2
    or p_purchase_policy_snapshot is null
    or (p_purchase_policy_snapshot ->> 'purchase_route') is distinct from p_purchase_route
  then
    raise exception 'The purchase route is not valid for this seller.';
  end if;

  if p_purchase_route = 'dealer_direct' and public.kariv_dealer_direct_eligible(
    p_store_id, p_dealer_user_id, p_expected_source_value_eur, p_expected_policy_revision
  ) is not true then
    raise exception 'Dealer direct-payment eligibility changed while checkout was open.';
  end if;

  if p_purchase_route = 'escrow' and public.kariv_dealer_protected_eligible(
    p_store_id, p_dealer_user_id, p_expected_policy_revision
  ) is not true then
    raise exception 'Dealer protected-payment eligibility changed while checkout was open.';
  end if;

  insert into public.orders (
    store_id, buyer_user_id, dealer_user_id, products, total_amount, currency,
    payment_method, escrow_status, purchase_route, purchase_status,
    buyer_selected_protection, purchase_policy_version, purchase_policy_snapshot,
    shipping_status, shipping_address, idempotency_key, inventory_reserved, reservation_expires_at
  ) values (
    p_store_id, p_buyer_user_id, p_dealer_user_id, p_products, p_total_amount, p_currency,
    p_payment_method, p_escrow_status, p_purchase_route, p_purchase_status,
    p_buyer_selected_protection, p_purchase_policy_version, p_purchase_policy_snapshot,
    p_shipping_status, p_shipping_address, p_idempotency_key, true, now() + interval '24 hours'
  ) returning id into v_order_id;

  if p_purchase_route in ('kariv_direct', 'escrow') then
    select * into v_destination
    from public.store_payment_destinations
    where store_id = p_store_id and purchase_route = p_purchase_route;
    if not found
      or v_destination.verified_at is null
      or nullif(trim(v_destination.beneficiary_name), '') is null
      or nullif(trim(v_destination.iban), '') is null
      or nullif(trim(v_destination.bank_name), '') is null
    then
      raise exception 'The Kariv payment destination is not configured for this route.';
    end if;

    v_instructions := concat_ws(E'\n',
      'Beneficiary: ' || trim(v_destination.beneficiary_name),
      'IBAN: ' || trim(v_destination.iban),
      case when nullif(trim(v_destination.bic), '') is not null then 'BIC/SWIFT: ' || trim(v_destination.bic) end,
      'Bank: ' || trim(v_destination.bank_name)
    );
    insert into public.order_payment_instructions (order_id, store_id, dealer_user_id, instructions)
    values (v_order_id, p_store_id, p_dealer_user_id, v_instructions);
  end if;

  update public.products
  set stock_quantity = stock_quantity - 1,
      updated_at = now()
  where id = p_product_id and store_id = p_store_id;

  insert into public.order_purchase_policy_audits (
    order_id, store_id, product_id, dealer_user_id, source_value_eur, dealer_policy_revision
  ) values (
    v_order_id, p_store_id, p_product_id, p_dealer_user_id, p_expected_source_value_eur,
    case when p_dealer_user_id is null then null else p_expected_policy_revision end
  );

  return v_order_id;
end;
$$;

-- Bind a private Storage object to an owned order in the same transaction as
-- the state/policy checks. A signed URL is intentionally never stored: the
-- orders row contains only the opaque object key and server reads mint a
-- short-lived URL after audience authorization.
create or replace function public.submit_kariv_payment_proof(
  p_store_id uuid,
  p_order_id uuid,
  p_buyer_user_id text,
  p_proof_key text
) returns boolean
language plpgsql
security definer
set search_path = public, storage
as $$
declare
  v_order public.orders%rowtype;
  v_audit public.order_purchase_policy_audits%rowtype;
  v_expected_prefix text;
  v_file_name text;
  v_deadline timestamptz;
  v_prior_submissions bigint;
begin
  if p_store_id <> '7efd71bc-0287-4f40-8a2f-1de330c49522'::uuid then
    raise exception 'This payment-proof function is restricted to the Kariv tenant.';
  end if;
  if nullif(trim(p_buyer_user_id), '') is null or p_buyer_user_id !~ '^[A-Za-z0-9_-]{1,128}$' then
    raise exception 'Invalid buyer reference.';
  end if;

  select * into v_order
  from public.orders
  where id = p_order_id
    and store_id = p_store_id
    and buyer_user_id = p_buyer_user_id
  for update;
  if not found then raise exception 'Order not found.'; end if;
  -- Re-submitting the same order never pushes review out indefinitely. A
  -- first proof receives 72 hours; subsequent corrections keep that bound.
  v_deadline := coalesce(v_order.payment_review_deadline, now() + interval '72 hours');

  if v_order.escrow_status is distinct from 'dealer_accepted'
    or v_order.purchase_status is distinct from 'awaiting_payment'
    or v_order.payment_method is distinct from 'bank_transfer'
    or nullif(trim(v_order.payment_reference), '') is not null
  then
    raise exception 'Payment proof can only be submitted for an order awaiting a bank transfer.';
  end if;

  if not exists (
    select 1 from public.order_payment_instructions
    where order_id = p_order_id and store_id = p_store_id
  ) then
    raise exception 'Verified payment details are unavailable.';
  end if;

  select * into v_audit
  from public.order_purchase_policy_audits
  where order_id = p_order_id and store_id = p_store_id;
  if not found then raise exception 'The checkout policy assessment is unavailable.'; end if;
  if v_audit.dealer_user_id is distinct from v_order.dealer_user_id then
    raise exception 'The seller policy assessment no longer matches this order.';
  end if;

  if v_order.purchase_route = 'dealer_direct' then
    if v_order.dealer_user_id is null or public.kariv_dealer_direct_eligible(
      p_store_id, v_order.dealer_user_id, v_audit.source_value_eur, v_audit.dealer_policy_revision
    ) is not true then
      raise exception 'Dealer direct-payment eligibility changed before proof submission.';
    end if;
  elsif v_order.purchase_route = 'escrow' then
    if v_order.dealer_user_id is null or public.kariv_dealer_protected_eligible(
      p_store_id, v_order.dealer_user_id, v_audit.dealer_policy_revision
    ) is not true then
      raise exception 'Dealer protected-payment eligibility changed before proof submission.';
    end if;
  elsif v_order.purchase_route is distinct from 'kariv_direct' or v_order.dealer_user_id is not null then
    raise exception 'The purchase route is not valid for payment-proof submission.';
  end if;

  v_expected_prefix := p_store_id::text || '/' || p_order_id::text || '/' || p_buyer_user_id || '/';
  if left(p_proof_key, char_length(v_expected_prefix)) <> v_expected_prefix then
    raise exception 'The payment-proof object is not owned by this order.';
  end if;
  v_file_name := substring(p_proof_key from char_length(v_expected_prefix) + 1);
  if v_file_name !~ '^[0-9a-fA-F-]{36}\.(pdf|webp)$' or position('/' in v_file_name) > 0 then
    raise exception 'Invalid payment-proof object key.';
  end if;
  if not exists (
    select 1 from storage.objects
    where bucket_id = 'kariv-payment-proofs' and name = p_proof_key
  ) then
    raise exception 'The private payment-proof object does not exist.';
  end if;

  select count(*) into v_prior_submissions
  from public.order_payment_proof_events
  where store_id = p_store_id
    and order_id = p_order_id
    and event_type = 'submitted';
  if v_prior_submissions >= 3 then
    raise exception 'The maximum number of payment-proof submissions has been reached. Contact Kariv support.';
  end if;

  update public.orders
  set payment_reference = p_proof_key,
      reservation_expires_at = v_deadline,
      payment_review_deadline = v_deadline,
      updated_at = now()
  where id = p_order_id and store_id = p_store_id;

  insert into public.order_payment_proof_events (
    store_id, order_id, proof_key, event_type, recorded_by
  ) values (
    p_store_id, p_order_id, p_proof_key, 'submitted', p_buyer_user_id
  );

  insert into public.order_messages (
    order_id, sender, sender_user_id, recipient_role,
    subject, message, kind, is_read
  ) values (
    p_order_id, 'buyer', p_buyer_user_id, 'buyer',
    'Payment sent', 'Buyer submitted proof of payment.', 'payment_sent', false
  );

  return true;
end;
$$;

-- Only unpaid cancellations release a reservation. Paid/refunded orders use
-- the dispute/refund workflow and never silently return stock to inventory.
create or replace function public.cancel_kariv_order_before_payment(
  p_store_id uuid,
  p_order_id uuid
) returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_order public.orders%rowtype;
  v_product_id uuid;
begin
  if p_store_id <> '7efd71bc-0287-4f40-8a2f-1de330c49522'::uuid then
    raise exception 'This cancellation function is restricted to the Kariv tenant.';
  end if;

  select * into v_order
  from public.orders
  where id = p_order_id and store_id = p_store_id
  for update;
  if not found then raise exception 'Order not found.'; end if;
  if v_order.dealer_user_id is not null then
    perform pg_advisory_xact_lock(hashtextextended(
      p_store_id::text || ':dealer-policy:' || v_order.dealer_user_id,
      0
    ));
  end if;
  if coalesce(v_order.escrow_status, '') not in ('pending_review', 'dealer_accepted')
    or coalesce(v_order.purchase_status, '') not in ('awaiting_seller_confirmation', 'awaiting_payment')
    or v_order.payment_reference is not null
  then
    return false;
  end if;

  update public.orders
  set escrow_status = 'cancelled',
      purchase_status = 'cancelled',
      inventory_reserved = false,
      reservation_expires_at = null,
      updated_at = now()
  where id = p_order_id and store_id = p_store_id;

  if v_order.inventory_reserved is true then
    v_product_id := (v_order.products -> 0 ->> 'product_id')::uuid;
    update public.products
    set stock_quantity = coalesce(stock_quantity, 0) + 1,
        updated_at = now()
    where id = v_product_id and store_id = p_store_id;
  end if;
  return true;
end;
$$;

-- An administrator must explicitly review submitted evidence. Rejection is
-- audited and either gives the buyer a short six-hour correction window or
-- atomically cancels the unpaid reservation and returns its stock. The proof
-- object is intentionally retained as immutable evidence; it is never reused
-- as a future upload target.
create or replace function public.reject_kariv_payment_proof(
  p_store_id uuid,
  p_order_id uuid,
  p_recorded_by text,
  p_reason text,
  p_cancel_order boolean
) returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_order public.orders%rowtype;
  v_reason text := nullif(trim(p_reason), '');
  v_cancelled boolean;
begin
  if p_store_id <> '7efd71bc-0287-4f40-8a2f-1de330c49522'::uuid then
    raise exception 'This payment-proof review function is restricted to the Kariv tenant.';
  end if;
  if nullif(trim(p_recorded_by), '') is null
    or v_reason is null
    or char_length(v_reason) not between 5 and 1000
    or p_cancel_order is null
  then
    raise exception 'An administrator, review decision and clear rejection reason are required.';
  end if;

  select * into v_order
  from public.orders
  where id = p_order_id and store_id = p_store_id
  for update;
  if not found then raise exception 'Order not found.'; end if;
  if v_order.escrow_status is distinct from 'dealer_accepted'
    or v_order.purchase_status is distinct from 'awaiting_payment'
    or nullif(trim(v_order.payment_reference), '') is null
  then
    return false;
  end if;

  insert into public.order_payment_proof_events (
    store_id, order_id, proof_key, event_type, reason, recorded_by
  ) values (
    p_store_id,
    p_order_id,
    v_order.payment_reference,
    case when p_cancel_order then 'rejected_cancel' else 'rejected_reopen' end,
    v_reason,
    trim(p_recorded_by)
  );

  update public.orders
  set payment_reference = null,
      payment_review_deadline = null,
      reservation_expires_at = case when p_cancel_order then reservation_expires_at else now() + interval '6 hours' end,
      updated_at = now()
  where id = p_order_id and store_id = p_store_id;

  if p_cancel_order then
    select public.cancel_kariv_order_before_payment(p_store_id, p_order_id)
    into v_cancelled;
    if v_cancelled is not true then
      raise exception 'The rejected proof could not be cancelled safely.';
    end if;
  end if;

  insert into public.order_messages (
    order_id, sender, sender_user_id, recipient_role,
    subject, message, kind, is_read
  ) values (
    p_order_id,
    'admin',
    trim(p_recorded_by),
    'buyer',
    case when p_cancel_order then 'Payment proof rejected — order cancelled' else 'Payment proof needs correction' end,
    v_reason,
    'message',
    false
  );

  return true;
end;
$$;

-- Serialize order completion and dispute creation on the parent order row.
-- This closes the race where a dispute could be opened between a separate
-- "no dispute" read and a funds-release update.
create or replace function public.open_kariv_order_dispute(
  p_store_id uuid,
  p_order_id uuid,
  p_buyer_user_id text,
  p_reason text,
  p_description text
) returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_order public.orders%rowtype;
  v_dispute_id uuid;
begin
  if p_store_id <> '7efd71bc-0287-4f40-8a2f-1de330c49522'::uuid then
    raise exception 'This dispute function is restricted to the Kariv tenant.';
  end if;
  select * into v_order
  from public.orders
  where id = p_order_id
    and store_id = p_store_id
    and buyer_user_id = p_buyer_user_id
  for update;

  if not found then raise exception 'Order not found.'; end if;
  if v_order.dealer_user_id is not null then
    perform pg_advisory_xact_lock(hashtextextended(
      p_store_id::text || ':dealer-policy:' || v_order.dealer_user_id,
      0
    ));
  end if;
  if v_order.escrow_status is distinct from 'verified' or v_order.delivery_confirmed_at is null then
    raise exception 'This order is not in its post-delivery review period.';
  end if;
  if now() >= v_order.delivery_confirmed_at + interval '14 days' then
    raise exception 'The post-delivery review period has ended.';
  end if;
  if exists (
    select 1 from public.disputes
    where order_id = p_order_id and status in ('open', 'under_review')
  ) then
    raise exception 'A dispute is already open on this order.';
  end if;

  insert into public.disputes (order_id, opened_by, reason, description, status)
  values (p_order_id, p_buyer_user_id, p_reason, p_description, 'open')
  returning id into v_dispute_id;

  return v_dispute_id;
end;
$$;

drop function if exists public.complete_kariv_order_after_review(uuid, uuid);

create or replace function public.complete_kariv_order_after_review(
  p_store_id uuid,
  p_order_id uuid,
  p_financial_reference text,
  p_recorded_by text
) returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_order public.orders%rowtype;
begin
  if p_store_id <> '7efd71bc-0287-4f40-8a2f-1de330c49522'::uuid then
    raise exception 'This completion function is restricted to the Kariv tenant.';
  end if;
  select * into v_order
  from public.orders
  where id = p_order_id and store_id = p_store_id
  for update;

  if not found
    or v_order.escrow_status is distinct from 'verified'
    or v_order.delivery_confirmed_at is null
    or now() < v_order.delivery_confirmed_at + interval '14 days'
  then
    return false;
  end if;

  if exists (
    select 1 from public.disputes
    where order_id = p_order_id and status in ('open', 'under_review')
  ) then
    return false;
  end if;

  if v_order.purchase_route = 'escrow' then
    if char_length(trim(coalesce(p_financial_reference, ''))) < 3
      or char_length(trim(coalesce(p_financial_reference, ''))) > 250
      or nullif(trim(p_recorded_by), '') is null
    then
      raise exception 'A completed protected-payout reference and administrator are required.';
    end if;

    insert into public.order_financial_events (
      store_id, order_id, dispute_id, event_type, purchase_route,
      amount, currency, external_reference, recorded_by, notes
    ) values (
      p_store_id, p_order_id, null, 'protected_payout_completed', 'escrow',
      v_order.total_amount, v_order.currency, trim(p_financial_reference),
      trim(p_recorded_by), 'Recorded after the buyer inspection period ended without an open dispute.'
    );
  end if;
  update public.orders
  set escrow_status = 'funds_released',
      purchase_status = 'completed',
      shipping_status = 'delivered',
      updated_at = now()
  where id = p_order_id and store_id = p_store_id;
  return true;
end;
$$;

create or replace function public.accept_kariv_protected_order(
  p_store_id uuid,
  p_order_id uuid,
  p_dealer_user_id text
) returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_order public.orders%rowtype;
  v_audit public.order_purchase_policy_audits%rowtype;
begin
  if p_store_id <> '7efd71bc-0287-4f40-8a2f-1de330c49522'::uuid then
    raise exception 'This dealer-acceptance function is restricted to the Kariv tenant.';
  end if;

  select * into v_order
  from public.orders
  where id = p_order_id
    and store_id = p_store_id
    and dealer_user_id = p_dealer_user_id
  for update;
  if not found then raise exception 'Order not found.'; end if;
  if v_order.purchase_route is distinct from 'escrow'
    or v_order.escrow_status is distinct from 'pending_review'
    or v_order.purchase_status is distinct from 'awaiting_seller_confirmation'
  then
    raise exception 'This order is no longer awaiting protected-order acceptance.';
  end if;

  select * into v_audit
  from public.order_purchase_policy_audits
  where order_id = p_order_id and store_id = p_store_id;
  if not found or public.kariv_dealer_protected_eligible(
    p_store_id, p_dealer_user_id, v_audit.dealer_policy_revision
  ) is not true then
    raise exception 'Dealer protected-payment eligibility changed after checkout.';
  end if;

  update public.orders
  set escrow_status = 'dealer_accepted',
      purchase_status = 'awaiting_payment',
      reservation_expires_at = now() + interval '24 hours',
      updated_at = now()
  where id = p_order_id and store_id = p_store_id;
  return true;
end;
$$;

create or replace function public.accept_kariv_direct_order(
  p_store_id uuid,
  p_order_id uuid,
  p_dealer_user_id text
) returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_order public.orders%rowtype;
  v_current_application_status text;
  v_profile public.dealer_commerce_profiles%rowtype;
  v_audit public.order_purchase_policy_audits%rowtype;
  v_instructions text;
begin
  if p_store_id <> '7efd71bc-0287-4f40-8a2f-1de330c49522'::uuid then
    raise exception 'This dealer-acceptance function is restricted to the Kariv tenant.';
  end if;
  select * into v_order
  from public.orders
  where id = p_order_id
    and store_id = p_store_id
    and dealer_user_id = p_dealer_user_id
  for update;
  if not found then raise exception 'Order not found.'; end if;
  if v_order.purchase_route is distinct from 'dealer_direct'
    or v_order.escrow_status is distinct from 'pending_review'
    or v_order.purchase_status is distinct from 'awaiting_seller_confirmation'
  then
    raise exception 'This order is no longer awaiting direct-dealer acceptance.';
  end if;

  select * into v_audit
  from public.order_purchase_policy_audits
  where order_id = p_order_id and store_id = p_store_id;
  if not found or public.kariv_dealer_direct_eligible(
    p_store_id, p_dealer_user_id, v_audit.source_value_eur, v_audit.dealer_policy_revision
  ) is not true then
    raise exception 'Dealer direct-payment eligibility changed after checkout.';
  end if;

  select status into v_current_application_status
  from public.dealer_applications
  where store_id = p_store_id and dealer_user_id = p_dealer_user_id
  order by created_at desc
  limit 1;

  select * into v_profile
  from public.dealer_commerce_profiles
  where store_id = p_store_id and dealer_user_id = p_dealer_user_id
  for update;

  if v_current_application_status is distinct from 'approved'
    or not found
    or v_profile.seller_verified is not true
    or v_profile.direct_sales_enabled is not true
    or v_profile.compliance_status <> 'clear'
    or v_profile.refund_status <> 'clear'
    or v_profile.tier = 'probationary'
    or v_profile.payment_details_verified_at is null
    or nullif(trim(v_profile.payment_beneficiary_name), '') is null
    or nullif(trim(v_profile.payment_iban), '') is null
    or nullif(trim(v_profile.payment_bank_name), '') is null
  then
    raise exception 'Dealer is not currently eligible for direct payment.';
  end if;
  if exists (
    select 1 from public.disputes d
    join public.orders o on o.id = d.order_id
    where o.store_id = p_store_id
      and o.dealer_user_id = p_dealer_user_id
      and d.status in ('open', 'under_review')
  ) then
    raise exception 'Dealer has an unresolved dispute.';
  end if;

  v_instructions := concat_ws(E'\n',
    'Beneficiary: ' || trim(v_profile.payment_beneficiary_name),
    'IBAN: ' || trim(v_profile.payment_iban),
    case when nullif(trim(v_profile.payment_bic), '') is not null then 'BIC/SWIFT: ' || trim(v_profile.payment_bic) end,
    'Bank: ' || trim(v_profile.payment_bank_name)
  );

  insert into public.order_payment_instructions (order_id, store_id, dealer_user_id, instructions)
  values (p_order_id, p_store_id, p_dealer_user_id, v_instructions)
  on conflict (order_id) do update
  set instructions = excluded.instructions,
      updated_at = now();

  update public.orders
  set escrow_status = 'dealer_accepted',
      purchase_status = 'awaiting_payment',
      reservation_expires_at = now() + interval '24 hours',
      updated_at = now()
  where id = p_order_id and store_id = p_store_id;
  return true;
end;
$$;

create or replace function public.confirm_kariv_direct_payment_received(
  p_store_id uuid,
  p_order_id uuid,
  p_dealer_user_id text
) returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_order public.orders%rowtype;
  v_audit public.order_purchase_policy_audits%rowtype;
begin
  if p_store_id <> '7efd71bc-0287-4f40-8a2f-1de330c49522'::uuid then
    raise exception 'This payment-confirmation function is restricted to the Kariv tenant.';
  end if;

  select * into v_order
  from public.orders
  where id = p_order_id
    and store_id = p_store_id
    and dealer_user_id = p_dealer_user_id
  for update;
  if not found then raise exception 'Order not found.'; end if;
  if v_order.purchase_route is distinct from 'dealer_direct'
    or v_order.escrow_status is distinct from 'dealer_accepted'
    or v_order.purchase_status is distinct from 'awaiting_payment'
    or nullif(trim(v_order.payment_reference), '') is null
  then
    raise exception 'This direct order is not ready for payment confirmation.';
  end if;

  select * into v_audit
  from public.order_purchase_policy_audits
  where order_id = p_order_id and store_id = p_store_id;
  if not found or public.kariv_dealer_direct_eligible(
    p_store_id, p_dealer_user_id, v_audit.source_value_eur, v_audit.dealer_policy_revision
  ) is not true then
    raise exception 'Dealer direct-payment eligibility changed before confirmation.';
  end if;

  update public.orders
  set escrow_status = 'funds_secured',
      purchase_status = 'paid',
      inventory_reserved = false,
      reservation_expires_at = null,
      updated_at = now()
  where id = p_order_id and store_id = p_store_id;
  return true;
end;
$$;

create or replace function public.refund_kariv_order_before_delivery(
  p_store_id uuid,
  p_order_id uuid,
  p_financial_reference text,
  p_notes text,
  p_recorded_by text
) returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_order public.orders%rowtype;
  v_reference text := nullif(trim(p_financial_reference), '');
  v_event_type text;
begin
  if p_store_id <> '7efd71bc-0287-4f40-8a2f-1de330c49522'::uuid then
    raise exception 'This refund function is restricted to the Kariv tenant.';
  end if;
  if v_reference is null or char_length(v_reference) not between 3 and 250
    or nullif(trim(p_recorded_by), '') is null
  then
    raise exception 'A completed refund reference and administrator are required.';
  end if;

  select * into v_order
  from public.orders
  where id = p_order_id and store_id = p_store_id
  for update;
  if not found then raise exception 'Order not found.'; end if;
  if coalesce(v_order.escrow_status, '') not in ('dealer_accepted', 'funds_secured', 'shipped')
    or (v_order.escrow_status = 'dealer_accepted' and nullif(trim(v_order.payment_reference), '') is null)
  then
    return false;
  end if;
  if exists (
    select 1 from public.disputes
    where order_id = p_order_id and status in ('open', 'under_review')
  ) then
    raise exception 'Resolve the open dispute through the dispute workflow.';
  end if;

  v_event_type := case
    when v_order.purchase_route = 'escrow' then 'protected_refund_completed'
    when v_order.purchase_route = 'dealer_direct' then 'external_refund_completed'
    else 'kariv_refund_completed'
  end;

  insert into public.order_financial_events (
    store_id, order_id, dispute_id, event_type, purchase_route,
    amount, currency, external_reference, recorded_by, notes
  ) values (
    p_store_id, p_order_id, null, v_event_type, v_order.purchase_route,
    v_order.total_amount, v_order.currency, v_reference, trim(p_recorded_by), nullif(trim(p_notes), '')
  );

  -- Inventory is deliberately not restored here. A refund is not evidence
  -- that the physical watch has returned and passed intake inspection.
  update public.orders
  set escrow_status = 'cancelled',
      purchase_status = 'cancelled',
      inventory_reserved = false,
      reservation_expires_at = null,
      updated_at = now()
  where id = p_order_id and store_id = p_store_id;
  return true;
end;
$$;

-- The earlier implementation accepted no external transaction reference and
-- could therefore make a status change look like a completed refund/payout.
-- Remove that signature if this draft migration was run in a test database.
drop function if exists public.resolve_kariv_order_dispute(uuid, uuid, text, text, text);

create or replace function public.resolve_kariv_order_dispute(
  p_store_id uuid,
  p_dispute_id uuid,
  p_outcome text,
  p_financial_reference text,
  p_mediator_notes text,
  p_resolved_by text
) returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_dispute public.disputes%rowtype;
  v_order public.orders%rowtype;
  v_financial_reference text := nullif(trim(p_financial_reference), '');
  v_event_type text;
begin
  if p_store_id <> '7efd71bc-0287-4f40-8a2f-1de330c49522'::uuid then
    raise exception 'This dispute-resolution function is restricted to the Kariv tenant.';
  end if;
  if nullif(trim(p_resolved_by), '') is null then
    raise exception 'The administrator identity is required.';
  end if;
  if p_outcome is null or p_outcome not in ('release_funds', 'refund', 'close_order') then
    raise exception 'Invalid dispute outcome.';
  end if;

  select d.* into v_dispute
  from public.disputes d
  join public.orders o on o.id = d.order_id
  where d.id = p_dispute_id
    and o.store_id = p_store_id
  for update of d;
  if not found or coalesce(v_dispute.status, '') not in ('open', 'under_review') then
    raise exception 'Open dispute not found.';
  end if;

  select * into v_order
  from public.orders
  where id = v_dispute.order_id and store_id = p_store_id
  for update;
  if not found then raise exception 'Order not found.'; end if;
  if v_order.escrow_status is distinct from 'verified' then
    raise exception 'The order is not ready for dispute resolution.';
  end if;
  if p_outcome = 'release_funds' and v_order.purchase_route <> 'escrow' then
    raise exception 'Only protected orders can record a protected payout.';
  end if;
  if p_outcome = 'close_order' and v_order.purchase_route = 'escrow' then
    raise exception 'Protected orders require a recorded payout before resolving for the seller.';
  end if;
  if p_outcome in ('release_funds', 'refund') and v_financial_reference is null then
    raise exception 'A completed transaction reference is required.';
  end if;
  if v_financial_reference is not null and char_length(v_financial_reference) not between 3 and 250 then
    raise exception 'The completed transaction reference must be between 3 and 250 characters.';
  end if;
  if exists (
    select 1 from public.disputes
    where order_id = v_order.id
      and id <> p_dispute_id
      and status in ('open', 'under_review')
  ) then
    raise exception 'Another dispute remains open on this order.';
  end if;

  if p_outcome in ('release_funds', 'refund') then
    v_event_type := case
      when p_outcome = 'release_funds' then 'protected_payout_completed'
      when v_order.purchase_route = 'escrow' then 'protected_refund_completed'
      when v_order.purchase_route = 'dealer_direct' then 'external_refund_completed'
      else 'kariv_refund_completed'
    end;

    insert into public.order_financial_events (
      store_id, order_id, dispute_id, event_type, purchase_route,
      amount, currency, external_reference, recorded_by, notes
    ) values (
      p_store_id, v_order.id, p_dispute_id, v_event_type, v_order.purchase_route,
      v_order.total_amount, v_order.currency, v_financial_reference, p_resolved_by,
      nullif(trim(p_mediator_notes), '')
    );
  end if;

  update public.orders
  -- `escrow_status` remains the legacy lifecycle field. For a direct order,
  -- `funds_released` means only that the case/order is complete; no payout
  -- event is written and no UI copy claims Kariv released dealer funds.
  set escrow_status = case when p_outcome in ('release_funds', 'close_order') then 'funds_released' else 'cancelled' end,
      purchase_status = case when p_outcome in ('release_funds', 'close_order') then 'completed' else 'cancelled' end,
      shipping_status = 'delivered',
      updated_at = now()
  where id = v_order.id and store_id = p_store_id;

  update public.disputes
  set status = case when p_outcome in ('release_funds', 'close_order') then 'resolved_dealer' else 'resolved_buyer' end,
      mediator_notes = p_mediator_notes,
      resolved_by = p_resolved_by,
      resolved_at = now()
  where id = p_dispute_id;

  return true;
end;
$$;

revoke all on function public.open_kariv_order_dispute(uuid, uuid, text, text, text) from public, anon, authenticated;
revoke all on function public.kariv_dealer_protected_eligible(uuid, text, bigint) from public, anon, authenticated;
revoke all on function public.kariv_dealer_direct_eligible(uuid, text, numeric, bigint) from public, anon, authenticated;
revoke all on function public.create_kariv_order_with_reservation(uuid, uuid, text, text, jsonb, numeric, text, text, text, text, text, boolean, smallint, jsonb, text, jsonb, text, numeric, text, numeric, bigint) from public, anon, authenticated;
revoke all on function public.submit_kariv_payment_proof(uuid, uuid, text, text) from public, anon, authenticated;
revoke all on function public.cancel_kariv_order_before_payment(uuid, uuid) from public, anon, authenticated;
revoke all on function public.reject_kariv_payment_proof(uuid, uuid, text, text, boolean) from public, anon, authenticated;
revoke all on function public.complete_kariv_order_after_review(uuid, uuid, text, text) from public, anon, authenticated;
revoke all on function public.accept_kariv_protected_order(uuid, uuid, text) from public, anon, authenticated;
revoke all on function public.accept_kariv_direct_order(uuid, uuid, text) from public, anon, authenticated;
revoke all on function public.confirm_kariv_direct_payment_received(uuid, uuid, text) from public, anon, authenticated;
revoke all on function public.refund_kariv_order_before_delivery(uuid, uuid, text, text, text) from public, anon, authenticated;
revoke all on function public.resolve_kariv_order_dispute(uuid, uuid, text, text, text, text) from public, anon, authenticated;
grant execute on function public.open_kariv_order_dispute(uuid, uuid, text, text, text) to service_role;
grant execute on function public.kariv_dealer_protected_eligible(uuid, text, bigint) to service_role;
grant execute on function public.kariv_dealer_direct_eligible(uuid, text, numeric, bigint) to service_role;
grant execute on function public.create_kariv_order_with_reservation(uuid, uuid, text, text, jsonb, numeric, text, text, text, text, text, boolean, smallint, jsonb, text, jsonb, text, numeric, text, numeric, bigint) to service_role;
grant execute on function public.submit_kariv_payment_proof(uuid, uuid, text, text) to service_role;
grant execute on function public.cancel_kariv_order_before_payment(uuid, uuid) to service_role;
grant execute on function public.reject_kariv_payment_proof(uuid, uuid, text, text, boolean) to service_role;
grant execute on function public.complete_kariv_order_after_review(uuid, uuid, text, text) to service_role;
grant execute on function public.accept_kariv_protected_order(uuid, uuid, text) to service_role;
grant execute on function public.accept_kariv_direct_order(uuid, uuid, text) to service_role;
grant execute on function public.confirm_kariv_direct_payment_received(uuid, uuid, text) to service_role;
grant execute on function public.refund_kariv_order_before_delivery(uuid, uuid, text, text, text) to service_role;
grant execute on function public.resolve_kariv_order_dispute(uuid, uuid, text, text, text, text) to service_role;
