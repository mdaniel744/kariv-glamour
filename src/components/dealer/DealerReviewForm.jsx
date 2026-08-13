import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { submitDealerReview } from '@/actions/dealerReviews';
import StarRating from './StarRating';
import { useToast } from '@/components/ui/use-toast';

export default function DealerReviewForm({ dealerId, dealerName, orderId, orderReference, onSubmitted }) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async () => {
    if (!rating || reviewText.trim().length < 10) {
      toast({ title: t('components.dealerReviews.validation'), variant: 'destructive' });
      return;
    }

    setSaving(true);
    try {
      const result = await submitDealerReview({ dealerId, orderId, rating, title, reviewText });
      if (!result.ok) {
        toast({ title: t('components.dealerReviews.error'), description: result.error, variant: 'destructive' });
        return;
      }
      toast({
        title: t('components.dealerReviews.submitted'),
        description: t('components.dealerReviews.pendingDescription'),
      });
      onSubmitted?.(result.review);
    } catch (error) {
      toast({ title: t('components.dealerReviews.error'), description: error.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="border border-border bg-card p-5">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
        <h3 className="text-sm font-medium text-foreground">
          {t('components.dealerReviews.rateDealer', { dealer: dealerName })}
        </h3>
        <span className="font-mono text-[10px] text-muted-foreground">{orderReference}</span>
      </div>
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
            {t('components.dealerReviews.yourRating')}
          </label>
          <StarRating rating={rating} size={24} interactive onChange={setRating} />
        </div>
        <div>
          <label className="mb-1 block text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
            {t('components.dealerReviews.titleLabel')}
          </label>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            maxLength={120}
            placeholder={t('components.dealerReviews.titlePlaceholder')}
            className="w-full border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="mb-1 block text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
            {t('components.dealerReviews.reviewLabel')}
          </label>
          <textarea
            value={reviewText}
            onChange={(event) => setReviewText(event.target.value)}
            maxLength={2000}
            placeholder={t('components.dealerReviews.reviewPlaceholder')}
            rows={4}
            className="w-full resize-none border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
          />
          <p className="mt-1 text-right text-[9px] text-muted-foreground">{reviewText.length}/2000</p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={saving || !rating || reviewText.trim().length < 10}
          className="w-full bg-primary py-3 text-[11px] font-medium uppercase tracking-[0.15em] text-primary-foreground disabled:opacity-50"
        >
          {saving ? t('components.dealerReviews.submitting') : t('components.dealerReviews.submit')}
        </button>
        <p className="text-[10px] leading-relaxed text-muted-foreground">
          {t('components.dealerReviews.moderationNotice')}
        </p>
      </div>
    </div>
  );
}
