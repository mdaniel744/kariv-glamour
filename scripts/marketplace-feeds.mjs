#!/usr/bin/env node
// Local sample generation/validation only; never submits data to Google.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { buildMerchantFeed, merchantFeedXml } from '../src/lib/merchantFeed.js';
import { testSeller, testOwnedSeller, testWatch, testRates } from '../tests/fixtures/marketplace.mjs';
const args = process.argv.slice(2), sample = args.includes('--sample'), apply = args.includes('--apply');
const option = key => { const i=args.indexOf('--'+key); return i<0 ? undefined : args[i+1]; };
if (!sample && !option('fixture')) throw new Error('Use --sample or --fixture path/to/shaped-products-and-sellers.json. Live diagnostics are in the main admin Marketplace page.');
const input = sample ? { products: [testWatch, { ...testWatch,id:'00000000-0000-4000-8000-000000000002',stableFeedId:'kg-watch-00000000-0000-4000-8000-000000000002',dealerId:testOwnedSeller.user_id,seller:testOwnedSeller }],
  sellers:[testSeller,testOwnedSeller],exchangeRates:testRates() } : JSON.parse(await readFile(option('fixture'),'utf8'));
const output = path.resolve('reports/marketplace', 'feed-samples-' + new Date().toISOString().replace(/[:.]/g,'-'));
if(apply) await mkdir(output,{recursive:true});
const report={mode:apply?'fixture files written':'dry-run, no files written',productionSubmission:false,fixtureOnly:true,feeds:{}};
for(const locale of ['cs','de']) for(const [group,sellerType] of [['kariv','marketplace_owned'],['dealers','third_party']]) {
  const result=buildMerchantFeed(input.products,input.sellers,{locale,sellerType,exchangeRates:input.exchangeRates});
  report.feeds[locale+'/'+group]=result.summary;
  if(apply) {
    await writeFile(path.join(output,locale+'-'+group+'.xml'),merchantFeedXml(result),{flag:'wx'});
    await writeFile(path.join(output,locale+'-'+group+'-diagnostics.json'),JSON.stringify(result,null,2),{flag:'wx'});
  }
}
if(apply) report.output=output;
console.log(JSON.stringify(report,null,2));
