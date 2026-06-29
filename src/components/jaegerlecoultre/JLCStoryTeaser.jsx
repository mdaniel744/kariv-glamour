import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { JLC_STORY_IMAGE } from '@/lib/jaegerLeCoultreData';

export default function JLCStoryTeaser() {
  return (
    <section id="story" className="py-16 md:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-3 text-primary">Jaeger-LeCoultre Story</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6 text-foreground">Jaeger-LeCoultre Story</h2>
          <p className="text-base leading-relaxed mb-6 text-muted-foreground">
            Founded in 1833, Jaeger-LeCoultre is celebrated for refined Swiss watchmaking, the iconic <Link to="/jaeger-lecoultre/reverso" className="text-primary underline">Reverso</Link> case, ultra-thin dress watches, and high horology complications. From the reversible <Link to="/jaeger-lecoultre/reverso" className="text-primary underline">Reverso</Link> and the slim <Link to="/jaeger-lecoultre/master-ultra-thin" className="text-primary underline">Master Ultra Thin</Link>, to the classic <Link to="/jaeger-lecoultre/master-control" className="text-primary underline">Master Control</Link>, the sport-focused <Link to="/jaeger-lecoultre/polaris" className="text-primary underline">Polaris</Link>, and the high-watchmaking <Link to="/jaeger-lecoultre/duometre" className="text-primary underline">Duometre</Link>, JLC combines technical mastery with timeless elegance. Explore our selection of <Link to="/gebrauchte-jaeger-lecoultre" className="text-primary underline">pre-owned Jaeger-LeCoultre</Link> watches.
          </p>
          <Link to="/jaeger-lecoultre/story" className="inline-flex items-center justify-center px-7 py-3.5 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:opacity-90 transition-opacity">Read the JLC Story</Link>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="aspect-[4/5] overflow-hidden bg-secondary">
          <img src={JLC_STORY_IMAGE} alt="Jaeger-LeCoultre watch" className="w-full h-full object-cover" />
        </motion.div>
      </div>
    </section>
  );
}