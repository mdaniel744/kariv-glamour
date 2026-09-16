import React from 'react';
import MediaImage from '@/components/shared/MediaImage';

// Match the root theme class, including the device preference applied before
// hydration. Keep the supplied square artwork intact instead of cropping it
// into the old wordmark's wide aspect ratio.
export default function KarivLogo({ className = '', sizes = '80px', loading = 'lazy' }) {
  return (
    <span className={`inline-block shrink-0 align-middle ${className}`}>
      <MediaImage
        src="/logos/kariv-emblem-light.png"
        alt="Kariv Glamour"
        width={1254}
        height={1254}
        sizes={sizes}
        quality={90}
        loading={loading}
        className="block h-full w-full object-contain dark:hidden"
        draggable={false}
      />
      <MediaImage
        src="/logos/kariv-emblem-dark.png"
        alt="Kariv Glamour"
        width={1254}
        height={1254}
        sizes={sizes}
        quality={90}
        loading={loading}
        className="hidden h-full w-full object-contain dark:block"
        draggable={false}
      />
    </span>
  );
}
