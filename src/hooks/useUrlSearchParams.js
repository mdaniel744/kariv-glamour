import { useCallback, useEffect, useMemo, useState } from 'react';

function getCurrentSearch() {
  return typeof window === 'undefined' ? '' : window.location.search;
}

function toSearchString(nextInit) {
  const params = nextInit instanceof URLSearchParams ? nextInit : new URLSearchParams(nextInit);
  const serialized = params.toString();
  return serialized ? `?${serialized}` : '';
}

/**
 * Small router-neutral replacement for react-router's useSearchParams.
 * It works in the legacy Pages Router fallback and native App Router pages.
 */
export function useUrlSearchParams() {
  const [search, setSearch] = useState(getCurrentSearch);

  useEffect(() => {
    const syncSearch = () => setSearch(getCurrentSearch());
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;
    const notifyUrlChange = () => window.dispatchEvent(new Event('kariv:urlchange'));

    // Next.js client-side links update the History API without emitting a
    // popstate event. Mirror those updates so landing-page query parameters
    // are available when the Shop route mounts during a client transition.
    const pushStateWithNotification = function pushStateWithNotification(...args) {
      const result = originalPushState.apply(this, args);
      notifyUrlChange();
      return result;
    };
    const replaceStateWithNotification = function replaceStateWithNotification(...args) {
      const result = originalReplaceState.apply(this, args);
      notifyUrlChange();
      return result;
    };

    window.history.pushState = pushStateWithNotification;
    window.history.replaceState = replaceStateWithNotification;
    window.addEventListener('popstate', syncSearch);
    window.addEventListener('kariv:urlchange', syncSearch);
    syncSearch();

    return () => {
      window.removeEventListener('popstate', syncSearch);
      window.removeEventListener('kariv:urlchange', syncSearch);
      if (window.history.pushState === pushStateWithNotification) {
        window.history.pushState = originalPushState;
      }
      if (window.history.replaceState === replaceStateWithNotification) {
        window.history.replaceState = originalReplaceState;
      }
    };
  }, []);

  const searchParams = useMemo(() => new URLSearchParams(search), [search]);

  const setSearchParams = useCallback((nextInit, options = {}) => {
    if (typeof window === 'undefined') return;

    const nextSearch = toSearchString(nextInit);
    const nextUrl = `${window.location.pathname}${nextSearch}${window.location.hash}`;
    const method = options.replace ? 'replaceState' : 'pushState';

    window.history[method]({}, '', nextUrl);
    setSearch(window.location.search);
    window.dispatchEvent(new Event('kariv:urlchange'));
  }, []);

  return [searchParams, setSearchParams];
}
