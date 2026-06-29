import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AP_HERO_IMAGE } from '@/lib/audemarsPiguetData';

const ANCHORS = [
  { label: 'Royal Oak', to: '/audemars-piguet/royal-oak' },
  { label: 'Royal Oak Offshore', to: '/audemars-piguet/royal-oak-offshore' },
  { label: 'Royal Oak Concept', to: '/audemars-piguet/royal-oak-concept' },
  { label: 'Code 11.59', to: '/audemars-piguet/code-1159' },
  { label: 'Pre-Owned AP', to: '/audemars-piguet-gebraucht' },
];

export default function APHero() {
  return (
    <section className="relative overflow-hidden bg-background border-b border-border">
      <div className="w-full px-6 md:px-12 lg:px-20 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-5 text-primary">Audemars Piguet</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6 text-foreground">Audemars Piguet Uhren at Kariv Glamour</h1>
          <p className="text-base leading-relaxed max-w-xl mb-8 text-muted-foreground">Explore Audemars Piguet watches known for bold case architecture, integrated bracelet design, high-end finishing, complications, and iconic collections such as Royal Oak, Royal Oak Offshore, Royal Oak Concept and Code 11.59.</p>
          <div className="flex flex-wrap gap-3 mb-8">
            <Link to="/audemars-piguet-uhr" className="inline-flex items-center justify-center px-7 py-3.5 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:opacity-90 transition-opacity">Shop Audemars Piguet Watches</Link>
            <a href="#collections" className="inline-flex items-center justify-center px-7 py-3.5 border border-border text-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:border-primary hover:text-primary transition-colors">Explore AP Collections</a>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {ANCHORS.map((a, i) => (
              <Link key={i} to={a.to} className="text-[11px] tracking-[0.12em] uppercase text-primary hover:opacity-70 transition-opacity">{a.label}</Link>
            ))}
          </div>
        </motion.div>
        <div className="flex items-center justify-center">
          <div className="aspect-square w-full max-w-md relative overflow-hidden bg-black">
            <img src={AP_HERO_IMAGE} alt="Audemars Piguet Royal Oak" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}