import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import { useLanguage } from '@/lib/languageContext';
import { formatPrice } from '@/lib/constants';
import { ShieldCheck, Lock, Check, ArrowLeft, Truck, RotateCcw, Award } from 'lucide-react';
import EscrowTrustBadge from '@/components/escrow/EscrowTrustBadge';
import SEO from '@/components/SEO';
import LocalizedLink from '@/components/LocalizedLink';

export default function Checkout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoadingAuth } = useAuth();
  const { localePath } = useLanguage();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [order, setOrder] = useState(null);
  const [done, setDone] = useState(false);

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
    base44.entities.Products.get(id).then(setProduct).catch(console.error).finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (user) {
      setBilling({
        fullName: user.full_name || '',
        street: user.streetAddress || '',
        city: user.city || '',
        postalCode: user.postalCode || '',
        country: user.country || '',
        phone: user.phoneNumber || ''
      });
    }
  }, [user]);

  const effectiveShipping = useBillingAsShipping ? billing : shipping;

  const canSubmit = () => {
    if (!agreed) return false;
    if (!billing.fullName || !billing.street || !billing.city || !billing.postalCode) return false;
    if (!useBillingAsShipping) {
      if (!shipping.fullName || !shipping.street || !shipping.city || !shipping.postalCode) return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      // Save billing address to user profile if changed
      if (user) {
        await base44.auth.updateMe({
          streetAddress: billing.street,
          city: billing.city,
          postalCode: billing.postalCode,
          country: billing.country,
          phoneNumber: billing.phone
        });
      }
      const res = await base44.functions.invoke('processOrder', {
        action: 'create',
        productId: id,
        shippingDetails: effectiveShipping
      });
      setOrder(res.data.order);
      setDone(true);
    } catch (e) {
      console.error(e);
      alert(e.response?.data?.error || 'Failed to create order');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || isLoadingAuth) return <div className="min-h-screen flex items-center justify-center"><div className="w-6 h-6 border-2 border-border border-t-primary rounded-full animate-spin" /></div>;
  if (!product) return <div className="max-w-2xl mx-auto py-20 text-center"><p className="text-sm text-muted-foreground">Product not found.</p></div>;

  const price = product.salePrice || product.price;

  // Confirmation screen
  if (done && order) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-16">
        <SEO title="Order Confirmed — Kariv Glamour" />
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-emerald-500/15 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={28} className="text-emerald-600 dark:text-emerald-400" />
          </div>
          <h1 className="font-display text-2xl text-foreground font-light mb-2">Order Placed Successfully</h1>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Thank you! Our Kariv Admin is verifying availability with the dealer. We will notify you shortly at {order.customerEmail}.
          </p>
        </div>
        <div className="border border-border p-5 space-y-2">
          <div className="flex justify-between text-xs"><span className="text-muted-foreground">Escrow Reference</span><span className="text-foreground font-mono font-bold">{order.escrowReference}</span></div>
          <div className="flex justify-between text-xs"><span className="text-muted-foreground">Status</span><span className="text-primary">Pending Dealer Review</span></div>
        </div>
        <EscrowTrustBadge />
        <div className="flex gap-3 mt-6">
          <LocalizedLink to="/portal/orders" className="flex-1 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium py-4 text-center">View My Orders</LocalizedLink>
          <LocalizedLink to="/shop" className="flex-1 border border-border text-[11px] tracking-[0.15em] uppercase py-4 text-foreground text-center hover:border-primary">Continue Shopping</LocalizedLink>
        </div>
      </div>
    );
  }

  const inputClass = "w-full bg-card border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-primary";

  return (
    <div>
      <SEO title="Your Order — Kariv Glamour" />

      {/* Hero header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-10 md:py-14">
          <button onClick={() => navigate(localePath(`/product/${id}`))} className="flex items-center gap-1 text-[10px] tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft size={10} /> Back to Product
          </button>
          <h1 className="font-display text-3xl md:text-4xl text-foreground font-light">Your Order</h1>
          <p className="text-sm text-muted-foreground mt-2">Complete your purchase securely through the Kariv Glamour escrow service.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {/* Left: forms & summary */}
          <div className="md:col-span-2 space-y-10">

            {/* Billing Address */}
            <section>
              <h2 className="font-display text-xl text-foreground font-medium mb-1">Billing Address</h2>
              <p className="text-xs text-muted-foreground mb-5">Your registered billing address. Update if needed.</p>
              <div className="space-y-3">
                <input value={billing.fullName} onChange={e => setBilling({ ...billing, fullName: e.target.value })} placeholder="Full Name" className={inputClass} />
                <input value={billing.street} onChange={e => setBilling({ ...billing, street: e.target.value })} placeholder="Street Address" className={inputClass} />
                <div className="grid grid-cols-2 gap-3">
                  <input value={billing.postalCode} onChange={e => setBilling({ ...billing, postalCode: e.target.value })} placeholder="Postal Code" className={inputClass} />
                  <input value={billing.city} onChange={e => setBilling({ ...billing, city: e.target.value })} placeholder="City" className={inputClass} />
                </div>
                <input value={billing.country} onChange={e => setBilling({ ...billing, country: e.target.value })} placeholder="Country" className={inputClass} />
                <input value={billing.phone} onChange={e => setBilling({ ...billing, phone: e.target.value })} placeholder="Phone Number" className={inputClass} />
              </div>
            </section>

            {/* Delivery Address */}
            <section>
              <h2 className="font-display text-xl text-foreground font-medium mb-1">Delivery Address</h2>
              <p className="text-xs text-muted-foreground mb-5">Where should we deliver your watch?</p>
              <label className="flex items-center gap-3 cursor-pointer mb-5">
                <input type="checkbox" checked={useBillingAsShipping} onChange={e => setUseBillingAsShipping(e.target.checked)} className="w-4 h-4 accent-primary" />
                <span className="text-sm text-foreground">Use billing address as delivery address</span>
              </label>
              {!useBillingAsShipping && (
                <div className="space-y-3">
                  <input value={shipping.fullName} onChange={e => setShipping({ ...shipping, fullName: e.target.value })} placeholder="Full Name" className={inputClass} />
                  <input value={shipping.street} onChange={e => setShipping({ ...shipping, street: e.target.value })} placeholder="Street Address" className={inputClass} />
                  <div className="grid grid-cols-2 gap-3">
                    <input value={shipping.postalCode} onChange={e => setShipping({ ...shipping, postalCode: e.target.value })} placeholder="Postal Code" className={inputClass} />
                    <input value={shipping.city} onChange={e => setShipping({ ...shipping, city: e.target.value })} placeholder="City" className={inputClass} />
                  </div>
                  <input value={shipping.country} onChange={e => setShipping({ ...shipping, country: e.target.value })} placeholder="Country" className={inputClass} />
                  <input value={shipping.phone} onChange={e => setShipping({ ...shipping, phone: e.target.value })} placeholder="Phone Number" className={inputClass} />
                </div>
              )}
            </section>

            {/* Buyer Protection Summary */}
            <section className="border border-border p-6 bg-card">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck size={18} className="text-primary" />
                <h2 className="font-display text-lg text-foreground font-medium">Buyer Protection</h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Thanks to buyer protection, you benefit from many security features such as payment via our escrow service, the guarantee of authenticity and the 14-day statutory right of withdrawal.
              </p>
              <div className="space-y-2">
                {[
                  { icon: Lock, text: 'Payment via our escrow service — funds released only after verification' },
                  { icon: ShieldCheck, text: 'Guarantee of authenticity by expert watchmakers' },
                  { icon: RotateCcw, text: '14-day statutory right of withdrawal' },
                  { icon: Truck, text: 'Insured worldwide shipping' }
                ].map((item, i) => (
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
                  By clicking the button, you confirm that you have read and understood the <LocalizedLink to="/legal/terms-and-conditions" className="text-primary underline">General Terms and Conditions of Sale for Trusted Checkout</LocalizedLink>.
                </span>
              </label>
            </section>

            {/* Continue button */}
            <button
              onClick={handleSubmit}
              disabled={!canSubmit() || submitting}
              className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium py-4 disabled:opacity-50 hover:bg-primary/90 transition-colors"
            >
              <Lock size={16} />
              {submitting ? 'Processing...' : 'Continue — Place Order'}
            </button>
          </div>

          {/* Right: watch preview (sticky) */}
          <div className="md:col-span-1">
            <div className="md:sticky md:top-32 space-y-4">
              <div className="border border-border p-5 bg-card">
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-4">Selected Watch</p>
                {product.featuredImage && (
                  <div className="aspect-square bg-background overflow-hidden mb-4">
                    <img src={product.featuredImage} alt={product.productTitle} className="w-full h-full object-cover" />
                  </div>
                )}
                <p className="text-[10px] tracking-[0.1em] uppercase text-primary">{product.brand}</p>
                <h3 className="text-sm text-foreground font-medium mt-1 leading-snug">{product.productTitle}</h3>
                {product.referenceNumber && <p className="text-xs text-muted-foreground mt-1">Ref. {product.referenceNumber}</p>}
                {product.condition && <p className="text-xs text-muted-foreground mt-0.5">{product.condition}</p>}
                <div className="mt-4 pt-4 border-t border-border space-y-1.5">
                  <div className="flex justify-between text-xs"><span className="text-muted-foreground">Subtotal</span><span className="text-foreground">{formatPrice(price)}</span></div>
                  <div className="flex justify-between text-xs"><span className="text-muted-foreground">Insured Shipping</span><span className="text-foreground">Free</span></div>
                  <div className="flex justify-between text-sm font-medium pt-2 border-t border-border"><span className="text-foreground">Total</span><span className="text-primary">{formatPrice(price)}</span></div>
                </div>
              </div>
              <EscrowTrustBadge />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}