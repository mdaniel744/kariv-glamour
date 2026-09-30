export const GOOGLE_ADS_TAG_ID = 'AW-17312885621';
export const GOOGLE_ADS_CONSENT_KEY = 'kariv-google-ads-consent-v1';

// The inline bootstrap belongs in <head> on every locale route. It defines the
// supplied Google tag, but loads Google's external script only after opt-in.
export function googleAdsBootstrap() {
  return `
    (() => {
      const tagId = ${JSON.stringify(GOOGLE_ADS_TAG_ID)};
      const consentKey = ${JSON.stringify(GOOGLE_ADS_CONSENT_KEY)};
      const denied = { ad_storage: 'denied', analytics_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' };
      // This choice covers Ads measurement, not analytics or personalized ads.
      const granted = { ad_storage: 'granted', analytics_storage: 'denied', ad_user_data: 'granted', ad_personalization: 'denied' };
      window.dataLayer = window.dataLayer || [];
      window.gtag = function(){ window.dataLayer.push(arguments); };
      window.gtag('consent', 'default', denied);
      let loaded = false;
      let choice = null;
      try { choice = localStorage.getItem(consentKey); } catch (_) {}

      function loadTag() {
        if (loaded) return;
        loaded = true;
        window.gtag('js', new Date());
        window.gtag('config', tagId);
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(tagId);
        document.head.appendChild(script);
      }

      window.karivGoogleAds = {
        choice: () => choice,
        grant: () => {
          choice = 'granted';
          try { localStorage.setItem(consentKey, choice); } catch (_) {}
          window.gtag('consent', 'update', granted);
          loadTag();
        },
        deny: () => {
          choice = 'denied';
          try { localStorage.setItem(consentKey, choice); } catch (_) {}
          window.gtag('consent', 'update', denied);
        },
      };
      if (choice === 'granted') window.karivGoogleAds.grant();
    })();
  `;
}

export function purchaseEventPayload(order) {
  const transactionId = String(order?.id || '').trim();
  const value = Number(order?.totalAmount);
  const currency = String(order?.currency || '').toUpperCase();
  if (!transactionId || !Number.isFinite(value) || value <= 0 || !/^[A-Z]{3}$/.test(currency)) return null;
  return { transaction_id: transactionId, value, currency };
}

// An order created at checkout is the conversion point chosen by Kariv. It
// may still be awaiting payment; never send customer contact details to Google.
export function trackCheckoutOrderCreated(order) {
  if (typeof window === 'undefined' || window.karivGoogleAds?.choice() !== 'granted' || typeof window.gtag !== 'function') return false;
  const payload = purchaseEventPayload(order);
  if (!payload) return false;
  const key = `kariv-google-ads-purchase:${payload.transaction_id}`;
  try {
    if (window.sessionStorage.getItem(key)) return false;
  } catch (_) {}
  window.gtag('event', 'purchase', payload);
  try { window.sessionStorage.setItem(key, '1'); } catch (_) {}
  return true;
}
