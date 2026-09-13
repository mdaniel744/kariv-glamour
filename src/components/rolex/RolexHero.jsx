import React from 'react';
import { useLanguage } from '@/lib/languageContext';
import { useTranslation } from 'react-i18next';
import BrandHero from '@/components/shared/BrandHero';

const BRAND = 'Rolex';

export default function RolexHero() {
  const { t } = useTranslation('brandComponents');
  const { locale } = useLanguage();
  const links = [
    { label: t('hero.anchorCollections'), href: '#rolex-collections' },
    { label: t('hero.anchorNewArrivals'), href: '#rolex-products' },
    { label: t('hero.anchorPreOwned', { brand: BRAND }), to: '/rolex-gebraucht-kaufen' },
    { label: t('hero.anchorBuyingGuide', { brand: BRAND }), to: '/welche-rolex-kaufen' },
    { label: t('hero.anchorMaintenance'), href: '#rolex-maintenance' },
  ];

  return <BrandHero brand={BRAND} image="/brand-assets/rolex/collections/rolex-submariner.png" imageAlt={locale === 'cs' ? "Hodinky Rolex Submariner" : "Rolex Submariner watch"} shopTo="/rolex-uhr-kaufen" collectionsHref="#rolex-collections" links={links} />;
}
