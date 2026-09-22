// @ts-nocheck -- Dialog primitives in this JavaScript codebase do not expose usable inferred prop types.
'use client';

import React, { useState } from 'react';
import { CheckCircle2, FileText, HandCoins, MessageCircle, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { createDealerInquiry } from '@/actions/dealerInquiries';
import LocalizedLink from '@/components/LocalizedLink';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/lib/AuthContext';
import { useLanguage } from '@/lib/languageContext';
import { productSlug } from '@/lib/slug';

export default function ContactSellerDialog({ product, sellerName }) {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const { localePath } = useLanguage();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [requestType, setRequestType] = useState('quote');
  const [offerAmount, setOfferAmount] = useState('');
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const returnTo = localePath(`/product/${productSlug(product)}`);
  const currency = String(product.currency || 'EUR').toUpperCase();

  const reset = () => {
    setRequestType('quote');
    setOfferAmount('');
    setMessage('');
    setSubmitted(false);
  };

  const handleOpenChange = (nextOpen) => {
    setOpen(nextOpen);
    if (!nextOpen && !saving) reset();
  };

  const handleSubmit = async () => {
    if (requestType === 'offer' && !(Number(offerAmount) > 0)) {
      toast({ title: t('pages.productDetail.sellerContact.invalidOffer'), variant: 'destructive' });
      return;
    }

    setSaving(true);
    try {
      const result = await createDealerInquiry({
        productId: product.id,
        requestType,
        offerAmount: requestType === 'offer' ? Number(offerAmount) : null,
        message,
      });
      if (!result?.ok) {
        toast({
          title: t('pages.productDetail.sellerContact.errorTitle'),
          description: result?.error || t('pages.productDetail.sellerContact.errorDescription'),
          variant: 'destructive',
        });
        return;
      }
      setSubmitted(true);
      toast({ title: t('pages.productDetail.sellerContact.sentTitle') });
    } catch (error) {
      toast({
        title: t('pages.productDetail.sellerContact.errorTitle'),
        description: error?.message || t('pages.productDetail.sellerContact.errorDescription'),
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
        className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border px-3 py-3 text-[11px] uppercase tracking-[0.12em] text-foreground transition-colors hover:border-primary"
      >
        <MessageCircle size={14} />
        {t('pages.productDetail.sellerContact.button')}
      </button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-foreground">
              {t('pages.productDetail.sellerContact.title')}
            </DialogTitle>
            <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
              {t('pages.productDetail.sellerContact.description', {
                seller: sellerName || t('pages.productDetail.verifiedDealer'),
              })}
            </DialogDescription>
          </DialogHeader>

          {!submitted && (
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setRequestType('quote')}
                aria-pressed={requestType === 'quote'}
                className={`rounded-xl border p-4 text-left transition-colors ${requestType === 'quote' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/60'}`}
              >
                <FileText size={18} className="text-primary" />
                <span className="mt-3 block text-sm font-medium text-foreground">
                  {t('pages.productDetail.sellerContact.requestQuote')}
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                  {t('pages.productDetail.sellerContact.requestQuoteDescription')}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setRequestType('offer')}
                aria-pressed={requestType === 'offer'}
                className={`rounded-xl border p-4 text-left transition-colors ${requestType === 'offer' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/60'}`}
              >
                <HandCoins size={18} className="text-primary" />
                <span className="mt-3 block text-sm font-medium text-foreground">
                  {t('pages.productDetail.sellerContact.makeOffer')}
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                  {t('pages.productDetail.sellerContact.makeOfferDescription')}
                </span>
              </button>
            </div>
          )}

          {!isAuthenticated ? (
            <div className="space-y-3 pt-3">
              <p className="rounded-xl border border-border bg-card p-4 text-sm leading-relaxed text-muted-foreground">
                {t('pages.productDetail.sellerContact.signInRequired')}
              </p>
              <LocalizedLink
                to={`/login?returnTo=${encodeURIComponent(returnTo)}`}
                className="flex min-h-12 items-center justify-center rounded-xl bg-primary px-4 text-[11px] font-medium uppercase tracking-[0.14em] text-primary-foreground"
              >
                {t('pages.productDetail.sellerContact.signIn')}
              </LocalizedLink>
              <LocalizedLink
                to={`/register?returnTo=${encodeURIComponent(returnTo)}`}
                className="flex min-h-12 items-center justify-center rounded-xl border border-border px-4 text-[11px] font-medium uppercase tracking-[0.14em] text-foreground hover:border-primary"
              >
                {t('pages.productDetail.sellerContact.register')}
              </LocalizedLink>
            </div>
          ) : submitted ? (
            <div className="py-8 text-center">
              <CheckCircle2 className="mx-auto text-emerald-600" size={42} />
              <h3 className="mt-4 text-lg font-medium text-foreground">
                {t('pages.productDetail.sellerContact.sentTitle')}
              </h3>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                {t('pages.productDetail.sellerContact.sentDescription')}
              </p>
              <button
                type="button"
                onClick={() => handleOpenChange(false)}
                className="mt-6 min-h-11 rounded-xl bg-primary px-6 text-[11px] font-medium uppercase tracking-[0.14em] text-primary-foreground"
              >
                {t('common:close')}
              </button>
            </div>
          ) : (
            <div className="space-y-5 pt-2">
              {requestType === 'offer' && (
                <label className="block">
                  <span className="mb-2 block text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                    {t('pages.productDetail.sellerContact.offerAmount', { currency })}
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
              )}

              <label className="block">
                <span className="mb-2 block text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                  {t('pages.productDetail.sellerContact.messageLabel')}
                </span>
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  maxLength={1000}
                  rows={4}
                  placeholder={t('pages.productDetail.sellerContact.messagePlaceholder')}
                  className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
                />
                <span className="mt-1 block text-right text-[9px] text-muted-foreground">{message.length}/1000</span>
              </label>

              <p className="rounded-xl bg-muted/60 p-3 text-[11px] leading-relaxed text-muted-foreground">
                {t('pages.productDetail.sellerContact.notice')}
              </p>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={saving || (requestType === 'offer' && !(Number(offerAmount) > 0))}
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-[11px] font-medium uppercase tracking-[0.14em] text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send size={14} />
                {saving ? t('pages.productDetail.sellerContact.sending') : t('pages.productDetail.sellerContact.submit')}
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
