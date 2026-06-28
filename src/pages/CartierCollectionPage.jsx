import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { ChevronRight, Heart } from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import { formatPrice } from '@/lib/constants';
import { CARTIER_COLLECTIONS, CARTIER_QUICK_FILTERS, CARTIER_COLORS } from '@/lib/cartierData';
import TrustBar from '@/components/shared/TrustBar';

export default function CartierCollectionPage() {
  const { slug } = useParams();
  const collection = CARTIER_COLLECTIONS.find(c => c.slug === slug);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toggleWishlist, isInWishlist } = useCart();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        if (collection) {
          const data = await base44.entities.Products.filter({ brand: 'Cartier', collection: collection.name }, '-created_date', 50);
          setProducts(data);
        }
      } catch (e) { console.error(e); } finally { setLoading(false); }
    };
    load();
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (collection) {
      document.title = `Cartier ${collection.name} kaufen | Kariv Glamour`;
      const m = document.querySelector('meta[name="description"]');
      if (m) m.setAttribute('content', collection.shortDescription);
    }
  }, [slug]);

  if (!collection) {
    return (<div className="max-w-4xl mx-auto px-6 py-32 text-center" style={{ backgroundColor: CARTIER_COLORS.ivory }}><h1 className="font-display text-3xl font-light mb-4" style={{ color: CARTIER_COLORS.ink }}>Collection Not Found</h1><Link to="/brands/cartier" className="text-sm underline" style={{ color: CARTIER_COLORS.red }}>Return to Cartier</Link></div>);
  }

  return (
    <div style={{ backgroundColor: CARTIER_COLORS.ivory }}>
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.1em] uppercase" style={{ color: CARTIER_COLORS.graphite }}>
          <Link to="/" className="hover:opacity-70">Start</Link><ChevronRight size={10} />
          <Link to="/brands" className="hover:opacity-70">Marken</Link><ChevronRight size={10} />
          <Link to="/brands/cartier" className="hover:opacity-70">Cartier</Link><ChevronRight size={10} />
          <span style={{ color: CARTIER_COLORS.ink }}>{collection.name}</span>
        </div>
      </div>

      <section className="relative overflow-hidden py-20 md:py-32" style={{ backgroundColor: CARTIER_COLORS.redDark }}>
        <div className="absolute inset-0">
          {collection.image && <img src={collection.image} alt={`Cartier ${collection.name}`} className="w-full h-full object-cover opacity-25" />}
          <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${CARTIER_COLORS.redDark}, rgba(94,26,26,0.6))` }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <span className="text-[10px] tracking-[0.3em] uppercase block mb-4" style={{ color: CARTIER_COLORS.gold }}>Cartier Collection</span>
            <h1 className="font-display text-4xl md:text-5xl font-light mb-5" style={{ color: CARTIER_COLORS.ivory }}>{collection.name}</h1>
            <p className="text-sm leading-relaxed max-w-xl" style={{ color: 'rgba(247,242,234,0.8)' }}>{collection.shortDescription}</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 mt-10">
        <div className="flex flex-wrap gap-2 justify-center">
          {CARTIER_QUICK_FILTERS.map((chip, i) => <Link key={i} to={chip.link} className="text-[10px] tracking-[0.12em] uppercase px-4 py-2 border transition-colors hover:opacity-70" style={{ borderColor: 'rgba(138,43,43,0.25)', color: CARTIER_COLORS.red }}>{chip.label}</Link>)}
        </div>
      </div>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-display text-2xl font-light" style={{ color: CARTIER_COLORS.ink }}>Cartier {collection.name} Watches</h2>
              <p className="text-xs mt-1" style={{ color: CARTIER_COLORS.graphite }}>{products.length} timepieces available</p>
            </div>
            <Link to="/brands/cartier" className="text-[10px] tracking-[0.12em] uppercase hover:opacity-70" style={{ color: CARTIER_COLORS.red }}>All Cartier →</Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">{[...Array(4)].map((_, i) => <div key={i} className="aspect-[3/4] animate-pulse" style={{ backgroundColor: CARTIER_COLORS.ivoryLight }} />)}</div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {products.map(p => {
                const w = isInWishlist(p.id);
                return (
                  <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group">
                    <Link to={`/product/${p.id}`}>
                      <div className="relative aspect-[3/4] overflow-hidden mb-4" style={{ backgroundColor: CARTIER_COLORS.ivoryLight }}>
                        {p.featuredImage ? <img src={p.featuredImage} alt={p.productTitle} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" /> : <div className="w-full h-full flex items-center justify-center" style={{ color: CARTIER_COLORS.gold }}><span className="text-xs tracking-[0.3em] uppercase">Cartier</span></div>}
                        <button onClick={(e) => { e.preventDefault(); toggleWishlist(p); }} className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: 'rgba(138,43,43,0.85)' }}><Heart size={14} className={w ? 'fill-current' : ''} style={{ color: '#fff' }} /></button>
                      </div>
                      <p className="text-[10px] tracking-[0.15em] uppercase font-medium mb-1" style={{ color: CARTIER_COLORS.red }}>{p.brand}</p>
                      <h3 className="text-sm font-body leading-tight line-clamp-2 mb-1.5" style={{ color: CARTIER_COLORS.ink }}>{p.productTitle}</h3>
                      <div className="flex items-center gap-2 text-[10px] mb-2" style={{ color: CARTIER_COLORS.graphite }}>{p.referenceNumber && <span>Ref. {p.referenceNumber}</span>}{p.yearOfProduction && <span>· {p.yearOfProduction}</span>}</div>
                      <p className="text-sm font-medium" style={{ color: CARTIER_COLORS.red }}>{formatPrice(p.price, p.currency)}</p>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-sm mb-4" style={{ color: CARTIER_COLORS.graphite }}>No Cartier {collection.name} watches currently available. Please check back soon.</p>
              <Link to="/brands/cartier" className="text-[11px] tracking-[0.12em] uppercase underline" style={{ color: CARTIER_COLORS.red }}>View All Cartier Watches</Link>
            </div>
          )}
        </div>
      </section>

      <TrustBar />
    </div>
  );
}