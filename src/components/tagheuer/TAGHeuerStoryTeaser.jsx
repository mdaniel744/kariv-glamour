import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { motion } from 'framer-motion';
import { TH_STORY_IMAGE } from '@/lib/tagHeuerData';

export default function TAGHeuerStoryTeaser() {
  return (
    <section id="story" className="py-16 md:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-3 text-primary">TAG Heuer Story</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6 text-[hsl(var(--primary))]">TAG Heuer Story</h2>
          <p className="text-base leading-relaxed mb-6 text-muted-foreground">
            Founded in 1860 by Edouard Heuer, TAG Heuer is rooted in motorsport, precision timing, and chronograph innovation. The <LocalizedLink to="/tag-heuer/carrera" className="text-primary underline">Carrera</LocalizedLink> was born on the racetrack in 1963, while the square-case <LocalizedLink to="/tag-heuer/monaco" className="text-primary underline">Monaco</LocalizedLink> became an icon through Steve McQueen. The <LocalizedLink to="/tag-heuer/aquaracer" className="text-primary underline">Aquaracer</LocalizedLink> brings 300M dive performance, the <LocalizedLink to="/tag-heuer/formula-1" className="text-primary underline">Formula 1</LocalizedLink> delivers accessible sport, and the <LocalizedLink to="/tag-heuer/connected" className="text-primary underline">Connected</LocalizedLink> Calibre E5 represents TAG Heuer's luxury smartwatch vision. Explore our selection or browse <LocalizedLink to="/tag-heuer-gebraucht" className="text-primary underline">pre-owned TAG Heuer</LocalizedLink> watches.
          </p>
          <LocalizedLink to="/tag-heuer/story" className="inline-flex items-center justify-center px-7 py-3.5 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:opacity-90 transition-opacity">Read the TAG Heuer Story</LocalizedLink>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="aspect-[4/5] overflow-hidden bg-secondary">
          <img src={TH_STORY_IMAGE} alt="TAG Heuer Monaco watch detail" className="w-full h-full object-cover" />
        </motion.div>
      </div>
    </section>
  );
}