import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { JLC_HERO_IMAGE } from '@/lib/jaegerLeCoultreData';

const BRAND = 'Jaeger-LeCoultre';

export default function JLCHero() {
  const { t } = useTranslation('brandComponents');
  const anchors = [
    { label: 'Reverso', to: '/jaeger-lecoultre/reverso' },
    { label: 'Master Ultra Thin', to: '/jaeger-lecoultre/master-ultra-thin' },
    { label: 'Master Control', to: '/jaeger-lecoultre/master-control' },
    { label: 'Polaris', to: '/jaeger-lecoultre/polaris' },
    { label: 'Rendez-Vous', to: '/jaeger-lecoultre/rendez-vous' },
  ];

  return (
    <section className="relative overflow-hidden bg-background border-b border-border">
      <div className="w-full px-6 md:px-12 lg:px-20 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-5 text-primary">{BRAND}</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6 text-foreground">{t('hero.title', { brand: BRAND })}</h1>
          <p className="text-base leading-relaxed max-w-xl mb-8 text-muted-foreground">{t('hero.description', { brand: BRAND })}</p>
          <div className="flex flex-wrap gap-3 mb-8">
            <LocalizedLink to="/jaeger-lecoultre-uhr" className="inline-flex items-center justify-center px-7 py-3.5 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:opacity-90 transition-opacity">{t('hero.shopCTA', { brand: BRAND })}</LocalizedLink>
            <a href="#collections" className="inline-flex items-center justify-center px-7 py-3.5 border border-border text-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:border-primary hover:text-primary transition-colors">{t('hero.discoverCollections', { brand: 'JLC' })}</a>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {anchors.map((a, i) => (<LocalizedLink key={i} to={a.to} className="text-[11px] tracking-[0.12em] uppercase text-primary hover:opacity-70 transition-opacity">{a.label}</LocalizedLink>))}
          </div>
        </motion.div>
        <div className="flex items-center justify-center">
          <div className="aspect-square w-full max-w-md relative overflow-hidden bg-secondary">
            <img src={JLC_HERO_IMAGE} alt={`${BRAND} Reverso watch`} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}