import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';

const DefaultFallback = () => (
  <div className="fixed inset-0 flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
  </div>
);

const AccessDenied = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-background">
    <div className="text-center">
      <h1 className="text-2xl font-bold text-foreground mb-2">Access Denied</h1>
      <p className="text-muted-foreground mb-6">You do not have permission to access this area.</p>
      <a href="/" className="text-primary hover:underline">Return to home</a>
    </div>
  </div>
);

export default function ProtectedRoute({ fallback = <DefaultFallback />, unauthenticatedElement }) {
  const { isAuthenticated, isLoadingAuth, authChecked, authError, user, checkUserAuth } = useAuth();
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith('/admin');

  useEffect(() => {
    if (!authChecked && !isLoadingAuth) {
      checkUserAuth();
    }
  }, [authChecked, isLoadingAuth, checkUserAuth]);

  if (isLoadingAuth || !authChecked) {
    return fallback;
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    }
    return unauthenticatedElement;
  }

  if (!isAuthenticated) {
    return unauthenticatedElement;
  }

  // Admin route: check role
  if (isAdminRoute && user?.role !== 'admin') {
    return <AccessDenied />;
  }

  return <Outlet />;
}