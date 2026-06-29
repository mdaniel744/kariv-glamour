import React from 'react';
import { Link } from 'react-router-dom';
import { BREITLING_READ_MORE } from '@/lib/breitlingData';

export default function BreitlingReadMoreCarousel() {
  return (
    <section id="read-more" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-3 text-primary">Weiterlesen</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-[hsl(var(--primary))]">Read More About Breitling Watches</h2>
        </div>
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 no-scrollbar">
          {BREITLING_READ_MORE.map((card, i) =>
          <Link key={i} to={card.link} className="group flex-shrink-0 snap-start min-w-[80%] sm:min-w-[45%] lg:min-w-[30%] block border border-border bg-card hover:border-primary/40 transition-colors">
              {/* Asset placeholder — add article image here */}
              <div className="aspect-[16/10] flex items-center justify-center bg-secondary">
                <span className="font-display text-lg text-foreground/60 group-hover:text-foreground transition-colors">{card.title}</span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-medium mb-2 text-foreground">{card.title}</h3>
                <p className="text-xs leading-relaxed mb-4 text-muted-foreground">{card.description}</p>
                <span className="text-[10px] tracking-[0.15em] uppercase text-primary">Read More →</span>
              </div>
            </Link>
          )}
        </div>
      </div>
    </section>);

}