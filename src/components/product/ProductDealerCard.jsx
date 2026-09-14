'use client';
import { useEffect, useState } from 'react';
import SellerIdentity from '@/components/marketplace/SellerIdentity';
import { getDealerRatingSummary } from '@/actions/dealerReviews';
export default function ProductDealerCard({ product }) {
  const [seller, setSeller] = useState(product.seller || null);
  useEffect(() => {
    setSeller(product.seller || null);
    if (!product.dealerId) return;
    let active = true;
    const refresh = () => getDealerRatingSummary(product.dealerId).then(result => {
      if (active) setSeller(result.seller);
    }).catch(() => {});
    const timer = setInterval(refresh, 45000);
    return () => { active = false; clearInterval(timer); };
  }, [product.dealerId, product.seller]);
  return <SellerIdentity seller={seller} />;
}
