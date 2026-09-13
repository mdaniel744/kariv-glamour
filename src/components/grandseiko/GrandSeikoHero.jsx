import React from 'react';
import { useLanguage } from '@/lib/languageContext';
import BrandHero from '@/components/shared/BrandHero';
import { GS_HERO_IMAGE } from '@/lib/grandSeikoData';

const BRAND = 'Grand Seiko';

export default function GrandSeikoHero() {
  const { locale } = useLanguage();
  const links = [
    { label: 'Heritage', to: '/grand-seiko/heritage' },
    { label: 'Elegance', to: '/grand-seiko/elegance' },
    { label: 'Sport', to: '/grand-seiko/sport' },
    { label: 'Evolution 9', to: '/grand-seiko/evolution-9' },
    { label: 'Masterpiece', to: '/grand-seiko/masterpiece' },
  ];

  return <BrandHero brand={BRAND} image={GS_HERO_IMAGE} imageAlt={locale === 'cs' ? "Hodinky Grand Seiko Spring Drive" : "Grand Seiko Spring Drive watch"} shopTo="/grand-seiko-uhr" links={links} />;
}
