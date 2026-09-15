import { getRelatedProducts, getDealerProfileSummary } from '@/lib/base44Server';
import ProductDealerCard from '@/components/product/ProductDealerCard';
import RelatedProducts from '@/components/product/RelatedProducts';

// These components are rendered inside independent server Suspense boundaries.
// Their network calls never block the selected watch's gallery/details.
export async function ProductDealerSection({ product }) {
  const dealerId = product.dealerId || product.created_by_id;
  if (!dealerId) return null;
  let profile = null;
  try {
    profile = await getDealerProfileSummary(dealerId);
  } catch (error) {
    console.error('Unable to load product dealer:', error?.message || error);
  }
  return <ProductDealerCard product={product} initialProfile={profile} />;
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
