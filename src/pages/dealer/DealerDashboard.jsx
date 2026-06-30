import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import { useLanguage } from '@/lib/languageContext';
import { Link } from 'react-router-dom';
import { Package, ShoppingCart, ShieldCheck, Plus, ChevronRight } from 'lucide-react';
import { formatPrice } from '@/lib/constants';
import EscrowStatusBadge from '@/components/escrow/EscrowStatusBadge';

export default function DealerDashboard() {
  const { user } = useAuth();
  const { localePath } = useLanguage();
  const [listings, setListings] = useState([]);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [myListings, mySales] = await Promise.all([
          base44.entities.Products.filter({ created_by_id: user.id }, '-created_date', 5),
          base44.entities.Orders.filter({ dealerId: user.id }, '-created_date', 5)
        ]);
        setListings(myListings);
        setSales(mySales);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    load();
  }, [user]);

  const stats = [
    { icon: Package, label: 'Active Listings', value: listings.filter(l => l.availability === 'In Stock').length, color: 'text-blue-500' },
    { icon: ShoppingCart, label: 'Pending Sales', value: sales.filter(s => !['funds_released', 'cancelled'].includes(s.escrowStatus)).length, color: 'text-amber-500' },
    { icon: ShieldCheck, label: 'In Escrow', value: sales.filter(s => ['funds_secured', 'shipped', 'verified'].includes(s.escrowStatus)).length, color: 'text-emerald-500' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-display text-foreground font-light">Dealer Dashboard</h1>
          <p className="text-xs text-muted-foreground">Manage your listings and sales.</p>
        </div>
        <Link to={localePath('/dealer/listings/new')} className="flex items-center gap-2 bg-primary text-primary-foreground text-[11px] tracking-[0.12em] uppercase px-4 py-2.5">
          <Plus size={14} /> List Watch
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8">
        {stats.map((s, i) => (
          <div key={i} className="bg-card border border-border p-4 md:p-5">
            <s.icon size={16} className={`${s.color} mb-2`} />
            <p className="text-xl md:text-2xl font-display text-foreground">{s.value}</p>
            <p className="text-[9px] md:text-[10px] tracking-[0.1em] uppercase text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Action needed — sales requiring shipment */}
      {sales.filter(s => s.escrowStatus === 'funds_secured').length > 0 && (
        <div className="bg-emerald-500/5 border border-emerald-500/20 p-4 mb-6 flex items-center gap-3">
          <ShieldCheck size={20} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Funds Secured — Ship Now!</p>
            <p className="text-xs text-muted-foreground">You have {sales.filter(s => s.escrowStatus === 'funds_secured').length} order(s) with funds secured in escrow. Please ship immediately.</p>
          </div>
          <Link to={localePath('/dealer/sales')} className="text-[11px] tracking-[0.12em] uppercase text-primary hover:underline whitespace-nowrap">View Sales</Link>
        </div>
      )}

      {/* Recent sales */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-medium text-foreground">Recent Sales</h2>
          <Link to={localePath('/dealer/sales')} className="text-[11px] tracking-[0.12em] uppercase text-primary hover:underline">View All</Link>
        </div>
        {loading ? (
          <div className="space-y-2">{[...Array(2)].map((_, i) => <div key={i} className="h-16 bg-card animate-pulse" />)}</div>
        ) : sales.length === 0 ? (
          <div className="border border-border p-6 text-center"><p className="text-xs text-muted-foreground">No sales yet.</p></div>
        ) : (
          <div className="space-y-2">
            {sales.map(sale => (
              <Link key={sale.id} to={localePath('/dealer/sales')} className="block bg-card border border-border p-3 hover:border-primary transition-colors">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">{sale.products?.[0]?.productTitle || 'Sale'}</p>
                    <p className="text-[10px] text-muted-foreground font-mono">{sale.escrowReference}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-foreground">{formatPrice(sale.totalAmount)}</p>
                    <EscrowStatusBadge status={sale.escrowStatus} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Recent listings */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-medium text-foreground">Recent Listings</h2>
          <Link to={localePath('/dealer/listings')} className="text-[11px] tracking-[0.12em] uppercase text-primary hover:underline">View All</Link>
        </div>
        {loading ? (
          <div className="space-y-2">{[...Array(2)].map((_, i) => <div key={i} className="h-16 bg-card animate-pulse" />)}</div>
        ) : listings.length === 0 ? (
          <div className="border border-border p-6 text-center">
            <p className="text-xs text-muted-foreground mb-3">No listings yet.</p>
            <Link to={localePath('/dealer/listings/new')} className="text-[11px] tracking-[0.12em] uppercase text-primary hover:underline">List Your First Watch</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {listings.map(p => (
              <Link key={p.id} to={localePath(`/dealer/listings/${p.id}`)} className="bg-card border border-border hover:border-primary transition-colors">
                {p.featuredImage ? <img src={p.featuredImage} alt="" className="w-full aspect-square object-cover" /> : <div className="w-full aspect-square bg-muted" />}
                <div className="p-2">
                  <p className="text-[9px] tracking-[0.1em] uppercase text-primary truncate">{p.brand}</p>
                  <p className="text-[10px] text-foreground truncate">{p.productTitle}</p>
                  <p className="text-xs text-foreground mt-0.5">{formatPrice(p.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}