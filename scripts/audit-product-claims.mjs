// Read-only database audit. The generated snapshot is local and must not be published.
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { createClient } from '@supabase/supabase-js';

const storeId = process.env.NEXT_PUBLIC_STORE_ID;
const EXPECTED_STORE = '7efd71bc-0287-4f40-8a2f-1de330c49522';
if (storeId !== EXPECTED_STORE) throw new Error('This audit is restricted to the Kariv tenant.');
const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  { auth: { persistSession: false, autoRefreshToken: false } });
const target = process.argv[2];
if (!target || !path.isAbsolute(target)) throw new Error('Supply an absolute local snapshot path outside the repository.');
const relative = path.relative(process.cwd(), target);
if (!relative.startsWith('..')) throw new Error('Keep catalog backups outside the repository.');

async function pages(table, configure) {
  const rows = [];
  let offset = 0;
  for (;;) {
    const { data, error, count } = await configure(db.from(table).select('*', { count: 'exact' })
      .eq('store_id', storeId)).order('id').range(offset, offset + 499);
    if (error) throw new Error(`${table}: ${error.message}`);
    if (!data?.length) {
      if (count != null && offset < count) throw new Error(`Incomplete ${table} response`);
      break;
    }
    rows.push(...data);
    offset += data.length;
    if (count != null && offset >= count) break;
  }
  return rows;
}

const products = await pages('products', (query) => query.eq('status', 'active'));
const productIds = new Set(products.map((row) => row.id));
const translations = (await pages('translations', (query) => query.eq('entity_type', 'product')))
  .filter((row) => productIds.has(row.entity_id));
const snapshot = { createdAt: new Date().toISOString(), storeId, products, translations };
const json = JSON.stringify(snapshot, null, 2);
await mkdir(path.dirname(target), { recursive: true });
await writeFile(target, json, { flag: 'wx' });
console.log(JSON.stringify({ snapshot: target, sha256: createHash('sha256').update(json).digest('hex'),
  products: products.length, translations: translations.length }));
