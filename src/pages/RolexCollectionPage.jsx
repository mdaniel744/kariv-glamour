import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LocalizedLink from '@/components/LocalizedLink';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { ChevronRight, Heart } from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import { formatPrice } from '@/lib/constants';
import { ROLEX_COLLECTIONS, ROLEX_QUICK_FILTERS } from '@/lib/rolexData';
import TrustBar from '@/components/shared/TrustBar';

export default function RolexCollectionPage() {
  const { slug } = useParams();
  const collection = ROLEX_COLLECTIONS.find(c => c.slug === slug);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toggleWishlist, isInWishlist } = useCart();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        if (collection) {
          const data = await base44.entities.Products.filter({ brand: 'Rolex', collection: collection.name }, '-created_date', 50);
          setProducts(data);
        }
      } catch (e) { console.error(e); } finally { setLoading(false); }
    };
    load();
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (collection) {
      document.title = `Rolex ${collection.name} kaufen | Kariv Glamour`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', collection.description);
    }
  }, [slug]);

  if (!collection) {
    return (<div className="max-w-4xl mx-auto px-6 py-32 text-center bg-background"><h1 className="font-display text-3xl font-light mb-4 text-foreground">Collection Not Found</h1><LocalizedLink to="/brands/rolex" className="text-sm underline text-primary">Return to Rolex</LocalizedLink></div>);
  }

  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.1em] uppercase text-muted-foreground">
          <LocalizedLink to="/" className="hover:text-foreground">Start</LocalizedLink><ChevronRight size={10} />
          <LocalizedLink to="/brands" className="hover:text-foreground">Marken</LocalizedLink><ChevronRight size={10} />
          <LocalizedLink to="/brands/rolex" className="hover:text-foreground">Rolex</LocalizedLink><ChevronRight size={10} />
          <span className="text-foreground">{collection.name}</span>
        </div>
      </div>

      <section className="relative overflow-hidden py-20 md:py-32 bg-secondary border-b border-border">
        <div className="absolute inset-0">
          <img src={collection.image} alt={`Rolex ${collection.name}`} className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/90 to-secondary/30" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <span className="text-[10px] tracking-[0.3em] uppercase block mb-4 text-primary">Rolex Collection</span>
            <h1 className="font-display text-4xl md:text-5xl font-light mb-5 text-foreground">{collection.name}</h1>
            <p className="text-sm leading-relaxed max-w-xl text-muted-foreground">{collection.description}</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 mt-10">
        <div className="flex flex-wrap gap-2 justify-center">
          {ROLEX_QUICK_FILTERS.map((chip, i) => (
            <LocalizedLink key={i} to={chip.link} className="text-[10px] tracking-[0.12em] uppercase px-4 py-2 border border-border text-foreground transition-colors hover:border-primary hover:text-primary">{chip.label}</LocalizedLink>
          ))}
        </div>
      </div>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-display text-2xl font-light text-foreground">Rolex {collection.name} Watches</h2>
              <p className="text-xs mt-1 text-muted-foreground">{products.length} timepieces available</p>
            </div>
            <LocalizedLink to="/brands/rolex" className="text-[10px] tracking-[0.12em] uppercase text-primary hover:opacity-70">All Rolex →</LocalizedLink>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">{[...Array(4)].map((_, i) => <div key={i} className="aspect-[3/4] animate-pulse bg-card" />)}</div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {products.map(p => {
                const wishlisted = isInWishlist(p.id);
                return (
                  <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group">
                    <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-card">
                      {p.featuredImage ? (
                        <img src={p.featuredImage} alt={p.productTitle} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-primary"><span className="text-xs tracking-[0.2em] uppercase">Rolex</span></div>
                      )}
                      <button onClick={(e) => { e.preventDefault(); toggleWishlist(p); }} className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm">
                        <Heart size={14} className={wishlisted ? 'fill-primary text-primary' : 'text-white'} />
                      </button>
                    </div>
                    <LocalizedLink to={`/product/${p.id}`}>
                      <p className="text-[10px] tracking-[0.15em] uppercase font-medium mb-1 text-primary">{p.brand}</p>
                      <h3 className="text-sm font-body leading-tight line-clamp-2 mb-1.5 text-foreground">{p.productTitle}</h3>
                      <div className="flex items-center gap-2 text-[10px] mb-2 text-muted-foreground">
                        {p.referenceNumber && <span>Ref. {p.referenceNumber}</span>}
                        {p.yearOfProduction && <span>· {p.yearOfProduction}</span>}
                      </div>
                      <p className="text-sm font-medium text-foreground">{formatPrice(p.price, p.currency)}</p>
                    </LocalizedLink>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-sm mb-4 text-muted-foreground">No Rolex {collection.name} watches currently available. Please check back soon.</p>
              <LocalizedLink to="/brands/rolex" className="text-[11px] tracking-[0.12em] uppercase underline text-primary">View All Rolex Watches</LocalizedLink>
            </div>
          )}
        </div>
      </section>

      <TrustBar />
    </div>
  );
}