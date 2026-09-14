'use client';
import { useEffect, useState } from 'react';
import { getPublicSellerSummaries } from '@/actions/dealerReviews';

// One batch timer per browser page, not a separate network poll per product card.
const watchers = new Map();
let timer = null;
let running = false;
async function refresh() {
  if (running || document.visibilityState === 'hidden') return;
  running = true;
  try {
    const keys = [...watchers.keys()];
    for (let start = 0; start < keys.length; start += 100) {
      const batch = keys.slice(start, start + 100);
      const sellers = await getPublicSellerSummaries(batch);
      for (const key of batch) {
        const seller = sellers.find(s => s.user_id === key) || null;
        for (const notify of watchers.get(key) || []) notify(seller);
      }
    }
  } catch { /* Retain last display during a transient outage; checkout checks fresh DB state. */ }
  finally { running = false; }
}
export function useLiveSeller(initial, snapshot = false) {
  const [seller, setSeller] = useState(initial);
  useEffect(() => {
    setSeller(initial);
    if (snapshot || !initial?.user_id) return;
    const key = initial.user_id;
    if (!watchers.has(key)) watchers.set(key, new Set());
    watchers.get(key).add(setSeller);
    if (!timer) { timer = setInterval(refresh, 45000); window.addEventListener('focus', refresh); }
    return () => {
      watchers.get(key)?.delete(setSeller);
      if (!watchers.get(key)?.size) watchers.delete(key);
      if (!watchers.size) { clearInterval(timer); timer = null; window.removeEventListener('focus', refresh); }
    };
  }, [initial, snapshot]);
  return snapshot ? initial : seller;
}
