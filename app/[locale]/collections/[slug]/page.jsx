import { notFound, permanentRedirect } from 'next/navigation';
import { SUPPORTED_LOCALES } from '@/lib/seo';
import { legacyCollectionDestination } from '@/lib/legacyCollectionSearch';

export default async function LegacyCollectionAlias({ params }) {
  const { locale, slug } = await params;
  if (!SUPPORTED_LOCALES.includes(locale)) notFound();
  const destination = legacyCollectionDestination(locale, slug);
  if (!destination) notFound();
  permanentRedirect(destination);
}
