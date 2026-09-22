import React, { useId, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { submitDealerReview, updateDealerReviewComment } from '@/actions/dealerReviews';
import StarRating from './StarRating';
import { useToast } from '@/components/ui/use-toast';

export default function DealerReviewForm({ dealerId, dealerName, orderId, orderReference, initialReview = null, onSubmitted }) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const formId = useId();
  const editing = initialReview && initialReview.status !== 'rejected';
  const [rating, setRating] = useState(initialReview?.rating || 0);
  const [title, setTitle] = useState(initialReview?.title || '');
  const [reviewText, setReviewText] = useState(initialReview?.reviewText || '');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (saving) return;
    if (!rating || reviewText.trim().length < 10) {
      toast({ title: t('components.dealerReviews.validation'), variant: 'destructive' });
      return;
    }

    setSaving(true);
    try {
      const result = editing
        ? await updateDealerReviewComment({ reviewId: initialReview.id, reviewText, expectedUpdatedAt: initialReview.updated_date })
        : await submitDealerReview({ dealerId, orderId, rating, title, reviewText });
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
    <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-card p-4 sm:p-5">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
        <h3 className="text-base font-medium text-foreground">
          {editing ? t('components.dealerReviews.updateComment') : t('components.dealerReviews.rateDealer', { dealer: dealerName })}
        </h3>
        <span className="font-mono text-xs text-muted-foreground">{orderReference}</span>
      </div>
      <div className="space-y-4">
        <div>
          <p className="mb-2 text-sm text-muted-foreground">
            {t('components.dealerReviews.yourRating')}
          </p>
          <StarRating rating={rating} size={24} interactive={!editing && !saving} onChange={setRating} />
        </div>
        {!editing && <div>
          <label htmlFor={`${formId}-title`} className="mb-1 block text-sm text-muted-foreground">
            {t('components.dealerReviews.titleLabel')}
          </label>
          <input
            id={`${formId}-title`}
            disabled={saving}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            maxLength={120}
            placeholder={t('components.dealerReviews.titlePlaceholder')}
            className="w-full border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
          />
        </div>}
        <div>
          <label htmlFor={`${formId}-comment`} className="mb-1 block text-sm text-muted-foreground">
            {t('components.dealerReviews.reviewLabel')}
          </label>
          <textarea
            id={`${formId}-comment`}
            disabled={saving}
            value={reviewText}
            onChange={(event) => setReviewText(event.target.value)}
            maxLength={2000}
            placeholder={t('components.dealerReviews.reviewPlaceholder')}
            rows={4}
            className="w-full resize-none border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
          />
          <p className="mt-1 text-right text-xs text-muted-foreground">{reviewText.length}/2000</p>
        </div>
        <button
          type="submit"
          disabled={saving || !rating || reviewText.trim().length < 10 || (editing && reviewText.trim() === initialReview.reviewText)}
          className="min-h-11 w-full rounded-full bg-primary px-4 py-3 text-sm font-medium text-primary-foreground disabled:opacity-50"
        >
          {saving ? t('components.dealerReviews.submitting') : t(editing ? 'components.dealerReviews.submitComment' : 'components.dealerReviews.submit')}
        </button>
        <p className="text-xs leading-relaxed text-muted-foreground">
          {t(editing ? 'components.dealerReviews.commentModerationNotice' : 'components.dealerReviews.purchaseDisclosure')}
        </p>
      </div>
    </form>
  );
}
