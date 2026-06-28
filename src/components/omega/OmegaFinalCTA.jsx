import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function OmegaFinalCTA() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-5 text-primary">Your Next Timepiece</span>
          <h2 className="font-display text-4xl md:text-5xl font-light mb-6 text-foreground">Find Your Next Omega</h2>
          <p className="text-sm md:text-base leading-relaxed mb-10 max-w-xl mx-auto text-muted-foreground">Explore carefully selected Omega watches and compare collections, references, calibres, materials, conditions, documentation and prices in one refined shopping experience.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#omega-products" className="inline-flex items-center justify-center px-8 py-4 text-[11px] tracking-[0.15em] uppercase font-medium transition-all hover:opacity-90 bg-primary text-primary-foreground">Shop Omega Watches</a>
            <Link to="/welche-omega-kaufen" className="inline-flex items-center justify-center px-8 py-4 text-[11px] tracking-[0.15em] uppercase font-medium border transition-colors hover:bg-secondary border-primary text-primary">Explore Omega Buying Guide</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}