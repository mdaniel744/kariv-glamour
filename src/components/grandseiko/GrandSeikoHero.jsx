import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GS_HERO_IMAGE } from '@/lib/grandSeikoData';

const ANCHORS = [
{ label: 'Heritage', to: '/grand-seiko/heritage' },
{ label: 'Elegance', to: '/grand-seiko/elegance' },
{ label: 'Sport', to: '/grand-seiko/sport' },
{ label: 'Evolution 9', to: '/grand-seiko/evolution-9' },
{ label: 'Masterpiece', to: '/grand-seiko/masterpiece' }];


export default function GrandSeikoHero() {
  return (
    <section className="relative overflow-hidden bg-background border-b border-border">
      <div className="w-full px-6 md:px-12 lg:px-20 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-5 text-primary">Grand Seiko</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6 text-[hsl(var(--primary))]">Grand Seiko Uhren at Kariv Glamour</h1>
          <p className="text-base leading-relaxed max-w-xl mb-8 text-muted-foreground">
            Explore Grand Seiko watches known for Japanese craftsmanship, refined finishing, nature-inspired dials, Spring Drive technology, GMT functionality, and collections such as Heritage, Elegance, Sport, Evolution 9 and Masterpiece.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            <Link to="/grand-seiko-uhr" className="inline-flex items-center justify-center px-7 py-3.5 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:opacity-90 transition-opacity">Shop Grand Seiko Watches</Link>
            <a href="#collections" className="inline-flex items-center justify-center px-7 py-3.5 border border-border text-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:border-primary hover:text-primary transition-colors">Explore Grand Seiko Collections</a>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {ANCHORS.map((a, i) =>
            <Link key={i} to={a.to} className="text-[11px] tracking-[0.12em] uppercase text-primary hover:opacity-70 transition-opacity">{a.label}</Link>
            )}
          </div>
        </motion.div>
        <div className="flex items-center justify-center">
          <div className="aspect-square w-full max-w-md relative overflow-hidden bg-secondary">
            <img src={GS_HERO_IMAGE} alt="Grand Seiko Evolution 9" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>);

}