import React, { useState, useEffect } from 'react';
import { dataClient } from '@/lib/dataClient';
import { createOrder } from '@/actions/orders';
import { getMyProfile, saveMyProfile } from '@/actions/customers';
import { useAuth } from '@/lib/AuthContext';
import { useLanguage } from '@/lib/languageContext';
import { useLocalizedField } from '@/lib/localize';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { useStorefrontPricing } from '@/lib/currencyContext';
import { productSlug } from '@/lib/slug';
import { ShieldCheck, Lock, Check, ArrowLeft, Truck, RotateCcw } from 'lucide-react';
import EscrowTrustBadge from '@/components/escrow/EscrowTrustBadge';
import LocalizedLink from '@/components/LocalizedLink';
import { getProductAvailability } from '@/lib/productMerchant';
import { isProtectedPurchase, readPurchasePolicy } from '@/lib/purchasePolicyUi';

export default function Checkout({ id: idProp, initialProduct = null, initialBuyerRequestsProtection = false }) {
  const router = useRouter();
  const { t } = useTranslation();
  const { locale, getPricing, formatMoney: formatPrice } = useStorefrontPricing();
  const id = idProp || (typeof window !== 'undefined' ? window.location.pathname.split('/').filter(Boolean).pop() : '');
  const { user, isLoadingAuth } = useAuth();
  const { localePath } = useLanguage();
  const { localize } = useLocalizedField();
  const [product, setProduct] = useState(initialProduct);
  const [loading, setLoading] = useState(!initialProduct);
  const [submitting, setSubmitting] = useState(false);
  const [order, setOrder] = useState(null);
  const [done, setDone] = useState(false);
  const [revisedPricing, setRevisedPricing] = useState(null);
  const [checkoutError, setCheckoutError] = useState('');
  const [buyerRequestsProtection, setBuyerRequestsProtection] = useState(initialBuyerRequestsProtection);
  useEffect(() => { setRevisedPricing(null); setCheckoutError(''); }, [locale, id]);

  // Billing (pre-filled from user profile)
  const [billing, setBilling] = useState({
    fullName: '', street: '', city: '', postalCode: '', country: '', phone: ''
  });
  // Shipping
  const [useBillingAsShipping, setUseBillingAsShipping] = useState(true);
  const [shipping, setShipping] = useState({
    fullName: '', street: '', city: '', postalCode: '', country: '', phone: ''
  });
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    if (initialProduct?.id === id) {
      setProduct(initialProduct);
      setLoading(false);
      return;
    }
    dataClient.entities.Products.get(id).then(setProduct).catch(console.error).finally(() => setLoading(false));
  }, [id, initialProduct]);

  useEffect(() => {
    if (!user) return;
    getMyProfile().then(profile => {
      setBilling({
        fullName: user.full_name || '',
        street: profile.streetAddress || '',
        city: profile.city || '',
        postalCode: profile.postalCode || '',
        country: profile.country || '',
        phone: profile.phoneNumber || ''
      });
    }).catch(console.error);
  }, [user]);

  // Created once per mount, not per click — a regenerated key on every
  // submit attempt would defeat the whole point of idempotency.
  const [idempotencyKey] = useState(() => (typeof crypto !== 'undefined' ? crypto.randomUUID() : `checkout-${id}-${Date.now()}`));

  const effectiveShipping = useBillingAsShipping ? billing : shipping;
  const pricing = revisedPricing?.locale === locale ? revisedPricing.value : getPricing(product || {});
  const purchasePolicy = readPurchasePolicy(product || {});
  const protectedPurchase = isProtectedPurchase(purchasePolicy, buyerRequestsProtection);
  const isDealerDirect = purchasePolicy.purchaseRoute === 'dealer_direct' && !protectedPurchase;
  const isManualReview = purchasePolicy.purchaseRoute === 'manual_review';
  const availableToPurchase = getProductAvailability(product || {}).inStock && pricing.price != null && pricing.currency != null && !isManualReview;

  const canSubmit = () => {
    if (!availableToPurchase) return false;
    if (!agreed) return false;
    if (!billing.fullName || !billing.street || !billing.city || !billing.postalCode) return false;
    if (!useBillingAsShipping) {
      if (!shipping.fullName || !shipping.street || !shipping.city || !shipping.postalCode) return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!canSubmit() || submitting) return;
    setSubmitting(true);
    setCheckoutError('');
    try {
      // Save billing address as the buyer's default profile for next time.
      await saveMyProfile({
        streetAddress: billing.street,
        city: billing.city,
        postalCode: billing.postalCode,
        country: billing.country,
        phoneNumber: billing.phone
      });

      const res = await createOrder({
        productId: id,
        shippingDetails: effectiveShipping,
        idempotencyKey,
        locale,
        expectedPrice: pricing.price,
        expectedCurrency: pricing.currency,
        expectedPurchaseRoute: protectedPurchase ? 'escrow' : purchasePolicy.purchaseRoute,
        expectedSellerKey: purchasePolicy.sellerType === 'dealer' && purchasePolicy.dealerId
          ? `dealer:${purchasePolicy.dealerId}`
          : 'kariv',
        buyerRequestsProtection: purchasePolicy.buyerMayChooseProtection && buyerRequestsProtection,
      });
      if (res.ok) {
        setOrder(res.order);
        setDone(true);
      } else {
        if (res.code === 'PRICE_CHANGED' && res.pricing) {
          setRevisedPricing({ locale, value: res.pricing });
          setAgreed(false);
        }
        if (res.code === 'PURCHASE_ROUTE_CHANGED' || res.code === 'MANUAL_REVIEW_REQUIRED') {
          setAgreed(false);
          // Reload the authoritative server-rendered policy without discarding
          // the address fields held by this client component. Never patch the
          // route from action output into local state.
          router.refresh();
        }
        setCheckoutError(res.error);
      }
    } catch (e) {
      console.error(e);
      setCheckoutError(locale === 'cs' ? 'Objednávku se nepodařilo vytvořit. Zkuste to prosím znovu.' : locale === 'de' ? 'Die Bestellung konnte nicht erstellt werden.' : 'Failed to create order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || isLoadingAuth) return <div className="min-h-screen flex items-center justify-center"><div className="w-6 h-6 border-2 border-border border-t-primary rounded-full animate-spin" /></div>;
  if (!product) return <div className="max-w-2xl mx-auto py-20 text-center"><p className="text-sm text-muted-foreground">{t('pages.checkout.productNotFound')}</p></div>;

  const priceLabel = pricing.price != null && pricing.currency ? formatPrice(pricing.price, pricing.currency) : t('common:priceUnavailable');

  // Confirmation screen
  if (done && order) {
    // An idempotent retry can return an order created under an earlier policy
    // decision. Confirmation copy must describe that immutable order, never
    // the buyer's current toggle or a newly rendered live policy.
    const confirmedRoute = order.purchaseRoute || (protectedPurchase ? 'escrow' : purchasePolicy.purchaseRoute);
    const orderIsProtected = confirmedRoute === 'escrow';
    const orderIsDealerDirect = confirmedRoute === 'dealer_direct';
    return (
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-emerald-500/15 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={28} className="text-emerald-600 dark:text-emerald-400" />
          </div>
          <h1 className="font-display text-2xl text-foreground font-light mb-2">{t('pages.checkout.orderConfirmed')}</h1>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            {orderIsProtected
              ? t('pages.checkout.orderConfirmedProtectedDesc', { email: order.customerEmail })
              : orderIsDealerDirect
                ? t('pages.checkout.orderConfirmedDealerDesc', { email: order.customerEmail, seller: order.dealerName })
                : t('pages.checkout.orderConfirmedKarivDesc', { email: order.customerEmail })}
          </p>
        </div>
        <div className="border border-border p-5 space-y-2">
          <div className="flex justify-between text-sm"><span>{t('pages.checkout.total')}</span><strong>{formatPrice(order.totalAmount, order.currency)}</strong></div>
          <div className="flex justify-between text-xs"><span className="text-muted-foreground">{orderIsProtected ? t('pages.checkout.escrowRef') : t('pages.checkout.orderRef')}</span><span className="text-foreground font-mono font-bold">{order.orderReference || order.escrowReference}</span></div>
          <div className="flex justify-between text-xs"><span className="text-muted-foreground">{t('pages.checkout.status')}</span><span className="text-primary">{orderIsProtected ? t('pages.checkout.orderConfirmedProtectedStatus') : t('pages.checkout.orderConfirmedDirectStatus')}</span></div>
        </div>
        {orderIsProtected && <EscrowTrustBadge />}
        <div className="flex gap-3 mt-6">
          <LocalizedLink to="/portal/orders" className="flex-1 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium py-4 text-center">{t('pages.checkout.viewOrders')}</LocalizedLink>
          <LocalizedLink to="/shop" className="flex-1 border border-border text-[11px] tracking-[0.15em] uppercase py-4 text-foreground text-center hover:border-primary">{t('pages.checkout.continueShopping')}</LocalizedLink>
        </div>
      </div>
    );
  }

  const inputClass = "w-full bg-card border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-primary";

  return (
    <div>
      {/* Hero header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-10 md:py-14">
          <button onClick={() => window.location.assign(localePath(`/product/${productSlug(product)}`))} className="flex items-center gap-1 text-[10px] tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft size={10} /> {t('pages.checkout.backToProduct')}
          </button>
          <h1 className="font-display text-3xl md:text-4xl text-foreground font-light">
            {isManualReview ? t('pages.checkout.manualReviewTitle') : protectedPurchase ? t('pages.checkout.protectedCheckoutTitle') : t('pages.checkout.yourOrder')}
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            {isManualReview
              ? t('pages.checkout.manualReviewDesc')
              : protectedPurchase
              ? t('pages.checkout.protectedCheckoutDesc')
              : isDealerDirect
                ? t('pages.checkout.dealerDirectCheckoutDesc', { seller: purchasePolicy.sellerName })
                : t('pages.checkout.karivCheckoutDesc')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {/* Left: forms & summary */}
          <div className="md:col-span-2 space-y-10">

            {/* Billing Address */}
            <section>
              <h2 className="font-display text-xl text-foreground font-medium mb-1">{t('pages.checkout.billingAddress')}</h2>
              <p className="text-xs text-muted-foreground mb-5">{t('pages.checkout.billingDesc')}</p>
              <div className="space-y-3">
                <input value={billing.fullName} onChange={e => setBilling({ ...billing, fullName: e.target.value })} placeholder={t('pages.checkout.fullName')} className={inputClass} />
                <input value={billing.street} onChange={e => setBilling({ ...billing, street: e.target.value })} placeholder={t('pages.checkout.street')} className={inputClass} />
                <div className="grid grid-cols-2 gap-3">
                  <input value={billing.postalCode} onChange={e => setBilling({ ...billing, postalCode: e.target.value })} placeholder={t('pages.checkout.postalCode')} className={inputClass} />
                  <input value={billing.city} onChange={e => setBilling({ ...billing, city: e.target.value })} placeholder={t('pages.checkout.city')} className={inputClass} />
                </div>
                <input value={billing.country} onChange={e => setBilling({ ...billing, country: e.target.value })} placeholder={t('pages.checkout.country')} className={inputClass} />
                <input value={billing.phone} onChange={e => setBilling({ ...billing, phone: e.target.value })} placeholder={t('pages.checkout.phone')} className={inputClass} />
              </div>
            </section>

            {/* Delivery Address */}
            <section>
              <h2 className="font-display text-xl text-foreground font-medium mb-1">{t('pages.checkout.deliveryAddress')}</h2>
              <p className="text-xs text-muted-foreground mb-5">{t('pages.checkout.deliveryDesc')}</p>
              <label className="flex items-center gap-3 cursor-pointer mb-5">
                <input type="checkbox" checked={useBillingAsShipping} onChange={e => setUseBillingAsShipping(e.target.checked)} className="w-4 h-4 accent-primary" />
                <span className="text-sm text-foreground">{t('pages.checkout.useBillingAsDelivery')}</span>
              </label>
              {!useBillingAsShipping && (
                <div className="space-y-3">
                  <input value={shipping.fullName} onChange={e => setShipping({ ...shipping, fullName: e.target.value })} placeholder={t('pages.checkout.fullName')} className={inputClass} />
                  <input value={shipping.street} onChange={e => setShipping({ ...shipping, street: e.target.value })} placeholder={t('pages.checkout.street')} className={inputClass} />
                  <div className="grid grid-cols-2 gap-3">
                    <input value={shipping.postalCode} onChange={e => setShipping({ ...shipping, postalCode: e.target.value })} placeholder={t('pages.checkout.postalCode')} className={inputClass} />
                    <input value={shipping.city} onChange={e => setShipping({ ...shipping, city: e.target.value })} placeholder={t('pages.checkout.city')} className={inputClass} />
                  </div>
                  <input value={shipping.country} onChange={e => setShipping({ ...shipping, country: e.target.value })} placeholder={t('pages.checkout.country')} className={inputClass} />
                  <input value={shipping.phone} onChange={e => setShipping({ ...shipping, phone: e.target.value })} placeholder={t('pages.checkout.phone')} className={inputClass} />
                </div>
              )}
            </section>

            {purchasePolicy.buyerMayChooseProtection && (
              <section>
                <h2 className="font-display text-xl text-foreground font-medium mb-1">{t('pages.checkout.paymentRouteTitle')}</h2>
                <p className="text-xs text-muted-foreground mb-5">{t('pages.checkout.paymentRouteDesc')}</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    aria-pressed={!buyerRequestsProtection}
                    onClick={() => {
                      if (buyerRequestsProtection) setAgreed(false);
                      setBuyerRequestsProtection(false);
                    }}
                    className={`rounded-xl border p-4 text-left transition-colors ${!buyerRequestsProtection ? 'border-primary bg-primary/5' : 'border-border bg-card hover:border-primary/50'}`}
                  >
                    <span className="block text-sm font-medium text-foreground">{t('pages.checkout.payDealerDirectly')}</span>
                    <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{t('pages.checkout.payDealerDirectlyDesc', { seller: purchasePolicy.sellerName })}</span>
                  </button>
                  <button
                    type="button"
                    aria-pressed={buyerRequestsProtection}
                    onClick={() => {
                      if (!buyerRequestsProtection) setAgreed(false);
                      setBuyerRequestsProtection(true);
                    }}
                    className={`rounded-xl border p-4 text-left transition-colors ${buyerRequestsProtection ? 'border-primary bg-primary/5' : 'border-border bg-card hover:border-primary/50'}`}
                  >
                    <span className="flex items-center gap-2 text-sm font-medium text-foreground"><ShieldCheck size={15} className="text-primary" />{t('pages.checkout.addProtectedPayment')}</span>
                    <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{t('pages.checkout.addProtectedPaymentDesc')}</span>
                  </button>
                </div>
              </section>
            )}

            {/* Purchase route summary */}
            <section className="rounded-xl border border-border p-6 bg-card">
              <div className="flex items-center gap-2 mb-4">
                {protectedPurchase ? <ShieldCheck size={18} className="text-primary" /> : <Lock size={18} className="text-primary" />}
                <h2 className="font-display text-lg text-foreground font-medium">
                  {isManualReview ? t('pages.checkout.manualReviewTitle') : protectedPurchase ? t('pages.checkout.buyerProtection') : isDealerDirect ? t('pages.checkout.directDealerPurchase') : t('pages.checkout.karivPurchase')}
                </h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {isManualReview
                  ? t('pages.checkout.manualReviewDesc')
                  : protectedPurchase
                  ? t('pages.checkout.buyerProtectionDesc')
                  : isDealerDirect
                    ? t('pages.checkout.directDealerPurchaseDesc', { seller: purchasePolicy.sellerName })
                    : t('pages.checkout.karivPurchaseDesc')}
              </p>
              <div className="space-y-2">
                {(protectedPurchase
                  ? [
                    { icon: Lock, text: t('pages.checkout.bpEscrow') },
                    { icon: ShieldCheck, text: t('pages.checkout.bpAuth') },
                    { icon: RotateCcw, text: t('pages.checkout.bpReturns') },
                    { icon: Truck, text: t('pages.checkout.bpShipping') },
                  ]
                  : [
                    { icon: Lock, text: t('pages.checkout.accountOrderTracking') },
                    { icon: RotateCcw, text: t('pages.checkout.sellerTermsApply') },
                    { icon: Truck, text: t('pages.checkout.bpShipping') },
                  ]).map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <item.icon size={14} className="text-primary flex-shrink-0" />
                    <span className="text-xs text-muted-foreground">{item.text}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Disclaimer */}
            <section>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="w-4 h-4 accent-primary mt-0.5 flex-shrink-0" />
                <span className="text-xs text-muted-foreground leading-relaxed">
                  {t('pages.checkout.termsAgree')} <LocalizedLink to="/legal/terms-and-conditions" className="text-primary underline">{protectedPurchase ? t('pages.checkout.termsLink') : t('pages.checkout.directTermsLink')}</LocalizedLink>{t('pages.checkout.termsAgreeEnd')}
                </span>
              </label>
            </section>

            {/* Continue button */}
            {checkoutError && <p role="alert" className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">{checkoutError}</p>}
            <button
              onClick={handleSubmit}
              disabled={!canSubmit() || submitting}
              className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium py-4 disabled:opacity-50 hover:bg-primary/90 transition-colors"
            >
              <Lock size={16} />
              {!availableToPurchase
                ? isManualReview ? t('pages.productDetail.purchaseUnderReview') : t('common:currentlyUnavailable')
                : submitting
                  ? t('pages.checkout.processing')
                  : protectedPurchase
                    ? t('pages.checkout.placeProtectedOrder')
                    : t('pages.checkout.placeOrder')}
            </button>
          </div>

          {/* Right: watch preview (sticky) */}
          <div className="md:col-span-1">
            <div className="md:sticky md:top-32 space-y-4">
              <div className="border border-border p-5 bg-card">
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-4">{t('pages.checkout.selectedWatch')}</p>
                {product.featuredImage && (
                  <div className="aspect-square bg-background overflow-hidden mb-4">
                    <img src={product.featuredImage} alt={localize(product, 'productTitle')} className="w-full h-full object-cover" />
                  </div>
                )}
                <p className="text-[10px] tracking-[0.1em] uppercase text-primary">{product.brand}</p>
                <h3 className="text-sm text-foreground font-medium mt-1 leading-snug">{localize(product, 'productTitle')}</h3>
                {product.referenceNumber && <p className="text-xs text-muted-foreground mt-1">{t('pages.productDetail.ref')} {product.referenceNumber}</p>}
                {product.condition && <p className="text-xs text-muted-foreground mt-0.5">{product.condition}</p>}
                <div className="mt-4 rounded-lg border border-border bg-background/60 p-3">
                  <p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">{t('pages.checkout.sellerOfRecord')}</p>
                  <p className="mt-1 text-sm font-medium text-foreground">{purchasePolicy.sellerName || t('pages.productDetail.verifiedDealer')}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {isManualReview
                      ? t('pages.productDetail.manualReviewDisclosure')
                      : protectedPurchase
                      ? t('pages.checkout.protectedSellerDisclosure')
                      : isDealerDirect
                        ? t('pages.checkout.directSellerDisclosure')
                        : t('pages.checkout.karivSellerDisclosure')}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-border space-y-1.5">
                  <div className="flex justify-between text-xs"><span className="text-muted-foreground">{t('pages.checkout.subtotal')}</span><span className="text-foreground">{priceLabel}</span></div>
                  <div className="flex justify-between text-xs"><span className="text-muted-foreground">{t('pages.checkout.shipping')}</span><span className="text-foreground">{t('pages.checkout.free')}</span></div>
                  <div className="flex justify-between text-sm font-medium pt-2 border-t border-border"><span className="text-foreground">{t('pages.checkout.total')}</span><span className="text-primary">{priceLabel}</span></div>
                  {locale === 'cs' && <p className="pt-3 text-xs leading-relaxed text-muted-foreground">{pricing.price != null ? 'Objednávku uhradíte v českých korunách (CZK). Potvrzená částka zůstává beze změny.' : 'Aktuální cenu v Kč se nepodařilo ověřit. Objednání je dočasně pozastaveno.'}</p>}
                </div>
              </div>
              {protectedPurchase && <EscrowTrustBadge />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
