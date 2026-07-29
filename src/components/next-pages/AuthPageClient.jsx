'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const AUTH_PAGES = {
  login: dynamic(() => import('@/page-content/Login')),
  register: dynamic(() => import('@/page-content/Register')),
  forgotPassword: dynamic(() => import('@/page-content/ForgotPassword')),
  resetPassword: dynamic(() => import('@/page-content/ResetPassword')),
};

export default function AuthPageClient({ pageKey }) {
  const Page = AUTH_PAGES[pageKey];
  return Page ? <Page /> : null;
}
