'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { useUser, useAuth as useClerkAuth, useClerk } from '@clerk/nextjs';

const AuthContext = createContext();

// Base44's `user` object exposed a flat shape (id, full_name, email, role,
// plus address/phone fields). Consumers across the app already read that
// shape — this maps Clerk's `user` object onto the same field names so
// those call sites don't need to change. Address/phone fields have no
// Clerk equivalent (that's customer-profile data, not identity) and are
// deferred along with the rest of the orders/checkout work.
function shapeUser(clerkUser) {
  if (!clerkUser) return null;
  return {
    id: clerkUser.id,
    full_name: clerkUser.fullName || clerkUser.username || '',
    email: clerkUser.primaryEmailAddress?.emailAddress || '',
    role: clerkUser.publicMetadata?.role || 'buyer',
    avatarUrl: clerkUser.imageUrl || '',
  };
}

export const AuthProvider = ({ children }) => {
  const { user: clerkUser, isLoaded: userLoaded } = useUser();
  const { isSignedIn, isLoaded: authLoaded } = useClerkAuth();
  const clerk = useClerk();

  const isLoadingAuth = !userLoaded || !authLoaded;
  const authChecked = userLoaded && authLoaded;
  const user = useMemo(() => shapeUser(clerkUser), [clerkUser]);

  const logout = (shouldRedirect = true) => {
    clerk.signOut(shouldRedirect ? { redirectUrl: window.location.origin } : undefined);
  };

  const navigateToLogin = () => {
    clerk.redirectToSignIn({ redirectUrl: window.location.href });
  };

  // Uploads straight to Clerk's own image storage — every Clerk user already
  // has an avatar slot, so this needs no Supabase table/column of its own.
  const updateProfileImage = async (file) => {
    if (!clerkUser) return { ok: false, error: 'Not signed in.' };
    try {
      await clerkUser.setProfileImage({ file });
      return { ok: true };
    } catch (e) {
      return { ok: false, error: e.message || 'Failed to update profile image.' };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!isSignedIn,
        isLoadingAuth,
        isLoadingPublicSettings: false,
        authError: null,
        authChecked,
        logout,
        navigateToLogin,
        updateProfileImage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
