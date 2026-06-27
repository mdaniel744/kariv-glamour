import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PATEK_THEME } from '@/lib/patekData';

export default function PatekPhilippeIntro() {
  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: PATEK_THEME.ivory }}>
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-5" style={{ color: PATEK_THEME.navy }}>
            Introduction
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-light mb-8" style={{ color: PATEK_THEME.graphite }}>
            An Icon of Fine Watchmaking
          </h2>
          <p className="text-sm md:text-base leading-relaxed" style={{ color: PATEK_THEME.graphite }}>
            Patek Philippe is one of the most respected names in haute horlogerie, admired for refined design, complex watchmaking, family heritage, and exceptional collector appeal. From elegant{' '}
            <Link to="/patek-philippe/calatrava" className="underline decoration-dotted hover:opacity-70" style={{ color: PATEK_THEME.navy }}>Calatrava watches</Link>{' '}
            to highly coveted{' '}
            <Link to="/patek-philippe-nautilus-kaufen" className="underline decoration-dotted hover:opacity-70" style={{ color: PATEK_THEME.navy }}>Nautilus</Link>{' '}
            and{' '}
            <Link to="/patek-philippe-aquanaut-kaufen" className="underline decoration-dotted hover:opacity-70" style={{ color: PATEK_THEME.navy }}>Aquanaut</Link>{' '}
            models, Patek Philippe represents a world where craftsmanship, rarity, and tradition meet. Explore{' '}
            <Link to="/patek-philippe/grand-complications" className="underline decoration-dotted hover:opacity-70" style={{ color: PATEK_THEME.navy }}>complex watchmaking</Link>{' '}
            and discover the{' '}
            <Link to="/welche-patek-philippe-kaufen" className="underline decoration-dotted hover:opacity-70" style={{ color: PATEK_THEME.navy }}>collector appeal</Link>{' '}
            that defines this extraordinary brand. Understanding{' '}
            <Link to="/condition-grading" className="underline decoration-dotted hover:opacity-70" style={{ color: PATEK_THEME.navy }}>condition grading</Link>{' '}
            is essential when considering a Patek Philippe purchase.
          </p>
        </motion.div>
      </div>
    </section>
  );
}