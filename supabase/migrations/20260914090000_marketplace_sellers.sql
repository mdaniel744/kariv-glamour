-- Additive, opt-in per tenant. Apply using the documented dry-run-first runner.
-- Clerk identities are text; products.dealer_id remains authoritative.
begin;
-- Do not take over a shared platform table whose schema/permissions are unknown.
do $$ begin
  if to_regclass('public.dealer_profiles') is not null and to_regclass('public.marketplace_settings') is null then
    raise exception 'Existing dealer_profiles detected: platform owner must review compatibility before applying this migration';
  end if;
end $$;
create table if not exists public.marketplace_settings (
  store_id uuid primary key, environment text not null check(environment in ('development','staging','production')),
  enabled boolean not null default false, policy_version text not null default '2026-09-free-eu-v1'
);
create table if not exists public.dealer_profiles (
  id uuid primary key default gen_random_uuid(), store_id uuid not null, user_id text not null,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  unique(store_id,user_id)
);
alter table public.dealer_profiles
  add column if not exists seller_type text not null default 'third_party',
  add column if not exists public_name text,
  add column if not exists legal_name text,
  add column if not exists slug text,
  add column if not exists external_seller_id text collate "C",
  add column if not exists registered_address_line_1 text,
  add column if not exists registered_address_line_2 text,
  add column if not exists registered_city text,
  add column if not exists registered_postal_code text,
  add column if not exists registered_country_code text,
  add column if not exists company_registration_number text,
  add column if not exists vat_id text,
  add column if not exists public_support_email text,
  add column if not exists public_phone text,
  add column if not exists website_url text,
  add column if not exists logo_url text,
  add column if not exists profile_description_en text,
  add column if not exists profile_description_cs text,
  add column if not exists profile_description_de text,
  add column if not exists professional_seller_confirmed_at timestamptz,
  add column if not exists approval_status text not null default 'draft',
  add column if not exists approved_at timestamptz,
  add column if not exists approved_by text,
  add column if not exists merchant_feed_eligible boolean not null default false,
  add column if not exists accepted_free_eu_shipping_at timestamptz,
  add column if not exists accepted_returns_policy_at timestamptz,
  add column if not exists accepted_warranty_rules_at timestamptz,
  add column if not exists is_demo boolean not null default false,
  add column if not exists deleted_at timestamptz;
create unique index if not exists dealer_profiles_store_key on public.dealer_profiles(store_id,user_id);
create unique index if not exists dealer_profiles_store_slug on public.dealer_profiles(store_id,slug);
create unique index if not exists dealer_profiles_external_key on public.dealer_profiles(store_id,external_seller_id);
create unique index if not exists dealer_profiles_one_owned on public.dealer_profiles(store_id) where seller_type='marketplace_owned';
create index if not exists dealer_profiles_approval on public.dealer_profiles(store_id,approval_status);
create index if not exists dealer_profiles_feed on public.dealer_profiles(store_id,seller_type,merchant_feed_eligible);
create table if not exists public.marketplace_seller_counters (
  store_id uuid primary key, last_value bigint not null default 0
);
create table if not exists public.marketplace_identifier_registry (
  store_id uuid not null, kind text not null check(kind in ('seller','product')),
  identifier text collate "C" not null, entity_key text not null,
  created_at timestamptz not null default now(), primary key(store_id,kind,identifier), unique(store_id,kind,entity_key)
);
create table if not exists public.dealer_staff (
  store_id uuid not null, dealer_user_id text not null, user_id text not null,
  primary key(store_id,dealer_user_id,user_id),
  foreign key(store_id,dealer_user_id) references public.dealer_profiles(store_id,user_id)
);
create table if not exists public.marketplace_audit (
  id uuid primary key default gen_random_uuid(), store_id uuid not null,
  entity_type text not null, entity_id text not null, actor_id text not null,
  reason text not null, before_data jsonb, after_data jsonb,
  created_at timestamptz not null default now()
);
create index if not exists marketplace_audit_entity on public.marketplace_audit(store_id,entity_type,entity_id,created_at desc);

create or replace function public.kariv_seller_guard() returns trigger
language plpgsql set search_path=public,pg_temp as $$
declare next_number bigint; env text;
begin
  if tg_op='UPDATE' and new.store_id is distinct from old.store_id and
    exists(select 1 from marketplace_settings where store_id in (old.store_id,new.store_id)) then raise exception 'Seller tenant is immutable'; end if;
  if tg_op='DELETE' then
    if not exists(select 1 from marketplace_settings where store_id=old.store_id) then return old; end if;
    raise exception 'Seller records must be soft deleted';
  end if;
  select environment into env from marketplace_settings where store_id=new.store_id;
  if not found then return new; end if;
  if tg_op='UPDATE' and (new.store_id<>old.store_id or new.user_id<>old.user_id or new.seller_type<>old.seller_type
      or new.external_seller_id is distinct from old.external_seller_id or new.is_demo<>old.is_demo) then
    raise exception 'Seller identity, type, demo state and external ID are immutable';
  end if;
  if new.seller_type not in ('marketplace_owned','third_party') or new.approval_status not in ('draft','pending','approved','suspended','rejected') then
    raise exception 'Invalid seller type or approval state';
  end if;
  if new.is_demo and (env is null or env not in ('development','staging') or new.merchant_feed_eligible) then
    raise exception 'Demo sellers require a non-production store and cannot enter feeds';
  end if;
  if new.seller_type='marketplace_owned' then
    if new.external_seller_id is not null then raise exception 'Owned seller cannot have external seller ID'; end if;
  elsif tg_op='INSERT' or (tg_op='UPDATE' and old.external_seller_id is null) then
    if new.external_seller_id is not null then raise exception 'Seller IDs are allocated by the database'; end if;
    insert into marketplace_seller_counters(store_id,last_value) values(new.store_id,1)
      on conflict(store_id) do update set last_value=marketplace_seller_counters.last_value+1 returning last_value into next_number;
    new.external_seller_id := 'kg-seller-' || case when next_number<10000 then lpad(next_number::text,4,'0') else next_number::text end;
    insert into marketplace_identifier_registry(store_id,kind,identifier,entity_key)
      values(new.store_id,'seller',new.external_seller_id,new.user_id);
  end if;
  if new.seller_type='third_party' and (new.external_seller_id is null or new.external_seller_id !~ '^[0-9A-Za-z.~_-]{1,50}$') then
    raise exception 'Invalid external seller ID';
  end if;
  if new.approval_status='approved' and not new.is_demo then
    if nullif(btrim(new.public_name),'') is null or nullif(btrim(new.legal_name),'') is null
      or coalesce(new.slug,'') !~ '^[a-z0-9]+(-[a-z0-9]+)*$'
      or nullif(btrim(new.registered_address_line_1),'') is null or nullif(btrim(new.registered_city),'') is null
      or nullif(btrim(new.registered_postal_code),'') is null or coalesce(new.registered_country_code,'') !~ '^[A-Z]{2}$'
      or nullif(btrim(new.company_registration_number),'') is null or coalesce(new.public_support_email,'') !~ '^[^ @]+@[^ @]+\.[^ @]+$'
      or new.professional_seller_confirmed_at is null or new.accepted_free_eu_shipping_at is null
      or new.accepted_returns_policy_at is null or new.accepted_warranty_rules_at is null
      or new.approved_at is null or nullif(new.approved_by,'') is null then
      raise exception 'Production approval requires complete legal details and recorded professional/policy confirmations';
    end if;
  end if;
  if new.merchant_feed_eligible and (new.approval_status<>'approved' or new.deleted_at is not null) then
    raise exception 'Only approved sellers can enter feeds';
  end if;
  new.updated_at=now();
  return new;
end $$;
drop trigger if exists kariv_seller_guard on public.dealer_profiles;
create trigger kariv_seller_guard before insert or update or delete on public.dealer_profiles for each row execute function public.kariv_seller_guard();

alter table public.products
  add column if not exists ownership_verification_status text,
  add column if not exists ownership_verified_at timestamptz,
  add column if not exists ownership_verified_by text,
  add column if not exists merchant_feed_eligible boolean not null default false,
  add column if not exists stable_feed_id text,
  add column if not exists ownership_changed_at timestamptz,
  add column if not exists ownership_change_reason text,
  add column if not exists ownership_changed_by text;
create unique index if not exists products_stable_feed_id on public.products(store_id,stable_feed_id);
create index if not exists products_seller_ownership on public.products(store_id,dealer_id,ownership_verification_status);

create or replace function public.kariv_product_guard() returns trigger
language plpgsql set search_path=public,pg_temp as $$
declare s dealer_profiles%rowtype; cfg marketplace_settings%rowtype; changed boolean;
begin
  if tg_op='UPDATE' and new.store_id is distinct from old.store_id and
    exists(select 1 from marketplace_settings where store_id in (old.store_id,new.store_id)) then
    raise exception 'Product tenant is immutable';
  end if;
  select * into cfg from marketplace_settings where store_id=new.store_id;
  if not found then return new; end if; -- Other stores retain their behavior.
  if tg_op='UPDATE' and new.stable_feed_id is distinct from old.stable_feed_id and old.stable_feed_id is not null then
    raise exception 'Product feed ID is immutable';
  end if;
  if new.stable_feed_id is null then
    new.stable_feed_id='kg-watch-'||new.id::text;
    insert into marketplace_identifier_registry(store_id,kind,identifier,entity_key)
      values(new.store_id,'product',new.stable_feed_id,new.id::text);
  elsif tg_op='INSERT' or (tg_op='UPDATE' and old.stable_feed_id is null) then
    insert into marketplace_identifier_registry(store_id,kind,identifier,entity_key)
      values(new.store_id,'product',new.stable_feed_id,new.id::text);
  end if;
  if length(new.stable_feed_id)>50 or new.stable_feed_id !~ '^[0-9A-Za-z.~_-]+$' then raise exception 'Invalid feed ID'; end if;
  if tg_op='INSERT' then new.ownership_verification_status=coalesce(new.ownership_verification_status,'pending'); end if;
  if new.ownership_verification_status not in ('pending','verified','ambiguous','rejected','demo') then raise exception 'Invalid ownership state'; end if;
  if new.dealer_id is not null then
    select * into s from dealer_profiles where store_id=new.store_id and user_id=new.dealer_id for share;
    if not found and (tg_op='INSERT' or new.dealer_id is distinct from old.dealer_id) then raise exception 'Seller must exist in this store'; end if;
  end if;
  if new.ownership_verification_status='demo' and (cfg.environment='production' or new.merchant_feed_eligible) then raise exception 'Demo ownership cannot be used in production or feeds'; end if;
  if new.ownership_verification_status='verified' and
    (s.user_id is null or s.is_demo or s.deleted_at is not null or s.approval_status<>'approved' or new.ownership_verified_at is null or new.ownership_verified_by is null) then
    raise exception 'Verified ownership requires an approved real seller and verification record';
  end if;
  if new.merchant_feed_eligible and (new.ownership_verification_status is distinct from 'verified' or s.is_demo or s.user_id is null or not s.merchant_feed_eligible or s.deleted_at is not null or s.approval_status<>'approved') then
    raise exception 'Product is not eligible for Merchant feeds';
  end if;
  -- Preserve old status values during migration. Block new publication/publisher changes.
  if cfg.enabled and new.status='active' and (tg_op='INSERT' or old.status is distinct from new.status or old.dealer_id is distinct from new.dealer_id) then
    if s.user_id is null or s.approval_status<>'approved' or s.deleted_at is not null
      or (cfg.environment='production' and (s.is_demo or new.ownership_verification_status is distinct from 'verified')) then
      raise exception 'Publication requires an approved explicit seller and verified production ownership';
    end if;
  end if;
  changed = tg_op='INSERT';
  if tg_op='UPDATE' then changed = new.dealer_id is distinct from old.dealer_id or new.ownership_verification_status is distinct from old.ownership_verification_status; end if;
  if changed then
    if nullif(new.ownership_change_reason,'') is null or nullif(new.ownership_changed_by,'') is null then raise exception 'Ownership changes require actor and reason'; end if;
    new.ownership_changed_at=now();
    insert into marketplace_audit(store_id,entity_type,entity_id,actor_id,reason,before_data,after_data)
    values(new.store_id,'ownership',new.id::text,new.ownership_changed_by,new.ownership_change_reason,
      case when tg_op='UPDATE' then jsonb_build_object('dealer_id',old.dealer_id,'ownership_verification_status',old.ownership_verification_status) end,
      jsonb_build_object('dealer_id',new.dealer_id,'ownership_verification_status',new.ownership_verification_status));
  end if;
  return new;
end $$;
drop trigger if exists kariv_product_guard on public.products;
create trigger kariv_product_guard before insert or update on public.products for each row execute function public.kariv_product_guard();

-- Immutable seller snapshots and a fresh seller/ownership check under a row lock.
create or replace function public.kariv_order_seller_guard() returns trigger
language plpgsql set search_path=public,pg_temp as $$
declare item jsonb; old_item jsonb; p products%rowtype; s dealer_profiles%rowtype; result jsonb='[]'; cfg marketplace_settings%rowtype;
begin
  if tg_op='UPDATE' and new.store_id is distinct from old.store_id and
    exists(select 1 from marketplace_settings where store_id in (old.store_id,new.store_id)) then raise exception 'Order tenant is immutable'; end if;
  select * into cfg from marketplace_settings where store_id=new.store_id;
  if not found then return new; end if;
  if tg_op='UPDATE' then
    if new.store_id is distinct from old.store_id or new.dealer_user_id is distinct from old.dealer_user_id then
      raise exception 'Order seller identity is immutable';
    end if;
    if new.products is distinct from old.products then
      if jsonb_array_length(new.products)<>jsonb_array_length(old.products) then raise exception 'Historical order items cannot change'; end if;
      for item,old_item in select n.value,o.value from jsonb_array_elements(new.products) with ordinality n join jsonb_array_elements(old.products) with ordinality o using(ordinality) loop
        if item->'seller_snapshot' is distinct from old_item->'seller_snapshot' or item->>'product_id' is distinct from old_item->>'product_id' then
          raise exception 'Order seller snapshot is immutable';
        end if;
      end loop;
    end if;
    return new;
  end if;
  if not cfg.enabled then return new; end if;
  if jsonb_typeof(new.products) is distinct from 'array' or jsonb_array_length(new.products)=0 then raise exception 'Order items required'; end if;
  for item in select value from jsonb_array_elements(new.products) loop
    select * into p from products where store_id=new.store_id and id=(item->>'product_id')::uuid for share;
    if not found or p.status<>'active' or coalesce(p.stock_quantity,0)<1 then raise exception 'Watch unavailable'; end if;
    select * into s from dealer_profiles where store_id=new.store_id and user_id=p.dealer_id for share;
    if not found or s.approval_status<>'approved' or s.deleted_at is not null or
      (cfg.environment='production' and (s.is_demo or p.ownership_verification_status is distinct from 'verified')) then raise exception 'Seller unavailable or ownership unverified'; end if;
    if new.dealer_user_id is distinct from s.user_id then raise exception 'Order dealer must match the product seller'; end if;
    item=item||jsonb_build_object('seller_snapshot',jsonb_build_object(
      'user_id',s.user_id,'seller_type',s.seller_type,'public_name',s.public_name,'legal_name',s.legal_name,
      'registered_address_line_1',s.registered_address_line_1,'registered_address_line_2',s.registered_address_line_2,
      'registered_city',s.registered_city,'registered_postal_code',s.registered_postal_code,'registered_country_code',s.registered_country_code,
      'company_registration_number',s.company_registration_number,'vat_id',s.vat_id,'public_support_email',s.public_support_email,
      'public_phone',s.public_phone,'professional_seller_confirmed_at',s.professional_seller_confirmed_at,
      'policy_version',cfg.policy_version,'external_seller_id',s.external_seller_id));
    result=result||jsonb_build_array(item);
  end loop;
  new.products=result;
  return new;
end $$;
drop trigger if exists kariv_order_seller_guard on public.orders;
create trigger kariv_order_seller_guard before insert or update on public.orders for each row execute function public.kariv_order_seller_guard();

-- Private tables: Clerk does not populate auth.uid(). No anonymous mutation policies.
alter table public.dealer_profiles enable row level security;
alter table public.marketplace_settings enable row level security;
alter table public.marketplace_seller_counters enable row level security;
alter table public.marketplace_identifier_registry enable row level security;
alter table public.dealer_staff enable row level security;
alter table public.marketplace_audit enable row level security;
revoke all on public.dealer_profiles,public.marketplace_settings,public.marketplace_seller_counters,
  public.marketplace_identifier_registry,public.dealer_staff,public.marketplace_audit from anon,authenticated;
grant all on public.dealer_profiles,public.marketplace_settings,public.marketplace_seller_counters,
  public.marketplace_identifier_registry,public.dealer_staff,public.marketplace_audit to service_role;
revoke update,delete,truncate on public.marketplace_identifier_registry,public.marketplace_audit from service_role;
-- Explicit safe projection: no Google ID, moderator, private contact or policy evidence.
create or replace view public.marketplace_public_sellers as
select store_id,user_id,seller_type,public_name,legal_name,slug,
  registered_address_line_1,registered_address_line_2,registered_city,registered_postal_code,registered_country_code,
  company_registration_number,vat_id,public_support_email,public_phone,website_url,logo_url,
  profile_description_en,profile_description_cs,profile_description_de,professional_seller_confirmed_at,approval_status,is_demo
from public.dealer_profiles where approval_status='approved' and deleted_at is null and not is_demo;
grant select on public.marketplace_public_sellers to anon,authenticated,service_role;
commit;
