import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND_DATA } from '@/lib/constants';
import { motion } from 'framer-motion';

export default function BrandMarquee() {
  return (
    <section className="py-16 md:py-24 border-y border-border">
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <span className="text-[10px] tracking-[0.3em] uppercase text-primary font-medium">Ausgewählte Manufakturen</span>
      </div>
      <div className="overflow-hidden">
        <motion.div
          animate={{ x: [0, -1500] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex gap-12 md:gap-16 whitespace-nowrap"
        >
          {[...BRAND_DATA, ...BRAND_DATA].map((brand, i) => (
            <Link
              key={`${brand.slug}-${i}`}
              to={`/brands/${brand.slug}`}
              className="flex-shrink-0 text-xl md:text-2xl font-display font-light text-muted-foreground/40 hover:text-primary transition-colors duration-500 tracking-[0.05em]"
            >
              {brand.name}
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}