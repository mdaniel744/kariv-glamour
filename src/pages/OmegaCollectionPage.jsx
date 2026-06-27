import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { ChevronRight, Heart } from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import { formatPrice } from '@/lib/constants';
import { OMEGA_COLLECTIONS, OMEGA_QUICK_FILTERS, OMEGA_THEME } from '@/lib/omegaData';
import TrustBar from '@/components/shared/TrustBar';

export default function OmegaCollectionPage() {
  const { slug } = useParams();
  const collection = OMEGA_COLLECTIONS.find(c => c.slug === slug);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toggleWishlist, isInWishlist } = useCart();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        if (collection) {
          const filterQuery = { brand: 'Omega' };
          if (collection.parentCollection) {
            filterQuery.collection = collection.parentCollection;
          } else {
            filterQuery.collection = collection.name;
          }
          const data = await base44.entities.Products.filter(filterQuery, '-created_date', 50);
          setProducts(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (collection) {
      document.title = `Omega ${collection.name} kaufen | Kariv Glamour`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', collection.description);
    }
  }, [slug]);

  if (!collection) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-32 text-center" style={{ backgroundColor: OMEGA_THEME.white }}>
        <h1 className="font-display text-3xl font-light mb-4" style={{ color: OMEGA_THEME.charcoal }}>Collection Not Found</h1>
        <Link to="/brands/omega" className="text-sm underline" style={{ color: OMEGA_THEME.red }}>Return to Omega</Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: OMEGA_THEME.white }}>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.1em] uppercase" style={{ color: OMEGA_THEME.greyText }}>
          <Link to="/" className="hover:opacity-70">Start</Link>
          <ChevronRight size={10} />
          <Link to="/brands" className="hover:opacity-70">Marken</Link>
          <ChevronRight size={10} />
          <Link to="/brands/omega" className="hover:opacity-70">Omega</Link>
          <ChevronRight size={10} />
          <span style={{ color: OMEGA_THEME.charcoal }}>{collection.name}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-32" style={{ backgroundColor: OMEGA_THEME.black }}>
        <div className="absolute inset-0">
          <img src={collection.image} alt={`Omega ${collection.name}`} className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${OMEGA_THEME.black}, rgba(10,10,10,0.6))` }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <span className="text-[10px] tracking-[0.3em] uppercase block mb-4" style={{ color: OMEGA_THEME.red }}>Omega Collection</span>
            <h1 className="font-display text-4xl md:text-5xl font-light mb-5" style={{ color: OMEGA_THEME.white }}>{collection.name}</h1>
            <p className="text-sm leading-relaxed max-w-xl" style={{ color: 'rgba(255,255,255,0.8)' }}>{collection.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Quick filters */}
      <div className="max-w-7xl mx-auto px-6 mt-10">
        <div className="flex flex-wrap gap-2 justify-center">
          {OMEGA_QUICK_FILTERS.map((chip, i) => (
            <Link key={i} to={chip.link} className="text-[10px] tracking-[0.12em] uppercase px-4 py-2 border transition-colors hover:bg-black/5" style={{ borderColor: 'rgba(200,16,46,0.2)', color: OMEGA_THEME.red }}>
              {chip.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Products */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-display text-2xl font-light" style={{ color: OMEGA_THEME.charcoal }}>Omega {collection.name} Watches</h2>
              <p className="text-xs mt-1" style={{ color: OMEGA_THEME.greyText }}>{products.length} timepieces available</p>
            </div>
            <Link to="/brands/omega" className="text-[10px] tracking-[0.12em] uppercase hover:opacity-70" style={{ color: OMEGA_THEME.red }}>All Omega →</Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => <div key={i} className="aspect-[3/4] animate-pulse" style={{ backgroundColor: OMEGA_THEME.lightBg }} />)}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {products.map(p => {
                const wishlisted = isInWishlist(p.id);
                return (
                  <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group">
                    <div className="relative aspect-[3/4] overflow-hidden mb-4" style={{ backgroundColor: OMEGA_THEME.warmWhite }}>
                      {p.featuredImage ? (
                        <img src={p.featuredImage} alt={p.productTitle} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center" style={{ color: OMEGA_THEME.red }}>
                          <span className="text-xs tracking-[0.2em] uppercase">Omega</span>
                        </div>
                      )}
                      <button onClick={(e) => { e.preventDefault(); toggleWishlist(p); }} className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: 'rgba(10,10,10,0.6)' }}>
                        <Heart size={14} className={wishlisted ? 'fill-current' : ''} style={{ color: wishlisted ? OMEGA_THEME.red : OMEGA_THEME.white }} />
                      </button>
                    </div>
                    <Link to={`/product/${p.id}`}>
                      <p className="text-[10px] tracking-[0.15em] uppercase font-medium mb-1" style={{ color: OMEGA_THEME.red }}>{p.brand}</p>
                      <h3 className="text-sm font-body leading-tight line-clamp-2 mb-1.5" style={{ color: OMEGA_THEME.charcoal }}>{p.productTitle}</h3>
                      <div className="flex items-center gap-2 text-[10px] mb-2" style={{ color: OMEGA_THEME.greyText }}>
                        {p.referenceNumber && <span>Ref. {p.referenceNumber}</span>}
                        {p.yearOfProduction && <span>· {p.yearOfProduction}</span>}
                      </div>
                      <p className="text-sm font-medium" style={{ color: OMEGA_THEME.charcoal }}>{formatPrice(p.price, p.currency)}</p>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-sm mb-4" style={{ color: OMEGA_THEME.greyText }}>No Omega {collection.name} watches currently available. Please check back soon.</p>
              <Link to="/brands/omega" className="text-[11px] tracking-[0.12em] uppercase underline" style={{ color: OMEGA_THEME.red }}>View All Omega Watches</Link>
            </div>
          )}
        </div>
      </section>

      <TrustBar />
    </div>
  );
}