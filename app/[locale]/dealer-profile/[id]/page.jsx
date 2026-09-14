import { notFound } from 'next/navigation';
import DealerProfilePageClient from '@/components/next-pages/DealerProfilePageClient';
import { loadDealerPage } from '@/lib/marketplaceServer';
import { sellerOrganization, sellerDisplayName } from '@/lib/marketplace';
import { getSiteUrl, localizedMetadata, safeJsonLd, SUPPORTED_LOCALES } from '@/lib/seo';
export const dynamic = 'force-dynamic';
export async function generateMetadata({ params }) {
  const { locale, id } = await params;
  const { profile } = await loadDealerPage(id);
  return localizedMetadata({ locale, path: 'dealer-profile/' + id,
    title: profile ? sellerDisplayName(profile) : 'Dealer', description: profile?.['profile_description_' + locale] || '',
    image: profile?.logo_url, index: Boolean(profile) });
}
export default async function DealerProfileRoute({ params }) {
  const { locale, id } = await params;
  if (!SUPPORTED_LOCALES.includes(locale)) notFound();
  const data = await loadDealerPage(id);
  if (!data.profile) notFound();
  const organization = sellerOrganization(data.profile, getSiteUrl() + '/' + locale + '/dealer-profile/' + id);
  const jsonLd = { '@context': 'https://schema.org', ...organization };
  if (data.profile.seller_type === 'third_party' && !data.profile.is_demo && data.profile.totalReviews > 0) {
    jsonLd.aggregateRating = { '@type': 'AggregateRating', ratingValue: data.profile.averageRating, reviewCount: data.profile.totalReviews, bestRating: 5, worstRating: 1 };
    jsonLd.review = data.reviews.filter(r => r.status === 'approved').map(review => ({
      '@type': 'Review', author: { '@type': 'Person', name: review.buyerName },
      reviewBody: review.reviewText, name: review.title,
      reviewRating: { '@type': 'Rating', ratingValue: review.rating, bestRating: 5, worstRating: 1 },
    }));
  }
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }} />
    <DealerProfilePageClient dealerId={id} profile={data.profile} listings={data.listings} reviews={data.reviews} /></>;
}
