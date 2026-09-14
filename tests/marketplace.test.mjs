import test from 'node:test';
import assert from 'node:assert/strict';
import { buildMerchantFeed, merchantFeedXml } from '../src/lib/merchantFeed.js';
import { buildProductMerchantSchema, getProductPricing } from '../src/lib/productMerchant.js';
import { publicSeller, publicSellerSnapshot, sellerSnapshot, sellerDisplayName, canPurchaseFromSeller, summarizeApprovedReviews, groupBySeller } from '../src/lib/marketplace.js';
import { marketplaceCopy } from '../src/lib/marketplaceCopy.js';
import { parseAssignmentCsv, assignmentCsv, validateAssignments, demoPlan, demoDealers } from '../src/lib/marketplaceAssignments.js';
import { testSeller, testOwnedSeller, testWatch, testRates } from './fixtures/marketplace.mjs';

test('demo dealers have distinct business-style display names without changing stable identities or eligibility', () => {
  const dealers = demoDealers();
  assert.equal(dealers.length, 18);
  assert.equal(new Set(dealers.map(d => d.public_name)).size, 18);
  for (const [index, dealer] of dealers.entries()) {
    const key = 'demo-dealer-' + String(index + 1).padStart(2, '0');
    assert.equal(dealer.user_id, key);
    assert.equal(dealer.slug, key);
    assert.match(dealer.public_name, /\(Demo\)$/);
    assert.doesNotMatch(dealer.public_name, /demo-dealer-|DEMO dealer/);
    assert.match(dealer.legal_name, /^DEMONSTRATION ONLY/);
    assert.equal(dealer.is_demo, true);
    assert.equal(dealer.merchant_feed_eligible, false);
    assert.equal(publicSeller(dealer), null);
  }
});

test('four feed variants preserve seller/product identity, localized copy and displayed currency/price', () => {
  const rates = testRates();
  for (const locale of ['cs','de']) for (const seller of [testSeller,testOwnedSeller]) {
    const watch = {...testWatch,seller,dealerId:seller.user_id};
    const result=buildMerchantFeed([watch],[seller],{locale,sellerType:seller.seller_type,exchangeRates:rates});
    assert.equal(result.included.length,1,JSON.stringify(result.excluded));
    const offer=result.included[0];
    assert.equal(offer.id,testWatch.stableFeedId);
    assert.equal(offer.price,getProductPricing(watch,{locale,exchangeRates:rates}).price.toFixed(2)+' '+(locale==='cs'?'CZK':'EUR'));
    assert.equal(offer.title,watch['productTitle_'+locale]);assert.ok(offer.link.includes('/'+locale+'/product/'+watch.slug));
    assert.equal(offer.external_seller_id,seller.external_seller_id || undefined);
    const xml=merchantFeedXml(result);
    assert.equal(xml.includes('external_seller_id'),seller.seller_type==='third_party');
    assert.match(xml,/<g:shipping>/);
    assert.match(xml,/0.00 (CZK|EUR)/);
  }
});
test('feeds exclude every unsafe seller/ownership/status/translation and diagnose the reason', () => {
  const cases=[
    [{...testWatch,ownershipVerificationStatus:'ambiguous'},testSeller,'unverified_ownership'],
    [testWatch,{...testSeller,is_demo:true},'demo_seller'],
    [testWatch,{...testSeller,approval_status:'suspended'},'seller_unapproved_or_suspended'],
    [testWatch,{...testSeller,external_seller_id:null},'invalid_external_seller_id'],
    [{...testWatch,productTitle_cs:''},testSeller,'missing_translation'],
    [{...testWatch,productDescription_de:''},testSeller,'missing_translation'],
    [{...testWatch,isPublished:false},testSeller,'not_purchasable'],
    [{...testWatch,stockQuantity:0},testSeller,'not_purchasable'],
    [{...testWatch,stableFeedId:null},testSeller,'invalid_feed_id'],
    [{...testWatch,price:0},testSeller,'invalid_price_or_currency'],
    [{...testWatch,merchantFeedEligible:false},testSeller,'product_feed_disabled'],
    [testWatch,{...testSeller,merchant_feed_eligible:false},'seller_feed_disabled'],
  ];
  for(const [watch,seller,reason] of cases) {
    const locale=watch.productDescription_de===''?'de':'cs';
    const result=buildMerchantFeed([watch],[seller],{locale,sellerType:'third_party',exchangeRates:testRates()});
    assert.equal(result.included.length,0,reason);assert.ok(result.excluded[0].reasons.includes(reason),reason);
  }
  const duplicate=buildMerchantFeed([testWatch,{...testWatch,id:'different'}],[testSeller],{locale:'de',sellerType:'third_party'});
  assert.equal(duplicate.included.length,0);assert.equal(duplicate.summary.exclusionsByReason.duplicate_feed_id,2);
});
test('visible seller equals Offer.seller, dealer ratings never become watch ratings, private IDs remain private',()=>{
  for(const seller of [testSeller,testOwnedSeller]) {
    const schema=buildProductMerchantSchema({...testWatch,seller,averageRating:5,reviews:[{}]},{locale:'de',url:'https://24kariv.com/de/product/test-watch'});
    assert.equal(schema.offers.seller.name,sellerDisplayName(seller));
    assert.equal(schema.aggregateRating,undefined);assert.equal(schema.review,undefined);
    assert.ok(!JSON.stringify(schema).includes('kg-seller-'));
    assert.equal(publicSeller(seller).external_seller_id,undefined);
  }
  assert.equal(buildProductMerchantSchema({...testWatch,seller:{...testSeller,is_demo:true}},{locale:'de',url:'https://24kariv.com/de/product/test-watch'}).offers,undefined);
});
test('snapshot is independent of profile changes, legacy is explicit, internal metadata is removed',()=>{
  const seller=structuredClone(testSeller), saved=sellerSnapshot(seller);
  seller.public_name='Changed';
  assert.equal(saved.public_name,testSeller.public_name);
  const publicSnapshot=publicSellerSnapshot({...saved,internal_notes:'private'});
  assert.equal(publicSnapshot.external_seller_id,undefined);assert.equal(publicSnapshot.internal_notes,undefined);
  assert.equal(publicSellerSnapshot(null),null);
  assert.equal(groupBySeller([testWatch,{...testWatch,id:'second',seller:testOwnedSeller}]).length,2);
});
test('public approved-review aggregate uses all eligible rows, excludes pending/rejected/spam/deleted',()=>{
  const reviews=[...Array.from({length:601},()=>({rating:5,status:'approved'})),{rating:1,status:'pending'},{rating:1,status:'rejected'},
    {rating:1,status:'spam'},{rating:1,status:'approved',deleted_at:'2026-01-01'}];
  const summary=summarizeApprovedReviews(reviews);
  assert.equal(summary.totalReviews,601);assert.equal(summary.averageRating,5);assert.equal(summary.distribution[5],601);
});
test('Czech and German seller labels, legacy explanations and accessible rating labels are supplied',()=>{
  for(const locale of ['cs','de']) {
    const copy=marketplaceCopy(locale);
    for(const key of ['soldBy','verified','legacy','stars','pending','thirdParty','owned']) assert.ok(copy[key] && copy[key]!==marketplaceCopy('en')[key]);
  }
});
test('CSV round-trip, validation and tenant-safe ownership preview do not mutate records',()=>{
  const rows=[{product_id:'watch',seller_id:testSeller.user_id,verification_status:'verified',reason:'Verified invoice, source "A"'}];
  assert.deepEqual(parseAssignmentCsv(assignmentCsv(rows)),rows);
  const original=[{id:'watch',dealer_id:null,ownership_verification_status:null}];
  const before=structuredClone(original);
  const plan=validateAssignments(rows,original,[testSeller]);
  assert.equal(plan.length,1);assert.deepEqual(original,before);
  assert.throws(()=>validateAssignments([...rows,...rows],original,[testSeller]),/Duplicate/);
  assert.throws(()=>validateAssignments(rows,original,[]),/Unknown/);
  assert.throws(()=>validateAssignments(rows,[{...original[0],dealer_id:'other',ownership_verification_status:'verified'}],[testSeller]),/overwrite verified/);
  assert.throws(()=>demoPlan(original,{environment:'production'}),/forbidden/);
});
test('missing/unapproved/demo/ambiguous sellers cannot be purchased',()=>{
  assert.equal(canPurchaseFromSeller(testWatch),true);
  for(const seller of [null,{...testSeller,approval_status:'pending'},{...testSeller,is_demo:true},{...testSeller,deleted_at:'now'}]) assert.equal(canPurchaseFromSeller({...testWatch,seller}),false);
  assert.equal(canPurchaseFromSeller({...testWatch,ownershipVerificationStatus:'pending'}),false);
});
