import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';

export default function HublotIntro() {
  return (
    <section className="py-16 md:py-20 bg-secondary">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-light mb-6 text-foreground">Bold Design and Modern Materials</h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          Hublot is known for bold contemporary watch design, innovative material combinations, visible architecture, skeletonized dials, and a strong luxury sports-watch identity. From the powerful <LocalizedLink to="/hublot/big-bang" className="text-primary underline">Big Bang</LocalizedLink> to the more refined <LocalizedLink to="/hublot/classic-fusion" className="text-primary underline">Classic Fusion</LocalizedLink> and the tonneau-shaped <LocalizedLink to="/hublot/spirit-of-big-bang" className="text-primary underline">Spirit of Big Bang</LocalizedLink>, Hublot watches appeal to collectors who want modern design, wrist presence, and technical character. Explore our selection of <LocalizedLink to="/hublot-gebraucht" className="text-primary underline">pre-owned Hublot watches</LocalizedLink> alongside new models.
        </p>
      </div>
    </section>
  );
}