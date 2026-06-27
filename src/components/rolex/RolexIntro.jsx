import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function RolexIntro() {
  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: '#FAF7F2' }}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[10px] tracking-[0.3em] uppercase block mb-5"
          style={{ color: '#0B4D3C' }}
        >
          The Maison
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-3xl md:text-4xl font-light mb-8"
          style={{ color: '#1C1C1C' }}
        >
          An Icon of Swiss Watchmaking
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-sm md:text-base leading-relaxed"
          style={{ color: '#2A2018' }}
        >
          Rolex watches are admired for their precision, durability, and unmistakable design language. From{' '}
          <Link to="/rolex/datejust" className="underline decoration-dotted hover:opacity-70" style={{ color: '#0B4D3C' }}>elegant classics</Link>{' '}
          to{' '}
          <Link to="/rolex/submariner" className="underline decoration-dotted hover:opacity-70" style={{ color: '#0B4D3C' }}>professional tool watches</Link>, Rolex has created some of the most recognizable timepieces in modern watchmaking. At Kariv Glamour, customers can explore{' '}
          <a href="#rolex-products" className="underline decoration-dotted hover:opacity-70" style={{ color: '#0B4D3C' }}>carefully selected Rolex watches</a>{' '}
          with clear product details, transparent{' '}
          <Link to="/condition-grading" className="underline decoration-dotted hover:opacity-70" style={{ color: '#0B4D3C' }}>condition grading</Link>, and a refined shopping experience.
        </motion.p>
      </div>
    </section>
  );
}