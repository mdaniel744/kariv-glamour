'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Check, HandCoins, RefreshCw, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { listKarivOffers, respondToKarivOffer } from '@/actions/dealerInquiries';
import DealerInquirySummary from '@/components/dealer/DealerInquirySummary';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/lib/languageContext';

const FILTERS = ['pending', 'accepted', 'declined', 'all'];

export default function AdminKarivOffers() {
  const { t } = useTranslation();
  const { locale } = useLanguage();
  const { toast } = useToast();
  const copy = ({
    de: {
      eyebrow: 'Kariv Direktverkauf', title: 'Preisangebote', description: 'Prüfen Sie Angebote für Uhren aus dem eigenen Kariv-Bestand.',
      pending: 'Offen', accepted: 'Angenommen', declined: 'Abgelehnt', all: 'Alle', refresh: 'Aktualisieren',
      loading: 'Angebote werden geladen…', empty: 'Für diesen Filter liegen keine Angebote vor.', buyer: 'Käufer',
      responseNote: 'Optionale Antwort an den Käufer', accept: 'Annehmen', decline: 'Ablehnen', responding: 'Wird gespeichert…',
      loadError: 'Angebote konnten nicht geladen werden.', actionError: 'Antwort konnte nicht gespeichert werden.', saved: 'Antwort gespeichert.',
    },
    cs: {
      eyebrow: 'Přímý prodej Kariv', title: 'Cenové nabídky', description: 'Posuzujte nabídky na hodinky z vlastního skladu Kariv.',
      pending: 'Čekající', accepted: 'Přijaté', declined: 'Odmítnuté', all: 'Vše', refresh: 'Obnovit',
      loading: 'Načítání nabídek…', empty: 'Pro tento filtr nejsou žádné nabídky.', buyer: 'Kupující',
      responseNote: 'Volitelná odpověď kupujícímu', accept: 'Přijmout', decline: 'Odmítnout', responding: 'Ukládání…',
      loadError: 'Nabídky se nepodařilo načíst.', actionError: 'Odpověď se nepodařilo uložit.', saved: 'Odpověď uložena.',
    },
    en: {
      eyebrow: 'Kariv direct sales', title: 'Product offers', description: 'Review buyer offers for watches owned directly by Kariv.',
      pending: 'Pending', accepted: 'Accepted', declined: 'Declined', all: 'All', refresh: 'Refresh',
      loading: 'Loading offers…', empty: 'There are no offers in this view.', buyer: 'Buyer',
      responseNote: 'Optional response to buyer', accept: 'Accept', decline: 'Decline', responding: 'Saving…',
      loadError: 'Offers could not be loaded.', actionError: 'The response could not be saved.', saved: 'Response saved.',
    },
  })[locale] || {};
  const [filter, setFilter] = useState('pending');
  const [offers, setOffers] = useState([]);
  const [messages, setMessages] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [respondingId, setRespondingId] = useState(null);

  const loadOffers = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const result = await listKarivOffers(filter === 'all' ? { limit: 100 } : { status: filter, limit: 100 });
      if (!result.ok) {
        setError(result.error || copy.loadError);
        return;
      }
      setOffers(result.inquiries);
    } catch (loadError) {
      setError(loadError?.message || copy.loadError);
    } finally {
      setLoading(false);
    }
  }, [copy.loadError, filter]);

  useEffect(() => {
    loadOffers();
  }, [loadOffers]);

  const respond = async (offer, action) => {
    setRespondingId(offer.id);
    try {
      const result = await respondToKarivOffer({
        inquiryId: offer.id,
        action,
        message: messages[offer.id] || '',
      });
      if (!result.ok) {
        toast({ title: copy.actionError, description: result.error, variant: 'destructive' });
        return;
      }
      setOffers((current) => filter === 'pending'
        ? current.filter((item) => item.id !== offer.id)
        : current.map((item) => item.id === offer.id ? result.inquiry : item));
      toast({ title: copy.saved });
    } catch (actionError) {
      toast({ title: copy.actionError, description: actionError?.message, variant: 'destructive' });
    } finally {
      setRespondingId(null);
    }
  };

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-7 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
            <HandCoins size={16} /> {copy.eyebrow}
          </p>
          <h1 className="font-display text-3xl font-light text-foreground">{copy.title}</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{copy.description}</p>
        </div>
        <button type="button" onClick={loadOffers} disabled={loading} className="inline-flex items-center gap-2 self-start rounded-full border border-border px-4 py-2.5 text-[10px] uppercase tracking-[0.12em] text-foreground hover:border-primary disabled:opacity-50 lg:self-auto">
          <RefreshCw size={13} className={loading ? 'animate-spin' : ''} /> {copy.refresh}
        </button>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {FILTERS.map((value) => (
          <button key={value} type="button" onClick={() => setFilter(value)} className={`rounded-full border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.1em] ${filter === value ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-muted-foreground hover:border-primary hover:text-primary'}`}>
            {copy[value]}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="rounded-2xl border border-border bg-card p-8 text-sm text-muted-foreground">{copy.loading}</p>
      ) : error ? (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-8 text-sm text-destructive">{error}</div>
      ) : offers.length === 0 ? (
        <p className="rounded-2xl border border-border bg-card p-10 text-center text-sm text-muted-foreground">{copy.empty}</p>
      ) : (
        <div className="space-y-4">
          {offers.map((offer) => (
            <article key={offer.id} className="rounded-2xl border border-border bg-card p-4 sm:p-6">
              <DealerInquirySummary inquiry={offer} counterpartLabel={copy.buyer} counterpartName={offer.buyerName} locale={locale} t={t} />
              {offer.status === 'pending' && (
                <div className="mt-5 border-t border-border pt-5 sm:ml-36">
                  <label className="block">
                    <span className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{copy.responseNote}</span>
                    <textarea rows={3} maxLength={2000} value={messages[offer.id] || ''} onChange={(event) => setMessages((current) => ({ ...current, [offer.id]: event.target.value }))} className="mt-2 w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary" />
                  </label>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button type="button" onClick={() => respond(offer, 'accept')} disabled={respondingId === offer.id} className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white disabled:opacity-50">
                      <Check size={13} /> {respondingId === offer.id ? copy.responding : copy.accept}
                    </button>
                    <button type="button" onClick={() => respond(offer, 'decline')} disabled={respondingId === offer.id} className="inline-flex items-center gap-2 rounded-full border border-red-500/50 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-red-400 disabled:opacity-50">
                      <X size={13} /> {respondingId === offer.id ? copy.responding : copy.decline}
                    </button>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
