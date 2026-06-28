import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function HublotStoryTeaser() {
  return (
    <section id="story" className="py-16 md:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-3 text-primary">Hublot Story</span>
          <h2 className="font-display text-3xl md:text-4xl font-light mb-6 text-foreground">Hublot Story</h2>
          <p className="text-base leading-relaxed mb-6 text-muted-foreground">
            Hublot is recognized for its modern approach to luxury watchmaking, combining unexpected materials, bold architecture and contemporary design. Its collections are known for strong visual identity, technical presence and a distinctive fusion of materials. Explore the <Link to="/hublot/big-bang" className="text-primary underline">Big Bang</Link>, <Link to="/hublot/classic-fusion" className="text-primary underline">Classic Fusion</Link>, <Link to="/guides" className="text-primary underline">modern materials</Link> and our selection of <Link to="/hublot-gebraucht" className="text-primary underline">pre-owned Hublot</Link> watches.
          </p>
          <Link to="/hublot/story" className="inline-flex items-center justify-center px-7 py-3.5 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:opacity-90 transition-opacity">Read the Hublot Story</Link>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="aspect-[4/5] border border-border bg-card flex flex-col items-center justify-center">
          <span className="font-display text-3xl tracking-[0.2em] text-foreground/70">HUBLOT</span>
          <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mt-3">Art of Fusion</span>
        </motion.div>
      </div>
    </section>
  );
}