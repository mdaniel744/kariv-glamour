import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CARTIER_SEO_CARDS, CARTIER_COLORS } from '@/lib/cartierData';

export default function CartierSeoCardGrid() {
  return (
    <section id="discover" className="py-16 md:py-24" style={{ backgroundColor: CARTIER_COLORS.ivoryLight }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-3" style={{ color: CARTIER_COLORS.gold }}>Cartier entdecken</span>
          <h2 className="font-display text-3xl md:text-4xl font-light" style={{ color: CARTIER_COLORS.ink }}>Discover Cartier Watches</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CARTIER_SEO_CARDS.map((card, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: (i % 3) * 0.05 }}>
              <Link to={card.link} className="group block border p-8 transition-colors hover:opacity-95" style={{ borderColor: 'rgba(28,28,28,0.12)', backgroundColor: CARTIER_COLORS.ivory }}>
                <h3 className="font-display text-xl mb-3" style={{ color: CARTIER_COLORS.ink }}>{card.title}</h3>
                <p className="text-xs leading-relaxed mb-5" style={{ color: CARTIER_COLORS.graphite }}>{card.description}</p>
                <span className="text-[10px] tracking-[0.15em] uppercase" style={{ color: CARTIER_COLORS.red }}>Entdecken →</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}