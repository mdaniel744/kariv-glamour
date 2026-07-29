import PublicPageClient from '@/components/next-pages/PublicPageClient';
import { publicPageMetadata } from '@/lib/publicPageMetadata';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return publicPageMetadata(locale, 'buyerProtection', 'buyer-protection');
}

export default function BuyerProtectionPage() {
  return <PublicPageClient pageKey="buyerProtection" />;
}
