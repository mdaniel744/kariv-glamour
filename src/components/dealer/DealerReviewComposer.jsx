'use client';

import React, { useEffect, useId, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/lib/AuthContext';
import { useLanguage } from '@/lib/languageContext';
import { getDealerReviewEligibility } from '@/actions/dealerReviews';
import DealerReviewForm from './DealerReviewForm';
import DealerReviewPurchases from './DealerReviewPurchases';

function BuyerComments({ dealerId, dealerName, available, user, isLoadingAuth }) {
  const { t } = useTranslation();
  const router = useRouter();
  const { localePath } = useLanguage();
  const selectId = useId();
  const [expanded, setExpanded] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  // Only fetch private eligibility when the buyer opens the form. Browsing a
  // product must not trigger extra authenticated order lookups on every visit.
  useEffect(() => {
    if (!available || !expanded || !user?.id) return;
    let cancelled = false;
    setLoading(true);
    setFailed(false);
    getDealerReviewEligibility(dealerId).then((result) => {
      if (cancelled) return;
      if (!result.ok) {
        setFailed(true);
        return;
      }
      const purchases = result.reviewableOrders || [];
      setOrders(purchases);
      setSelectedId((current) => purchases.some((order) => order.id === current)
        ? current
        : (purchases.find((order) => !order.review)?.id || purchases[0]?.id || ''));
    }).catch(() => {
      if (!cancelled) setFailed(true);
    }).finally(() => {
      if (!cancelled) setLoading(false);
    });
    return () => { cancelled = true; };
  }, [available, expanded, user?.id, dealerId, attempt]);

  const selected = orders.find((order) => order.id === selectedId);
  const handleOpen = () => {
    if (isLoadingAuth) return;
    if (user) {
      setExpanded((value) => !value);
      return;
    }
    // Authentication is independent of review-service readiness. Use the
    // storefront's login page and return to this product/profile afterwards.
    const returnTo = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    router.push(`${localePath('/login')}?returnTo=${encodeURIComponent(returnTo)}`);
  };

  return (
    <div className="mb-5 rounded-xl border border-border bg-background/60 p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="flex items-center gap-2 text-base font-semibold text-foreground">
            <MessageSquare size={18} aria-hidden="true" /> {t('components.dealerReviews.commentsTitle')}
          </h3>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {t('components.dealerReviews.commentsIntro')}
          </p>
        </div>
        <button
          type="button"
          disabled={isLoadingAuth}
          aria-expanded={user ? expanded : undefined}
          onClick={handleOpen}
          className="min-h-11 rounded-full border border-primary px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10 disabled:opacity-50"
        >
          {t(!user ? 'components.dealerReviews.signInToComment' : expanded ? 'components.dealerReviews.closeForm' : 'components.dealerReviews.writeComment')}
        </button>
      </div>

      {submitted && <p role="status" className="mt-4 text-sm leading-relaxed text-muted-foreground">{t('components.dealerReviews.pendingNotice')}</p>}

      {expanded && user && (
        <div className="mt-5">
          {!available ? (
            <p role="status" className="text-sm leading-relaxed text-muted-foreground">{t('pages.productDetail.dealerPreview.reviewsNotConfigured')}</p>
          ) : loading ? (
            <p role="status" className="text-sm text-muted-foreground">{t('components.dealerReviews.checkingPurchases')}</p>
          ) : failed ? (
            <div role="alert" className="text-sm text-muted-foreground">
              <p>{t('components.dealerReviews.eligibilityUnavailable')}</p>
              <button type="button" onClick={() => setAttempt((value) => value + 1)} className="mt-2 min-h-11 font-medium text-primary underline">
                {t('components.dealerReviews.tryAgain')}
              </button>
            </div>
          ) : !selected ? (
            <p className="text-sm leading-relaxed text-muted-foreground">{t('components.dealerReviews.completedPurchaseRequired')}</p>
          ) : (
            <>
              {orders.length > 1 && (
                <div className="mb-4">
                  <label htmlFor={selectId} className="mb-2 block text-sm font-medium text-foreground">{t('components.dealerReviews.choosePurchase')}</label>
                  <select id={selectId} value={selectedId} onChange={(event) => setSelectedId(event.target.value)} className="min-h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground">
                    {orders.map((order) => <option key={order.id} value={order.id}>{order.orderReference}</option>)}
                  </select>
                </div>
              )}
              <DealerReviewPurchases watches={selected.purchasedWatches} className="mb-4" />
              {selected.review?.status === 'pending' && !submitted && (
                <p className="my-4 text-sm leading-relaxed text-muted-foreground">{t('components.dealerReviews.pendingNotice')}</p>
              )}
              <DealerReviewForm
                key={`${selected.id}:${selected.review?.updated_date || 'new'}`}
                dealerId={dealerId}
                dealerName={dealerName}
                orderId={selected.id}
                orderReference={selected.orderReference}
                initialReview={selected.review}
                onSubmitted={() => {
                  setSubmitted(true);
                  setExpanded(false);
                  router.refresh();
                }}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default function DealerReviewComposer({ dealerId, dealerName, available = true }) {
  const auth = useAuth();
  // A different account/dealer must never see the previous buyer's draft or
  // eligibility response, including when a pending request finishes late.
  return <BuyerComments key={`${dealerId}:${auth.user?.id || 'guest'}`} dealerId={dealerId} dealerName={dealerName} available={available} {...auth} />;
}
