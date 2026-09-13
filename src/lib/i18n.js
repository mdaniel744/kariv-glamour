import i18n, { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';

import enCommon from '@/locales/en/common.json';
import deCommon from '@/locales/de/common.json';
import enNavigation from '@/locales/en/navigation.json';
import deNavigation from '@/locales/de/navigation.json';
import enProducts from '@/locales/en/products.json';
import deProducts from '@/locales/de/products.json';
import enFilters from '@/locales/en/filters.json';
import deFilters from '@/locales/de/filters.json';
import enAdmin from '@/locales/en/admin.json';
import deAdmin from '@/locales/de/admin.json';
import enBrandComponents from '@/locales/en/brandComponents.json';
import deBrandComponents from '@/locales/de/brandComponents.json';
import csCommon from '@/locales/cs/common.json';
import csNavigation from '@/locales/cs/navigation.json';
import csProducts from '@/locales/cs/products.json';
import csFilters from '@/locales/cs/filters.json';
import csAdmin from '@/locales/cs/admin.json';
import csBrandComponents from '@/locales/cs/brandComponents.json';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, normalizeLocale } from '@/lib/locales';

export const i18nConfig = {
  resources: {
    cs: {
      common: csCommon,
      navigation: csNavigation,
      products: csProducts,
      filters: csFilters,
      admin: csAdmin,
      brandComponents: csBrandComponents,
    },
    en: {
      common: enCommon,
      navigation: enNavigation,
      products: enProducts,
      filters: enFilters,
      admin: enAdmin,
      brandComponents: enBrandComponents,
    },
    de: {
      common: deCommon,
      navigation: deNavigation,
      products: deProducts,
      filters: deFilters,
      admin: deAdmin,
      brandComponents: deBrandComponents,
    },
  },
  lng: DEFAULT_LOCALE,
  fallbackLng: { cs: ['en'], default: ['de'] },
  supportedLngs: SUPPORTED_LOCALES,
  defaultNS: 'common',
  ns: ['common', 'navigation', 'products', 'filters', 'admin', 'brandComponents'],
  interpolation: {
    escapeValue: false,
  },
  initImmediate: false,
};

i18n.use(initReactI18next).init(i18nConfig);

export function createI18nInstance(locale = DEFAULT_LOCALE) {
  const instance = createInstance();
  instance.use(initReactI18next).init({
    ...i18nConfig,
    lng: normalizeLocale(locale),
  });
  return instance;
}

export default i18n;
