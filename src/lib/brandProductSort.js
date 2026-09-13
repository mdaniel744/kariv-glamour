import { getProductPricing } from './productMerchant.js';

export function sortBrandProducts(products, sort = '-created_date', getPricing = getProductPricing) {
  const descending = sort.startsWith('-') || sort === 'featured';
  const field = sort === 'featured' ? 'isFeatured' : sort.replace(/^-/, '');
  return [...products].sort((a, b) => {
    const av = field === 'price' ? getPricing(a).price : a[field];
    const bv = field === 'price' ? getPricing(b).price : b[field];
    if (av === bv) return 0;
    if (av == null || av === '') return 1;
    if (bv == null || bv === '') return -1;
    const comparison = field === 'price' || field === 'yearOfProduction' || field === 'isFeatured'
      ? Number(av) - Number(bv)
      : String(av).localeCompare(String(bv));
    return descending ? -comparison : comparison;
  });
}
