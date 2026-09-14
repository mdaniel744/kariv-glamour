'use client';
import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { getMarketplaceData, saveMainSeller, previewOwnershipImport, applyOwnershipImport, exportOwnershipCsv, getFeedDiagnostics } from '@/actions/marketplace';
import { SELLER_FIELDS, sellerValidation } from '@/lib/marketplace';
import AdminDealerReviews from './AdminDealerReviews';
const field = 'w-full rounded-xl border border-border bg-background px-3 py-2 text-sm';
function download(name, data, type = 'application/json') {
  const url = URL.createObjectURL(new Blob([typeof data === 'string' ? data : JSON.stringify(data, null, 2)], { type }));
  const link = document.createElement('a'); link.href = url; link.download = name; link.click(); URL.revokeObjectURL(url);
}
export default function AdminMarketplace() {
  const [data, setData] = useState(null), [error, setError] = useState(''), [tab, setTab] = useState('dealers');
  const [form, setForm] = useState(null), [reason, setReason] = useState(''), [busy, setBusy] = useState(false);
  const [seller, setSeller] = useState(''), [state, setState] = useState(''), [csv, setCsv] = useState(''), [preview, setPreview] = useState(null);
  const [override, setOverride] = useState(false), [confirmed, setConfirmed] = useState(false), [feeds, setFeeds] = useState(null);
  async function load() { try { setData(await getMarketplaceData()); } catch (e) { setError(e.message); } }
  useEffect(() => { load(); }, []);
  async function run(fn) {
    setBusy(true); setError('');
    try { await fn(); } catch (e) { setError(e.message); } finally { setBusy(false); }
  }
  const products = data?.products.filter(p => (!seller || p.dealer_id === seller) && (!state || (p.ownership_verification_status || 'ambiguous') === state)) || [];
  return <div className="space-y-6">
    <header><h1 className="text-2xl font-medium">Marketplace & dealers</h1><p className="mt-2 text-sm text-muted-foreground">Main administrator only. Legal approval does not grant a Clerk role; dealer account approval remains in Ecom King.</p></header>
    <nav className="flex flex-wrap gap-2">{['dealers', 'ownership', 'reviews', 'feeds', 'audit'].map(key => <button className={'rounded-full border px-4 py-2 ' + (tab === key ? 'bg-primary text-primary-foreground' : '')} key={key} onClick={() => setTab(key)}>{key}</button>)}</nav>
    {error && <p role="alert" className="rounded-xl border border-destructive p-4">{error}</p>}
    {!data ? <p>Marketplace data is unavailable until the migrations and connection are configured.</p> : <>
      <p className="text-sm">{data.counts.totalProducts} products · {data.counts.totalSellers} sellers · {data.counts.unassigned} unassigned · {data.counts.feedEnabled} product feed flags enabled (see diagnostics for actual eligibility)</p>
      {tab === 'dealers' && <><div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr>{['Public / legal name', 'Type', 'Approval', 'Professional', 'External seller ID', 'Products', 'Reviews / average', 'Feed', 'Demo', ''].map((h, i) => <th className="p-3" key={i}>{h}</th>)}</tr></thead><tbody>
        {data.sellers.map(s => <tr className="border-t" key={s.user_id}><td className="p-3">{s.public_name}<small className="block">{s.legal_name}</small></td><td>{s.seller_type}</td><td>{s.approval_status}</td><td>{s.professional_seller_confirmed_at ? 'Confirmed' : 'Missing'}</td><td>{s.external_seller_id || '—'}</td><td>{s.productCount}</td><td>{s.totalReviews} / {s.averageRating}</td><td>{s.merchant_feed_eligible ? 'Enabled' : 'Off'}</td><td>{s.is_demo ? 'DEMO' : 'No'}</td><td><button className="underline" onClick={() => { setForm(s); setReason(''); }}>Edit</button></td></tr>)}
      </tbody></table></div><p className="text-sm">Import verified profiles with the documented dry-run CLI. Unknown legal information must remain blank.</p></>}
      {tab === 'ownership' && <section className="space-y-5">
        <div className="flex flex-wrap gap-3"><label>Seller<select className={field} value={seller} onChange={e => setSeller(e.target.value)}><option value="">All sellers</option>{data.sellers.map(s => <option value={s.user_id} key={s.user_id}>{s.public_name}</option>)}</select></label>
          <label>Ownership<select className={field} value={state} onChange={e => setState(e.target.value)}><option value="">All states</option>{['pending', 'verified', 'ambiguous', 'rejected', 'demo'].map(s => <option key={s}>{s}</option>)}</select></label>
          <button className="rounded-full border px-5 py-2" onClick={() => run(async () => download('ownership.csv', await exportOwnershipCsv(), 'text/csv'))}>Export assignment CSV</button>
        </div>
        <div className="max-h-80 overflow-auto"><table className="w-full text-left text-sm"><thead><tr><th>Product</th><th>Seller</th><th>Ownership</th></tr></thead><tbody>{products.map(p => <tr className="border-t" key={p.id}><td className="p-2">{p.name}<small className="block">{p.id}</small></td><td>{p.dealer_id || 'Unassigned'}</td><td>{p.ownership_verification_status || 'ambiguous'}</td></tr>)}</tbody></table></div>
        <label className="block">Import reviewed CSV<input className="block p-3" type="file" accept=".csv,text/csv" onChange={async e => { const file = e.target.files?.[0]; if (file && file.size <= 2_000_000) { setCsv(await file.text()); setPreview(null); setConfirmed(false); } }} /></label>
        <textarea aria-label="Assignment CSV" className={field} rows={5} value={csv} onChange={e => { setCsv(e.target.value); setPreview(null); setConfirmed(false); }} placeholder="product_id,seller_id,verification_status,reason" />
        <label className="flex items-center gap-3"><input type="checkbox" checked={override} onChange={e => { setOverride(e.target.checked); setPreview(null); setConfirmed(false); }} />Explicitly allow a reviewed change to existing verified ownership</label>
        <button disabled={busy || !csv} className="rounded-full border px-5 py-2" onClick={() => run(async () => { setPreview(await previewOwnershipImport(csv, override)); setConfirmed(false); })}>Dry-run preview</button>
        {preview && <div className="space-y-4 rounded-xl border p-4"><p>{preview.plan.length} changes. Prices, stock, URLs and translations are not part of this import.</p>
          <pre className="max-h-64 overflow-auto text-xs">{JSON.stringify(preview.plan, null, 2)}</pre>
          <button className="underline" onClick={() => { download('ownership-before.json', preview.before); setConfirmed(true); }}>Download backup before apply</button>
          <button disabled={!confirmed || busy || !preview.plan.length} className="ml-4 rounded-full bg-primary px-5 py-2 text-primary-foreground disabled:opacity-40" onClick={() => run(async () => {
            const result = await applyOwnershipImport(csv, preview.plan, override);
            if (!result.ok) throw new Error(result.error);
            setPreview(null); setCsv(''); await load();
          })}>Apply reviewed changes</button>
        </div>}
      </section>}
      {tab === 'reviews' && <AdminDealerReviews />}
      {tab === 'feeds' && <section className="space-y-4"><button disabled={busy} className="rounded-full border px-5 py-2" onClick={() => run(async () => setFeeds(await getFeedDiagnostics()))}>Validate all four feeds</button><p className="text-sm">No account conversion or Google submission is performed here.</p>{feeds && <pre className="max-h-[70vh] overflow-auto rounded-xl border p-4 text-xs">{JSON.stringify(feeds, null, 2)}</pre>}</section>}
      {tab === 'audit' && <section className="space-y-3"><h2 className="text-lg">Latest 100 audited changes</h2>{data.audit.map(entry => <details key={entry.id} className="rounded-xl border p-3"><summary>{entry.created_at} · {entry.entity_type} · {entry.actor_id} · {entry.reason}</summary><pre className="overflow-auto text-xs">{JSON.stringify(entry, null, 2)}</pre></details>)}</section>}
    </>}
    <Dialog.Root open={Boolean(form)} onOpenChange={open => { if (!open) setForm(null); }}>
    {form && <Dialog.Portal><Dialog.Overlay className="fixed inset-0 z-50 bg-black/60" /><Dialog.Content aria-describedby={undefined} className="fixed inset-x-4 bottom-4 top-4 z-50 overflow-auto rounded-2xl bg-background p-5 md:p-10"><div className="mx-auto max-w-4xl space-y-5">
      <div className="flex justify-between"><Dialog.Title className="text-2xl">Edit {form.public_name}</Dialog.Title><Dialog.Close>Close</Dialog.Close></div>
      <p>Permanent external ID: <strong>{form.external_seller_id || 'None (Kariv-owned)'}</strong> · {form.productCount} products · {form.totalReviews} approved reviews</p>
      <div className="grid gap-4 md:grid-cols-2">{SELLER_FIELDS.map(key => <label key={key} className="text-sm">{key.replaceAll('_', ' ')}<input className={field} value={form[key] || ''} onChange={e => setForm({ ...form, [key]: e.target.value })} /></label>)}</div>
      <p className="text-sm">Record timestamps only from verified professional status and genuine seller policy acceptance evidence.</p>
      <div className="grid gap-4 md:grid-cols-2">{['professional_seller_confirmed_at', 'accepted_free_eu_shipping_at', 'accepted_returns_policy_at', 'accepted_warranty_rules_at'].map(key => <label key={key}>{key.replaceAll('_', ' ')}<input className={field} placeholder="ISO date/time from verified evidence" value={form[key] || ''} onChange={e => setForm({ ...form, [key]: e.target.value })} /></label>)}</div>
      <label>Approval<select className={field} value={form.approval_status} onChange={e => setForm({ ...form, approval_status: e.target.value, merchant_feed_eligible: false })}>{['draft', 'pending', 'approved', 'rejected', 'suspended'].map(s => <option key={s}>{s}</option>)}</select></label>
      <label className="flex gap-3"><input type="checkbox" disabled={form.is_demo || form.approval_status !== 'approved'} checked={form.merchant_feed_eligible} onChange={e => setForm({ ...form, merchant_feed_eligible: e.target.checked })} />Merchant feed eligibility (product-level opt-in is also required)</label>
      <p className="text-sm">Validation: {sellerValidation(form, { demoAllowed: form.is_demo }).join(', ') || 'Complete'}</p>
      <label>Evidence / internal change reason<textarea required className={field} value={reason} onChange={e => setReason(e.target.value)} /></label>
      {error && <p role="alert">{error}</p>}
      <button disabled={busy || !reason.trim()} className="rounded-full bg-primary px-6 py-3 text-primary-foreground disabled:opacity-40" onClick={() => run(async () => { const result = await saveMainSeller(form.user_id, form, reason); if (!result.ok) throw new Error(result.error); setForm(null); await load(); })}>Save reviewed profile</button>
      <details><summary>Seller audit history (latest loaded entries)</summary><pre className="overflow-auto text-xs">{JSON.stringify(data?.audit.filter(a => a.entity_id === form.user_id), null, 2)}</pre></details>
    </div></Dialog.Content></Dialog.Portal>}
    </Dialog.Root>
  </div>;
}
