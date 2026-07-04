import React from 'react';
import StarRating from './StarRating';
import { BadgeCheck, ShieldCheck } from 'lucide-react';

export default function DealerReviewCard({ review }) {
  return (
    <div className="border border-border bg-card p-5">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-foreground">{review.buyerName || 'Verified Buyer'}</p>
            {review.isVerifiedPurchase && (
              <span className="flex items-center gap-1 text-[9px] tracking-[0.1em] uppercase text-emerald-600 dark:text-emerald-400">
                <ShieldCheck size={10} /> Verified Purchase
              </span>
            )}
          </div>
          <p className="text-[10px] text-muted-foreground mt-0.5">
            {review.orderReference && <span className="font-mono">{review.orderReference}</span>}
          </p>
        </div>
        <StarRating rating={review.rating} size={12} />
      </div>

      {review.title && <p className="text-xs font-medium text-foreground mb-1">{review.title}</p>}
      <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">{review.reviewText}</p>

      {review.dealerResponse && (
        <div className="mt-4 pl-4 border-l-2 border-primary/30">
          <div className="flex items-center gap-1.5 mb-1">
            <BadgeCheck size={12} className="text-primary" />
            <p className="text-[10px] tracking-[0.1em] uppercase text-primary font-medium">Dealer Response</p>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">{review.dealerResponse}</p>
        </div>
      )}
    </div>
  );
}