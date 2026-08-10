import { useState, useEffect } from 'react';
import { dataClient } from '@/lib/dataClient';
import { asArray } from '@/lib/base44Data';
import { isCatalogDatabaseConfigured } from '@/lib/supabaseData';

function firstNonEmpty(...values) {
  return values.find(value => typeof value === 'string' && value.trim().length > 0)?.trim() || '';
}

function normalizeCollectionKey(value) {
  return firstNonEmpty(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, 'and')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function buildFallbackLookup(fallbackData = []) {
  const lookup = new Map();

  fallbackData.forEach(collection => {
    [
      collection.slug,
      collection.name,
      collection.name_en,
      collection.collectionName,
      collection.collectionName_en
    ].forEach(value => {
      const key = normalizeCollectionKey(value);
      if (key && !lookup.has(key)) lookup.set(key, collection);
    });
  });

  return lookup;
}

function findFallbackCollection(record, lookup) {
  const keys = [
    record.slug,
    record.collectionName_en,
    record.collectionName_de,
    record.collectionName,
    record.name
  ].map(normalizeCollectionKey).filter(Boolean);

  return keys.map(key => lookup.get(key)).find(Boolean) || null;
}

/**
 * Fetches collections for a brand from the catalog database.
 *
 * DB records are mapped to the shape the carousel/grid components expect:
 * { id, name, slug, image, description_en, description_de,
 *   shortDescription_en, shortDescription_de, parentCollection }
 *
 * Database records remain the source of truth when present. The local
 * collection list only fills missing rows or blank media fields so production
 * pages do not lose carousels while dashboard records are still being built.
 */
function mapCollectionRecord(record, fallbackCollection = null) {
  const fallbackDescriptionEn = fallbackCollection?.description_en || fallbackCollection?.description || fallbackCollection?.shortDescription_en || '';
  const fallbackDescriptionDe = fallbackCollection?.description_de || fallbackCollection?.description || fallbackCollection?.shortDescription_de || '';
  const descriptionEn = firstNonEmpty(record.description_en, record.description, fallbackDescriptionEn);
  const descriptionDe = firstNonEmpty(record.description_de, record.description, fallbackDescriptionDe);
  const name = firstNonEmpty(
    record.collectionName_en,
    record.collectionName_de,
    record.collectionName,
    record.name,
    fallbackCollection?.name,
    fallbackCollection?.name_en
  );
  const slug = firstNonEmpty(record.slug, fallbackCollection?.slug, normalizeCollectionKey(name));

  return {
    ...fallbackCollection,
    id: record.id ?? fallbackCollection?.id,
    name,
    slug,
    image: firstNonEmpty(record.heroImage, record.image, record.image_url, record.imageUrl, fallbackCollection?.image),
    description_en: descriptionEn,
    description_de: descriptionDe,
    shortDescription_en: firstNonEmpty(record.shortDescription_en, descriptionEn, fallbackCollection?.shortDescription_en),
    shortDescription_de: firstNonEmpty(record.shortDescription_de, descriptionDe, fallbackCollection?.shortDescription_de),
    parentCollection: record.parentCollection ?? fallbackCollection?.parentCollection ?? null,
    displayOrder: record.displayOrder ?? fallbackCollection?.displayOrder
  };
}

function mapCollectionRecords(records, fallbackData = []) {
  const fallbackLookup = buildFallbackLookup(fallbackData);
  return records.map(record => mapCollectionRecord(record, findFallbackCollection(record, fallbackLookup)));
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
          setCollections(mapCollectionRecords(records, fallbackData));
          return;
        }
        setCollections(fallbackData);
      })
      .catch(() => {
        if (mounted) setCollections(fallbackData);
      })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [brandName, fallbackData, shouldUseFallback]);

  return { collections, loading };
}
