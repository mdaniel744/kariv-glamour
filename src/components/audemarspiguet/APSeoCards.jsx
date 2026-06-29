import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AP_SEO_CARDS } from '@/lib/audemarsPiguetData';

export default function APSeoCards() {
  return (
    <section id="discover" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-3 text-primary">Audemars Piguet entdecken</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">Discover Audemars Piguet Watches</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {AP_SEO_CARDS.map((card, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: (i % 3) * 0.05 }}>
              <Link to={card.link} className="group block border border-border bg-card p-8 hover:border-primary/40 transition-colors">
                <h3 className="font-display text-xl font-medium mb-3 text-foreground">{card.title}</h3>
                <p className="text-xs leading-relaxed mb-5 text-muted-foreground">{card.description}</p>
                <span className="text-[10px] tracking-[0.15em] uppercase text-primary">Entdecken &rarr;</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}