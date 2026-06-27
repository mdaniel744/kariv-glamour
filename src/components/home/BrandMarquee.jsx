import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import BrandLogo from '@/components/shared/BrandLogo';
import { motion } from 'framer-motion';

export default function BrandMarquee() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await base44.entities.Brands.list();
        setBrands(data.filter(b => b.brandLogoLight));
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, []);

  const items = [...brands, ...brands];

  if (items.length === 0) return null;

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
              <BrandLogo
                slug={brand.slug}
                light={brand.brandLogoLight}
                dark={brand.brandLogoDark}
                alt={`${brand.brandName} watches at Kariv Glamour`}
                className="h-full w-auto object-contain opacity-60 group-hover:opacity-100 transition-all duration-500"
              />
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}