import { notFound } from 'next/navigation';
import DealerProfilePageClient from '@/components/next-pages/DealerProfilePageClient';
import { getDealerPageData } from '@/lib/base44Server';
import {
  getSiteUrl,
  localizedMetadata,
  safeJsonLd,
  SUPPORTED_LOCALES,
} from '@/lib/seo';

export const revalidate = 900;

export async function generateMetadata({ params }) {
  const { locale, id } = await params;
  const data = await getDealerPageData(id);
  const displayName = data.profile?.displayName || data.listings[0]?.dealerName;

  if (!displayName) {
    return localizedMetadata({
      locale,
      path: `dealer-profile/${id}`,
      title: locale === 'cs' ? 'Profil prodejce' : locale === 'de' ? 'Händlerprofil' : 'Dealer profile',
      description: '',
      index: false,
    });
  }

  const description = data.profile?.bio ||
    (locale === 'cs' ? `Profil prodejce ${displayName} na Kariv Glamour.` : locale === 'de'
      ? `Verifiziertes Händlerprofil von ${displayName} bei Kariv Glamour.`
      : `Verified dealer profile for ${displayName} at Kariv Glamour.`);

  return localizedMetadata({
    locale,
    path: `dealer-profile/${id}`,
    title: displayName,
    description,
    image: data.profile?.bannerImage || data.profile?.logoImage,
  });
}

export default async function DealerProfileRoute({ params }) {
  const { locale, id } = await params;
  if (!SUPPORTED_LOCALES.includes(locale)) notFound();

  const data = await getDealerPageData(id);
  if (!data.profile && data.listings.length === 0) notFound();

  const displayName = data.profile?.displayName || data.listings[0]?.dealerName || 'Dealer';
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/${locale}/dealer-profile/${id}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: displayName,
    description: data.profile?.bio || undefined,
    image: data.profile?.logoImage || undefined,
    url,
    address: data.profile?.location || undefined,
    aggregateRating: data.profile?.averageRating > 0
      ? {
          '@type': 'AggregateRating',
          ratingValue: data.profile.averageRating,
          reviewCount: data.profile.totalReviews || data.reviews.length,
        }
      : undefined,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }} />
      <DealerProfilePageClient
        dealerId={id}
        profile={data.profile}
        listings={data.listings}
        reviews={data.reviews}
      />
    </>
  );
}
