import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PATEK_READ_MORE, PATEK_THEME } from '@/lib/patekData';

export default function PatekPhilippeReadMoreCarousel() {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 320, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: PATEK_THEME.cream }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-4" style={{ color: PATEK_THEME.navy }}>Editorial</span>
          <h2 className="font-display text-3xl md:text-4xl font-light" style={{ color: PATEK_THEME.graphite }}>Read More About Patek Philippe Watches</h2>
        </div>

        <div className="relative">
          <button onClick={() => scroll(-1)} className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full shadow-md transition-all hover:opacity-90" style={{ backgroundColor: PATEK_THEME.navy, color: PATEK_THEME.ivory }}>
            <ChevronLeft size={18} />
          </button>
          <button onClick={() => scroll(1)} className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full shadow-md transition-all hover:opacity-90" style={{ backgroundColor: PATEK_THEME.navy, color: PATEK_THEME.ivory }}>
            <ChevronRight size={18} />
          </button>

          <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-4 scroll-smooth snap-x no-scrollbar">
            {PATEK_READ_MORE.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex-shrink-0 w-[260px] md:w-[280px] snap-start group"
              >
                <Link to={card.link} className="block">
                  <div className="relative aspect-[4/3] overflow-hidden mb-5" style={{ backgroundColor: PATEK_THEME.ivory }}>
                    {card.image ? (
                      <img src={card.image} alt={card.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center" style={{ color: PATEK_THEME.champagne }}>
                        <span className="text-xs tracking-[0.2em] uppercase">Patek Philippe</span>
                      </div>
                    )}
                  </div>
                  <h3 className="font-display text-lg font-light mb-2" style={{ color: PATEK_THEME.graphite }}>{card.title}</h3>
                  <p className="text-xs leading-relaxed mb-4 line-clamp-3" style={{ color: PATEK_THEME.graphite }}>{card.description}</p>
                  <span className="text-[10px] tracking-[0.15em] uppercase group-hover:opacity-70 transition-opacity" style={{ color: PATEK_THEME.navy }}>Read More →</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}