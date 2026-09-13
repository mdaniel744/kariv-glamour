import React from 'react';
import { useLanguage } from '@/lib/languageContext';
import BrandHero from '@/components/shared/BrandHero';

const BRAND = 'Panerai';

export default function PaneraiHero() {
  const { locale } = useLanguage();
  const links = [
    { label: 'Luminor', to: '/panerai/luminor' },
    { label: 'Luminor Marina', to: '/panerai/luminor-marina' },
    { label: 'Radiomir', to: '/panerai/radiomir' },
    { label: 'Submersible', to: '/panerai/submersible' },
    { label: 'Luminor Due', to: '/panerai/luminor-due' },
  ];

  return <BrandHero brand={BRAND} image="/brand-assets/panerai/collections/panerai-luminor-collection.png" imageAlt={locale === 'cs' ? "Hodinky Panerai Luminor" : "Panerai Luminor watch"} shopTo="/panerai-uhr" links={links} />;
}
