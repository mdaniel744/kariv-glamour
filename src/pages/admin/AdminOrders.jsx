import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { formatPrice } from '@/lib/constants';
import { useToast } from '@/components/ui/use-toast';
import EscrowStatusBadge from '@/components/escrow/EscrowStatusBadge';
import { ESCROW_STATUS_LABELS } from '@/lib/escrowConstants';
import { ChevronDown, Truck } from 'lucide-react';

export default function AdminOrders() {
  const { toast } = useToast();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    base44.entities.Orders.list('-created_date', 50).then(setOrders).catch(console.error).finally(() => setLoading(false));
  }, []);

  const updateEscrow = async (id, escrowStatus) => {
    try {
      const orderStatus = escrowStatus === 'funds_released' ? 'Delivered' : escrowStatus === 'shipped' ? 'Shipped' : escrowStatus === 'cancelled' ? 'Cancelled' : 'Processing';
      const paymentStatus = ['funds_secured', 'shipped', 'verified', 'funds_released'].includes(escrowStatus) ? 'Paid' : 'Pending';
      const shippingStatus = escrowStatus === 'shipped' ? 'Shipped' : escrowStatus === 'verified' || escrowStatus === 'funds_released' ? 'Delivered' : 'Pending';

      await base44.functions.invoke('processOrder', {
        action: 'update_escrow', orderId: id, escrowStatus, orderStatus, paymentStatus, shippingStatus
      });
      setOrders(prev => prev.map(o => o.id === id ? { ...o, escrowStatus, orderStatus, paymentStatus, shippingStatus } : o));
      toast({ title: `Escrow status updated to ${ESCROW_STATUS_LABELS[escrowStatus]}` });
    } catch (e) { toast({ title: 'Error', description: e.response?.data?.error || e.message, variant: 'destructive' }); }
  };

  const updateTracking = async (id, trackingNumber) => {
    try {
      await base44.functions.invoke('processOrder', { action: 'update_escrow', orderId: id, trackingNumber });
      setOrders(prev => prev.map(o => o.id === id ? { ...o, trackingNumber } : o));
      toast({ title: 'Tracking number updated' });
    } catch (e) { toast({ title: 'Error', description: e.message, variant: 'destructive' }); }
  };

  return (
    <div>
      <h1 className="text-xl font-display text-[#E5E5E5] font-light mb-6">Orders & Escrow</h1>
      {loading ? (
        <div className="space-y-2">{[...Array(3)].map((_, i) => <div key={i} className="h-20 bg-[#111] animate-pulse" />)}</div>
      ) : orders.length === 0 ? (
        <div className="text-center py-16 border border-white/5"><p className="text-[#8E8E93] text-sm">No orders yet.</p></div>
      ) : (
        <div className="space-y-3">
          {orders.map(o => (
            <div key={o.id} className="bg-[#111] border border-white/5">
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    {o.products?.[0]?.featuredImage && <img src={o.products[0].featuredImage} alt="" className="w-12 h-12 object-cover" />}
                    <div>
                      <p className="text-xs text-[#E5E5E5] font-medium">{o.customerName}</p>
                      <p className="text-[10px] text-[#8E8E93]">{o.customerEmail}</p>
                      <p className="text-[10px] text-[#8E8E93] font-mono">{o.escrowReference}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-[#C5A367] font-medium mb-1">{formatPrice(o.totalAmount)}</p>
                    <EscrowStatusBadge status={o.escrowStatus} />
                  </div>
                </div>
                <button onClick={() => setExpanded(expanded === o.id ? null : o.id)} className="flex items-center gap-1 text-[10px] tracking-[0.1em] uppercase text-[#8E8E93] hover:text-[#E5E5E5]">
                  Manage <ChevronDown size={10} className={`transition-transform ${expanded === o.id ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {expanded === o.id && (
                <div className="border-t border-white/5 p-4 space-y-3">
                  {/* Escrow status controls */}
                  <div>
                    <p className="text-[10px] tracking-[0.1em] uppercase text-[#8E8E93] mb-1.5">Escrow Status</p>
                    <select value={o.escrowStatus} onChange={e => updateEscrow(o.id, e.target.value)} className="w-full bg-[#0A0A0B] border border-white/10 text-[10px] text-[#E5E5E5] px-2 py-1.5 outline-none focus:border-[#C5A367]">
                      {Object.entries(ESCROW_STATUS_LABELS).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
                    </select>
                  </div>

                  {/* Tracking number */}
                  <div>
                    <p className="text-[10px] tracking-[0.1em] uppercase text-[#8E8E93] mb-1.5 flex items-center gap-1"><Truck size={10} /> Tracking Number</p>
                    <div className="flex gap-2">
                      <input defaultValue={o.trackingNumber || ''} placeholder="Enter tracking number..." onBlur={e => e.target.value && e.target.value !== o.trackingNumber && updateTracking(o.id, e.target.value)} className="flex-1 bg-[#0A0A0B] border border-white/10 text-[10px] text-[#E5E5E5] px-2 py-1.5 outline-none focus:border-[#C5A367]" />
                    </div>
                  </div>

                  {/* Shipping address */}
                  {o.shippingDetails && (
                    <div className="text-[10px] text-[#8E8E93]">
                      <p className="tracking-[0.1em] uppercase mb-1">Ship To</p>
                      <p className="text-[#E5E5E5]">{o.shippingDetails.fullName}</p>
                      <p>{o.shippingDetails.street}, {o.shippingDetails.postalCode} {o.shippingDetails.city}, {o.shippingDetails.country}</p>
                    </div>
                  )}

                  {/* Payment method + status */}
                  {o.paymentMethod && (
                    <div className="text-[10px] text-[#8E8E93]">
                      Payment: <span className="text-[#E5E5E5] capitalize">{o.paymentMethod.replace('_', ' ')}</span>
                      {o.paymentStatus === 'Awaiting Confirmation' && (
                        <span className="ml-2 text-amber-400 font-medium">⚠ Buyer sent payment — verify funds</span>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}