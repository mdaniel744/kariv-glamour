#!/usr/bin/env node
// Explicit operations only. No credentials printed. Files go to ignored reports.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';
import { PGlite } from '@electric-sql/pglite';
import { demoPlan, ownershipBackup, ownershipCounts, validateAssignments, parseAssignmentCsv, assignmentCsv } from '../src/lib/marketplaceAssignments.js';
import { SELLER_FIELDS } from '../src/lib/marketplace.js';
import { COMPANY_DETAILS } from '../src/lib/companyDetails.js';
import { fixtureDatabase } from './marketplace-test-database.mjs';
import { syncDemoDealerNames } from './marketplace-demo-dealers.mjs';

const args = process.argv.slice(2), operation = args[0] || 'audit';
const option = name => { const i = args.indexOf('--' + name); return i < 0 ? undefined : args[i + 1]; };
const apply = args.includes('--apply'), fixture = args.includes('--fixture');
const environment = option('environment') || process.env.MARKETPLACE_ENVIRONMENT;
const store = fixture ? '11111111-1111-4111-8111-111111111111' : process.env.NEXT_PUBLIC_STORE_ID;
const actor = option('actor');
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.resolve(root, 'reports/marketplace', new Date().toISOString().replace(/[:.]/g, '-') + '-' + operation);
if (!store || !/^[0-9a-f-]{36}$/i.test(store)) throw new Error('Set NEXT_PUBLIC_STORE_ID explicitly; no fallback tenant is permitted');
if (!['audit', 'migrate', 'init', 'activate', 'import-dealers', 'demo', 'assign', 'rollback', 'feed-enable'].includes(operation)) throw new Error('Unknown operation');
if (apply && !fixture && option('confirm-store') !== store) throw new Error('Apply requires --confirm-store with the exact tenant UUID');
if (apply && !actor) throw new Error('Apply requires --actor (authenticated operator identity recorded in audit)');
if (!fixture && !process.env.DATABASE_URL) throw new Error('DATABASE_URL is required for this SQL operator tool. No database connection has been attempted.');
if (!fixture && ['init', 'demo'].includes(operation) && !['development','staging','production'].includes(environment)) throw new Error('Explicit MARKETPLACE_ENVIRONMENT required');
const db = fixture ? new PGlite() : new pg.Client({ connectionString: process.env.DATABASE_URL, connectionTimeoutMillis: 10000 });
if (!fixture) await db.connect();
const query = (sql, params = []) => db.query(sql, params);
const close = () => fixture ? db.close() : db.end();
const save = (name, value) => writeFile(path.join(output, name), typeof value === 'string' ? value : JSON.stringify(value, null, 2), { flag: 'wx' });
const migrationNames = ['20260914090000_marketplace_sellers.sql', '20260914091000_marketplace_reviews_and_actions.sql'];
async function migrations() {
  for (const name of migrationNames) {
    const sql = await readFile(path.join(root, 'supabase/migrations', name), 'utf8');
    // The enclosing runner owns the transaction; all migrations roll back together.
    await (fixture ? db.exec(sql.replace(/^begin;$/gm, '').replace(/^commit;$/gm, '')) : query(sql.replace(/^begin;$/gm, '').replace(/^commit;$/gm, '')));
  }
}
async function productRows() { return (await query('select * from products where store_id=$1 order by id', [store])).rows; }
async function sellers() { return (await query('select * from dealer_profiles where store_id=$1 order by user_id', [store])).rows; }
try {
  if (fixture) {
    await fixtureDatabase(db, store);
    await migrations();
    await query("insert into marketplace_settings(store_id,environment,enabled) values($1,'development',false)", [store]);
  }
  await mkdir(output, { recursive: true });
  await query('begin');
  await query("set local lock_timeout = '10s'");
  await query("set local statement_timeout = '60s'");
  if (operation === 'migrate') {
    await migrations();
    await save('summary.json', { mode: apply ? 'apply' : 'dry-run', migrations: migrationNames, affectedProductContent: 0 });
  } else if (operation === 'init') {
    const existing = (await query('select * from marketplace_settings where store_id=$1 for update', [store])).rows[0];
    if (existing && existing.environment !== environment) throw new Error('Environment is immutable in this tool; do not relabel a production tenant');
    await query('insert into marketplace_settings(store_id,environment,enabled) values($1,$2,false) on conflict(store_id) do nothing', [store, environment]);
    // Verified facts from the site. Missing telephone and acceptance evidence stay blank.
    await query(`insert into dealer_profiles(store_id,user_id,seller_type,public_name,legal_name,slug,
      registered_address_line_1,registered_city,registered_postal_code,registered_country_code,
      company_registration_number,vat_id,public_support_email,approval_status,is_demo,merchant_feed_eligible)
      values($1,'kariv-owned','marketplace_owned','Kariv Glamour',$2,'kariv-glamour','Sokolovská 428/130, Karlín','Praha','18600','CZ',$3,$4,$5,'draft',false,false)
      on conflict(store_id,user_id) do nothing`, [store, COMPANY_DETAILS.legalName, COMPANY_DETAILS.companyId, COMPANY_DETAILS.vatId, COMPANY_DETAILS.email]);
    await save('summary.json', { environment, enabled: false, karivSeller: 'kariv-owned', approval: 'draft; real professional/policy evidence required', noOwnershipAssigned: true });
  } else {
    const exists = (await query("select to_regclass('public.marketplace_settings') as name")).rows[0].name;
    if (!exists && operation !== 'audit') throw new Error('Apply the marketplace migrations first');
    const before = await productRows();
    const dealerRows = exists ? await sellers() : [];
    const counts = ownershipCounts(before, dealerRows);
    await save('before.json', { store, recordedAt: new Date().toISOString(), counts, products: ownershipBackup(before), sellers: dealerRows });
    const cfg = exists ? (await query('select * from marketplace_settings where store_id=$1', [store])).rows[0] : null;
    if (operation !== 'audit' && !cfg) throw new Error('Initialize the explicit tenant first');
    let plan = [], restored = 0;
    if (operation === 'activate') {
      if (option('confirm-ownership-reviewed') !== 'yes') throw new Error('Activation requires --confirm-ownership-reviewed yes; unresolved products will remain unavailable');
      await query('update marketplace_settings set enabled=true where store_id=$1', [store]);
      await query("insert into marketplace_audit(store_id,entity_type,entity_id,actor_id,reason) values($1,'configuration',$1::text,$2,'Explicit marketplace activation after ownership review')", [store, actor || 'dry-run']);
    } else if (operation === 'demo') {
      if (process.env.NODE_ENV === 'production' || !['development','staging'].includes(cfg.environment)) throw new Error('Demo seeding refused against production');
      if (!fixture && (environment !== cfg.environment || new URL(process.env.DATABASE_URL).hostname !== process.env.MARKETPLACE_DEMO_DATABASE_HOST)) throw new Error('Nonproduction database host and environment must match the explicitly configured demo target');
      const result = demoPlan(before, { environment: cfg.environment, sellers: dealerRows });
      const existingThird = dealerRows.filter(s => s.seller_type === 'third_party');
      if (existingThird.some(s => !result.dealers.some(d => d.user_id === s.user_id))) throw new Error('Use an isolated dataset: other real or demo dealer profiles already exist');
      const dealerChanges = await syncDemoDealerNames(query, store, actor || 'dry-run');
      await save('dealer-changes.json', dealerChanges);
      plan = result.plan;
      await save('mapping.csv', assignmentCsv(result.mapping));
    } else if (operation === 'import-dealers') {
      const input = JSON.parse(await readFile(option('file'), 'utf8'));
      if (!Array.isArray(input.dealers) || input.dealers.length !== 18) throw new Error('Expected exactly 18 reviewed dealer slots');
      const ids = new Set();
      for (const dealer of input.dealers) {
        if (!dealer.user_id || ids.has(dealer.user_id) || dealer.is_demo || dealer.seller_type !== 'third_party') throw new Error('Unique real Clerk dealer identities are required');
        ids.add(dealer.user_id);
        if (dealerRows.some(s => s.user_id === dealer.user_id)) continue; // Never overwrite existing legal details.
        const keys = SELLER_FIELDS.filter(k => typeof dealer[k] === 'string' && dealer[k].trim());
        if (!keys.includes('public_name') || !keys.includes('legal_name') || !keys.includes('slug')) throw new Error('Import requires verified public name, legal name and slug; other incomplete records remain drafts');
        await query('insert into dealer_profiles(store_id,user_id,seller_type,is_demo,approval_status,merchant_feed_eligible,' + keys.join(',') +
          ') values($1,$2,\'third_party\',false,\'draft\',false,' + keys.map((_, i) => '$' + (i + 3)).join(',') + ')',
          [store, dealer.user_id, ...keys.map(k => dealer[k])]);
      }
    } else if (operation === 'assign') {
      const input = await readFile(option('file'), 'utf8');
      const rows = option('file').endsWith('.csv') ? parseAssignmentCsv(input) : JSON.parse(input);
      plan = validateAssignments(rows, before, dealerRows, { allowVerifiedOverride: args.includes('--allow-verified-override') });
    } else if (operation === 'rollback') {
      const backup = JSON.parse(await readFile(option('file'), 'utf8'));
      if (backup.store !== store || !Array.isArray(backup.products)) throw new Error('Backup belongs to another store or is invalid');
      const after = JSON.parse(await readFile(option('after'), 'utf8'));
      if (after.store !== store) throw new Error('After snapshot belongs to another store');
      for (const saved of backup.products) {
        const expected = after.products.find(p => p.id === saved.id), current = before.find(p => p.id === saved.id);
        if (!expected || !current || current.dealer_id !== expected.dealer_id || current.ownership_verification_status !== expected.ownership_verification_status) throw new Error('Ownership changed since this run; reviewed manual reconciliation required');
        if (current.dealer_id === saved.dealer_id && current.ownership_verification_status === saved.ownership_verification_status) continue;
        await query(`update products set dealer_id=$3,ownership_verification_status=$4,ownership_verified_at=$5,ownership_verified_by=$6,
          merchant_feed_eligible=$7,ownership_changed_by=$8,ownership_change_reason='Reviewed rollback from ownership backup'
          where store_id=$1 and id=$2`, [store, saved.id, saved.dealer_id, saved.ownership_verification_status,
          saved.ownership_verified_at, saved.ownership_verified_by, saved.merchant_feed_eligible || false, actor || 'dry-run']);
        restored++;
      }
    } else if (operation === 'feed-enable') {
      const input = JSON.parse(await readFile(option('file'), 'utf8'));
      if (!Array.isArray(input) || !input.length || input.some(id => !before.some(p => p.id === id))) throw new Error('Provide a reviewed JSON array of this store’s product IDs');
      await query("update products set merchant_feed_eligible=true where store_id=$1 and id=any($2::uuid[])", [store, input]);
      await query("insert into marketplace_audit(store_id,entity_type,entity_id,actor_id,reason,before_data,after_data) values($1,'feed','bulk',$2,$3,$4,$5)", [store, actor || 'dry-run', option('reason') || 'Reviewed feed opt-in', JSON.stringify(ownershipBackup(before.filter(p => input.includes(p.id)))), JSON.stringify(input)]);
    }
    if (plan.length) await query('select kariv_assign_products($1,$2,$3,$4)', [store, actor || 'dry-run', JSON.stringify(plan), args.includes('--allow-verified-override')]);
    await save('plan.json', plan);
    const afterProducts = await productRows(), afterSellers = exists ? await sellers() : [];
    await save('after.json', { store, products: ownershipBackup(afterProducts), sellers: afterSellers, counts: ownershipCounts(afterProducts, afterSellers) });
    await save('summary.json', { mode: apply ? 'apply' : 'dry-run', fixture, before: counts, after: ownershipCounts(afterProducts, afterSellers),
      changedProducts: plan.length + restored, ambiguousNotAutomaticallyAssigned: afterProducts.filter(p => !p.dealer_id || !p.ownership_verification_status).length });
  }
  await query(apply ? 'commit' : 'rollback');
  console.log(JSON.stringify({ status: apply ? 'applied' : 'dry-run rolled back; database unchanged', fixture, reportDirectory: output }));
} catch (error) {
  await query('rollback').catch(() => {});
  console.error('Marketplace operation failed; transaction rolled back:', error.message);
  process.exitCode = 1;
} finally { await close(); }
