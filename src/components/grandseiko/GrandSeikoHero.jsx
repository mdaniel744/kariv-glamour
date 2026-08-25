import React from 'react';
import BrandHero from '@/components/shared/BrandHero';
import { GS_HERO_IMAGE } from '@/lib/grandSeikoData';

const BRAND = 'Grand Seiko';

export default function GrandSeikoHero() {
  const links = [
    { label: 'Heritage', to: '/grand-seiko/heritage' },
    { label: 'Elegance', to: '/grand-seiko/elegance' },
    { label: 'Sport', to: '/grand-seiko/sport' },
    { label: 'Evolution 9', to: '/grand-seiko/evolution-9' },
    { label: 'Masterpiece', to: '/grand-seiko/masterpiece' },
  ];

  return <BrandHero brand={BRAND} image={GS_HERO_IMAGE} imageAlt="Grand Seiko Spring Drive watch" shopTo="/grand-seiko-uhr" links={links} />;
}
