import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { PATEK_HERO_IMAGE } from '@/lib/patekData';

const ANCHOR_LINKS = [
{ label: 'Collections', href: '#patek-collections' },
{ label: 'New Arrivals', href: '#patek-products' },
{ label: 'Pre-Owned Patek Philippe', href: '/patek-philippe-gebraucht-kaufen' },
{ label: 'Patek Philippe Buying Guide', href: '/welche-patek-philippe-kaufen' },
{ label: 'Watchmaking', href: '#patek-watchmaking' },
{ label: 'Maintenance', href: '#patek-maintenance' }];


export default function PatekPhilippeHero() {
  return (
    <section className="relative overflow-hidden bg-background border-b border-border">
      <div className="absolute inset-0">
        <img src={PATEK_HERO_IMAGE} alt="Patek Philippe watches at Kariv Glamour" className="w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/30" />
      </div>

      <div className="relative w-full px-6 md:px-12 lg:px-20 py-20 md:py-28 lg:py-36">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl">
          <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase mb-6 text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Start</Link>
            <ChevronRight size={10} />
            <Link to="/brands" className="hover:text-foreground">Marken</Link>
            <ChevronRight size={10} />
            <span className="text-foreground">Patek Philippe</span>
          </div>

          <span className="text-[10px] tracking-[0.3em] uppercase block mb-5 text-primary">Patek Philippe Boutique</span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 [font-family:'Cormorant_Garamond',_serif] font-bold text-[hsl(var(--primary))]">Patek Philippe Watches at
Kariv Glamour
          </h1>

          <p className="text-sm md:text-base leading-relaxed mb-10 max-w-xl text-muted-foreground">
            Discover a curated selection of Patek Philippe watches, from refined Calatrava dress watches to iconic collector models such as the Nautilus, Aquanaut, Cubitus and Grand Complications.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a href="#patek-products" className="inline-flex items-center justify-center px-8 py-4 text-[11px] tracking-[0.15em] uppercase font-medium transition-all hover:opacity-90 bg-primary text-primary-foreground">Shop Patek Philippe Watches</a>
            <a href="#patek-collections" className="inline-flex items-center justify-center px-8 py-4 text-[11px] tracking-[0.15em] uppercase font-medium border transition-colors hover:border-primary hover:text-primary border-border text-foreground">Discover Patek Philippe Collections</a>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {ANCHOR_LINKS.map((link, i) =>
            <a key={i} href={link.href} className="text-[10px] tracking-[0.12em] uppercase transition-colors hover:opacity-70 text-primary">{link.label}</a>
            )}
          </div>
        </motion.div>
      </div>
    </section>);

}