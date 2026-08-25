import React from 'react';
import BrandHero from '@/components/shared/BrandHero';

const BRAND = 'TAG Heuer';

export default function TAGHeuerHero() {
  const links = [
    { label: 'Carrera', to: '/tag-heuer/carrera' },
    { label: 'Formula 1', to: '/tag-heuer/formula-1' },
    { label: 'Aquaracer', to: '/tag-heuer/aquaracer' },
    { label: 'Monaco', to: '/tag-heuer/monaco' },
    { label: 'Connected', to: '/tag-heuer/connected' },
    { label: 'Link', to: '/tag-heuer/link' },
  ];

  return <BrandHero brand={BRAND} image="/brand-assets/tag-heuer/collections/tag-heuer-carrera-collection.png" imageAlt="TAG Heuer Carrera watch" shopTo="/tag-heuer-uhr" links={links} />;
}
