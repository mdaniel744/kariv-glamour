import 'server-only';
import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { WatchGuides, STORE_ID } from '@/lib/supabaseData';

// Public tenant-scoped records only. Failures must not become cached false 404s.
const loadGuides = unstable_cache(
  () => WatchGuides.filter({ published: true }, '-updated_date'),
  ['published-watch-guides', STORE_ID], { revalidate: 300 },
);
export const getPublishedGuides = cache(loadGuides);
export const getPublishedGuide = cache(async (slug) =>
  (await getPublishedGuides()).find((guide) => guide.slug === slug || guide.id === slug) || null
);
