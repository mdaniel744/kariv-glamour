import { redirect } from 'next/navigation';
import { SUPPORTED_LOCALES } from '@/lib/seo';

export default async function LegacyWatchGuideAlias({ params }) {
  const { locale } = await params;
  redirect(`/${SUPPORTED_LOCALES.includes(locale) ? locale : 'en'}/guides`);
}
