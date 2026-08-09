import { useState, useEffect } from 'react';
import { dataClient } from '@/lib/dataClient';
import { asArray } from '@/lib/base44Data';
import { isCatalogDatabaseConfigured } from '@/lib/supabaseData';

/**
 * Fetches collections for a brand from the catalog database.
 *
 * DB records are mapped to the shape the carousel/grid components expect:
 * { id, name, slug, image, description_en, description_de,
 *   shortDescription_en, shortDescription_de, parentCollection }
 *
 * Hardcoded fallback data is only used when the catalog DB is not configured
 * locally. In database-backed environments, this prevents stale fallback media
 * from loading before uploaded collection images arrive from Supabase.
 */
function mapCollectionRecord(record) {
  const descriptionEn = record.description_en || record.description || '';
  const descriptionDe = record.description_de || record.description || '';

  return {
    id: record.id,
    name: record.collectionName_en || record.collectionName_de || record.collectionName || '',
    slug: record.slug,
    image: record.heroImage || '',
    description_en: descriptionEn,
    description_de: descriptionDe,
    shortDescription_en: record.shortDescription_en || descriptionEn,
    shortDescription_de: record.shortDescription_de || descriptionDe,
    parentCollection: null
  };
}

export function useBrandCollections(brandName, fallbackData = []) {
  const shouldUseFallback = !isCatalogDatabaseConfigured;
  const [collections, setCollections] = useState(() => shouldUseFallback ? fallbackData : []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setCollections(shouldUseFallback ? fallbackData : []);

    dataClient.entities.Collections.filter({ brand: brandName }, 'collectionName', 100)
      .then(response => {
        if (!mounted) return;
        const records = asArray(response);
        if (records.length > 0) {
          setCollections(records.map(mapCollectionRecord));
          return;
        }
        setCollections(shouldUseFallback ? fallbackData : []);
      })
      .catch(() => {
        if (mounted) setCollections(shouldUseFallback ? fallbackData : []);
      })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [brandName, fallbackData, shouldUseFallback]);

  return { collections, loading };
}
