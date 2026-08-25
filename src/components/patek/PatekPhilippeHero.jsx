import React from 'react';
import { useTranslation } from 'react-i18next';
import BrandHero from '@/components/shared/BrandHero';

const BRAND = 'Patek Philippe';

export default function PatekPhilippeHero() {
  const { t } = useTranslation('brandComponents');
  const links = [
    { label: t('hero.anchorCollections'), href: '#patek-collections' },
    { label: t('hero.anchorNewArrivals'), href: '#patek-products' },
    { label: t('hero.anchorPreOwned', { brand: BRAND }), to: '/patek-philippe-gebraucht-kaufen' },
    { label: t('hero.anchorBuyingGuide', { brand: BRAND }), to: '/welche-patek-philippe-kaufen' },
    { label: t('hero.anchorWatchmaking'), href: '#patek-watchmaking' },
  ];

  return <BrandHero brand={BRAND} image="/brand-assets/patek-philippe/collections/patek-philippe-nautilus-collection.png" imageAlt="Patek Philippe Nautilus watch" shopTo="/patek-philippe-uhr-kaufen" collectionsHref="#patek-collections" links={links} />;
}
