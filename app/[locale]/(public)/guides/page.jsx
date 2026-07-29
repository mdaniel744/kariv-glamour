import PublicPageClient from '@/components/next-pages/PublicPageClient';
import { publicPageMetadata } from '@/lib/publicPageMetadata';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return publicPageMetadata(locale, 'guides', 'guides');
}

export default function GuidesPage() {
  return <PublicPageClient pageKey="guides" />;
}
