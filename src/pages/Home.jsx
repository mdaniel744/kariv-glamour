import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import BrandMarquee from '@/components/home/BrandMarquee';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import CategoryGrid from '@/components/home/CategoryGrid';
import EditorialSection from '@/components/home/EditorialSection';
import EditorialHero from '@/components/home/EditorialHero';
import TrustBar from '@/components/shared/TrustBar';
import PopularCollections from '@/components/home/PopularCollections';

export default function Home() {
  return (
    <div className="-mt-16 md:-mt-28">
      <HeroSection />
      <BrandMarquee />
      <FeaturedProducts
        index="01"
        title="Ausgewählte Zeitmesser"
        subtitle="Handverlesene Auswahl aus unserem kuratierten Inventar"
        filter={{ featured: true }}
        linkTo="/shop"
        limit={4}
      />
      <FeaturedProducts
        index="02"
        title="Neuheiten"
        subtitle="Die neuesten Ergänzungen unserer Kollektion"
        filter={{ isNewArrival: true }}
        linkTo="/shop?isNewArrival=true"
        limit={4}
      />
      <FeaturedProducts
        index="03"
        title="Certified Pre-Owned"
        subtitle="Authentifizierte und geprüfte gebrauchte Luxusuhren"
        filter={{ isCertifiedPreOwned: true }}
        linkTo="/shop?isCertifiedPreOwned=true"
        limit={4}
      />
      <EditorialHero />
      <CategoryGrid />
      <PopularCollections />
      <TrustBar />
      <EditorialSection />
    </div>
  );
}