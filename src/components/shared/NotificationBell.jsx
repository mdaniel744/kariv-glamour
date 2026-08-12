'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Bell } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '@/lib/AuthContext';
import { useLanguage } from '@/lib/languageContext';
import { getMyNotifications, markNotificationRead, markAllNotificationsRead } from '@/actions/notifications';
import { enablePushNotifications, getNotificationPermission } from '@/lib/pushNotifications';

const POLL_INTERVAL_MS = 45000;

export default function NotificationBell() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const { localePath } = useLanguage();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [permission, setPermission] = useState('default');
  const [enabling, setEnabling] = useState(false);
  const ref = useRef(null);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const load = useCallback(() => {
    if (!isAuthenticated) return;
    getMyNotifications().then(setNotifications).catch(() => {});
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return undefined;
    setPermission(getNotificationPermission());
    load();
    const interval = setInterval(load, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [isAuthenticated, load]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (open && ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  if (!isAuthenticated) return null;

  const handleEnable = async () => {
    setEnabling(true);
    const res = await enablePushNotifications();
    setEnabling(false);
    setPermission(getNotificationPermission());
    if (!res.ok) console.error(res.error);
  };

  const handleItemClick = async (notification) => {
    setOpen(false);
    if (!notification.isRead) {
      setNotifications((prev) => prev.map((n) => (n.id === notification.id ? { ...n, isRead: true } : n)));
      markNotificationRead(notification.id).catch(() => {});
    }
    if (notification.linkPath) router.push(localePath(notification.linkPath));
  };

  const handleMarkAllRead = async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    await markAllNotificationsRead().catch(() => {});
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="relative flex h-9 w-9 items-center justify-center text-foreground transition-colors hover:text-primary"
        aria-label="Notifications"
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-3 w-80 max-h-[70vh] overflow-y-auto bg-popover border border-border rounded shadow-lg z-50"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground">Notifications</p>
              {unreadCount > 0 && (
                <button onClick={handleMarkAllRead} className="text-[10px] tracking-[0.1em] uppercase text-primary hover:text-primary/70">
                  Mark all read
                </button>
              )}
            </div>

            {permission !== 'granted' && (
              <div className="px-4 py-3 border-b border-border bg-muted/40">
                <p className="text-xs text-foreground mb-2">Get notified when your order status changes.</p>
                <button
                  onClick={handleEnable}
                  disabled={enabling}
                  className="text-[10px] tracking-[0.1em] uppercase bg-primary text-primary-foreground px-3 py-1.5 disabled:opacity-50"
                >
                  {enabling ? 'Enabling...' : 'Enable notifications'}
                </button>
              </div>
            )}

            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <p className="text-xs text-muted-foreground">No notifications yet.</p>
              </div>
            ) : (
              <div>
                {notifications.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => handleItemClick(n)}
                    className={`w-full text-left px-4 py-3 border-b border-border last:border-b-0 hover:bg-muted transition-colors ${!n.isRead ? 'bg-primary/5' : ''}`}
                  >
                    <div className="flex items-start gap-2">
                      {!n.isRead && <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />}
                      <div className="min-w-0">
                        <p className="text-xs text-foreground font-medium">{n.title}</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">{n.body}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
