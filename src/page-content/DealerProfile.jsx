'use client';
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useLanguage } from '@/lib/languageContext';
import { getPublicDealerPage, getDealerReviewEligibility, deleteMyDealerReview } from '@/actions/dealerReviews';
import { marketplaceCopy } from '@/lib/marketplaceCopy';
import { sellerDisplayName } from '@/lib/marketplace';
import { getProductAvailability } from '@/lib/productMerchant';
import SellerIdentity from '@/components/marketplace/SellerIdentity';
import DealerReviewCard from '@/components/dealer/DealerReviewCard';
import DealerReviewForm from '@/components/dealer/DealerReviewForm';
import StarRating from '@/components/dealer/StarRating';
import ProductCard from '@/components/shared/ProductCard';
import MediaImage from '@/components/shared/MediaImage';
import LocalizedLink from '@/components/LocalizedLink';

export default function DealerProfile({ id, initialProfile, initialListings = [], initialReviews = [] }) {
  const { locale } = useLanguage();
  const { user } = useAuth();
  const t = marketplaceCopy(locale);
  const [data, setData] = useState({ profile: initialProfile, listings: initialListings, reviews: initialReviews });
  const [eligibility, setEligibility] = useState(null);
  const [editing, setEditing] = useState(false);
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(0);
  const [error, setError] = useState('');
  const refresh = useCallback(async () => {
    try {
      const next = await getPublicDealerPage(id, { sort, offset: page * 20 });
      setData(next); setError('');
      if (user) setEligibility(await getDealerReviewEligibility(id));
    } catch (e) { setError(e.message); }
  }, [id, user, sort, page]);
  useEffect(() => {
    refresh();
    const timer = setInterval(refresh, 45000);
    return () => clearInterval(timer);
  }, [refresh]);
  const profile = data.profile;
  if (!profile) return <p className="mx-auto max-w-5xl p-8">{t.unresolved}</p>;
  const name = sellerDisplayName(profile);
  const active = data.listings.filter(p => getProductAvailability(p).inStock);
  const mine = eligibility?.submittedReview;
  const description = profile['profile_description_' + locale] || '';
  return <main className="mx-auto max-w-7xl space-y-10 px-4 py-8 md:px-8">
    <header className="flex items-center gap-5">
      {profile.logo_url && <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl"><MediaImage src={profile.logo_url} alt={name} fill sizes="80px" className="object-contain" /></div>}
      <h1 className="font-display text-3xl font-medium">{name}</h1>
    </header>
    <SellerIdentity seller={profile} />
    {description && <section><h2 className="mb-3 text-xl font-medium">{t.about}</h2><p className="whitespace-pre-line leading-relaxed">{description}</p></section>}
    <section className="grid gap-6 rounded-2xl border border-border p-5 md:grid-cols-2">
      <div className="space-y-2"><h2 className="text-xl font-medium">{t.contact}</h2>
        <p>{profile.legal_name}</p>
        <address className="not-italic">{[profile.registered_address_line_1, profile.registered_address_line_2, profile.registered_city, profile.registered_postal_code, profile.registered_country_code].filter(Boolean).join(', ')}</address>
        <p>{t.registration}: {profile.company_registration_number}</p>
        {profile.vat_id && <p>{t.vat}: {profile.vat_id}</p>}
        <a className="block text-primary underline" href={'mailto:' + profile.public_support_email}>{profile.public_support_email}</a>
        {profile.public_phone && <a className="block text-primary underline" href={'tel:' + profile.public_phone}>{profile.public_phone}</a>}
        {profile.website_url?.startsWith('https://') && <a className="block break-all text-primary underline" href={profile.website_url} rel="noopener noreferrer" target="_blank">{profile.website_url}</a>}
      </div>
      <div><p className="mb-4 leading-relaxed">{t.policies}</p><div className="flex flex-wrap gap-4">
        {[[t.shipping, 'legal/shipping-policy'], [t.returns, 'legal/returns-refund-policy'], [t.warranty, 'legal/warranty-policy'], [t.protection, 'buyer-protection']].map(([label, path]) =>
          <LocalizedLink key={path} className="text-primary underline" to={'/' + path}>{label}</LocalizedLink>)}
      </div></div>
    </section>
    <section><h2 className="mb-5 text-2xl font-medium">{t.listings} ({active.length})</h2>
      {active.length ? <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">{active.map(product => <ProductCard key={product.id} product={product} />)}</div> : <p>{t.unavailable}</p>}
    </section>
    <section className="space-y-5"><h2 className="text-2xl font-medium">{t.reviews} ({profile.totalReviews})</h2>
      {profile.totalReviews > 0 && <div className="grid gap-5 rounded-2xl border border-border p-5 md:grid-cols-2">
        <div><p className="mb-2 text-3xl">{Number(profile.averageRating).toFixed(1)} / 5</p><StarRating rating={profile.averageRating} /></div>
        <div>{[5, 4, 3, 2, 1].map(n => <div className="flex items-center gap-3" key={n}><span>{n} ★</span><progress className="h-2 flex-1" aria-label={n + ' ' + t.star} max={profile.totalReviews} value={profile.distribution?.[n] || 0} /><span>{profile.distribution?.[n] || 0}</span></div>)}</div>
      </div>}
      {error && <p role="alert">{error}</p>}
      {!user ? <LocalizedLink className="inline-block rounded-full border px-5 py-3" to="/login">{t.signIn}</LocalizedLink> :
        <>
          {mine?.status === 'pending' && <p role="status">{t.pending}</p>}
          {mine && <div className="flex gap-4">
            <button className="text-primary underline" onClick={() => setEditing(!editing)}>{t.edit}</button>
            <button className="text-primary underline" onClick={async () => { const result = await deleteMyDealerReview(mine.id); if (!result.ok) setError(result.error); else { setEditing(false); await refresh(); } }}>{t.remove}</button>
          </div>}
          {(eligibility?.eligibleOrder || (editing && mine)) ? <DealerReviewForm key={mine?.id || 'new'} dealerId={id} dealerName={name}
            orderId={eligibility?.eligibleOrder?.id} initialReview={editing ? mine : null}
            onSubmitted={async () => { setEditing(false); await refresh(); }} /> : !mine && <p>{t.purchaseRequired}</p>}
        </>}
      <label className="flex items-center gap-3">{t.reviews}<select className="rounded-full border bg-background p-2" value={sort} onChange={e => { setSort(e.target.value); setPage(0); }}>
        {['newest', 'highest', 'lowest'].map(value => <option key={value} value={value}>{t[value]}</option>)}
      </select></label>
      {data.reviews.length ? data.reviews.map(review => <DealerReviewCard key={review.id} review={review} />) : <p>{t.noReviews}</p>}
      <div className="flex gap-4">
        <button className="rounded-full border px-4 py-2 disabled:opacity-40" aria-label={locale === 'cs' ? 'Předchozí stránka' : locale === 'de' ? 'Vorherige Seite' : 'Previous page'} disabled={!page} onClick={() => setPage(page - 1)}>←</button>
        <span>{page + 1}</span>
        <button className="rounded-full border px-4 py-2 disabled:opacity-40" aria-label={t.more} disabled={(page + 1) * 20 >= profile.totalReviews} onClick={() => setPage(page + 1)}>→</button>
      </div>
    </section>
  </main>;
}
