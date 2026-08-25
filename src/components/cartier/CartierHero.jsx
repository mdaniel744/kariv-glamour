import React from 'react';
import { useTranslation } from 'react-i18next';
import BrandHero from '@/components/shared/BrandHero';

const BRAND = 'Cartier';

export default function CartierHero() {
  const { t } = useTranslation('brandComponents');
  const links = [
    { label: t('hero.anchorCollections'), href: '#collections' },
    { label: 'Tank', to: '/cartier-tank-kaufen' },
    { label: 'Santos', to: '/cartier-santos-kaufen' },
    { label: 'Panthère', to: '/cartier-panthere-kaufen' },
    { label: t('hero.anchorPreOwned', { brand: BRAND }), to: '/cartier-gebraucht-kaufen' },
  ];

  return <BrandHero brand={BRAND} image="/brand-assets/cartier/collections/cartier-santos-de-cartier.png" imageAlt="Cartier Santos watch" shopTo="/cartier-uhr-kaufen" links={links} />;
}
