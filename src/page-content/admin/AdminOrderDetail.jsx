import SellerIdentity from '@/components/marketplace/SellerIdentity';
import React, { useState, useEffect } from 'react';
import {
  getAdminOrder, getAdminOrderMessages, getAdminOrderDispute,
  updateEscrowStatus, updateTrackingNumber, adminReplyToOrder,
  markAdminOrderThreadRead, confirmCourierDelivery as confirmCourierDeliveryAction,
  resolveDispute as resolveDisputeAction,
} from '@/actions/orders';
import { formatPrice } from '@/lib/constants';
import { useToast } from '@/components/ui/use-toast';
import EscrowStatusBadge from '@/components/escrow/EscrowStatusBadge';
import EscrowTimeline from '@/components/escrow/EscrowTimeline';
import { ESCROW_STATUS_LABELS, ESCROW_STATUS_DESCRIPTIONS } from '@/lib/escrowConstants';
import { ArrowLeft, Truck, FileCheck2, ExternalLink, Send, ShieldCheck, Package, CreditCard, Bitcoin, Building2, Flag, Gavel } from 'lucide-react';
import LocalizedLink from '@/components/LocalizedLink';
import SafeHtml from '@/components/shared/SafeHtml';

const PAYMENT_ICONS = { bank_transfer: Building2, crypto: Bitcoin };

export default function AdminOrderDetail({ id: providedId }) {
  const id = providedId || (typeof window !== 'undefined' ? window.location.pathname.split('/').filter(Boolean).at(-1) : null);
  const { toast } = useToast();
  const [order, setOrder] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msgSubject, setMsgSubject] = useState('');
  const [msgBody, setMsgBody] = useState('');
  const [sendingMsg, setSendingMsg] = useState(false);
  const [trackingInput, setTrackingInput] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [dispute, setDispute] = useState(null);
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [resolving, setResolving] = useState(false);

  useEffect(() => {
    Promise.all([
      getAdminOrder(id),
      getAdminOrderMessages(id).catch(() => []),
      getAdminOrderDispute(id).catch(() => null),
    ]).then(([o, msgs, d]) => {
      setOrder(o);
      setMessages(msgs);
      setTrackingInput(o?.trackingNumber || '');
      setDispute(d);
    }).catch(console.error).finally(() => setLoading(false));
  }, [id]);

  const refreshOrder = async () => {
    const o = await getAdminOrder(id);
    setOrder(o);
  };

  const updateEscrow = async (newEscrowStatus) => {
    setUpdatingStatus(true);
    try {
      const res = await updateEscrowStatus(id, newEscrowStatus);
      if (res.ok) {
        setOrder(res.order);
        toast({ title: `Escrow status updated to ${ESCROW_STATUS_LABELS[newEscrowStatus]}` });
      } else {
        toast({ title: 'Error', description: res.error, variant: 'destructive' });
      }
    } finally {
      setUpdatingStatus(false);
    }
  };

  const saveTracking = async () => {
    if (!trackingInput.trim()) return;
    const res = await updateTrackingNumber(id, trackingInput.trim());
    if (res.ok) {
      setOrder(res.order);
      toast({ title: 'Tracking number updated' });
    } else {
      toast({ title: 'Error', description: res.error, variant: 'destructive' });
    }
  };

  const sendMessage = async () => {
    if (!msgBody.trim()) {
      toast({ title: 'Error', description: 'Message is required', variant: 'destructive' });
      return;
    }
    setSendingMsg(true);
    try {
      const res = await adminReplyToOrder(id, msgSubject.trim(), msgBody.trim());
      if (res.ok) {
        setMessages(prev => [res.message, ...prev]);
        setMsgSubject(''); setMsgBody('');
        toast({ title: 'Message sent to buyer' });
      } else {
        toast({ title: 'Error', description: res.error, variant: 'destructive' });
      }
    } finally {
      setSendingMsg(false);
    }
  };

  const markMessagesRead = () => {
    if (!messages.some(m => m.sender === 'buyer' && !m.isRead)) return;
    markAdminOrderThreadRead(id).catch(() => {});
    setMessages(prev => prev.map(m => m.sender === 'buyer' ? { ...m, isRead: true } : m));
  };

  const confirmCourierDelivery = async () => {
    setUpdatingStatus(true);
    try {
      const res = await confirmCourierDeliveryAction(id);
      if (res.ok) {
        setOrder(res.order);
        toast({ title: 'Courier delivery confirmed — 14-day inspection period started' });
      } else {
        toast({ title: 'Error', description: res.error, variant: 'destructive' });
      }
    } finally {
      setUpdatingStatus(false);
    }
  };

  const resolveDispute = async (outcome) => {
    setResolving(true);
    try {
      const res = await resolveDisputeAction({ disputeId: dispute.id, outcome, mediatorNotes: resolutionNotes.trim() });
      if (res.ok) {
        const [d, o] = await Promise.all([getAdminOrderDispute(id), getAdminOrder(id)]);
        setDispute(d);
        setOrder(o);
        setResolutionNotes('');
        toast({ title: 'Dispute resolved' });
      } else {
        toast({ title: 'Error', description: res.error, variant: 'destructive' });
      }
    } finally {
      setResolving(false);
    }
  };

  if (loading) return <div className="space-y-3">{[...Array(6)].map((_, i) => <div key={i} className="h-16 bg-[#111] animate-pulse" />)}</div>;
  if (!order) return <div className="text-center py-16"><p className="text-[#8E8E93] text-sm">Order not found.</p></div>;

  const PaymentIcon = order.paymentMethod ? PAYMENT_ICONS[order.paymentMethod] : null;

  return (
    <div>
      <LocalizedLink to="/admin/orders" className="inline-flex items-center gap-1 text-[10px] tracking-[0.1em] uppercase text-[#8E8E93] hover:text-[#E5E5E5] mb-4">
        <ArrowLeft size={10} /> Back to Orders
      </LocalizedLink>

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
                  <SellerIdentity seller={p.sellerSnapshot} snapshot compact />
                  <p className="text-[10px] text-[#8E8E93]">{p.condition}</p>
                  <p className="text-sm text-[#E5E5E5] mt-1">{formatPrice(p.price, p.currency || order.currency || 'EUR')}</p>
                </div>
              </div>
            ))}
            <div className="border-t border-white/5 mt-4 pt-3 space-y-1">
              <div className="flex justify-between text-xs"><span className="text-[#8E8E93]">Subtotal</span><span className="text-[#E5E5E5]">{formatPrice(order.totalAmount, order.currency || 'EUR')}</span></div>
              <div className="flex justify-between text-xs"><span className="text-[#8E8E93]">Insured Shipping</span><span className="text-[#E5E5E5]">Free</span></div>
              <div className="flex justify-between text-sm font-medium pt-2 border-t border-white/5"><span className="text-[#E5E5E5]">Total</span><span className="text-[#C5A367]">{formatPrice(order.totalAmount, order.currency || 'EUR')}</span></div>
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
                <div>
                  <p className="text-[10px] text-[#8E8E93] mb-2 text-center">Courier confirmation pending.</p>
                  <button onClick={confirmCourierDelivery} disabled={updatingStatus} className="w-full bg-emerald-600/20 border border-emerald-600/40 text-emerald-400 text-[10px] tracking-[0.1em] uppercase py-2 hover:bg-emerald-600/30 disabled:opacity-50">
                    {updatingStatus ? 'Updating...' : 'Mark as Delivered (Courier Confirmed)'}
                  </button>
                </div>
              )}
              {order.escrowStatus === 'verified' && (
                <div className="text-[10px] text-[#8E8E93] py-2 text-center">
                  <p>Courier confirmed delivery.</p>
                  <p className="mt-1 text-[#C5A367]">Funds auto-release 14 days after delivery.</p>
                  {order.deliveryConfirmedAt && (
                    <p className="mt-1 text-[#8E8E93]">Confirmed: {new Date(order.deliveryConfirmedAt).toLocaleDateString()}</p>
                  )}
                  {dispute && ['open', 'under_review'].includes(dispute.status) && (
                    <p className="mt-1 text-amber-400 font-medium">⚠ Dispute open — escrow frozen</p>
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
          placeholder="Type a message to the buyer... (appears in their Mails tab)"
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

      {/* Dispute resolution */}
      {dispute && ['open', 'under_review'].includes(dispute.status) && (
        <div className="border border-amber-600/30 bg-amber-950/10 p-5 mb-6">
          <h2 className="text-[10px] tracking-[0.2em] uppercase text-amber-400 mb-3 flex items-center gap-1.5">
            <Gavel size={11} /> Dispute Case — Mediation Required
          </h2>
          <div className="space-y-2 text-xs mb-4">
            <div className="flex justify-between"><span className="text-[#8E8E93]">Reason</span><span className="text-[#E5E5E5] capitalize">{dispute.reason.replace(/_/g, ' ')}</span></div>
            <div className="flex justify-between"><span className="text-[#8E8E93]">Status</span><span className="text-amber-400 capitalize">{dispute.status.replace(/_/g, ' ')}</span></div>
            <div className="flex justify-between"><span className="text-[#8E8E93]">Filed</span><span className="text-[#E5E5E5]">{new Date(dispute.created_date).toLocaleString()}</span></div>
          </div>
          <div className="bg-[#0A0A0B] border border-white/5 p-3 mb-4">
            <p className="text-[10px] tracking-[0.1em] uppercase text-[#8E8E93] mb-1">Buyer's Description</p>
            <p className="text-xs text-[#E5E5E5] whitespace-pre-wrap">{dispute.description}</p>
          </div>
          <textarea
            value={resolutionNotes}
            onChange={e => setResolutionNotes(e.target.value)}
            placeholder="Mediator notes / resolution details..."
            rows={3}
            className="w-full bg-[#0A0A0B] border border-white/10 text-[10px] text-[#E5E5E5] px-2 py-1.5 mb-3 outline-none focus:border-amber-600 resize-none"
          />
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => resolveDispute('refund')}
              disabled={resolving}
              className="bg-red-600/20 border border-red-600/40 text-red-400 text-[10px] tracking-[0.1em] uppercase py-2 hover:bg-red-600/30 disabled:opacity-50"
            >
              {resolving ? 'Resolving...' : 'Resolve for Buyer (Refund)'}
            </button>
            <button
              onClick={() => resolveDispute('release_funds')}
              disabled={resolving}
              className="bg-emerald-600/20 border border-emerald-600/40 text-emerald-400 text-[10px] tracking-[0.1em] uppercase py-2 hover:bg-emerald-600/30 disabled:opacity-50"
            >
              {resolving ? 'Resolving...' : 'Resolve for Dealer (Release)'}
            </button>
          </div>
        </div>
      )}

      {/* Resolved dispute summary */}
      {dispute && !['open', 'under_review'].includes(dispute.status) && (
        <div className="border border-white/5 bg-[#111] p-5 mb-6">
          <h2 className="text-[10px] tracking-[0.2em] uppercase text-[#8E8E93] mb-3 flex items-center gap-1.5">
            <Flag size={11} /> Dispute Resolved
          </h2>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between"><span className="text-[#8E8E93]">Reason</span><span className="text-[#E5E5E5] capitalize">{dispute.reason.replace(/_/g, ' ')}</span></div>
            <div className="flex justify-between"><span className="text-[#8E8E93]">Outcome</span><span className="text-[#C5A367] capitalize">{dispute.status.replace(/_/g, ' ')}</span></div>
            {dispute.resolution && (
              <div className="pt-2 border-t border-white/5">
                <p className="text-[10px] tracking-[0.1em] uppercase text-[#8E8E93] mb-1">Resolution</p>
                <p className="text-[#E5E5E5]">{dispute.resolution}</p>
              </div>
            )}
          </div>
        </div>
      )}

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
                  <SafeHtml as="div" html={msg.body} className="text-xs text-[#E5E5E5] whitespace-pre-wrap [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-white/10 [&_td]:p-1.5 [&_th]:border [&_th]:border-white/10 [&_th]:p-1.5 [&_img]:max-w-full [&_img]:h-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
