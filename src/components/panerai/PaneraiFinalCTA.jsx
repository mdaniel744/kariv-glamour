import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';

const BRAND = 'Panerai';

export default function PaneraiFinalCTA() {
  const { t } = useTranslation('brandComponents');
  return (
    <section className="py-20 md:py-28 text-center bg-foreground">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-5 text-background">{t('finalCTA.findYourNext', { brand: BRAND })}</h2>
        <p className="text-base leading-relaxed mb-8 text-background/70">{t('finalCTA.description', { brand: BRAND })}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <LocalizedLink to="/panerai-uhr" className="inline-flex items-center justify-center px-7 py-3.5 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:opacity-90 transition-opacity">{t('cta.shopBrand', { brand: BRAND })}</LocalizedLink>
          <LocalizedLink to="/panerai/luminor" className="inline-flex items-center justify-center px-7 py-3.5 border border-background/40 text-background text-[11px] tracking-[0.15em] uppercase font-medium hover:bg-background/10 transition-colors">{t('cta.exploreCollection')}</LocalizedLink>
        </div>
      </div>
    </section>
  );
}