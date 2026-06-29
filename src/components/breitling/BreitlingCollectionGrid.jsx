import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BREITLING_COLLECTIONS } from '@/lib/breitlingData';

export default function BreitlingCollectionGrid() {
  return (
    <section id="collections" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-3 text-primary">Breitling Collections</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4 text-foreground">Discover Breitling Collections</h2>
          <p className="text-sm max-w-2xl mx-auto text-muted-foreground">Browse Breitling's most important watch families, from aviation chronographs to professional instruments.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BREITLING_COLLECTIONS.map((c, i) => (
            <motion.div key={c.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: (i % 3) * 0.05 }}>
              <Link to={`/breitling/${c.slug}`} className="group block border border-border bg-card hover:border-primary/40 transition-colors">
                {/* Asset placeholder — add collection image here */}
                <div className="aspect-[4/3] flex items-center justify-center bg-secondary">
                  <span className="font-display text-xl tracking-wide text-foreground/70 group-hover:text-foreground transition-colors">{c.name}</span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-medium mb-2 text-foreground">{c.name}</h3>
                  <p className="text-xs leading-relaxed mb-4 text-muted-foreground">{c.shortDescription}</p>
                  <span className="text-[10px] tracking-[0.15em] uppercase text-primary">Explore Collection →</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}