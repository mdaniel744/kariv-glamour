import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';

export default function TAGHeuerIntro() {
  return (
    <section className="py-16 md:py-20 bg-secondary">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6 text-foreground">Motorsport Heritage & Chronograph Excellence</h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          TAG Heuer stands for motorsport, precision timing, and chronograph innovation. From the racing-inspired <LocalizedLink to="/tag-heuer/carrera" className="text-primary underline">Carrera</LocalizedLink> to the square-case <LocalizedLink to="/tag-heuer/monaco" className="text-primary underline">Monaco</LocalizedLink>, the dive-ready <LocalizedLink to="/tag-heuer/aquaracer" className="text-primary underline">Aquaracer</LocalizedLink> with 300M water resistance, the sporty <LocalizedLink to="/tag-heuer/formula-1" className="text-primary underline">Formula 1</LocalizedLink>, and the <LocalizedLink to="/tag-heuer/connected" className="text-primary underline">Connected</LocalizedLink> Calibre E5 luxury smartwatch — TAG Heuer delivers performance-driven timepieces. Explore our full collection or browse <LocalizedLink to="/tag-heuer-gebraucht" className="text-primary underline">pre-owned TAG Heuer</LocalizedLink> watches.
        </p>
      </div>
    </section>
  );
}