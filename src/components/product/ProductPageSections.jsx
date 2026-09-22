import { getRelatedProducts, getDealerProfileSummary } from '@/lib/base44Server';
import { getProductDealerPreviewData } from '@/lib/productDealerPreviewServer';
import ProductDealerCard from '@/components/product/ProductDealerCard';
import RelatedProducts from '@/components/product/RelatedProducts';
import DealerCustomerReviewsPreview from '@/components/product/DealerCustomerReviewsPreview';

// These components are rendered inside independent server Suspense boundaries.
// Their network calls never block the selected watch's gallery/details.
export async function ProductDealerSection({ product }) {
  const dealerId = product.dealerId;
  if (!dealerId) return null;
  let profile = null;
  try {
    const dealer = await getProductDealerPreviewData(dealerId);
    if (dealer) {
      profile = dealer;
    } else {
      profile = { ...(await getDealerProfileSummary(dealerId) || {}), ratingsAvailable: false };
    }
  } catch (error) {
    console.error('Unable to load product dealer:', error?.message || error);
    profile = { ratingsAvailable: false };
  }
  return <ProductDealerCard product={product} initialProfile={profile} />;
}

export async function RelatedProductsSection({ product, locale }) {
  try {
    const products = await getRelatedProducts(product, 4, locale);
    return <RelatedProducts product={product} products={products} />;
  } catch (error) {
    console.error('Unable to load related watches:', error?.message || error);
    return null;
  }
}

export async function DealerCustomerReviewsSection({ product }) {
  const dealerId = product.dealerId;
  if (!dealerId) return null;
  try {
    const dealer = await getProductDealerPreviewData(dealerId);
    return dealer?.approved ? <DealerCustomerReviewsPreview dealer={dealer} /> : null;
  } catch (error) {
    console.error('Unable to load dealer customer-review preview:', error?.message || error);
    return null;
  }
}
