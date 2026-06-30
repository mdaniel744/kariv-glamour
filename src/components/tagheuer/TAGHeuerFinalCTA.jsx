import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';

export default function TAGHeuerFinalCTA() {
  return (
    <section className="py-20 md:py-28 text-center bg-foreground">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-5 text-background">Find Your TAG Heuer Watch</h2>
        <p className="text-base leading-relaxed mb-8 text-background/70">Browse TAG Heuer watches by collection, movement, chronograph features, case size, material, condition and price in one refined shopping experience.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <LocalizedLink to="/tag-heuer-uhr" className="inline-flex items-center justify-center px-7 py-3.5 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:opacity-90 transition-opacity">Shop TAG Heuer Watches</LocalizedLink>
          <LocalizedLink to="/tag-heuer/carrera" className="inline-flex items-center justify-center px-7 py-3.5 border border-background/40 text-background text-[11px] tracking-[0.15em] uppercase font-medium hover:bg-background/10 transition-colors">Explore Carrera</LocalizedLink>
        </div>
      </div>
    </section>
  );
}