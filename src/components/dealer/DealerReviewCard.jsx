import React from 'react';
import { useTranslation } from 'react-i18next';
import StarRating from './StarRating';
import { BadgeCheck, ShieldCheck } from 'lucide-react';
import DealerReviewPurchases from './DealerReviewPurchases';

export default function DealerReviewCard({ review }) {
  const { t } = useTranslation();
  return (
    <article className="rounded-2xl border border-border bg-card p-4 sm:p-5">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="break-words text-base font-semibold text-foreground">
              {review.buyerName || t('components.dealerReviews.verifiedBuyer')}
            </p>
            {review.isVerifiedPurchase && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.08em] text-emerald-700 dark:text-emerald-300">
                <ShieldCheck size={12} aria-hidden="true" /> {t('components.dealerReviews.verifiedPurchase')}
              </span>
            )}
          </div>
        </div>
        <div
          className="shrink-0"
          role="img"
          aria-label={t('components.dealerReviews.ratingOutOfFive', { rating: review.rating })}
        >
          <StarRating rating={review.rating} size={15} />
        </div>
      </div>

      {review.title && <h3 className="mb-2 break-words text-base font-semibold text-foreground">{review.title}</h3>}
      {review.reviewText && (
        <p className="whitespace-pre-line break-words text-sm leading-6 text-foreground/80 sm:text-base sm:leading-7">
          {review.reviewText}
        </p>
      )}

      <DealerReviewPurchases watches={review.purchasedWatches} className="mt-5" />

      {review.dealerResponse && (
        <div className="mt-5 rounded-xl border-l-2 border-primary/40 bg-primary/5 px-4 py-3.5">
          <div className="mb-2 flex items-center gap-1.5">
            <BadgeCheck size={14} className="text-primary" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-[0.09em] text-primary">
              {t('components.dealerReviews.dealerResponse')}
            </p>
          </div>
          <p className="whitespace-pre-line break-words text-sm leading-6 text-foreground/75">{review.dealerResponse}</p>
        </div>
      )}
    </article>
  );
}
