import '@/index.css';
import { notFound } from 'next/navigation';
import { ClerkProvider } from '@clerk/nextjs';
import SiteChrome from '@/components/layout/SiteChrome';
import Providers from '../providers';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const SUPPORTED_LOCALES = ['de', 'en'];
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
    <html lang={locale} className={poppins.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitializationScript }} />
      </head>
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
