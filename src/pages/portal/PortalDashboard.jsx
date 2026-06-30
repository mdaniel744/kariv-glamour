import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import { useLanguage } from '@/lib/languageContext';
import { Package, Heart, ShieldCheck, Store, ChevronRight } from 'lucide-react';
import { formatPrice } from '@/lib/constants';
import EscrowStatusBadge from '@/components/escrow/EscrowStatusBadge';
import { isDealer } from '@/lib/escrowConstants';
import { Link } from 'react-router-dom';

export default function PortalDashboard() {
  const { user } = useAuth();
  const { localePath } = useLanguage();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Orders.filter({ buyerId: user.id }, '-created_date', 5)
      .then(setOrders).catch(console.error).finally(() => setLoading(false));
  }, [user]);

  const stats = [
    { icon: Package, label: 'Active Orders', value: orders.filter(o => !['funds_released', 'cancelled'].includes(o.escrowStatus)).length, color: 'text-blue-500' },
    { icon: ShieldCheck, label: 'In Escrow', value: orders.filter(o => ['funds_secured', 'shipped', 'verified'].includes(o.escrowStatus)).length, color: 'text-emerald-500' },
    { icon: Package, label: 'Completed', value: orders.filter(o => o.escrowStatus === 'funds_released').length, color: 'text-primary' },
  ];

  return (
    <div>
      <h1 className="text-xl font-display text-foreground font-light mb-1">Welcome back, {user?.full_name?.split(' ')[0] || 'there'}</h1>
      <p className="text-xs text-muted-foreground mb-8">Manage your orders, profile, and watch collection.</p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8">
        {stats.map((s, i) => (
          <div key={i} className="bg-card border border-border p-4 md:p-5">
            <s.icon size={16} className={`${s.color} mb-2`} />
            <p className="text-xl md:text-2xl font-display text-foreground">{s.value}</p>
            <p className="text-[9px] md:text-[10px] tracking-[0.1em] uppercase text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Become dealer CTA */}
      {!isDealer(user) && (
        <div className="bg-primary/5 border border-primary/20 p-5 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Store size={24} className="text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">Want to sell watches on Kariv Glamour?</p>
              <p className="text-xs text-muted-foreground">Apply for dealer status and start listing your timepieces.</p>
            </div>
          </div>
          <Link to={localePath('/portal/become-dealer')} className="text-[11px] tracking-[0.12em] uppercase text-primary hover:underline whitespace-nowrap flex items-center gap-1">
            Apply <ChevronRight size={12} />
          </Link>
        </div>
      )}

      {/* Recent orders */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-medium text-foreground">Recent Orders</h2>
          <Link to={localePath('/portal/orders')} className="text-[11px] tracking-[0.12em] uppercase text-primary hover:underline">View All</Link>
        </div>
        {loading ? (
          <div className="space-y-2">{[...Array(2)].map((_, i) => <div key={i} className="h-20 bg-card animate-pulse" />)}</div>
        ) : orders.length === 0 ? (
          <div className="border border-border p-8 text-center">
            <Package size={24} className="text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground mb-4">No orders yet.</p>
            <Link to={localePath('/shop')} className="text-[11px] tracking-[0.12em] uppercase text-primary hover:underline">Browse Watches</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map(order => (
              <Link key={order.id} to={localePath(`/portal/orders/${order.id}`)} className="block bg-card border border-border p-4 hover:border-primary transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    {order.products?.[0]?.featuredImage && <img src={order.products[0].featuredImage} alt="" className="w-12 h-12 object-cover" />}
                    <div>
                      <p className="text-xs font-medium text-foreground">{order.products?.[0]?.productTitle || 'Order'}</p>
                      <p className="text-[10px] text-muted-foreground font-mono">{order.escrowReference}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-foreground">{formatPrice(order.totalAmount)}</p>
                    <EscrowStatusBadge status={order.escrowStatus} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}