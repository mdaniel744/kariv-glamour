import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import BrandMarquee from '@/components/home/BrandMarquee';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import CategoryGrid from '@/components/home/CategoryGrid';
import EditorialSection from '@/components/home/EditorialSection';
import TrustBar from '@/components/shared/TrustBar';

export default function Home() {
  return (
    <div className="-mt-16 md:-mt-28">
      <HeroSection />
      <BrandMarquee />
      <FeaturedProducts
        index="01"
        title="Featured Timepieces"
        subtitle="Handpicked selections from our curated inventory"
        filter={{ featured: true }}
        linkTo="/shop"
        limit={4}
      />
      <FeaturedProducts
        index="02"
        title="New Arrivals"
        subtitle="The latest additions to our collection"
        filter={{ isNewArrival: true }}
        linkTo="/shop?isNewArrival=true"
        limit={4}
      />
      <FeaturedProducts
        index="03"
        title="Certified Pre-Owned"
        subtitle="Authenticated and inspected pre-owned luxury watches"
        filter={{ isCertifiedPreOwned: true }}
        linkTo="/shop?isCertifiedPreOwned=true"
        limit={4}
      />
      <CategoryGrid />
      <TrustBar />
      <EditorialSection />
    </div>
  );
}