import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { motion } from 'framer-motion';
import { TH_HERO_IMAGE } from '@/lib/tagHeuerData';

const ANCHORS = [
  { label: 'Carrera', to: '/tag-heuer/carrera' },
  { label: 'Formula 1', to: '/tag-heuer/formula-1' },
  { label: 'Aquaracer', to: '/tag-heuer/aquaracer' },
  { label: 'Monaco', to: '/tag-heuer/monaco' },
  { label: 'Connected', to: '/tag-heuer/connected' },
  { label: 'Link', to: '/tag-heuer/link' },
];

export default function TAGHeuerHero() {
  return (
    <section className="relative overflow-hidden bg-background border-b border-border">
      <div className="w-full px-6 md:px-12 lg:px-20 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-5 text-primary">TAG Heuer</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6 text-[hsl(var(--primary))]">TAG Heuer Uhren at Kariv Glamour</h1>
          <p className="text-base leading-relaxed max-w-xl mb-8 text-muted-foreground">
            Explore TAG Heuer watches known for motorsport heritage, racing chronographs, robust Aquaracer dive watches, Formula 1-inspired sport models, the square Monaco icon, and the Connected Calibre E5 smartwatch collection.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            <LocalizedLink to="/tag-heuer-uhr" className="inline-flex items-center justify-center px-7 py-3.5 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:opacity-90 transition-opacity">Shop TAG Heuer Watches</LocalizedLink>
            <a href="#collections" className="inline-flex items-center justify-center px-7 py-3.5 border border-border text-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:border-primary hover:text-primary transition-colors">Explore TAG Heuer Collections</a>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {ANCHORS.map((a, i) =>
              <LocalizedLink key={i} to={a.to} className="text-[11px] tracking-[0.12em] uppercase text-primary hover:opacity-70 transition-opacity">{a.label}</LocalizedLink>
            )}
          </div>
        </motion.div>
        <div className="flex items-center justify-center">
          <div className="aspect-square w-full max-w-md relative overflow-hidden bg-secondary">
            <img src={TH_HERO_IMAGE} alt="TAG Heuer Carrera Chronograph" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}