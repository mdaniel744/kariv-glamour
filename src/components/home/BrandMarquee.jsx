import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BRAND_DATA, BRAND_LOGOS, BRAND_LOGOS_WHITE } from '@/lib/constants';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const LOGO_BRANDS = BRAND_DATA.filter(brand => BRAND_LOGOS[brand.slug]);

export default function BrandMarquee() {
  const scrollRef = useRef(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      if (paused || !container) return;
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 2) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: 1.5, behavior: 'auto' });
      }
    }, 20);

    return () => clearInterval(interval);
  }, [paused]);

  const scrollByAmount = (amount) => {
    scrollRef.current?.scrollBy({ left: amount, behavior: 'smooth' });
  };

  const items = [...LOGO_BRANDS, ...LOGO_BRANDS];

  return (
    <section className="py-16 md:py-24 border-y border-border">
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <span className="text-[10px] tracking-[0.3em] uppercase text-primary font-medium">Ausgewählte Manufakturen</span>
      </div>
      <div className="relative">
        <button
          onClick={() => scrollByAmount(-300)}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur border border-border flex items-center justify-center hover:bg-secondary transition-colors"
          aria-label="Scroll left"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => scrollByAmount(300)}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur border border-border flex items-center justify-center hover:bg-secondary transition-colors"
          aria-label="Scroll right"
        >
          <ChevronRight size={18} />
        </button>
        <div
          ref={scrollRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="overflow-x-auto no-scrollbar scroll-smooth"
        >
          <div className="flex gap-10 md:gap-16 w-max px-6">
            {items.map((brand, i) => {
              const hasWhite = BRAND_LOGOS_WHITE[brand.slug];
              return (
                <Link
                  key={`${brand.slug}-${i}`}
                  to={`/brands/${brand.slug}`}
                  className="flex-shrink-0 h-16 md:h-20 flex items-center justify-center group/logo"
                >
                  <img
                    src={BRAND_LOGOS[brand.slug]}
                    alt={`${brand.name} watches at Kariv Glamour`}
                    className={`h-full w-auto object-contain opacity-60 group-hover/logo:opacity-100 transition-all duration-500 ${hasWhite ? 'dark:hidden' : 'dark:invert dark:opacity-80'}`}
                  />
                  {hasWhite && (
                    <img
                      src={BRAND_LOGOS_WHITE[brand.slug]}
                      alt={`${brand.name} watches at Kariv Glamour`}
                      className="h-full w-auto object-contain opacity-60 group-hover/logo:opacity-100 transition-all duration-500 hidden dark:block"
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}