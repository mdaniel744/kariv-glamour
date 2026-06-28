import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CARTIER_STORY_IMAGE } from '@/lib/cartierData';

export default function CartierStorySection() {
  return (
    <section id="story" className="py-16 md:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-3 text-primary">Cartier Story</span>
          <h2 className="font-display text-3xl md:text-4xl font-light mb-6 text-foreground">Cartier Story</h2>
          <p className="text-base leading-relaxed mb-6 text-muted-foreground">
            Cartier has shaped luxury design through a unique combination of jewellery expertise, watchmaking creativity, and instantly recognizable forms. Its watches are often defined by strong shapes, Roman numerals, elegant proportions, and a refined sense of Parisian style. Explore the <Link to="/cartier-tank-kaufen" className="underline text-primary">Cartier Tank</Link>, <Link to="/cartier-santos-kaufen" className="underline text-primary">Santos de Cartier</Link>, <Link to="/cartier-damen" className="underline text-primary">Cartier watches for women</Link> and <Link to="/cartier-herren" className="underline text-primary">Cartier watches for men</Link>.
          </p>
          <Link to="/cartier/story" className="inline-flex items-center justify-center px-7 py-3.5 text-[11px] tracking-[0.15em] uppercase font-medium transition-opacity hover:opacity-90 bg-primary text-primary-foreground">Read the Cartier Story</Link>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="aspect-[4/5] overflow-hidden border border-border">
          <img src={CARTIER_STORY_IMAGE} alt="Cartier watch story" loading="lazy" className="w-full h-full object-cover" />
        </motion.div>
      </div>
    </section>
  );
}