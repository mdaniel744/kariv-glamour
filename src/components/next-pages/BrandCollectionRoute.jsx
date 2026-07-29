import { notFound } from 'next/navigation';
import BrandCollectionPageClient from '@/components/next-pages/BrandCollectionPageClient';
import { getBrandCollection } from '@/lib/brandCollectionRegistry';
import {
  getSiteUrl,
  localizedField,
  localizedMetadata,
  safeJsonLd,
  SUPPORTED_LOCALES,
} from '@/lib/seo';

export async function buildBrandCollectionMetadata({ params }, routeKey) {
  const { locale, slug } = await params;
  const route = getBrandCollection(routeKey, slug);
  if (!route) return {};

  const name = route.collection.name;
  const description = localizedField(route.collection, 'description', locale);
  const title = locale === 'de'
    ? `${route.brandName} ${name} kaufen`
    : `Buy ${route.brandName} ${name} Watches`;

  return localizedMetadata({
    locale,
    path: `${route.pathPrefix}/${slug}`,
    title,
    description,
    image: route.collection.image,
  });
}

export default async function BrandCollectionRoute({ params, routeKey }) {
  const { locale, slug } = await params;
  if (!SUPPORTED_LOCALES.includes(locale)) notFound();

  const route = getBrandCollection(routeKey, slug);
  if (!route) notFound();

  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/${locale}/${route.pathPrefix}/${slug}`;
  const name = `${route.brandName} ${route.collection.name}`;
  const description = localizedField(route.collection, 'description', locale);
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name,
      description,
      url,
      inLanguage: locale,
      about: { '@type': 'Brand', name: route.brandName },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: locale === 'de' ? 'Startseite' : 'Home', item: `${siteUrl}/${locale}` },
        { '@type': 'ListItem', position: 2, name: route.brandName, item: `${siteUrl}/${locale}/brands/${route.brandSlug}` },
        { '@type': 'ListItem', position: 3, name, item: url },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }} />
      <BrandCollectionPageClient pageKey={route.pageKey} slug={slug} />
    </>
  );
}
