'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import HeroSection from '@/components/home/HeroSection';
import BrandMarquee from '@/components/home/BrandMarquee';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import CategoryGrid from '@/components/home/CategoryGrid';
import PopularModels from '@/components/home/PopularModels';
import EditorialSection from '@/components/home/EditorialSection';
import EditorialHero from '@/components/home/EditorialHero';
import TrustBar from '@/components/shared/TrustBar';

export default function HomePageClient() {
  const { t } = useTranslation();

  return (
    <div className="-mt-16 md:-mt-28">
      <HeroSection />
      <BrandMarquee />
      <CategoryGrid />
      <PopularModels />
      <FeaturedProducts
        index="01"
        title={t('components.featuredProducts.section01.title')}
        subtitle={t('components.featuredProducts.section01.subtitle')}
        filter={{ featured: true }}
        linkTo="/shop"
        limit={4}
      />
      <TrustBar />
      <FeaturedProducts
        index="02"
        title={t('components.featuredProducts.section02.title')}
        subtitle={t('components.featuredProducts.section02.subtitle')}
        filter={{ isNewArrival: true }}
        linkTo="/shop?isNewArrival=true"
        limit={4}
      />
      <EditorialHero />
      <FeaturedProducts
        index="03"
        title={t('components.featuredProducts.section03.title')}
        subtitle={t('components.featuredProducts.section03.subtitle')}
        filter={{ isCertifiedPreOwned: true }}
        linkTo="/shop?isCertifiedPreOwned=true"
        limit={4}
      />
      <EditorialSection />
    </div>
  );
}
