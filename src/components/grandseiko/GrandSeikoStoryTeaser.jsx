import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { motion } from 'framer-motion';
import { GS_STORY_IMAGE } from '@/lib/grandSeikoData';

export default function GrandSeikoStoryTeaser() {
  return (
    <section id="story" className="py-16 md:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-3 text-primary">Grand Seiko Story</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6 text-[hsl(var(--primary))]">Grand Seiko Story</h2>
          <p className="text-base leading-relaxed mb-6 text-muted-foreground">
            Grand Seiko raises the pure essentials of watchmaking to the level of art. Born in Japan in 1960, the brand is guided by the Grammar of Design — a philosophy of precision, balance, and restraint. Zaratsu polishing creates distortion-free mirror surfaces, while <LocalizedLink to="/grand-seiko-spring-drive" className="text-primary underline">Spring Drive</LocalizedLink> movements achieve approximately one second per day accuracy. Nature-inspired dials like the <LocalizedLink to="/grand-seiko-snowflake" className="text-primary underline">Snowflake</LocalizedLink> and <LocalizedLink to="/grand-seiko-shunbun" className="text-primary underline">Shunbun</LocalizedLink> reflect the beauty of Japan's four seasons. Explore the <LocalizedLink to="/grand-seiko/heritage" className="text-primary underline">Heritage</LocalizedLink>, <LocalizedLink to="/grand-seiko/elegance" className="text-primary underline">Elegance</LocalizedLink>, <LocalizedLink to="/grand-seiko/sport" className="text-primary underline">Sport</LocalizedLink>, <LocalizedLink to="/grand-seiko/evolution-9" className="text-primary underline">Evolution 9</LocalizedLink>, and <LocalizedLink to="/grand-seiko/masterpiece" className="text-primary underline">Masterpiece</LocalizedLink> collections, or browse <LocalizedLink to="/grand-seiko-gebraucht" className="text-primary underline">pre-owned Grand Seiko</LocalizedLink> watches.
          </p>
          <LocalizedLink to="/grand-seiko/story" className="inline-flex items-center justify-center px-7 py-3.5 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:opacity-90 transition-opacity">Read the Grand Seiko Story</LocalizedLink>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="aspect-[4/5] overflow-hidden bg-secondary">
          <img src={GS_STORY_IMAGE} alt="Grand Seiko watch detail" className="w-full h-full object-cover" />
        </motion.div>
      </div>
    </section>);

}