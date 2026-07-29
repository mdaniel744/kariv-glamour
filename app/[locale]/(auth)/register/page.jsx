import AuthPageClient from '@/components/next-pages/AuthPageClient';
import { authPageMetadata } from '@/lib/authPageMetadata';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return authPageMetadata(locale, 'register', 'register');
}

export default function RegisterPage() {
  return <AuthPageClient pageKey="register" />;
}
