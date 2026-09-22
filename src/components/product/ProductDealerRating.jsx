'use client';

import React, { useEffect, useState } from 'react';
import { Star, Store } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LocalizedLink from '@/components/LocalizedLink';
import { getDealerRatingSummaries } from '@/actions/dealerReviews';
import { MAX_PUBLIC_DEALER_SUMMARIES, emptyDealerRatingSummary } from '@/lib/dealerRatingSummaries';

const summaryCache = new Map();
const pendingRequests = new Map();
const SUMMARY_CACHE_TTL_MS = 5 * 60 * 1000;
let flushTimer = null;

function readCachedSummary(dealerId) {
  const cached = summaryCache.get(dealerId);
  if (!cached) return null;
  if (cached.expiresAt <= Date.now()) {
    summaryCache.delete(dealerId);
    return null;
  }
  return cached.summary;
}

async function flushDealerSummaries() {
  flushTimer = null;
  const queued = [...pendingRequests.entries()];
  pendingRequests.clear();

  for (let start = 0; start < queued.length; start += MAX_PUBLIC_DEALER_SUMMARIES) {
    const batch = queued.slice(start, start + MAX_PUBLIC_DEALER_SUMMARIES);
    const dealerIds = batch.map(([dealerId]) => dealerId);
    let summaries = {};
    try {
      summaries = await getDealerRatingSummaries(dealerIds);
    } catch {
      // A missing review service must not make catalogue cards disappear.
    }

    for (const [dealerId, listeners] of batch) {
      const summary = summaries?.[dealerId] || emptyDealerRatingSummary();
      // Do not turn an outage, missing migration, or failed approval lookup
      // into a session-long stale result. Successful summaries get a short
      // cache so repeated cards/navigation do not refetch immediately.
      if (summary.ratingsAvailable !== false) {
        summaryCache.set(dealerId, {
          summary,
          expiresAt: Date.now() + SUMMARY_CACHE_TTL_MS,
        });
      }
      listeners.forEach(({ resolve }) => resolve(summary));
    }
  }
}

function requestDealerSummary(dealerId) {
  const cached = readCachedSummary(dealerId);
  if (cached) return Promise.resolve(cached);

  return new Promise((resolve) => {
    const listeners = pendingRequests.get(dealerId) || [];
    listeners.push({ resolve });
    pendingRequests.set(dealerId, listeners);
    if (!flushTimer) flushTimer = window.setTimeout(flushDealerSummaries, 0);
  });
}

export default function ProductDealerRating({ dealerId, dealerName = '', initialSummary = null }) {
  const { t, i18n } = useTranslation();
  const [summary, setSummary] = useState(initialSummary);

  useEffect(() => {
    if (!dealerId) return undefined;
    let active = true;
    requestDealerSummary(dealerId).then((result) => {
      if (active) setSummary(result);
    });
    return () => { active = false; };
  }, [dealerId]);

  if (!dealerId) return null;

  const seller = summary?.displayName || dealerName || t('components.productCard.verifiedDealer');
  const averageRating = Number(summary?.averageRating || 0);
  const totalReviews = Number(summary?.totalReviews || 0);
  const ratingsAvailable = summary?.ratingsAvailable !== false;
  const locale = i18n?.resolvedLanguage || i18n?.language || 'en';
  const ratingText = averageRating.toLocaleString(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const roundedRating = Math.round(averageRating);
  const ratingLabel = !summary
    ? t('components.productCard.loadingReviews')
    : ratingsAvailable
      ? t('components.productCard.ratingAndReviews', { rating: ratingText, count: totalReviews })
      : t('components.productCard.reviewsUnavailable');

  return (
    <div className="pt-1">
      <LocalizedLink
        to={`/dealer-profile/${dealerId}`}
        className="pointer-events-auto relative z-30 inline-flex max-w-full items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-[9px] font-medium text-foreground transition-colors hover:border-primary hover:text-primary md:text-[10px]"
        aria-label={t('components.productCard.viewDealer', { seller })}
      >
        <Store size={11} className="shrink-0 text-primary" aria-hidden="true" />
        <span className="truncate">{t('components.productCard.soldBy', { seller })}</span>
      </LocalizedLink>
      <div
        className="mt-1 flex min-w-0 items-center gap-1.5"
        aria-label={ratingLabel}
      >
        <span className="flex shrink-0 items-center gap-px" aria-hidden="true">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={10}
              className={star <= roundedRating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/35'}
            />
          ))}
        </span>
        <span className="truncate text-[9px] text-muted-foreground md:text-[10px]">
          {ratingLabel}
        </span>
      </div>
    </div>
  );
}
