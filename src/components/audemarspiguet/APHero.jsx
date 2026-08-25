import React from 'react';
import { useTranslation } from 'react-i18next';
import BrandHero from '@/components/shared/BrandHero';

const BRAND = 'Audemars Piguet';

export default function APHero() {
  const { t } = useTranslation('brandComponents');
  const links = [
    { label: 'Royal Oak', to: '/audemars-piguet/royal-oak' },
    { label: 'Royal Oak Offshore', to: '/audemars-piguet/royal-oak-offshore' },
    { label: 'Royal Oak Concept', to: '/audemars-piguet/royal-oak-concept' },
    { label: 'Code 11.59', to: '/audemars-piguet/code-1159' },
    { label: t('hero.anchorPreOwned', { brand: 'AP' }), to: '/audemars-piguet-gebraucht' },
  ];

  return <BrandHero brand={BRAND} displayBrand="AP" image="/brand-assets/audemars-piguet/collections/audemars-piguet-royal-oak-collection.png" imageAlt="Audemars Piguet Royal Oak watch" shopTo="/audemars-piguet-uhr" links={links} />;
}
