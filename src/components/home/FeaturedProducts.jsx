import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import ProductCard from '@/components/shared/ProductCard';
import SectionHeading from '@/components/shared/SectionHeading';

export default function FeaturedProducts({ title = "Featured Timepieces", subtitle, filter = {}, linkTo = "/shop", index, limit = 4 }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await base44.entities.Products.filter(filter, '-created_date', limit);
        setProducts(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading index={index} title={title} subtitle={subtitle} linkTo={linkTo} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(limit)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-card mb-4" />
                <div className="h-3 bg-card w-20 mb-2" />
                <div className="h-3 bg-card w-full mb-2" />
                <div className="h-3 bg-card w-16" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading index={index} title={title} subtitle={subtitle} linkTo={linkTo} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}