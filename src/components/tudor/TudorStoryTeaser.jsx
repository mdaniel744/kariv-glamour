import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { motion } from 'framer-motion';
import { TUDOR_STORY_IMAGE } from '@/lib/tudorData';

export default function TudorStoryTeaser() {
  return (
    <section id="story" className="py-16 md:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-3 text-primary">Tudor Story</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6 text-[hsl(var(--primary))]">Tudor Story</h2>
          <p className="text-base leading-relaxed mb-6 text-muted-foreground">
            Founded in 1926 by Hans Wilsdorf, the creator of Rolex, Tudor stands for robust Swiss watchmaking with tool-watch character. The <LocalizedLink to="/tudor/black-bay" className="text-primary underline">Black Bay</LocalizedLink> is Tudor's most recognizable dive watch family, known for vintage-inspired design and snowflake hands. The <LocalizedLink to="/tudor/pelagos" className="text-primary underline">Pelagos</LocalizedLink> brings professional 500M dive performance in titanium, the <LocalizedLink to="/tudor/tudor-royal" className="text-primary underline">Tudor Royal</LocalizedLink> delivers versatile everyday luxury, and the <LocalizedLink to="/tudor/ranger" className="text-primary underline">Ranger</LocalizedLink> embodies field-watch simplicity. Explore our selection or browse <LocalizedLink to="/tudor-gebraucht" className="text-primary underline">pre-owned Tudor</LocalizedLink> watches.
          </p>
          <LocalizedLink to="/tudor/story" className="inline-flex items-center justify-center px-7 py-3.5 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:opacity-90 transition-opacity">Read the Tudor Story</LocalizedLink>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="aspect-[4/5] overflow-hidden bg-secondary">
          <img src={TUDOR_STORY_IMAGE} alt="Tudor Black Bay 58 watch detail" className="w-full h-full object-cover" />
        </motion.div>
      </div>
    </section>
  );
}