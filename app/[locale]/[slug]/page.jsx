import { notFound, redirect } from 'next/navigation';
import SeoLandingRouteClient from '@/components/next-pages/SeoLandingRouteClient';
import { getSeoLandingRoute, SEO_LANDING_ROUTES } from '@/lib/brandSeoRegistry';
import BrandResearchArticle from '@/components/guides/BrandResearchArticle';
import RelatedProductLinks from '@/components/seo/RelatedProductLinks';
import { getSeoProductLinks } from '@/lib/seoProductLinks';
import { canonicalSeoSlug, getResearchArticle } from '@/lib/watchResearch/articles';
import { getGuideMedia } from '@/lib/watchResearch/media';
import {
  getSiteUrl,
  localizedField,
  localizedMetadata,
  safeJsonLd,
  SUPPORTED_LOCALES,
} from '@/lib/seo';

export const revalidate = 900;

const LEGACY_REDIRECTS = {
  'authentication-process': '/authentication',
  'certified-pre-owned': '/shop?isCertifiedPreOwned=true',
  'condition-grading': '/buyer-protection',
  contact: '/customer-service',
  'mens-watches': '/shop?gender=Men',
  'returns-and-refunds': '/customer-service',
  'shipping-policy': '/customer-service',
  'vintage-watches': '/shop?isVintage=true',
  'womens-watches': '/shop?gender=Women',
};

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const route = getSeoLandingRoute(slug);

  if (!route) {
    return localizedMetadata({
      locale,
      path: slug,
      title: locale === 'cs' ? 'Stránka nebyla nalezena' : locale === 'de' ? 'Seite nicht gefunden' : 'Page not found',
      description: '',
      index: false,
    });
  }

  const article = getResearchArticle(route, locale);
  return localizedMetadata({
    locale,
    path: canonicalSeoSlug(route, SEO_LANDING_ROUTES),
    title: article?.title || localizedField(route.pageData, 'title', locale),
    description: route.pageData.isGuide ? article?.excerpt : localizedField(route.pageData, 'description', locale),
    image: route.pageData.isGuide ? getGuideMedia(route, locale)?.hero.src : route.pageData.image,
    type: route.pageData.isGuide ? 'article' : 'website',
  });
}

export default async function SeoLandingPage({ params }) {
  const { locale, slug } = await params;
  if (!SUPPORTED_LOCALES.includes(locale)) notFound();

  const route = getSeoLandingRoute(slug);
  if (!route) {
    const redirectPath = LEGACY_REDIRECTS[slug];
    if (redirectPath) redirect(`/${locale}${redirectPath}`);
    notFound();
  }

  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/${locale}/${canonicalSeoSlug(route, SEO_LANDING_ROUTES)}`;
  const article = getResearchArticle(route, locale);
  const title = article?.title || localizedField(route.pageData, 'title', locale);
  const description = route.pageData.isGuide ? article?.excerpt : localizedField(route.pageData, 'description', locale);
  const productLinks = route.pageData.isGuide
    ? []
    : await getSeoProductLinks(route.brandName, route.pageData.filter, locale);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': route.pageData.isGuide ? 'Article' : 'CollectionPage',
      headline: title,
      name: title,
      description,
      url,
      inLanguage: locale,
      ...(route.pageData.isGuide ? {
        mainEntityOfPage: url,
        image: `${siteUrl}${getGuideMedia(route, locale).hero.src}`,
        dateModified: article.dateModified,
        author: { '@type': 'Organization', name: 'Kariv Glamour', url: siteUrl },
        publisher: { '@type': 'Organization', name: 'Kariv Glamour', url: siteUrl },
      } : {}),
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
        { '@type': 'ListItem', position: 1, name: locale === 'cs' ? 'Úvod' : locale === 'de' ? 'Startseite' : 'Home', item: `${siteUrl}/${locale}` },
        { '@type': 'ListItem', position: 2, name: route.pageData.isGuide ? (locale === 'cs' ? 'Průvodci hodinkami' : locale === 'de' ? 'Uhren-Guides' : 'Watch guides') : (locale === 'cs' ? 'Značky' : locale === 'de' ? 'Marken' : 'Brands'), item: `${siteUrl}/${locale}/${route.pageData.isGuide ? 'guides' : 'brands'}` },
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
      {!route.pageData.isGuide && <SeoLandingRouteClient pageKey={route.pageKey} slug={slug} />}
      <RelatedProductLinks locale={locale} products={productLinks} />
      <BrandResearchArticle route={route} locale={locale} compact={!route.pageData.isGuide} />
    </>
  );
}
