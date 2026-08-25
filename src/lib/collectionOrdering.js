function firstNonEmpty(...values) {
  return values.find(value => typeof value === 'string' && value.trim().length > 0)?.trim() || '';
}

export function normalizeCollectionKey(value) {
  return firstNonEmpty(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/['’]/g, '')
    .replace(/&/g, 'and')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function collectionKeys(collection) {
  return new Set([
    collection?.slug,
    collection?.name,
    collection?.name_en,
    collection?.name_de,
    collection?.collectionName,
    collection?.collectionName_en,
    collection?.collectionName_de,
  ].map(normalizeCollectionKey).filter(Boolean));
}

export function countProductsForCollection(collection, products = []) {
  const keys = collectionKeys(collection);
  const collectionId = collection?.id == null ? '' : String(collection.id);

  return products.reduce((count, product) => {
    const productCollectionId = product?.collectionId == null ? '' : String(product.collectionId);
    if (collectionId && productCollectionId && collectionId === productCollectionId) return count + 1;

    const productKeys = [
      product?.collection,
      product?.collectionName,
      product?.collectionName_en,
      product?.collectionName_de,
      product?.collectionSlug,
    ].map(normalizeCollectionKey).filter(Boolean);

    return productKeys.some(key => keys.has(key)) ? count + 1 : count;
  }, 0);
}

export function sortCollectionsByProductCount(collections = [], products = []) {
  return collections
    .map((collection, index) => ({
      collection,
      index,
      productCount: countProductsForCollection(collection, products),
    }))
    .sort((a, b) => {
      if (a.productCount !== b.productCount) return b.productCount - a.productCount;

      const aDisplayOrder = Number(a.collection?.displayOrder);
      const bDisplayOrder = Number(b.collection?.displayOrder);
      const aHasDisplayOrder = Number.isFinite(aDisplayOrder);
      const bHasDisplayOrder = Number.isFinite(bDisplayOrder);
      if (aHasDisplayOrder && bHasDisplayOrder && aDisplayOrder !== bDisplayOrder) {
        return aDisplayOrder - bDisplayOrder;
      }
      if (aHasDisplayOrder !== bHasDisplayOrder) return aHasDisplayOrder ? -1 : 1;
      return a.index - b.index;
    })
    .map(({ collection, productCount }) => ({ ...collection, productCount }));
}
