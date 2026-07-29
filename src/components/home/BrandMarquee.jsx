import React, { useState, useEffect, useRef, useCallback } from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { base44 } from '@/api/base44Client';
import { asArray } from '@/lib/base44Data';
import BrandLogo from '@/components/shared/BrandLogo';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function BrandMarquee() {
  const { t } = useTranslation();
  const [brands, setBrands] = useState([]);
  const scrollRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = asArray(await base44.entities.Brands.list());
        setBrands(data.filter(b => b.brandLogoLight));
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, []);

  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 10);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => { updateArrows(); }, [updateArrows, brands]);

  const scrollByDir = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('[data-brand-card]')?.offsetWidth || 240;
    el.scrollBy({ left: dir * (cardWidth + 40), behavior: 'smooth' });
  };

  if (brands.length === 0) return null;

  return (
    <section className="py-16 md:py-24 border-y border-border">
      <div className="max-w-7xl mx-auto px-6 mb-10 flex items-center justify-between">
        <span className="text-[10px] tracking-[0.3em] uppercase text-primary font-medium">{t('components.brandMarquee.title')}</span>
        <div className="flex gap-2">
          <button onClick={() => scrollByDir(-1)} disabled={!canPrev} className="w-8 h-8 flex items-center justify-center border border-border rounded-full text-muted-foreground hover:text-primary hover:border-primary transition-colors disabled:opacity-0 disabled:pointer-events-none" aria-label={t('components.brandMarquee.scrollLeft')}>
            <ChevronLeft size={16} />
          </button>
          <button onClick={() => scrollByDir(1)} disabled={!canNext} className="w-8 h-8 flex items-center justify-center border border-border rounded-full text-muted-foreground hover:text-primary hover:border-primary transition-colors disabled:opacity-0 disabled:pointer-events-none" aria-label={t('components.brandMarquee.scrollRight')}>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6">
        <div ref={scrollRef} onScroll={updateArrows} className="flex gap-10 md:gap-14 overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-px-6 pb-2">
          {brands.map((brand, i) => (
            <LocalizedLink
              key={`${brand.slug}-${i}`}
              to={`/brands/${brand.slug}`}
              data-brand-card
              className="flex-shrink-0 snap-start h-20 md:h-28 flex items-center justify-center group"
            >
              <BrandLogo
                slug={brand.slug}
                light={brand.brandLogoLight}
                dark={brand.brandLogoDark}
                alt={t('components.brandMarquee.brandWatches', { brand: brand.brandName })}
                className="h-full w-auto object-contain opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              />
            </LocalizedLink>
          ))}
        </div>
      </div>
    </section>
  );
}