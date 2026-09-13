import React from 'react';
import { useLanguage } from '@/lib/languageContext';
import BrandHero from '@/components/shared/BrandHero';
import { IWC_HERO_IMAGE } from '@/lib/iwcData';

const BRAND = 'IWC Schaffhausen';

export default function IWCHero() {
  const { locale } = useLanguage();
  const links = [
    { label: "Pilot's Watches", to: '/iwc-schaffhausen/pilots-watches' },
    { label: 'Portugieser', to: '/iwc-schaffhausen/portugieser' },
    { label: 'Portofino', to: '/iwc-schaffhausen/portofino' },
    { label: 'Ingenieur', to: '/iwc-schaffhausen/ingenieur' },
    { label: 'Aquatimer', to: '/iwc-schaffhausen/aquatimer' },
  ];

  return <BrandHero brand={BRAND} displayBrand="IWC" image={IWC_HERO_IMAGE} imageAlt={locale === 'cs' ? "Hodinky IWC Pilot" : "IWC Pilot watch"} shopTo="/iwc-schaffhausen-uhr" links={links} />;
}
