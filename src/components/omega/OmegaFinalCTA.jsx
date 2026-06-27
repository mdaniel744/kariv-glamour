import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { OMEGA_THEME } from '@/lib/omegaData';

export default function OmegaFinalCTA() {
  return (
    <section className="py-20 md:py-32" style={{ backgroundColor: OMEGA_THEME.white }}>
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-5" style={{ color: OMEGA_THEME.red }}>Your Next Timepiece</span>
          <h2 className="font-display text-4xl md:text-5xl font-light mb-6" style={{ color: OMEGA_THEME.charcoal }}>
            Find Your Next Omega
          </h2>
          <p className="text-sm md:text-base leading-relaxed mb-10 max-w-xl mx-auto" style={{ color: OMEGA_THEME.greyText }}>
            Explore carefully selected Omega watches and compare collections, references, calibres, materials, conditions, documentation and prices in one refined shopping experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#omega-products"
              className="inline-flex items-center justify-center px-8 py-4 text-[11px] tracking-[0.15em] uppercase font-medium transition-all hover:opacity-90"
              style={{ backgroundColor: OMEGA_THEME.red, color: OMEGA_THEME.white }}
            >
              Shop Omega Watches
            </a>
            <Link
              to="/welche-omega-kaufen"
              className="inline-flex items-center justify-center px-8 py-4 text-[11px] tracking-[0.15em] uppercase font-medium border transition-all hover:bg-black/5"
              style={{ borderColor: OMEGA_THEME.red, color: OMEGA_THEME.red }}
            >
              Explore Omega Buying Guide
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}