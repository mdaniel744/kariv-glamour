import React from 'react';
import { Link } from 'react-router-dom';

export default function HublotIntro() {
  return (
    <section className="py-16 md:py-20 bg-secondary">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-light mb-6 text-foreground">Bold Design and Modern Materials</h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          Hublot is known for bold contemporary watch design, innovative material combinations, visible architecture, skeletonized dials, and a strong luxury sports-watch identity. From the powerful <Link to="/hublot/big-bang" className="text-primary underline">Big Bang</Link> to the more refined <Link to="/hublot/classic-fusion" className="text-primary underline">Classic Fusion</Link> and the tonneau-shaped <Link to="/hublot/spirit-of-big-bang" className="text-primary underline">Spirit of Big Bang</Link>, Hublot watches appeal to collectors who want modern design, wrist presence, and technical character. Explore our selection of <Link to="/hublot-gebraucht" className="text-primary underline">pre-owned Hublot watches</Link> alongside new models.
        </p>
      </div>
    </section>
  );
}