import BrandsPageClient from '@/components/next-pages/BrandsPageClient';
import { getBrands } from '@/lib/base44Server';
import { localizedMetadata, SUPPORTED_LOCALES } from '@/lib/seo';
import enCommon from '@/locales/en/common.json';
import deCommon from '@/locales/de/common.json';

const DICTIONARIES = { de: deCommon, en: enCommon };

export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dictionary = DICTIONARIES[locale] || DICTIONARIES.de;
  const seo = dictionary.seo?.brands || {};

  return localizedMetadata({
    locale,
    path: 'brands',
    title: seo.title,
    description: seo.description,
  });
}

export default async function BrandsPage({ params }) {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale)) return null;
  const brands = await getBrands();
  return <BrandsPageClient brands={brands} />;
}
