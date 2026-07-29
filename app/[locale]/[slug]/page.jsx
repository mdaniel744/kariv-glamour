import { notFound } from 'next/navigation';
import SeoLandingRouteClient from '@/components/next-pages/SeoLandingRouteClient';
import { getSeoLandingRoute } from '@/lib/brandSeoRegistry';
import {
  getSiteUrl,
  localizedField,
  localizedMetadata,
  safeJsonLd,
  SUPPORTED_LOCALES,
} from '@/lib/seo';

export const revalidate = 900;

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const route = getSeoLandingRoute(slug);

  if (!route) {
    return localizedMetadata({
      locale,
      path: slug,
      title: locale === 'de' ? 'Seite nicht gefunden' : 'Page not found',
      description: '',
      index: false,
    });
  }

  return localizedMetadata({
    locale,
    path: slug,
    title: localizedField(route.pageData, 'title', locale),
    description: localizedField(route.pageData, 'description', locale),
    image: route.pageData.image,
  });
}

export default async function SeoLandingPage({ params }) {
  const { locale, slug } = await params;
  if (!SUPPORTED_LOCALES.includes(locale)) notFound();

  const route = getSeoLandingRoute(slug);
  if (!route) notFound();

  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/${locale}/${slug}`;
  const title = localizedField(route.pageData, 'title', locale);
  const description = localizedField(route.pageData, 'description', locale);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': route.pageData.isGuide ? 'Article' : 'CollectionPage',
      headline: title,
      name: title,
      description,
      url,
      inLanguage: locale,
      about: {
        '@type': 'Brand',
        name: route.brandName,
      },
      isPartOf: {
        '@type': 'WebSite',
        name: 'Kariv Glamour',
        url: siteUrl,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: locale === 'de' ? 'Startseite' : 'Home', item: `${siteUrl}/${locale}` },
        { '@type': 'ListItem', position: 2, name: locale === 'de' ? 'Marken' : 'Brands', item: `${siteUrl}/${locale}/brands` },
        { '@type': 'ListItem', position: 3, name: route.brandName, item: `${siteUrl}/${locale}/brands/${route.brandSlug}` },
        { '@type': 'ListItem', position: 4, name: title, item: url },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
      <SeoLandingRouteClient pageKey={route.pageKey} slug={slug} />
    </>
  );
}
