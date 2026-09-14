import { demoDealers } from '../src/lib/marketplaceAssignments.js';

// The caller owns the transaction, dry-run rollback, backup and host checks.
// This shared routine is also exercised against PostgreSQL in database tests.
export async function syncDemoDealerNames(query, store, actor) {
  const config = (await query('select environment from marketplace_settings where store_id=$1 for update', [store])).rows[0];
  if (!['development', 'staging'].includes(config?.environment)) throw new Error('Demo names are forbidden in production');
  const changes = [];
  for (const dealer of demoDealers()) {
    const before = (await query('select * from dealer_profiles where store_id=$1 and user_id=$2 for update', [store, dealer.user_id])).rows[0];
    if (before && (!before.is_demo || before.seller_type !== 'third_party')) throw new Error('Demo ID conflicts with a real seller');
    // Preserve manually customized demo profiles; only replace the old seed names.
    const n = dealer.user_id.slice(-2);
    const publicName = before && !['DEMO dealer ' + n, dealer.user_id].includes(before.public_name) ? before.public_name : dealer.public_name;
    const legalName = before && before.legal_name !== 'DEMONSTRATION ONLY ' + n ? before.legal_name : dealer.legal_name;
    if (before && before.public_name === publicName && before.legal_name === legalName) continue;
    // Do not use INSERT ... ON CONFLICT for existing profiles: the INSERT
    // trigger reserves a permanent seller ID before conflict resolution.
    const after = (before
      ? await query(`update dealer_profiles set public_name=$3,legal_name=$4
        where store_id=$1 and user_id=$2 and is_demo=true and seller_type='third_party' returning *`,
        [store, dealer.user_id, publicName, legalName])
      : await query(`insert into dealer_profiles(store_id,user_id,seller_type,public_name,legal_name,slug,is_demo,approval_status,merchant_feed_eligible)
        values($1,$2,'third_party',$3,$4,$5,true,'approved',false) returning *`,
        [store, dealer.user_id, publicName, legalName, dealer.slug])).rows[0];
    if (!after) throw new Error('Demo profile changed during name update');
    await query(`insert into marketplace_audit(store_id,entity_type,entity_id,actor_id,reason,before_data,after_data)
      values($1,'seller',$2,$3,'Fictional business display names for nonproduction demo profiles',$4,$5)`,
      [store, dealer.user_id, actor, JSON.stringify(before || null), JSON.stringify(after)]);
    changes.push({ user_id: dealer.user_id, public_name: after.public_name, created: !before });
  }
  return changes;
}
