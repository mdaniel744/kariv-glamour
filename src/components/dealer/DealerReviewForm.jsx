import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import StarRating from './StarRating';
import { useToast } from '@/components/ui/use-toast';

export default function DealerReviewForm({ dealerId, dealerName, orderId, orderReference, onSubmitted }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async () => {
    if (!rating || !reviewText.trim()) {
      toast({ title: 'Please provide a rating and review text', variant: 'destructive' });
      return;
    }
    setSaving(true);
    try {
      const review = await base44.entities.DealerReview.create({
        dealerId,
        dealerName,
        buyerId: user.id,
        buyerName: user.full_name || user.email,
        orderId,
        orderReference,
        rating,
        title: title.trim(),
        reviewText: reviewText.trim(),
        isVerifiedPurchase: true
      });

      // Recalculate dealer average
      const allReviews = await base44.entities.DealerReview.filter({ dealerId }, '-created_date', 500);
      const avg = allReviews.length > 0
        ? allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length
        : 0;
      const profiles = await base44.entities.DealerProfile.filter({ userId: dealerId }, '-created_date', 1);
      if (profiles.length > 0) {
        await base44.entities.DealerProfile.update(profiles[0].id, {
          averageRating: Math.round(avg * 10) / 10,
          totalReviews: allReviews.length
        });
      }

      toast({ title: 'Review submitted!' });
      onSubmitted?.(review);
    } catch (e) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="border border-border bg-card p-5">
      <h3 className="text-sm font-medium text-foreground mb-4">Rate Your Experience with {dealerName}</h3>
      <div className="space-y-4">
        <div>
          <label className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-2 block">Your Rating</label>
          <StarRating rating={rating} size={24} interactive onChange={setRating} />
        </div>
        <div>
          <label className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1 block">Title (optional)</label>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Summarize your experience"
            className="w-full bg-background border border-border px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1 block">Review *</label>
          <textarea
            value={reviewText}
            onChange={e => setReviewText(e.target.value)}
            placeholder="Share details about your purchase experience, delivery, and product quality..."
            rows={4}
            className="w-full bg-background border border-border px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary resize-none"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={saving || !rating || !reviewText.trim()}
          className="w-full bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium py-3 disabled:opacity-50"
        >
          {saving ? 'Submitting...' : 'Submit Review'}
        </button>
      </div>
    </div>
  );
}