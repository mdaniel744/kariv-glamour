import React from 'react';
import BrandHero from '@/components/shared/BrandHero';
import { useLanguage } from '@/lib/languageContext';

const BRAND = 'Bvlgari';

export default function BvlgariHero() {
  const { locale } = useLanguage();
  const links = [
    { label: 'Serpenti', to: '/bvlgari/serpenti' },
    { label: 'Octo Finissimo', to: '/bvlgari/octo-finissimo' },
    { label: 'Octo Roma', to: '/bvlgari/octo-roma' },
    { label: locale === 'cs' ? 'Dámské hodinky' : locale === 'de' ? 'Damenuhren' : "Women's watches", to: '/bvlgari-uhr-damen' },
    { label: locale === 'cs' ? 'Pánské hodinky' : locale === 'de' ? 'Herrenuhren' : "Men's watches", to: '/bvlgari-uhr-herren' },
  ];

  return <BrandHero brand={BRAND} image="/brand-assets/bvlgari/collections/bvlgari-serpenti-collection.png" imageAlt={locale === 'cs' ? "Hodinky Bvlgari Serpenti" : "Bvlgari Serpenti watch"} shopTo="/bvlgari-uhr" links={links} />;
}
