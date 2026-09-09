import { useState, useEffect, useMemo } from 'react';
import { useBrandCatalog } from '@/components/shared/BrandCatalogProvider';
import { useBrandProducts } from '@/hooks/useBrandProducts';
import { dataClient } from '@/lib/dataClient';
import { asArray } from '@/lib/base44Data';
import { isCatalogDatabaseConfigured } from '@/lib/supabaseData';
import { normalizeCollectionKey, sortCollectionsByProductCount } from '@/lib/collectionOrdering';

function firstNonEmpty(...values) {
  return values.find(value => typeof value === 'string' && value.trim().length > 0)?.trim() || '';
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

const EMPTY_COLLECTIONS = [];

export function useBrandCollections(brandName, fallbackData = EMPTY_COLLECTIONS) {
  const catalog = useBrandCatalog(brandName);
  const initialCollections = Array.isArray(catalog?.collections) ? catalog.collections : null;
  const { products, loading: productsLoading, error: productsError } = useBrandProducts(brandName);
  const [state, setState] = useState({ brandName, records: EMPTY_COLLECTIONS, loading: true, error: null });

  useEffect(() => {
    if (initialCollections !== null) return;
    let active = true;
    setState({ brandName, records: EMPTY_COLLECTIONS, loading: true, error: null });
    dataClient.entities.Collections.filter({ brand: brandName }, 'collectionName')
      .then((data) => {
        if (active) setState({ brandName, records: asArray(data), loading: false, error: null });
      })
      .catch((error) => {
        if (active) setState({ brandName, records: EMPTY_COLLECTIONS, loading: false, error });
      });
    return () => { active = false; };
  }, [brandName, initialCollections]);

  const currentState = state.brandName === brandName ? state : null;
  const records = initialCollections ?? currentState?.records ?? EMPTY_COLLECTIONS;
  const collectionsLoading = initialCollections === null && (!currentState || currentState.loading);
  const collections = useMemo(() => {
    if (collectionsLoading && isCatalogDatabaseConfigured) return EMPTY_COLLECTIONS;
    const available = records.length > 0 ? mapCollectionRecords(records, fallbackData) : fallbackData;
    return sortCollectionsByProductCount(available, products);
  }, [collectionsLoading, records, fallbackData, products]);

  return {
    collections,
    loading: collectionsLoading || productsLoading,
    error: (initialCollections === null ? currentState?.error : null) || productsError,
  };
}
