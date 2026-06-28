import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CARTIER_COLLECTIONS } from '@/lib/cartierData';

export default function CartierCollectionGrid() {
  return (
    <section id="collections" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-3 text-primary">Cartier Collections</span>
          <h2 className="font-display text-3xl md:text-4xl font-light mb-4 text-foreground">Discover Cartier Watch Collections</h2>
          <p className="text-sm max-w-2xl mx-auto text-muted-foreground">Browse Cartier's most recognizable watch families and find the design that best matches your style.</p>
        </div>
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 no-scrollbar">
          {CARTIER_COLLECTIONS.map((c, i) => (
            <motion.div key={c.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: (i % 4) * 0.05 }} className="flex-shrink-0 snap-start min-w-[80%] sm:min-w-[45%] lg:min-w-[30%]">
              <Link to={`/cartier/${c.slug}`} className="group block border border-border bg-card transition-colors hover:border-primary/40">
                <div className="aspect-[4/3] overflow-hidden flex items-center justify-center bg-secondary">
                  {c.image ? (
                    <img src={c.image} alt={`Cartier ${c.name}`} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <span className="font-display text-2xl text-primary">{c.name}</span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl mb-2 text-foreground">{c.name}</h3>
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