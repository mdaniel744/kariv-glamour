import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const BRAND = 'Cartier';

export default function CartierFinalCTA() {
  const { t } = useTranslation('brandComponents');
  return (
    <section className="py-20 md:py-28 text-center bg-foreground">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl mb-5 text-background [font-family:'Cormorant_Garamond',_serif] font-semibold">{t('finalCTA.findYourNext', { brand: BRAND })}</h2>
        <p className="text-base leading-relaxed mb-8 text-background/70">{t('finalCTA.description', { brand: BRAND })}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <LocalizedLink to="/cartier-uhr-kaufen" className="inline-flex items-center justify-center px-7 py-3.5 text-[11px] tracking-[0.15em] uppercase font-medium transition-opacity hover:opacity-90 bg-primary text-primary-foreground">{t('cta.shopBrand', { brand: BRAND })}</LocalizedLink>
          <LocalizedLink to="/cartier-tank-kaufen" className="inline-flex items-center justify-center px-7 py-3.5 text-[11px] tracking-[0.15em] uppercase font-medium border transition-colors hover:bg-background/10 border-background/40 text-background">{t('cta.exploreCollection')}</LocalizedLink>
        </div>
      </div>
    </section>
  );
}