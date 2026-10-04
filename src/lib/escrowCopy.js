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
    protectionDescription: 'For a protected order, your payment remains held during the 14-day period after courier-confirmed delivery. Request a return or report a problem during that period to keep the dealer payout on hold while the case is reviewed. If no case is open, payout may proceed after the period and required checks.',
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
      verified: 'Přepravce potvrdil doručení. Nyní běží vaše 14denní lhůta pro kontrolu. Žádost o vrácení či refundaci nebo jiný problém nahlaste u této objednávky. Pokud není otevřený případ, může po uplynutí lhůty a kontrolách následovat výplata prodejci.',
      funds_released: 'Transakce je dokončena. Skončila 14denní lhůta pro kontrolu a prostředky byly uvolněny prodejci.',
      cancelled: 'Tato objednávka byla zrušena.',
    },
    steps: { pending_review: 'Objednáno', dealer_accepted: 'Prodejce potvrdil', funds_secured: 'Platba zajištěna', shipped: 'Odesláno', verified: 'Doručeno', funds_released: 'Dokončeno' },
    secured: 'Zajištěno úschovou Kariv',
    bank: 'Bankovní převod',
    bankDescription: 'Převeďte prostředky na náš úschovní účet s referencí objednávky.',
    active: 'Ochrana kupujícího aktivní',
    protection: 'Ochrana kupujícího Kariv Glamour',
    protectionDescription: 'U chráněné objednávky zůstává platba zadržena po dobu 14 dnů od doručení potvrzeného dopravcem. Žádost o vrácení nebo nahlášení problému v této lhůtě pozastaví výplatu prodejci po dobu posouzení. Bez otevřeného případu může výplata po skončení lhůty a nutných kontrolách pokračovat.',
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
      verified: 'Unser Kurierdienst hat die Zustellung bestätigt. Ihre 14-tägige Prüffrist läuft jetzt. Melden Sie in dieser Zeit eine Rückgabe, Erstattung oder ein anderes Problem zur Bestellung. Ohne offenen Fall kann die Händlerauszahlung nach Ablauf der Frist und den erforderlichen Prüfungen erfolgen.',
      funds_released: 'Transaktion abgeschlossen. Die 14-tägige Prüffrist ist abgelaufen und das Guthaben wurde an den Händler freigegeben.',
      cancelled: 'Diese Bestellung wurde storniert.',
    },
    steps: { pending_review: 'Bestellt', dealer_accepted: 'Händler bestätigt', funds_secured: 'Zahlung gesichert', shipped: 'Versandt', verified: 'Zugestellt', funds_released: 'Abgeschlossen' },
    secured: 'Gesichert durch Kariv Treuhandservice',
    bank: 'Banküberweisung',
    bankDescription: 'Überweisen Sie mit Ihrer Bestellreferenz auf unser Treuhandkonto.',
    active: 'Käuferschutz aktiv',
    protection: 'Kariv Glamour Käuferschutz',
    protectionDescription: 'Bei einer geschützten Bestellung bleibt Ihre Zahlung 14 Tage nach der vom Versanddienst bestätigten Zustellung zurückgehalten. Eine Rückgabeanfrage oder Problemmeldung in dieser Zeit hält die Händlerauszahlung bis zur Klärung an. Ohne offenen Fall kann sie nach Ablauf der Frist und den erforderlichen Prüfungen erfolgen.',
  },
};

export function getEscrowCopy(locale = 'en') {
  return COPY[locale] || COPY.en;
}
