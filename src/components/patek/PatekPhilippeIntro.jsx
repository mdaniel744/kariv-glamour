import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { motion } from 'framer-motion';

export default function PatekPhilippeIntro() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-5 text-primary">Introduction</span>
          <h2 className="text-3xl md:text-4xl mb-8 [font-family:'Cormorant_Garamond',_serif] font-semibold text-[hsl(var(--primary))]">An Icon of Fine Watchmaking</h2>
          <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
            Patek Philippe is one of the most respected names in haute horlogerie, admired for refined design, complex watchmaking, family heritage, and exceptional collector appeal. From elegant{' '}
            <LocalizedLink to="/patek-philippe/calatrava" className="underline decoration-dotted hover:opacity-70 text-primary">Calatrava watches</LocalizedLink>{' '}
            to highly coveted{' '}
            <LocalizedLink to="/patek-philippe-nautilus-kaufen" className="underline decoration-dotted hover:opacity-70 text-primary">Nautilus</LocalizedLink>{' '}
            and{' '}
            <LocalizedLink to="/patek-philippe-aquanaut-kaufen" className="underline decoration-dotted hover:opacity-70 text-primary">Aquanaut</LocalizedLink>{' '}
            models, Patek Philippe represents a world where craftsmanship, rarity, and tradition meet. Explore{' '}
            <LocalizedLink to="/patek-philippe/grand-complications" className="underline decoration-dotted hover:opacity-70 text-primary">complex watchmaking</LocalizedLink>{' '}
            and discover the{' '}
            <LocalizedLink to="/welche-patek-philippe-kaufen" className="underline decoration-dotted hover:opacity-70 text-primary">collector appeal</LocalizedLink>{' '}
            that defines this extraordinary brand. Understanding{' '}
            <LocalizedLink to="/condition-grading" className="underline decoration-dotted hover:opacity-70 text-primary">condition grading</LocalizedLink>{' '}
            is essential when considering a Patek Philippe purchase.
          </p>
        </motion.div>
      </div>
    </section>);

}