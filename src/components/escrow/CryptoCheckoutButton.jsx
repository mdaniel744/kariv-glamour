import React, { useState } from 'react';
import { Bitcoin, Loader2, ExternalLink } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function CryptoCheckoutButton({ orderId, escrowReference }) {
  const [checkoutUrl, setCheckoutUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateCheckout = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await base44.functions.invoke('createCryptoCheckout', { orderId });
      setCheckoutUrl(res.data.checkoutUrl);
    } catch (e) {
      setError(e.response?.data?.error || 'Failed to initialize crypto payment');
    } finally {
      setLoading(false);
    }
  };

  if (checkoutUrl) {
    return (
      <div className="space-y-2 text-xs mb-4">
        <a
          href={checkoutUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium py-3 hover:bg-primary/90 transition-colors"
        >
          <Bitcoin size={14} /> Pay with Crypto <ExternalLink size={12} />
        </a>
        <p className="text-muted-foreground pt-1">
          You will be redirected to our secure payment provider. Do not send funds directly to a wallet address.
        </p>
        <div className="flex justify-between pt-1">
          <span className="text-muted-foreground">Reference:</span>
          <span className="text-primary font-mono font-bold">{escrowReference}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2 text-xs mb-4">
      {error && <p className="text-destructive">{error}</p>}
      <button
        onClick={handleCreateCheckout}
        disabled={loading}
        className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium py-3 hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        {loading ? <><Loader2 size={14} className="animate-spin" /> Initializing...</> : <><Bitcoin size={14} /> Start Crypto Payment</>}
      </button>
      <p className="text-muted-foreground pt-1">
        You will be redirected to our secure payment provider. Do not send funds directly to a wallet address.
      </p>
      <div className="flex justify-between pt-1">
        <span className="text-muted-foreground">Reference:</span>
        <span className="text-primary font-mono font-bold">{escrowReference}</span>
      </div>
    </div>
  );
}