import React from 'react';
import { Link } from 'react-router-dom';

export default function HublotFinalCTA() {
  return (
    <section className="py-20 md:py-28 text-center bg-foreground">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="font-display text-3xl md:text-4xl font-light mb-5 text-background">Find Your Hublot Watch</h2>
        <p className="text-base leading-relaxed mb-8 text-background/70">Browse Hublot watches by collection, material, case size, movement, condition and price in one refined shopping experience.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/hublot-uhr" className="inline-flex items-center justify-center px-7 py-3.5 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:opacity-90 transition-opacity">Shop Hublot Watches</Link>
          <Link to="/hublot/big-bang" className="inline-flex items-center justify-center px-7 py-3.5 border border-background/40 text-background text-[11px] tracking-[0.15em] uppercase font-medium hover:bg-background/10 transition-colors">Explore Big Bang</Link>
        </div>
      </div>
    </section>
  );
}