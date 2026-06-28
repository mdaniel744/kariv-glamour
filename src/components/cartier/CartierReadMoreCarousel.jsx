import React from 'react';
import { Link } from 'react-router-dom';
import { CARTIER_READ_MORE, CARTIER_COLORS } from '@/lib/cartierData';

export default function CartierReadMoreCarousel() {
  return (
    <section id="read-more" className="py-16 md:py-24" style={{ backgroundColor: CARTIER_COLORS.ivoryLight }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-3" style={{ color: CARTIER_COLORS.gold }}>Weiterlesen</span>
          <h2 className="font-display text-3xl md:text-4xl font-light" style={{ color: CARTIER_COLORS.ink }}>Read More About Cartier Watches</h2>
        </div>
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 no-scrollbar">
          {CARTIER_READ_MORE.map((card, i) => (
            <Link key={i} to={card.link} className="group flex-shrink-0 snap-start min-w-[80%] sm:min-w-[45%] lg:min-w-[30%] block border" style={{ borderColor: 'rgba(28,28,28,0.12)', backgroundColor: CARTIER_COLORS.ivory }}>
              <div className="aspect-[16/10] overflow-hidden" style={{ backgroundColor: CARTIER_COLORS.ivory }}>
                {card.image ? (
                  <img src={card.image} alt={card.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-display text-xl" style={{ color: CARTIER_COLORS.gold }}>{card.title}</div>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg mb-2" style={{ color: CARTIER_COLORS.ink }}>{card.title}</h3>
                <p className="text-xs leading-relaxed mb-4" style={{ color: CARTIER_COLORS.graphite }}>{card.description}</p>
                <span className="text-[10px] tracking-[0.15em] uppercase" style={{ color: CARTIER_COLORS.red }}>Read More →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}