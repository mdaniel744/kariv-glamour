'use client';
import { useEffect, useState } from 'react';
import { getMySellerProfile, saveMySellerProfile } from '@/actions/marketplace';
import { SELLER_FIELDS } from '@/lib/marketplace';
import { marketplaceCopy } from '@/lib/marketplaceCopy';
import { useLanguage } from '@/lib/languageContext';
import ImageUploader from '@/components/shared/ImageUploader';
import LocalizedLink from '@/components/LocalizedLink';

export default function DealerProfileSettings() {
  const { locale } = useLanguage();
  const t = marketplaceCopy(locale);
  const [form, setForm] = useState(null), [message, setMessage] = useState(''), [saving, setSaving] = useState(false);
  const label = locale === 'cs' ? 'Odeslat ke schválení' : locale === 'de' ? 'Zur Prüfung einreichen' : 'Submit for approval';
  useEffect(() => { getMySellerProfile().then(setForm).catch(e => setMessage(e.message)); }, []);
  async function save(e) {
    e.preventDefault(); setSaving(true);
    try { const result = await saveMySellerProfile(form); setMessage(result.ok ? (locale === 'cs' ? 'Profil čeká na schválení.' : locale === 'de' ? 'Das Profil wartet auf Freigabe.' : 'Profile submitted for administrator approval.') : result.error); }
    finally { setSaving(false); }
  }
  return <div className="mx-auto max-w-4xl space-y-6 p-5">
    <h1 className="text-2xl font-medium">{t.contact}</h1>
    {message && <p role="status">{message}</p>}
    {!form ? <p>{t.unresolved}</p> : <form onSubmit={save} className="space-y-6">
      <p>{form.approval_status}</p>
      <div className="grid gap-4 md:grid-cols-2">{SELLER_FIELDS.filter(k => k !== 'logo_url').map(key =>
        <label key={key} className="text-sm">{key.replaceAll('_', ' ')}
          {key.startsWith('profile_description') ? <textarea rows={4} className="mt-1 w-full rounded-xl border bg-background p-3" value={form[key] || ''} onChange={e => setForm({ ...form, [key]: e.target.value })} /> :
            <input className="mt-1 w-full rounded-xl border bg-background p-3" value={form[key] || ''} onChange={e => setForm({ ...form, [key]: e.target.value })} />}
        </label>)}</div>
      <ImageUploader value={form.logo_url || ''} onChange={logo_url => setForm({ ...form, logo_url })} />
      <div className="space-y-4">{[
        ['accepted_free_eu_shipping_at', t.shipping, '/legal/shipping-policy'],
        ['accepted_returns_policy_at', t.returns, '/legal/returns-refund-policy'],
        ['accepted_warranty_rules_at', t.warranty, '/legal/warranty-policy'],
      ].map(([key, title, path]) => <label className="flex items-center gap-3" key={key}>
        <input type="checkbox" checked={form[key] === true} onChange={e => setForm({ ...form, [key]: e.target.checked })} />
        {locale === 'cs' ? 'Souhlasím: ' : locale === 'de' ? 'Ich stimme zu: ' : 'I accept: '}<LocalizedLink className="text-primary underline" to={path}>{title}</LocalizedLink>
      </label>)}</div>
      <button className="rounded-full bg-primary px-6 py-3 text-primary-foreground disabled:opacity-50" disabled={saving || form.approval_status === 'suspended'}>{label}</button>
    </form>}
  </div>;
}
