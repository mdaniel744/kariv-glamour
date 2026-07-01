import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { PATEK_HERO_IMAGE } from '@/lib/patekData';

const BRAND = 'Patek Philippe';

export default function PatekPhilippeHero() {
  const { t } = useTranslation('brandComponents');
  const anchorLinks = [
    { label: t('hero.anchorCollections'), href: '#patek-collections' },
    { label: t('hero.anchorNewArrivals'), href: '#patek-products' },
    { label: t('hero.anchorPreOwned', { brand: BRAND }), href: '/patek-philippe-gebraucht-kaufen' },
    { label: t('hero.anchorBuyingGuide', { brand: BRAND }), href: '/welche-patek-philippe-kaufen' },
    { label: t('hero.anchorWatchmaking'), href: '#patek-watchmaking' },
    { label: t('hero.anchorMaintenance'), href: '#patek-maintenance' },
  ];

  return (
    <section className="relative overflow-hidden bg-background border-b border-border">
      <div className="absolute inset-0">
        <img src={PATEK_HERO_IMAGE} alt={`${BRAND} watches at Kariv Glamour`} className="w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/30" />
      </div>

      <div className="relative w-full px-6 md:px-12 lg:px-20 py-20 md:py-28 lg:py-36">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl">
          <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase mb-6 text-muted-foreground">
            <LocalizedLink to="/" className="hover:text-foreground">{t('breadcrumb.home')}</LocalizedLink>
            <ChevronRight size={10} />
            <LocalizedLink to="/brands" className="hover:text-foreground">{t('breadcrumb.brands')}</LocalizedLink>
            <ChevronRight size={10} />
            <span className="text-foreground">{BRAND}</span>
          </div>

          <span className="text-[10px] tracking-[0.3em] uppercase block mb-5 text-primary">{t('hero.boutique', { brand: BRAND })}</span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 [font-family:'Cormorant_Garamond',_serif] font-bold text-[hsl(var(--primary))]">{t('hero.title', { brand: BRAND })}</h1>

          <p className="text-sm md:text-base leading-relaxed mb-10 max-w-xl text-muted-foreground">{t('hero.description', { brand: BRAND })}</p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a href="#patek-products" className="inline-flex items-center justify-center px-8 py-4 text-[11px] tracking-[0.15em] uppercase font-medium transition-all hover:opacity-90 bg-primary text-primary-foreground">{t('hero.shopCTA', { brand: BRAND })}</a>
            <a href="#patek-collections" className="inline-flex items-center justify-center px-8 py-4 text-[11px] tracking-[0.15em] uppercase font-medium border transition-colors hover:border-primary hover:text-primary border-border text-foreground">{t('hero.discoverCollections', { brand: BRAND })}</a>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {anchorLinks.map((link, i) => <a key={i} href={link.href} className="text-[10px] tracking-[0.12em] uppercase transition-colors hover:opacity-70 text-primary">{link.label}</a>)}
          </div>
        </motion.div>
      </div>
    </section>
  );
}