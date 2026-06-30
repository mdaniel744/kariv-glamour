import React, { useState, useEffect } from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const COLLECTION_SLUGS = {
  'Rolex': { 'Submariner': 'rolex-submariner', 'Cosmograph Daytona': 'rolex-daytona', 'Datejust': 'rolex-datejust', 'GMT-Master II': 'rolex-gmt-master-ii' },
  'Patek Philippe': { 'Nautilus': 'patek-nautilus', 'Aquanaut': 'patek-aquanaut', 'Calatrava': 'patek-calatrava' },
  'Omega': { 'Speedmaster': 'omega-speedmaster', 'Seamaster': 'omega-seamaster' },
  'Cartier': { 'Santos de Cartier': 'cartier-santos', 'Tank': 'cartier-tank' },
  'Audemars Piguet': { 'Royal Oak': 'ap-royal-oak' }
};

export default function PopularCollections() {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    base44.entities.Collections.list('brand', 50).then(setCollections).catch(console.error);
  }, []);

  // Group by brand and pick top collections
  const popular = [];
  const brandSlugs = {
    'Rolex': 'rolex', 'Patek Philippe': 'patek-philippe', 'Omega': 'omega',
    'Cartier': 'cartier', 'Audemars Piguet': 'audemars-piguet', 'Breitling': 'breitling'
  };

  collections.forEach((col) => {
    if (COLLECTION_SLUGS[col.brand] && COLLECTION_SLUGS[col.brand][col.collectionName]) {
      popular.push(col);
    }
  });

  if (popular.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-10 md:mb-14">
          <div>
            
            <h2 className="text-3xl md:text-4xl tracking-tight [font-family:'Cormorant_Garamond',_serif] font-semibold text-[hsl(var(--primary))]">Beliebte Kollektionen</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-lg">Entdecken Sie die begehrtesten Uhren-Kollektionen</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {popular.slice(0, 8).map((col, i) =>
          <motion.div
            key={col.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}>
            
              <LocalizedLink               to={`/shop?brand=${encodeURIComponent(col.brand)}`}
              className="group block border border-border p-6 hover:border-primary/30 transition-colors">
              
                <p className="text-[10px] tracking-[0.15em] uppercase text-primary mb-2">{col.brand}</p>
                <h3 className="font-display text-lg text-foreground font-normal group-hover:text-primary transition-colors">{col.collectionName}</h3>
                <span className="inline-flex items-center gap-1 text-[10px] tracking-[0.12em] uppercase text-muted-foreground mt-3 group-hover:text-primary transition-colors">
                  Entdecken <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </LocalizedLink>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

}