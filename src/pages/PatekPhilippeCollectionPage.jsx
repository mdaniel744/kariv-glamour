import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { ChevronRight, Heart } from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import { formatPrice } from '@/lib/constants';
import { PATEK_COLLECTIONS, PATEK_QUICK_FILTERS, PATEK_THEME } from '@/lib/patekData';
import TrustBar from '@/components/shared/TrustBar';

export default function PatekPhilippeCollectionPage() {
  const { slug } = useParams();
  const collection = PATEK_COLLECTIONS.find(c => c.slug === slug);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toggleWishlist, isInWishlist } = useCart();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        if (collection) {
          const data = await base44.entities.Products.filter({ brand: 'Patek Philippe', collection: collection.name }, '-created_date', 50);
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
      document.title = `Patek Philippe ${collection.name} kaufen | Kariv Glamour`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', collection.description);
    }
  }, [slug]);

  if (!collection) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-32 text-center" style={{ backgroundColor: PATEK_THEME.ivory }}>
        <h1 className="font-display text-3xl font-light mb-4" style={{ color: PATEK_THEME.graphite }}>Collection Not Found</h1>
        <Link to="/brands/patek-philippe" className="text-sm underline" style={{ color: PATEK_THEME.navy }}>Return to Patek Philippe</Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: PATEK_THEME.ivory }}>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.1em] uppercase" style={{ color: PATEK_THEME.graphite }}>
          <Link to="/" className="hover:opacity-70">Start</Link>
          <ChevronRight size={10} />
          <Link to="/brands" className="hover:opacity-70">Marken</Link>
          <ChevronRight size={10} />
          <Link to="/brands/patek-philippe" className="hover:opacity-70">Patek Philippe</Link>
          <ChevronRight size={10} />
          <span style={{ color: PATEK_THEME.graphite }}>{collection.name}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-32" style={{ backgroundColor: PATEK_THEME.navyDark }}>
        <div className="absolute inset-0">
          <img src={collection.image} alt={`Patek Philippe ${collection.name}`} className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${PATEK_THEME.navyDark}, rgba(15,29,51,0.6))` }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <span className="text-[10px] tracking-[0.3em] uppercase block mb-4" style={{ color: PATEK_THEME.champagne }}>Patek Philippe Collection</span>
            <h1 className="font-display text-4xl md:text-5xl font-light mb-5" style={{ color: PATEK_THEME.ivory }}>{collection.name}</h1>
            <p className="text-sm leading-relaxed max-w-xl" style={{ color: 'rgba(248,245,239,0.8)' }}>{collection.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Quick filters */}
      <div className="max-w-7xl mx-auto px-6 mt-10">
        <div className="flex flex-wrap gap-2 justify-center">
          {PATEK_QUICK_FILTERS.map((chip, i) => (
            <Link key={i} to={chip.link} className="text-[10px] tracking-[0.12em] uppercase px-4 py-2 border transition-colors hover:bg-black/5" style={{ borderColor: 'rgba(26,43,74,0.2)', color: PATEK_THEME.navy }}>
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
              <h2 className="font-display text-2xl font-light" style={{ color: PATEK_THEME.graphite }}>Patek Philippe {collection.name} Watches</h2>
              <p className="text-xs mt-1" style={{ color: PATEK_THEME.graphite }}>{products.length} timepieces available</p>
            </div>
            <Link to="/brands/patek-philippe" className="text-[10px] tracking-[0.12em] uppercase hover:opacity-70" style={{ color: PATEK_THEME.navy }}>All Patek Philippe →</Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => <div key={i} className="aspect-[3/4] animate-pulse" style={{ backgroundColor: PATEK_THEME.cream }} />)}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {products.map(p => {
                const wishlisted = isInWishlist(p.id);
                return (
                  <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group">
                    <div className="relative aspect-[3/4] overflow-hidden mb-4" style={{ backgroundColor: PATEK_THEME.cream }}>
                      {p.featuredImage ? (
                        <img src={p.featuredImage} alt={p.productTitle} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center" style={{ color: PATEK_THEME.champagne }}>
                          <span className="text-xs tracking-[0.2em] uppercase">Patek Philippe</span>
                        </div>
                      )}
                      <button onClick={(e) => { e.preventDefault(); toggleWishlist(p); }} className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: 'rgba(15,29,51,0.6)' }}>
                        <Heart size={14} className={wishlisted ? 'fill-current' : ''} style={{ color: wishlisted ? PATEK_THEME.champagne : PATEK_THEME.ivory }} />
                      </button>
                    </div>
                    <Link to={`/product/${p.id}`}>
                      <p className="text-[10px] tracking-[0.15em] uppercase font-medium mb-1" style={{ color: PATEK_THEME.navy }}>{p.brand}</p>
                      <h3 className="text-sm font-body leading-tight line-clamp-2 mb-1.5" style={{ color: PATEK_THEME.graphite }}>{p.productTitle}</h3>
                      <div className="flex items-center gap-2 text-[10px] mb-2" style={{ color: PATEK_THEME.graphite }}>
                        {p.referenceNumber && <span>Ref. {p.referenceNumber}</span>}
                        {p.yearOfProduction && <span>· {p.yearOfProduction}</span>}
                      </div>
                      <p className="text-sm font-medium" style={{ color: PATEK_THEME.navy }}>{formatPrice(p.price, p.currency)}</p>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-sm mb-4" style={{ color: PATEK_THEME.graphite }}>No Patek Philippe {collection.name} watches currently available. Please check back soon.</p>
              <Link to="/brands/patek-philippe" className="text-[11px] tracking-[0.12em] uppercase underline" style={{ color: PATEK_THEME.navy }}>View All Patek Philippe Watches</Link>
            </div>
          )}
        </div>
      </section>

      <TrustBar />
    </div>
  );
}