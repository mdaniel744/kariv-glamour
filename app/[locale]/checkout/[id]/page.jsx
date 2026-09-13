import { notFound } from 'next/navigation';
import CheckoutPageClient from '@/components/next-pages/CheckoutPageClient';
import ProtectedArea from '@/components/next-pages/ProtectedArea';
import { getProductById } from '@/lib/base44Server';
import { localizedField, localizedMetadata, SUPPORTED_LOCALES } from '@/lib/seo';
import { getCzkExchangeRates } from '@/lib/exchangeRatesServer';
import { CurrencyProvider } from '@/lib/currencyContext';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { locale, id } = await params;
  const product = await getProductById(id);
  const productName = localizedField(product, 'productTitle', locale);
  const title = locale === 'cs' ? `Objednávka — ${productName}` : locale === 'de' ? `Bestellung — ${productName}` : `Checkout — ${productName}`;

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
  const exchangeRates = locale === 'cs' ? await getCzkExchangeRates() : null;

  return (
    <ProtectedArea>
      <CurrencyProvider exchangeRates={exchangeRates}><CheckoutPageClient product={product} /></CurrencyProvider>
    </ProtectedArea>
  );
}
