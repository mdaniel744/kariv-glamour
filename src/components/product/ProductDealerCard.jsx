'use client';

import React from 'react';
import { ChevronRight, Store } from 'lucide-react';
import LocalizedLink from '@/components/LocalizedLink';
import StarRating from '@/components/dealer/StarRating';
import MediaImage from '@/components/shared/MediaImage';
import { getMediaVariant } from '@/lib/media';
import { useLanguage } from '@/lib/languageContext';

export default function ProductDealerCard({ product, initialProfile = null }) {
  const { locale } = useLanguage();
  const dealerUserId = product.dealerId;
  const profile = initialProfile;

  if (!dealerUserId) return null;
  const averageRating = Number(profile?.averageRating || 0);
  return (
    <LocalizedLink to={`/dealer-profile/${dealerUserId}`} className="block border border-border p-4 hover:border-primary transition-colors group">
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
          {profile?.logoImage ? (
            <MediaImage src={getMediaVariant(profile.logoImage, 'thumb')} alt="" fill sizes="40px" quality={76} className="object-cover" />
          ) : (
            <Store size={16} className="text-primary" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground">{locale === 'cs' ? 'Prodejce' : locale === 'de' ? 'Verkäufer' : 'Sold By'}</p>
          <p className="text-sm text-foreground truncate group-hover:text-primary transition-colors">{profile?.displayName || product.dealerName || (locale === 'cs' ? 'Zobrazit profil prodejce' : locale === 'de' ? 'Händlerprofil ansehen' : 'View Dealer Profile')}</p>
          {profile?.ratingsAvailable === true ? (
            <div className="flex items-center gap-1.5 mt-0.5">
              <StarRating rating={Math.round(averageRating)} size={10} />
              <span className="text-[10px] text-muted-foreground">{averageRating.toLocaleString(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 })} ({Number(profile.totalReviews || 0)} {locale === 'cs' ? 'hodnocení' : locale === 'de' ? 'Bewertungen' : 'reviews'})</span>
            </div>
          ) : profile?.ratingsAvailable === false ? (
            <div className="mt-0.5 flex items-center gap-1.5">
              <StarRating rating={0} size={10} />
              <span className="text-[10px] text-muted-foreground">
                {locale === 'cs' ? 'Hodnocení není dostupné' : locale === 'de' ? 'Bewertungen nicht verfügbar' : 'Ratings unavailable'}
              </span>
            </div>
          ) : null}
        </div>
        <ChevronRight size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
    </LocalizedLink>
  );
}
