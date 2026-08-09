import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { AP_HERO_IMAGE } from '@/lib/audemarsPiguetData';

const BRAND = 'Audemars Piguet';

export default function APHero() {
  const { t } = useTranslation('brandComponents');
  const anchors = [
    { label: 'Royal Oak', to: '/audemars-piguet/royal-oak' },
    { label: 'Royal Oak Offshore', to: '/audemars-piguet/royal-oak-offshore' },
    { label: 'Royal Oak Concept', to: '/audemars-piguet/royal-oak-concept' },
    { label: 'Code 11.59', to: '/audemars-piguet/code-1159' },
    { label: t('hero.anchorPreOwned', { brand: 'AP' }), to: '/audemars-piguet-gebraucht' },
  ];

  return (
    <section className="relative overflow-hidden bg-background border-b border-border">
      <div className="w-full px-6 md:px-12 lg:px-20 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-5 text-primary">{BRAND}</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6 text-foreground">{t('hero.title', { brand: BRAND })}</h1>
          <p className="text-base leading-relaxed max-w-xl mb-8 text-muted-foreground">{t('hero.description', { brand: BRAND })}</p>
          <div className="flex flex-wrap gap-3 mb-8">
            <LocalizedLink to="/audemars-piguet-uhr" className="inline-flex items-center justify-center px-7 py-3.5 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:opacity-90 transition-opacity">{t('hero.shopCTA', { brand: BRAND })}</LocalizedLink>
            <a href="#collections" className="inline-flex items-center justify-center px-7 py-3.5 border border-border text-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:border-primary hover:text-primary transition-colors">{t('hero.discoverCollections', { brand: BRAND })}</a>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {anchors.map((a, i) => (<LocalizedLink key={i} to={a.to} className="text-[11px] tracking-[0.12em] uppercase text-primary hover:opacity-70 transition-opacity">{a.label}</LocalizedLink>))}
          </div>
        </motion.div>
        <div className="flex items-center justify-center">
          <div className="aspect-square w-full max-w-md relative overflow-hidden bg-black">
            <img src={AP_HERO_IMAGE} alt={`${BRAND} Royal Oak Offshore`} className="w-full h-full object-contain p-8 md:p-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
