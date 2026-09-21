'use server';

// Runs the shop's catalogue search on the server instead of the visitor's own
// browser. searchShopProducts still needs every language present (its search
// matches text across all three, e.g. finding "blue" via an English title
// while viewing the German site) — so unlike brand pages, this can't trim to
// one locale. What changes is where the work happens: assembling/shaping the
// full published catalogue now runs on this server (fast, and already shared
// across visitors via the existing 30s cache) rather than in each visitor's
// own browser making its own direct connection to Supabase.
import { Products } from '@/lib/supabaseData';
import { searchShopProducts } from '@/lib/shopSearch';

export async function searchShopProductsAction(payload) {
  return searchShopProducts(Products, payload);
}
