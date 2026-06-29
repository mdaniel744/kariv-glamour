import React from 'react';
import { Navigate, useParams, useLocation } from 'react-router-dom';
import SiteLayout from '@/components/layout/SiteLayout';

const VALID_LOCALES = ['de', 'en'];

function detectLocale() {
  if (typeof navigator === 'undefined') return 'de';
  const browserLang = navigator.language || navigator.userLanguage || 'de';
  return browserLang.toLowerCase().startsWith('en') ? 'en' : 'de';
}

/**
 * Wraps SiteLayout with locale validation.
 * If the :locale param is not 'de' or 'en' (e.g. /shop matched :locale='shop'),
 * redirect to the same path with a valid locale prefix.
 */
export default function LocaleGuard() {
  const { locale } = useParams();
  const { pathname, search, hash } = useLocation();

  if (!VALID_LOCALES.includes(locale)) {
    const savedLocale = localStorage.getItem('kariv-locale') || detectLocale();
    const segments = pathname.split('/').filter(Boolean);
    segments[0] = savedLocale;
    const newPath = '/' + segments.join('/');
    return <Navigate to={`${newPath}${search}${hash}`} replace />;
  }

  return <SiteLayout />;
}