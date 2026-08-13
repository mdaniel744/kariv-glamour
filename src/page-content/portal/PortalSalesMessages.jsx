import React, { useState, useEffect } from 'react';
import { getMyDealerOrderMessages, sendDealerOrderMessage, markMyDealerOrderThreadRead, deleteDealerOrderMessage } from '@/actions/orders';
import { useAuth } from '@/lib/AuthContext';
import { Mail, ArrowLeft, Send, ShieldCheck, Package, Trash2 } from 'lucide-react';
import SafeHtml from '@/components/shared/SafeHtml';
import { stripHtmlToText } from '@/lib/sanitize';

export default function PortalSalesMessages() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!user) return;
    getMyDealerOrderMessages({ limit: 200 })
      .then(setMessages)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  // Group messages by orderId into conversation threads
  const threads = {};
  messages.forEach(m => {
    if (!threads[m.orderId]) {
      threads[m.orderId] = { orderId: m.orderId, orderReference: m.orderReference, messages: [] };
    }
    threads[m.orderId].messages.push(m);
  });
  // API returns newest-first; conversation view and "last message" preview
  // both need oldest-first (chat convention: newest at the bottom).
  Object.values(threads).forEach(t => t.messages.sort((a, b) => new Date(a.created_date) - new Date(b.created_date)));
  const threadList = Object.values(threads).sort((a, b) => {
    const aDate = new Date(a.messages[a.messages.length - 1].created_date).getTime();
    const bDate = new Date(b.messages[b.messages.length - 1].created_date).getTime();
    return bDate - aDate;
  });

  const selectedThread = selectedOrderId ? threads[selectedOrderId] : null;
  const unreadCount = messages.filter(m => m.sender === 'admin' && !m.isRead).length;

  const handleReply = async () => {
    if (!replyText.trim() || !selectedThread) return;
    setSending(true);
    try {
      const lastSubject = selectedThread.messages[selectedThread.messages.length - 1]?.subject || 'Re: Order';
      const replySubject = lastSubject.startsWith('Re:') ? lastSubject : 'Re: ' + lastSubject;
      const res = await sendDealerOrderMessage(selectedThread.orderId, replySubject, replyText.trim());
      if (res.ok) {
        setMessages(prev => [...prev, res.message]);
        setReplyText('');
      } else {
        alert(res.error);
      }
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async (messageId) => {
    if (!confirm('Delete this message? This cannot be undone.')) return;
    const res = await deleteDealerOrderMessage(messageId);
    if (res.ok) {
      setMessages(prev => prev.filter(m => m.id !== messageId));
    } else {
      alert(res.error);
    }
  };

  const openThread = (thread) => {
    setSelectedOrderId(thread.orderId);
    const hasUnread = thread.messages.some(m => m.sender === 'admin' && !m.isRead);
    if (hasUnread) {
      markMyDealerOrderThreadRead(thread.orderId).catch(() => {});
      setMessages(prev => prev.map(m => m.orderId === thread.orderId && m.sender === 'admin' ? { ...m, isRead: true } : m));
    }
  };

  if (loading) return <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-16 bg-card animate-pulse" />)}</div>;

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Mail size={18} className="text-primary" />
        <h1 className="text-xl font-display text-foreground font-light">Sales Messages</h1>
        {unreadCount > 0 && (
          <span className="ml-2 bg-primary text-primary-foreground text-[9px] font-bold px-2 py-0.5 rounded-full">{unreadCount} new</span>
        )}
      </div>

      {threadList.length === 0 ? (
        <div className="text-center py-16 border border-border">
          <Mail size={32} className="text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">No messages yet.</p>
          <p className="text-xs text-muted-foreground/70 mt-1">Messages from Kariv Glamour about your sales will appear here.</p>
        </div>
      ) : !selectedThread ? (
        <div className="space-y-2">
          {threadList.map(thread => {
            const lastMsg = thread.messages[thread.messages.length - 1];
            const hasUnread = thread.messages.some(m => m.sender === 'admin' && !m.isRead);
            return (
              <button
                key={thread.orderId}
                onClick={() => openThread(thread)}
                className={`w-full text-left border p-4 transition-colors ${hasUnread ? 'border-primary/40 bg-primary/5' : 'border-border hover:border-primary/20'}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Package size={12} className="text-muted-foreground flex-shrink-0" />
                      <p className="text-[10px] text-muted-foreground font-mono truncate">{thread.orderReference}</p>
                      {hasUnread && <span className="bg-primary text-primary-foreground text-[8px] font-bold px-1.5 py-0.5 rounded">NEW</span>}
                    </div>
                    <p className="text-xs text-foreground font-medium truncate">{lastMsg.subject}</p>
                    <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                      {lastMsg.sender === 'admin' ? 'Kariv Glamour' : 'You'}: {stripHtmlToText(lastMsg.body)}
                    </p>
                  </div>
                  <p className="text-[9px] text-muted-foreground flex-shrink-0">
                    {new Date(lastMsg.created_date).toLocaleDateString()}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div>
          <button onClick={() => setSelectedOrderId(null)} className="inline-flex items-center gap-1 text-[10px] tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft size={10} /> Back to Sales Messages
          </button>

          <div className="flex items-center gap-2 mb-4">
            <Package size={12} className="text-muted-foreground" />
            <p className="text-[10px] text-muted-foreground font-mono">{selectedThread.orderReference}</p>
          </div>

          {/* Conversation */}
          <div className="space-y-3 mb-6">
            {selectedThread.messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'dealer' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] border p-4 ${msg.sender === 'admin' ? 'border-primary/30 bg-primary/5' : 'border-border bg-card'}`}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <p className="text-[10px] font-medium text-foreground">
                      {msg.sender === 'admin' ? 'Kariv Glamour' : 'You'}
                    </p>
                    {msg.sender === 'admin' && <ShieldCheck size={10} className="text-primary" />}
                    <p className="text-[9px] text-muted-foreground">{new Date(msg.created_date).toLocaleString()}</p>
                    {msg.sender === 'dealer' && (
                      <button onClick={() => handleDelete(msg.id)} aria-label="Delete message" className="ml-auto text-muted-foreground hover:text-destructive transition-colors p-0.5">
                        <Trash2 size={11} />
                      </button>
                    )}
                  </div>
                  <p className="text-[11px] text-muted-foreground mb-1">{msg.subject}</p>
                  <SafeHtml as="div" html={msg.body} className="text-xs text-foreground whitespace-pre-wrap [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-border [&_td]:p-1.5 [&_th]:border [&_th]:border-border [&_th]:p-1.5 [&_img]:max-w-full [&_img]:h-auto" />
                </div>
              </div>
            ))}
          </div>

          {/* Reply box */}
          <div className="border border-border p-4">
            <p className="text-[10px] tracking-[0.1em] uppercase text-muted-foreground mb-2">Reply</p>
            <textarea
              value={replyText}
              onChange={e => setReplyText(e.target.value)}
              placeholder="Type your response..."
              rows={4}
              className="w-full bg-background border border-border text-xs text-foreground px-3 py-2 outline-none focus:border-primary resize-none"
            />
            <button
              onClick={handleReply}
              disabled={sending || !replyText.trim()}
              className="mt-2 flex items-center gap-2 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium px-5 py-2.5 disabled:opacity-50 hover:bg-primary/90 transition-colors"
            >
              <Send size={12} />
              {sending ? 'Sending...' : 'Send Reply'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
