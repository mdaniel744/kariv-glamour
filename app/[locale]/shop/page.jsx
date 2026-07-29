import { notFound } from 'next/navigation';
import ShopPageClient from '@/components/next-pages/ShopPageClient';
import enCommon from '@/locales/en/common.json';
import deCommon from '@/locales/de/common.json';

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
  const seo = dictionary.seo?.shop || {};

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: `/${locale}/shop`,
      languages: {
        de: '/de/shop',
        en: '/en/shop',
        'x-default': '/de/shop',
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      locale: locale === 'de' ? 'de_DE' : 'en_US',
      alternateLocale: locale === 'de' ? ['en_US'] : ['de_DE'],
      url: `/${locale}/shop`,
    },
  };
}

export default async function LocaleShopPage({ params }) {
  const { locale } = await params;

  if (!SUPPORTED_LOCALES.includes(locale)) {
    notFound();
  }

  return <ShopPageClient />;
}
