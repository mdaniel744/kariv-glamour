import React, { useRef } from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import MediaImage from '@/components/shared/MediaImage';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PATEK_COLLECTIONS } from '@/lib/patekData';
import { useBrandCollections } from '@/hooks/useBrandCollections';
import { handleBrandCollectionFilterClick } from '@/lib/brandCollectionFilters';

const BRAND = 'Patek Philippe';

export default function PatekPhilippeCollectionCarousel() {
  const { t } = useTranslation('brandComponents');
  const scrollRef = useRef(null);
  const scroll = (dir) => { if (scrollRef.current) scrollRef.current.scrollBy({ left: dir * 340, behavior: 'smooth' }); };
  const { collections } = useBrandCollections(BRAND, PATEK_COLLECTIONS);

  return (
    <section id="patek-collections" data-brand-collections className="bg-background py-3 sm:py-4 md:py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div data-brand-collections-header className="hidden">
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-4 text-primary">{t('collectionCarousel.eyebrow')}</span>
          <h2 className="text-3xl md:text-4xl mb-5 [font-family:'Cormorant_Garamond',_serif] font-semibold text-[hsl(var(--primary))]">{t('collectionCarousel.heading', { brand: BRAND })}</h2>
          <p className="text-sm leading-relaxed max-w-2xl mx-auto text-muted-foreground">{t('collectionCarousel.description', { brand: BRAND })}</p>
        </div>

        <div className="relative">
          <button onClick={() => scroll(-1)} className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full shadow-md transition-all hover:opacity-90 bg-primary text-primary-foreground"><ChevronLeft size={18} /></button>
          <button onClick={() => scroll(1)} className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full shadow-md transition-all hover:opacity-90 bg-primary text-primary-foreground"><ChevronRight size={18} /></button>

          <div ref={scrollRef} className="flex gap-3 overflow-x-auto pb-4 sm:gap-5 md:pb-2 scroll-smooth snap-x no-scrollbar">
            {collections.map((col, i) =>
              <div key={col.id} data-collection-card className="flex-shrink-0 w-[164px] sm:w-[280px] md:w-[300px] snap-start group">
                <LocalizedLink to={`/shop?brand=${encodeURIComponent(BRAND)}&collection=${encodeURIComponent(col.name)}`} onClick={(event) => handleBrandCollectionFilterClick(event, col.name)} className="group block overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/50">
                  <div className="relative h-[164px] overflow-hidden bg-card sm:h-[230px]">
                    {col.image ?
                      <div className="absolute inset-x-0 top-0 h-[calc(100%-48px)] overflow-hidden">
                        <MediaImage src={col.image} alt={`${BRAND} ${col.name}`} fill sizes="(max-width: 639px) 164px, (max-width: 767px) 280px, 300px" quality={82} priority={i === 0} className="h-full w-full scale-[1.18] object-contain transition-transform duration-700 group-hover:scale-[1.24] sm:scale-[1.12] sm:group-hover:scale-[1.18]" />
                      </div> :
                      <div className="absolute inset-x-0 top-0 flex h-[calc(100%-48px)] items-center justify-center text-primary"><span className="text-xs tracking-[0.2em] uppercase">{BRAND}</span></div>
                    }
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-12 items-center px-3 sm:px-4">
                      <h3 className="line-clamp-2 font-body text-xs font-semibold leading-tight text-primary sm:text-sm">{col.name}</h3>
                    </div>
                  </div>
                </LocalizedLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
