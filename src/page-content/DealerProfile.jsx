import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { asArray } from '@/lib/base44Data';
import { useAuth } from '@/lib/AuthContext';
import StarRating from '@/components/dealer/StarRating';
import DealerReviewCard from '@/components/dealer/DealerReviewCard';
import DealerReviewForm from '@/components/dealer/DealerReviewForm';
import ProductCard from '@/components/shared/ProductCard';
import { BadgeCheck, MapPin, Clock, Globe, ShieldCheck, Star, Package } from 'lucide-react';

export default function DealerProfile({
  id: idProp,
  initialProfile = null,
  initialListings = [],
  initialReviews = [],
}) {
  const id = idProp || (typeof window !== 'undefined' ? window.location.pathname.split('/').filter(Boolean).pop() : '');
  const { user } = useAuth();
  const [profile, setProfile] = useState(initialProfile);
  const [listings, setListings] = useState(initialListings);
  const [reviews, setReviews] = useState(initialReviews);
  const [eligibleOrder, setEligibleOrder] = useState(null);
  const [loading, setLoading] = useState(!initialProfile && initialListings.length === 0 && initialReviews.length === 0);

  useEffect(() => {
    const load = async () => {
      try {
        const hasInitialData = initialProfile || initialListings.length > 0 || initialReviews.length > 0;
        const [profiles, dealerListings, dealerReviews] = hasInitialData
          ? [[initialProfile].filter(Boolean), initialListings, initialReviews]
          : await Promise.all([
              base44.entities.DealerProfile.filter({ userId: id }, '-created_date', 1).then(asArray).catch(() => []),
              base44.entities.Products.filter({ dealerId: id }, '-created_date', 50).then(asArray).catch(() => []),
              base44.entities.DealerReview.filter({ dealerId: id }, '-created_date', 50).then(asArray).catch(() => [])
            ]);

        setProfile(profiles[0] || null);
        setListings(dealerListings);
        setReviews(dealerReviews);

        // Check if current user has a completed order with this dealer (eligible to review)
        if (user) {
          const myOrders = asArray(await base44.entities.Orders.filter({ buyerId: user.id, dealerId: id }, '-created_date', 50).then(asArray).catch(() => []));
          const completed = myOrders.find(o =>
            ['funds_released', 'verified'].includes(o.escrowStatus) &&
            !dealerReviews.find(r => r.orderId === o.id)
          );
          if (completed) setEligibleOrder(completed);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
    window.scrollTo(0, 0);
  }, [id, user, initialProfile, initialListings, initialReviews]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="h-48 bg-card animate-pulse mb-6" />
        <div className="h-8 bg-card w-64 mb-4" />
        <div className="h-4 bg-card w-96" />
      </div>
    );
  }

  const displayName = profile?.displayName || listings[0]?.dealerName || 'Dealer';
  const avgRating = profile?.averageRating || (reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0);
  const totalReviews = profile?.totalReviews || reviews.length;
  const activeListings = listings.filter(p => p.availability === 'In Stock');

  // Rating distribution
  const distribution = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => r.rating === star).length,
    pct: reviews.length > 0 ? (reviews.filter(r => r.rating === star).length / reviews.length) * 100 : 0
  }));

  return (
    <div>
      {/* Banner */}
      <div className="relative h-48 md:h-64 bg-card overflow-hidden">
        {profile?.bannerImage ? (
          <img src={profile.bannerImage} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/10 via-card to-muted" />
        )}
      </div>

      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end gap-4 -mt-12 md:-mt-16 mb-8 relative">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-background overflow-hidden bg-card flex-shrink-0">
            {profile?.logoImage ? (
              <img src={profile.logoImage} alt={displayName} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl font-display text-primary">
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="flex-1 pb-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl md:text-3xl font-display font-light text-foreground">{displayName}</h1>
              {profile?.verifiedStatus === 'verified' && (
                <span className="flex items-center gap-1 text-[10px] tracking-[0.1em] uppercase text-primary bg-primary/10 px-2 py-0.5 rounded">
                  <BadgeCheck size={12} /> Verified Dealer
                </span>
              )}
            </div>
            <div className="flex items-center gap-4 mt-2 flex-wrap">
              <div className="flex items-center gap-1.5">
                <StarRating rating={Math.round(avgRating)} size={14} />
                <span className="text-sm text-foreground font-medium">{avgRating.toFixed(1)}</span>
                <span className="text-xs text-muted-foreground">({totalReviews} reviews)</span>
              </div>
              {profile?.location && (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin size={12} /> {profile.location}
                </span>
              )}
              {profile?.responseTime && (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock size={12} /> {profile.responseTime}
                </span>
              )}
              {profile?.websiteUrl && (
                <a href={profile.websiteUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-primary hover:underline">
                  <Globe size={12} /> Website
                </a>
              )}
            </div>
          </div>
          <div className="pb-2">
            <div className="bg-card border border-border px-4 py-3 text-center">
              <p className="text-xl font-display text-foreground">{activeListings.length}</p>
              <p className="text-[9px] tracking-[0.1em] uppercase text-muted-foreground">Active Listings</p>
            </div>
          </div>
        </div>

        {/* Bio */}
        {profile?.bio && (
          <div className="border border-border bg-card p-5 mb-8">
            <h2 className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium mb-3">About This Dealer</h2>
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{profile.bio}</p>
            {profile?.specialties?.length > 0 && (
              <div className="flex items-center gap-2 mt-4 flex-wrap">
                <span className="text-[10px] tracking-[0.1em] uppercase text-muted-foreground">Specialties:</span>
                {profile.specialties.map((s, i) => (
                  <span key={i} className="text-[10px] tracking-[0.05em] bg-muted px-2 py-0.5 text-foreground">{s}</span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Listings */}
        <div className="mb-12">
          <div className="flex items-end justify-between mb-6">
            <h2 className="font-display text-xl text-foreground font-light flex items-center gap-2">
              <Package size={18} className="text-primary" /> Available Watches
            </h2>
            <span className="text-xs text-muted-foreground">{activeListings.length} in stock</span>
          </div>
          {activeListings.length === 0 ? (
            <div className="border border-border p-8 text-center">
              <p className="text-sm text-muted-foreground">No watches currently available from this dealer.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {activeListings.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>

        {/* Reviews */}
        <div className="mb-12">
          <div className="flex items-end justify-between mb-6">
            <h2 className="font-display text-xl text-foreground font-light flex items-center gap-2">
              <Star size={18} className="text-amber-400" /> Dealer Reviews
            </h2>
          </div>

          {/* Rating summary */}
          {reviews.length > 0 && (
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="border border-border bg-card p-5 text-center flex flex-col items-center justify-center">
                <p className="text-4xl font-display text-foreground">{avgRating.toFixed(1)}</p>
                <StarRating rating={Math.round(avgRating)} size={16} />
                <p className="text-xs text-muted-foreground mt-1">{totalReviews} reviews</p>
              </div>
              <div className="md:col-span-2 border border-border bg-card p-5">
                {distribution.map(d => (
                  <div key={d.star} className="flex items-center gap-3 mb-1.5 last:mb-0">
                    <span className="text-xs text-muted-foreground w-6">{d.star}★</span>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: `${d.pct}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground w-8 text-right">{d.count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Review form for eligible buyers */}
          {eligibleOrder && (
            <div className="mb-6">
              <DealerReviewForm
                dealerId={id}
                dealerName={displayName}
                orderId={eligibleOrder.id}
                orderReference={eligibleOrder.escrowReference}
                onSubmitted={() => {
                  setEligibleOrder(null);
                  window.location.reload();
                }}
              />
            </div>
          )}

          {/* Review list */}
          {reviews.length === 0 ? (
            <div className="border border-border p-8 text-center">
              <p className="text-sm text-muted-foreground">No reviews yet. Be the first to review this dealer!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map(r => <DealerReviewCard key={r.id} review={r} />)}
            </div>
          )}
        </div>

        {/* Trust note */}
        <div className="border border-primary/20 bg-primary/5 p-5 mb-12 flex items-start gap-3">
          <ShieldCheck size={18} className="text-primary flex-shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            All purchases from this dealer are protected by our escrow service. Your payment is held securely until you confirm delivery and complete your 14-day inspection period.
          </p>
        </div>
      </div>
    </div>
  );
}
