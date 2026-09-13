'use client';

import React, { useEffect, useState } from 'react';
import { ChevronRight, Store } from 'lucide-react';
import LocalizedLink from '@/components/LocalizedLink';
import StarRating from '@/components/dealer/StarRating';
import MediaImage from '@/components/shared/MediaImage';
import { getDealerRatingSummary } from '@/actions/dealerReviews';
import { getMediaVariant } from '@/lib/media';
import { useLanguage } from '@/lib/languageContext';

export default function ProductDealerCard({ product, initialProfile = null }) {
  const { locale } = useLanguage();
  const dealerUserId = product.dealerId || product.created_by_id;
  const [profile, setProfile] = useState(initialProfile);

  useEffect(() => {
    setProfile(initialProfile);
    if (!dealerUserId) return;
    let active = true;
    getDealerRatingSummary(dealerUserId).then((summary) => {
      if (active && summary) {
        setProfile({
          ...summary,
          ...(initialProfile || {}),
          averageRating: summary.averageRating,
          totalReviews: summary.totalReviews,
        });
      }
    }).catch(() => {});
    return () => { active = false; };
  }, [dealerUserId, initialProfile]);

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
          {averageRating > 0 && (
            <div className="flex items-center gap-1.5 mt-0.5">
              <StarRating rating={Math.round(averageRating)} size={10} />
              <span className="text-[10px] text-muted-foreground">{averageRating.toLocaleString(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 })} ({profile.totalReviews} {locale === 'cs' ? 'hodnocení' : locale === 'de' ? 'Bewertungen' : 'reviews'})</span>
            </div>
          )}
        </div>
        <ChevronRight size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
    </LocalizedLink>
  );
}
