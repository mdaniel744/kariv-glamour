import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ROLEX_COLLECTIONS } from '@/lib/rolexData';

export default function RolexCollectionCarousel() {
  const scrollRef = useRef(null);
  const scroll = (dir) => { if (scrollRef.current) scrollRef.current.scrollBy({ left: dir * 320, behavior: 'smooth' }); };

  return (
    <section id="rolex-collections" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-4 text-primary">Collections</span>
          <h2 className="font-display text-3xl md:text-4xl font-light mb-4 text-foreground">Discover Rolex Collections</h2>
          <p className="text-sm leading-relaxed max-w-2xl mx-auto text-muted-foreground">Explore the most iconic Rolex families and find the model that matches your style, purpose, and collecting goals.</p>
        </div>

        <div className="hidden md:flex items-center justify-end gap-2 mb-6">
          <button onClick={() => scroll(-1)} className="w-10 h-10 border border-border flex items-center justify-center transition-colors hover:border-primary hover:text-primary text-foreground"><ChevronLeft size={18} /></button>
          <button onClick={() => scroll(1)} className="w-10 h-10 border border-border flex items-center justify-center transition-colors hover:border-primary hover:text-primary text-foreground"><ChevronRight size={18} /></button>
        </div>

        <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-4 md:pb-2 scroll-smooth snap-x no-scrollbar">
          {ROLEX_COLLECTIONS.map((col, i) => (
            <motion.div key={col.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }} className="flex-shrink-0 w-[280px] snap-start group">
              <Link to={`/rolex/${col.slug}`} className="block">
                <div className="relative aspect-[4/5] overflow-hidden mb-4 bg-card">
                  <img src={col.image} alt={`Rolex ${col.name}`} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-display text-lg font-light mb-2 text-foreground">{col.name}</h3>
                <p className="text-xs leading-relaxed mb-3 line-clamp-2 text-muted-foreground">{col.description}</p>
                <span className="text-[10px] tracking-[0.12em] uppercase transition-colors group-hover:opacity-70 text-primary">Explore Collection →</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}