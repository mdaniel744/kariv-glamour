import React, { useState, useEffect } from 'react';
import {
  acceptDirectDealerOrder,
  acceptProtectedDealerOrder,
  confirmDirectDealerPaymentReceived,
  declineDealerOrder,
  getMySales,
  shipDirectDealerOrder,
  shipProtectedDealerOrder,
} from '@/actions/orders';
import { useAuth } from '@/lib/AuthContext';
import { ShoppingCart, ShieldCheck, Truck } from 'lucide-react';
import { formatPrice } from '@/lib/constants';
import OrderStatusBadge from '@/components/orders/OrderStatusBadge';
import { getDirectOrderCopy, isProtectedOrder } from '@/lib/orderPresentation';
import { getEscrowCopy } from '@/lib/escrowCopy';
import { useLanguage } from '@/lib/languageContext';
import { useTranslation } from 'react-i18next';

export default function PortalSales() {
  const { user } = useAuth();
  const { locale } = useLanguage();
  const { t } = useTranslation();
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [acceptingOrderId, setAcceptingOrderId] = useState(null);
  const [acceptError, setAcceptError] = useState({});
  const [trackingNumbers, setTrackingNumbers] = useState({});

  useEffect(() => {
    getMySales({ limit: 50 }).then(setSales).catch(console.error).finally(() => setLoading(false));
  }, [user]);

  const needsShipping = sales.filter(s => s.escrowStatus === 'funds_secured');
  const protectedNeedsShipping = needsShipping.filter(isProtectedOrder);
  const directNeedsShipping = needsShipping.filter((sale) => !isProtectedOrder(sale));

  const acceptDealerOrder = async (sale) => {
    setAcceptingOrderId(sale.id);
    setAcceptError((current) => ({ ...current, [sale.id]: '' }));
    try {
      const result = isProtectedOrder(sale)
        ? await acceptProtectedDealerOrder(sale.id)
        : await acceptDirectDealerOrder(sale.id);
      if (!result.ok) {
        setAcceptError((current) => ({ ...current, [sale.id]: result.error }));
        return;
      }
      setSales((current) => current.map((currentSale) => currentSale.id === sale.id ? result.order : currentSale));
    } finally {
      setAcceptingOrderId(null);
    }
  };

  const declineOrder = async (sale) => {
    if (!window.confirm(t('pages.portal.declineOrderConfirm'))) return;
    setAcceptingOrderId(sale.id);
    setAcceptError((current) => ({ ...current, [sale.id]: '' }));
    try {
      const result = await declineDealerOrder(sale.id);
      if (!result.ok) {
        setAcceptError((current) => ({ ...current, [sale.id]: result.error }));
        return;
      }
      setSales((current) => current.map((currentSale) => currentSale.id === sale.id ? result.order : currentSale));
    } finally {
      setAcceptingOrderId(null);
    }
  };

  const confirmDirectPayment = async (orderId) => {
    setAcceptingOrderId(orderId);
    setAcceptError((current) => ({ ...current, [orderId]: '' }));
    try {
      const result = await confirmDirectDealerPaymentReceived(orderId);
      if (!result.ok) {
        setAcceptError((current) => ({ ...current, [orderId]: result.error }));
        return;
      }
      setSales((current) => current.map((sale) => sale.id === orderId ? result.order : sale));
    } finally {
      setAcceptingOrderId(null);
    }
  };

  const shipDealerOrder = async (sale) => {
    setAcceptingOrderId(sale.id);
    setAcceptError((current) => ({ ...current, [sale.id]: '' }));
    try {
      const trackingNumber = trackingNumbers[sale.id] || '';
      const result = isProtectedOrder(sale)
        ? await shipProtectedDealerOrder(sale.id, trackingNumber)
        : await shipDirectDealerOrder(sale.id, trackingNumber);
      if (!result.ok) {
        setAcceptError((current) => ({ ...current, [sale.id]: result.error }));
        return;
      }
      setSales((current) => current.map((currentSale) => currentSale.id === sale.id ? result.order : currentSale));
      setTrackingNumbers((current) => ({ ...current, [sale.id]: '' }));
    } finally {
      setAcceptingOrderId(null);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-display text-foreground font-light mb-6">{t('pages.portal.salesTitle')}</h1>

      {/* Alert for orders needing shipment */}
      {needsShipping.length > 0 && (
        <div className="bg-emerald-500/5 border border-emerald-500/20 p-4 mb-6 flex items-center gap-3">
          <ShieldCheck size={20} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">{t('pages.portal.shipmentAlertTitle')}</p>
            <p className="text-xs text-muted-foreground">
              {t('pages.portal.shipmentAlertSummary', {
                protected: protectedNeedsShipping.length,
                direct: directNeedsShipping.length,
              })}
            </p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-20 bg-card animate-pulse" />)}</div>
      ) : sales.length === 0 ? (
        <div className="border border-border p-12 text-center">
          <ShoppingCart size={32} className="text-muted-foreground/40 mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">{t('pages.portal.noSales')}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sales.map(sale => (
            <div key={sale.id} className="bg-card border border-border p-4">
              <div className="flex items-center justify-between gap-4 mb-3">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {sale.products?.[0]?.featuredImage ? (
                    <img src={sale.products[0].featuredImage} alt="" className="w-14 h-14 object-cover flex-shrink-0" />
                  ) : <div className="w-14 h-14 bg-muted flex-shrink-0" />}
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">{sale.products?.[0]?.productTitle || t('pages.portal.sale')}</p>
                    <p className="text-[10px] text-muted-foreground">{sale.products?.[0]?.brand} • {sale.products?.[0]?.condition}</p>
                    <p className="text-[10px] text-muted-foreground font-mono mt-0.5">{sale.orderReference || sale.escrowReference}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm text-foreground mb-1">{formatPrice(sale.totalAmount, sale.currency || 'EUR')}</p>
                  <OrderStatusBadge order={sale} />
                </div>
              </div>

              <div className="text-[11px] text-muted-foreground border-t border-border pt-2">
                <span className="text-primary">●</span> {(isProtectedOrder(sale) ? getEscrowCopy(locale) : getDirectOrderCopy(locale)).descriptions[sale.escrowStatus]}
              </div>

              {['dealer_direct', 'escrow'].includes(sale.purchaseRoute) && sale.escrowStatus === 'pending_review' && (
                <div className="mt-3 rounded-xl border border-primary/25 bg-primary/5 p-4">
                  <p className="text-xs font-medium text-foreground">
                    {isProtectedOrder(sale) ? t('pages.portal.protectedAcceptTitle') : t('pages.portal.directAcceptTitle')}
                  </p>
                  <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                    {isProtectedOrder(sale) ? t('pages.portal.protectedAcceptDesc') : t('pages.portal.directAcceptDesc')}
                  </p>
                  {acceptError[sale.id] && <p className="mt-2 text-xs text-destructive">{acceptError[sale.id]}</p>}
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => acceptDealerOrder(sale)}
                      disabled={acceptingOrderId === sale.id}
                      className="w-full rounded-xl bg-primary px-4 py-3 text-[11px] font-medium uppercase tracking-[0.12em] text-primary-foreground disabled:opacity-50"
                    >
                      {acceptingOrderId === sale.id
                        ? t('pages.portal.saving')
                        : isProtectedOrder(sale)
                          ? t('pages.portal.protectedAcceptButton')
                          : t('pages.portal.directAcceptButton')}
                    </button>
                    <button
                      type="button"
                      onClick={() => declineOrder(sale)}
                      disabled={acceptingOrderId === sale.id}
                      className="w-full rounded-xl border border-destructive/40 px-4 py-3 text-[11px] font-medium uppercase tracking-[0.12em] text-destructive transition-colors hover:bg-destructive/5 disabled:opacity-50"
                    >
                      {acceptingOrderId === sale.id ? t('pages.portal.saving') : t('pages.portal.declineOrder')}
                    </button>
                  </div>
                </div>
              )}

              {isProtectedOrder(sale) && sale.escrowStatus === 'dealer_accepted' && (
                <div className="mt-3 rounded-xl border border-amber-500/25 bg-amber-500/5 p-4">
                  <p className="text-xs font-medium text-foreground">{t('pages.portal.protectedAwaitingPaymentTitle')}</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                    {t('pages.portal.protectedAwaitingPaymentDesc')}
                  </p>
                </div>
              )}

              {sale.purchaseRoute === 'dealer_direct' && sale.escrowStatus === 'dealer_accepted' && (
                <div className="mt-3 rounded-xl border border-amber-500/25 bg-amber-500/5 p-4">
                  <p className="text-xs font-medium text-foreground">{t('pages.portal.directAwaitingPaymentTitle')}</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                    {t('pages.portal.directAwaitingPaymentDesc')}
                  </p>
                  {sale.paymentProofUrl && (
                    <a href={sale.paymentProofUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex text-xs text-primary underline">
                      {t('pages.portal.viewPaymentProof')}
                    </a>
                  )}
                  {acceptError[sale.id] && <p className="mt-2 text-xs text-destructive">{acceptError[sale.id]}</p>}
                  <button
                    type="button"
                    onClick={() => confirmDirectPayment(sale.id)}
                    disabled={acceptingOrderId === sale.id || sale.paymentStatus !== 'Awaiting Confirmation'}
                    className="mt-3 w-full rounded-xl border border-primary bg-background px-4 py-3 text-[11px] font-medium uppercase tracking-[0.12em] text-primary disabled:opacity-50"
                  >
                    {acceptingOrderId === sale.id ? t('pages.portal.saving') : t('pages.portal.confirmPaymentReceived')}
                  </button>
                </div>
              )}

              {['dealer_direct', 'escrow'].includes(sale.purchaseRoute) && sale.escrowStatus === 'funds_secured' && (
                <div className="mt-3 rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-4">
                  <p className="text-xs font-medium text-foreground">
                    {isProtectedOrder(sale) ? t('pages.portal.protectedShipTitle') : t('pages.portal.directShipTitle')}
                  </p>
                  <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                    {isProtectedOrder(sale) ? t('pages.portal.protectedShipDesc') : t('pages.portal.directShipDesc')}
                  </p>
                  <input
                    value={trackingNumbers[sale.id] || ''}
                    onChange={(event) => setTrackingNumbers((current) => ({ ...current, [sale.id]: event.target.value }))}
                    maxLength={200}
                    placeholder={t('pages.portal.trackingPlaceholder')}
                    className="mt-3 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground outline-none focus:border-primary"
                  />
                  {acceptError[sale.id] && <p className="mt-2 text-xs text-destructive">{acceptError[sale.id]}</p>}
                  <button
                    type="button"
                    onClick={() => shipDealerOrder(sale)}
                    disabled={acceptingOrderId === sale.id || (trackingNumbers[sale.id] || '').trim().length < 3}
                    className="mt-3 w-full rounded-xl bg-primary px-4 py-3 text-[11px] font-medium uppercase tracking-[0.12em] text-primary-foreground disabled:opacity-50"
                  >
                    {acceptingOrderId === sale.id ? t('pages.portal.saving') : t('pages.portal.markShipped')}
                  </button>
                </div>
              )}

              {/* Shipping address for orders that need to ship */}
              {['funds_secured', 'shipped'].includes(sale.escrowStatus) && sale.shippingDetails && (
                <div className="mt-3 bg-background border border-border p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Truck size={12} className="text-primary" />
                    <p className="text-[10px] tracking-[0.1em] uppercase text-muted-foreground">{t('pages.portal.shipTo')}</p>
                  </div>
                  <p className="text-xs text-foreground">{sale.shippingDetails.fullName}</p>
                  <p className="text-xs text-muted-foreground">{sale.shippingDetails.street}, {sale.shippingDetails.postalCode} {sale.shippingDetails.city}, {sale.shippingDetails.country}</p>
                  {sale.trackingNumber && <p className="text-[10px] text-primary font-mono mt-2">{t('pages.portal.trackingLabel')}: {sale.trackingNumber}</p>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
