import { useEffect, useState } from 'react';
import { useBrandCatalog } from '@/components/shared/BrandCatalogProvider';
import { dataClient } from '@/lib/dataClient';
import { asArray } from '@/lib/base44Data';

const EMPTY_PRODUCTS = [];

export function useBrandProducts(brandName) {
  const catalog = useBrandCatalog(brandName);
  const initialProducts = Array.isArray(catalog?.products) ? catalog.products : null;
  const [state, setState] = useState({ brandName, products: EMPTY_PRODUCTS, loading: true, error: null });

  useEffect(() => {
    // An empty server result is still a complete result, not a reason to fetch.
    if (initialProducts !== null) return;
    let active = true;
    setState({ brandName, products: EMPTY_PRODUCTS, loading: true, error: null });
    dataClient.entities.Products.filter({ brand: brandName }, '-created_date')
      .then((data) => {
        if (active) setState({ brandName, products: asArray(data), loading: false, error: null });
      })
      .catch((error) => {
        if (active) setState({ brandName, products: EMPTY_PRODUCTS, loading: false, error });
      });
    return () => { active = false; };
  }, [brandName, initialProducts]);

  if (initialProducts !== null) return { products: initialProducts, loading: false, error: null };
  if (state.brandName !== brandName) return { products: EMPTY_PRODUCTS, loading: true, error: null };
  return state;
}
