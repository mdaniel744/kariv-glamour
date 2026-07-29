import PublicPageClient from '@/components/next-pages/PublicPageClient';
import { publicPageMetadata } from '@/lib/publicPageMetadata';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return publicPageMetadata(locale, 'cart', 'cart', false);
}

export default function CartPage() {
  return <PublicPageClient pageKey="cart" />;
}
