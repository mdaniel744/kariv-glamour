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
import BuyerProtection from '@/pages/BuyerProtection';
import CustomerService from '@/pages/CustomerService';
import SellTrade from '@/pages/SellTrade';
import Guides from '@/pages/Guides';
import LegalPage from '@/pages/LegalPage';
import RolexPage from '@/pages/RolexPage';
import RolexSeoLanding from '@/pages/RolexSeoLanding';
import RolexCollectionPage from '@/pages/RolexCollectionPage';
import PatekPhilippePage from '@/pages/PatekPhilippePage';
import PatekPhilippeSeoLanding from '@/pages/PatekPhilippeSeoLanding';
import PatekPhilippeCollectionPage from '@/pages/PatekPhilippeCollectionPage';
import OmegaPage from '@/pages/OmegaPage';
import OmegaSeoLanding from '@/pages/OmegaSeoLanding';
import OmegaCollectionPage from '@/pages/OmegaCollectionPage';
import CartierPage from '@/pages/CartierPage';
import CartierSeoLanding from '@/pages/CartierSeoLanding';
import CartierCollectionPage from '@/pages/CartierCollectionPage';
import HublotPage from '@/pages/HublotPage';
import HublotSeoLanding from '@/pages/HublotSeoLanding';
import HublotCollectionPage from '@/pages/HublotCollectionPage';

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
        <Route path="/brands/patek-philippe" element={<PatekPhilippePage />} />
        <Route path="/brands/omega" element={<OmegaPage />} />
        <Route path="/brands/cartier" element={<CartierPage />} />
        <Route path="/brands/hublot" element={<HublotPage />} />
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

        {/* Patek Philippe SEO landing pages */}
        <Route path="/patek-philippe-kaufen" element={<PatekPhilippeSeoLanding slug="patek-philippe-kaufen" />} />
        <Route path="/patek-philippe-gebraucht-kaufen" element={<PatekPhilippeSeoLanding slug="patek-philippe-gebraucht-kaufen" />} />
        <Route path="/patek-philippe-uhr-kaufen" element={<PatekPhilippeSeoLanding slug="patek-philippe-uhr-kaufen" />} />
        <Route path="/patek-philippe-nautilus-kaufen" element={<PatekPhilippeSeoLanding slug="patek-philippe-nautilus-kaufen" />} />
        <Route path="/patek-philippe-aquanaut-kaufen" element={<PatekPhilippeSeoLanding slug="patek-philippe-aquanaut-kaufen" />} />
        <Route path="/patek-philippe-calatrava-kaufen" element={<PatekPhilippeSeoLanding slug="patek-philippe-calatrava-kaufen" />} />
        <Route path="/patek-philippe-cubitus-kaufen" element={<PatekPhilippeSeoLanding slug="patek-philippe-cubitus-kaufen" />} />
        <Route path="/patek-philippe-grand-complications-kaufen" element={<PatekPhilippeSeoLanding slug="patek-philippe-grand-complications-kaufen" />} />
        <Route path="/patek-philippe-complications-kaufen" element={<PatekPhilippeSeoLanding slug="patek-philippe-complications-kaufen" />} />
        <Route path="/patek-philippe-twenty-4-kaufen" element={<PatekPhilippeSeoLanding slug="patek-philippe-twenty-4-kaufen" />} />
        <Route path="/patek-philippe-golden-ellipse-kaufen" element={<PatekPhilippeSeoLanding slug="patek-philippe-golden-ellipse-kaufen" />} />
        <Route path="/patek-philippe-gondolo-kaufen" element={<PatekPhilippeSeoLanding slug="patek-philippe-gondolo-kaufen" />} />
        <Route path="/patek-philippe-herren" element={<PatekPhilippeSeoLanding slug="patek-philippe-herren" />} />
        <Route path="/patek-philippe-damen" element={<PatekPhilippeSeoLanding slug="patek-philippe-damen" />} />
        <Route path="/welche-patek-philippe-kaufen" element={<PatekPhilippeSeoLanding slug="welche-patek-philippe-kaufen" />} />
        <Route path="/patek-philippe-neu-oder-gebraucht" element={<PatekPhilippeSeoLanding slug="patek-philippe-neu-oder-gebraucht" />} />
        <Route path="/patek-philippe-archives-extract-guide" element={<PatekPhilippeSeoLanding slug="patek-philippe-archives-extract-guide" />} />
        <Route path="/patek-philippe/story" element={<PatekPhilippeSeoLanding slug="patek-philippe-story" />} />
        <Route path="/patek-philippe/watchmaking" element={<PatekPhilippeSeoLanding slug="patek-philippe-watchmaking" />} />
        <Route path="/patek-philippe/maintenance" element={<PatekPhilippeSeoLanding slug="patek-philippe-maintenance" />} />
        <Route path="/patek-philippe/:slug" element={<PatekPhilippeCollectionPage />} />

        {/* Omega SEO landing pages */}
        <Route path="/omega-kaufen" element={<OmegaSeoLanding slug="omega-kaufen" />} />
        <Route path="/omega-uhr-kaufen" element={<OmegaSeoLanding slug="omega-uhr-kaufen" />} />
        <Route path="/omega-gebraucht-kaufen" element={<OmegaSeoLanding slug="omega-gebraucht-kaufen" />} />
        <Route path="/gebrauchte-omega-uhren" element={<OmegaSeoLanding slug="gebrauchte-omega-uhren" />} />
        <Route path="/omega-speedmaster-kaufen" element={<OmegaSeoLanding slug="omega-speedmaster-kaufen" />} />
        <Route path="/omega-moonwatch-kaufen" element={<OmegaSeoLanding slug="omega-moonwatch-kaufen" />} />
        <Route path="/omega-seamaster-kaufen" element={<OmegaSeoLanding slug="omega-seamaster-kaufen" />} />
        <Route path="/omega-seamaster-diver-300m-kaufen" element={<OmegaSeoLanding slug="omega-seamaster-diver-300m-kaufen" />} />
        <Route path="/omega-seamaster-planet-ocean-kaufen" element={<OmegaSeoLanding slug="omega-seamaster-planet-ocean-kaufen" />} />
        <Route path="/omega-seamaster-aqua-terra-kaufen" element={<OmegaSeoLanding slug="omega-seamaster-aqua-terra-kaufen" />} />
        <Route path="/omega-constellation-kaufen" element={<OmegaSeoLanding slug="omega-constellation-kaufen" />} />
        <Route path="/omega-de-ville-kaufen" element={<OmegaSeoLanding slug="omega-de-ville-kaufen" />} />
        <Route path="/omega-herren" element={<OmegaSeoLanding slug="omega-herren" />} />
        <Route path="/omega-damen" element={<OmegaSeoLanding slug="omega-damen" />} />
        <Route path="/welche-omega-kaufen" element={<OmegaSeoLanding slug="welche-omega-kaufen" />} />
        <Route path="/omega-speedmaster-oder-seamaster" element={<OmegaSeoLanding slug="omega-speedmaster-oder-seamaster" />} />
        <Route path="/omega-neu-oder-gebraucht" element={<OmegaSeoLanding slug="omega-neu-oder-gebraucht" />} />
        <Route path="/omega/story" element={<OmegaSeoLanding slug="omega-story" />} />
        <Route path="/omega/watchmaking" element={<OmegaSeoLanding slug="omega-watchmaking" />} />
        <Route path="/omega/maintenance" element={<OmegaSeoLanding slug="omega-maintenance" />} />
        <Route path="/omega/master-chronometer-guide" element={<OmegaSeoLanding slug="omega-master-chronometer-guide" />} />
        <Route path="/omega/co-axial-guide" element={<OmegaSeoLanding slug="omega-co-axial-guide" />} />
        <Route path="/omega/:slug" element={<OmegaCollectionPage />} />

        {/* Cartier SEO landing pages */}
        <Route path="/cartier-uhr-kaufen" element={<CartierSeoLanding slug="cartier-uhr-kaufen" />} />
        <Route path="/cartier-gebraucht-kaufen" element={<CartierSeoLanding slug="cartier-gebraucht-kaufen" />} />
        <Route path="/gebrauchte-cartier-uhren" element={<CartierSeoLanding slug="gebrauchte-cartier-uhren" />} />
        <Route path="/cartier-tank-kaufen" element={<CartierSeoLanding slug="cartier-tank-kaufen" />} />
        <Route path="/cartier-santos-kaufen" element={<CartierSeoLanding slug="cartier-santos-kaufen" />} />
        <Route path="/cartier-panthere-kaufen" element={<CartierSeoLanding slug="cartier-panthere-kaufen" />} />
        <Route path="/cartier-ballon-bleu-kaufen" element={<CartierSeoLanding slug="cartier-ballon-bleu-kaufen" />} />
        <Route path="/cartier-baignoire-kaufen" element={<CartierSeoLanding slug="cartier-baignoire-kaufen" />} />
        <Route path="/cartier-pasha-kaufen" element={<CartierSeoLanding slug="cartier-pasha-kaufen" />} />
        <Route path="/cartier-crash-kaufen" element={<CartierSeoLanding slug="cartier-crash-kaufen" />} />
        <Route path="/cartier-herren" element={<CartierSeoLanding slug="cartier-herren" />} />
        <Route path="/cartier-damen" element={<CartierSeoLanding slug="cartier-damen" />} />
        <Route path="/cartier/story" element={<CartierSeoLanding slug="cartier-story" />} />
        <Route path="/cartier/:slug" element={<CartierCollectionPage />} />

        {/* Hublot SEO landing pages */}
        <Route path="/hublot-uhr" element={<HublotSeoLanding slug="hublot-uhr" />} />
        <Route path="/hublot-uhren" element={<HublotSeoLanding slug="hublot-uhren" />} />
        <Route path="/hublot-gebraucht" element={<HublotSeoLanding slug="hublot-gebraucht" />} />
        <Route path="/hublot-kaufen" element={<HublotSeoLanding slug="hublot-kaufen" />} />
        <Route path="/hublot-uhr-kaufen" element={<HublotSeoLanding slug="hublot-uhr-kaufen" />} />
        <Route path="/hublot-gebraucht-kaufen" element={<HublotSeoLanding slug="hublot-gebraucht-kaufen" />} />
        <Route path="/gebrauchte-hublot-uhren" element={<HublotSeoLanding slug="gebrauchte-hublot-uhren" />} />
        <Route path="/hublot-big-bang-kaufen" element={<HublotSeoLanding slug="hublot-big-bang-kaufen" />} />
        <Route path="/hublot-big-bang-unico-kaufen" element={<HublotSeoLanding slug="hublot-big-bang-unico-kaufen" />} />
        <Route path="/hublot-classic-fusion-kaufen" element={<HublotSeoLanding slug="hublot-classic-fusion-kaufen" />} />
        <Route path="/hublot-classic-fusion-chronograph-kaufen" element={<HublotSeoLanding slug="hublot-classic-fusion-chronograph-kaufen" />} />
        <Route path="/hublot-spirit-of-big-bang-kaufen" element={<HublotSeoLanding slug="hublot-spirit-of-big-bang-kaufen" />} />
        <Route path="/hublot-square-bang-kaufen" element={<HublotSeoLanding slug="hublot-square-bang-kaufen" />} />
        <Route path="/hublot/story" element={<HublotSeoLanding slug="hublot-story" />} />
        <Route path="/hublot/:slug" element={<HublotCollectionPage />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/about" element={<About />} />
        <Route path="/authentication" element={<Authentication />} />
        <Route path="/buyer-protection" element={<BuyerProtection />} />
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