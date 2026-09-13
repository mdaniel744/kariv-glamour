import React, { useRef } from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import MediaImage from '@/components/shared/MediaImage';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { OMEGA_COLLECTIONS } from '@/lib/omegaData';
import { useBrandCollections } from '@/hooks/useBrandCollections';
import { handleBrandCollectionFilterClick } from '@/lib/brandCollectionFilters';

const BRAND = 'Omega';

export default function OmegaCollectionCarousel() {
  const { t } = useTranslation('brandComponents');
  const scrollRef = useRef(null);
  const scroll = (dir) => { if (scrollRef.current) scrollRef.current.scrollBy({ left: dir * 320, behavior: 'smooth' }); };
  const { collections } = useBrandCollections(BRAND, OMEGA_COLLECTIONS);
  const MAIN_COLLECTIONS = collections.filter((c) => c.parentCollection === null);

  return (
    <section id="omega-collections" data-brand-collections className="bg-background py-3 sm:py-4 md:py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div data-brand-collections-header className="hidden">
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-4 text-primary">{t('collectionCarousel.eyebrow')}</span>
          <h2 className="text-3xl md:text-4xl mb-4 text-foreground [font-family:'Cormorant_Garamond',_serif] font-semibold">{t('collectionCarousel.heading', { brand: BRAND })}</h2>
          <p className="text-sm leading-relaxed max-w-2xl mx-auto text-muted-foreground">{t('collectionCarousel.description', { brand: BRAND })}</p>
        </div>

        <div className="hidden md:flex items-center justify-end gap-2 mb-6">
          <button aria-label={t('common:previous')} onClick={() => scroll(-1)} className="w-10 h-10 border border-border flex items-center justify-center transition-colors hover:border-primary hover:text-primary text-foreground"><ChevronLeft size={18} /></button>
          <button aria-label={t('common:next')} onClick={() => scroll(1)} className="w-10 h-10 border border-border flex items-center justify-center transition-colors hover:border-primary hover:text-primary text-foreground"><ChevronRight size={18} /></button>
        </div>

        <div ref={scrollRef} className="flex gap-3 overflow-x-auto pb-4 sm:gap-5 md:pb-2 scroll-smooth snap-x no-scrollbar">
          {MAIN_COLLECTIONS.map((col, i) =>
            <div key={col.id} data-collection-card className="flex-shrink-0 w-[164px] snap-start group sm:w-[280px]">
              <LocalizedLink to={`/shop?brand=${encodeURIComponent(BRAND)}&collection=${encodeURIComponent(col.name)}`} onClick={(event) => handleBrandCollectionFilterClick(event, col.name)} className="group block overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/50">
                <div className="relative h-[164px] overflow-hidden bg-card sm:h-[230px]">
                  <div className="absolute inset-x-0 top-0 h-[calc(100%-48px)] overflow-hidden">
                    <MediaImage src={col.image} alt={`${BRAND} ${col.name}`} fill sizes="(max-width: 639px) 164px, 280px" quality={82} priority={i === 0} className="h-full w-full scale-[1.18] object-contain transition-transform duration-700 group-hover:scale-[1.24] sm:scale-[1.12] sm:group-hover:scale-[1.18]" />
                  </div>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-12 items-center px-3 sm:px-4">
                    <h3 className="line-clamp-2 font-body text-xs font-semibold leading-tight text-primary sm:text-sm">{col.name}</h3>
                  </div>
                </div>
              </LocalizedLink>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
