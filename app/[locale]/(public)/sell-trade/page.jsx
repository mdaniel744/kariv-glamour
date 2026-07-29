import PublicPageClient from '@/components/next-pages/PublicPageClient';
import { publicPageMetadata } from '@/lib/publicPageMetadata';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return publicPageMetadata(locale, 'sellTrade', 'sell-trade');
}

export default function SellTradePage() {
  return <PublicPageClient pageKey="sellTrade" />;
}
