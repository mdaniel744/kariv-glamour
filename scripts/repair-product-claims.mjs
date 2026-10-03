// Exact, reviewed content-only changes. No publication, ownership or commerce changes.
import { readFile, writeFile, appendFile } from 'node:fs/promises';
import path from 'node:path';
import { createClient } from '@supabase/supabase-js';
import { KARIV_STORE_ID, createClaimPlan, digest, validateOperation, translationWinner } from './lib/product-claim-plan.mjs';
import { rules as en } from './lib/product-claim-rules-en.mjs';
import { rules as de } from './lib/product-claim-rules-de.mjs';
import { rules as cs } from './lib/product-claim-rules-cs.mjs';

const [mode, input, outputOrDigest] = process.argv.slice(2);
function outsideRepo(file) {
  if (!file || !path.isAbsolute(file) || !path.relative(process.cwd(), file).startsWith('..')) throw new Error('Use an absolute private audit path outside the repository');
}
outsideRepo(input);
const data = JSON.parse(await readFile(input, 'utf8'));

if (mode === 'plan') {
  outsideRepo(outputOrDigest);
  const plan = createClaimPlan(data, { en, de, cs });
  for (const operation of plan.operations) validateOperation(operation, plan.storeId);
  const json = JSON.stringify(plan, null, 2);
  await writeFile(outputOrDigest, json, { flag: 'wx' });
  console.log(JSON.stringify({ manifest: outputOrDigest, digest: digest(json),
    affectedProducts: plan.affectedProducts, productRows: plan.operations.filter((op) => op.table === 'products').length,
    translations: plan.operations.filter((op) => op.table === 'translations').length,
    locales: plan.operations.reduce((result, op) => ({ ...result, [op.locale]: (result[op.locale] || 0) + 1 }), {}) }));
} else if (mode === 'apply' || mode === 'reconcile') {
  const json = await readFile(input, 'utf8');
  if (outputOrDigest !== digest(json)) throw new Error('Reviewed manifest digest does not match');
  if (process.env.NEXT_PUBLIC_STORE_ID !== KARIV_STORE_ID || data.storeId !== KARIV_STORE_ID) throw new Error('Wrong tenant');
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) throw new Error('Configured admin database key is required');
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false, autoRefreshToken: false } });
  const journal = `${input}.journal.jsonl`;
  const scope = (query, operation) => {
    let next = query.eq('store_id', KARIV_STORE_ID).eq('id', operation.id);
    if (operation.table === 'translations') next = next.eq('entity_type', 'product').eq('entity_id', operation.productId);
    else next = next.eq('status', 'active');
    return next;
  };
  const assertWinner = async (operation) => {
    if (operation.table !== 'translations') return;
    const { data: siblings, error } = await db.from('translations').select('*')
      .eq('store_id', KARIV_STORE_ID).eq('entity_type', 'product').eq('entity_id', operation.productId);
    if (error) throw new Error(`Cannot check translation precedence: ${error.message}`);
    if (translationWinner(siblings, operation.before)?.id !== operation.id) throw new Error(`A newer translation supersedes ${operation.id}; regenerate the plan`);
  };
  if (mode === 'reconcile') {
    // Read-only recovery check, including any write whose HTTP response was lost.
    // The manifest keeps original values; never restore entire rows over later edits.
    const states = [];
    for (const operation of data.operations) {
      validateOperation(operation, data.storeId);
      const { data: current, error } = await scope(db.from(operation.table).select('*'), operation).single();
      if (error) throw new Error(error.message);
      const unchanged = Object.keys(operation.before).every((field) => field === 'updated_at' || field in operation.patch || JSON.stringify(current[field]) === JSON.stringify(operation.before[field]));
      const isBefore = Object.keys(operation.patch).every((field) => current[field] === operation.before[field]);
      const isAfter = Object.keys(operation.patch).every((field) => current[field] === operation.patch[field]);
      states.push({ table: operation.table, id: operation.id, state: unchanged && isAfter ? 'applied' : unchanged && isBefore && current.updated_at === operation.before.updated_at ? 'untouched' : 'requires-review', updatedAt: current.updated_at });
    }
    const report = `${input}.reconcile-${Date.now()}.json`;
    await writeFile(report, JSON.stringify(states, null, 2), { flag: 'wx' });
    console.log(JSON.stringify({ report, states: states.reduce((counts, row) => ({ ...counts, [row.state]: (counts[row.state] || 0) + 1 }), {}) }));
    process.exit(0);
  }
  // Preflight every row before the first mutation; a stale plan must be regenerated.
  for (let offset = 0; offset < data.operations.length; offset += 8) {
    await Promise.all(data.operations.slice(offset, offset + 8).map(async (operation) => {
      validateOperation(operation, data.storeId);
      const { data: current, error } = await scope(db.from(operation.table).select('*'), operation).single();
      if (error) throw new Error(`Preflight failed: ${operation.table}/${operation.id}: ${error.message}`);
      if (current.updated_at !== operation.before.updated_at || Object.keys(operation.patch).some((field) => current[field] !== operation.before[field])) throw new Error(`Content changed since backup: ${operation.table}/${operation.id}`);
      await assertWinner(operation);
    }));
  }
  await writeFile(journal, '', { flag: 'wx' });
  let journalTail = Promise.resolve();
  const record = (entry) => {
    journalTail = journalTail.then(() => appendFile(journal, `${JSON.stringify(entry)}\n`));
    return journalTail;
  };
  let applied = 0;
  const applyOne = async (operation) => {
    await assertWinner(operation);
    // Write intent first so an interrupted/ambiguous response is recoverable.
    await record({ state: 'pending', table: operation.table, id: operation.id, beforeUpdatedAt: operation.before.updated_at, patch: operation.patch });
    // Per-row optimistic concurrency protects concurrent dashboard edits.
    const { data: current, error } = await scope(db.from(operation.table)
      .update({ ...operation.patch, updated_at: new Date().toISOString() }), operation)
      .eq('updated_at', operation.before.updated_at).select('*').single();
    if (error || !current) throw new Error(`Stopped after ${applied} changes: ${operation.table}/${operation.id}: ${error?.message || 'concurrent edit'}. See ${journal}`);
    await record({ state: 'applied', table: operation.table, id: operation.id, after: current });
    for (const [field, expected] of Object.entries(operation.patch)) if (current[field] !== expected) throw new Error(`Write verification failed for ${operation.id}/${field}`);
    for (const field of Object.keys(operation.before)) {
      if (field === 'updated_at' || field in operation.patch) continue;
      if (JSON.stringify(current[field]) !== JSON.stringify(operation.before[field])) throw new Error(`Unexpected non-content change for ${operation.id}/${field}; inspect journal`);
    }
    applied++;
  };
  // Independent rows only; settle the current batch before reporting a failure.
  // No further writes are started after a failed batch.
  const operationKeys = data.operations.map((operation) => `${operation.table}/${operation.id}`);
  if (new Set(operationKeys).size !== operationKeys.length) throw new Error('Duplicate row operations');
  for (let offset = 0; offset < data.operations.length; offset += 4) {
    const results = await Promise.allSettled(data.operations.slice(offset, offset + 4).map(applyOne));
    const failures = results.filter((result) => result.status === 'rejected');
    if (failures.length) throw new Error(`Stopped after ${applied} verified changes: ${failures.map((result) => result.reason.message).join('; ')}. Run reconcile before recovery.`);
    if (applied % 100 === 0) console.log(JSON.stringify({ applied, total: data.operations.length }));
  }
  console.log(JSON.stringify({ completed: true, applied, affectedProducts: data.affectedProducts, journal }));
} else throw new Error('Usage: plan <snapshot> <manifest> OR apply/reconcile <manifest> <reviewed-sha256>');
