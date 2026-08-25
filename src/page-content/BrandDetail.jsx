import React, { useState, useEffect } from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { dataClient } from '@/lib/dataClient';
import { asArray } from '@/lib/base44Data';
import { BRAND_DATA } from '@/lib/constants';
import { useLocalizedField } from '@/lib/localize';
import ProductCard from '@/components/shared/ProductCard';
import TrustBar from '@/components/shared/TrustBar';
import { motion } from 'framer-motion';

const COPY = {
  de: {
    home: 'Start',
    brands: 'Marken',
    manufacture: 'Die Manufaktur',
    collections: 'Kollektionen',
    available: 'Verfügbare Zeitmesser',
    watchesAvailable: (count) => `${count} Uhr${count !== 1 ? 'en' : ''} verfügbar`,
    viewAll: 'Alle im Shop ansehen →',
    empty: (brandName) => `Derzeit sind keine ${brandName} Uhren verfügbar. Bitte kommen Sie später zurück.`,
    faq: 'Häufig gestellte Fragen',
    fallback: (brandName) => `Entdecken Sie unsere kuratierte Auswahl an authentischen ${brandName} Zeitmessern. Jede Uhr wurde von unserem Team horologischer Experten inspiziert.`,
  },
  en: {
    home: 'Home',
    brands: 'Brands',
    manufacture: 'The Manufacture',
    collections: 'Collections',
    available: 'Available Timepieces',
    watchesAvailable: (count) => `${count} watch${count !== 1 ? 'es' : ''} available`,
    viewAll: 'View all in the shop →',
    empty: (brandName) => `No ${brandName} watches are currently available. Please check back soon.`,
    faq: 'Frequently Asked Questions',
    fallback: (brandName) => `Discover our curated selection of authentic ${brandName} timepieces. Each watch is presented with transparent details for a confident purchase.`,
  },
};

export default function BrandDetail({
  slug: slugProp,
  initialBrand = null,
  initialProducts = [],
  initialCollections = [],
}) {
  const slug = slugProp || (typeof window !== 'undefined' ? window.location.pathname.split('/').filter(Boolean).pop() : '');
  const [brand, setBrand] = useState(initialBrand);
  const [products, setProducts] = useState(initialProducts);
  const [collections, setCollections] = useState(initialCollections);
  const [loading, setLoading] = useState(!initialBrand && initialProducts.length === 0 && initialCollections.length === 0);
  const { localize, localizeArray, locale } = useLocalizedField();
  const copy = COPY[locale] || COPY.de;

  const staticBrand = BRAND_DATA.find((b) => b.slug === slug);

  useEffect(() => {
    if (initialBrand || initialProducts.length > 0 || initialCollections.length > 0) {
      setLoading(false);
      window.scrollTo(0, 0);
      return;
    }

    const load = async () => {
      setLoading(true);
      try {
        const brands = asArray(await dataClient.entities.Brands.filter({ slug }));
        if (brands.length > 0) setBrand(brands[0]);

        const brandName = staticBrand?.name || slug;
        const prods = asArray(await dataClient.entities.Products.filter({ brand: brandName }, '-created_date', 50));
        setProducts(prods);

        const cols = asArray(await dataClient.entities.Collections.filter({ brand: brandName }, 'collectionName', 50));
        setCollections(cols);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
    window.scrollTo(0, 0);
  }, [slug, initialBrand, initialProducts, initialCollections]);

  const brandName = brand?.brandName || staticBrand?.name || slug;
  const faqs = localizeArray(brand, 'faqs');

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="h-64 bg-card animate-pulse mb-10" />
        <div className="h-8 bg-card w-48 mb-4" />
        <div className="h-4 bg-card w-full max-w-xl" />
      </div>);

  }

  return (
    <div>
      {/* Hero */}
      <section data-site-hero="brand" className="relative overflow-hidden border-b border-[#d9e2dc] bg-[#fbfcfa] text-[#10231d] dark:border-[#263747] dark:bg-[#0d1824] dark:text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_83%_40%,rgba(203,221,212,0.52),transparent_31%),linear-gradient(135deg,#ffffff_0%,#f7faf7_55%,#eef4f0_100%)] dark:bg-[radial-gradient(circle_at_83%_40%,rgba(98,114,128,0.22),transparent_32%),linear-gradient(135deg,#121e2b_0%,#0d1824_56%,#09121c_100%)]" />
        <div className="relative mx-auto max-w-7xl px-5 py-6 sm:px-7 sm:py-7 md:px-10 md:py-8 lg:px-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.045em] text-primary dark:text-white sm:text-[2.65rem] md:text-5xl md:leading-[1.06]">
            
            {brandName}
          </motion.h1>
        </div>
      </section>

      {/* Brand story */}
      <section className="hidden">
        <div className="max-w-3xl">
          <span className="text-[10px] tracking-[0.3em] uppercase text-primary mb-4 block">{copy.manufacture}</span>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {localize(brand, 'longDescription') || localize(brand, 'shortDescription') || copy.fallback(brandName)}
          </p>
        </div>
      </section>

      {/* Collections */}
      {collections.length > 0 &&
      <section data-brand-collections className="border-b border-border py-3 sm:py-4 md:border-t md:py-8">
          <div className="max-w-7xl mx-auto px-6">
            <h2 data-brand-collections-header className="hidden">{copy.collections}</h2>
            <div className="flex gap-3 flex-wrap">
              {collections.map((col) =>
            <LocalizedLink               key={col.id}
              to={`/shop?brand=${encodeURIComponent(brandName)}&collection=${encodeURIComponent(col.collectionName)}`}
              className="border border-border px-5 py-3 text-xs text-foreground hover:border-primary hover:text-primary transition-colors">
              
                  {localize(col, 'collectionName')}
                </LocalizedLink>
            )}
            </div>
          </div>
        </section>
      }

      {/* Products */}
      <section className="border-t border-border py-5 sm:py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-6 flex justify-end">
            <div className="hidden">
              <h2 className="text-2xl [font-family:'Cormorant_Garamond',_serif] font-semibold text-[hsl(var(--primary))]">{copy.available}</h2>
              <p className="text-xs text-muted-foreground mt-1">{copy.watchesAvailable(products.length)}</p>
            </div>
            <LocalizedLink to={`/shop?brand=${encodeURIComponent(brandName)}`} className="text-[10px] tracking-[0.12em] uppercase text-primary hover:text-foreground">
              {copy.viewAll}
            </LocalizedLink>
          </div>
          {products.length > 0 ?
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {products.map((p) => <ProductCard key={p.id} product={p} />)}
            </div> :

          <div className="text-center py-16 border border-border">
              <p className="text-muted-foreground text-sm">{copy.empty(brandName)}</p>
            </div>
          }
        </div>
      </section>

      {/* FAQs */}
      {faqs.length > 0 &&
      <section className="border-t border-border py-16 md:py-20">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display text-2xl text-foreground font-light mb-10">{copy.faq}</h2>
            <div className="space-y-6">
              {faqs.map((faq, i) =>
            <div key={i} className="border-b border-border pb-6">
                  <h3 className="text-sm text-foreground font-medium mb-2">{faq.question}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
            )}
            </div>
          </div>
        </section>
      }

      <TrustBar />
    </div>);

}
