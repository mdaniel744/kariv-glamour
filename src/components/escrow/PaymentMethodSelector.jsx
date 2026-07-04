import React, { useState, useEffect } from 'react';
import { Building2, Bitcoin, Check, ShieldCheck, Loader2 } from 'lucide-react';
import { PAYMENT_METHODS } from '@/lib/escrowConstants';
import { base44 } from '@/api/base44Client';

const ICON_MAP = { Building2, Bitcoin };

export default function PaymentMethodSelector({ selected, onSelect, escrowReference, orderId }) {
  const [expanded, setExpanded] = useState(null);
  const [cryptoCheckoutUrl, setCryptoCheckoutUrl] = useState(null);
  const [cryptoLoading, setCryptoLoading] = useState(false);
  const [cryptoError, setCryptoError] = useState(null);

  // When crypto is selected and we have an orderId, fetch the hosted checkout URL
  useEffect(() => {
    if (selected === 'crypto' && orderId && !cryptoCheckoutUrl) {
      setCryptoLoading(true);
      setCryptoError(null);
      base44.functions.invoke('createCryptoCheckout', { orderId })
        .then(res => {
          setCryptoCheckoutUrl(res.data.checkoutUrl);
        })
        .catch(e => {
          setCryptoError(e.response?.data?.error || 'Failed to initialize crypto payment');
        })
        .finally(() => setCryptoLoading(false));
    }
  }, [selected, orderId, cryptoCheckoutUrl]);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <ShieldCheck size={16} className="text-primary" />
        <p className="text-[10px] tracking-[0.15em] uppercase text-primary font-medium">
          Secured by Kariv Escrow
        </p>
      </div>

      {PAYMENT_METHODS.map(method => {
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
                <p className="text-sm font-medium text-foreground">{method.label}</p>
                <p className="text-xs text-muted-foreground">{method.description}</p>
              </div>
              {isSelected && <Check size={18} className="text-primary" />}
            </button>

            {isExpanded && isSelected && (
              <div className="px-4 pb-4 border-t border-border/50 pt-3">
                {method.key === 'bank_transfer' && (
                  <div className="space-y-1.5 text-xs">
                    <p className="text-muted-foreground">
                      Bank transfer details will be provided after the dealer confirms availability.
                      Use your Escrow Reference as the payment reference.
                    </p>
                    <div className="flex justify-between pt-1">
                      <span className="text-muted-foreground">Reference:</span>
                      <span className="text-primary font-mono font-bold">{escrowReference}</span>
                    </div>
                  </div>
                )}
                {method.key === 'crypto' && (
                  <div className="space-y-2 text-xs">
                    {cryptoLoading && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Loader2 size={14} className="animate-spin" />
                        <span>Initializing secure crypto checkout...</span>
                      </div>
                    )}
                    {cryptoError && (
                      <p className="text-destructive">{cryptoError}</p>
                    )}
                    {cryptoCheckoutUrl && (
                      <a
                        href={cryptoCheckoutUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium py-3 hover:bg-primary/90 transition-colors"
                      >
                        <Bitcoin size={14} /> Pay with Crypto
                      </a>
                    )}
                    {!cryptoLoading && !cryptoCheckoutUrl && !cryptoError && !orderId && (
                      <p className="text-muted-foreground">
                        Crypto checkout will be available after your order is confirmed.
                      </p>
                    )}
                    <p className="text-muted-foreground pt-1">
                      You will be redirected to our secure payment provider. Do not send funds directly to a wallet address.
                    </p>
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