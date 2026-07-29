import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/languageContext';

/**
 * A drop-in replacement for <Link> that automatically prefixes
 * the current locale to the target path.
 *
 * Usage: <LocalizedLink to="/shop">Shop</LocalizedLink>
 * Renders: <Link to="/de/shop">Shop</Link>  (when locale is 'de')
 */
export default function LocalizedLink({ to, children, ...props }) {
  const { localePath } = useLanguage();
  const href = localePath(to);

  if (typeof href === 'string' && (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:'))) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}
