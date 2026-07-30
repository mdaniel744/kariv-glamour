'use client';

import { AuthenticateWithRedirectCallback } from '@clerk/nextjs';

export default function SsoCallbackPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-6 h-6 border-2 border-border border-t-primary rounded-full animate-spin" />
      <AuthenticateWithRedirectCallback />
    </div>
  );
}
