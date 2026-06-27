import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { formatPrice } from '@/lib/constants';
import { useToast } from '@/components/ui/use-toast';

export default function AdminOrders() {
  const { toast } = useToast();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Orders.list('-created_date', 50).then(setOrders).catch(console.error).finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id, field, value) => {
    try {
      await base44.entities.Orders.update(id, { [field]: value });
      setOrders(prev => prev.map(o => o.id === id ? { ...o, [field]: value } : o));
      toast({ title: "Order updated" });
    } catch (e) { toast({ title: "Error", description: e.message, variant: "destructive" }); }
  };

  return (
    <div>
      <h1 className="text-xl font-display text-[#E5E5E5] font-light mb-6">Orders</h1>
      {loading ? (
        <div className="space-y-2">{[...Array(3)].map((_, i) => <div key={i} className="h-16 bg-[#111] animate-pulse" />)}</div>
      ) : orders.length === 0 ? (
        <div className="text-center py-16 border border-white/5"><p className="text-[#8E8E93] text-sm">No orders yet.</p></div>
      ) : (
        <div className="space-y-3">
          {orders.map(o => (
            <div key={o.id} className="bg-[#111] border border-white/5 p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs text-[#E5E5E5] font-medium">{o.customerName}</p>
                  <p className="text-[10px] text-[#8E8E93]">{o.customerEmail}</p>
                </div>
                <span className="text-sm text-[#C5A367] font-medium">{formatPrice(o.totalAmount)}</span>
              </div>
              <div className="flex gap-3 flex-wrap">
                {[
                  { field: 'orderStatus', options: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Refunded'] },
                  { field: 'paymentStatus', options: ['Pending', 'Paid', 'Failed', 'Refunded'] },
                  { field: 'shippingStatus', options: ['Pending', 'Shipped', 'In Transit', 'Delivered'] }
                ].map(s => (
                  <select
                    key={s.field}
                    value={o[s.field] || 'Pending'}
                    onChange={e => updateStatus(o.id, s.field, e.target.value)}
                    className="bg-[#0A0A0B] border border-white/10 text-[10px] text-[#E5E5E5] px-2 py-1 outline-none focus:border-[#C5A367]"
                  >
                    {s.options.map(op => <option key={op} value={op}>{s.field.replace('Status', '')}: {op}</option>)}
                  </select>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}