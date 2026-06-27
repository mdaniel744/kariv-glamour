import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { OMEGA_COLLECTIONS, OMEGA_THEME } from '@/lib/omegaData';

const MAIN_COLLECTIONS = OMEGA_COLLECTIONS.filter(c => c.parentCollection === null);

export default function OmegaCollectionCarousel() {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 320, behavior: 'smooth' });
    }
  };

  return (
    <section id="omega-collections" className="py-16 md:py-24" style={{ backgroundColor: OMEGA_THEME.lightBg }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-4" style={{ color: OMEGA_THEME.red }}>
            Collections
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-light mb-4" style={{ color: OMEGA_THEME.charcoal }}>
            Discover Omega Collections
          </h2>
          <p className="text-sm leading-relaxed max-w-2xl mx-auto" style={{ color: OMEGA_THEME.greyText }}>
            Explore Omega's most important watch families, from professional dive watches and legendary chronographs to elegant dress watches and refined everyday timepieces.
          </p>
        </div>

        <div className="hidden md:flex items-center justify-end gap-2 mb-6">
          <button onClick={() => scroll(-1)} className="w-10 h-10 border flex items-center justify-center transition-colors hover:bg-black/5" style={{ borderColor: OMEGA_THEME.steel, color: OMEGA_THEME.red }}>
            <ChevronLeft size={18} />
          </button>
          <button onClick={() => scroll(1)} className="w-10 h-10 border flex items-center justify-center transition-colors hover:bg-black/5" style={{ borderColor: OMEGA_THEME.steel, color: OMEGA_THEME.red }}>
            <ChevronRight size={18} />
          </button>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 md:pb-2 scroll-smooth snap-x no-scrollbar"
        >
          {MAIN_COLLECTIONS.map((col, i) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex-shrink-0 w-[280px] snap-start group"
            >
              <Link to={`/omega/${col.slug}`} className="block">
                <div className="relative aspect-[4/5] overflow-hidden mb-4" style={{ backgroundColor: OMEGA_THEME.warmWhite }}>
                  <img
                    src={col.image}
                    alt={`Omega ${col.name}`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-display text-lg font-light mb-2" style={{ color: OMEGA_THEME.charcoal }}>{col.name}</h3>
                <p className="text-xs leading-relaxed mb-3 line-clamp-2" style={{ color: OMEGA_THEME.greyText }}>{col.description}</p>
                <span className="text-[10px] tracking-[0.12em] uppercase transition-colors group-hover:opacity-70" style={{ color: OMEGA_THEME.red }}>
                  Explore Collection →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}