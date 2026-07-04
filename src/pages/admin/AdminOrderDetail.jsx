import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { formatPrice } from '@/lib/constants';
import { useToast } from '@/components/ui/use-toast';
import EscrowStatusBadge from '@/components/escrow/EscrowStatusBadge';
import EscrowTimeline from '@/components/escrow/EscrowTimeline';
import { ESCROW_STATUS_LABELS, ESCROW_STATUS_DESCRIPTIONS } from '@/lib/escrowConstants';
import { ArrowLeft, Truck, FileCheck2, ExternalLink, Send, ShieldCheck, Package, CreditCard, Bitcoin, Building2 } from 'lucide-react';

const PAYMENT_ICONS = { bank_transfer: Building2, crypto: Bitcoin };

export default function AdminOrderDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const [order, setOrder] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msgSubject, setMsgSubject] = useState('');
  const [msgBody, setMsgBody] = useState('');
  const [sendingMsg, setSendingMsg] = useState(false);
  const [trackingInput, setTrackingInput] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    Promise.all([
      base44.entities.Orders.get(id),
      base44.entities.OrderMessage.filter({ orderId: id }, '-created_date', 100).catch(() => [])
    ]).then(([o, msgs]) => {
      setOrder(o);
      setMessages(msgs);
      setTrackingInput(o.trackingNumber || '');
    }).catch(console.error).finally(() => setLoading(false));
  }, [id]);

  const refreshOrder = async () => {
    const o = await base44.entities.Orders.get(id);
    setOrder(o);
  };

  const updateEscrow = async (newEscrowStatus) => {
    setUpdatingStatus(true);
    try {
      const orderStatus = newEscrowStatus === 'funds_released' ? 'Delivered' : newEscrowStatus === 'shipped' ? 'Shipped' : newEscrowStatus === 'cancelled' ? 'Cancelled' : 'Processing';
      const paymentStatus = ['funds_secured', 'shipped', 'verified', 'funds_released'].includes(newEscrowStatus) ? 'Paid' : 'Pending';
      const shippingStatus = newEscrowStatus === 'shipped' ? 'Shipped' : newEscrowStatus === 'verified' || newEscrowStatus === 'funds_released' ? 'Delivered' : 'Pending';
      const res = await base44.functions.invoke('processOrder', {
        action: 'update_escrow', orderId: id, escrowStatus: newEscrowStatus, orderStatus, paymentStatus, shippingStatus
      });
      setOrder(res.data.order);
      toast({ title: `Escrow status updated to ${ESCROW_STATUS_LABELS[newEscrowStatus]}` });
    } catch (e) {
      toast({ title: 'Error', description: e.response?.data?.error || e.message, variant: 'destructive' });
    } finally {
      setUpdatingStatus(false);
    }
  };

  const saveTracking = async () => {
    if (!trackingInput.trim()) return;
    try {
      await base44.functions.invoke('processOrder', { action: 'update_escrow', orderId: id, trackingNumber: trackingInput.trim() });
      setOrder(prev => ({ ...prev, trackingNumber: trackingInput.trim() }));
      toast({ title: 'Tracking number updated' });
    } catch (e) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    }
  };

  const sendMessage = async () => {
    if (!msgBody.trim()) {
      toast({ title: 'Error', description: 'Message is required', variant: 'destructive' });
      return;
    }
    setSendingMsg(true);
    try {
      const res = await base44.functions.invoke('processOrder', {
        action: 'admin_reply',
        orderId: id,
        subject: msgSubject.trim(),
        message: msgBody.trim()
      });
      setMessages(prev => [res.data.message, ...prev]);
      setMsgSubject(''); setMsgBody('');
      toast({ title: 'Message sent to buyer' });
    } catch (e) {
      toast({ title: 'Error', description: e.response?.data?.error || e.message, variant: 'destructive' });
    } finally {
      setSendingMsg(false);
    }
  };

  const markMessagesRead = () => {
    const unreadIds = messages.filter(m => m.sender === 'buyer' && !m.isRead).map(m => m.id);
    unreadIds.forEach(async mid => {
      try { await base44.entities.OrderMessage.update(mid, { isRead: true }); } catch (e) {}
    });
    setMessages(prev => prev.map(m => unreadIds.includes(m.id) ? { ...m, isRead: true } : m));
  };

  if (loading) return <div className="space-y-3">{[...Array(6)].map((_, i) => <div key={i} className="h-16 bg-[#111] animate-pulse" />)}</div>;
  if (!order) return <div className="text-center py-16"><p className="text-[#8E8E93] text-sm">Order not found.</p></div>;

  const PaymentIcon = order.paymentMethod ? PAYMENT_ICONS[order.paymentMethod] : null;

  return (
    <div>
      <Link to="/admin/orders" className="inline-flex items-center gap-1 text-[10px] tracking-[0.1em] uppercase text-[#8E8E93] hover:text-[#E5E5E5] mb-4">
        <ArrowLeft size={10} /> Back to Orders
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-xl font-display text-[#E5E5E5] font-light">{order.customerName}</h1>
          <p className="text-[10px] text-[#8E8E93]">{order.customerEmail}</p>
          <p className="text-[10px] text-[#8E8E93] font-mono mt-0.5">{order.escrowReference}</p>
        </div>
        <EscrowStatusBadge status={order.escrowStatus} size="lg" />
      </div>

      {/* Timeline */}
      <div className="bg-[#111] border border-white/5 p-5 mb-6 overflow-x-auto">
        <EscrowTimeline currentStatus={order.escrowStatus} />
      </div>

      {/* Status description */}
      <div className="bg-[#C5A367]/5 border border-[#C5A367]/20 p-4 mb-6 flex items-start gap-3">
        <ShieldCheck size={18} className="text-[#C5A367] flex-shrink-0 mt-0.5" />
        <p className="text-xs text-[#E5E5E5]">{ESCROW_STATUS_DESCRIPTIONS[order.escrowStatus]}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Left: Order items + payment */}
        <div className="space-y-4">
          {/* Items */}
          <div className="border border-white/5 bg-[#111] p-5">
            <h2 className="text-[10px] tracking-[0.2em] uppercase text-[#8E8E93] mb-3 flex items-center gap-1.5"><Package size={11} /> Order Items</h2>
            {order.products?.map((p, i) => (
              <div key={i} className="flex gap-3">
                {p.featuredImage && <img src={p.featuredImage} alt="" className="w-16 h-16 object-cover" />}
                <div className="flex-1">
                  <p className="text-[10px] tracking-[0.1em] uppercase text-[#C5A367]">{p.brand}</p>
                  <p className="text-xs text-[#E5E5E5]">{p.productTitle}</p>
                  <p className="text-[10px] text-[#8E8E93]">{p.condition}</p>
                  <p className="text-sm text-[#E5E5E5] mt-1">{formatPrice(p.price)}</p>
                </div>
              </div>
            ))}
            <div className="border-t border-white/5 mt-4 pt-3 space-y-1">
              <div className="flex justify-between text-xs"><span className="text-[#8E8E93]">Subtotal</span><span className="text-[#E5E5E5]">{formatPrice(order.totalAmount)}</span></div>
              <div className="flex justify-between text-xs"><span className="text-[#8E8E93]">Insured Shipping</span><span className="text-[#E5E5E5]">Free</span></div>
              <div className="flex justify-between text-sm font-medium pt-2 border-t border-white/5"><span className="text-[#E5E5E5]">Total</span><span className="text-[#C5A367]">{formatPrice(order.totalAmount)}</span></div>
            </div>
          </div>

          {/* Payment info */}
          <div className="border border-white/5 bg-[#111] p-5">
            <h2 className="text-[10px] tracking-[0.2em] uppercase text-[#8E8E93] mb-3 flex items-center gap-1.5"><CreditCard size={11} /> Payment</h2>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-[#8E8E93]">Method</span><span className="text-[#E5E5E5] capitalize">{order.paymentMethod ? order.paymentMethod.replace('_', ' ') : 'Not selected'}</span></div>
              <div className="flex justify-between"><span className="text-[#8E8E93]">Status</span><span className="text-[#E5E5E5]">{order.paymentStatus}</span></div>
              {order.paymentProofUrl && (
                <div className="pt-2">
                  <p className="text-[10px] tracking-[0.1em] uppercase text-[#8E8E93] mb-1.5 flex items-center gap-1"><FileCheck2 size={10} /> Proof of Payment</p>
                  {order.paymentProofUrl.match(/\.(jpg|jpeg|png|webp|gif)$/i) ? (
                    <a href={order.paymentProofUrl} target="_blank" rel="noopener noreferrer" className="inline-block">
                      <img src={order.paymentProofUrl} alt="Payment proof" className="w-24 h-24 object-cover border border-white/10 hover:border-[#C5A367] transition-colors" />
                    </a>
                  ) : (
                    <a href={order.paymentProofUrl} target="_blank" rel="noopener noreferrer" className="text-[#C5A367] hover:underline flex items-center gap-1">
                      <ExternalLink size={10} /> View proof document
                    </a>
                  )}
                </div>
              )}
              {order.justificationMessage && (
                <div className="mt-2 p-3 bg-amber-950/30 border border-amber-700/30 text-amber-300 text-[10px]">
                  <p className="font-medium mb-1">Justification Requested:</p>
                  <p className="whitespace-pre-wrap">{order.justificationMessage}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Controls + shipping */}
        <div className="space-y-4">
          {/* Escrow controls */}
          <div className="border border-white/5 bg-[#111] p-5">
            <h2 className="text-[10px] tracking-[0.2em] uppercase text-[#8E8E93] mb-3">Escrow Management</h2>
            <p className="text-[10px] text-[#8E8E93] mb-2">Current: <span className="text-[#E5E5E5]">{ESCROW_STATUS_LABELS[order.escrowStatus]}</span></p>
            <div className="space-y-2">
              {order.escrowStatus === 'pending_review' && (
                <button onClick={() => updateEscrow('dealer_accepted')} disabled={updatingStatus} className="w-full bg-blue-600/20 border border-blue-600/40 text-blue-400 text-[10px] tracking-[0.1em] uppercase py-2 hover:bg-blue-600/30 disabled:opacity-50">
                  {updatingStatus ? 'Updating...' : 'Confirm Dealer Accepted'}
                </button>
              )}
              {order.escrowStatus === 'dealer_accepted' && (
                <button onClick={() => updateEscrow('funds_secured')} disabled={updatingStatus} className="w-full bg-emerald-600/20 border border-emerald-600/40 text-emerald-400 text-[10px] tracking-[0.1em] uppercase py-2 hover:bg-emerald-600/30 disabled:opacity-50">
                  {updatingStatus ? 'Updating...' : 'Confirm Payment Received'}
                </button>
              )}
              {order.escrowStatus === 'funds_secured' && (
                <div>
                  <p className="text-[10px] text-[#8E8E93] mb-2">Enter tracking number, then mark as shipped:</p>
                  <div className="flex gap-2 mb-2">
                    <input value={trackingInput} onChange={e => setTrackingInput(e.target.value)} placeholder="Tracking number..." className="flex-1 bg-[#0A0A0B] border border-white/10 text-[10px] text-[#E5E5E5] px-2 py-1.5 outline-none focus:border-[#C5A367]" />
                    <button onClick={saveTracking} className="bg-white/5 border border-white/10 text-[#8E8E93] text-[10px] px-3 hover:text-[#E5E5E5]">Save</button>
                  </div>
                  <button onClick={() => updateEscrow('shipped')} disabled={updatingStatus || !trackingInput.trim()} className="w-full bg-purple-600/20 border border-purple-600/40 text-purple-400 text-[10px] tracking-[0.1em] uppercase py-2 hover:bg-purple-600/30 disabled:opacity-50">
                    {updatingStatus ? 'Updating...' : 'Mark as Shipped'}
                  </button>
                </div>
              )}
              {order.escrowStatus === 'shipped' && (
                <p className="text-[10px] text-[#8E8E93] py-2 text-center">Awaiting buyer to confirm delivery.</p>
              )}
              {order.escrowStatus === 'verified' && (
                <div className="text-[10px] text-[#8E8E93] py-2 text-center">
                  <p>Delivery confirmed by buyer.</p>
                  <p className="mt-1 text-[#C5A367]">Funds auto-release 14 days after delivery confirmation.</p>
                  {order.deliveryConfirmedAt && (
                    <p className="mt-1 text-[#8E8E93]">Confirmed: {new Date(order.deliveryConfirmedAt).toLocaleDateString()}</p>
                  )}
                </div>
              )}
              {order.escrowStatus === 'funds_released' && (
                <p className="text-[10px] text-emerald-400 py-2 text-center">Funds released to dealer. Transaction complete.</p>
              )}
              {['pending_review', 'dealer_accepted'].includes(order.escrowStatus) && (
                <button onClick={() => updateEscrow('cancelled')} disabled={updatingStatus} className="w-full bg-red-600/10 border border-red-600/30 text-red-500 text-[10px] tracking-[0.1em] uppercase py-2 hover:bg-red-600/20 disabled:opacity-50 mt-2">
                  Cancel Order
                </button>
              )}
            </div>
          </div>

          {/* Shipping address */}
          <div className="border border-white/5 bg-[#111] p-5">
            <h2 className="text-[10px] tracking-[0.2em] uppercase text-[#8E8E93] mb-3">Shipping Address</h2>
            {order.shippingDetails ? (
              <div className="text-xs text-[#E5E5E5] space-y-0.5">
                <p>{order.shippingDetails.fullName}</p>
                <p>{order.shippingDetails.street}</p>
                <p>{order.shippingDetails.postalCode} {order.shippingDetails.city}</p>
                <p>{order.shippingDetails.country}</p>
                {order.shippingDetails.phone && <p className="text-[#8E8E93] pt-1">{order.shippingDetails.phone}</p>}
              </div>
            ) : <p className="text-xs text-[#8E8E93]">{order.shippingAddress || 'N/A'}</p>}
            {order.trackingNumber && (
              <div className="mt-3 pt-3 border-t border-white/5">
                <p className="text-[10px] tracking-[0.1em] uppercase text-[#8E8E93] mb-1 flex items-center gap-1"><Truck size={10} /> Tracking</p>
                <p className="text-xs text-[#E5E5E5] font-mono">{order.trackingNumber}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Message buyer */}
      <div className="border border-white/5 bg-[#111] p-5 mb-6">
        <h2 className="text-[10px] tracking-[0.2em] uppercase text-[#C5A367] mb-3 flex items-center gap-1.5"><Send size={11} /> Message Buyer</h2>
        <input
          value={msgSubject}
          onChange={e => setMsgSubject(e.target.value)}
          placeholder="Subject (optional)..."
          className="w-full bg-[#0A0A0B] border border-white/10 text-[10px] text-[#E5E5E5] px-2 py-1.5 mb-2 outline-none focus:border-[#C5A367]"
        />
        <textarea
          value={msgBody}
          onChange={e => setMsgBody(e.target.value)}
          placeholder="Type a message to the buyer... (will be emailed and appear in their Mails tab)"
          rows={3}
          className="w-full bg-[#0A0A0B] border border-white/10 text-[10px] text-[#E5E5E5] px-2 py-1.5 mb-2 outline-none focus:border-[#C5A367] resize-none"
        />
        <button
          onClick={sendMessage}
          disabled={sendingMsg || !msgBody.trim()}
          className="flex items-center gap-2 bg-[#C5A367] text-black text-[10px] tracking-[0.1em] uppercase font-medium px-4 py-2 disabled:opacity-50 hover:bg-[#C5A367]/90"
        >
          <Send size={11} />
          {sendingMsg ? 'Sending...' : 'Send Message to Buyer'}
        </button>
      </div>

      {/* Conversation thread */}
      {messages.length > 0 && (
        <div className="border border-white/5 bg-[#0E0E0F] p-5" onClick={markMessagesRead}>
          <h2 className="text-[10px] tracking-[0.2em] uppercase text-[#8E8E93] mb-3">Conversation</h2>
          <div className="space-y-3">
            {[...messages].reverse().map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] border p-3 ${msg.sender === 'buyer' ? 'border-amber-600/30 bg-amber-950/20' : 'border-[#C5A367]/20 bg-[#C5A367]/5'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-[10px] font-medium text-[#E5E5E5]">{msg.sender === 'admin' ? 'You (Admin)' : order.customerName}</p>
                    {msg.sender === 'admin' && <ShieldCheck size={10} className="text-[#C5A367]" />}
                    <p className="text-[9px] text-[#8E8E93]">{new Date(msg.created_date).toLocaleString()}</p>
                  </div>
                  {msg.subject && <p className="text-[10px] text-[#8E8E93] mb-1">Re: {msg.subject}</p>}
                  <p className="text-xs text-[#E5E5E5] whitespace-pre-wrap">{msg.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}