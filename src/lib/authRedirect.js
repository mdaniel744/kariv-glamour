/**
 * Safe returnTo URL handling for auth pages.
 * Prevents open redirects by validating returnTo is a same-origin relative URL.
 */

export function getSafeReturnUrl(returnTo = null, fallback = '/') {
  if (!returnTo || typeof returnTo !== 'string') return fallback;

  const trimmed = returnTo.trim();

  // Only allow relative URLs (start with /)
  if (!trimmed.startsWith('/')) return fallback;

  // Prevent protocol-based redirects (//example.com)
  if (trimmed.startsWith('//')) return fallback;

  // Disallow javascript: and data: URIs
  if (trimmed.startsWith('javascript:') || trimmed.startsWith('data:')) return fallback;

  return trimmed;
}

export function getReturnUrl() {
  const params = new URLSearchParams(window.location.search);
  return getSafeReturnUrl(params.get('returnTo'));
}