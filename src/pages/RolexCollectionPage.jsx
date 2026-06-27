import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
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
      document.title = `Rolex ${collection.name} kaufen | Kariv Glamour`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', collection.description);
    }
  }, [slug]);

  if (!collection) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-32 text-center" style={{ backgroundColor: '#FAF7F2' }}>
        <h1 className="font-display text-3xl font-light mb-4" style={{ color: '#1C1C1C' }}>Collection Not Found</h1>
        <Link to="/brands/rolex" className="text-sm underline" style={{ color: '#0B4D3C' }}>Return to Rolex</Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#FAF7F2' }}>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.1em] uppercase" style={{ color: '#2A2018' }}>
          <Link to="/" className="hover:opacity-70">Start</Link>
          <ChevronRight size={10} />
          <Link to="/brands" className="hover:opacity-70">Marken</Link>
          <ChevronRight size={10} />
          <Link to="/brands/rolex" className="hover:opacity-70">Rolex</Link>
          <ChevronRight size={10} />
          <span style={{ color: '#1C1C1C' }}>{collection.name}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-32" style={{ backgroundColor: '#063528' }}>
        <div className="absolute inset-0">
          <img src={collection.image} alt={`Rolex ${collection.name}`} className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #063528, rgba(6,53,40,0.6))' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <span className="text-[10px] tracking-[0.3em] uppercase block mb-4" style={{ color: '#C5A572' }}>Rolex Collection</span>
            <h1 className="font-display text-4xl md:text-5xl font-light mb-5" style={{ color: '#FAF7F2' }}>{collection.name}</h1>
            <p className="text-sm leading-relaxed max-w-xl" style={{ color: 'rgba(250,247,242,0.8)' }}>{collection.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Quick filters */}
      <div className="max-w-7xl mx-auto px-6 mt-10">
        <div className="flex flex-wrap gap-2 justify-center">
          {ROLEX_QUICK_FILTERS.map((chip, i) => (
            <Link key={i} to={chip.link} className="text-[10px] tracking-[0.12em] uppercase px-4 py-2 border transition-colors hover:bg-black/5" style={{ borderColor: 'rgba(11,77,60,0.2)', color: '#0B4D3C' }}>
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
              <h2 className="font-display text-2xl font-light" style={{ color: '#1C1C1C' }}>Rolex {collection.name} Watches</h2>
              <p className="text-xs mt-1" style={{ color: '#2A2018' }}>{products.length} timepieces available</p>
            </div>
            <Link to="/brands/rolex" className="text-[10px] tracking-[0.12em] uppercase hover:opacity-70" style={{ color: '#0B4D3C' }}>All Rolex →</Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => <div key={i} className="aspect-[3/4] animate-pulse" style={{ backgroundColor: '#FDFBF7' }} />)}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {products.map(p => {
                const wishlisted = isInWishlist(p.id);
                return (
                  <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group">
                    <div className="relative aspect-[3/4] overflow-hidden mb-4" style={{ backgroundColor: '#FDFBF7' }}>
                      {p.featuredImage ? (
                        <img src={p.featuredImage} alt={p.productTitle} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center" style={{ color: '#C5A572' }}>
                          <span className="text-xs tracking-[0.2em] uppercase">Rolex</span>
                        </div>
                      )}
                      <button onClick={(e) => { e.preventDefault(); toggleWishlist(p); }} className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: 'rgba(6,53,40,0.6)' }}>
                        <Heart size={14} className={wishlisted ? 'fill-current' : ''} style={{ color: wishlisted ? '#C5A572' : '#FAF7F2' }} />
                      </button>
                    </div>
                    <Link to={`/product/${p.id}`}>
                      <p className="text-[10px] tracking-[0.15em] uppercase font-medium mb-1" style={{ color: '#0B4D3C' }}>{p.brand}</p>
                      <h3 className="text-sm font-body leading-tight line-clamp-2 mb-1.5" style={{ color: '#1C1C1C' }}>{p.productTitle}</h3>
                      <div className="flex items-center gap-2 text-[10px] mb-2" style={{ color: '#2A2018' }}>
                        {p.referenceNumber && <span>Ref. {p.referenceNumber}</span>}
                        {p.yearOfProduction && <span>· {p.yearOfProduction}</span>}
                      </div>
                      <p className="text-sm font-medium" style={{ color: '#0B4D3C' }}>{formatPrice(p.price, p.currency)}</p>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-sm mb-4" style={{ color: '#2A2018' }}>No Rolex {collection.name} watches currently available. Please check back soon.</p>
              <Link to="/brands/rolex" className="text-[11px] tracking-[0.12em] uppercase underline" style={{ color: '#0B4D3C' }}>View All Rolex Watches</Link>
            </div>
          )}
        </div>
      </section>

      <TrustBar />
    </div>
  );
}