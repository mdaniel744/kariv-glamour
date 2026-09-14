import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { compileFunction } from 'node:vm';
import ts from 'typescript';
import * as marketplace from '../src/lib/marketplace.js';
import * as productMerchant from '../src/lib/productMerchant.js';
import { testSeller } from './fixtures/marketplace.mjs';
function load(file, imports) {
  const source=readFileSync(new URL('../'+file,import.meta.url),'utf8');
  const result=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
  const module={exports:{}};
  compileFunction(result,['require','module','exports'])(key=>{ assert.ok(key in imports,key);return imports[key];},module,module.exports);
  return module.exports;
}
function auth(role) {
  return load('src/lib/serverAuth.js',{
    'server-only':{},
    '@clerk/nextjs/server':{auth:async()=>({userId:role?'buyer':null}),clerkClient:async()=>({users:{getUser:async()=>({id:'buyer',fullName:'TEST buyer',publicMetadata:{role}})}})},
  });
}
test('main administrator role is enforced against backend Clerk metadata',async()=>{
  for(const role of [null,'buyer','dealer','admin']) await assert.rejects(auth(role).requireMainAdmin(),/Main administrator/);
  assert.equal((await auth('super_admin').requireMainAdmin()).role,'super_admin');
  await assert.rejects(auth(null).requireUser(),/Sign-in/);
});
function reviews(role) {
  const writes=[],queries=[],refresh=[];
  const db={
    from(table) {
      const filters=[];let values=null;
      const q={ select(){return q;},eq(k,v){filters.push([k,v]);return q;},in(){return q;},is(){return q;},
        insert(v){values=v;writes.push(v);return q;},
        async maybeSingle(){queries.push({table,filters});return {data:table==='orders'?{id:'test-order'}:null,error:null};},
        async single(){return {data:{id:'test-review',...values},error:null};}
      };return q;
    },
    async rpc(name,input){writes.push({name,input});return {data:null,error:null};}
  };
  const actions=load('src/actions/dealerReviews.js',{
    'next/cache':{revalidatePath:p=>refresh.push(p)},
    '@/lib/supabaseAdmin':{supabaseAdmin:db},'@/lib/serverAuth':auth(role),
    '@/lib/supabaseData':{STORE_ID:'test-store',Products:{invalidate:()=>refresh.push('products')}},
    '@/lib/orderShaping':{formatEscrowReference:id=>id},
    '@/lib/dealerReviewsData':{mapDealerReviewRow:r=>({id:r.id,status:r.status})},
    '@/lib/marketplaceServer':{loadSeller:async()=>testSeller,loadDealerPage:async()=>({})},
    '@/lib/marketplace':marketplace,'@/lib/productMerchant':productMerchant
  });
  return {actions,writes,queries,refresh};
}
test('anonymous review mutation is rejected before any database access',async()=>{
  const f=reviews(null);
  assert.equal((await f.actions.submitDealerReview({dealerId:testSeller.user_id,orderId:'test-order',rating:5,reviewText:'TEST review text'})).ok,false);
  assert.deepEqual(f.writes,[]);assert.deepEqual(f.queries,[]);
});
test('buyer review submission uses authenticated identity, verified purchase and pending status, ignoring forged approval',async()=>{
  const f=reviews('buyer');
  const result=await f.actions.submitDealerReview({dealerId:testSeller.user_id,orderId:'test-order',rating:5,status:'approved',buyerId:'forged',isVerifiedPurchase:false,reviewText:'<script>malicious()</script>TEST useful review text'});
  assert.equal(result.ok,true);assert.equal(f.writes[0].buyer_user_id,'buyer');assert.equal(f.writes[0].status,'pending');
  assert.equal(f.writes[0].is_verified_purchase,true);assert.equal(f.writes[0].review_text,'TEST useful review text');
  for(const q of f.queries) assert.ok(q.filters.some(([key,value])=>key==='store_id'&&value==='test-store'));
  assert.ok(f.refresh.includes('/[locale]'));
});
test('buyers and ordinary admins cannot moderate, while main-admin approval invalidates public data',async()=>{
  for(const role of ['buyer','dealer','admin',null]) {
    const f=reviews(role);assert.equal((await f.actions.moderateDealerReview('test-review','approved')).ok,false);assert.deepEqual(f.writes,[]);
  }
  const f=reviews('super_admin');
  assert.equal((await f.actions.moderateDealerReview('test-review','approved')).ok,true);
  assert.equal(f.writes[0].input.p_store,'test-store');assert.equal(f.writes[0].input.p_actor,'buyer');
  assert.ok(f.refresh.includes('products'));assert.ok(f.refresh.includes('/[locale]'));
});
