import React, { useState, useEffect } from 'react';
import { getMySales } from '@/actions/orders';
import { useAuth } from '@/lib/AuthContext';
import { ShoppingCart, ShieldCheck, Truck } from 'lucide-react';
import { formatPrice } from '@/lib/constants';
import EscrowStatusBadge from '@/components/escrow/EscrowStatusBadge';
import EscrowTrustBadge from '@/components/escrow/EscrowTrustBadge';
import { ESCROW_STATUS_DESCRIPTIONS } from '@/lib/escrowConstants';

export default function PortalSales() {
  const { user } = useAuth();
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMySales({ limit: 50 }).then(setSales).catch(console.error).finally(() => setLoading(false));
  }, [user]);

  const needsShipping = sales.filter(s => s.escrowStatus === 'funds_secured');

  return (
    <div>
      <h1 className="text-xl font-display text-foreground font-light mb-6">Sales & Escrow</h1>

      {/* Alert for orders needing shipment */}
      {needsShipping.length > 0 && (
        <div className="bg-emerald-500/5 border border-emerald-500/20 p-4 mb-6 flex items-center gap-3">
          <ShieldCheck size={20} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Funds Secured — Ship Immediately</p>
            <p className="text-xs text-muted-foreground">{needsShipping.length} order(s) have funds secured in escrow and are awaiting shipment.</p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-20 bg-card animate-pulse" />)}</div>
      ) : sales.length === 0 ? (
        <div className="border border-border p-12 text-center">
          <ShoppingCart size={32} className="text-muted-foreground/40 mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">No sales yet. Your listings will appear here once a buyer purchases.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sales.map(sale => (
            <div key={sale.id} className="bg-card border border-border p-4">
              <div className="flex items-center justify-between gap-4 mb-3">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {sale.products?.[0]?.featuredImage ? (
                    <img src={sale.products[0].featuredImage} alt="" className="w-14 h-14 object-cover flex-shrink-0" />
                  ) : <div className="w-14 h-14 bg-muted flex-shrink-0" />}
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">{sale.products?.[0]?.productTitle || 'Sale'}</p>
                    <p className="text-[10px] text-muted-foreground">{sale.products?.[0]?.brand} • {sale.products?.[0]?.condition}</p>
                    <p className="text-[10px] text-muted-foreground font-mono mt-0.5">{sale.escrowReference}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm text-foreground mb-1">{formatPrice(sale.totalAmount, sale.currency || 'EUR')}</p>
                  <EscrowStatusBadge status={sale.escrowStatus} />
                </div>
              </div>

              <div className="text-[11px] text-muted-foreground border-t border-border pt-2">
                <span className="text-primary">●</span> {ESCROW_STATUS_DESCRIPTIONS[sale.escrowStatus]}
              </div>

              {/* Shipping address for orders that need to ship */}
              {['funds_secured', 'shipped'].includes(sale.escrowStatus) && sale.shippingDetails && (
                <div className="mt-3 bg-background border border-border p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Truck size={12} className="text-primary" />
                    <p className="text-[10px] tracking-[0.1em] uppercase text-muted-foreground">Ship To</p>
                  </div>
                  <p className="text-xs text-foreground">{sale.shippingDetails.fullName}</p>
                  <p className="text-xs text-muted-foreground">{sale.shippingDetails.street}, {sale.shippingDetails.postalCode} {sale.shippingDetails.city}, {sale.shippingDetails.country}</p>
                  {sale.trackingNumber && <p className="text-[10px] text-primary font-mono mt-2">Tracking: {sale.trackingNumber}</p>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-6">
        <EscrowTrustBadge />
      </div>
    </div>
  );
}
