'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { normalizeCollectionKey } from '@/lib/collectionOrdering';

const BrandCatalogContext = createContext(null);

// A brand route already loads its catalog on the server. Share that exact
// snapshot with the collection rail and product grid on their first render.
export default function BrandCatalogProvider({ slug, brand, products, collections, children }) {
  const value = useMemo(() => ({ slug, brand, products, collections }), [slug, brand, products, collections]);
  return <BrandCatalogContext.Provider value={value}>{children}</BrandCatalogContext.Provider>;
}

export function useBrandCatalog(brandName) {
  const catalog = useContext(BrandCatalogContext);
  const requested = normalizeCollectionKey(brandName);
  if (!catalog || !requested) return null;
  return [catalog.slug, catalog.brand?.brandName].some((name) => normalizeCollectionKey(name) === requested)
    ? catalog
    : null;
}
