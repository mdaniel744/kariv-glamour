import { redirect } from 'next/navigation';
import { SUPPORTED_LOCALES } from '@/lib/seo';

export default async function LegacyWatchGuideAlias({ params }) {
  const { locale, slug } = await params;
  const resolvedLocale = SUPPORTED_LOCALES.includes(locale) ? locale : 'en';
  const aliases = {
    'box-and-papers': 'what-box-and-papers-mean-for-luxury-watches',
    'buying-pre-owned-luxury-watch-safely': 'how-to-safely-buy-a-pre-owned-luxury-watch',
    'pre-owned-watches-investment': 'are-pre-owned-luxury-watches-a-good-investment',
  };
  const destination = aliases[slug];
  redirect(`/${resolvedLocale}${destination ? `/guides/${destination}` : '/guides'}`);
}
