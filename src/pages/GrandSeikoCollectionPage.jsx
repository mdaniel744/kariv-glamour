import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { ChevronRight, Heart } from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import { formatPrice } from '@/lib/constants';
import { GS_COLLECTIONS, GS_QUICK_FILTERS } from '@/lib/grandSeikoData';
import TrustBar from '@/components/shared/TrustBar';

export default function GrandSeikoCollectionPage() {
  const { slug } = useParams();
  const collection = GS_COLLECTIONS.find(c => c.slug === slug);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toggleWishlist, isInWishlist } = useCart();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        if (collection) {
          const data = await base44.entities.Products.filter({ brand: 'Grand Seiko', collection: collection.name }, '-created_date', 50);
          setProducts(data);
        }
      } catch (e) { console.error(e); } finally { setLoading(false); }
    };
    load();
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (collection) {
      document.title = `Grand Seiko ${collection.name} | Kariv Glamour`;
      const m = document.querySelector('meta[name="description"]');
      if (m) m.setAttribute('content', collection.shortDescription);
    }
  }, [slug]);

  if (!collection) {
    return (<div className="max-w-4xl mx-auto px-6 py-32 text-center bg-background"><h1 className="font-display text-3xl font-bold mb-4 text-foreground">Collection Not Found</h1><Link to="/brands/grand-seiko" className="text-sm underline text-primary">Return to Grand Seiko</Link></div>);
  }

  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.1em] uppercase text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Start</Link><ChevronRight size={10} />
          <Link to="/brands" className="hover:text-foreground">Marken</Link><ChevronRight size={10} />
          <Link to="/brands/grand-seiko" className="hover:text-foreground">Grand Seiko</Link><ChevronRight size={10} />
          <span className="text-foreground">{collection.name}</span>
        </div>
      </div>

      <section className="relative overflow-hidden py-20 md:py-32 bg-foreground">
        {collection.image && (
          <div className="absolute inset-0">
            <img src={collection.image} alt={`Grand Seiko ${collection.name}`} className="w-full h-full object-cover opacity-25" />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/80 to-foreground/30" />
          </div>
        )}
        {!collection.image && <div className="absolute inset-0 bg-secondary opacity-30" />}
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <span className="text-[10px] tracking-[0.3em] uppercase block mb-4 text-primary">Grand Seiko Collection</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-5 text-background">{collection.name}</h1>
            <p className="text-sm leading-relaxed max-w-xl text-background/70">{collection.shortDescription}</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 mt-10">
        <div className="flex flex-wrap gap-2 justify-center">
          {GS_QUICK_FILTERS.map((chip, i) => <Link key={i} to={chip.link} className="text-[10px] tracking-[0.12em] uppercase px-4 py-2 border border-border text-foreground hover:border-primary hover:text-primary transition-colors">{chip.label}</Link>)}
        </div>
      </div>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-display text-2xl font-semibold text-foreground">Grand Seiko {collection.name}</h2>
              <p className="text-xs mt-1 text-muted-foreground">{products.length} timepieces available</p>
            </div>
            <Link to="/brands/grand-seiko" className="text-[10px] tracking-[0.12em] uppercase text-primary hover:opacity-70">All Grand Seiko &rarr;</Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">{[...Array(4)].map((_, i) => <div key={i} className="aspect-[3/4] animate-pulse bg-card" />)}</div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {products.map(p => {
                const w = isInWishlist(p.id);
                return (
                  <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group">
                    <Link to={`/product/${p.id}`}>
                      <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-card">
                        {p.featuredImage ? <img src={p.featuredImage} alt={p.productTitle} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" /> : <div className="w-full h-full flex items-center justify-center text-muted-foreground/40"><span className="text-xs tracking-[0.3em] uppercase">Grand Seiko</span></div>}
                        <button onClick={(e) => { e.preventDefault(); toggleWishlist(p); }} className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><Heart size={14} className={w ? 'fill-primary text-primary' : 'text-white'} /></button>
                      </div>
                      <p className="text-[10px] tracking-[0.15em] uppercase font-medium mb-1 text-primary">{p.brand}</p>
                      <h3 className="text-sm font-body leading-tight line-clamp-2 mb-1.5 text-foreground">{p.productTitle}</h3>
                      <div className="flex items-center gap-2 text-[10px] mb-2 text-muted-foreground">{p.referenceNumber && <span>Ref. {p.referenceNumber}</span>}{p.yearOfProduction && <span>· {p.yearOfProduction}</span>}</div>
                      <p className="text-sm font-medium text-foreground">{formatPrice(p.price, p.currency)}</p>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-sm mb-4 text-muted-foreground">No Grand Seiko {collection.name} watches currently available. Please check back soon.</p>
              <Link to="/brands/grand-seiko" className="text-[11px] tracking-[0.12em] uppercase underline text-primary">View All Grand Seiko Watches</Link>
            </div>
          )}
        </div>
      </section>

      <TrustBar />
    </div>
  );
}