import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CARTIER_LOGO, CARTIER_HERO_IMAGE } from '@/lib/cartierData';

const ANCHORS = [
{ label: 'Collections', href: '#collections' },
{ label: 'Tank', to: '/cartier-tank-kaufen' },
{ label: 'Santos', to: '/cartier-santos-kaufen' },
{ label: 'Panthère', to: '/cartier-panthere-kaufen' },
{ label: 'Pre-Owned Cartier', to: '/cartier-gebraucht-kaufen' },
{ label: 'Cartier Story', href: '#story' }];


export default function CartierHero() {
  return (
    <section className="relative overflow-hidden bg-background border-b border-border">
      <div className="w-full px-6 md:px-12 lg:px-20 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-5 text-primary">Cartier Maison</span>
          <h1 className="text-4xl md:text-6xl leading-tight mb-6 [font-family:'Cormorant_Garamond',_serif] text-[hsl(var(--primary))] font-bold">Cartier Watches at Kariv Glamour</h1>
          <p className="text-base leading-relaxed max-w-xl mb-8 text-muted-foreground">Explore elegant Cartier watches, from timeless Tank models to Santos de Cartier, Panthère de Cartier, Ballon Bleu, Baignoire and other iconic designs.</p>
          <div className="flex flex-wrap gap-3 mb-8">
            <Link to="/cartier-uhr-kaufen" className="inline-flex items-center justify-center px-7 py-3.5 text-[11px] tracking-[0.15em] uppercase font-medium transition-opacity hover:opacity-90 bg-primary text-primary-foreground">Shop Cartier Watches</Link>
            <a href="#collections" className="inline-flex items-center justify-center px-7 py-3.5 text-[11px] tracking-[0.15em] uppercase font-medium border transition-colors hover:border-primary hover:text-primary border-border text-foreground">Discover Cartier Collections</a>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {ANCHORS.map((a, i) => a.href ?
            <a key={i} href={a.href} className="text-[11px] tracking-[0.12em] uppercase hover:opacity-70 text-primary">{a.label}</a> :

            <Link key={i} to={a.to} className="text-[11px] tracking-[0.12em] uppercase hover:opacity-70 text-primary">{a.label}</Link>
            )}
          </div>
        </motion.div>
        <div className="flex flex-col items-center">
          <img src={CARTIER_LOGO} alt="Cartier" className="h-10 md:h-12 w-auto mb-6" />
          <div className="aspect-[4/5] w-full max-w-sm overflow-hidden border border-border">
            <img src={CARTIER_HERO_IMAGE} alt="Cartier watch" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>);

}