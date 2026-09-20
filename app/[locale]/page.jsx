import { notFound } from 'next/navigation';
import HomePageClient from '@/components/next-pages/HomePageClient';
import { getHomeFeaturedSections } from '@/lib/base44Server';
import enCommon from '@/locales/en/common.json';
import deCommon from '@/locales/de/common.json';
import csCommon from '@/locales/cs/common.json';
import { getSiteUrl, safeJsonLd, localizedMetadata, SUPPORTED_LOCALES } from '@/lib/seo';
import { LOCALE_TAGS } from '@/lib/locales';

const DICTIONARIES = {
  de: deCommon,
  en: enCommon,
  cs: csCommon,
};

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dictionary = DICTIONARIES[locale] || DICTIONARIES.de;
  const seo = dictionary.seo?.home || {};

  return localizedMetadata({ locale, title: seo.title, description: seo.description });
}

export default async function LocaleHomePage({ params }) {
  const { locale } = await params;

  if (!SUPPORTED_LOCALES.includes(locale)) {
    notFound();
  }

  const featuredSections = await getHomeFeaturedSections(locale);
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
      inLanguage: LOCALE_TAGS[locale],
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
      <HomePageClient {...featuredSections} />
    </>
  );
}
