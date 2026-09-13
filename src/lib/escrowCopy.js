import { ESCROW_STATUS_LABELS, ESCROW_STATUS_DESCRIPTIONS, ESCROW_STEPS } from './escrowConstants.js';

// Presentation only: canonical status values and payment transitions are unchanged.
const COPY = {
  en: {
    labels: ESCROW_STATUS_LABELS,
    descriptions: ESCROW_STATUS_DESCRIPTIONS,
    steps: Object.fromEntries(ESCROW_STEPS.map((step) => [step.key, step.label])),
    secured: 'Secured by Kariv Escrow',
    bank: 'Bank Transfer',
    bankDescription: 'Transfer to our escrow bank account with your order reference.',
    active: 'Buyer Protection Active',
    protection: 'Kariv Glamour Buyer Protection',
    protectionDescription: 'Your payment is held safely in escrow and only released to the dealer after you confirm receipt and authenticity of your watch.',
  },
  cs: {
    labels: {
      pending_review: 'Čeká na potvrzení prodejcem',
      dealer_accepted: 'Prodejce potvrdil — čeká na platbu',
      funds_secured: 'Prostředky zajištěny',
      shipped: 'Hodinky odeslány',
      verified: 'Doručení potvrzeno',
      funds_released: 'Prostředky uvolněny prodejci',
      cancelled: 'Objednávka zrušena',
    },
    descriptions: {
      pending_review: 'Objednávka byla odeslána. Náš tým Kariv ověřuje dostupnost u prodejce.',
      dealer_accepted: 'Prodejce potvrdil dostupnost. Pokračujte prosím platbou pro zajištění objednávky.',
      funds_secured: 'Vaše platba byla přijata a je bezpečně uložena v úschově. Prodejce dostal pokyn k odeslání hodinek. Prostředky budou uvolněny až po 14denní lhůtě pro kontrolu, která začíná doručením potvrzeným přepravcem.',
      shipped: 'Vaše hodinky byly odeslány. Informace pro sledování najdete níže. Jakmile přepravce potvrdí doručení, automaticky začne 14denní lhůta pro kontrolu.',
      verified: 'Přepravce potvrdil doručení. Nyní běží vaše 14denní lhůta pro kontrolu. Případné problémy můžete nahlásit zahájením sporu u této objednávky. Pokud spor nezahájíte, prostředky budou po uplynutí lhůty uvolněny prodejci.',
      funds_released: 'Transakce je dokončena. Skončila 14denní lhůta pro kontrolu a prostředky byly uvolněny prodejci.',
      cancelled: 'Tato objednávka byla zrušena.',
    },
    steps: { pending_review: 'Objednáno', dealer_accepted: 'Prodejce potvrdil', funds_secured: 'Platba zajištěna', shipped: 'Odesláno', verified: 'Doručeno', funds_released: 'Dokončeno' },
    secured: 'Zajištěno úschovou Kariv',
    bank: 'Bankovní převod',
    bankDescription: 'Převeďte prostředky na náš úschovní účet s referencí objednávky.',
    active: 'Ochrana kupujícího aktivní',
    protection: 'Ochrana kupujícího Kariv Glamour',
    protectionDescription: 'Vaše platba je bezpečně uchována v úschově a uvolněna prodejci až po potvrzení převzetí a pravosti hodinek.',
  },
  de: {
    labels: {
      pending_review: 'Prüfung durch Händler ausstehend',
      dealer_accepted: 'Vom Händler bestätigt — Zahlung ausstehend',
      funds_secured: 'Zahlung gesichert',
      shipped: 'Uhr versandt',
      verified: 'Zustellung bestätigt',
      funds_released: 'Guthaben an Händler freigegeben',
      cancelled: 'Bestellung storniert',
    },
    descriptions: {
      pending_review: 'Ihre Bestellung wurde aufgegeben. Unser Kariv-Team prüft die Verfügbarkeit beim Händler.',
      dealer_accepted: 'Der Händler hat die Verfügbarkeit bestätigt. Bitte bezahlen Sie jetzt, um die Bestellung zu sichern.',
      funds_secured: 'Ihre Zahlung ist eingegangen und im Treuhandkonto gesichert. Der Händler wurde zum Versand aufgefordert. Das Guthaben wird erst nach der 14-tägigen Prüffrist freigegeben, die mit der vom Kurier bestätigten Zustellung beginnt.',
      shipped: 'Ihre Uhr wurde versandt. Die Sendungsverfolgung finden Sie unten. Sobald der Kurier die Zustellung bestätigt, beginnt die 14-tägige Prüffrist automatisch.',
      verified: 'Unser Kurierdienst hat die Zustellung bestätigt. Ihre 14-tägige Prüffrist läuft jetzt. Bei Bedenken können Sie zu dieser Bestellung einen Streitfall melden. Ohne Streitfall wird das Guthaben nach Ablauf der Prüffrist an den Händler freigegeben.',
      funds_released: 'Transaktion abgeschlossen. Die 14-tägige Prüffrist ist abgelaufen und das Guthaben wurde an den Händler freigegeben.',
      cancelled: 'Diese Bestellung wurde storniert.',
    },
    steps: { pending_review: 'Bestellt', dealer_accepted: 'Händler bestätigt', funds_secured: 'Zahlung gesichert', shipped: 'Versandt', verified: 'Zugestellt', funds_released: 'Abgeschlossen' },
    secured: 'Gesichert durch Kariv Treuhandservice',
    bank: 'Banküberweisung',
    bankDescription: 'Überweisen Sie mit Ihrer Bestellreferenz auf unser Treuhandkonto.',
    active: 'Käuferschutz aktiv',
    protection: 'Kariv Glamour Käuferschutz',
    protectionDescription: 'Ihre Zahlung wird sicher im Treuhandkonto verwahrt und erst an den Händler freigegeben, nachdem Sie Empfang und Echtheit Ihrer Uhr bestätigt haben.',
  },
};

export function getEscrowCopy(locale = 'en') {
  return COPY[locale] || COPY.en;
}
