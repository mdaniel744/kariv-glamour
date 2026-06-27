import React from 'react';
import { BRAND_FAVICONS } from '@/lib/constants';
import { useTheme } from '@/lib/themeContext';

/**
 * Theme-aware brand favicon (small brand mark).
 * Renders the `light` variant (dark mark) on light backgrounds and the
 * `dark` variant (white mark) on dark backgrounds.
 *
 * Unlike BrandLogo, this does NOT fall back across themes: if the
 * theme-appropriate variant is missing, it returns null so the caller
 * can render plain text instead. This avoids an invisible dark mark on
 * a dark background (or vice versa).
 */
export default function BrandFavicon({ slug, className = '', alt = '' }) {
  const { theme } = useTheme();
  const entry = slug ? BRAND_FAVICONS[slug] : null;
  if (!entry) return null;

  const src = theme === 'dark' ? entry.dark : entry.light;
  if (!src) return null;

  return <img src={src} alt={alt} className={className} />;
}