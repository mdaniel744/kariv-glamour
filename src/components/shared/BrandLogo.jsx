import React from 'react';
import { BRAND_LOGOS } from '@/lib/constants';
import { useTheme } from '@/lib/themeContext';

/**
 * Theme-aware brand logo.
 * Renders the `light` variant (dark logo shape) on light backgrounds,
 * and the `dark` variant (white logo shape) on dark backgrounds.
 * Falls back to the light variant if a dark variant is not yet uploaded.
 *
 * Props:
 *   slug     — brand slug (must match a key in BRAND_LOGOS)
 *   alt      — alt text for the image
 *   className — passed through to the <img>
 *   style     — passed through to the <img>
 */
export default function BrandLogo({ slug, alt = '', className = '', style }) {
  const { theme } = useTheme();
  const logo = BRAND_LOGOS[slug];

  if (!logo) return null;

  const src = theme === 'dark' ? logo.dark || logo.light : logo.light;

  if (!src) return null;

  return <img src="https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/cb784ea15_GrandSeiko.svg" alt={alt} className={className} style={style} />;
}