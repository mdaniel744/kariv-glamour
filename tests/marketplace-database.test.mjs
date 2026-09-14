import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { PGlite } from '@electric-sql/pglite';
import { fixtureDatabase } from '../scripts/marketplace-test-database.mjs';
import { demoPlan, demoDealers } from '../src/lib/marketplaceAssignments.js';
import { syncDemoDealerNames } from '../scripts/marketplace-demo-dealers.mjs';

const store = '11111111-1111-4111-8111-111111111111', other = '22222222-2222-4222-8222-222222222222';
test('PostgreSQL marketplace migrations and enforcement (isolated WASM PostgreSQL)', async t => {
  const db = new PGlite();
  try {
    await fixtureDatabase(db, store);
    for (const name of ['20260914090000_marketplace_sellers.sql', '20260914091000_marketplace_reviews_and_actions.sql']) {
      await db.exec(await readFile(new URL('../supabase/migrations/' + name, import.meta.url), 'utf8'));
    }
    await db.query("insert into marketplace_settings(store_id,environment,enabled) values($1,'production',true),($2,'development',false)", [store, other]);
    const createSeller = async (key, type = 'third_party') => (await db.query(`insert into dealer_profiles(store_id,user_id,seller_type,public_name,legal_name,slug,
      registered_address_line_1,registered_city,registered_postal_code,registered_country_code,company_registration_number,public_support_email,
      professional_seller_confirmed_at,accepted_free_eu_shipping_at,accepted_returns_policy_at,accepted_warranty_rules_at,approval_status,approved_at,approved_by,merchant_feed_eligible)
      values($1,$2,$3,$2,$2,$2,'TEST address','TEST city','00000','CZ','TEST-ONLY','test@example.invalid',
      now(),now(),now(),now(),'approved',now(),'test-admin',true) returning *`, [store,key,type])).rows[0];
    const a = await createSeller('test-dealer-a'), b = await createSeller('test-dealer-b'), owned = await createSeller('test-owned','marketplace_owned');
    await t.test('permanent IDs are sequential, unique, immutable and absent for Kariv-owned', async () => {
      assert.equal(a.external_seller_id, 'kg-seller-0001'); assert.equal(b.external_seller_id, 'kg-seller-0002'); assert.equal(owned.external_seller_id,null);
      await assert.rejects(db.query("update dealer_profiles set external_seller_id='replacement' where user_id=$1",[a.user_id]), /immutable/);
      await assert.rejects(db.query("delete from dealer_profiles where user_id=$1",[a.user_id]), /soft deleted/);
      await db.query("update dealer_profiles set approval_status='suspended',merchant_feed_eligible=false,deleted_at=now() where user_id=$1", [b.user_id]);
      const c=await createSeller('test-dealer-c'); assert.equal(c.external_seller_id,'kg-seller-0003');
    });
    await t.test('demo sellers cannot enter production or feeds and incomplete real profiles cannot be approved', async () => {
      await assert.rejects(db.query("insert into dealer_profiles(store_id,user_id,is_demo) values($1,'bad-demo',true)",[store]), /Demo sellers/);
      await assert.rejects(db.query("insert into dealer_profiles(store_id,user_id,approval_status) values($1,'incomplete','approved')",[store]), /complete legal/);
      await assert.rejects(db.query("insert into dealer_profiles(store_id,user_id,is_demo,merchant_feed_eligible) values($1,'bad-demo',true,true)",[other]), /Demo sellers/);
    });
    const products=(await db.query('select * from products where store_id=$1 order by id',[store])).rows;
    const watch=products[0].id;
    const plan=[{product_id:watch,previous_seller:null,previous_status:null,seller_id:a.user_id,verification_status:'verified',reason:'TEST documented ownership'}];
    await t.test('assignment uses stale-data protection and writes ownership audit without modifying the watch',async()=>{
      await db.query('select kariv_assign_products($1,$2,$3,false)',[store,'test-admin',JSON.stringify(plan)]);
      const updated=(await db.query('select * from products where id=$1',[watch])).rows[0];
      for(const key of ['id','slug','price','currency','stock_quantity','images','attributes','status']) assert.deepEqual(updated[key],products[0][key]);
      assert.equal(updated.stable_feed_id,'kg-watch-'+watch);
      assert.equal((await db.query("select count(*)::int n from marketplace_audit where entity_type='ownership'")).rows[0].n,1);
      await assert.rejects(db.query('select kariv_assign_products($1,$2,$3,false)',[store,'test-admin',JSON.stringify(plan)]),/changed since preview/);
      await assert.rejects(db.query("update products set stable_feed_id='new-id' where id=$1",[watch]),/immutable/);
    });
    await t.test('publishing requires a seller; another unconfigured tenant retains its existing behavior',async()=>{
      const id='33333333-3333-4333-8333-333333333333';
      await assert.rejects(db.query("insert into products(id,store_id,status,stock_quantity) values($1,$2,'active',1)",[id,store]),/Publication/);
      await db.query("insert into products(id,store_id,status,stock_quantity) values($1,$2,'active',1)",[id,'99999999-9999-4999-8999-999999999999']);
    });
    let order;
    await t.test('order seller snapshot is authoritative and immutable; suspension blocks new purchases',async()=>{
      order=(await db.query("insert into orders(store_id,buyer_user_id,dealer_user_id,products,escrow_status) values($1,'test-buyer',$2,$3,'verified') returning *",
        [store,a.user_id,JSON.stringify([{product_id:watch,seller_snapshot:{legal_name:'forged'}}])])).rows[0];
      assert.equal(order.products[0].seller_snapshot.legal_name,a.legal_name);
      await assert.rejects(db.query("update orders set products=$2 where id=$1",[order.id,JSON.stringify([{product_id:watch,seller_snapshot:{legal_name:'changed'}}])]),/immutable/);
      await db.query("update dealer_profiles set public_name='TEST renamed',approval_status='suspended',merchant_feed_eligible=false where user_id=$1",[a.user_id]);
      assert.equal((await db.query('select products from orders where id=$1',[order.id])).rows[0].products[0].seller_snapshot.public_name,a.public_name);
      await assert.rejects(db.query("insert into orders(store_id,buyer_user_id,dealer_user_id,products,escrow_status) values($1,'buyer2',$2,$3,'pending_review')",
        [store,a.user_id,JSON.stringify([{product_id:watch}])]),/Seller unavailable/);
      await db.query("update dealer_profiles set approval_status='approved' where user_id=$1",[a.user_id]);
    });
    let review;
    await t.test('only a matching purchase can review; insertion cannot self-approve',async()=>{
      await assert.rejects(db.query("insert into dealer_reviews(store_id,dealer_user_id,buyer_user_id,buyer_name,order_id,rating,review_text) values($1,$2,'wrong-buyer','TEST',$3,5,'Test review text')",[store,a.user_id,order.id]),/Verified purchase/);
      review=(await db.query("insert into dealer_reviews(store_id,dealer_user_id,buyer_user_id,buyer_name,order_id,rating,review_text,status) values($1,$2,'test-buyer','TEST buyer',$3,5,'TEST review only','approved') returning *",[store,a.user_id,order.id])).rows[0];
      assert.equal(review.status,'pending');assert.equal(review.is_verified_purchase,true);
      assert.equal((await db.query('select * from marketplace_public_ratings where store_id=$1',[store])).rows.length,0);
    });
    await t.test('main moderation RPC audits, requires rejection reason and refuses self-approval',async()=>{
      await assert.rejects(db.query('select kariv_moderate_review($1,$2,$3,$4,$5)',[store,review.id,'test-buyer','approved','']),/conflict/);
      await assert.rejects(db.query('select kariv_moderate_review($1,$2,$3,$4,$5)',[store,review.id,'test-admin','rejected','']),/Reason/);
      await db.query('select kariv_moderate_review($1,$2,$3,$4,$5)',[store,review.id,'test-admin','approved','TEST approval']);
      const aggregate=(await db.query('select * from marketplace_public_ratings where store_id=$1',[store])).rows[0];
      assert.equal(aggregate.review_count,1);assert.equal(Number(aggregate.average_rating),5);
      await assert.rejects(db.exec("set role anon; select kariv_moderate_review('"+store+"','"+review.id+"','forged','approved','')"),/permission denied/);
      await db.exec('reset role');
    });
    await t.test('editing returns to pending; staff reviews and duplicate active reviews are rejected',async()=>{
      // Advance this isolated fixture's row age without waiting in the test runner.
      await db.exec('alter table dealer_reviews disable trigger kariv_review_guard');
      await db.query("update dealer_reviews set updated_at=now()-interval '2 minutes' where id=$1",[review.id]);
      await db.exec('alter table dealer_reviews enable trigger kariv_review_guard');
      await db.query("update dealer_reviews set review_text='TEST edited review only' where id=$1",[review.id]);
      assert.equal((await db.query('select status from dealer_reviews where id=$1',[review.id])).rows[0].status,'pending');
      assert.equal((await db.query('select * from marketplace_public_ratings where store_id=$1',[store])).rows.length,0);
      const order2=(await db.query("insert into orders(store_id,buyer_user_id,dealer_user_id,products,escrow_status) values($1,'test-buyer',$2,$3,'verified') returning id",
        [store,a.user_id,JSON.stringify([{product_id:watch}])])).rows[0].id;
      await assert.rejects(db.query("insert into dealer_reviews(store_id,dealer_user_id,buyer_user_id,buyer_name,order_id,rating,review_text) values($1,$2,'test-buyer','TEST buyer',$3,4,'TEST duplicate review')",[store,a.user_id,order2]),/One active/);
      await db.query("insert into dealer_staff values($1,$2,'test-buyer')",[store,a.user_id]);
      await assert.rejects(db.query("update dealer_reviews set review_text='TEST staff edit' where id=$1",[review.id]),/staff/);
    });
    await t.test('public projections omit internal seller IDs and moderation data',async()=>{
      await db.exec('set role anon');
      const row=(await db.query('select * from marketplace_public_sellers where store_id=$1',[store])).rows[0];
      assert.ok(row);assert.equal(row.external_seller_id,undefined);assert.equal(row.approved_by,undefined);
      await assert.rejects(db.query('select * from marketplace_audit'),/permission denied/);
      await db.exec('reset role');
    });
    await t.test('isolated demo is exactly 18 × 30 and re-running has no assignment changes',async()=>{
      await db.query(`insert into products(id,store_id,status,stock_quantity,ownership_changed_by,ownership_change_reason)
        select ('44444444-4444-4444-8444-'||lpad(n::text,12,'0'))::uuid,$1,'active',1,'test-admin','TEST fixture only' from generate_series(1,670) n`,[other]);
      const raw=(await db.query('select * from products where store_id=$1',[other])).rows;
      const result=demoPlan(raw,{environment:'development'});
      assert.equal(result.dealers.length,18);assert.equal(result.mapping.length,540);
      for(const dealer of demoDealers()) await db.query("insert into dealer_profiles(store_id,user_id,public_name,legal_name,slug,is_demo,approval_status) values($1,$2,$3,$4,$5,true,'approved')",[other,dealer.user_id,dealer.public_name,dealer.legal_name,dealer.slug]);
      await db.query('select kariv_assign_products($1,$2,$3,false)',[other,'test-admin',JSON.stringify(result.plan)]);
      const after=(await db.query('select * from products where store_id=$1',[other])).rows;
      const rerun=demoPlan(after,{environment:'development'});
      assert.equal(rerun.plan.length,0);
      for(const dealer of result.dealers) assert.equal(after.filter(p=>p.dealer_id===dealer.user_id).length,30);
      assert.equal((await db.query('select * from marketplace_public_sellers where store_id=$1',[other])).rows.length,0);
    });
    await t.test('demo name refresh preserves permanent IDs, ownership, custom names and production isolation', async () => {
      const query = (sql, params) => db.query(sql, params);
      const before = (await query('select * from dealer_profiles where store_id=$1 order by user_id', [other])).rows;
      const productsBefore = (await query('select * from products where store_id=$1 order by id', [other])).rows;
      // Emulate profiles created by the older demo seed.
      for (const dealer of before) {
        const n = dealer.user_id.slice(-2);
        await query('update dealer_profiles set public_name=$3,legal_name=$4 where store_id=$1 and user_id=$2',
          [other, dealer.user_id, 'DEMO dealer ' + n, 'DEMONSTRATION ONLY ' + n]);
      }
      const changes = await syncDemoDealerNames(query, other, 'test-admin');
      assert.equal(changes.length, 18);
      const after = (await query('select * from dealer_profiles where store_id=$1 order by user_id', [other])).rows;
      for (const [index, dealer] of after.entries()) {
        assert.equal(dealer.public_name, demoDealers()[index].public_name);
        for (const key of ['user_id', 'slug', 'external_seller_id', 'is_demo', 'approval_status', 'merchant_feed_eligible']) assert.equal(dealer[key], before[index][key]);
      }
      assert.deepEqual((await query('select * from products where store_id=$1 order by id', [other])).rows, productsBefore);
      assert.deepEqual(await syncDemoDealerNames(query, other, 'test-admin'), []);
      await query("update dealer_profiles set public_name='Custom Demonstration Atelier (Demo)' where store_id=$1 and user_id='demo-dealer-01'", [other]);
      assert.deepEqual(await syncDemoDealerNames(query, other, 'test-admin'), []);
      await assert.rejects(syncDemoDealerNames(query, store, 'test-admin'), /forbidden in production/);
      assert.equal((await query('select * from marketplace_public_sellers where store_id=$1', [other])).rows.length, 0);
      assert.equal((await query("select count(*)::int n from marketplace_audit where store_id=$1 and reason='Fictional business display names for nonproduction demo profiles'", [other])).rows[0].n, 18);
    });
  } finally { await db.close(); }
});
