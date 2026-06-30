import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { motion } from 'framer-motion';
import { AP_HERO_IMAGE } from '@/lib/audemarsPiguetData';

export default function APStoryTeaser() {
  return (
    <section id="story" className="py-16 md:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-3 text-primary">Audemars Piguet Story</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6 text-foreground">Audemars Piguet Story</h2>
          <p className="text-base leading-relaxed mb-6 text-muted-foreground">
            Audemars Piguet is celebrated for bold case architecture, integrated bracelet design, high-end finishing and complications. From the iconic <LocalizedLink to="/audemars-piguet/royal-oak" className="text-primary underline">Royal Oak</LocalizedLink> designed by Gerald Genta in 1972, to the sportier <LocalizedLink to="/audemars-piguet/royal-oak-offshore" className="text-primary underline">Royal Oak Offshore</LocalizedLink>, the technical <LocalizedLink to="/audemars-piguet/royal-oak-concept" className="text-primary underline">Royal Oak Concept</LocalizedLink>, and the modern <LocalizedLink to="/audemars-piguet/code-1159" className="text-primary underline">Code 11.59</LocalizedLink>, AP watches combine architectural design with precision and complications. Explore our selection of <LocalizedLink to="/audemars-piguet-gebraucht" className="text-primary underline">pre-owned AP</LocalizedLink> watches.
          </p>
          <LocalizedLink to="/audemars-piguet/story" className="inline-flex items-center justify-center px-7 py-3.5 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:opacity-90 transition-opacity">Read the AP Story</LocalizedLink>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="aspect-[4/5] overflow-hidden bg-black">
          <img src={AP_HERO_IMAGE} alt="Audemars Piguet Royal Oak" className="w-full h-full object-cover" />
        </motion.div>
      </div>
    </section>
  );
}