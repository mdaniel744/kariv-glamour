import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { motion } from 'framer-motion';
import { GP_STORY_IMAGE } from '@/lib/girardPerregauxData';

export default function GirardPerregauxStoryTeaser() {
  return (
    <section id="story" className="py-16 md:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-3 text-primary">Girard-Perregaux Story</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6 text-[hsl(var(--primary))]">Girard-Perregaux Story</h2>
          <p className="text-base leading-relaxed mb-6 text-muted-foreground">
            Founded in 1791, Girard-Perregaux is one of the oldest Swiss watch manufacturers, standing for haute horlogerie, visible mechanics, and integrated-bracelet design. The <LocalizedLink to="/girard-perregaux/laureato" className="text-primary underline">Laureato</LocalizedLink> is the brand's sport-chic icon with octagonal bezel. The <LocalizedLink to="/girard-perregaux/1966" className="text-primary underline">1966</LocalizedLink> collection offers classic dress watches. The <LocalizedLink to="/girard-perregaux/vintage-1945" className="text-primary underline">Vintage 1945</LocalizedLink> brings Art Deco charm. The <LocalizedLink to="/girard-perregaux/bridges" className="text-primary underline">Bridges</LocalizedLink> make the mechanics visible. And the rare <LocalizedLink to="/girard-perregaux-jackpot" className="text-primary underline">Jackpot Tourbillon</LocalizedLink> is a high-complication collector piece. Explore our selection or browse <LocalizedLink to="/girard-perregaux-gebraucht" className="text-primary underline">pre-owned Girard-Perregaux</LocalizedLink> watches.
          </p>
          <LocalizedLink to="/girard-perregaux/story" className="inline-flex items-center justify-center px-7 py-3.5 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:opacity-90 transition-opacity">Read the Girard-Perregaux Story</LocalizedLink>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="aspect-[4/5] overflow-hidden bg-secondary">
          <img src={GP_STORY_IMAGE} alt="Girard-Perregaux Laureato Fifty watch detail" className="w-full h-full object-cover" />
        </motion.div>
      </div>
    </section>
  );
}