import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { formatPrice } from '@/lib/constants';
import { useToast } from '@/components/ui/use-toast';
import EscrowStatusBadge from '@/components/escrow/EscrowStatusBadge';
import { ESCROW_STATUS_LABELS } from '@/lib/escrowConstants';
import { ChevronDown, Truck, FileCheck2, ExternalLink, Send } from 'lucide-react';

export default function AdminOrders() {
  const { toast } = useToast();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [justSubject, setJustSubject] = useState('');
  const [justMessage, setJustMessage] = useState('');
  const [sendingJust, setSendingJust] = useState(false);
  const [msgSubject, setMsgSubject] = useState('');
  const [msgBody, setMsgBody] = useState('');
  const [sendingMsg, setSendingMsg] = useState(false);

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

  const requestJustification = async (id) => {
    if (!justSubject.trim() || !justMessage.trim()) {
      toast({ title: 'Error', description: 'Subject and message are required', variant: 'destructive' });
      return;
    }
    setSendingJust(true);
    try {
      const res = await base44.functions.invoke('processOrder', {
        action: 'request_justification', orderId: id, subject: justSubject, message: justMessage
      });
      setOrders(prev => prev.map(o => o.id === id ? { ...o, paymentStatus: 'Justification Requested', justificationMessage: justMessage } : o));
      setJustSubject(''); setJustMessage('');
      toast({ title: 'Justification request emailed to buyer' });
    } catch (e) {
      toast({ title: 'Error', description: e.response?.data?.error || e.message, variant: 'destructive' });
    } finally {
      setSendingJust(false);
    }
  };

  const sendMessage = async (id) => {
    if (!msgBody.trim()) {
      toast({ title: 'Error', description: 'Message is required', variant: 'destructive' });
      return;
    }
    setSendingMsg(true);
    try {
      await base44.functions.invoke('processOrder', {
        action: 'admin_reply',
        orderId: id,
        subject: msgSubject.trim(),
        message: msgBody.trim()
      });
      setMsgSubject(''); setMsgBody('');
      toast({ title: 'Message sent to buyer' });
    } catch (e) {
      toast({ title: 'Error', description: e.response?.data?.error || e.message, variant: 'destructive' });
    } finally {
      setSendingMsg(false);
    }
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
                  <Link to={`/admin/orders/${o.id}`} className="flex items-center gap-3 group">
                    {o.products?.[0]?.featuredImage && <img src={o.products[0].featuredImage} alt="" className="w-12 h-12 object-cover" />}
                    <div>
                      <p className="text-xs text-[#E5E5E5] font-medium group-hover:text-[#C5A367] transition-colors flex items-center gap-1">
                        {o.customerName}
                        <ExternalLink size={9} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </p>
                      <p className="text-[10px] text-[#8E8E93]">{o.customerEmail}</p>
                      <p className="text-[10px] text-[#8E8E93] font-mono">{o.escrowReference}</p>
                    </div>
                  </Link>
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

                  {/* Payment proof */}
                  {o.paymentProofUrl && (
                    <div className="text-[10px] text-[#8E8E93]">
                      <p className="tracking-[0.1em] uppercase mb-1 flex items-center gap-1"><FileCheck2 size={10} /> Proof of Payment</p>
                      {o.paymentProofUrl.match(/\.(jpg|jpeg|png|webp|gif)$/i) ? (
                        <a href={o.paymentProofUrl} target="_blank" rel="noopener noreferrer" className="inline-block">
                          <img src={o.paymentProofUrl} alt="Payment proof" className="w-24 h-24 object-cover border border-white/10 hover:border-[#C5A367] transition-colors" />
                        </a>
                      ) : (
                        <a href={o.paymentProofUrl} target="_blank" rel="noopener noreferrer" className="text-[#C5A367] hover:underline flex items-center gap-1">
                          <ExternalLink size={10} /> View proof document
                        </a>
                      )}
                    </div>
                  )}

                  {/* Message buyer — always available */}
                  <div className="border-t border-white/5 pt-3">
                    <p className="text-[10px] tracking-[0.1em] uppercase text-[#C5A367] mb-1.5 flex items-center gap-1"><Send size={10} /> Message Buyer</p>
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
                      onClick={() => sendMessage(o.id)}
                      disabled={sendingMsg || !msgBody.trim()}
                      className="w-full bg-[#C5A367]/10 border border-[#C5A367]/30 text-[#C5A367] text-[10px] tracking-[0.1em] uppercase py-2 hover:bg-[#C5A367]/20 disabled:opacity-50"
                    >
                      {sendingMsg ? 'Sending...' : 'Send Message to Buyer'}
                    </button>
                  </div>

                  {/* Justification already requested */}
                  {o.paymentStatus === 'Justification Requested' && (
                    <div className="text-[10px] text-amber-400 font-medium">
                      ⚠ Justification requested — buyer notified by email
                    </div>
                  )}

                  {/* Request justification form */}
                  {o.paymentStatus === 'Awaiting Confirmation' && (
                    <div className="border-t border-white/5 pt-3">
                      <p className="text-[10px] tracking-[0.1em] uppercase text-amber-400 mb-1.5">Request Further Justification</p>
                      <input
                        value={justSubject}
                        onChange={e => setJustSubject(e.target.value)}
                        placeholder="Email subject..."
                        className="w-full bg-[#0A0A0B] border border-white/10 text-[10px] text-[#E5E5E5] px-2 py-1.5 mb-2 outline-none focus:border-[#C5A367]"
                      />
                      <textarea
                        value={justMessage}
                        onChange={e => setJustMessage(e.target.value)}
                        placeholder="Message to buyer (e.g. proof is unreadable, please re-upload a clearer image)..."
                        rows={3}
                        className="w-full bg-[#0A0A0B] border border-white/10 text-[10px] text-[#E5E5E5] px-2 py-1.5 mb-2 outline-none focus:border-[#C5A367] resize-none"
                      />
                      <button
                        onClick={() => requestJustification(o.id)}
                        disabled={sendingJust}
                        className="w-full bg-amber-600/20 border border-amber-600/40 text-amber-400 text-[10px] tracking-[0.1em] uppercase py-2 hover:bg-amber-600/30 disabled:opacity-50"
                      >
                        {sendingJust ? 'Sending...' : 'Send Email to Buyer'}
                      </button>
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