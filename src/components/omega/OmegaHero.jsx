import React from 'react';
import { useLanguage } from '@/lib/languageContext';
import { useTranslation } from 'react-i18next';
import BrandHero from '@/components/shared/BrandHero';

const BRAND = 'Omega';

export default function OmegaHero() {
  const { t } = useTranslation('brandComponents');
  const { locale } = useLanguage();
  const links = [
    { label: t('hero.anchorCollections'), href: '#omega-collections' },
    { label: t('hero.anchorNewArrivals'), href: '#omega-products' },
    { label: 'Speedmaster', to: '/omega-speedmaster-kaufen' },
    { label: 'Seamaster', to: '/omega-seamaster-kaufen' },
    { label: t('hero.anchorPreOwned', { brand: BRAND }), to: '/omega-gebraucht-kaufen' },
    { label: t('hero.anchorBuyingGuide', { brand: BRAND }), to: '/welche-omega-kaufen' },
  ];

  return <BrandHero brand={BRAND} image="/brand-assets/omega/collections/omega-speedmaster-collection.png" imageAlt={locale === 'cs' ? "Hodinky Omega Speedmaster" : "Omega Speedmaster watch"} shopTo="/omega-uhr-kaufen" collectionsHref="#omega-collections" links={links} />;
}
