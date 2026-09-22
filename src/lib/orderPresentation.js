const DIRECT_COPY = {
  en: {
    labels: {
      pending_review: 'Order placed',
      dealer_accepted: 'Ready for payment',
      funds_secured: 'Payment confirmed',
      shipped: 'Watch shipped',
      verified: 'Delivery confirmed',
      funds_released: 'Order completed',
      cancelled: 'Order cancelled',
    },
    descriptions: {
      pending_review: 'Your order has been placed and availability is being confirmed.',
      dealer_accepted: 'Availability is confirmed. Follow the payment instructions shown for this order.',
      funds_secured: 'Payment has been confirmed. The watch is being prepared for insured shipment.',
      shipped: 'Your watch has been shipped. Tracking information is shown below.',
      verified: 'Courier delivery has been confirmed. Contact Kariv support promptly if there is a problem with the order.',
      funds_released: 'This order is complete.',
      cancelled: 'This order has been cancelled.',
    },
    steps: {
      pending_review: 'Order placed',
      dealer_accepted: 'Confirmed',
      funds_secured: 'Paid',
      shipped: 'Shipped',
      verified: 'Delivered',
      funds_released: 'Complete',
    },
    routeLabels: {
      kariv_direct: 'Sold by Kariv',
      dealer_direct: 'Direct dealer purchase',
      escrow: 'Kariv Protected Payment',
      manual_review: 'Manual review required',
    },
  },
  de: {
    labels: {
      pending_review: 'Bestellung aufgegeben',
      dealer_accepted: 'Zahlungsbereit',
      funds_secured: 'Zahlung bestätigt',
      shipped: 'Uhr versandt',
      verified: 'Zustellung bestätigt',
      funds_released: 'Bestellung abgeschlossen',
      cancelled: 'Bestellung storniert',
    },
    descriptions: {
      pending_review: 'Ihre Bestellung wurde aufgegeben und die Verfügbarkeit wird bestätigt.',
      dealer_accepted: 'Die Verfügbarkeit ist bestätigt. Folgen Sie den Zahlungsanweisungen dieser Bestellung.',
      funds_secured: 'Die Zahlung wurde bestätigt. Die Uhr wird für den versicherten Versand vorbereitet.',
      shipped: 'Ihre Uhr wurde versandt. Die Sendungsverfolgung finden Sie unten.',
      verified: 'Die Zustellung durch den Kurier wurde bestätigt. Wenden Sie sich bei Problemen umgehend an den Kariv-Support.',
      funds_released: 'Diese Bestellung ist abgeschlossen.',
      cancelled: 'Diese Bestellung wurde storniert.',
    },
    steps: {
      pending_review: 'Bestellt',
      dealer_accepted: 'Bestätigt',
      funds_secured: 'Bezahlt',
      shipped: 'Versandt',
      verified: 'Zugestellt',
      funds_released: 'Fertig',
    },
    routeLabels: {
      kariv_direct: 'Verkauf durch Kariv',
      dealer_direct: 'Direktkauf beim Händler',
      escrow: 'Kariv geschützte Zahlung',
      manual_review: 'Manuelle Prüfung erforderlich',
    },
  },
  cs: {
    labels: {
      pending_review: 'Objednávka vytvořena',
      dealer_accepted: 'Připraveno k platbě',
      funds_secured: 'Platba potvrzena',
      shipped: 'Hodinky odeslány',
      verified: 'Doručení potvrzeno',
      funds_released: 'Objednávka dokončena',
      cancelled: 'Objednávka zrušena',
    },
    descriptions: {
      pending_review: 'Objednávka byla vytvořena a nyní se ověřuje dostupnost.',
      dealer_accepted: 'Dostupnost byla potvrzena. Postupujte podle platebních pokynů u této objednávky.',
      funds_secured: 'Platba byla potvrzena. Hodinky se připravují k pojištěnému odeslání.',
      shipped: 'Hodinky byly odeslány. Informace o sledování zásilky najdete níže.',
      verified: 'Kurýr potvrdil doručení. Pokud je s objednávkou problém, neprodleně kontaktujte podporu Kariv.',
      funds_released: 'Tato objednávka je dokončena.',
      cancelled: 'Tato objednávka byla zrušena.',
    },
    steps: {
      pending_review: 'Objednáno',
      dealer_accepted: 'Potvrzeno',
      funds_secured: 'Zaplaceno',
      shipped: 'Odesláno',
      verified: 'Doručeno',
      funds_released: 'Hotovo',
    },
    routeLabels: {
      kariv_direct: 'Prodává Kariv',
      dealer_direct: 'Přímý nákup od prodejce',
      escrow: 'Chráněná platba Kariv',
      manual_review: 'Je nutná ruční kontrola',
    },
  },
};

export const ORDER_WORKFLOW_STEPS = [
  'pending_review',
  'dealer_accepted',
  'funds_secured',
  'shipped',
  'verified',
  'funds_released',
];

export function isProtectedOrder(order) {
  return order?.purchaseRoute === 'escrow';
}

export function getDirectOrderCopy(locale = 'en') {
  return DIRECT_COPY[locale] || DIRECT_COPY.en;
}

export function getPurchaseRouteLabel(order, locale = 'en') {
  const route = order?.purchaseRoute || (order?.dealerId ? 'escrow' : 'kariv_direct');
  return getDirectOrderCopy(locale).routeLabels[route] || route;
}
