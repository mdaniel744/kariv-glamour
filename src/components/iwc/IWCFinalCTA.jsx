import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';

export default function IWCFinalCTA() {
  return (
    <section className="py-20 md:py-28 text-center bg-foreground">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-5 text-background">Find Your IWC Schaffhausen Watch</h2>
        <p className="text-base leading-relaxed mb-8 text-background/70">Browse IWC Schaffhausen watches by collection, movement, complication, case size, material, condition and price in one refined shopping experience.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <LocalizedLink to="/iwc-schaffhausen-uhr" className="inline-flex items-center justify-center px-7 py-3.5 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:opacity-90 transition-opacity">Shop IWC Watches</LocalizedLink>
          <LocalizedLink to="/iwc-schaffhausen/pilots-watches" className="inline-flex items-center justify-center px-7 py-3.5 border border-background/40 text-background text-[11px] tracking-[0.15em] uppercase font-medium hover:bg-background/10 transition-colors">Explore Pilot&rsquo;s Watches</LocalizedLink>
        </div>
      </div>
    </section>
  );
}