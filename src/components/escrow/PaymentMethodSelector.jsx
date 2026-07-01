import React, { useState } from 'react';
import { Building2, CreditCard, Bitcoin, Check, ShieldCheck } from 'lucide-react';
import { PAYMENT_METHODS } from '@/lib/escrowConstants';

const ICON_MAP = { Building2, CreditCard, Bitcoin };

export default function PaymentMethodSelector({ selected, onSelect, escrowReference }) {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <ShieldCheck size={16} className="text-primary" />
        <p className="text-[10px] tracking-[0.15em] uppercase text-primary font-medium">
          Secured by Kariv Escrow
        </p>
      </div>

      {PAYMENT_METHODS.map(method => {
        const Icon = ICON_MAP[method.icon] || CreditCard;
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
                <p className="text-sm font-medium text-foreground">{method.label}</p>
                <p className="text-xs text-muted-foreground">{method.description}</p>
              </div>
              {isSelected && <Check size={18} className="text-primary" />}
            </button>

            {isExpanded && isSelected && method.details && (
              <div className="px-4 pb-4 border-t border-border/50 pt-3">
                {method.key === 'bank_transfer' && (
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between"><span className="text-muted-foreground">Bank:</span><span className="text-foreground">{method.details.bankName}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">IBAN:</span><span className="text-foreground font-mono">{method.details.iban}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">BIC:</span><span className="text-foreground font-mono">{method.details.bic}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Reference:</span><span className="text-primary font-mono font-bold">{escrowReference}</span></div>
                  </div>
                )}
                {method.key === 'crypto' && (
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between"><span className="text-muted-foreground">BTC:</span><span className="text-foreground font-mono break-all">{method.details.btcAddress}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">ETH/USDT:</span><span className="text-foreground font-mono break-all">{method.details.ethAddress}</span></div>
                    <p className="text-muted-foreground pt-1">{method.details.note}</p>
                    <div className="flex justify-between pt-1"><span className="text-muted-foreground">Reference:</span><span className="text-primary font-mono font-bold">{escrowReference}</span></div>
                  </div>
                )}

              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}