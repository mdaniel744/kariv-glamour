import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { motion } from 'framer-motion';
import { PANERAI_STORY_IMAGE } from '@/lib/paneraiData';

export default function PaneraiStoryTeaser() {
  return (
    <section id="story" className="py-16 md:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-3 text-primary">Panerai Story</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6 text-[hsl(var(--primary))]">Panerai Story</h2>
          <p className="text-base leading-relaxed mb-6 text-muted-foreground">
            Founded in 1860 in Florence, Italy, Panerai stands for bold Italian design, Swiss watchmaking, and military diving heritage. The <LocalizedLink to="/panerai/luminor" className="text-primary underline">Luminor</LocalizedLink> with its iconic crown-protecting bridge is Panerai's most recognizable collection. The <LocalizedLink to="/panerai/radiomir" className="text-primary underline">Radiomir</LocalizedLink> carries historic vintage character, the <LocalizedLink to="/panerai/submersible" className="text-primary underline">Submersible</LocalizedLink> brings professional dive performance, and the <LocalizedLink to="/panerai/luminor-due" className="text-primary underline">Luminor Due</LocalizedLink> offers slimmer, more elegant proportions. Explore our selection or browse <LocalizedLink to="/panerai-gebraucht" className="text-primary underline">pre-owned Panerai</LocalizedLink> watches.
          </p>
          <LocalizedLink to="/panerai/story" className="inline-flex items-center justify-center px-7 py-3.5 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:opacity-90 transition-opacity">Read the Panerai Story</LocalizedLink>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="aspect-[4/5] overflow-hidden bg-secondary">
          <img src={PANERAI_STORY_IMAGE} alt="Panerai Luminor Marina watch detail" className="w-full h-full object-cover" />
        </motion.div>
      </div>
    </section>
  );
}