import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useToast } from '@/components/ui/use-toast';
import { Users, Mail, ArrowLeft, Send, ShieldCheck, Package } from 'lucide-react';

export default function AdminCustomers() {
  const { toast } = useToast();
  const [customers, setCustomers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBuyerId, setSelectedBuyerId] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    Promise.all([
      base44.entities.Customers.list('-created_date', 50).then(asArray).catch(() => []),
      base44.entities.OrderMessage.list('-created_date', 200).then(asArray).catch(() => [])
    ]).then(([custs, msgs]) => {
      setCustomers(custs);
      setMessages(msgs);
    }).finally(() => setLoading(false));
  }, []);

  // Group messages by buyerId
  const buyerThreads = {};
  messages.forEach(m => {
    if (!buyerThreads[m.buyerId]) {
      buyerThreads[m.buyerId] = {
        buyerId: m.buyerId,
        buyerEmail: m.buyerEmail,
        buyerName: m.buyerName,
        threads: {}
      };
    }
    const buyer = buyerThreads[m.buyerId];
    if (!buyer.threads[m.orderId]) {
      buyer.threads[m.orderId] = { orderId: m.orderId, orderReference: m.orderReference, messages: [] };
    }
    buyer.threads[m.orderId].messages.push(m);
  });

  // Merge customers with mail threads
  const customerList = customers.map(c => ({
    ...c,
    hasMail: !!buyerThreads[c.userId],
    threadData: buyerThreads[c.userId] || null
  }));

  // Add buyers who have mail threads but no customer record
  Object.values(buyerThreads).forEach(bt => {
    if (!customerList.find(c => c.userId === bt.buyerId)) {
      customerList.push({
        id: bt.buyerId,
        userId: bt.buyerId,
        fullName: bt.buyerName,
        email: bt.buyerEmail,
        phone: '',
        hasMail: true,
        threadData: bt
      });
    }
  });

  const customersWithMail = customerList.filter(c => c.hasMail);
  const customersWithoutMail = customerList.filter(c => !c.hasMail);

  const selectedCustomer = selectedBuyerId ? customersWithMail.find(c => c.userId === selectedBuyerId) : null;
  const selectedThreads = selectedCustomer?.threadData ? Object.values(selectedCustomer.threadData.threads) : [];

  const unreadForCustomer = (buyerId) => {
    const bt = buyerThreads[buyerId];
    if (!bt) return 0;
    return Object.values(bt.threads).reduce((sum, t) => sum + t.messages.filter(m => m.sender === 'buyer' && !m.isRead).length, 0);
  };

  const totalUnread = Object.values(buyerThreads).reduce((sum, bt) =>
    sum + Object.values(bt.threads).reduce((s, t) => s + t.messages.filter(m => m.sender === 'buyer' && !m.isRead).length, 0), 0);

  const handleAdminReply = async (orderId) => {
    if (!replyText.trim()) return;
    setSending(true);
    try {
      const res = await base44.functions.invoke('processOrder', {
        action: 'admin_reply',
        orderId,
        message: replyText.trim()
      });
      setMessages(prev => [...prev, res.data.message]);
      setReplyText('');
      toast({ title: 'Reply sent to buyer' });
    } catch (e) {
      toast({ title: 'Error', description: e.response?.data?.error || e.message, variant: 'destructive' });
    } finally {
      setSending(false);
    }
  };

  const markThreadAsRead = (thread) => {
    const unreadIds = thread.messages.filter(m => m.sender === 'buyer' && !m.isRead).map(m => m.id);
    unreadIds.forEach(async id => {
      try { await base44.entities.OrderMessage.update(id, { isRead: true }); } catch (e) {}
    });
    setMessages(prev => prev.map(m => unreadIds.includes(m.id) ? { ...m, isRead: true } : m));
  };

  if (loading) return <div className="space-y-2">{[...Array(3)].map((_, i) => <div key={i} className="h-14 bg-[#111] animate-pulse" />)}</div>;

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Users size={18} className="text-[#C5A367]" />
        <h1 className="text-xl font-display text-[#E5E5E5] font-light">Customers</h1>
        {totalUnread > 0 && (
          <span className="ml-2 bg-amber-500 text-black text-[9px] font-bold px-2 py-0.5 rounded-full">{totalUnread} unread</span>
        )}
      </div>

      {!selectedCustomer ? (
        <>
          {/* Customers with active mail threads */}
          {customersWithMail.length > 0 && (
            <div className="mb-6">
              <p className="text-[10px] tracking-[0.15em] uppercase text-[#8E8E93] mb-3 flex items-center gap-1.5">
                <Mail size={11} /> Active Conversations
              </p>
              <div className="space-y-2">
                {customersWithMail.map(c => {
                  const unread = unreadForCustomer(c.userId);
                  return (
                    <button
                      key={c.userId || c.id}
                      onClick={() => setSelectedBuyerId(c.userId)}
                      className={`w-full text-left bg-[#111] border p-3 transition-colors ${unread > 0 ? 'border-amber-600/40' : 'border-white/5 hover:border-white/15'}`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-xs text-[#E5E5E5] font-medium">{c.fullName}</p>
                            {unread > 0 && <span className="bg-amber-500 text-black text-[8px] font-bold px-1.5 py-0.5 rounded">{unread}</span>}
                          </div>
                          <p className="text-[10px] text-[#8E8E93]">{c.email}</p>
                        </div>
                        <Mail size={14} className={unread > 0 ? 'text-amber-400' : 'text-[#8E8E93]'} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* All other customers */}
          {customersWithoutMail.length > 0 && (
            <div>
              <p className="text-[10px] tracking-[0.15em] uppercase text-[#8E8E93] mb-3">All Customers</p>
              <div className="space-y-2">
                {customersWithoutMail.map(c => (
                  <div key={c.id} className="flex items-center justify-between bg-[#111] border border-white/5 p-3">
                    <div>
                      <p className="text-xs text-[#E5E5E5]">{c.fullName}</p>
                      <p className="text-[10px] text-[#8E8E93]">{c.email}</p>
                    </div>
                    <p className="text-[10px] text-[#8E8E93]">{c.phone || '—'}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {customersWithMail.length === 0 && customersWithoutMail.length === 0 && (
            <div className="text-center py-16 border border-white/5"><p className="text-[#8E8E93] text-sm">No customers yet.</p></div>
          )}
        </>
      ) : (
        <div>
          <button onClick={() => setSelectedBuyerId(null)} className="inline-flex items-center gap-1 text-[10px] tracking-[0.1em] uppercase text-[#8E8E93] hover:text-[#E5E5E5] mb-4">
            <ArrowLeft size={10} /> Back to Customers
          </button>

          <div className="mb-6">
            <p className="text-sm text-[#E5E5E5] font-medium">{selectedCustomer.fullName}</p>
            <p className="text-[10px] text-[#8E8E93]">{selectedCustomer.email}</p>
          </div>

          {/* Order conversation threads */}
          <div className="space-y-6">
            {selectedThreads.map(thread => {
              const hasUnread = thread.messages.some(m => m.sender === 'buyer' && !m.isRead);
              const lastMsg = thread.messages[thread.messages.length - 1];
              return (
                <div key={thread.orderId} className="border border-white/5 bg-[#0E0E0F]">
                  <div className="border-b border-white/5 p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Package size={12} className="text-[#8E8E93]" />
                      <p className="text-[10px] text-[#8E8E93] font-mono">{thread.orderReference}</p>
                      {hasUnread && <span className="bg-amber-500 text-black text-[8px] font-bold px-1.5 py-0.5 rounded">UNREAD</span>}
                    </div>
                    <p className="text-[9px] text-[#8E8E93]">{new Date(lastMsg.created_date).toLocaleDateString()}</p>
                  </div>

                  <div className="p-4 space-y-3" onClick={() => markThreadAsRead(thread)}>
                    {thread.messages.map(msg => (
                      <div key={msg.id} className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] border p-3 ${msg.sender === 'buyer' ? 'border-amber-600/30 bg-amber-950/20' : 'border-[#C5A367]/20 bg-[#C5A367]/5'}`}>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-[10px] font-medium text-[#E5E5E5]">
                              {msg.sender === 'admin' ? 'You (Escrow)' : selectedCustomer.fullName}
                            </p>
                            {msg.sender === 'admin' && <ShieldCheck size={10} className="text-[#C5A367]" />}
                            <p className="text-[9px] text-[#8E8E93]">{new Date(msg.created_date).toLocaleString()}</p>
                          </div>
                          <p className="text-xs text-[#E5E5E5] whitespace-pre-wrap">{msg.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Admin reply box */}
                  <div className="border-t border-white/5 p-3">
                    <textarea
                      value={replyText}
                      onChange={e => setReplyText(e.target.value)}
                      placeholder="Reply to buyer... (will be emailed)"
                      rows={3}
                      className="w-full bg-[#0A0A0B] border border-white/10 text-[10px] text-[#E5E5E5] px-2 py-1.5 outline-none focus:border-[#C5A367] resize-none mb-2"
                    />
                    <button
                      onClick={() => handleAdminReply(thread.orderId)}
                      disabled={sending || !replyText.trim()}
                      className="flex items-center gap-2 bg-[#C5A367] text-black text-[10px] tracking-[0.1em] uppercase font-medium px-4 py-2 disabled:opacity-50 hover:bg-[#C5A367]/90"
                    >
                      <Send size={11} />
                      {sending ? 'Sending...' : 'Send Reply'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}