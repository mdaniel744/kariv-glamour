import React from 'react';
import { useLanguage } from '@/lib/languageContext';
import { useTranslation } from 'react-i18next';
import BrandHero from '@/components/shared/BrandHero';
import { HUBLOT_HERO_IMAGE } from '@/lib/hublotData';

const BRAND = 'Hublot';

export default function HublotHero() {
  const { locale } = useLanguage();
  const { t } = useTranslation('brandComponents');
  const links = [
    { label: 'Big Bang', to: '/hublot/big-bang' },
    { label: 'Classic Fusion', to: '/hublot/classic-fusion' },
    { label: 'Spirit of Big Bang', to: '/hublot/spirit-of-big-bang' },
    { label: 'Square Bang', to: '/hublot/square-bang' },
    { label: t('hero.anchorPreOwned', { brand: BRAND }), to: '/hublot-gebraucht' },
  ];

  return <BrandHero brand={BRAND} image={HUBLOT_HERO_IMAGE} imageAlt={locale === 'cs' ? "Hodinky Hublot Big Bang" : "Hublot Big Bang watch"} shopTo="/hublot-uhr" links={links} />;
}
