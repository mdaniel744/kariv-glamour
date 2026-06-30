import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { motion } from 'framer-motion';
import { TUDOR_HERO_IMAGE } from '@/lib/tudorData';

const ANCHORS = [
  { label: 'Black Bay', to: '/tudor/black-bay' },
  { label: 'Pelagos', to: '/tudor/pelagos' },
  { label: 'Tudor Royal', to: '/tudor/tudor-royal' },
  { label: 'Ranger', to: '/tudor/ranger' },
  { label: '1926', to: '/tudor/1926' },
  { label: 'Clair de Rose', to: '/tudor/clair-de-rose' },
];

export default function TudorHero() {
  return (
    <section className="relative overflow-hidden bg-background border-b border-border">
      <div className="w-full px-6 md:px-12 lg:px-20 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-5 text-primary">Tudor</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6 text-[hsl(var(--primary))]">Tudor Uhren at Kariv Glamour</h1>
          <p className="text-base leading-relaxed max-w-xl mb-8 text-muted-foreground">
            Explore Tudor watches known for robust Swiss design, Black Bay heritage, diving watches, sport models, elegant Royal and 1926 watches, and versatile options for men and women.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            <LocalizedLink to="/tudor-uhr" className="inline-flex items-center justify-center px-7 py-3.5 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:opacity-90 transition-opacity">Shop Tudor Watches</LocalizedLink>
            <a href="#collections" className="inline-flex items-center justify-center px-7 py-3.5 border border-border text-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:border-primary hover:text-primary transition-colors">Explore Tudor Collections</a>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {ANCHORS.map((a, i) =>
              <LocalizedLink key={i} to={a.to} className="text-[11px] tracking-[0.12em] uppercase text-primary hover:opacity-70 transition-opacity">{a.label}</LocalizedLink>
            )}
          </div>
        </motion.div>
        <div className="flex items-center justify-center">
          <div className="aspect-square w-full max-w-md relative overflow-hidden bg-secondary">
            <img src={TUDOR_HERO_IMAGE} alt="Tudor watch collection" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}