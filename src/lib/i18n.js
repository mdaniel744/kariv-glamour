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

export const i18nConfig = {
  resources: {
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
  lng: 'de',
  fallbackLng: 'de',
  defaultNS: 'common',
  ns: ['common', 'navigation', 'products', 'filters', 'admin', 'brandComponents'],
  interpolation: {
    escapeValue: false,
  },
  initImmediate: false,
};

i18n.use(initReactI18next).init(i18nConfig);

export function createI18nInstance(locale = 'de') {
  const instance = createInstance();
  instance.use(initReactI18next).init({
    ...i18nConfig,
    lng: locale,
  });
  return instance;
}

export default i18n;
