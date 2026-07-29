import { notFound } from 'next/navigation';
import CheckoutPageClient from '@/components/next-pages/CheckoutPageClient';
import ProtectedArea from '@/components/next-pages/ProtectedArea';
import { getProductById } from '@/lib/base44Server';
import { localizedField, localizedMetadata, SUPPORTED_LOCALES } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { locale, id } = await params;
  const product = await getProductById(id);
  const productName = localizedField(product, 'productTitle', locale);
  const title = locale === 'de' ? `Bestellung — ${productName}` : `Checkout — ${productName}`;

  return localizedMetadata({
    locale,
    path: `checkout/${id}`,
    title,
    description: '',
    index: false,
  });
}

export default async function CheckoutRoute({ params }) {
  const { locale, id } = await params;
  if (!SUPPORTED_LOCALES.includes(locale)) notFound();

  const product = await getProductById(id);
  if (!product) notFound();

  return (
    <ProtectedArea>
      <CheckoutPageClient product={product} />
    </ProtectedArea>
  );
}
