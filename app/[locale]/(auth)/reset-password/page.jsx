import AuthPageClient from '@/components/next-pages/AuthPageClient';
import { authPageMetadata } from '@/lib/authPageMetadata';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return authPageMetadata(locale, 'resetPassword', 'reset-password');
}

export default function ResetPasswordPage() {
  return <AuthPageClient pageKey="resetPassword" />;
}
