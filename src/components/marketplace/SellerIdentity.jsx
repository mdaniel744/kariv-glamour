'use client';
import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useLanguage } from '@/lib/languageContext';
import { isSellerPublic, isVerifiedSeller, sellerDisplayName } from '@/lib/marketplace';
import { marketplaceCopy } from '@/lib/marketplaceCopy';
import { useLiveSeller } from '@/lib/useLiveSeller';

export default function SellerIdentity({ seller: initialSeller, compact = false, snapshot = false }) {
  const seller = useLiveSeller(initialSeller, snapshot);
  const { locale } = useLanguage();
  const copy = marketplaceCopy(locale);
  if (!seller || (!snapshot && !isSellerPublic(seller))) return <p className="text-xs leading-relaxed text-muted-foreground">{snapshot ? copy.legacy : copy.unresolved}</p>;
  const name = sellerDisplayName(seller);
  return <div className={'relative z-20 pointer-events-auto space-y-1 ' + (compact ? 'text-xs' : 'rounded-2xl border border-border bg-card p-4 text-sm')}>
    <p>{copy.soldBy} {snapshot ? <strong>{name}</strong> : <LocalizedLink className="font-medium text-primary hover:underline" to={'/dealer-profile/' + encodeURIComponent(seller.user_id)}>{name}</LocalizedLink>}</p>
    {!snapshot && seller.seller_type === 'third_party' && isVerifiedSeller(seller) && <p className="text-xs text-muted-foreground">{copy.verified}</p>}
    {!snapshot && Number(seller.review_count) > 0 && <p className="text-xs">{Number(seller.average_rating).toFixed(1)} ★ · {seller.review_count} {copy.reviews}</p>}
    {!compact && <p className="leading-relaxed text-muted-foreground">{seller.seller_type === 'marketplace_owned' ? copy.owned : copy.thirdParty}</p>}
    {snapshot && <p className="text-xs text-muted-foreground">{[seller.legal_name, seller.registered_address_line_1, seller.registered_city, seller.registered_postal_code, seller.registered_country_code].filter(Boolean).join(', ')}</p>}
  </div>;
}
