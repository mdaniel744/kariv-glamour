import { useState, useEffect } from 'react';
import { dataClient } from '@/lib/dataClient';
import { asArray } from '@/lib/base44Data';

/**
 * Fetches collections for a brand from the database, falling back to
 * hardcoded data when no DB records exist.
 *
 * DB records are mapped to the shape the carousel/grid components expect:
 * { id, name, slug, image, description_en, description_de,
 *   shortDescription_en, shortDescription_de, parentCollection }
 */
export function useBrandCollections(brandName, fallbackData = []) {
  const [collections, setCollections] = useState(fallbackData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    dataClient.entities.Collections.filter({ brand: brandName }, 'collectionName', 100)
      .then(response => {
        if (!mounted) return;
        const records = asArray(response);
        if (records.length > 0) {
          setCollections(records.map(r => ({
            id: r.id,
            name: r.collectionName_en || r.collectionName_de || r.collectionName || '',
            slug: r.slug,
            image: r.heroImage || '',
            description_en: r.description_en || r.description || '',
            description_de: r.description_de || r.description || '',
            shortDescription_en: r.description_en || r.description || '',
            shortDescription_de: r.description_de || r.description || '',
            parentCollection: null
          })));
        }
      })
      .catch(() => {})
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [brandName]);

  return { collections, loading };
}
