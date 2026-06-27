import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import { CartProvider } from '@/lib/cartContext';
import { ThemeProvider } from '@/lib/themeContext';

// Site layout
import SiteLayout from '@/components/layout/SiteLayout';

// Pages
import Home from '@/pages/Home';
import Shop from '@/pages/Shop';
import ProductDetail from '@/pages/ProductDetail';
import Brands from '@/pages/Brands';
import BrandDetail from '@/pages/BrandDetail';
import Cart from '@/pages/Cart';
import Wishlist from '@/pages/Wishlist';
import About from '@/pages/About';
import Authentication from '@/pages/Authentication';
import CustomerService from '@/pages/CustomerService';
import SellTrade from '@/pages/SellTrade';
import Guides from '@/pages/Guides';
import LegalPage from '@/pages/LegalPage';
import RolexPage from '@/pages/RolexPage';
import RolexSeoLanding from '@/pages/RolexSeoLanding';
import RolexCollectionPage from '@/pages/RolexCollectionPage';

// Admin
import AdminLayout from '@/pages/admin/AdminLayout';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminProducts from '@/pages/admin/AdminProducts';
import AdminBrands from '@/pages/admin/AdminBrands';
import AdminCollections from '@/pages/admin/AdminCollections';
import AdminOrders from '@/pages/admin/AdminOrders';
import AdminCustomers from '@/pages/admin/AdminCustomers';
import AdminGuides from '@/pages/admin/AdminGuides';
import AdminLegal from '@/pages/admin/AdminLegal';
import AdminFAQ from '@/pages/admin/AdminFAQ';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#0A0A0B]">
        <div className="text-center">
          <h1 className="font-display text-xl tracking-[0.08em] text-[#E5E5E5] mb-4">
            <span className="font-light">KARIV</span>{' '}
            <span className="text-[#C5A367]">GLAMOUR</span>
          </h1>
          <div className="w-6 h-6 border-2 border-[#333] border-t-[#C5A367] rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      {/* Public site */}
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/brands/rolex" element={<RolexPage />} />
        <Route path="/brands/:slug" element={<BrandDetail />} />

        {/* Rolex SEO landing pages */}
        <Route path="/rolex-kaufen" element={<RolexSeoLanding slug="rolex-kaufen" />} />
        <Route path="/rolex-gebraucht-kaufen" element={<RolexSeoLanding slug="rolex-gebraucht-kaufen" />} />
        <Route path="/gebrauchte-rolex-uhren" element={<RolexSeoLanding slug="gebrauchte-rolex-uhren" />} />
        <Route path="/rolex-submariner-kaufen" element={<RolexSeoLanding slug="rolex-submariner-kaufen" />} />
        <Route path="/rolex-daytona-kaufen" element={<RolexSeoLanding slug="rolex-daytona-kaufen" />} />
        <Route path="/rolex-datejust-kaufen" element={<RolexSeoLanding slug="rolex-datejust-kaufen" />} />
        <Route path="/rolex-gmt-master-ii-kaufen" element={<RolexSeoLanding slug="rolex-gmt-master-ii-kaufen" />} />
        <Route path="/rolex-day-date-kaufen" element={<RolexSeoLanding slug="rolex-day-date-kaufen" />} />
        <Route path="/rolex-oyster-perpetual-kaufen" element={<RolexSeoLanding slug="rolex-oyster-perpetual-kaufen" />} />
        <Route path="/rolex-herren" element={<RolexSeoLanding slug="rolex-herren" />} />
        <Route path="/rolex-damen" element={<RolexSeoLanding slug="rolex-damen" />} />
        <Route path="/welche-rolex-kaufen" element={<RolexSeoLanding slug="welche-rolex-kaufen" />} />
        <Route path="/rolex-neu-oder-gebraucht" element={<RolexSeoLanding slug="rolex-neu-oder-gebraucht" />} />
        <Route path="/rolex-box-papers-guide" element={<RolexSeoLanding slug="rolex-box-papers-guide" />} />
        <Route path="/rolex/story" element={<RolexSeoLanding slug="rolex-story" />} />
        <Route path="/rolex/watchmaking" element={<RolexSeoLanding slug="rolex-watchmaking" />} />
        <Route path="/rolex/maintenance" element={<RolexSeoLanding slug="rolex-maintenance" />} />
        <Route path="/rolex/:slug" element={<RolexCollectionPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/about" element={<About />} />
        <Route path="/authentication" element={<Authentication />} />
        <Route path="/customer-service" element={<CustomerService />} />
        <Route path="/sell-trade" element={<SellTrade />} />
        <Route path="/guides" element={<Guides />} />
        <Route path="/legal/:slug" element={<LegalPage />} />
      </Route>

      {/* Admin */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="brands" element={<AdminBrands />} />
        <Route path="collections" element={<AdminCollections />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="customers" element={<AdminCustomers />} />
        <Route path="guides" element={<AdminGuides />} />
        <Route path="legal" element={<AdminLegal />} />
        <Route path="faq" element={<AdminFAQ />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <ThemeProvider>
        <CartProvider>
          <Router>
            <ScrollToTop />
            <AuthenticatedApp />
          </Router>
          <Toaster />
        </CartProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App