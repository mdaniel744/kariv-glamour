-- lock_kariv_dealer_application_change lacked SECURITY DEFINER, so its
-- trigger on dealer_applications ran with the submitting caller's own
-- privileges. dealer_applications accepts a direct insert from the applicant
-- themselves, but the trigger's own update of dealer_commerce_profiles
-- requires service_role — without SECURITY DEFINER that update failed with
-- "permission denied for table dealer_commerce_profiles" and rolled back the
-- entire application submission. Re-create with SECURITY DEFINER so the
-- trigger runs with the function owner's privileges, matching every other
-- trigger function in the original migration that reaches into a
-- locked-down table.
create or replace function public.lock_kariv_dealer_application_change()
returns trigger
language plpgsql
security definer
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
