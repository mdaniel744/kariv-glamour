import React, { useState, useEffect } from 'react';
import ProductCard from '@/components/shared/ProductCard';
import SectionHeading from '@/components/shared/SectionHeading';
import { useLanguage } from '@/lib/languageContext';

export default function FeaturedProducts({ title = "Featured Timepieces", subtitle, filter = {}, initialProducts = null, linkTo = "/shop", index, limit = 4 }) {
  const { locale } = useLanguage();
  const [products, setProducts] = useState(initialProducts ?? []);
  const [loading, setLoading] = useState(initialProducts === null);

  useEffect(() => {
    // The server already fetched this section for the page's own locale. An
    // empty server result is still a complete result, not a reason to fall
    // back to a client-side fetch straight to Supabase from the visitor's
    // own device — only missing data (no server render happened at all)
    // triggers this fallback.
    if (initialProducts !== null) return;
    let active = true;
    const load = async () => {
      try {
        // The server-rendered home page already supplies these products. Keep
        // the legacy client fallback out of its initial JavaScript bundle.
        const [{ dataClient }, { asArray }] = await Promise.all([
          import('@/lib/dataClient'),
          import('@/lib/base44Data'),
        ]);
        const data = asArray(await dataClient.entities.Products.filter(filter, '-created_date', limit, 0, locale));
        if (active) setProducts(data);
      } catch (e) {
        console.error(e);
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => { active = false; };
  }, [locale, initialProducts]);

  if (loading) {
    return (
      <section className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading index={index} title={title} subtitle={subtitle} linkTo={linkTo} />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
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
    <section className="py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading index={index} title={title} subtitle={subtitle} linkTo={linkTo} />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
