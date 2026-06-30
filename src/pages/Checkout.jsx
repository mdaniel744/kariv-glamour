import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import { useLanguage } from '@/lib/languageContext';
import { formatPrice } from '@/lib/constants';
import { ChevronRight, ShieldCheck, ArrowLeft, Check } from 'lucide-react';
import PaymentMethodSelector from '@/components/escrow/PaymentMethodSelector';
import EscrowTrustBadge from '@/components/escrow/EscrowTrustBadge';
import SEO from '@/components/SEO';

export default function Checkout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoadingAuth } = useAuth();
  const { localePath } = useLanguage();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [order, setOrder] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [shipping, setShipping] = useState({
    fullName: '', street: '', city: '', postalCode: '', country: '', phone: ''
  });

  useEffect(() => {
    if (!isLoadingAuth && !isAuthenticated) {
      window.location.href = `/login?continueTo=${encodeURIComponent(window.location.pathname)}`;
    }
  }, [isAuthenticated, isLoadingAuth]);

  useEffect(() => {
    if (user && !shipping.fullName) {
      setShipping(prev => ({ ...prev, fullName: user.full_name || '', country: user.country || '' }));
    }
  }, [user]);

  useEffect(() => {
    base44.entities.Products.get(id).then(setProduct).catch(console.error).finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await base44.functions.invoke('processOrder', {
        action: 'create',
        productId: id,
        paymentMethod,
        shippingDetails: shipping
      });
      setOrder(res.data.order);
      setStep(3);
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

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-8 md:py-16">
      <SEO title="Checkout — Kariv Glamour" />

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[10px] tracking-[0.1em] uppercase text-muted-foreground mb-6">
        <button onClick={() => navigate(localePath('/shop'))} className="hover:text-foreground flex items-center gap-1">
          <ArrowLeft size={10} /> Back to Shop
        </button>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-2 mb-8">
        {['Shipping', 'Payment', 'Confirmation'].map((label, i) => (
          <React.Fragment key={label}>
            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border-2 ${step > i + 1 ? 'bg-primary border-primary text-primary-foreground' : step === i + 1 ? 'border-primary text-primary bg-primary/10' : 'border-border text-muted-foreground'}`}>
                {step > i + 1 ? <Check size={12} /> : i + 1}
              </div>
              <span className={`text-[10px] tracking-[0.1em] uppercase ${step >= i + 1 ? 'text-foreground' : 'text-muted-foreground'}`}>{label}</span>
            </div>
            {i < 2 && <ChevronRight size={12} className="text-muted-foreground mx-1" />}
          </React.Fragment>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {/* Step 1: Shipping */}
          {step === 1 && (
            <div className="space-y-4">
              <h1 className="font-display text-2xl text-foreground font-light">Shipping Details</h1>
              <div className="space-y-3">
                <input value={shipping.fullName} onChange={e => setShipping({...shipping, fullName: e.target.value})} placeholder="Full Name" className="w-full bg-card border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-primary" />
                <input value={shipping.street} onChange={e => setShipping({...shipping, street: e.target.value})} placeholder="Street Address" className="w-full bg-card border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-primary" />
                <div className="grid grid-cols-2 gap-3">
                  <input value={shipping.postalCode} onChange={e => setShipping({...shipping, postalCode: e.target.value})} placeholder="Postal Code" className="bg-card border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-primary" />
                  <input value={shipping.city} onChange={e => setShipping({...shipping, city: e.target.value})} placeholder="City" className="bg-card border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-primary" />
                </div>
                <input value={shipping.country} onChange={e => setShipping({...shipping, country: e.target.value})} placeholder="Country" className="w-full bg-card border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-primary" />
                <input value={shipping.phone} onChange={e => setShipping({...shipping, phone: e.target.value})} placeholder="Phone Number" className="w-full bg-card border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-primary" />
              </div>
              <button
                onClick={() => setStep(2)}
                disabled={!shipping.fullName || !shipping.street || !shipping.city}
                className="w-full bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium py-4 disabled:opacity-50"
              >
                Continue to Payment
              </button>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <div className="space-y-4">
              <h1 className="font-display text-2xl text-foreground font-light">Select Payment Method</h1>
              <PaymentMethodSelector selected={paymentMethod} onSelect={setPaymentMethod} escrowReference="(generated after confirmation)" />
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 border border-border text-[11px] tracking-[0.15em] uppercase py-4 text-foreground hover:border-primary">
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!paymentMethod || submitting}
                  className="flex-1 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium py-4 disabled:opacity-50"
                >
                  {submitting ? 'Processing...' : 'Place Order'}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && order && (
            <div className="space-y-6">
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
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Escrow Reference</span>
                  <span className="text-foreground font-mono font-bold">{order.escrowReference}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Payment Method</span>
                  <span className="text-foreground capitalize">{order.paymentMethod?.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Status</span>
                  <span className="text-primary">Pending Dealer Review</span>
                </div>
              </div>

              <EscrowTrustBadge />

              <div className="flex gap-3">
                <a href={localePath('/portal/orders')} className="flex-1 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium py-4 text-center">
                  View My Orders
                </a>
                <a href={localePath('/shop')} className="flex-1 border border-border text-[11px] tracking-[0.15em] uppercase py-4 text-foreground text-center hover:border-primary">
                  Continue Shopping
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        {step < 3 && (
          <div className="space-y-4">
            <div className="border border-border p-4">
              <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-3">Order Summary</p>
              <div className="flex gap-3 mb-4">
                {product.featuredImage && <img src={product.featuredImage} alt="" className="w-16 h-16 object-cover" />}
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] tracking-[0.1em] uppercase text-primary">{product.brand}</p>
                  <p className="text-xs text-foreground truncate">{product.productTitle}</p>
                  <p className="text-xs text-muted-foreground">{product.condition}</p>
                </div>
              </div>
              <div className="space-y-1.5 border-t border-border pt-3">
                <div className="flex justify-between text-xs"><span className="text-muted-foreground">Subtotal</span><span className="text-foreground">{formatPrice(price)}</span></div>
                <div className="flex justify-between text-xs"><span className="text-muted-foreground">Insured Shipping</span><span className="text-foreground">Free</span></div>
                <div className="flex justify-between text-sm font-medium pt-2 border-t border-border"><span className="text-foreground">Total</span><span className="text-primary">{formatPrice(price)}</span></div>
              </div>
            </div>
            <EscrowTrustBadge />
          </div>
        )}
      </div>
    </div>
  );
}