import React from 'react';
import { Link } from 'react-router-dom';

export default function APIntro() {
  return (
    <section className="py-16 md:py-20 bg-secondary">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6 text-foreground">Bold Case Architecture and High-End Finishing</h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          Audemars Piguet is celebrated for bold case architecture, integrated bracelet design, high-end finishing, and complications. From the iconic <Link to="/audemars-piguet/royal-oak" className="text-primary underline">Royal Oak</Link> designed by Gerald Genta in 1972, to the sportier <Link to="/audemars-piguet/royal-oak-offshore" className="text-primary underline">Royal Oak Offshore</Link> launched in 1993, the technical <Link to="/audemars-piguet/royal-oak-concept" className="text-primary underline">Royal Oak Concept</Link>, and the modern <Link to="/audemars-piguet/code-1159" className="text-primary underline">Code 11.59</Link> revealed in 2019, AP watches appeal to collectors who value architectural design, precision, and complications. Explore our selection of <Link to="/audemars-piguet-gebraucht" className="text-primary underline">pre-owned Audemars Piguet</Link> watches alongside new models.
        </p>
      </div>
    </section>
  );
}