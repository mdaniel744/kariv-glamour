import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useLanguage } from '@/lib/languageContext';
import { useTranslation } from 'react-i18next';
import { formatPrice } from '@/lib/constants';
import { ArrowLeft, ShieldCheck, Truck, Package, Building2, CreditCard, Bitcoin } from 'lucide-react';
import EscrowTimeline from '@/components/escrow/EscrowTimeline';
import EscrowStatusBadge from '@/components/escrow/EscrowStatusBadge';
import EscrowTrustBadge from '@/components/escrow/EscrowTrustBadge';
import PaymentMethodSelector from '@/components/escrow/PaymentMethodSelector';
import { ESCROW_STATUS_DESCRIPTIONS } from '@/lib/escrowConstants';
import CryptoCheckoutButton from '@/components/escrow/CryptoCheckoutButton';

const ICON_MAP = { Building2, CreditCard, Bitcoin };

export default function PortalOrderDetail() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { localePath } = useLanguage();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [savingPayment, setSavingPayment] = useState(false);
  const [confirmingPayment, setConfirmingPayment] = useState(false);

  useEffect(() => {
    base44.entities.Orders.get(id).then(o => {
      setOrder(o);
      setPaymentMethod(o.paymentMethod);
    }).catch(console.error).finally(() => setLoading(false));
  }, [id]);

  const handleSelectPayment = async () => {
    setSavingPayment(true);
    try {
      const res = await base44.functions.invoke('processOrder', {
        action: 'select_payment',
        orderId: id,
        paymentMethod
      });
      setOrder(res.data.order);
    } catch (e) {
      alert(e.response?.data?.error || 'Failed to save payment method');
    } finally {
      setSavingPayment(false);
    }
  };

  const handleConfirmPaymentSent = async () => {
    setConfirmingPayment(true);
    try {
      const res = await base44.functions.invoke('processOrder', {
        action: 'confirm_payment_sent',
        orderId: id
      });
      setOrder(res.data.order);
    } catch (e) {
      alert(e.response?.data?.error || 'Failed to confirm payment');
    } finally {
      setConfirmingPayment(false);
    }
  };

  if (loading) return <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="h-16 bg-card animate-pulse" />)}</div>;
  if (!order) return <div className="text-center py-12"><p className="text-sm text-muted-foreground">{t('pages.portal.orderNotFound', { defaultValue: 'Order not found.' })}</p></div>;

  const showPaymentSelector = order.escrowStatus === 'dealer_accepted' && !order.paymentMethod;

  return (
    <div>
      <Link to={localePath('/portal/orders')} className="inline-flex items-center gap-1 text-[10px] tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft size={10} /> {t('pages.portal.backToOrders')}
      </Link>

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-xl font-display text-foreground font-light">{t('pages.portal.orderDetails')}</h1>
          <p className="text-[10px] text-muted-foreground font-mono mt-1">{order.escrowReference}</p>
        </div>
        <EscrowStatusBadge status={order.escrowStatus} size="lg" />
      </div>

      {/* Timeline */}
      <div className="bg-card border border-border p-5 mb-6 overflow-x-auto">
        <EscrowTimeline currentStatus={order.escrowStatus} />
      </div>

      {/* Status description */}
      <div className="bg-primary/5 border border-primary/20 p-4 mb-6 flex items-start gap-3">
        <ShieldCheck size={18} className="text-primary flex-shrink-0 mt-0.5" />
        <p className="text-xs text-foreground">{ESCROW_STATUS_DESCRIPTIONS[order.escrowStatus]}</p>
      </div>

      {/* Payment selection — only when dealer accepted and no method chosen */}
      {showPaymentSelector && (
        <div className="border border-primary/30 p-5 mb-6">
          <h2 className="text-sm font-medium text-foreground mb-4">{t('pages.portal.selectPayment', { defaultValue: 'Select Your Payment Method' })}</h2>
          <PaymentMethodSelector selected={paymentMethod} onSelect={setPaymentMethod} escrowReference={order.escrowReference} />
          <button
            onClick={handleSelectPayment}
            disabled={!paymentMethod || savingPayment}
            className="w-full mt-4 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium py-3 disabled:opacity-50"
          >
            {savingPayment ? t('pages.portal.saving', { defaultValue: 'Saving...' }) : t('pages.portal.confirmPayment', { defaultValue: 'Confirm Payment Method' })}
          </button>
        </div>
      )}

      {/* Payment instructions — when method is selected and payment not yet confirmed */}
      {order.paymentMethod && order.escrowStatus === 'dealer_accepted' && order.paymentStatus !== 'Paid' && (
        <div className="border border-primary/30 bg-primary/5 p-5 mb-6">
          <p className="text-xs font-medium text-primary mb-3">{t('pages.portal.paymentInstructions', { defaultValue: 'Payment Instructions' })}</p>

          {order.paymentMethod === 'bank_transfer' && (
            <div className="space-y-1.5 text-xs mb-4">
              <p className="text-muted-foreground">
                {t('pages.portal.bankTransferInfo', { defaultValue: 'Bank transfer details will be provided after the dealer confirms availability. Use your Escrow Reference as the payment reference.' })}
              </p>
              <div className="flex justify-between pt-1"><span className="text-muted-foreground">Reference:</span><span className="text-primary font-mono font-bold">{order.escrowReference}</span></div>
            </div>
          )}

          {order.paymentMethod === 'crypto' && (
            <CryptoCheckoutButton orderId={order.id} escrowReference={order.escrowReference} />
          )}

          {order.paymentStatus === 'Awaiting Confirmation' ? (
            <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 mt-3 pt-3 border-t border-border">
              <ShieldCheck size={14} />
              <span>{t('pages.portal.paymentSent', { defaultValue: 'Payment sent — awaiting admin confirmation. You will be notified once funds are verified in escrow.' })}</span>
            </div>
          ) : (
            <button
              onClick={handleConfirmPaymentSent}
              disabled={confirmingPayment}
              className="w-full mt-2 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium py-3 disabled:opacity-50 hover:bg-primary/90 transition-colors"
            >
              {confirmingPayment ? t('pages.portal.confirming', { defaultValue: 'Confirming...' }) : t('pages.portal.iMadePayment', { defaultValue: "I've Made the Payment" })}
            </button>
          )}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Items */}
        <div className="border border-border p-5">
          <h2 className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-3">{t('pages.portal.item')}</h2>
          {order.products?.map((p, i) => (
            <div key={i} className="flex gap-3">
              {p.featuredImage && <img src={p.featuredImage} alt="" className="w-16 h-16 object-cover" />}
              <div className="flex-1">
                <p className="text-[10px] tracking-[0.1em] uppercase text-primary">{p.brand}</p>
                <p className="text-xs text-foreground">{p.productTitle}</p>
                <p className="text-[10px] text-muted-foreground">{p.condition}</p>
                <p className="text-sm text-foreground mt-1">{formatPrice(p.price)}</p>
              </div>
            </div>
          ))}
          <div className="border-t border-border mt-4 pt-3 space-y-1">
            <div className="flex justify-between text-xs"><span className="text-muted-foreground">{t('pages.portal.subtotal')}</span><span className="text-foreground">{formatPrice(order.totalAmount)}</span></div>
            <div className="flex justify-between text-xs"><span className="text-muted-foreground">{t('pages.portal.insuredShipping')}</span><span className="text-foreground">{t('pages.cart.free')}</span></div>
            <div className="flex justify-between text-sm font-medium pt-2 border-t border-border"><span className="text-foreground">{t('pages.portal.total')}</span><span className="text-primary">{formatPrice(order.totalAmount)}</span></div>
          </div>
        </div>

        {/* Shipping + tracking */}
        <div className="space-y-4">
          <div className="border border-border p-5">
            <h2 className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-3">{t('pages.portal.shippingAddress')}</h2>
            {order.shippingDetails ? (
              <div className="text-xs text-foreground space-y-0.5">
                <p>{order.shippingDetails.fullName}</p>
                <p>{order.shippingDetails.street}</p>
                <p>{order.shippingDetails.postalCode} {order.shippingDetails.city}</p>
                <p>{order.shippingDetails.country}</p>
                {order.shippingDetails.phone && <p className="text-muted-foreground pt-1">{order.shippingDetails.phone}</p>}
              </div>
            ) : <p className="text-xs text-muted-foreground">{order.shippingAddress || 'N/A'}</p>}
          </div>

          {order.trackingNumber && (
            <div className="border border-border p-5">
              <div className="flex items-center gap-2 mb-2">
                <Truck size={14} className="text-primary" />
                <h2 className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">{t('pages.portal.tracking')}</h2>
              </div>
              <p className="text-xs text-foreground font-mono">{order.trackingNumber}</p>
            </div>
          )}

          {order.paymentMethod && (
            <div className="border border-border p-5">
              <h2 className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-3">{t('pages.portal.paymentMethod')}</h2>
              <p className="text-xs text-foreground capitalize">{order.paymentMethod.replace('_', ' ')}</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <EscrowTrustBadge />
      </div>
    </div>
  );
}