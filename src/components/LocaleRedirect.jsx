import { Navigate, useLocation } from 'react-router-dom';

const DEFAULT_LOCALE = 'de';

function detectBrowserLocale() {
  if (typeof navigator === 'undefined') return DEFAULT_LOCALE;
  const browserLang = navigator.language || navigator.userLanguage || 'de';
  return browserLang.toLowerCase().startsWith('en') ? 'en' : 'de';
}

/**
 * Catch-all component that redirects any non-locale-prefixed path
 * to the locale-prefixed version (e.g. /shop → /de/shop).
 * Admin routes are excluded — they are matched before this catch-all.
 */
export default function LocaleRedirect() {
  const { pathname, search, hash } = useLocation();

  const savedLocale = localStorage.getItem('kariv-locale');
  const locale = savedLocale || detectBrowserLocale();

  const suffix = pathname === '/' ? '' : pathname;
  const newPath = `/${locale}${suffix}${search}${hash}`;

  return <Navigate to={newPath} replace />;
}