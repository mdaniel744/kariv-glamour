import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { OMEGA_THEME } from '@/lib/omegaData';

export default function OmegaEditorialSection({ section, reverse }) {
  return (
    <section id={section.id} className="py-16 md:py-24" style={{ backgroundColor: OMEGA_THEME.white }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`grid md:grid-cols-2 gap-12 md:gap-16 items-center ${reverse ? 'md:[direction:rtl]' : ''}`}>
          <motion.div
            initial={{ opacity: 0, x: reverse ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="[direction:ltr]"
          >
            <div className="aspect-[4/3] overflow-hidden" style={{ backgroundColor: OMEGA_THEME.lightBg }}>
              <img src={section.image} alt={section.title} loading="lazy" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="[direction:ltr]"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase block mb-4" style={{ color: OMEGA_THEME.red }}>{section.eyebrow}</span>
            <h2 className="font-display text-3xl md:text-4xl font-light mb-6" style={{ color: OMEGA_THEME.charcoal }}>{section.title}</h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: OMEGA_THEME.greyText }}>{section.description}</p>
            <div className="flex flex-wrap gap-x-4 gap-y-2 mb-8">
              {section.internalLinks?.map((link, i) => (
                <Link key={i} to={link.link} className="text-[11px] underline decoration-dotted hover:opacity-70" style={{ color: OMEGA_THEME.red }}>
                  {link.text}
                </Link>
              ))}
            </div>
            <Link
              to={section.link}
              className="inline-flex items-center px-8 py-4 text-[11px] tracking-[0.15em] uppercase font-medium border transition-all hover:bg-black/5"
              style={{ borderColor: OMEGA_THEME.red, color: OMEGA_THEME.red }}
            >
              {section.cta}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}