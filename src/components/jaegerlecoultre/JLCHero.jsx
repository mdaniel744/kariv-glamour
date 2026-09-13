import React from 'react';
import { useLanguage } from '@/lib/languageContext';
import BrandHero from '@/components/shared/BrandHero';

const BRAND = 'Jaeger-LeCoultre';

export default function JLCHero() {
  const { locale } = useLanguage();
  const links = [
    { label: 'Reverso', to: '/jaeger-lecoultre/reverso' },
    { label: 'Master Ultra Thin', to: '/jaeger-lecoultre/master-ultra-thin' },
    { label: 'Master Control', to: '/jaeger-lecoultre/master-control' },
    { label: 'Polaris', to: '/jaeger-lecoultre/polaris' },
    { label: 'Rendez-Vous', to: '/jaeger-lecoultre/rendez-vous' },
  ];

  return <BrandHero brand={BRAND} displayBrand="JLC" image="/brand-assets/jaeger-lecoultre/collections/jaeger-lecoultre-reverso-collection.png" imageAlt={locale === 'cs' ? "Hodinky Jaeger-LeCoultre Reverso" : "Jaeger-LeCoultre Reverso watch"} shopTo="/jaeger-lecoultre-uhr" links={links} />;
}
