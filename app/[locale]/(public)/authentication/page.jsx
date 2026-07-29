import PublicPageClient from '@/components/next-pages/PublicPageClient';
import { publicPageMetadata } from '@/lib/publicPageMetadata';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return publicPageMetadata(locale, 'authentication', 'authentication');
}

export default function AuthenticationPage() {
  return <PublicPageClient pageKey="authentication" />;
}
