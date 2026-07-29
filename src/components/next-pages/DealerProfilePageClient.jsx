'use client';

import React from 'react';
import DealerProfile from '@/page-content/DealerProfile';

export default function DealerProfilePageClient({ dealerId, profile, listings, reviews }) {
  return (
    <DealerProfile
      id={dealerId}
      initialProfile={profile}
      initialListings={listings}
      initialReviews={reviews}
    />
  );
}
