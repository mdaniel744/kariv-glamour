import PublicPageClient from '@/components/next-pages/PublicPageClient';
import { publicPageMetadata } from '@/lib/publicPageMetadata';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return publicPageMetadata(locale, 'about', 'about');
}

export default function AboutPage() {
  return <PublicPageClient pageKey="about" />;
}
