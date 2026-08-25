// @ts-nocheck -- Carousel primitives in this JavaScript codebase do not expose usable inferred prop types.
'use client';

import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import MediaImage from '@/components/shared/MediaImage';
import { getMediaVariant } from '@/lib/media';

export default function ProductGallery({
  images,
  title,
  labels,
}) {
  const [api, setApi] = useState(null);
  const [selected, setSelected] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [loaded, setLoaded] = useState(() => new Set([0, 1]));
  const imageSignature = images.filter(Boolean).join('\n');
  const imageList = useMemo(() => imageSignature.split('\n').filter(Boolean), [imageSignature]);

  useEffect(() => {
    if (!api) return undefined;
    const sync = () => {
      const index = api.selectedScrollSnap();
      setSelected(index);
      setLoaded((current) => new Set([...current, index, Math.min(index + 1, imageList.length - 1)]));
    };
    sync();
    api.on('select', sync);
    api.on('reInit', sync);
    return () => {
      api.off('select', sync);
      api.off('reInit', sync);
    };
  }, [api, imageList.length]);

  useEffect(() => {
    if (!api) return;
    api.scrollTo(0, true);
    setSelected(0);
    setLoaded(new Set([0, 1]));
  }, [api, imageList]);

  useEffect(() => {
    if (!lightboxOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setLightboxOpen(false);
      if (event.key === 'ArrowLeft') api?.scrollPrev();
      if (event.key === 'ArrowRight') api?.scrollNext();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [api, lightboxOpen]);

  if (imageList.length === 0) {
    return (
      <div className="mb-3 flex aspect-[4/5] items-center justify-center overflow-hidden bg-card text-sm text-muted-foreground/40 sm:aspect-square md:mb-4">
        {labels.noImage}
      </div>
    );
  }

  const countLabel = labels.imageCount(selected + 1, imageList.length);

  return (
    <>
      <Carousel
        setApi={setApi}
        opts={{ align: 'start', loop: imageList.length > 1 }}
        className="group mb-3 md:mb-4"
        aria-label={labels.gallery}
      >
        <CarouselContent className="ml-0">
          {imageList.map((image, index) => (
            <CarouselItem key={`${image}-${index}`} className="pl-0">
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="relative block aspect-[4/5] w-full cursor-zoom-in overflow-hidden bg-card sm:aspect-square"
                aria-label={`${labels.openZoom} — ${labels.imageCount(index + 1, imageList.length)}`}
              >
                {loaded.has(index) && (
                  <MediaImage
                    src={getMediaVariant(image, 'display')}
                    alt={`${title} — ${labels.imageCount(index + 1, imageList.length)}`}
                    fill
                    priority={index === 0}
                    quality={index === 0 ? 88 : 84}
                    sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1279px) 50vw, 592px"
                    draggable={false}
                    className="select-none object-cover"
                  />
                )}
                <span className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-background/85 text-foreground shadow-sm backdrop-blur">
                  <Expand size={17} aria-hidden="true" />
                </span>
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>

        {imageList.length > 1 && (
          <>
            <button type="button" onClick={() => api?.scrollPrev()} className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border/70 bg-background/85 text-foreground opacity-100 shadow-sm backdrop-blur transition hover:border-primary hover:text-primary md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100" aria-label={labels.previous}>
              <ChevronLeft size={20} />
            </button>
            <button type="button" onClick={() => api?.scrollNext()} className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border/70 bg-background/85 text-foreground opacity-100 shadow-sm backdrop-blur transition hover:border-primary hover:text-primary md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100" aria-label={labels.next}>
              <ChevronRight size={20} />
            </button>
            <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-background/80 px-3 py-1 text-[10px] tracking-[0.12em] text-foreground backdrop-blur" aria-live="polite">
              {countLabel}
            </span>
          </>
        )}
      </Carousel>

      {imageList.length > 1 && (
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
          {imageList.map((image, index) => (
            <button key={`${image}-thumb-${index}`} type="button" onClick={() => api?.scrollTo(index)} className={`relative h-16 w-16 flex-shrink-0 overflow-hidden border ${index === selected ? 'border-primary' : 'border-border'}`} aria-current={index === selected ? 'true' : undefined} aria-label={labels.view(index + 1)}>
              <MediaImage src={getMediaVariant(image, 'thumb')} alt="" fill sizes="64px" quality={76} className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-3 sm:p-6" role="dialog" aria-modal="true" aria-label={labels.zoom}>
          <button type="button" onClick={() => setLightboxOpen(false)} className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20" aria-label={labels.closeZoom}>
            <X size={22} />
          </button>
          {imageList.length > 1 && (
            <>
              <button type="button" onClick={() => api?.scrollPrev()} className="absolute left-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-6" aria-label={labels.previous}>
                <ChevronLeft size={26} />
              </button>
              <button type="button" onClick={() => api?.scrollNext()} className="absolute right-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-6" aria-label={labels.next}>
                <ChevronRight size={26} />
              </button>
            </>
          )}
          <div className="relative h-[88vh] w-[92vw] max-w-[1600px]">
            <MediaImage
              key={`${imageList[selected]}-zoom`}
              src={getMediaVariant(imageList[selected], 'zoom')}
              alt={`${title} — ${countLabel}`}
              fill
              priority
              unoptimized
              className="object-contain"
            />
          </div>
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-xs tracking-wider text-white backdrop-blur">{countLabel}</span>
        </div>
      )}
    </>
  );
}
