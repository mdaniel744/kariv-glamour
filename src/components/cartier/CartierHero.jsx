import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { CARTIER_LOGO, CARTIER_HERO_IMAGE } from '@/lib/cartierData';

const BRAND = 'Cartier';

export default function CartierHero() {
  const { t } = useTranslation('brandComponents');
  const anchors = [
    { label: t('hero.anchorCollections'), href: '#collections' },
    { label: 'Tank', to: '/cartier-tank-kaufen' },
    { label: 'Santos', to: '/cartier-santos-kaufen' },
    { label: 'Panthère', to: '/cartier-panthere-kaufen' },
    { label: t('hero.anchorPreOwned', { brand: BRAND }), to: '/cartier-gebraucht-kaufen' },
    { label: t('story.title', { brand: BRAND }), href: '#story' },
  ];

  return (
    <section className="relative overflow-hidden bg-background border-b border-border">
      <div className="w-full px-6 md:px-12 lg:px-20 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-5 text-primary">{t('hero.boutique', { brand: BRAND })}</span>
          <h1 className="text-4xl md:text-6xl leading-tight mb-6 [font-family:'Cormorant_Garamond',_serif] text-[hsl(var(--primary))] font-bold">{t('hero.title', { brand: BRAND })}</h1>
          <p className="text-base leading-relaxed max-w-xl mb-8 text-muted-foreground">{t('hero.description', { brand: BRAND })}</p>
          <div className="flex flex-wrap gap-3 mb-8">
            <LocalizedLink to="/cartier-uhr-kaufen" className="inline-flex items-center justify-center px-7 py-3.5 text-[11px] tracking-[0.15em] uppercase font-medium transition-opacity hover:opacity-90 bg-primary text-primary-foreground">{t('hero.shopCTA', { brand: BRAND })}</LocalizedLink>
            <a href="#collections" className="inline-flex items-center justify-center px-7 py-3.5 text-[11px] tracking-[0.15em] uppercase font-medium border transition-colors hover:border-primary hover:text-primary border-border text-foreground">{t('hero.discoverCollections', { brand: BRAND })}</a>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {anchors.map((a, i) => a.href ?
              <a key={i} href={a.href} className="text-[11px] tracking-[0.12em] uppercase hover:opacity-70 text-primary">{a.label}</a> :
              <LocalizedLink key={i} to={a.to} className="text-[11px] tracking-[0.12em] uppercase hover:opacity-70 text-primary">{a.label}</LocalizedLink>
            )}
          </div>
        </motion.div>
        <div className="flex flex-col items-center">
          <img src={CARTIER_LOGO} alt={BRAND} className="h-10 md:h-12 w-auto mb-6" />
          <div className="aspect-[4/5] w-full max-w-sm overflow-hidden border border-border">
            <img src={CARTIER_HERO_IMAGE} alt={`${BRAND} watch`} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}