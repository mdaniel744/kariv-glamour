import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { motion } from 'framer-motion';
import { PANERAI_HERO_IMAGE } from '@/lib/paneraiData';

const ANCHORS = [
  { label: 'Luminor', to: '/panerai/luminor' },
  { label: 'Luminor Marina', to: '/panerai/luminor-marina' },
  { label: 'Radiomir', to: '/panerai/radiomir' },
  { label: 'Submersible', to: '/panerai/submersible' },
  { label: 'Luminor Due', to: '/panerai/luminor-due' },
];

export default function PaneraiHero() {
  return (
    <section className="relative overflow-hidden bg-background border-b border-border">
      <div className="w-full px-6 md:px-12 lg:px-20 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-5 text-primary">Panerai</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6 text-[hsl(var(--primary))]">Panerai Uhren at Kariv Glamour</h1>
          <p className="text-base leading-relaxed max-w-xl mb-8 text-muted-foreground">
            Explore Panerai watches known for bold Italian design, strong wrist presence, luminous dials, cushion-shaped cases, diving heritage, and iconic collections such as Luminor, Luminor Marina, Radiomir and Submersible.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            <LocalizedLink to="/panerai-uhr" className="inline-flex items-center justify-center px-7 py-3.5 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:opacity-90 transition-opacity">Shop Panerai Watches</LocalizedLink>
            <a href="#collections" className="inline-flex items-center justify-center px-7 py-3.5 border border-border text-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:border-primary hover:text-primary transition-colors">Explore Panerai Collections</a>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {ANCHORS.map((a, i) =>
              <LocalizedLink key={i} to={a.to} className="text-[11px] tracking-[0.12em] uppercase text-primary hover:opacity-70 transition-opacity">{a.label}</LocalizedLink>
            )}
          </div>
        </motion.div>
        <div className="flex items-center justify-center">
          <div className="aspect-square w-full max-w-md relative overflow-hidden bg-secondary">
            <img src={PANERAI_HERO_IMAGE} alt="Panerai Luminor Marina" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}