import React from 'react';
import { useTranslation } from 'react-i18next';
import BrandHero from '@/components/shared/BrandHero';
import { BREITLING_HERO_IMAGE } from '@/lib/breitlingData';

const BRAND = 'Breitling';

export default function BreitlingHero() {
  const { t } = useTranslation('brandComponents');
  const links = [
    { label: 'Navitimer', to: '/breitling/navitimer' },
    { label: 'Chronomat', to: '/breitling/chronomat' },
    { label: 'Superocean', to: '/breitling/superocean' },
    { label: 'Avenger', to: '/breitling/avenger' },
    { label: 'Premier', to: '/breitling/premier' },
    { label: t('hero.anchorPreOwned', { brand: BRAND }), to: '/breitling-uhr-gebraucht' },
  ];

  return <BrandHero brand={BRAND} image={BREITLING_HERO_IMAGE} imageAlt="Breitling Navitimer watch" shopTo="/breitling-uhr" links={links} />;
}
