import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { BRAND_DATA, BRAND_DISCLAIMER } from '@/lib/constants';
import ProductCard from '@/components/shared/ProductCard';
import TrustBar from '@/components/shared/TrustBar';
import { motion } from 'framer-motion';
import { ChevronRight, ShieldCheck } from 'lucide-react';

export default function BrandDetail() {
  const { slug } = useParams();
  const [brand, setBrand] = useState(null);
  const [products, setProducts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  const staticBrand = BRAND_DATA.find((b) => b.slug === slug);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const brands = await base44.entities.Brands.filter({ slug });
        if (brands.length > 0) setBrand(brands[0]);

        const brandName = staticBrand?.name || slug;
        const prods = await base44.entities.Products.filter({ brand: brandName }, '-created_date', 50);
        setProducts(prods);

        const cols = await base44.entities.Collections.filter({ brand: brandName }, 'collectionName', 50);
        setCollections(cols);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
    window.scrollTo(0, 0);
  }, [slug]);

  const brandName = brand?.brandName || staticBrand?.name || slug;

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
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        {brand?.heroImage ?
        <img src={brand.heroImage} alt={brandName} className="w-full h-full object-cover" /> :

        <div className="w-full h-full bg-gradient-to-br from-card to-background" />
        }
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-16 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-[10px] tracking-[0.1em] uppercase text-muted-foreground mb-4">
            <Link to="/" className="hover:text-foreground">Start</Link>
            <ChevronRight size={10} />
            <Link to="/brands" className="hover:text-foreground">Marken</Link>
            <ChevronRight size={10} />
            <span className="text-foreground">{brandName}</span>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl text-foreground tracking-tight [font-family:'Cormorant_Garamond',_serif] font-bold">
            
            {brandName}
          </motion.h1>
        </div>
      </section>

      {/* Brand story */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="max-w-3xl">
          <span className="text-[10px] tracking-[0.3em] uppercase text-primary mb-4 block">Die Manufaktur</span>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {brand?.longDescription || brand?.shortDescription ||
            `Entdecken Sie unsere kuratierte Auswahl an authentischen ${brandName} Zeitmessern. Jede Uhr wurde von unserem Team horologischer Experten inspiziert und authentifiziert.`}
          </p>
        </div>

        {/* Brand disclaimer */}
        <div className="mt-8 border border-border p-4 flex items-start gap-3">
          <ShieldCheck size={14} className="text-primary flex-shrink-0 mt-0.5" />
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            {brand?.brandDisclaimer || BRAND_DISCLAIMER}
          </p>
        </div>
      </section>

      {/* Collections */}
      {collections.length > 0 &&
      <section className="border-t border-border py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl mb-10 [font-family:'Cormorant_Garamond',_serif] font-semibold text-[hsl(var(--primary))]">Kollektionen</h2>
            <div className="flex gap-3 flex-wrap">
              {collections.map((col) =>
            <Link
              key={col.id}
              to={`/shop?brand=${encodeURIComponent(brandName)}`}
              className="border border-border px-5 py-3 text-xs text-foreground hover:border-primary hover:text-primary transition-colors">
              
                  {col.collectionName}
                </Link>
            )}
            </div>
          </div>
        </section>
      }

      {/* Products */}
      <section className="border-t border-border py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl [font-family:'Cormorant_Garamond',_serif] font-semibold text-[hsl(var(--primary))]">Verfügbare Zeitmesser</h2>
              <p className="text-xs text-muted-foreground mt-1">{products.length} Uhr{products.length !== 1 ? 'en' : ''} verfügbar</p>
            </div>
            <Link to={`/shop?brand=${encodeURIComponent(brandName)}`} className="text-[10px] tracking-[0.12em] uppercase text-primary hover:text-foreground">
              Alle im Shop ansehen →
            </Link>
          </div>
          {products.length > 0 ?
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {products.map((p) => <ProductCard key={p.id} product={p} />)}
            </div> :

          <div className="text-center py-16 border border-border">
              <p className="text-muted-foreground text-sm">Derzeit keine {brandName} Uhren verfügbar. Bitte kommen Sie später zurück.</p>
            </div>
          }
        </div>
      </section>

      {/* FAQs */}
      {brand?.faqs?.length > 0 &&
      <section className="border-t border-border py-16 md:py-20">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display text-2xl text-foreground font-light mb-10">Häufig gestellte Fragen</h2>
            <div className="space-y-6">
              {brand.faqs.map((faq, i) =>
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