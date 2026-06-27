import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { BRAND_DATA } from '@/lib/constants';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';

export default function Brands() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    base44.entities.Brands.list('-created_date', 50).then(setBrands).catch(console.error);
  }, []);

  const allBrands = BRAND_DATA.map(bd => {
    const dbBrand = brands.find(b => b.slug === bd.slug);
    return { ...bd, ...dbBrand };
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <div className="flex items-center gap-2 text-[10px] tracking-[0.1em] uppercase text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground">Start</Link>
        <ChevronRight size={10} />
        <span className="text-foreground">Marken</span>
      </div>

      <div className="mb-14">
        <span className="text-[10px] tracking-[0.3em] uppercase text-primary mb-2 block">Die Manufakturen</span>
        <h1 className="font-display text-4xl md:text-6xl font-light text-foreground tracking-tight">Unsere Marken</h1>
        <p className="text-sm text-muted-foreground mt-3 max-w-xl">
          Entdecken Sie Zeitmesser von den renommiertesten Uhrenherstellern der Welt. Jede Marke repräsentiert jahrhundertelange horologische Exzellenz.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {allBrands.map((brand, i) => (
          <motion.div
            key={brand.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <Link to={`/brands/${brand.slug}`} className="group block border border-border hover:border-primary/30 transition-all">
              <div className="aspect-[16/9] bg-card overflow-hidden relative">
                {brand.heroImage ? (
                  <img src={brand.heroImage} alt={brand.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-3xl text-muted-foreground/30 font-light tracking-[0.1em]">{brand.name}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
              </div>
              <div className="p-6">
                <h2 className="font-display text-xl text-foreground font-light group-hover:text-primary transition-colors">{brand.name}</h2>
                {brand.shortDescription && (
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">{brand.shortDescription}</p>
                )}
                <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.12em] uppercase text-primary mt-4 group-hover:gap-3 transition-all">
                  Kollektion entdecken <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}