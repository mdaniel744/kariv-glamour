import AuthPageClient from '@/components/next-pages/AuthPageClient';
import { authPageMetadata } from '@/lib/authPageMetadata';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return authPageMetadata(locale, 'login', 'login');
}

export default function LoginPage() {
  return <AuthPageClient pageKey="login" />;
}
