import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PATEK_THEME } from '@/lib/patekData';

export default function PatekPhilippeFinalCTA() {
  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: PATEK_THEME.navyDark }}>
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-5" style={{ color: PATEK_THEME.champagne }}>Begin Your Journey</span>
          <h2 className="font-display text-3xl md:text-4xl font-light mb-6" style={{ color: PATEK_THEME.ivory }}>Find Your Next Patek Philippe</h2>
          <p className="text-sm leading-relaxed mb-10 max-w-xl mx-auto" style={{ color: 'rgba(248,245,239,0.8)' }}>
            Explore carefully selected Patek Philippe watches and compare references, collections, materials, complications, documentation, conditions, and prices in one refined shopping experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#patek-products"
              className="inline-flex items-center justify-center px-8 py-4 text-[11px] tracking-[0.15em] uppercase font-medium transition-all hover:opacity-90"
              style={{ backgroundColor: PATEK_THEME.champagne, color: PATEK_THEME.navyDark }}
            >
              Shop Patek Philippe Watches
            </a>
            <Link
              to="/welche-patek-philippe-kaufen"
              className="inline-flex items-center justify-center px-8 py-4 text-[11px] tracking-[0.15em] uppercase font-medium border transition-all hover:bg-white/5"
              style={{ borderColor: PATEK_THEME.champagne, color: PATEK_THEME.ivory }}
            >
              Explore Patek Philippe Buying Guide
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}