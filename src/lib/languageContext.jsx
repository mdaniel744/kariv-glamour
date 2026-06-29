import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import i18n from '@/lib/i18n';

const LanguageContext = createContext();

const SUPPORTED_LOCALES = ['de', 'en'];
const DEFAULT_LOCALE = 'de';

function detectLocaleFromPath(pathname) {
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

export function LanguageProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [locale, setLocaleState] = useState(() => {
    const fromPath = detectLocaleFromPath(location.pathname);
    if (fromPath) {
      localStorage.setItem('kariv-locale', fromPath);
      return fromPath;
    }
    return localStorage.getItem('kariv-locale') || detectBrowserLocale();
  });

  // Sync locale when URL changes (e.g. user navigates to /en/... directly)
  useEffect(() => {
    const fromPath = detectLocaleFromPath(location.pathname);
    if (fromPath && fromPath !== locale) {
      setLocaleState(fromPath);
      localStorage.setItem('kariv-locale', fromPath);
    }
  }, [location.pathname]);

  // Sync i18next language + <html lang="...">
  useEffect(() => {
    i18n.changeLanguage(locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (newLocale) => {
    setLocaleState(newLocale);
    localStorage.setItem('kariv-locale', newLocale);
    // Rewrite the URL to include the new locale prefix
    const currentPath = location.pathname;
    const segments = currentPath.split('/').filter(Boolean);
    if (SUPPORTED_LOCALES.includes(segments[0])) {
      segments[0] = newLocale;
    } else {
      segments.unshift(newLocale);
    }
    const newPath = '/' + segments.join('/');
    navigate(newPath + location.search + location.hash);
  };

  const localePath = (path) => {
    if (!path || path.startsWith('http') || path.startsWith('#')) return path;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `/${locale}${cleanPath}`;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, localePath, supportedLocales: SUPPORTED_LOCALES }}>
      {children}
    </LanguageContext.Provider>
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