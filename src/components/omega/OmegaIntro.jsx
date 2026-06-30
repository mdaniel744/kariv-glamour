import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { motion } from 'framer-motion';

export default function OmegaIntro() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-[10px] tracking-[0.3em] uppercase block mb-5 text-primary">The Maison</motion.span>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-3xl md:text-4xl mb-8 [font-family:'Cormorant_Garamond',_serif] font-semibold text-[hsl(var(--primary))]">Swiss Precision, Space Heritage and Ocean Performance</motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-sm md:text-base leading-relaxed text-muted-foreground">
          Omega is one of Switzerland's most recognized watchmakers, admired for precision, technical innovation, sport timing, space history, and ocean-ready performance. From the{' '}
          <LocalizedLink to="/omega-moonwatch-kaufen" className="underline decoration-dotted hover:opacity-70 text-primary">Speedmaster Moonwatch</LocalizedLink>{' '}
          to the{' '}
          <LocalizedLink to="/omega-seamaster-diver-300m-kaufen" className="underline decoration-dotted hover:opacity-70 text-primary">Seamaster Diver 300M</LocalizedLink>,{' '}
          <LocalizedLink to="/omega-seamaster-planet-ocean-kaufen" className="underline decoration-dotted hover:opacity-70 text-primary">Planet Ocean</LocalizedLink>,{' '}
          <LocalizedLink to="/omega-constellation-kaufen" className="underline decoration-dotted hover:opacity-70 text-primary">Constellation</LocalizedLink>{' '}
          and{' '}
          <LocalizedLink to="/omega-de-ville-kaufen" className="underline decoration-dotted hover:opacity-70 text-primary">De Ville</LocalizedLink>{' '}
          collections, Omega offers a wide range of luxury watches for collectors, professionals and everyday wear. Explore{' '}
          <LocalizedLink to="/omega-gebraucht-kaufen" className="underline decoration-dotted hover:opacity-70 text-primary">pre-owned Omega watches</LocalizedLink>{' '}
          with clear{' '}
          <LocalizedLink to="/condition-grading" className="underline decoration-dotted hover:opacity-70 text-primary">condition grading</LocalizedLink>{' '}
          and a refined shopping experience.
        </motion.p>
      </div>
    </section>);

}