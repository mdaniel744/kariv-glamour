import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IWC_STORY_IMAGE } from '@/lib/iwcData';

export default function IWCStoryTeaser() {
  return (
    <section id="story" className="py-16 md:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-3 text-primary">IWC Schaffhausen Story</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6 text-[hsl(var(--primary))]">IWC Schaffhausen Story</h2>
          <p className="text-base leading-relaxed mb-6 text-muted-foreground">
            Founded in Schaffhausen in 1868, IWC is celebrated for engineering precision, aviation heritage, and classic Swiss watchmaking. From the iconic <Link to="/iwc-schaffhausen/pilots-watches" className="text-primary underline">Pilot&rsquo;s Watches</Link> and the elegant <Link to="/iwc-schaffhausen/portugieser" className="text-primary underline">Portugieser</Link>, to the dress-focused <Link to="/iwc-schaffhausen/portofino" className="text-primary underline">Portofino</Link>, the engineering-driven <Link to="/iwc-schaffhausen/ingenieur" className="text-primary underline">Ingenieur</Link>, and the dive-focused <Link to="/iwc-schaffhausen/aquatimer" className="text-primary underline">Aquatimer</Link>, IWC combines technical design with timeless style. Explore our selection of <Link to="/iwc-schaffhausen-gebraucht" className="text-primary underline">pre-owned IWC</Link> watches.
          </p>
          <Link to="/iwc-schaffhausen/story" className="inline-flex items-center justify-center px-7 py-3.5 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:opacity-90 transition-opacity">Read the IWC Story</Link>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="aspect-[4/5] overflow-hidden bg-secondary">
          <img src={IWC_STORY_IMAGE} alt="IWC Schaffhausen watch" className="w-full h-full object-cover" />
        </motion.div>
      </div>
    </section>);

}