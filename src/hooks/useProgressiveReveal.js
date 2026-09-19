import { useEffect, useRef, useState } from 'react';

// Brand product grids already have the full filtered/sorted list in memory
// (client-side filtering needs that to work correctly) — this only limits
// how much of it gets rendered into the DOM and has its images requested at
// once, revealing more as the visitor scrolls near the bottom. No page
// numbers, no new URLs, no re-fetching: it's the same list, shown gradually.
export function useProgressiveReveal(items, batchSize = 24) {
  const [count, setCount] = useState(batchSize);
  const sentinelRef = useRef(null);

  // A new filtered/sorted list (not just a longer one) must restart from the
  // first batch — otherwise a stale offset could hide items or, after a
  // filter narrows the results, "reveal" past the end of a shorter list.
  useEffect(() => {
    setCount(batchSize);
  }, [items, batchSize]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || count >= items.length) return undefined;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) setCount((current) => Math.min(current + batchSize, items.length));
    }, { rootMargin: '600px 0px' });
    observer.observe(node);
    return () => observer.disconnect();
  }, [items, batchSize, count]);

  return { visibleItems: items.slice(0, count), sentinelRef, hasMore: count < items.length };
}
