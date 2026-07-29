import ProtectedArea from '@/components/next-pages/ProtectedArea';
import DealerLayout from '@/page-content/dealer/DealerLayout';

export const metadata = {
  robots: { index: false, follow: false },
};

export default function DealerRouteLayout({ children }) {
  return (
    <ProtectedArea requireDealer>
      <DealerLayout>{children}</DealerLayout>
    </ProtectedArea>
  );
}
