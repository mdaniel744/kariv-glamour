'use client';

import React from 'react';
import { Clock3, FileText, HandCoins } from 'lucide-react';
import LocalizedLink from '@/components/LocalizedLink';
import { formatPrice } from '@/lib/constants';

const STATUS_TONES = {
  pending: 'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300',
  accepted: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
  quoted: 'border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300',
  countered: 'border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-300',
  declined: 'border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-300',
  withdrawn: 'border-border bg-muted text-muted-foreground',
};

function dateLocale(locale) {
  if (locale === 'cs') return 'cs-CZ';
  if (locale === 'de') return 'de-DE';
  return 'en-GB';
}

export function formatInquiryDate(value, locale) {
  if (!value) return '';
  return new Intl.DateTimeFormat(dateLocale(locale), {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

export function InquiryStatusBadge({ status, t }) {
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] ${STATUS_TONES[status] || STATUS_TONES.withdrawn}`}>
      {t(`pages.portal.inquiryCenter.status.${status}`)}
    </span>
  );
}

export default function DealerInquirySummary({ inquiry, counterpartLabel, counterpartName, locale, t }) {
  const isOffer = inquiry.type === 'offer';
  const IntentIcon = isOffer ? HandCoins : FileText;

  return (
    <div className="flex flex-col gap-5 sm:flex-row">
      <LocalizedLink
        to={`/product/${inquiry.productSlug}`}
        className="group relative h-44 w-full flex-shrink-0 overflow-hidden rounded-2xl bg-muted sm:h-32 sm:w-32"
      >
        {inquiry.productImage ? (
          <img
            src={inquiry.productImage}
            alt={inquiry.productName}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            {t('pages.portal.inquiryCenter.watch')}
          </div>
        )}
      </LocalizedLink>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-primary">
                <IntentIcon size={11} />
                {t(`pages.portal.inquiryCenter.type.${inquiry.type}`)}
              </span>
              <InquiryStatusBadge status={inquiry.status} t={t} />
            </div>
            <LocalizedLink
              to={`/product/${inquiry.productSlug}`}
              className="line-clamp-2 text-base font-medium leading-snug text-foreground transition-colors hover:text-primary"
            >
              {inquiry.productName}
            </LocalizedLink>
            <p className="mt-1 text-[11px] text-muted-foreground">
              {counterpartLabel}: <span className="text-foreground">{counterpartName}</span>
            </p>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
              {t('pages.portal.inquiryCenter.listingPrice')}
            </p>
            <p className="mt-1 text-sm font-medium text-foreground">
              {formatPrice(inquiry.listingPrice, inquiry.currency, locale)}
            </p>
          </div>
        </div>

        {isOffer && inquiry.offerAmount != null && (
          <div className="mt-4 rounded-xl border border-border bg-muted/40 px-3.5 py-3">
            <p className="text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
              {t('pages.portal.inquiryCenter.buyerOffer')}
            </p>
            <p className="mt-1 text-base font-medium text-foreground">
              {formatPrice(inquiry.offerAmount, inquiry.currency, locale)}
            </p>
          </div>
        )}

        {inquiry.message && (
          <div className="mt-4">
            <p className="text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
              {t('pages.portal.inquiryCenter.buyerMessage')}
            </p>
            <p className="mt-1 whitespace-pre-wrap text-xs leading-relaxed text-foreground">{inquiry.message}</p>
          </div>
        )}

        <p className="mt-4 inline-flex items-center gap-1.5 text-[10px] text-muted-foreground">
          <Clock3 size={11} /> {formatInquiryDate(inquiry.createdAt, locale)}
        </p>
      </div>
    </div>
  );
}
