'use client';

import React from 'react';
import LegalPage from '@/pages/LegalPage';

export default function LegalPageClient({ slug, page }) {
  return <LegalPage slug={slug} initialPage={page} />;
}
