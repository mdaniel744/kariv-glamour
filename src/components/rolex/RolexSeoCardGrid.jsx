import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ROLEX_SEO_CARDS } from '@/lib/rolexData';

export default function RolexSeoCardGrid() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-4 text-primary">Discover</span>
          <h2 className="font-display text-3xl md:text-4xl font-light text-foreground">Discover Rolex Watches</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {ROLEX_SEO_CARDS.map((card, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Link to={card.link} className="group block h-full">
                <div className="relative aspect-[4/3] overflow-hidden mb-4 bg-card">
                  <img src={card.image} alt={card.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-display text-lg font-light mb-2 text-foreground">{card.title}</h3>
                <p className="text-xs leading-relaxed mb-3 text-muted-foreground">{card.description}</p>
                <span className="text-[10px] tracking-[0.12em] uppercase group-hover:opacity-70 text-primary">Explore →</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}