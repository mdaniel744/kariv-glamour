import React from 'react';
import { useLanguage } from '@/lib/languageContext';
import { useTranslation } from 'react-i18next';
import BrandHero from '@/components/shared/BrandHero';

const BRAND = 'Girard-Perregaux';

export default function GirardPerregauxHero() {
  const { locale } = useLanguage();
  const { t } = useTranslation('brandComponents');
  const links = [
    { label: 'Laureato', to: '/girard-perregaux/laureato' },
    { label: '1966', to: '/girard-perregaux/1966' },
    { label: 'Vintage 1945', to: '/girard-perregaux/vintage-1945' },
    { label: 'Bridges', to: '/girard-perregaux/bridges' },
    { label: t('hero.anchorPreOwned', { brand: 'GP' }), to: '/girard-perregaux-gebraucht' },
  ];

  return <BrandHero brand={BRAND} displayBrand="GP" image="/brand-assets/girard-perregaux/collections/girard-perregaux-laureato-collection.png" imageAlt={locale === 'cs' ? "Hodinky Girard-Perregaux Laureato" : "Girard-Perregaux Laureato watch"} shopTo="/girard-perregaux-uhr" links={links} />;
}
