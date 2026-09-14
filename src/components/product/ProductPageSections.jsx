import { getRelatedProducts } from '@/lib/base44Server';
import ProductDealerCard from '@/components/product/ProductDealerCard';
import RelatedProducts from '@/components/product/RelatedProducts';

// These components are rendered inside independent server Suspense boundaries.
// Their network calls never block the selected watch's gallery/details.
export async function ProductDealerSection({ product }) {
  return <ProductDealerCard product={product} />;
}

export async function RelatedProductsSection({ product }) {
  try {
    const products = await getRelatedProducts(product);
    return <RelatedProducts product={product} products={products} />;
  } catch (error) {
    console.error('Unable to load related watches:', error?.message || error);
    return null;
  }
}
