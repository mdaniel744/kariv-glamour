import AuthPageClient from '@/components/next-pages/AuthPageClient';
import { authPageMetadata } from '@/lib/authPageMetadata';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return authPageMetadata(locale, 'forgotPassword', 'forgot-password');
}

export default function ForgotPasswordPage() {
  return <AuthPageClient pageKey="forgotPassword" />;
}
