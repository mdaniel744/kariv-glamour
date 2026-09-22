// @ts-nocheck -- Dialog primitives in this JavaScript codebase do not expose usable inferred prop types.
'use client';

import React, { useState } from 'react';
import { CheckCircle2, HandCoins, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { createKarivOffer } from '@/actions/dealerInquiries';
import LocalizedLink from '@/components/LocalizedLink';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/lib/AuthContext';
import { useLanguage } from '@/lib/languageContext';
import { productSlug } from '@/lib/slug';

export default function KarivOfferDialog({ product, localizedTitle, displayCurrency, locale = 'en', available = true }) {
  const { t } = useTranslation();
  const { isAuthenticated, isLoadingAuth } = useAuth();
  const { localePath } = useLanguage();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [offerAmount, setOfferAmount] = useState('');
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const returnTo = localePath(`/product/${productSlug(product)}`);
  const currency = String(displayCurrency || product.currency || 'EUR').toUpperCase();

  const reset = () => {
    setOfferAmount('');
    setMessage('');
    setSubmitted(false);
  };

  const handleOpenChange = (nextOpen) => {
    setOpen(nextOpen);
    if (!nextOpen && !saving) reset();
  };

  const handleSubmit = async () => {
    if (!(Number(offerAmount) > 0)) {
      toast({ title: t('pages.productDetail.karivOffer.invalidOffer'), variant: 'destructive' });
      return;
    }

    setSaving(true);
    try {
      const result = await createKarivOffer({
        productId: product.id,
        offerAmount: Number(offerAmount),
        currency,
        locale,
        message,
      });
      if (!result?.ok) {
        toast({
          title: t('pages.productDetail.karivOffer.errorTitle'),
          description: result?.error || t('pages.productDetail.karivOffer.errorDescription'),
          variant: 'destructive',
        });
        return;
      }
      setSubmitted(true);
      toast({ title: t('pages.productDetail.karivOffer.sentTitle') });
    } catch (error) {
      toast({
        title: t('pages.productDetail.karivOffer.errorTitle'),
        description: error?.message || t('pages.productDetail.karivOffer.errorDescription'),
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        disabled={!available}
        className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-border px-3 py-3 text-[11px] uppercase tracking-[0.12em] text-foreground transition-colors hover:border-primary disabled:cursor-not-allowed disabled:opacity-50"
      >
        <HandCoins size={15} />
        {t('pages.productDetail.counterOffer')}
      </button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-foreground">
              {t('pages.productDetail.karivOffer.title')}
            </DialogTitle>
            <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
              {t('pages.productDetail.karivOffer.description', { product: localizedTitle || product.productTitle || product.name || '' })}
            </DialogDescription>
          </DialogHeader>

          {isLoadingAuth ? (
            <div className="h-36 animate-pulse rounded-xl bg-card" aria-label={t('pages.productDetail.karivOffer.loading')} />
          ) : !isAuthenticated ? (
            <div className="space-y-3 pt-3">
              <p className="rounded-xl border border-border bg-card p-4 text-sm leading-relaxed text-muted-foreground">
                {t('pages.productDetail.karivOffer.signInRequired')}
              </p>
              <LocalizedLink
                to={`/login?returnTo=${encodeURIComponent(returnTo)}`}
                className="flex min-h-12 items-center justify-center rounded-xl bg-primary px-4 text-[11px] font-medium uppercase tracking-[0.14em] text-primary-foreground"
              >
                {t('pages.productDetail.karivOffer.signIn')}
              </LocalizedLink>
              <LocalizedLink
                to={`/register?returnTo=${encodeURIComponent(returnTo)}`}
                className="flex min-h-12 items-center justify-center rounded-xl border border-border px-4 text-[11px] font-medium uppercase tracking-[0.14em] text-foreground hover:border-primary"
              >
                {t('pages.productDetail.karivOffer.register')}
              </LocalizedLink>
            </div>
          ) : submitted ? (
            <div className="py-8 text-center">
              <CheckCircle2 className="mx-auto text-emerald-600" size={42} />
              <h3 className="mt-4 text-lg font-medium text-foreground">
                {t('pages.productDetail.karivOffer.sentTitle')}
              </h3>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                {t('pages.productDetail.karivOffer.sentDescription')}
              </p>
              <LocalizedLink
                to="/portal/inquiries"
                className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-primary px-6 text-[11px] font-medium uppercase tracking-[0.14em] text-primary-foreground"
              >
                {t('pages.productDetail.karivOffer.viewOffers')}
              </LocalizedLink>
            </div>
          ) : (
            <div className="space-y-5 pt-2">
              <label className="block">
                <span className="mb-2 block text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                  {t('pages.productDetail.karivOffer.offerAmount', { currency })}
                </span>
                <div className="flex overflow-hidden rounded-xl border border-border bg-background focus-within:border-primary">
                  <span className="flex items-center border-r border-border px-4 text-sm font-medium text-muted-foreground">{currency}</span>
                  <input
                    type="number"
                    min="1"
                    step="0.01"
                    inputMode="decimal"
                    value={offerAmount}
                    onChange={(event) => setOfferAmount(event.target.value)}
                    placeholder="0.00"
                    className="min-h-12 min-w-0 flex-1 bg-transparent px-4 text-sm text-foreground outline-none"
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-2 block text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                  {t('pages.productDetail.karivOffer.messageLabel')}
                </span>
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  maxLength={2000}
                  rows={4}
                  placeholder={t('pages.productDetail.karivOffer.messagePlaceholder')}
                  className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
                />
                <span className="mt-1 block text-right text-[9px] text-muted-foreground">{message.length}/2000</span>
              </label>

              <p className="rounded-xl bg-muted/60 p-3 text-[11px] leading-relaxed text-muted-foreground">
                {t('pages.productDetail.karivOffer.notice')}
              </p>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={saving || !(Number(offerAmount) > 0)}
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-[11px] font-medium uppercase tracking-[0.14em] text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send size={14} />
                {saving ? t('pages.productDetail.karivOffer.sending') : t('pages.productDetail.karivOffer.submit')}
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
