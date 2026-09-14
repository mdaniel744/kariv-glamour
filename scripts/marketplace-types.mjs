#!/usr/bin/env node
// Generate the marketplace table contract from the SQL migrations in isolated PostgreSQL.
// This is NOT a dump of the shared production database types.
import { PGlite } from '@electric-sql/pglite';
import { readFile, writeFile } from 'node:fs/promises';
import { fixtureDatabase } from './marketplace-test-database.mjs';
const db=new PGlite();
try {
  await fixtureDatabase(db,'11111111-1111-4111-8111-111111111111');
  for(const name of ['20260914090000_marketplace_sellers.sql','20260914091000_marketplace_reviews_and_actions.sql']) await db.exec(await readFile(new URL('../supabase/migrations/'+name,import.meta.url),'utf8'));
  const {rows}=await db.query("select table_name,column_name,data_type,is_nullable from information_schema.columns where table_schema='public' and table_name in ('dealer_profiles','dealer_reviews','dealer_staff','marketplace_settings','marketplace_audit','marketplace_identifier_registry','marketplace_seller_counters') order by table_name,ordinal_position");
  const tables=[...new Set(rows.map(r=>r.table_name))];
  const type=column=> ['integer','smallint','bigint','numeric','double precision'].includes(column.data_type)?'number':column.data_type==='boolean'?'boolean':column.data_type==='jsonb'?'Json':'string';
  const output='// GENERATED from marketplace migrations against an isolated PostgreSQL fixture.\n// Regenerate with node scripts/marketplace-types.mjs --apply; full shared-DB generation requires its connection.\nexport type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];\n\n'+tables.map(table=>'export interface '+table.split('_').map(s=>s[0].toUpperCase()+s.slice(1)).join('')+'Row {\n'+rows.filter(r=>r.table_name===table).map(c=>'  '+c.column_name+': '+type(c)+(c.is_nullable==='YES'?' | null':'')+';').join('\n')+'\n}').join('\n\n')+'\n';
  if(process.argv.includes('--apply')) {
    await writeFile(new URL('../src/types/marketplace.generated.d.ts',import.meta.url),output);
    console.log('Generated marketplace table contract (fixture-derived, not production introspection).');
  } else console.log(output);
} finally { await db.close(); }
