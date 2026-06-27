import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function RolexFinalCTA() {
  return (
    <section className="py-20 md:py-32" style={{ backgroundColor: '#FAF7F2' }}>
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-5" style={{ color: '#C5A572' }}>Your Next Timepiece</span>
          <h2 className="font-display text-4xl md:text-5xl font-light mb-6" style={{ color: '#1C1C1C' }}>
            Find Your Next Rolex
          </h2>
          <p className="text-sm md:text-base leading-relaxed mb-10 max-w-xl mx-auto" style={{ color: '#2A2018' }}>
            Explore carefully selected Rolex watches and compare models, references, materials, conditions, and prices in one refined shopping experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#rolex-products"
              className="inline-flex items-center justify-center px-8 py-4 text-[11px] tracking-[0.15em] uppercase font-medium transition-all hover:opacity-90"
              style={{ backgroundColor: '#0B4D3C', color: '#FAF7F2' }}
            >
              Shop Rolex Watches
            </a>
            <Link
              to="/welche-rolex-kaufen"
              className="inline-flex items-center justify-center px-8 py-4 text-[11px] tracking-[0.15em] uppercase font-medium border transition-all hover:bg-black/5"
              style={{ borderColor: '#0B4D3C', color: '#0B4D3C' }}
            >
              Explore Rolex Buying Guide
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}