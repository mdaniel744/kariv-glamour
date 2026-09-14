import { canPurchaseFromSeller, groupBySeller } from '@/lib/marketplace';
import { marketplaceCopy } from '@/lib/marketplaceCopy';
import SellerIdentity from '@/components/marketplace/SellerIdentity';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import LocalizedLink from '@/components/LocalizedLink';
import { useCart } from '@/lib/cartContext';
import { useAuth } from '@/lib/AuthContext';
import { useLanguage } from '@/lib/languageContext';
import { useLocalizedField } from '@/lib/localize';
import { useStorefrontPricing } from '@/lib/currencyContext';
import { dataClient } from '@/lib/dataClient';
import { getProductAvailability } from '@/lib/productMerchant';
import { useSEO } from '@/hooks/useSEO';
import { Trash2, ShoppingBag, ArrowLeft, ShieldCheck, Truck, Lock, ChevronRight } from 'lucide-react';
import { productSlug } from '@/lib/slug';
import BuyNowAuthModal from '@/components/checkout/BuyNowAuthModal';

export default function Cart() {
  const { t } = useTranslation();
  const router = useRouter();
  const { cartItems: savedItems, removeFromCart, clearCart } = useCart();
  const { getPricing, formatMoney: formatPrice } = useStorefrontPricing();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const { localePath, locale } = useLanguage();
  const { localize } = useLocalizedField();
  const [showAuthModal, setShowAuthModal] = useState(false);
  useSEO({ title: t('common:seo.cart.title'), description: t('common:seo.cart.description'), noindex: true });
  useEffect(() => {
    let active = true;
    setLoading(true);
    Promise.all(savedItems.map(async ({ productId }) => {
      try { return await dataClient.entities.Products.get(productId) || { id: productId }; }
      catch { return { id: productId }; }
    })).then((items) => { if (active) { setCartItems(items); setLoading(false); } });
    return () => { active = false; };
  }, [savedItems]);
  const firstPricing = getPricing(cartItems[0] || {});
  const canCheckout = canPurchaseFromSeller(cartItems[0]) && !loading && getProductAvailability(cartItems[0] || {}).inStock && firstPricing.price != null;
  // The backend checks out one watch per order. Do not show a multi-watch
  // total beside a button that will actually order only the first watch.
  const totalLabel = firstPricing.price != null ? formatPrice(firstPricing.price, firstPricing.currency) : t('common:priceUnavailable');

  // createOrder is single-product per order (matches the existing backend
  // contract) — checkout uses the first cart item; the rest stay in the cart.
  const checkoutPath = cartItems[0] ? `/checkout/${cartItems[0].id}` : null;
  const handleCheckout = () => {
    if (!checkoutPath || !canCheckout) return;
    if (!isAuthenticated) { setShowAuthModal(true); return; }
    router.push(localePath(checkoutPath));
  };

  if (loading) return <div role="status" className="min-h-64 grid place-items-center">{t('common:loading')}</div>;
  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <ShoppingBag size={48} className="text-muted-foreground/30 mx-auto mb-6" />
        <h1 className="font-display text-3xl text-foreground font-light mb-3">{t('pages.cart.emptyTitle')}</h1>
        <p className="text-sm text-muted-foreground mb-8">{t('pages.cart.emptyDesc')}</p>
        <LocalizedLink to="/shop" className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium px-8 py-4 hover:bg-primary/90 transition-colors">
          {t('pages.cart.continueShopping')}
        </LocalizedLink>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <div className="flex items-center gap-2 text-[10px] tracking-[0.1em] uppercase text-muted-foreground mb-6">
        <LocalizedLink to="/" className="hover:text-foreground">{t('common:home')}</LocalizedLink>
        <ChevronRight size={10} />
        <span className="text-foreground">{t('pages.cart.breadcrumb')}</span>
      </div>

      <div className="flex items-center justify-between mb-10">
        <div>
          <span className="text-[10px] tracking-[0.3em] uppercase text-primary mb-2 block">{t('pages.cart.label')}</span>
          <h1 className="font-display text-3xl md:text-4xl font-light text-foreground">{t('pages.cart.title')}</h1>
        </div>
        <button onClick={clearCart} className="text-[10px] tracking-[0.1em] uppercase text-muted-foreground hover:text-destructive transition-colors">
          {t('pages.cart.clearAll')}
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        {/* Items */}
        <div className="md:col-span-2 space-y-6">
          <p className="text-sm text-muted-foreground">{marketplaceCopy(locale).mixed}</p>
          {groupBySeller(cartItems).map(group => <section className="space-y-4" key={group.id}>
          <SellerIdentity seller={group.seller} compact />
          {group.products.map(item => (
            <div key={item.id} className="flex gap-5 border-b border-border pb-6">
              <LocalizedLink to={`/product/${productSlug(item)}`} className="w-24 h-24 md:w-32 md:h-32 bg-card flex-shrink-0 overflow-hidden">
                {item.featuredImage ? (
                  <img src={item.featuredImage} alt={localize(item, 'productTitle')} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground/30 text-[10px]">{t('pages.cart.noImage')}</div>
                )}
              </LocalizedLink>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-primary">{item.brand}</p>
                  <LocalizedLink to={`/product/${productSlug(item)}`} className="text-sm text-foreground hover:text-primary transition-colors line-clamp-2">{localize(item, 'productTitle') || t('common:currentlyUnavailable')}</LocalizedLink>
                  {item.referenceNumber && <p className="text-[10px] text-muted-foreground mt-1">{t('pages.productDetail.ref')} {item.referenceNumber}</p>}
                </div>
                <div className="flex items-end justify-between mt-3">
                  <span className="text-sm text-foreground font-medium">{getPricing(item).price != null ? formatPrice(getPricing(item).price, getPricing(item).currency) : t('common:priceUnavailable')}</span>
                  <button onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          </section>)}
        </div>

        {/* Summary */}
        <div className="md:sticky md:top-32 md:self-start">
          <div className="border border-border p-6 space-y-5">
            <h2 className="text-[11px] tracking-[0.15em] uppercase text-foreground font-medium">{t('pages.cart.summary')}</h2>

            <div className="space-y-3 border-b border-border pb-5">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">{t('pages.cart.subtotal', { count: 1 })}</span>
                <span className="text-foreground">{totalLabel}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">{t('pages.cart.shipping')}</span>
                <span className="text-primary">{t('pages.cart.free')}</span>
              </div>
            </div>

            <div className="flex justify-between">
              <span className="text-xs text-foreground font-medium">{t('pages.cart.total')}</span>
              <span className="font-display text-2xl text-foreground">{totalLabel}</span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={!canCheckout}
              className="w-full bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium py-4 hover:bg-primary/90 transition-colors disabled:opacity-50">
              {t('pages.cart.checkout')}
            </button>
            {cartItems.length > 1 && (
              <p className="text-[10px] text-muted-foreground text-center -mt-3">
                {t('pages.cart.checkoutFirstItemNote', { defaultValue: 'Checkout is one watch at a time — your first item will be ordered.' })}
              </p>
            )}
            <BuyNowAuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} continueTo={checkoutPath} />

            <LocalizedLink to="/shop" className="flex items-center justify-center gap-2 text-[10px] tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-colors pt-2">
              <ArrowLeft size={12} /> {t('pages.cart.continueShopping')}
            </LocalizedLink>

            {/* Trust */}
            <div className="border-t border-border pt-5 space-y-3">
              {[
                { icon: Lock, text: t('pages.cart.trustSecure') },
                { icon: Truck, text: t('pages.cart.trustShipping') },
                { icon: ShieldCheck, text: t('pages.cart.trustAuth') }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <item.icon size={12} className="text-primary" />
                  <span className="text-[10px] text-muted-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
