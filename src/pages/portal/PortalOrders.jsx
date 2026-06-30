import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import { useLanguage } from '@/lib/languageContext';
import { Link } from 'react-router-dom';
import { Package, ChevronRight } from 'lucide-react';
import { formatPrice } from '@/lib/constants';
import EscrowStatusBadge from '@/components/escrow/EscrowStatusBadge';

export default function PortalOrders() {
  const { user } = useAuth();
  const { localePath } = useLanguage();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Orders.filter({ buyerId: user.id }, '-created_date', 50)
      .then(setOrders).catch(console.error).finally(() => setLoading(false));
  }, [user]);

  return (
    <div>
      <h1 className="text-xl font-display text-foreground font-light mb-6">My Orders</h1>

      {loading ? (
        <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-24 bg-card animate-pulse" />)}</div>
      ) : orders.length === 0 ? (
        <div className="border border-border p-12 text-center">
          <Package size={32} className="text-muted-foreground/40 mx-auto mb-4" />
          <p className="text-sm text-muted-foreground mb-4">You haven't placed any orders yet.</p>
          <Link to={localePath('/shop')} className="text-[11px] tracking-[0.12em] uppercase text-primary hover:underline">Browse Watches</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map(order => (
            <Link key={order.id} to={localePath(`/portal/orders/${order.id}`)} className="block bg-card border border-border p-4 hover:border-primary transition-colors">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {order.products?.[0]?.featuredImage ? (
                    <img src={order.products[0].featuredImage} alt="" className="w-14 h-14 object-cover flex-shrink-0" />
                  ) : (
                    <div className="w-14 h-14 bg-muted flex-shrink-0" />
                  )}
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">{order.products?.[0]?.productTitle || 'Order'}</p>
                    <p className="text-[10px] text-muted-foreground">{order.products?.[0]?.brand}</p>
                    <p className="text-[10px] text-muted-foreground font-mono mt-0.5">{order.escrowReference}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm text-foreground mb-1">{formatPrice(order.totalAmount)}</p>
                  <EscrowStatusBadge status={order.escrowStatus} />
                </div>
                <ChevronRight size={16} className="text-muted-foreground flex-shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}