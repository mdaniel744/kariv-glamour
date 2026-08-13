import React, { useEffect, useState } from 'react';
import { Check, RefreshCw, ShieldCheck, Star, X } from 'lucide-react';
import { listAdminDealerReviews, moderateDealerReview } from '@/actions/dealerReviews';
import StarRating from '@/components/dealer/StarRating';
import { useToast } from '@/components/ui/use-toast';

const FILTERS = ['pending', 'approved', 'rejected', 'all'];

export default function AdminDealerReviews() {
  const { toast } = useToast();
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState('pending');
  const [loading, setLoading] = useState(true);
  const [workingId, setWorkingId] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      setReviews(await listAdminDealerReviews({ status }));
    } catch (error) {
      toast({ title: 'Unable to load dealer reviews', description: error.message, variant: 'destructive' });
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [status]);

  const moderate = async (reviewId, nextStatus) => {
    setWorkingId(reviewId);
    try {
      const result = await moderateDealerReview(reviewId, nextStatus);
      if (!result.ok) {
        toast({ title: 'Moderation failed', description: result.error, variant: 'destructive' });
        return;
      }
      toast({ title: nextStatus === 'approved' ? 'Review approved' : 'Review rejected' });
      setReviews((current) => current.filter((review) => review.id !== reviewId));
    } catch (error) {
      toast({ title: 'Moderation failed', description: error.message, variant: 'destructive' });
    } finally {
      setWorkingId(null);
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-xl font-light text-[#E5E5E5]">Dealer Reviews</h1>
          <p className="mt-1 text-[10px] text-[#8E8E93]">
            Verified-purchase reviews stay private until an administrator approves them.
          </p>
        </div>
        <button
          type="button"
          onClick={load}
          disabled={loading}
          className="flex items-center gap-2 border border-white/10 px-3 py-2 text-[10px] uppercase tracking-[0.1em] text-[#8E8E93] hover:border-[#C5A367] hover:text-[#C5A367] disabled:opacity-50"
        >
          <RefreshCw size={13} className={loading ? 'animate-spin' : ''} /> Refresh
        </button>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setStatus(filter)}
            className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.1em] ${status === filter ? 'bg-[#C5A367] text-black' : 'border border-white/5 bg-[#111] text-[#8E8E93]'}`}
          >
            {filter}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, index) => <div key={index} className="h-40 animate-pulse bg-[#111]" />)}
        </div>
      ) : reviews.length === 0 ? (
        <div className="border border-white/5 py-16 text-center">
          <Star size={22} className="mx-auto mb-3 text-[#C5A367]" />
          <p className="text-sm text-[#8E8E93]">No {status === 'all' ? '' : status} reviews found.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {reviews.map((review) => (
            <article key={review.id} className="border border-white/5 bg-[#111] p-5">
              <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-medium text-[#E5E5E5]">{review.dealerName}</p>
                    <span className="flex items-center gap-1 text-[9px] uppercase tracking-[0.1em] text-emerald-400">
                      <ShieldCheck size={10} /> Verified purchase
                    </span>
                  </div>
                  <p className="mt-1 text-[10px] text-[#8E8E93]">
                    {review.buyerName} · <span className="font-mono">{review.orderReference}</span>
                  </p>
                </div>
                <div className="text-right">
                  <StarRating rating={review.rating} size={13} />
                  <span className={`mt-2 inline-block px-2 py-0.5 text-[9px] uppercase tracking-wide ${review.status === 'pending' ? 'bg-amber-900/30 text-amber-400' : review.status === 'approved' ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                    {review.status}
                  </span>
                </div>
              </div>

              {review.title && <h2 className="mb-2 text-xs font-medium text-[#E5E5E5]">{review.title}</h2>}
              <p className="whitespace-pre-line text-xs leading-relaxed text-[#B5B5B8]">{review.reviewText}</p>
              <p className="mt-3 text-[9px] text-[#666]">Submitted {new Date(review.created_date).toLocaleString()}</p>

              {review.status === 'pending' && (
                <div className="mt-5 flex flex-wrap gap-2 border-t border-white/5 pt-4">
                  <button
                    type="button"
                    onClick={() => moderate(review.id, 'approved')}
                    disabled={workingId === review.id}
                    className="flex items-center gap-2 bg-emerald-600 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.1em] text-white disabled:opacity-50"
                  >
                    <Check size={13} /> Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => moderate(review.id, 'rejected')}
                    disabled={workingId === review.id}
                    className="flex items-center gap-2 border border-red-500/30 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.1em] text-red-400 disabled:opacity-50"
                  >
                    <X size={13} /> Reject
                  </button>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
