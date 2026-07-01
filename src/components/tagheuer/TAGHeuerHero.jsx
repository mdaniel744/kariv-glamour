import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { TH_HERO_IMAGE } from '@/lib/tagHeuerData';

const BRAND = 'TAG Heuer';

export default function TAGHeuerHero() {
  const { t } = useTranslation('brandComponents');
  const anchors = [
    { label: 'Carrera', to: '/tag-heuer/carrera' },
    { label: 'Formula 1', to: '/tag-heuer/formula-1' },
    { label: 'Aquaracer', to: '/tag-heuer/aquaracer' },
    { label: 'Monaco', to: '/tag-heuer/monaco' },
    { label: 'Connected', to: '/tag-heuer/connected' },
    { label: 'Link', to: '/tag-heuer/link' },
  ];

  return (
    <section className="relative overflow-hidden bg-background border-b border-border">
      <div className="w-full px-6 md:px-12 lg:px-20 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-5 text-primary">{BRAND}</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6 text-[hsl(var(--primary))]">{t('hero.title', { brand: BRAND })}</h1>
          <p className="text-base leading-relaxed max-w-xl mb-8 text-muted-foreground">{t('hero.description', { brand: BRAND })}</p>
          <div className="flex flex-wrap gap-3 mb-8">
            <LocalizedLink to="/tag-heuer-uhr" className="inline-flex items-center justify-center px-7 py-3.5 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:opacity-90 transition-opacity">{t('hero.shopCTA', { brand: BRAND })}</LocalizedLink>
            <a href="#collections" className="inline-flex items-center justify-center px-7 py-3.5 border border-border text-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:border-primary hover:text-primary transition-colors">{t('hero.discoverCollections', { brand: BRAND })}</a>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {anchors.map((a, i) => (<LocalizedLink key={i} to={a.to} className="text-[11px] tracking-[0.12em] uppercase text-primary hover:opacity-70 transition-opacity">{a.label}</LocalizedLink>))}
          </div>
        </motion.div>
        <div className="flex items-center justify-center">
          <div className="aspect-square w-full max-w-md relative overflow-hidden bg-secondary">
            <img src={TH_HERO_IMAGE} alt={`${BRAND} Carrera Chronograph`} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}