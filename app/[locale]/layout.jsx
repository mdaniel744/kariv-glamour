import '@/index.css';
import { notFound } from 'next/navigation';
import { ClerkProvider } from '@clerk/nextjs';
import SiteChrome from '@/components/layout/SiteChrome';
import GoogleAdsConsent from '@/components/layout/GoogleAdsConsent';
import Providers from '../providers';
import { Poppins } from 'next/font/google';
import { getSiteUrl } from '@/lib/seo';
import { SUPPORTED_LOCALES } from '@/lib/locales';
import { getCzkExchangeRates } from '@/lib/exchangeRatesServer';
import { googleAdsBootstrap } from '@/lib/googleAdsTag';

const poppins = Poppins({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-poppins',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const SITE_NAME = 'Kariv Glamour';
const SITE_DESCRIPTION = 'Explore luxury watch listings from Kariv Glamour and independent sellers.';
const themeInitializationScript = `
  (() => {
    try {
      const savedPreference = localStorage.getItem('kariv-theme-preference');
      const preference = ['system', 'light', 'dark'].includes(savedPreference) ? savedPreference : 'system';
      const theme = preference === 'system'
        ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        : preference;
      document.documentElement.classList.toggle('dark', theme === 'dark');
      document.documentElement.style.colorScheme = theme;
    } catch (_) {}
  })();
`;

export const metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  icons: {
    icon: [
      {
        url: '/logos/kariv-emblem-light-icon.png',
        type: 'image/png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/logos/kariv-emblem-dark-icon.png',
        type: 'image/png',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    apple: '/logos/kariv-emblem-light-icon.png',
  },
  verification: {
    google: '4OzTksrDE0TTdalip4DhOPFHOiphvlyRu5-3QyOUf_c',
  },
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
  const initialExchangeRates = locale === 'cs' ? await getCzkExchangeRates() : null;

  return (
    <html lang={locale} className={poppins.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitializationScript }} />
        <script id="kariv-google-ads-tag" dangerouslySetInnerHTML={{ __html: googleAdsBootstrap() }} />
      </head>
      <body data-next-native="true">
        <ClerkProvider>
          <Providers initialLocale={locale} initialExchangeRates={initialExchangeRates}>
            <SiteChrome>{children}</SiteChrome>
            <GoogleAdsConsent />
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
