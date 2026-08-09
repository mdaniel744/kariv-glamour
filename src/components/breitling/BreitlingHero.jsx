import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { BREITLING_HERO_IMAGE } from '@/lib/breitlingData';

const BRAND = 'Breitling';

export default function BreitlingHero() {
  const { t } = useTranslation('brandComponents');
  const anchors = [
    { label: 'Navitimer', to: '/breitling/navitimer' },
    { label: 'Chronomat', to: '/breitling/chronomat' },
    { label: 'Superocean', to: '/breitling/superocean' },
    { label: 'Avenger', to: '/breitling/avenger' },
    { label: 'Premier', to: '/breitling/premier' },
    { label: t('hero.anchorPreOwned', { brand: BRAND }), to: '/breitling-uhr-gebraucht' },
  ];

  return (
    <section className="relative overflow-hidden bg-background border-b border-border">
      <div className="w-full px-6 md:px-12 lg:px-20 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-5 text-primary">{BRAND}</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6 text-[hsl(var(--primary))]">{t('hero.title', { brand: BRAND })}</h1>
          <p className="text-base leading-relaxed max-w-xl mb-8 text-muted-foreground">{t('hero.description', { brand: BRAND })}</p>
          <div className="flex flex-wrap gap-3 mb-8">
            <LocalizedLink to="/breitling-uhr" className="inline-flex items-center justify-center px-7 py-3.5 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:opacity-90 transition-opacity">{t('hero.shopCTA', { brand: BRAND })}</LocalizedLink>
            <a href="#collections" className="inline-flex items-center justify-center px-7 py-3.5 border border-border text-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:border-primary hover:text-primary transition-colors">{t('hero.discoverCollections', { brand: BRAND })}</a>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {anchors.map((a, i) => (<LocalizedLink key={i} to={a.to} className="text-[11px] tracking-[0.12em] uppercase text-primary hover:opacity-70 transition-opacity">{a.label}</LocalizedLink>))}
          </div>
        </motion.div>
        <div className="flex items-center justify-center">
          <div className="aspect-square w-full max-w-md border border-border bg-white relative overflow-hidden">
            <img src={BREITLING_HERO_IMAGE} alt={`${BRAND} Navitimer`} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
