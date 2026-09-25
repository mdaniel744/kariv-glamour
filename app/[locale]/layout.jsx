import '@/index.css';
import { notFound } from 'next/navigation';
import { ClerkProvider } from '@clerk/nextjs';
import SiteChrome from '@/components/layout/SiteChrome';
import Providers from '../providers';
import { Poppins } from 'next/font/google';
import { getSiteUrl } from '@/lib/seo';
import { SUPPORTED_LOCALES } from '@/lib/locales';
import { getCzkExchangeRates } from '@/lib/exchangeRatesServer';

const poppins = Poppins({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-poppins',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const SITE_NAME = 'Kariv Glamour';
const SITE_DESCRIPTION = 'Authenticated luxury watches from Kariv Glamour.';
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
const metaPixelHeadScript = `
  (() => {
    try {
      if (localStorage.getItem('kariv-meta-marketing-consent-v1') !== 'accepted') return;
    } catch { return; }
    if (/^\\/(?:de|en|cs)\\/(?:admin|dealer|portal|login|register|forgot-password|reset-password)(?:\\/|$)/.test(location.pathname)) return;

    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window,document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '1084417767682071');
    fbq('track', 'PageView');
    window.__karivMetaPixelInitialized = true;
    window.__karivMetaPixelTrackedPath = location.pathname;
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
        url: '/logos/kariv-emblem-light.png',
        type: 'image/png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/logos/kariv-emblem-dark.png',
        type: 'image/png',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    apple: '/logos/kariv-emblem-light.png',
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
        <script id="meta-pixel" dangerouslySetInnerHTML={{ __html: metaPixelHeadScript }} />
      </head>
      <body data-next-native="true">
        <ClerkProvider>
          <Providers initialLocale={locale} initialExchangeRates={initialExchangeRates}>
            <SiteChrome>{children}</SiteChrome>
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
