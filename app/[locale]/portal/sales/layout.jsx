import ProtectedArea from '@/components/next-pages/ProtectedArea';

export default function PortalSalesLayout({ children }) {
  return <ProtectedArea requireDealer>{children}</ProtectedArea>;
}
