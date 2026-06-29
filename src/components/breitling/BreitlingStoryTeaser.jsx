import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function BreitlingStoryTeaser() {
  return (
    <section id="story" className="py-16 md:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-3 text-primary">Breitling Story</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6 text-[hsl(var(--primary))]">Breitling Story</h2>
          <p className="text-base leading-relaxed mb-6 text-muted-foreground">
            Breitling is recognized for its aviation heritage, chronograph expertise and identity as instruments for professionals. From the iconic <Link to="/breitling/navitimer" className="text-primary underline">Navitimer</Link> to the versatile <Link to="/breitling/chronomat" className="text-primary underline">Chronomat</Link>, the dive-ready <Link to="/breitling/superocean" className="text-primary underline">Superocean</Link> and the <Link to="/breitling/professional" className="text-primary underline">Professional</Link> line, Breitling watches combine technical character with purpose-built design. Explore our selection of <Link to="/breitling-uhr-gebraucht" className="text-primary underline">pre-owned Breitling</Link> watches.
          </p>
          <Link to="/breitling/story" className="inline-flex items-center justify-center px-7 py-3.5 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:opacity-90 transition-opacity">Read the Breitling Story</Link>
        </motion.div>
        {/* Asset placeholder — add Breitling story image here */}
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="aspect-[4/5] border border-border bg-card flex flex-col items-center justify-center">
          <span className="font-display text-3xl tracking-[0.2em] text-foreground/70">BREITLING</span>
          <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mt-3">Since 1884</span>
        </motion.div>
      </div>
    </section>);

}