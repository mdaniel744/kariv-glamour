import '@/index.css';
import { notFound } from 'next/navigation';
import { ClerkProvider } from '@clerk/nextjs';
import SiteChrome from '@/components/layout/SiteChrome';
import Providers from '../providers';

const SUPPORTED_LOCALES = ['de', 'en'];
const SITE_NAME = 'Kariv Glamour';
const SITE_DESCRIPTION = 'Authenticated luxury watches from Kariv Glamour.';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3002'),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    siteName: SITE_NAME,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!SUPPORTED_LOCALES.includes(locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body data-next-native="true">
        <ClerkProvider>
          <Providers initialLocale={locale}>
            <SiteChrome>{children}</SiteChrome>
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
