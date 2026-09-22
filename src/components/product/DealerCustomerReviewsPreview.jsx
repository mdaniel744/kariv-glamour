'use client';

import React from 'react';
import { BadgeCheck, MapPin, PackageCheck, ShoppingBag, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LocalizedLink from '@/components/LocalizedLink';
import StarRating from '@/components/dealer/StarRating';
import DealerReviewCard from '@/components/dealer/DealerReviewCard';
import DealerReviewComposer from '@/components/dealer/DealerReviewComposer';
import MediaImage from '@/components/shared/MediaImage';
import { getMediaVariant } from '@/lib/media';

function Metric({ icon: Icon, value, label, available }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
      <Icon size={17} className="mb-3 text-primary" aria-hidden="true" />
      <p className="text-2xl font-semibold text-foreground">{available ? value : '—'}</p>
      <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{label}</p>
    </div>
  );
}

export default function DealerCustomerReviewsPreview({ dealer }) {
  const { t, i18n } = useTranslation();
  if (!dealer?.approved) return null;

  const totalReviews = dealer.ratingsAvailable ? Number(dealer.totalReviews || 0) : null;
  const averageRating = dealer.ratingsAvailable ? Number(dealer.averageRating || 0) : null;
  const percentFormatter = new Intl.NumberFormat(i18n?.resolvedLanguage || i18n?.language || 'en', {
    style: 'percent',
    maximumFractionDigits: 0,
  });

  return (
    <section className="border-t border-border py-14 md:py-20" aria-labelledby="dealer-customer-reviews-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="rounded-2xl border border-border bg-card/50 p-5 sm:p-7 lg:p-8">
          <div className="flex flex-col gap-5 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-xl font-semibold text-primary sm:h-16 sm:w-16">
                {dealer.logoImage ? (
                  <MediaImage
                    src={getMediaVariant(dealer.logoImage, 'thumb')}
                    alt=""
                    fill
                    sizes="64px"
                    quality={78}
                    className="object-cover"
                  />
                ) : dealer.displayName.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 id="dealer-customer-reviews-title" className="truncate text-xl font-semibold text-foreground sm:text-2xl">
                    {dealer.displayName}
                  </h2>
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.12em] text-primary">
                    <BadgeCheck size={12} aria-hidden="true" /> {t('pages.productDetail.dealerPreview.verifiedDealer')}
                  </span>
                </div>
                {dealer.country && (
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin size={13} aria-hidden="true" /> {dealer.country}
                  </p>
                )}
              </div>
            </div>
            <LocalizedLink
              to={`/dealer-profile/${dealer.dealerId}`}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-primary px-5 text-[10px] font-medium uppercase tracking-[0.13em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              {t('pages.productDetail.dealerPreview.viewProfile')}
            </LocalizedLink>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
            <Metric
              icon={PackageCheck}
              available={dealer.completedSalesAvailable}
              value={dealer.completedSales}
              label={t('pages.productDetail.dealerPreview.watchesSold')}
            />
            <Metric
              icon={ShoppingBag}
              available={dealer.activeListingsAvailable}
              value={dealer.activeListings}
              label={t('pages.productDetail.dealerPreview.activeListings')}
            />
            <div className="col-span-2 rounded-xl border border-border bg-card p-4 sm:p-5 md:col-span-1">
              <Star size={17} className="mb-3 fill-amber-400 text-amber-400" aria-hidden="true" />
              {dealer.ratingsAvailable ? (
                <>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-semibold text-foreground">{averageRating.toFixed(1)}</p>
                    <StarRating rating={Math.round(averageRating)} size={13} />
                  </div>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                    {t('pages.productDetail.dealerPreview.ratingCount', { count: totalReviews })}
                  </p>
                </>
              ) : (
                <p className="text-xs text-muted-foreground">{t('pages.productDetail.dealerPreview.ratingsUnavailable')}</p>
              )}
            </div>
          </div>

          <div className="mt-9 grid gap-8 lg:grid-cols-[minmax(250px,0.8fr)_minmax(0,1.7fr)] lg:gap-10">
            <div>
              <h3 className="text-lg font-semibold text-foreground">{t('pages.productDetail.dealerPreview.customerReviews')}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{t('pages.productDetail.dealerPreview.reviewIntro')}</p>

                <div className="mt-5 space-y-2.5">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const reportedCount = dealer.distribution?.find((item) => item.star === star)?.count;
                    const count = dealer.ratingsAvailable && Number.isInteger(reportedCount) && reportedCount >= 0 ? reportedCount : null;
                    const percentage = count == null ? null : totalReviews ? (count / totalReviews) * 100 : 0;
                    const percentageLabel = percentage == null ? '—' : percentFormatter.format(percentage / 100);
                    return (
                      <div
                        key={star}
                        className="flex items-center gap-3"
                        role="img"
                        aria-label={count == null
                          ? `${t('components.dealerReviews.ratingOutOfFive', { rating: star })}: ${t('pages.productDetail.dealerPreview.ratingsUnavailable')}`
                          : t('pages.productDetail.dealerPreview.ratingBreakdownLabel', {
                          stars: star,
                          percentage: percentageLabel,
                          count,
                        })}
                      >
                        <span className="w-7 text-xs text-muted-foreground">{star}★</span>
                        <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-muted ring-1 ring-inset ring-border/50">
                          <div className="h-full rounded-full bg-amber-400" style={{ width: `${percentage ?? 0}%` }} />
                        </div>
                        <span className="w-10 text-right text-xs text-muted-foreground">{percentageLabel}</span>
                        <span className="w-8 text-right text-xs text-muted-foreground">{count ?? '—'}</span>
                      </div>
                    );
                  })}
                </div>
            </div>

            <div>
              <DealerReviewComposer dealerId={dealer.dealerId} dealerName={dealer.displayName} available={dealer.reviewsConfigured} />
              {!dealer.ratingsAvailable ? (
                <div className="rounded-xl border border-border bg-background/50 p-6 text-sm text-muted-foreground">
                  {dealer.reviewsConfigured
                    ? t('pages.productDetail.dealerPreview.ratingsUnavailable')
                    : t('pages.productDetail.dealerPreview.reviewsNotConfigured')}
                </div>
              ) : totalReviews === 0 ? (
                <div className="rounded-xl border border-border bg-background/50 p-6 text-sm text-muted-foreground">
                  {t('pages.productDetail.dealerPreview.noReviews')}
                </div>
              ) : dealer.recentReviewsAvailable ? (
                <div className="space-y-3">
                  {dealer.recentReviews.map((review) => <DealerReviewCard key={review.id} review={review} />)}
                </div>
              ) : (
                <div className="rounded-xl border border-border bg-background/50 p-6 text-sm text-muted-foreground">
                  {t('pages.productDetail.dealerPreview.recentReviewsUnavailable')}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
