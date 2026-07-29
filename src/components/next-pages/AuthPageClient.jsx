'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const AUTH_PAGES = {
  login: dynamic(() => import('@/pages/Login')),
  register: dynamic(() => import('@/pages/Register')),
  forgotPassword: dynamic(() => import('@/pages/ForgotPassword')),
  resetPassword: dynamic(() => import('@/pages/ResetPassword')),
};

export default function AuthPageClient({ pageKey }) {
  const Page = AUTH_PAGES[pageKey];
  return Page ? <Page /> : null;
}
