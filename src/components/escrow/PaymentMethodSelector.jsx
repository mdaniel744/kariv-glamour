import React, { useState } from 'react';
import { Building2, Check, ShieldCheck } from 'lucide-react';
import { PAYMENT_METHODS } from '@/lib/escrowConstants';
import { getEscrowCopy } from '@/lib/escrowCopy';
import { useLanguage } from '@/lib/languageContext';
import { useTranslation } from 'react-i18next';

const ICON_MAP = { Building2 };

// Crypto is deferred for v1 (no gateway, no manual-crypto flow built yet) —
// filtered here rather than removed from PAYMENT_METHODS so re-enabling it
// later is a one-line change.
const AVAILABLE_METHODS = PAYMENT_METHODS.filter(m => m.key === 'bank_transfer');

const DIRECT_COPY = {
  en: {
    heading: 'Direct payment to verified seller',
    karivHeading: 'Payment to Kariv',
    description: (seller) => `Pay ${seller || 'the verified seller'} directly using the instructions supplied for this order. This payment is not held in Kariv escrow.`,
    karivDescription: 'Pay Kariv directly using the instructions supplied for this order.',
    reference: 'Use this order reference with your payment.',
  },
  de: {
    heading: 'Direktzahlung an den verifizierten Verkäufer',
    karivHeading: 'Zahlung an Kariv',
    description: (seller) => `Zahlen Sie direkt an ${seller || 'den verifizierten Verkäufer'} gemäß den Anweisungen dieser Bestellung. Diese Zahlung wird nicht von Kariv treuhänderisch verwahrt.`,
    karivDescription: 'Zahlen Sie Kariv direkt gemäß den Anweisungen dieser Bestellung.',
    reference: 'Verwenden Sie diese Bestellreferenz bei Ihrer Zahlung.',
  },
  cs: {
    heading: 'Přímá platba ověřenému prodejci',
    karivHeading: 'Platba společnosti Kariv',
    description: (seller) => `Zaplaťte přímo prodejci ${seller || ''} podle pokynů u objednávky. Tato platba není držena v úschově Kariv.`,
    karivDescription: 'Zaplaťte přímo společnosti Kariv podle pokynů u objednávky.',
    reference: 'U platby použijte tuto referenci objednávky.',
  },
};

export default function PaymentMethodSelector({
  selected,
  onSelect,
  escrowReference = null,
  orderReference = null,
  protectedPayment = true,
  sellerName = '',
  sellerType = 'dealer',
}) {
  const { locale } = useLanguage();
  const { t } = useTranslation();
  const copy = getEscrowCopy(locale);
  const directCopy = DIRECT_COPY[locale] || DIRECT_COPY.en;
  const reference = orderReference || escrowReference;
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <ShieldCheck size={16} className="text-primary" />
        <p className="text-[10px] tracking-[0.15em] uppercase text-primary font-medium">
          {protectedPayment ? copy.secured : sellerType === 'kariv' ? directCopy.karivHeading : directCopy.heading}
        </p>
      </div>

      {AVAILABLE_METHODS.map(method => {
        const Icon = ICON_MAP[method.icon] || Building2;
        const isSelected = selected === method.key;
        const isExpanded = expanded === method.key;

        return (
          <div key={method.key} className={`border transition-colors ${isSelected ? 'border-primary bg-primary/5' : 'border-border'}`}>
            <button
              onClick={() => { onSelect(method.key); setExpanded(method.key); }}
              className="w-full flex items-center gap-4 p-4 text-left"
            >
              <div className={`w-10 h-10 rounded flex items-center justify-center ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                <Icon size={18} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{copy.bank}</p>
                <p className="text-xs text-muted-foreground">
                  {protectedPayment ? copy.bankDescription : sellerType === 'kariv' ? directCopy.karivDescription : directCopy.description(sellerName)}
                </p>
              </div>
              {isSelected && <Check size={18} className="text-primary" />}
            </button>

            {isExpanded && isSelected && (
              <div className="px-4 pb-4 border-t border-border/50 pt-3">
                <div className="space-y-1.5 text-xs">
                  <p className="text-muted-foreground">
                    {protectedPayment ? t('pages.portal.bankTransferInfo') : directCopy.reference}
                  </p>
                  <div className="flex justify-between pt-1">
                    <span className="text-muted-foreground">{t('pages.portal.paymentReference')}:</span>
                    <span className="text-primary font-mono font-bold">{reference}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
