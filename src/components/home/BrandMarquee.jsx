import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND_DATA, BRAND_LOGOS } from '@/lib/constants';
import { motion } from 'framer-motion';

const LOGO_BRANDS = BRAND_DATA.filter(brand => BRAND_LOGOS[brand.slug]);

export default function BrandMarquee() {
  const items = [...LOGO_BRANDS, ...LOGO_BRANDS];

  return (
    <section className="py-16 md:py-24 border-y border-border">
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <span className="text-[10px] tracking-[0.3em] uppercase text-primary font-medium">Ausgewählte Manufakturen</span>
      </div>
      <div className="overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="flex gap-10 md:gap-16 whitespace-nowrap"
        >
          {items.map((brand, i) => (
            <Link
              key={`${brand.slug}-${i}`}
              to={`/brands/${brand.slug}`}
              className="flex-shrink-0 h-16 md:h-20 flex items-center justify-center group"
            >
              <img
                src={BRAND_LOGOS[brand.slug]}
                alt={`${brand.name} watches at Kariv Glamour`}
                className="h-full w-auto object-contain opacity-60 group-hover:opacity-100 transition-all duration-500 dark:invert dark:opacity-80"
              />
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}