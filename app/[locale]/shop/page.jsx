import { notFound } from 'next/navigation';
import ShopPageClient from '@/components/next-pages/ShopPageClient';
import enCommon from '@/locales/en/common.json';
import deCommon from '@/locales/de/common.json';
import csCommon from '@/locales/cs/common.json';
import { localizedMetadata, SUPPORTED_LOCALES } from '@/lib/seo';
import { searchShopProductsAction } from '@/actions/shopSearch';
import { SHOP_PAGE_SIZE } from '@/lib/shopSearch';
import { shopCardProduct } from '@/lib/shopCardProduct';

export const dynamic = 'force-dynamic';

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

export default async function LocaleShopPage({ params, searchParams }) {
  const { locale } = await params;

  if (!SUPPORTED_LOCALES.includes(locale)) {
    notFound();
  }

  // The canonical shop page needs crawlable product links in its initial HTML.
  // Filtered URLs continue to load their own results in the client as before.
  const query = await searchParams;
  let initialResults = null;
  if (!query || Object.keys(query).length === 0) {
    try {
      const results = await searchShopProductsAction({
        locale,
        sort: 'newest',
        page: 1,
        pageSize: SHOP_PAGE_SIZE,
      });
      initialResults = {
        ...results,
        items: results.items.map(shopCardProduct),
      };
    } catch (error) {
      // Keep the shop usable when catalogue reads fail; the client can retry.
      console.error('Unable to render initial shop products:', error);
    }
  }

  return <ShopPageClient initialResults={initialResults} />;
}
