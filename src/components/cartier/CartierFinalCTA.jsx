import React from 'react';
import { Link } from 'react-router-dom';

export default function CartierFinalCTA() {
  return (
    <section className="py-20 md:py-28 text-center bg-foreground">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl mb-5 text-background [font-family:'Cormorant_Garamond',_serif] font-semibold">Find Your Cartier Watch</h2>
        <p className="text-base leading-relaxed mb-8 text-background/70">Browse Cartier watches by collection, shape, material, movement, condition and price in one refined shopping experience.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/cartier-uhr-kaufen" className="inline-flex items-center justify-center px-7 py-3.5 text-[11px] tracking-[0.15em] uppercase font-medium transition-opacity hover:opacity-90 bg-primary text-primary-foreground">Shop Cartier Watches</Link>
          <Link to="/cartier-tank-kaufen" className="inline-flex items-center justify-center px-7 py-3.5 text-[11px] tracking-[0.15em] uppercase font-medium border transition-colors hover:bg-background/10 border-background/40 text-background">Explore Cartier Tank</Link>
        </div>
      </div>
    </section>);

}