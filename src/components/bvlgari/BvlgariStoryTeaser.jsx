import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { motion } from 'framer-motion';
import { BVLGARI_STORY_IMAGE } from '@/lib/bvlgariData';

export default function BvlgariStoryTeaser() {
  return (
    <section id="story" className="py-16 md:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-3 text-primary">Bvlgari Story</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6 text-[hsl(var(--primary))]">Bvlgari Story</h2>
          <p className="text-base leading-relaxed mb-6 text-muted-foreground">
            Founded in 1884 in Rome, Bvlgari stands for Italian luxury design, Roman jewellery heritage, and Swiss watchmaking. The <LocalizedLink to="/bvlgari/serpenti" className="text-primary underline">Serpenti</LocalizedLink> is Bvlgari's most iconic jewellery watch with serpent-inspired design. The <LocalizedLink to="/bvlgari/octo-finissimo" className="text-primary underline">Octo Finissimo</LocalizedLink> leads men's haute horlogerie with ultra-thin architecture. The <LocalizedLink to="/bvlgari/octo-roma" className="text-primary underline">Octo Roma</LocalizedLink> offers classic Roman design, the <LocalizedLink to="/bvlgari/lvcea" className="text-primary underline">Lvcea</LocalizedLink> brings elegant women's watches, and the <LocalizedLink to="/bvlgari/bulgari-bulgari" className="text-primary underline">Bulgari Bulgari</LocalizedLink> is the signature logo-bezel line. Explore our selection or browse <LocalizedLink to="/bvlgari-gebraucht" className="text-primary underline">pre-owned Bvlgari</LocalizedLink> watches.
          </p>
          <LocalizedLink to="/bvlgari/story" className="inline-flex items-center justify-center px-7 py-3.5 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:opacity-90 transition-opacity">Read the Bvlgari Story</LocalizedLink>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="aspect-[4/5] overflow-hidden bg-secondary">
          <img src={BVLGARI_STORY_IMAGE} alt="Bvlgari Aluminium watch detail" className="w-full h-full object-cover" />
        </motion.div>
      </div>
    </section>
  );
}