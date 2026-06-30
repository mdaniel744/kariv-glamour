import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';

export default function APIntro() {
  return (
    <section className="py-16 md:py-20 bg-secondary">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6 text-foreground">Bold Case Architecture and High-End Finishing</h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          Audemars Piguet is celebrated for bold case architecture, integrated bracelet design, high-end finishing, and complications. From the iconic <LocalizedLink to="/audemars-piguet/royal-oak" className="text-primary underline">Royal Oak</LocalizedLink> designed by Gerald Genta in 1972, to the sportier <LocalizedLink to="/audemars-piguet/royal-oak-offshore" className="text-primary underline">Royal Oak Offshore</LocalizedLink> launched in 1993, the technical <LocalizedLink to="/audemars-piguet/royal-oak-concept" className="text-primary underline">Royal Oak Concept</LocalizedLink>, and the modern <LocalizedLink to="/audemars-piguet/code-1159" className="text-primary underline">Code 11.59</LocalizedLink> revealed in 2019, AP watches appeal to collectors who value architectural design, precision, and complications. Explore our selection of <LocalizedLink to="/audemars-piguet-gebraucht" className="text-primary underline">pre-owned Audemars Piguet</LocalizedLink> watches alongside new models.
        </p>
      </div>
    </section>
  );
}