import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';

export default function TudorIntro() {
  return (
    <section className="py-16 md:py-20 bg-secondary">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6 text-foreground">Robust Swiss Luxury & Tool-Watch Character</h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          Tudor stands for robust Swiss watchmaking, precision, and tool-watch heritage. From the vintage-inspired <LocalizedLink to="/tudor/black-bay" className="text-primary underline">Black Bay</LocalizedLink> dive watch to the professional <LocalizedLink to="/tudor/pelagos" className="text-primary underline">Pelagos</LocalizedLink>, the versatile <LocalizedLink to="/tudor/tudor-royal" className="text-primary underline">Tudor Royal</LocalizedLink>, the rugged <LocalizedLink to="/tudor/ranger" className="text-primary underline">Ranger</LocalizedLink> field watch, the classic <LocalizedLink to="/tudor/1926" className="text-primary underline">1926</LocalizedLink>, and the elegant <LocalizedLink to="/tudor/clair-de-rose" className="text-primary underline">Clair de Rose</LocalizedLink> — Tudor delivers performance-driven timepieces. Explore our full collection or browse <LocalizedLink to="/tudor-gebraucht" className="text-primary underline">pre-owned Tudor</LocalizedLink> watches.
        </p>
      </div>
    </section>
  );
}