import ProtectedArea from '@/components/next-pages/ProtectedArea';

export default function PortalListingsLayout({ children }) {
  return <ProtectedArea requireDealer>{children}</ProtectedArea>;
}
