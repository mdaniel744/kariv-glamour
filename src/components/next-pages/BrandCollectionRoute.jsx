import { notFound } from 'next/navigation';
import BrandCollectionPageClient from '@/components/next-pages/BrandCollectionPageClient';
import SeoLandingRouteClient from '@/components/next-pages/SeoLandingRouteClient';
import { getBrandCollection } from '@/lib/brandCollectionRegistry';
import { getSeoLandingRouteForBrandPath } from '@/lib/brandSeoRegistry';
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
  if (!route) {
    const seoRoute = getSeoLandingRouteForBrandPath(routeKey, slug);
    if (!seoRoute) return {};

    return localizedMetadata({
      locale,
      path: `${seoRoute.brandSlug}/${slug}`,
      title: localizedField(seoRoute.pageData, 'title', locale),
      description: localizedField(seoRoute.pageData, 'description', locale),
      image: seoRoute.pageData.image,
    });
  }

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
  if (!route) {
    const seoRoute = getSeoLandingRouteForBrandPath(routeKey, slug);
    if (!seoRoute) notFound();

    const siteUrl = getSiteUrl();
    const url = `${siteUrl}/${locale}/${seoRoute.brandSlug}/${slug}`;
    const title = localizedField(seoRoute.pageData, 'title', locale);
    const description = localizedField(seoRoute.pageData, 'description', locale);
    const jsonLd = [
      {
        '@context': 'https://schema.org',
        '@type': seoRoute.pageData.isGuide ? 'Article' : 'CollectionPage',
        headline: title,
        name: title,
        description,
        url,
        inLanguage: locale,
        about: { '@type': 'Brand', name: seoRoute.brandName },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: locale === 'de' ? 'Startseite' : 'Home', item: `${siteUrl}/${locale}` },
          { '@type': 'ListItem', position: 2, name: locale === 'de' ? 'Marken' : 'Brands', item: `${siteUrl}/${locale}/brands` },
          { '@type': 'ListItem', position: 3, name: seoRoute.brandName, item: `${siteUrl}/${locale}/brands/${seoRoute.brandSlug}` },
          { '@type': 'ListItem', position: 4, name: title, item: url },
        ],
      },
    ];

    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }} />
        <SeoLandingRouteClient pageKey={seoRoute.pageKey} slug={seoRoute.slug} />
      </>
    );
  }

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
