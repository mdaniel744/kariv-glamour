import React, { createContext, useContext, useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { createI18nInstance } from '@/lib/i18n';

const LanguageContext = createContext();

const SUPPORTED_LOCALES = ['de', 'en'];
const DEFAULT_LOCALE = 'de';

export function detectLocaleFromPath(pathname) {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && SUPPORTED_LOCALES.includes(segments[0])) {
    return segments[0];
  }
  return null;
}

function detectBrowserLocale() {
  if (typeof navigator === 'undefined') return DEFAULT_LOCALE;
  const browserLang = navigator.language || navigator.userLanguage || 'de';
  return browserLang.toLowerCase().startsWith('en') ? 'en' : 'de';
}

function resolveInitialLocale(initialLocale) {
  if (SUPPORTED_LOCALES.includes(initialLocale)) return initialLocale;
  const fromPath = typeof window !== 'undefined' ? detectLocaleFromPath(window.location.pathname) : null;
  if (fromPath) return fromPath;
  return (typeof localStorage !== 'undefined' && localStorage.getItem('kariv-locale')) || detectBrowserLocale();
}

export function LanguageProvider({ children, initialLocale }) {
  const [locale, setLocaleState] = useState(() => {
    const resolvedLocale = resolveInitialLocale(initialLocale);
    if (typeof localStorage !== 'undefined') localStorage.setItem('kariv-locale', resolvedLocale);
    return resolvedLocale;
  });
  const [i18nInstance] = useState(() => createI18nInstance(resolveInitialLocale(initialLocale)));

  // Sync locale when URL changes (e.g. user navigates to /en/... directly)
  useEffect(() => {
    const syncFromLocation = () => {
      const fromPath = detectLocaleFromPath(window.location.pathname);
      if (fromPath) {
        setLocaleState(fromPath);
        localStorage.setItem('kariv-locale', fromPath);
      }
    };

    syncFromLocation();
    window.addEventListener('popstate', syncFromLocation);
    return () => window.removeEventListener('popstate', syncFromLocation);
  }, []);

  // Sync i18next language + <html lang="...">
  useEffect(() => {
    i18nInstance.changeLanguage(locale);
    document.documentElement.lang = locale;
  }, [i18nInstance, locale]);

  const setLocale = (newLocale) => {
    setLocaleState(newLocale);
    localStorage.setItem('kariv-locale', newLocale);
    // Rewrite the URL to include the new locale prefix
    const currentPath = window.location.pathname;
    const segments = currentPath.split('/').filter(Boolean);
    if (SUPPORTED_LOCALES.includes(segments[0])) {
      segments[0] = newLocale;
    } else {
      segments.unshift(newLocale);
    }
    const newPath = '/' + segments.join('/');
    window.location.href = newPath + window.location.search + window.location.hash;
  };

  const localePath = (path) => {
    if (!path || path.startsWith('http') || path.startsWith('#')) return path;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `/${locale}${cleanPath}`;
  };

  return (
    <I18nextProvider i18n={i18nInstance}>
      <LanguageContext.Provider value={{ locale, setLocale, localePath, supportedLocales: SUPPORTED_LOCALES }}>
        {children}
      </LanguageContext.Provider>
    </I18nextProvider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      locale: DEFAULT_LOCALE,
      setLocale: () => {},
      localePath: (p) => `/de${p.startsWith('/') ? p : '/' + p}`,
      supportedLocales: SUPPORTED_LOCALES,
    };
  }
  return context;
}
