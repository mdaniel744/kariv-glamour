import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ROLEX_READ_MORE } from '@/lib/rolexData';

export default function RolexReadMoreCarousel() {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 340, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: '#FDFBF7' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase block mb-4" style={{ color: '#0B4D3C' }}>Editorial</span>
            <h2 className="font-display text-3xl md:text-4xl font-light" style={{ color: '#1C1C1C' }}>Read More About Rolex Watches</h2>
          </div>
          <div className="hidden md:flex gap-2">
            <button onClick={() => scroll(-1)} className="w-10 h-10 border flex items-center justify-center hover:bg-black/5 transition-colors" style={{ borderColor: '#C5A572', color: '#0B4D3C' }}>
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => scroll(1)} className="w-10 h-10 border flex items-center justify-center hover:bg-black/5 transition-colors" style={{ borderColor: '#C5A572', color: '#0B4D3C' }}>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-4 scroll-smooth snap-x no-scrollbar">
          {ROLEX_READ_MORE.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex-shrink-0 w-[300px] snap-start group"
            >
              <Link to={card.link} className="block">
                <div className="relative aspect-[4/3] overflow-hidden mb-4" style={{ backgroundColor: '#FAF7F2' }}>
                  <img src={card.image} alt={card.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <h3 className="font-display text-lg font-light mb-2" style={{ color: '#1C1C1C' }}>{card.title}</h3>
                <p className="text-xs leading-relaxed mb-3 line-clamp-2" style={{ color: '#2A2018' }}>{card.description}</p>
                <span className="text-[10px] tracking-[0.12em] uppercase group-hover:opacity-70" style={{ color: '#0B4D3C' }}>Read More →</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}