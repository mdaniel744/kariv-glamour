import i18n from 'i18next';
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

i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: enCommon,
      navigation: enNavigation,
      products: enProducts,
      filters: enFilters,
      admin: enAdmin,
    },
    de: {
      common: deCommon,
      navigation: deNavigation,
      products: deProducts,
      filters: deFilters,
      admin: deAdmin,
    },
  },
  lng: 'de',
  fallbackLng: 'de',
  defaultNS: 'common',
  ns: ['common', 'navigation', 'products', 'filters', 'admin'],
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;