import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ANCHORS = [
{ label: 'Navitimer', to: '/breitling/navitimer' },
{ label: 'Chronomat', to: '/breitling/chronomat' },
{ label: 'Superocean', to: '/breitling/superocean' },
{ label: 'Avenger', to: '/breitling/avenger' },
{ label: 'Premier', to: '/breitling/premier' },
{ label: 'Pre-Owned Breitling', to: '/breitling-uhr-gebraucht' }];


export default function BreitlingHero() {
  return (
    <section className="relative overflow-hidden bg-background border-b border-border">
      <div className="w-full px-6 md:px-12 lg:px-20 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-5 text-primary">Breitling</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6 text-[hsl(var(--primary))]">Breitling Uhren at Kariv Glamour</h1>
          <p className="text-base leading-relaxed max-w-xl mb-8 text-muted-foreground">Explore Breitling watches known for aviation heritage, chronograph design, robust sports-watch character, and iconic collections such as Navitimer, Chronomat, Superocean, Avenger and Premier.</p>
          <div className="flex flex-wrap gap-3 mb-8">
            <Link to="/breitling-uhr" className="inline-flex items-center justify-center px-7 py-3.5 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:opacity-90 transition-opacity">Shop Breitling Watches</Link>
            <a href="#collections" className="inline-flex items-center justify-center px-7 py-3.5 border border-border text-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:border-primary hover:text-primary transition-colors">Explore Breitling Collections</a>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {ANCHORS.map((a, i) =>
            <Link key={i} to={a.to} className="text-[11px] tracking-[0.12em] uppercase text-primary hover:opacity-70 transition-opacity">{a.label}</Link>
            )}
          </div>
        </motion.div>
        <div className="flex items-center justify-center">
          {/* Asset placeholder — add Breitling brand image or hero graphic here */}
          <div className="aspect-[4/5] w-full max-w-sm border border-border bg-secondary flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-primary/40" />
            <span className="font-display text-3xl md:text-4xl tracking-[0.2em] text-foreground">BREITLING</span>
            <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mt-3">Instruments for Professionals</span>
          </div>
        </div>
      </div>
    </section>);

}