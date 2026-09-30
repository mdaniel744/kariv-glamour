import { permanentRedirect, notFound } from 'next/navigation';
import { getPublishedGuide } from '@/lib/publishedGuides';
import { getEditorialGuide } from '@/lib/editorialGuides';
import { SUPPORTED_LOCALES } from '@/lib/seo';

export default async function LegacyWatchGuideAlias({ params }) {
  const { locale, slug } = await params;
  if (!SUPPORTED_LOCALES.includes(locale)) notFound();
  const aliases = {
    'box-and-papers': 'what-box-and-papers-mean-for-luxury-watches',
    'buying-pre-owned-luxury-watch-safely': 'how-to-safely-buy-a-pre-owned-luxury-watch',
    'pre-owned-watches-investment': 'are-pre-owned-luxury-watches-a-good-investment',
    // Older brand pages linked to unpublished guide slugs. Send those readers
    // to the relevant section of the published buying guide, not a 404.
    'mechanical-vs-quartz-watches': 'how-to-safely-buy-a-pre-owned-luxury-watch#identify-watch',
    'watch-case-materials': 'how-to-safely-buy-a-pre-owned-luxury-watch#identify-watch',
    'watch-reference-number-guide': 'how-to-safely-buy-a-pre-owned-luxury-watch#identify-watch',
    'watch-bracelet-guide': 'how-to-safely-buy-a-pre-owned-luxury-watch#condition-service',
    'service-history': 'how-to-safely-buy-a-pre-owned-luxury-watch#condition-service',
    'watch-water-resistance': 'how-to-safely-buy-a-pre-owned-luxury-watch#condition-service',
    'dive-watch-care': 'how-to-safely-buy-a-pre-owned-luxury-watch#condition-service',
  };
  const destination = aliases[slug] || (getEditorialGuide(slug) ? slug : (await getPublishedGuide(slug))?.slug);
  if (!destination) notFound();
  permanentRedirect(`/${locale}/guides/${destination}`);
}
