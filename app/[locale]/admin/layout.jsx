import ProtectedArea from '@/components/next-pages/ProtectedArea';
import AdminLayout from '@/page-content/admin/AdminLayout';

export const metadata = {
  title: 'Admin Console',
  robots: { index: false, follow: false },
};

export default function AdminRouteLayout({ children }) {
  return (
    <ProtectedArea requireAdmin>
      <AdminLayout>{children}</AdminLayout>
    </ProtectedArea>
  );
}
