import React, { useState, useEffect } from 'react';
import { getMyDealerListings, deleteDealerListing } from '@/actions/products';
import { useAuth } from '@/lib/AuthContext';
import LocalizedLink from '@/components/LocalizedLink';
import { Plus, Package } from 'lucide-react';
import { formatPrice } from '@/lib/constants';

export default function PortalListings() {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyDealerListings()
      .then(setListings).catch(console.error).finally(() => setLoading(false));
  }, [user]);

  const handleDelete = async (id) => {
    if (!confirm('Delete this listing?')) return;
    try {
      await deleteDealerListing(id);
      setListings(prev => prev.filter(p => p.id !== id));
    } catch (e) { alert('Failed to delete listing'); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-display text-foreground font-light">My Listings</h1>
        <LocalizedLink to="/portal/listings/new" className="flex items-center gap-2 bg-primary text-primary-foreground text-[11px] tracking-[0.12em] uppercase px-4 py-2.5">
          <Plus size={14} /> List Watch
        </LocalizedLink>
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-20 bg-card animate-pulse" />)}</div>
      ) : listings.length === 0 ? (
        <div className="border border-border p-12 text-center">
          <Package size={32} className="text-muted-foreground/40 mx-auto mb-4" />
          <p className="text-sm text-muted-foreground mb-4">No listings yet.</p>
          <LocalizedLink to="/portal/listings/new" className="text-[11px] tracking-[0.12em] uppercase text-primary hover:underline">List Your First Watch</LocalizedLink>
        </div>
      ) : (
        <div className="space-y-3">
          {listings.map(p => (
            <div key={p.id} className="bg-card border border-border p-3 flex items-center gap-4">
              {p.featuredImage ? <img src={p.featuredImage} alt="" className="w-16 h-16 object-cover flex-shrink-0" /> : <div className="w-16 h-16 bg-muted flex-shrink-0" />}
              <div className="flex-1 min-w-0">
                <p className="text-[10px] tracking-[0.1em] uppercase text-primary">{p.brand}</p>
                <p className="text-xs font-medium text-foreground truncate">{p.productTitle}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className={`text-[9px] tracking-wide uppercase px-2 py-0.5 ${p.availability === 'In Stock' ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' : p.availability === 'Reserved' ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400' : 'bg-red-500/15 text-red-600 dark:text-red-400'}`}>{p.availability}</span>
                  <span className="text-sm text-foreground">{formatPrice(p.price)}</span>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <LocalizedLink to={`/portal/listings/${p.id}`} className="text-[10px] tracking-[0.1em] uppercase border border-border px-3 py-2 text-foreground hover:border-primary">Edit</LocalizedLink>
                <button onClick={() => handleDelete(p.id)} className="text-[10px] tracking-[0.1em] uppercase border border-red-500/30 text-red-600 dark:text-red-400 px-3 py-2 hover:bg-red-500/10">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
