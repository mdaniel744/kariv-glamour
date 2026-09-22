'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { AlertTriangle, MessageSquareText, RefreshCw, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { listMyBuyerInquiries, withdrawDealerInquiry } from '@/actions/dealerInquiries';
import DealerInquirySummary, { formatInquiryDate } from '@/components/dealer/DealerInquirySummary';
import LocalizedLink from '@/components/LocalizedLink';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/lib/AuthContext';
import { formatPrice } from '@/lib/constants';
import { useLanguage } from '@/lib/languageContext';

const WITHDRAWABLE_STATUSES = new Set(['pending', 'countered', 'quoted']);

export default function PortalInquiries() {
  const { t } = useTranslation();
  const { locale } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [withdrawingId, setWithdrawingId] = useState(null);

  const loadInquiries = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const result = await listMyBuyerInquiries({ limit: 100 });
      if (!result.ok) {
        setError(result.error || t('pages.portal.inquiryCenter.loadError'));
        return;
      }
      setInquiries(result.inquiries);
    } catch (loadError) {
      setError(loadError?.message || t('pages.portal.inquiryCenter.loadError'));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    if (user) loadInquiries();
  }, [loadInquiries, user]);

  const withdrawInquiry = async (inquiry) => {
    if (!window.confirm(t('pages.portal.inquiryCenter.withdrawConfirm'))) return;
    setWithdrawingId(inquiry.id);
    try {
      const result = await withdrawDealerInquiry({ inquiryId: inquiry.id });
      if (!result.ok) {
        toast({
          title: t('pages.portal.inquiryCenter.actionError'),
          description: result.error,
          variant: 'destructive',
        });
        return;
      }
      setInquiries((current) => current.map((item) => item.id === inquiry.id ? result.inquiry : item));
      toast({ title: t('pages.portal.inquiryCenter.withdrawnSuccess') });
    } catch (actionError) {
      toast({
        title: t('pages.portal.inquiryCenter.actionError'),
        description: actionError?.message,
        variant: 'destructive',
      });
    } finally {
      setWithdrawingId(null);
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 text-primary">
            <MessageSquareText size={18} />
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em]">
              {t('pages.portal.inquiryCenter.privateRequests')}
            </p>
          </div>
          <h1 className="text-2xl font-display font-light text-foreground sm:text-3xl">
            {t('pages.portal.inquiryCenter.buyerTitle')}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {t('pages.portal.inquiryCenter.buyerDescription')}
          </p>
        </div>
        <button
          type="button"
          onClick={loadInquiries}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 self-start rounded-full border border-border px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground transition-colors hover:border-primary hover:text-primary disabled:opacity-50 sm:self-auto"
        >
          <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
          {t('pages.portal.inquiryCenter.refresh')}
        </button>
      </div>

      {loading ? (
        <div className="space-y-4" aria-label={t('pages.portal.inquiryCenter.loading')}>
          {[0, 1, 2].map((item) => <div key={item} className="h-60 animate-pulse rounded-2xl bg-card sm:h-48" />)}
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-8 text-center">
          <AlertTriangle size={28} className="mx-auto mb-3 text-destructive" />
          <p className="text-sm text-foreground">{t('pages.portal.inquiryCenter.loadError')}</p>
          <p className="mt-1 text-xs text-muted-foreground">{error}</p>
          <button type="button" onClick={loadInquiries} className="mt-5 rounded-full bg-primary px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary-foreground">
            {t('pages.portal.inquiryCenter.tryAgain')}
          </button>
        </div>
      ) : inquiries.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card px-6 py-16 text-center">
          <MessageSquareText size={34} className="mx-auto mb-4 text-muted-foreground/40" />
          <h2 className="text-lg font-medium text-foreground">{t('pages.portal.inquiryCenter.noBuyerInquiries')}</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
            {t('pages.portal.inquiryCenter.noBuyerInquiriesDescription')}
          </p>
          <LocalizedLink to="/shop" className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary-foreground">
            {t('pages.portal.browseWatches')}
          </LocalizedLink>
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inquiry) => {
            const hasDealerResponse = inquiry.responseAmount != null || inquiry.responseMessage || inquiry.respondedAt;
            return (
              <article key={inquiry.id} className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6">
                <DealerInquirySummary
                  inquiry={inquiry}
                  counterpartLabel={t('pages.portal.inquiryCenter.seller')}
                  counterpartName={inquiry.dealerName}
                  locale={locale}
                  t={t}
                />

                {hasDealerResponse && (
                  <div className="mt-5 rounded-2xl border border-primary/20 bg-primary/[0.04] p-4 sm:ml-36">
                    <div className="flex items-center gap-2 text-primary">
                      <ShieldCheck size={14} />
                      <p className="text-[10px] font-semibold uppercase tracking-[0.12em]">
                        {t('pages.portal.inquiryCenter.sellerResponse')}
                      </p>
                    </div>
                    {inquiry.responseAmount != null && (
                      <p className="mt-2 text-lg font-medium text-foreground">
                        {formatPrice(inquiry.responseAmount, inquiry.currency, locale)}
                      </p>
                    )}
                    {inquiry.responseMessage && (
                      <p className="mt-2 whitespace-pre-wrap text-xs leading-relaxed text-foreground">{inquiry.responseMessage}</p>
                    )}
                    {inquiry.respondedAt && (
                      <p className="mt-3 text-[10px] text-muted-foreground">{formatInquiryDate(inquiry.respondedAt, locale)}</p>
                    )}
                  </div>
                )}

                <div className="mt-5 flex flex-col gap-3 border-t border-border pt-4 sm:ml-36 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-2xl text-[11px] leading-relaxed text-muted-foreground">
                    {t('pages.portal.inquiryCenter.informationalOnly')}
                  </p>
                  {WITHDRAWABLE_STATUSES.has(inquiry.status) && (
                    <button
                      type="button"
                      onClick={() => withdrawInquiry(inquiry)}
                      disabled={withdrawingId === inquiry.id}
                      className="flex-shrink-0 self-start rounded-full border border-border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:border-destructive hover:text-destructive disabled:opacity-50 sm:self-auto"
                    >
                      {withdrawingId === inquiry.id
                        ? t('pages.portal.inquiryCenter.withdrawing')
                        : t('pages.portal.inquiryCenter.withdraw')}
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
