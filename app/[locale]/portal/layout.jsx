import ProtectedArea from '@/components/next-pages/ProtectedArea';
import PortalLayout from '@/page-content/portal/PortalLayout';

export const metadata = {
  robots: { index: false, follow: false },
};

export default function PortalRouteLayout({ children }) {
  return (
    <ProtectedArea>
      <PortalLayout>{children}</PortalLayout>
    </ProtectedArea>
  );
}
