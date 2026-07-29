import PublicPageClient from '@/components/next-pages/PublicPageClient';
import { publicPageMetadata } from '@/lib/publicPageMetadata';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return publicPageMetadata(locale, 'customerService', 'customer-service');
}

export default function CustomerServicePage() {
  return <PublicPageClient pageKey="customerService" />;
}
