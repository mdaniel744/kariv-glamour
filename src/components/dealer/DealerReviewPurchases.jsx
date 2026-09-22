'use client';

import React from 'react';
import { Watch } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import MediaImage from '@/components/shared/MediaImage';
import { getMediaVariant } from '@/lib/media';
import { useLocalizedField } from '@/lib/localize';

export default function DealerReviewPurchases({ watches = [], className = '' }) {
  const { t } = useTranslation();
  const { localize } = useLocalizedField();
  const purchases = (Array.isArray(watches) ? watches : []).flatMap((watch, index) => {
    const title = localize(watch, 'title').trim();
    if (!title) return [];
    return [{ ...watch, _key: `${title}-${index}`, _title: title }];
  });

  if (!purchases.length) return null;

  return (
    <div className={`border-t border-border/70 pt-4 ${className}`.trim()}>
      <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
        {t('components.dealerReviews.reviewedWatches')}
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        {purchases.map((watch) => (
          <div key={watch._key} className="flex min-w-0 items-center gap-3 rounded-xl bg-muted/50 p-2.5">
            <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-background text-muted-foreground">
              {watch.image ? (
                <MediaImage
                  src={getMediaVariant(watch.image, 'thumb')}
                  alt={watch._title}
                  fill
                  sizes="56px"
                  quality={76}
                  className="object-cover"
                />
              ) : (
                <Watch size={22} aria-hidden="true" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="break-words text-sm font-medium leading-snug text-foreground">{watch._title}</p>
              {Number.isSafeInteger(Number(watch.quantity)) && Number(watch.quantity) > 1 && (
                <p className="mt-1 text-xs text-muted-foreground">×{Number(watch.quantity)}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
