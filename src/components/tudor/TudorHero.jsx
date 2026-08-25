import React from 'react';
import BrandHero from '@/components/shared/BrandHero';

const BRAND = 'Tudor';

export default function TudorHero() {
  const links = [
    { label: 'Black Bay', to: '/tudor/black-bay' },
    { label: 'Pelagos', to: '/tudor/pelagos' },
    { label: 'Tudor Royal', to: '/tudor/tudor-royal' },
    { label: 'Ranger', to: '/tudor/ranger' },
    { label: '1926', to: '/tudor/1926' },
    { label: 'Clair de Rose', to: '/tudor/clair-de-rose' },
  ];

  return <BrandHero brand={BRAND} image="/brand-assets/tudor/collections/tudor-black-bay-collection.png" imageAlt="Tudor Black Bay watch" shopTo="/tudor-uhr" links={links} />;
}
