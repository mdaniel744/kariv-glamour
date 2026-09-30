import { notFound } from 'next/navigation';
import LegalPageClient from '@/components/next-pages/LegalPageClient';
import { getLegalPageBySlug } from '@/lib/base44Server';
import { localizedField, localizedMetadata, SUPPORTED_LOCALES } from '@/lib/seo';
import { withCzechLegalFallback } from '@/lib/legalPageFallbacks';

export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const page = withCzechLegalFallback(await getLegalPageBySlug(slug));

  if (!page) {
    return localizedMetadata({
      locale,
      path: `legal/${slug}`,
      title: locale === 'cs' ? 'Právní informace' : locale === 'de' ? 'Rechtliche Hinweise' : 'Legal information',
      description: '',
      index: false,
    });
  }

  return localizedMetadata({
    locale,
    path: `legal/${slug}`,
    title: localizedField(page, 'seoTitle', locale) || localizedField(page, 'title', locale),
    description: localizedField(page, 'seoDescription', locale),
    type: 'article',
  });
}

export default async function LegalRoute({ params }) {
  const { locale, slug } = await params;
  if (!SUPPORTED_LOCALES.includes(locale)) notFound();

  const page = withCzechLegalFallback(await getLegalPageBySlug(slug));
  if (!page) notFound();

  return <LegalPageClient slug={slug} page={page} />;
}
