import { notFound } from 'next/navigation';
import HomePageClient from '@/components/next-pages/HomePageClient';
import enCommon from '@/locales/en/common.json';
import deCommon from '@/locales/de/common.json';
import { getSiteUrl, safeJsonLd } from '@/lib/seo';

const SUPPORTED_LOCALES = ['de', 'en'];
const DICTIONARIES = {
  de: deCommon,
  en: enCommon,
};

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dictionary = DICTIONARIES[locale] || DICTIONARIES.de;
  const seo = dictionary.seo?.home || {};

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        de: '/de',
        en: '/en',
        'x-default': '/de',
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      locale: locale === 'de' ? 'de_DE' : 'en_US',
      alternateLocale: locale === 'de' ? ['en_US'] : ['de_DE'],
      url: `/${locale}`,
    },
  };
}

export default async function LocaleHomePage({ params }) {
  const { locale } = await params;

  if (!SUPPORTED_LOCALES.includes(locale)) {
    notFound();
  }

  const siteUrl = getSiteUrl();
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'Kariv Glamour',
      url: siteUrl,
      description: DICTIONARIES[locale]?.seo?.home?.description,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Kariv Glamour',
      publisher: { '@id': `${siteUrl}/#organization` },
      inLanguage: locale === 'de' ? 'de-DE' : 'en-US',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteUrl}/${locale}/shop?search={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
      <HomePageClient />
    </>
  );
}
