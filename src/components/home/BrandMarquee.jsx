import React, { useState, useEffect, useRef, useCallback } from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { dataClient } from '@/lib/dataClient';
import { asArray } from '@/lib/base44Data';
import BrandLogo from '@/components/shared/BrandLogo';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
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
        const data = asArray(await dataClient.entities.Brands.list());
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
    <section className="border-y border-border bg-background py-10 md:py-12">
      <div className="mx-auto mb-7 flex max-w-7xl items-center justify-between px-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{t('components.brandMarquee.title')}</span>
          <p className="mt-1.5 text-sm text-muted-foreground">{t('components.brandMarquee.subtitle')}</p>
        </div>
        <div className="flex items-center gap-2">
          <LocalizedLink to="/brands" className="mr-2 hidden items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:text-primary sm:flex">
            {t('components.brandMarquee.viewAll')} <ArrowRight size={12} />
          </LocalizedLink>
          <button onClick={() => scrollByDir(-1)} disabled={!canPrev} className="w-8 h-8 flex items-center justify-center border border-border rounded-full text-muted-foreground hover:text-primary hover:border-primary transition-colors disabled:opacity-0 disabled:pointer-events-none" aria-label={t('components.brandMarquee.scrollLeft')}>
            <ChevronLeft size={16} />
          </button>
          <button onClick={() => scrollByDir(1)} disabled={!canNext} className="w-8 h-8 flex items-center justify-center border border-border rounded-full text-muted-foreground hover:text-primary hover:border-primary transition-colors disabled:opacity-0 disabled:pointer-events-none" aria-label={t('components.brandMarquee.scrollRight')}>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6">
        <div ref={scrollRef} onScroll={updateArrows} className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 scroll-px-6 md:gap-4">
          {brands.map((brand, i) => (
            <LocalizedLink
              key={`${brand.slug}-${i}`}
              to={`/brands/${brand.slug}`}
              data-brand-card
              className="group flex h-20 min-w-[150px] flex-shrink-0 snap-start items-center justify-center border border-border px-6 transition-colors hover:border-primary/40 md:h-24 md:min-w-[190px]"
            >
              <BrandLogo
                slug={brand.slug}
                light={brand.brandLogoLight}
                dark={brand.brandLogoDark}
                alt={t('components.brandMarquee.brandWatches', { brand: brand.brandName })}
                className="h-full w-auto object-contain opacity-70 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
              />
            </LocalizedLink>
          ))}
        </div>
      </div>
    </section>
  );
}
