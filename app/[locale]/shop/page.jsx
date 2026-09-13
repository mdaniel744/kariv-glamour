import { notFound } from 'next/navigation';
import ShopPageClient from '@/components/next-pages/ShopPageClient';
import enCommon from '@/locales/en/common.json';
import deCommon from '@/locales/de/common.json';
import csCommon from '@/locales/cs/common.json';
import { localizedMetadata, SUPPORTED_LOCALES } from '@/lib/seo';

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
  const seo = dictionary.seo?.shop || {};

  return localizedMetadata({ locale, path: 'shop', title: seo.title, description: seo.description });
}

export default async function LocaleShopPage({ params }) {
  const { locale } = await params;

  if (!SUPPORTED_LOCALES.includes(locale)) {
    notFound();
  }

  return <ShopPageClient />;
}
