'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { AlertTriangle, Check, Handshake, RefreshCw, Send, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { listMyDealerInquiries, respondToDealerInquiry } from '@/actions/dealerInquiries';
import DealerInquirySummary, { formatInquiryDate } from '@/components/dealer/DealerInquirySummary';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/lib/AuthContext';
import { formatPrice } from '@/lib/constants';
import { useLanguage } from '@/lib/languageContext';

function responseOptions(inquiry, t) {
  return [
    {
      action: 'accept',
      label: inquiry.type === 'offer'
        ? t('pages.portal.inquiryCenter.acceptOffer')
        : t('pages.portal.inquiryCenter.acceptAtListingPrice'),
      icon: Check,
    },
    {
      action: inquiry.type === 'offer' ? 'counter' : 'quote',
      label: inquiry.type === 'offer'
        ? t('pages.portal.inquiryCenter.counterOffer')
        : t('pages.portal.inquiryCenter.sendQuote'),
      icon: Send,
    },
    { action: 'decline', label: t('pages.portal.inquiryCenter.decline'), icon: X },
  ];
}

export default function PortalSalesInquiries() {
  const { t } = useTranslation();
  const { locale } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [drafts, setDrafts] = useState({});
  const [respondingId, setRespondingId] = useState(null);

  const loadInquiries = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const result = await listMyDealerInquiries({ limit: 100 });
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

  const updateDraft = (inquiryId, values) => {
    setDrafts((current) => ({
      ...current,
      [inquiryId]: { amount: '', message: '', ...current[inquiryId], ...values },
    }));
  };

  const submitResponse = async (inquiry) => {
    const draft = drafts[inquiry.id] || {};
    if (!draft.action) return;
    if (['counter', 'quote'].includes(draft.action) && (!Number.isFinite(Number(draft.amount)) || Number(draft.amount) <= 0)) {
      toast({ title: t('pages.portal.inquiryCenter.validAmountRequired'), variant: 'destructive' });
      return;
    }

    setRespondingId(inquiry.id);
    try {
      const result = await respondToDealerInquiry({
        inquiryId: inquiry.id,
        action: draft.action,
        amount: draft.amount,
        message: draft.message,
      });
      if (!result.ok) {
        toast({
          title: t('pages.portal.inquiryCenter.actionError'),
          description: result.error,
          variant: 'destructive',
        });
        return;
      }
      setInquiries((current) => current.map((item) => item.id === inquiry.id ? result.inquiry : item));
      setDrafts((current) => ({ ...current, [inquiry.id]: undefined }));
      toast({ title: t('pages.portal.inquiryCenter.responseSent') });
    } catch (actionError) {
      toast({
        title: t('pages.portal.inquiryCenter.actionError'),
        description: actionError?.message,
        variant: 'destructive',
      });
    } finally {
      setRespondingId(null);
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 text-primary">
            <Handshake size={18} />
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em]">
              {t('pages.portal.inquiryCenter.dealerWorkspace')}
            </p>
          </div>
          <h1 className="text-2xl font-display font-light text-foreground sm:text-3xl">
            {t('pages.portal.inquiryCenter.dealerTitle')}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {t('pages.portal.inquiryCenter.dealerDescription')}
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
          {[0, 1, 2].map((item) => <div key={item} className="h-64 animate-pulse rounded-2xl bg-card sm:h-52" />)}
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
          <Handshake size={34} className="mx-auto mb-4 text-muted-foreground/40" />
          <h2 className="text-lg font-medium text-foreground">{t('pages.portal.inquiryCenter.noDealerInquiries')}</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
            {t('pages.portal.inquiryCenter.noDealerInquiriesDescription')}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inquiry) => {
            const draft = drafts[inquiry.id] || {};
            const customAmount = ['counter', 'quote'].includes(draft.action);
            const options = responseOptions(inquiry, t);
            return (
              <article key={inquiry.id} className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6">
                <DealerInquirySummary
                  inquiry={inquiry}
                  counterpartLabel={t('pages.portal.inquiryCenter.buyer')}
                  counterpartName={inquiry.buyerName}
                  locale={locale}
                  t={t}
                />

                {inquiry.status === 'pending' ? (
                  <div className="mt-5 border-t border-border pt-5 sm:ml-36">
                    <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      {t('pages.portal.inquiryCenter.chooseResponse')}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {options.map((option) => {
                        const Icon = option.icon;
                        const selected = draft.action === option.action;
                        return (
                          <button
                            key={option.action}
                            type="button"
                            onClick={() => updateDraft(inquiry.id, { action: option.action })}
                            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.1em] transition-colors ${selected ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-foreground hover:border-primary hover:text-primary'}`}
                          >
                            <Icon size={12} /> {option.label}
                          </button>
                        );
                      })}
                    </div>

                    {draft.action && (
                      <div className="mt-4 rounded-2xl border border-border bg-background/60 p-4">
                        {customAmount && (
                          <label className="block">
                            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                              {draft.action === 'counter'
                                ? t('pages.portal.inquiryCenter.counterAmount', { currency: inquiry.currency })
                                : t('pages.portal.inquiryCenter.quoteAmount', { currency: inquiry.currency })}
                            </span>
                            <input
                              type="number"
                              min="0.01"
                              step="0.01"
                              value={draft.amount || ''}
                              onChange={(event) => updateDraft(inquiry.id, { amount: event.target.value })}
                              className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary sm:max-w-xs"
                            />
                          </label>
                        )}

                        <label className={`block ${customAmount ? 'mt-4' : ''}`}>
                          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                            {t('pages.portal.inquiryCenter.responseMessage')}
                          </span>
                          <textarea
                            rows={3}
                            maxLength={2000}
                            value={draft.message || ''}
                            onChange={(event) => updateDraft(inquiry.id, { message: event.target.value })}
                            placeholder={t('pages.portal.inquiryCenter.responsePlaceholder')}
                            className="mt-2 w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-xs leading-relaxed text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                          />
                        </label>

                        <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                          <button
                            type="button"
                            onClick={() => updateDraft(inquiry.id, { action: null, amount: '', message: '' })}
                            className="rounded-full border border-border px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground"
                          >
                            {t('pages.portal.inquiryCenter.cancel')}
                          </button>
                          <button
                            type="button"
                            onClick={() => submitResponse(inquiry)}
                            disabled={respondingId === inquiry.id}
                            className="rounded-full bg-primary px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary-foreground disabled:opacity-50"
                          >
                            {respondingId === inquiry.id
                              ? t('pages.portal.inquiryCenter.sending')
                              : t('pages.portal.inquiryCenter.confirmResponse')}
                          </button>
                        </div>
                      </div>
                    )}

                    <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
                      {t('pages.portal.inquiryCenter.dealerInformationalOnly')}
                    </p>
                  </div>
                ) : (
                  <div className="mt-5 rounded-2xl border border-primary/20 bg-primary/[0.04] p-4 sm:ml-36">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">
                      {t('pages.portal.inquiryCenter.yourResponse')}
                    </p>
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
                    <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
                      {t('pages.portal.inquiryCenter.dealerInformationalOnly')}
                    </p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
