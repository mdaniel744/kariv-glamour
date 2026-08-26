import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import LocalizedLink from '@/components/LocalizedLink';

export default function SeoPillRail({ items, getLabel }) {
  const railRef = React.useRef(null);
  const hoverFrameRef = React.useRef(null);
  const hoverDelayRef = React.useRef(null);

  const stopHoverScroll = React.useCallback(() => {
    if (hoverDelayRef.current !== null) {
      window.clearTimeout(hoverDelayRef.current);
      hoverDelayRef.current = null;
    }
    if (hoverFrameRef.current !== null) {
      window.cancelAnimationFrame(hoverFrameRef.current);
      hoverFrameRef.current = null;
    }
  }, []);

  const startHoverScroll = React.useCallback((direction) => {
    stopHoverScroll();
    const move = () => {
      const rail = railRef.current;
      if (!rail) return;
      const previous = rail.scrollLeft;
      rail.scrollLeft += direction * 3;
      if (rail.scrollLeft === previous) {
        hoverFrameRef.current = null;
        return;
      }
      hoverFrameRef.current = window.requestAnimationFrame(move);
    };

    hoverDelayRef.current = window.setTimeout(() => {
      hoverDelayRef.current = null;
      hoverFrameRef.current = window.requestAnimationFrame(move);
    }, 300);
  }, [stopHoverScroll]);

  const nudge = (direction) => {
    railRef.current?.scrollBy({
      left: direction * railRef.current.clientWidth * 0.72,
      behavior: 'smooth',
    });
  };

  React.useEffect(() => stopHoverScroll, [stopHoverScroll]);

  return (
    <nav className="group/seo-pill-rail relative" aria-label="Related watch collections">
      <div ref={railRef} className="no-scrollbar flex w-full snap-x snap-proximity gap-2.5 overflow-x-auto overscroll-x-contain scroll-smooth scroll-px-1 pb-1 touch-pan-x">
        {items.map((item, index) => (
          <LocalizedLink
            key={`${item.link}-${index}`}
            to={item.link}
            className="flex min-h-10 flex-none snap-start items-center whitespace-nowrap rounded-full border border-border bg-background/80 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            {getLabel(item)}
          </LocalizedLink>
        ))}
      </div>

      <button type="button" aria-label="Scroll related collections left" onClick={() => nudge(-1)} onMouseEnter={() => startHoverScroll(-1)} onMouseLeave={stopHoverScroll} className="absolute left-0 top-0 hidden h-10 w-12 items-center justify-start bg-gradient-to-r from-background via-background/90 to-transparent pl-1 text-foreground opacity-0 transition-opacity hover:text-primary focus-visible:opacity-100 group-hover/seo-pill-rail:opacity-100 md:flex">
        <ChevronLeft size={22} aria-hidden="true" />
      </button>
      <button type="button" aria-label="Scroll related collections right" onClick={() => nudge(1)} onMouseEnter={() => startHoverScroll(1)} onMouseLeave={stopHoverScroll} className="absolute right-0 top-0 hidden h-10 w-12 items-center justify-end bg-gradient-to-l from-background via-background/90 to-transparent pr-1 text-foreground opacity-0 transition-opacity hover:text-primary focus-visible:opacity-100 group-hover/seo-pill-rail:opacity-100 md:flex">
        <ChevronRight size={22} aria-hidden="true" />
      </button>
    </nav>
  );
}
