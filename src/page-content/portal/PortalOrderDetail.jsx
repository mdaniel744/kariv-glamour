import React, { useState, useEffect } from 'react';
import { useLocalizedField } from '@/lib/localize';
import { cancelMyUnpaidOrder, getMyOrder, getMyOrderDispute, selectPaymentMethod, flagOrder, confirmPaymentSent } from '@/actions/orders';
import { useTranslation } from 'react-i18next';
import LocalizedLink from '@/components/LocalizedLink';
import { formatPrice } from '@/lib/constants';
import { ArrowLeft, ShieldCheck, Truck, Package, Flag, AlertTriangle, X, Star } from 'lucide-react';
import OrderTimeline from '@/components/orders/OrderTimeline';
import OrderStatusBadge from '@/components/orders/OrderStatusBadge';
import EscrowTrustBadge from '@/components/escrow/EscrowTrustBadge';
import PaymentMethodSelector from '@/components/escrow/PaymentMethodSelector';
import { getEscrowCopy } from '@/lib/escrowCopy';
import { useLanguage } from '@/lib/languageContext';
import CryptoCheckoutButton from '@/components/escrow/CryptoCheckoutButton';
import PaymentProofUploader from '@/components/escrow/PaymentProofUploader';
import { getDirectOrderCopy, getPurchaseRouteLabel, isProtectedOrder } from '@/lib/orderPresentation';

const ORDER_COPY = {
  cs: {
    reason: 'Důvod', selectReason: 'Vyberte důvod…', describe: 'Popište problém', detailHint: 'Uveďte prosím podrobnosti problému…', submitDispute: 'Odeslat žádost o řešení sporu',
    reasons: { authenticity_issue: 'Pochybnosti o pravosti', condition_mismatch: 'Stav neodpovídá nabídce', item_not_received: 'Zboží nebylo doručeno', damaged_in_transit: 'Poškození při přepravě', not_as_described: 'Neodpovídá popisu', other: 'Jiný důvod' },
    statuses: { open: 'Otevřený', under_review: 'Posuzuje se', resolved_buyer: 'Vyřešeno ve prospěch kupujícího', resolved_seller: 'Vyřešeno ve prospěch prodejce', closed: 'Uzavřený' },
    rate: 'Ohodnoťte prodejce', review: 'Napsat recenzi', reviewHint: 'Jak jste byli s nákupem spokojeni? Vaše zkušenost pomůže ostatním kupujícím při rozhodování.',
  },
  de: {
    reason: 'Grund', selectReason: 'Grund auswählen…', describe: 'Problem beschreiben', detailHint: 'Bitte beschreiben Sie das Problem genauer…', submitDispute: 'Streitfall einreichen',
    reasons: { authenticity_issue: 'Echtheitsbedenken', condition_mismatch: 'Abweichender Zustand', item_not_received: 'Artikel nicht erhalten', damaged_in_transit: 'Transportschaden', not_as_described: 'Nicht wie beschrieben', other: 'Sonstiges' },
    statuses: { open: 'Offen', under_review: 'Wird geprüft', resolved_buyer: 'Zugunsten des Käufers geklärt', resolved_seller: 'Zugunsten des Verkäufers geklärt', closed: 'Geschlossen' },
    rate: 'Händler bewerten', review: 'Bewertung schreiben', reviewHint: 'Wie war Ihre Einkaufserfahrung? Ihre Rückmeldung hilft anderen Käufern bei der Entscheidung.',
  },
  en: {
    reason: 'Reason', selectReason: 'Select a reason...', describe: 'Describe the Issue', detailHint: 'Please provide details about the issue...', submitDispute: 'Submit Dispute Case',
    reasons: { authenticity_issue: 'Authenticity Issue', condition_mismatch: 'Condition Mismatch', item_not_received: 'Item Not Received', damaged_in_transit: 'Damaged in Transit', not_as_described: 'Not As Described', other: 'Other' },
    statuses: { open: 'Open', under_review: 'Under review', resolved_buyer: 'Resolved for buyer', resolved_seller: 'Resolved for seller', closed: 'Closed' },
    rate: 'Rate Your Dealer', review: 'Leave a Review', reviewHint: 'How was your purchase experience? Your feedback helps other buyers make informed decisions.',
  },
};

export default function PortalOrderDetail({ id: providedId }) {
  const { localize } = useLocalizedField();
  const { t } = useTranslation();
  const { locale } = useLanguage();
  const escrowCopy = getEscrowCopy(locale);
  const copy = ORDER_COPY[locale] || ORDER_COPY.en;
  const id = providedId || (typeof window !== 'undefined' ? window.location.pathname.split('/').filter(Boolean).at(-1) : null);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [savingPayment, setSavingPayment] = useState(false);
  const [confirmingPayment, setConfirmingPayment] = useState(false);
  const [paymentProofUrl, setPaymentProofUrl] = useState(null);
  const [dispute, setDispute] = useState(null);
  const [showFlagForm, setShowFlagForm] = useState(false);
  const [flagReason, setFlagReason] = useState('');
  const [flagDescription, setFlagDescription] = useState('');
  const [flagging, setFlagging] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    Promise.all([
      getMyOrder(id),
      getMyOrderDispute(id).catch(() => null)
    ]).then(([o, d]) => {
      setOrder(o);
      setPaymentMethod(o?.paymentMethod || null);
      setDispute(d);
    }).catch(console.error).finally(() => setLoading(false));
  }, [id]);

  const handleSelectPayment = async () => {
    setSavingPayment(true);
    try {
      const res = await selectPaymentMethod(id, paymentMethod);
      if (res.ok) setOrder(res.order);
      else alert(res.error);
    } finally {
      setSavingPayment(false);
    }
  };

  const handleFlagOrder = async () => {
    if (!flagReason) {
      alert(copy.selectReason);
      return;
    }
    if (!flagDescription.trim()) {
      alert(copy.describe);
      return;
    }
    setFlagging(true);
    try {
      const res = await flagOrder(id, flagReason, flagDescription.trim());
      if (res.ok) {
        setDispute(res.dispute);
        setShowFlagForm(false);
        setFlagReason('');
        setFlagDescription('');
      } else {
        alert(res.error);
      }
    } finally {
      setFlagging(false);
    }
  };

  const handleConfirmPaymentSent = async () => {
    setConfirmingPayment(true);
    try {
      const res = await confirmPaymentSent(id, paymentProofUrl);
      if (res.ok) setOrder(res.order);
      else alert(res.error);
    } finally {
      setConfirmingPayment(false);
    }
  };

  const handleCancelOrder = async () => {
    if (!window.confirm(t('pages.portal.cancelUnpaidConfirm'))) return;
    setCancelling(true);
    try {
      const res = await cancelMyUnpaidOrder(id);
      if (res.ok) setOrder(res.order);
      else alert(res.error);
    } finally {
      setCancelling(false);
    }
  };

  if (loading) return <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="h-16 bg-card animate-pulse" />)}</div>;
  if (!order) return <div className="text-center py-12"><p className="text-sm text-muted-foreground">{t('pages.portal.orderNotFound', { defaultValue: 'Order not found.' })}</p></div>;

  const protectedOrder = isProtectedOrder(order);
  const orderCopy = protectedOrder ? escrowCopy : getDirectOrderCopy(locale);
  const orderReference = order.orderReference || order.escrowReference;
  const showPaymentSelector = order.escrowStatus === 'dealer_accepted' && !order.paymentMethod;
  const canCancelUnpaid = ['pending_review', 'dealer_accepted'].includes(order.escrowStatus) && !order.paymentProofUrl;

  return (
    <div>
      <LocalizedLink to="/portal/orders" className="inline-flex items-center gap-1 text-[10px] tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft size={10} /> {t('pages.portal.backToOrders')}
      </LocalizedLink>

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-xl font-display text-foreground font-light">{t('pages.portal.orderDetails')}</h1>
          <p className="text-[10px] text-muted-foreground font-mono mt-1">{orderReference}</p>
          <p className="mt-1 text-[9px] uppercase tracking-[0.08em] text-primary">{getPurchaseRouteLabel(order, locale)}</p>
        </div>
        <OrderStatusBadge order={order} size="lg" />
      </div>

      {/* Timeline */}
      <div className="bg-card border border-border p-5 mb-6 overflow-x-auto">
        <OrderTimeline order={order} />
      </div>

      {/* Status description */}
      <div className="bg-primary/5 border border-primary/20 p-4 mb-6 flex items-start gap-3">
        <ShieldCheck size={18} className="text-primary flex-shrink-0 mt-0.5" />
        <p className="text-xs text-foreground">{orderCopy.descriptions[order.escrowStatus]}</p>
      </div>

      {canCancelUnpaid && (
        <div className="mb-6 rounded-xl border border-border bg-card p-4 sm:flex sm:items-center sm:justify-between sm:gap-4">
          <div>
            <p className="text-xs font-medium text-foreground">{t('pages.portal.cancelUnpaidTitle')}</p>
            <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{t('pages.portal.cancelUnpaidDesc')}</p>
          </div>
          <button
            type="button"
            onClick={handleCancelOrder}
            disabled={cancelling}
            className="mt-3 w-full rounded-xl border border-destructive/40 px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.12em] text-destructive transition-colors hover:bg-destructive/5 disabled:opacity-50 sm:mt-0 sm:w-auto sm:flex-shrink-0"
          >
            {cancelling ? t('pages.portal.cancellingOrder') : t('pages.portal.cancelUnpaidOrder')}
          </button>
        </div>
      )}

      {/* Payment selection — only when dealer accepted and no method chosen */}
      {showPaymentSelector && (
        <div className="border border-primary/30 p-5 mb-6">
          <h2 className="text-sm font-medium text-foreground mb-4">{t('pages.portal.selectPayment', { defaultValue: 'Select Your Payment Method' })}</h2>
          <PaymentMethodSelector
            selected={paymentMethod}
            onSelect={setPaymentMethod}
            orderReference={orderReference}
            protectedPayment={protectedOrder}
            sellerName={order.dealerName || 'Kariv'}
            sellerType={order.dealerId ? 'dealer' : 'kariv'}
          />
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
                {protectedOrder
                  ? t('pages.portal.protectedPaymentInstructionsIntro')
                  : order.dealerId
                    ? t('pages.portal.directPaymentInstructionsIntro', { seller: order.dealerName || t('pages.productDetail.verifiedDealer') })
                    : t('pages.portal.karivPaymentInstructionsIntro')}
              </p>
              {order.sellerPaymentInstructions && (
                <div className="my-3 rounded-xl border border-primary/25 bg-background p-4">
                  <p className="mb-2 text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{t('pages.portal.verifiedPaymentDetails')}</p>
                  <p className="whitespace-pre-wrap break-words text-xs leading-relaxed text-foreground">{order.sellerPaymentInstructions}</p>
                </div>
              )}
              {!order.sellerPaymentInstructions && (
                <p className="my-3 rounded-xl border border-amber-500/25 bg-amber-500/5 p-3 text-[11px] text-amber-700 dark:text-amber-300">{t('pages.portal.paymentDetailsUnavailable')}</p>
              )}
              <div className="flex justify-between pt-1"><span className="text-muted-foreground">{t('pages.portal.paymentReference')}:</span><span className="text-primary font-mono font-bold">{orderReference}</span></div>
              <div className="flex justify-between pt-1"><span className="text-muted-foreground">{t('pages.portal.total')}</span><span className="text-primary font-bold">{formatPrice(order.totalAmount, order.currency || 'EUR')} ({order.currency || 'EUR'})</span></div>
            </div>
          )}

          {order.paymentMethod === 'crypto' && (
            <CryptoCheckoutButton orderId={order.id} escrowReference={orderReference} />
          )}

          {order.sellerPaymentInstructions && (order.paymentStatus === 'Awaiting Confirmation' ? (
            <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 mt-3 pt-3 border-t border-border">
              <ShieldCheck size={14} />
              <span>
                {protectedOrder
                  ? t('pages.portal.paymentSent', { defaultValue: 'Payment sent — awaiting confirmation. You will be notified once protected funds are verified.' })
                  : t('pages.portal.directPaymentSent')}
              </span>
            </div>
          ) : (
            <>
              {order.paymentStatus === 'Justification Requested' && order.justificationMessage && (
                <div className="mb-4 p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-xs">
                  <p className="font-medium mb-1 flex items-center gap-1.5">
                    <ShieldCheck size={14} /> {t('pages.portal.additionalInformation')}
                  </p>
                  <p className="whitespace-pre-wrap">{order.justificationMessage}</p>
                </div>
              )}
              <PaymentProofUploader
                orderId={order.id}
                paymentMethod={order.paymentMethod}
                onUploaded={setPaymentProofUrl}
                proofUrl={order.paymentProofUrl}
              />
              <button
                onClick={handleConfirmPaymentSent}
                disabled={confirmingPayment || !paymentProofUrl}
                className="w-full mt-2 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium py-3 disabled:opacity-50 hover:bg-primary/90 transition-colors"
              >
                {confirmingPayment
                  ? t('pages.portal.confirming', { defaultValue: 'Confirming...' })
                  : order.paymentStatus === 'Justification Requested'
                    ? t('pages.portal.reuploadProof', { defaultValue: 'Re-upload Proof of Payment' })
                    : t('pages.portal.iMadePayment', { defaultValue: "I've Made the Payment" })}
              </button>
              {!paymentProofUrl && (
                <p className="text-[10px] text-muted-foreground mt-2 text-center">
                  {t('pages.portal.uploadProofRequired', { defaultValue: 'Please upload your proof of payment to confirm.' })}
                </p>
              )}
            </>
          ))}
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
                <p className="text-xs text-foreground">{localize(p, 'productTitle')}</p>
                <p className="text-[10px] text-muted-foreground">{p.condition ? t(`products:conditions.${p.condition}`, { defaultValue: p.condition }) : ''}</p>
                <p className="text-sm text-foreground mt-1">{formatPrice(p.price, p.currency || order.currency || 'EUR')}</p>
              </div>
            </div>
          ))}
          <div className="border-t border-border mt-4 pt-3 space-y-1">
            <div className="flex justify-between text-xs"><span className="text-muted-foreground">{t('pages.portal.subtotal')}</span><span className="text-foreground">{formatPrice(order.totalAmount, order.currency || 'EUR')}</span></div>
            <div className="flex justify-between text-xs"><span className="text-muted-foreground">{t('pages.portal.insuredShipping')}</span><span className="text-foreground">{t('pages.cart.free')}</span></div>
            <div className="flex justify-between text-sm font-medium pt-2 border-t border-border"><span className="text-foreground">{t('pages.portal.total')}</span><span className="text-primary">{formatPrice(order.totalAmount, order.currency || 'EUR')}</span></div>
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

          {order.escrowStatus === 'shipped' && (
            <div className="border border-primary/30 bg-primary/5 p-5">
              <div className="flex items-start gap-3">
                <Package size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-primary mb-1">{t('pages.portal.inTransit', { defaultValue: 'Watch In Transit' })}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {protectedOrder
                      ? t('pages.portal.courierDeliveryNote', { defaultValue: 'Your watch is on its way. Delivery will be confirmed by our courier service. Once confirmed, your 14-day inspection period will begin automatically — no action needed from you.' })
                      : t('pages.portal.directInTransitDesc')}
                  </p>
                </div>
              </div>
            </div>
          )}

          {order.escrowStatus === 'verified' && order.deliveryConfirmedAt && (
            <div className="space-y-4">
              <div className="border border-primary/30 bg-primary/5 p-5">
                <div className="flex items-start gap-3">
                  <ShieldCheck size={18} className="text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-medium text-primary mb-1">
                      {protectedOrder
                        ? t('pages.portal.inspectionPeriod', { defaultValue: '14-Day Inspection Period Active' })
                        : t('pages.portal.directDeliveryWindowTitle')}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {t('pages.portal.inspectionPeriodDesc', { defaultValue: 'Delivery confirmed on' })} {new Date(order.deliveryConfirmedAt).toLocaleDateString(locale)}.{' '}
                      {protectedOrder
                        ? t('pages.portal.inspectionPeriodDesc2', { defaultValue: 'Your protected payment remains held during the 14-day inspection period unless a dispute is filed.' })
                        : t('pages.portal.directDeliveryWindowDesc')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Open dispute */}
              {dispute && ['open', 'under_review'].includes(dispute.status) && (
                <div className="border border-amber-500/40 bg-amber-500/5 p-5">
                  <div className="flex items-start gap-3">
                    <AlertTriangle size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-amber-500 mb-1">{t('pages.portal.disputeOpen', { defaultValue: 'Dispute Case Open' })}</p>
                      <p className="text-[11px] text-muted-foreground mb-2">
                        {protectedOrder
                          ? t('pages.portal.disputeOpenDesc', { defaultValue: 'You flagged this order. Our mediation team is reviewing your case. Protected funds remain frozen while the dispute is reviewed.' })
                          : t('pages.portal.directDisputeOpenDesc')}
                      </p>
                      <div className="text-[11px] text-muted-foreground space-y-0.5">
                        <p><span className="text-foreground">{copy.reason}:</span> {copy.reasons[dispute.reason] || dispute.reason.replace(/_/g, ' ')}</p>
                        <p><span className="text-foreground">{t('pages.checkout.status')}:</span> <span className="capitalize">{copy.statuses[dispute.status] || dispute.status.replace(/_/g, ' ')}</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Flag order button — only if no open dispute */}
              {!dispute && !showFlagForm && (
                <div className="border border-destructive/30 bg-destructive/5 p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <Flag size={18} className="text-destructive flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-destructive mb-1">{t('pages.portal.flagOrder', { defaultValue: 'Flag This Order' })}</p>
                      <p className="text-[11px] text-muted-foreground">
                        {protectedOrder
                          ? t('pages.portal.flagOrderDesc', { defaultValue: 'Experiencing an issue with your watch? Flag this order for review. Protected funds remain on hold while the case is reviewed.' })
                          : t('pages.portal.directFlagOrderDesc')}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowFlagForm(true)}
                    className="w-full border border-destructive/40 text-destructive text-[11px] tracking-[0.15em] uppercase font-medium py-3 hover:bg-destructive/10 transition-colors"
                  >
                    {t('pages.portal.openDispute', { defaultValue: 'Open a Dispute' })}
                  </button>
                </div>
              )}

              {/* Flag form */}
              {showFlagForm && !dispute && (
                <div className="border border-destructive/30 bg-destructive/5 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-medium text-destructive flex items-center gap-2">
                      <Flag size={14} /> {t('pages.portal.openDispute', { defaultValue: 'Open a Dispute' })}
                    </p>
                    <button aria-label={t('close')} onClick={() => setShowFlagForm(false)} className="text-muted-foreground hover:text-foreground">
                      <X size={14} />
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] tracking-[0.1em] uppercase text-muted-foreground block mb-1">{copy.reason}</label>
                      <select
                        value={flagReason}
                        onChange={e => setFlagReason(e.target.value)}
                        className="w-full bg-background border border-border text-xs text-foreground px-3 py-2 outline-none focus:border-primary"
                      >
                        <option value="">{copy.selectReason}</option>
                        {Object.entries(copy.reasons).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] tracking-[0.1em] uppercase text-muted-foreground block mb-1">{copy.describe}</label>
                      <textarea
                        value={flagDescription}
                        onChange={e => setFlagDescription(e.target.value)}
                        placeholder={copy.detailHint}
                        rows={4}
                        className="w-full bg-background border border-border text-xs text-foreground px-3 py-2 outline-none focus:border-primary resize-none"
                      />
                    </div>
                    <button
                      onClick={handleFlagOrder}
                      disabled={flagging || !flagReason || !flagDescription.trim()}
                      className="w-full bg-destructive text-destructive-foreground text-[11px] tracking-[0.15em] uppercase font-medium py-3 hover:bg-destructive/90 disabled:opacity-50"
                    >
                      {flagging ? t('pages.portal.submitting') : copy.submitDispute}
                    </button>
                  </div>
                </div>
              )}

              {/* Resolved dispute */}
              {dispute && !['open', 'under_review'].includes(dispute.status) && (
                <div className="border border-border bg-card p-5">
                  <div className="flex items-start gap-3">
                    <ShieldCheck size={18} className="text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-foreground mb-1">{t('pages.portal.disputeResolved', { defaultValue: 'Dispute Resolved' })}</p>
                      <p className="text-[11px] text-muted-foreground">
                        <span className="capitalize">{copy.statuses[dispute.status] || dispute.status.replace(/_/g, ' ')}</span>
                      </p>
                      {dispute.resolution && <p className="text-[11px] text-muted-foreground mt-1">{dispute.resolution}</p>}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {order.paymentMethod && (
            <div className="border border-border p-5">
              <h2 className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-3">{t('pages.portal.paymentMethod')}</h2>
              <p className="text-xs text-foreground capitalize">{order.paymentMethod === 'bank_transfer' ? escrowCopy.bank : order.paymentMethod.replace('_', ' ')}</p>
            </div>
          )}
        </div>
      </div>

      {order.escrowStatus === 'funds_released' && order.dealerId && (
        <div className="mt-6 border border-primary/30 bg-primary/5 p-5">
          <div className="flex items-start gap-3">
            <Star size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs font-medium text-primary mb-1">{copy.rate}</p>
              <p className="text-[11px] text-muted-foreground mb-3">{copy.reviewHint}</p>
              <LocalizedLink to={`/dealer-profile/${order.dealerId}`} className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-[11px] tracking-[0.12em] uppercase px-4 py-2.5">
                {copy.review} →
              </LocalizedLink>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6">
        {protectedOrder && <EscrowTrustBadge />}
      </div>
    </div>
  );
}
