import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import { LanguageProvider } from '@/lib/languageContext';
import LocaleRedirect from '@/components/LocaleRedirect';
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
import BreitlingPage from '@/pages/BreitlingPage';
import BreitlingSeoLanding from '@/pages/BreitlingSeoLanding';
import BreitlingCollectionPage from '@/pages/BreitlingCollectionPage';
import AudemarsPiguetPage from '@/pages/AudemarsPiguetPage';
import AudemarsPiguetSeoLanding from '@/pages/AudemarsPiguetSeoLanding';
import AudemarsPiguetCollectionPage from '@/pages/AudemarsPiguetCollectionPage';
import GrandSeikoPage from '@/pages/GrandSeikoPage';
import GrandSeikoSeoLanding from '@/pages/GrandSeikoSeoLanding';
import GrandSeikoCollectionPage from '@/pages/GrandSeikoCollectionPage';
import IWCPage from '@/pages/IWCPage';
import IWCSeoLanding from '@/pages/IWCSeoLanding';
import IWCCollectionPage from '@/pages/IWCCollectionPage';
import JaegerLeCoultrePage from '@/pages/JaegerLeCoultrePage';
import JaegerLeCoultreSeoLanding from '@/pages/JaegerLeCoultreSeoLanding';
import JaegerLeCoultreCollectionPage from '@/pages/JaegerLeCoultreCollectionPage';

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
      <Route path=":locale" element={<SiteLayout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="brands" element={<Brands />} />
        <Route path="brands/rolex" element={<RolexPage />} />
        <Route path="brands/patek-philippe" element={<PatekPhilippePage />} />
        <Route path="brands/omega" element={<OmegaPage />} />
        <Route path="brands/cartier" element={<CartierPage />} />
        <Route path="brands/hublot" element={<HublotPage />} />
        <Route path="brands/breitling" element={<BreitlingPage />} />
        <Route path="brands/audemars-piguet" element={<AudemarsPiguetPage />} />
        <Route path="brands/grand-seiko" element={<GrandSeikoPage />} />
        <Route path="brands/iwc-schaffhausen" element={<IWCPage />} />
        <Route path="brands/jaeger-lecoultre" element={<JaegerLeCoultrePage />} />
        <Route path="brands/:slug" element={<BrandDetail />} />

        {/* Rolex SEO landing pages */}
        <Route path="rolex-kaufen" element={<RolexSeoLanding slug="rolex-kaufen" />} />
        <Route path="rolex-gebraucht-kaufen" element={<RolexSeoLanding slug="rolex-gebraucht-kaufen" />} />
        <Route path="gebrauchte-rolex-uhren" element={<RolexSeoLanding slug="gebrauchte-rolex-uhren" />} />
        <Route path="rolex-submariner-kaufen" element={<RolexSeoLanding slug="rolex-submariner-kaufen" />} />
        <Route path="rolex-daytona-kaufen" element={<RolexSeoLanding slug="rolex-daytona-kaufen" />} />
        <Route path="rolex-datejust-kaufen" element={<RolexSeoLanding slug="rolex-datejust-kaufen" />} />
        <Route path="rolex-gmt-master-ii-kaufen" element={<RolexSeoLanding slug="rolex-gmt-master-ii-kaufen" />} />
        <Route path="rolex-day-date-kaufen" element={<RolexSeoLanding slug="rolex-day-date-kaufen" />} />
        <Route path="rolex-oyster-perpetual-kaufen" element={<RolexSeoLanding slug="rolex-oyster-perpetual-kaufen" />} />
        <Route path="rolex-herren" element={<RolexSeoLanding slug="rolex-herren" />} />
        <Route path="rolex-damen" element={<RolexSeoLanding slug="rolex-damen" />} />
        <Route path="welche-rolex-kaufen" element={<RolexSeoLanding slug="welche-rolex-kaufen" />} />
        <Route path="rolex-neu-oder-gebraucht" element={<RolexSeoLanding slug="rolex-neu-oder-gebraucht" />} />
        <Route path="rolex-box-papers-guide" element={<RolexSeoLanding slug="rolex-box-papers-guide" />} />
        <Route path="rolex/story" element={<RolexSeoLanding slug="rolex-story" />} />
        <Route path="rolex/watchmaking" element={<RolexSeoLanding slug="rolex-watchmaking" />} />
        <Route path="rolex/maintenance" element={<RolexSeoLanding slug="rolex-maintenance" />} />
        <Route path="rolex/:slug" element={<RolexCollectionPage />} />

        {/* Patek Philippe SEO landing pages */}
        <Route path="patek-philippe-kaufen" element={<PatekPhilippeSeoLanding slug="patek-philippe-kaufen" />} />
        <Route path="patek-philippe-gebraucht-kaufen" element={<PatekPhilippeSeoLanding slug="patek-philippe-gebraucht-kaufen" />} />
        <Route path="patek-philippe-uhr-kaufen" element={<PatekPhilippeSeoLanding slug="patek-philippe-uhr-kaufen" />} />
        <Route path="patek-philippe-nautilus-kaufen" element={<PatekPhilippeSeoLanding slug="patek-philippe-nautilus-kaufen" />} />
        <Route path="patek-philippe-aquanaut-kaufen" element={<PatekPhilippeSeoLanding slug="patek-philippe-aquanaut-kaufen" />} />
        <Route path="patek-philippe-calatrava-kaufen" element={<PatekPhilippeSeoLanding slug="patek-philippe-calatrava-kaufen" />} />
        <Route path="patek-philippe-cubitus-kaufen" element={<PatekPhilippeSeoLanding slug="patek-philippe-cubitus-kaufen" />} />
        <Route path="patek-philippe-grand-complications-kaufen" element={<PatekPhilippeSeoLanding slug="patek-philippe-grand-complications-kaufen" />} />
        <Route path="patek-philippe-complications-kaufen" element={<PatekPhilippeSeoLanding slug="patek-philippe-complications-kaufen" />} />
        <Route path="patek-philippe-twenty-4-kaufen" element={<PatekPhilippeSeoLanding slug="patek-philippe-twenty-4-kaufen" />} />
        <Route path="patek-philippe-golden-ellipse-kaufen" element={<PatekPhilippeSeoLanding slug="patek-philippe-golden-ellipse-kaufen" />} />
        <Route path="patek-philippe-gondolo-kaufen" element={<PatekPhilippeSeoLanding slug="patek-philippe-gondolo-kaufen" />} />
        <Route path="patek-philippe-herren" element={<PatekPhilippeSeoLanding slug="patek-philippe-herren" />} />
        <Route path="patek-philippe-damen" element={<PatekPhilippeSeoLanding slug="patek-philippe-damen" />} />
        <Route path="welche-patek-philippe-kaufen" element={<PatekPhilippeSeoLanding slug="welche-patek-philippe-kaufen" />} />
        <Route path="patek-philippe-neu-oder-gebraucht" element={<PatekPhilippeSeoLanding slug="patek-philippe-neu-oder-gebraucht" />} />
        <Route path="patek-philippe-archives-extract-guide" element={<PatekPhilippeSeoLanding slug="patek-philippe-archives-extract-guide" />} />
        <Route path="patek-philippe/story" element={<PatekPhilippeSeoLanding slug="patek-philippe-story" />} />
        <Route path="patek-philippe/watchmaking" element={<PatekPhilippeSeoLanding slug="patek-philippe-watchmaking" />} />
        <Route path="patek-philippe/maintenance" element={<PatekPhilippeSeoLanding slug="patek-philippe-maintenance" />} />
        <Route path="patek-philippe/:slug" element={<PatekPhilippeCollectionPage />} />

        {/* Omega SEO landing pages */}
        <Route path="omega-kaufen" element={<OmegaSeoLanding slug="omega-kaufen" />} />
        <Route path="omega-uhr-kaufen" element={<OmegaSeoLanding slug="omega-uhr-kaufen" />} />
        <Route path="omega-gebraucht-kaufen" element={<OmegaSeoLanding slug="omega-gebraucht-kaufen" />} />
        <Route path="gebrauchte-omega-uhren" element={<OmegaSeoLanding slug="gebrauchte-omega-uhren" />} />
        <Route path="omega-speedmaster-kaufen" element={<OmegaSeoLanding slug="omega-speedmaster-kaufen" />} />
        <Route path="omega-moonwatch-kaufen" element={<OmegaSeoLanding slug="omega-moonwatch-kaufen" />} />
        <Route path="omega-seamaster-kaufen" element={<OmegaSeoLanding slug="omega-seamaster-kaufen" />} />
        <Route path="omega-seamaster-diver-300m-kaufen" element={<OmegaSeoLanding slug="omega-seamaster-diver-300m-kaufen" />} />
        <Route path="omega-seamaster-planet-ocean-kaufen" element={<OmegaSeoLanding slug="omega-seamaster-planet-ocean-kaufen" />} />
        <Route path="omega-seamaster-aqua-terra-kaufen" element={<OmegaSeoLanding slug="omega-seamaster-aqua-terra-kaufen" />} />
        <Route path="omega-constellation-kaufen" element={<OmegaSeoLanding slug="omega-constellation-kaufen" />} />
        <Route path="omega-de-ville-kaufen" element={<OmegaSeoLanding slug="omega-de-ville-kaufen" />} />
        <Route path="omega-herren" element={<OmegaSeoLanding slug="omega-herren" />} />
        <Route path="omega-damen" element={<OmegaSeoLanding slug="omega-damen" />} />
        <Route path="welche-omega-kaufen" element={<OmegaSeoLanding slug="welche-omega-kaufen" />} />
        <Route path="omega-speedmaster-oder-seamaster" element={<OmegaSeoLanding slug="omega-speedmaster-oder-seamaster" />} />
        <Route path="omega-neu-oder-gebraucht" element={<OmegaSeoLanding slug="omega-neu-oder-gebraucht" />} />
        <Route path="omega/story" element={<OmegaSeoLanding slug="omega-story" />} />
        <Route path="omega/watchmaking" element={<OmegaSeoLanding slug="omega-watchmaking" />} />
        <Route path="omega/maintenance" element={<OmegaSeoLanding slug="omega-maintenance" />} />
        <Route path="omega/master-chronometer-guide" element={<OmegaSeoLanding slug="omega-master-chronometer-guide" />} />
        <Route path="omega/co-axial-guide" element={<OmegaSeoLanding slug="omega-co-axial-guide" />} />
        <Route path="omega/:slug" element={<OmegaCollectionPage />} />

        {/* Cartier SEO landing pages */}
        <Route path="cartier-uhr-kaufen" element={<CartierSeoLanding slug="cartier-uhr-kaufen" />} />
        <Route path="cartier-gebraucht-kaufen" element={<CartierSeoLanding slug="cartier-gebraucht-kaufen" />} />
        <Route path="gebrauchte-cartier-uhren" element={<CartierSeoLanding slug="gebrauchte-cartier-uhren" />} />
        <Route path="cartier-tank-kaufen" element={<CartierSeoLanding slug="cartier-tank-kaufen" />} />
        <Route path="cartier-santos-kaufen" element={<CartierSeoLanding slug="cartier-santos-kaufen" />} />
        <Route path="cartier-panthere-kaufen" element={<CartierSeoLanding slug="cartier-panthere-kaufen" />} />
        <Route path="cartier-ballon-bleu-kaufen" element={<CartierSeoLanding slug="cartier-ballon-bleu-kaufen" />} />
        <Route path="cartier-baignoire-kaufen" element={<CartierSeoLanding slug="cartier-baignoire-kaufen" />} />
        <Route path="cartier-pasha-kaufen" element={<CartierSeoLanding slug="cartier-pasha-kaufen" />} />
        <Route path="cartier-crash-kaufen" element={<CartierSeoLanding slug="cartier-crash-kaufen" />} />
        <Route path="cartier-herren" element={<CartierSeoLanding slug="cartier-herren" />} />
        <Route path="cartier-damen" element={<CartierSeoLanding slug="cartier-damen" />} />
        <Route path="cartier/story" element={<CartierSeoLanding slug="cartier-story" />} />
        <Route path="cartier/:slug" element={<CartierCollectionPage />} />

        {/* Hublot SEO landing pages */}
        <Route path="hublot-uhr" element={<HublotSeoLanding slug="hublot-uhr" />} />
        <Route path="hublot-uhren" element={<HublotSeoLanding slug="hublot-uhren" />} />
        <Route path="hublot-gebraucht" element={<HublotSeoLanding slug="hublot-gebraucht" />} />
        <Route path="hublot-kaufen" element={<HublotSeoLanding slug="hublot-kaufen" />} />
        <Route path="hublot-uhr-kaufen" element={<HublotSeoLanding slug="hublot-uhr-kaufen" />} />
        <Route path="hublot-gebraucht-kaufen" element={<HublotSeoLanding slug="hublot-gebraucht-kaufen" />} />
        <Route path="gebrauchte-hublot-uhren" element={<HublotSeoLanding slug="gebrauchte-hublot-uhren" />} />
        <Route path="hublot-big-bang-kaufen" element={<HublotSeoLanding slug="hublot-big-bang-kaufen" />} />
        <Route path="hublot-big-bang-unico-kaufen" element={<HublotSeoLanding slug="hublot-big-bang-unico-kaufen" />} />
        <Route path="hublot-classic-fusion-kaufen" element={<HublotSeoLanding slug="hublot-classic-fusion-kaufen" />} />
        <Route path="hublot-classic-fusion-chronograph-kaufen" element={<HublotSeoLanding slug="hublot-classic-fusion-chronograph-kaufen" />} />
        <Route path="hublot-spirit-of-big-bang-kaufen" element={<HublotSeoLanding slug="hublot-spirit-of-big-bang-kaufen" />} />
        <Route path="hublot-square-bang-kaufen" element={<HublotSeoLanding slug="hublot-square-bang-kaufen" />} />
        <Route path="hublot/story" element={<HublotSeoLanding slug="hublot-story" />} />
        <Route path="hublot/:slug" element={<HublotCollectionPage />} />

        {/* Breitling SEO landing pages */}
        <Route path="breitling-uhr" element={<BreitlingSeoLanding slug="breitling-uhr" />} />
        <Route path="breitling-uhren" element={<BreitlingSeoLanding slug="breitling-uhren" />} />
        <Route path="breitling-uhr-herren" element={<BreitlingSeoLanding slug="breitling-uhr-herren" />} />
        <Route path="breitling-uhr-damen" element={<BreitlingSeoLanding slug="breitling-uhr-damen" />} />
        <Route path="breitling-uhr-gebraucht" element={<BreitlingSeoLanding slug="breitling-uhr-gebraucht" />} />
        <Route path="breitling-kaufen" element={<BreitlingSeoLanding slug="breitling-kaufen" />} />
        <Route path="breitling-uhr-kaufen" element={<BreitlingSeoLanding slug="breitling-uhr-kaufen" />} />
        <Route path="breitling-gebraucht-kaufen" element={<BreitlingSeoLanding slug="breitling-gebraucht-kaufen" />} />
        <Route path="gebrauchte-breitling-uhren" element={<BreitlingSeoLanding slug="gebrauchte-breitling-uhren" />} />
        <Route path="breitling-navitimer-kaufen" element={<BreitlingSeoLanding slug="breitling-navitimer-kaufen" />} />
        <Route path="breitling-chronomat-kaufen" element={<BreitlingSeoLanding slug="breitling-chronomat-kaufen" />} />
        <Route path="breitling-superocean-kaufen" element={<BreitlingSeoLanding slug="breitling-superocean-kaufen" />} />
        <Route path="welche-breitling-uhr-kaufen" element={<BreitlingSeoLanding slug="welche-breitling-uhr-kaufen" />} />
        <Route path="breitling/story" element={<BreitlingSeoLanding slug="breitling-story" />} />
        <Route path="breitling/:slug" element={<BreitlingCollectionPage />} />

        {/* Audemars Piguet SEO landing pages */}
        <Route path="audemars-piguet-uhr" element={<AudemarsPiguetSeoLanding slug="audemars-piguet-uhr" />} />
        <Route path="audemars-piguet-uhren" element={<AudemarsPiguetSeoLanding slug="audemars-piguet-uhren" />} />
        <Route path="audemars-piguet-uhr-herren" element={<AudemarsPiguetSeoLanding slug="audemars-piguet-uhr-herren" />} />
        <Route path="audemars-piguet-uhr-damen" element={<AudemarsPiguetSeoLanding slug="audemars-piguet-uhr-damen" />} />
        <Route path="audemars-piguet-gebraucht" element={<AudemarsPiguetSeoLanding slug="audemars-piguet-gebraucht" />} />
        <Route path="audemars-piguet-kaufen" element={<AudemarsPiguetSeoLanding slug="audemars-piguet-kaufen" />} />
        <Route path="audemars-piguet-uhr-kaufen" element={<AudemarsPiguetSeoLanding slug="audemars-piguet-uhr-kaufen" />} />
        <Route path="audemars-piguet-gebraucht-kaufen" element={<AudemarsPiguetSeoLanding slug="audemars-piguet-gebraucht-kaufen" />} />
        <Route path="audemars-piguet-royal-oak-kaufen" element={<AudemarsPiguetSeoLanding slug="audemars-piguet-royal-oak-kaufen" />} />
        <Route path="audemars-piguet-royal-oak-offshore-kaufen" element={<AudemarsPiguetSeoLanding slug="audemars-piguet-royal-oak-offshore-kaufen" />} />
        <Route path="audemars-piguet-code-1159-kaufen" element={<AudemarsPiguetSeoLanding slug="audemars-piguet-code-1159-kaufen" />} />
        <Route path="audemars-piguet-uhr-preis" element={<AudemarsPiguetSeoLanding slug="audemars-piguet-uhr-preis" />} />
        <Route path="was-kostet-eine-audemars-piguet-uhr" element={<AudemarsPiguetSeoLanding slug="was-kostet-eine-audemars-piguet-uhr" />} />
        <Route path="audemars-piguet-teuerste-uhr" element={<AudemarsPiguetSeoLanding slug="audemars-piguet-teuerste-uhr" />} />
        <Route path="welche-audemars-piguet-kaufen" element={<AudemarsPiguetSeoLanding slug="welche-audemars-piguet-kaufen" />} />
        <Route path="audemars-piguet/story" element={<AudemarsPiguetSeoLanding slug="audemars-piguet-story" />} />
        <Route path="audemars-piguet/:slug" element={<AudemarsPiguetCollectionPage />} />

        {/* Grand Seiko SEO landing pages */}
        <Route path="grand-seiko-uhr" element={<GrandSeikoSeoLanding slug="grand-seiko-uhr" />} />
        <Route path="grand-seiko-uhren" element={<GrandSeikoSeoLanding slug="grand-seiko-uhren" />} />
        <Route path="grand-seiko-uhr-herren" element={<GrandSeikoSeoLanding slug="grand-seiko-uhr-herren" />} />
        <Route path="grand-seiko-uhr-damen" element={<GrandSeikoSeoLanding slug="grand-seiko-uhr-damen" />} />
        <Route path="grand-seiko-snowflake" element={<GrandSeikoSeoLanding slug="grand-seiko-snowflake" />} />
        <Route path="grand-seiko-shunbun" element={<GrandSeikoSeoLanding slug="grand-seiko-shunbun" />} />
        <Route path="grand-seiko-spring-drive" element={<GrandSeikoSeoLanding slug="grand-seiko-spring-drive" />} />
        <Route path="grand-seiko-gmt" element={<GrandSeikoSeoLanding slug="grand-seiko-gmt" />} />
        <Route path="grand-seiko-gebraucht" element={<GrandSeikoSeoLanding slug="grand-seiko-gebraucht" />} />
        <Route path="grand-seiko-kaufen" element={<GrandSeikoSeoLanding slug="grand-seiko-kaufen" />} />
        <Route path="grand-seiko-uhr-kaufen" element={<GrandSeikoSeoLanding slug="grand-seiko-uhr-kaufen" />} />
        <Route path="grand-seiko-gebraucht-kaufen" element={<GrandSeikoSeoLanding slug="grand-seiko-gebraucht-kaufen" />} />
        <Route path="welche-grand-seiko-kaufen" element={<GrandSeikoSeoLanding slug="welche-grand-seiko-kaufen" />} />
        <Route path="grand-seiko-snowflake-vs-shunbun" element={<GrandSeikoSeoLanding slug="grand-seiko-snowflake-vs-shunbun" />} />
        <Route path="grand-seiko-spring-drive-guide" element={<GrandSeikoSeoLanding slug="grand-seiko-spring-drive-guide" />} />
        <Route path="grand-seiko/story" element={<GrandSeikoSeoLanding slug="grand-seiko-story" />} />
        <Route path="grand-seiko/:slug" element={<GrandSeikoCollectionPage />} />

        {/* IWC Schaffhausen SEO landing pages */}
        <Route path="iwc-schaffhausen-uhr" element={<IWCSeoLanding slug="iwc-schaffhausen-uhr" />} />
        <Route path="iwc-schaffhausen-uhren" element={<IWCSeoLanding slug="iwc-schaffhausen-uhren" />} />
        <Route path="iwc-schaffhausen-uhr-herren" element={<IWCSeoLanding slug="iwc-schaffhausen-uhr-herren" />} />
        <Route path="iwc-schaffhausen-uhr-damen" element={<IWCSeoLanding slug="iwc-schaffhausen-uhr-damen" />} />
        <Route path="iwc-schaffhausen-automatic" element={<IWCSeoLanding slug="iwc-schaffhausen-automatic" />} />
        <Route path="iwc-schaffhausen-gebraucht" element={<IWCSeoLanding slug="iwc-schaffhausen-gebraucht" />} />
        <Route path="iwc-schaffhausen-kaufen" element={<IWCSeoLanding slug="iwc-schaffhausen-kaufen" />} />
        <Route path="iwc-schaffhausen-uhr-kaufen" element={<IWCSeoLanding slug="iwc-schaffhausen-uhr-kaufen" />} />
        <Route path="iwc-schaffhausen-gebraucht-kaufen" element={<IWCSeoLanding slug="iwc-schaffhausen-gebraucht-kaufen" />} />
        <Route path="iwc-schaffhausen-pilot-watches-kaufen" element={<IWCSeoLanding slug="iwc-schaffhausen-pilot-watches-kaufen" />} />
        <Route path="iwc-schaffhausen-portugieser-kaufen" element={<IWCSeoLanding slug="iwc-schaffhausen-portugieser-kaufen" />} />
        <Route path="iwc-schaffhausen-ingenieur-kaufen" element={<IWCSeoLanding slug="iwc-schaffhausen-ingenieur-kaufen" />} />
        <Route path="welche-iwc-schaffhausen-kaufen" element={<IWCSeoLanding slug="welche-iwc-schaffhausen-kaufen" />} />
        <Route path="iwc-schaffhausen-automatic-guide" element={<IWCSeoLanding slug="iwc-schaffhausen-automatic-guide" />} />
        <Route path="iwc-schaffhausen-pilot-watch-guide" element={<IWCSeoLanding slug="iwc-schaffhausen-pilot-watch-guide" />} />
        <Route path="iwc-schaffhausen-ingenieur-guide" element={<IWCSeoLanding slug="iwc-schaffhausen-ingenieur-guide" />} />
        <Route path="iwc-schaffhausen/story" element={<IWCSeoLanding slug="iwc-schaffhausen-story" />} />
        <Route path="iwc-schaffhausen/:slug" element={<IWCCollectionPage />} />

        {/* Jaeger-LeCoultre SEO landing pages */}
        <Route path="jaeger-lecoultre-uhr" element={<JaegerLeCoultreSeoLanding slug="jaeger-lecoultre-uhr" />} />
        <Route path="jaeger-lecoultre-uhren" element={<JaegerLeCoultreSeoLanding slug="jaeger-lecoultre-uhren" />} />
        <Route path="jaeger-lecoultre-uhren-herren" element={<JaegerLeCoultreSeoLanding slug="jaeger-lecoultre-uhren-herren" />} />
        <Route path="jaeger-lecoultre-uhren-damen" element={<JaegerLeCoultreSeoLanding slug="jaeger-lecoultre-uhren-damen" />} />
        <Route path="gebrauchte-jaeger-lecoultre" element={<JaegerLeCoultreSeoLanding slug="gebrauchte-jaeger-lecoultre" />} />
        <Route path="jaeger-lecoultre-kaufen" element={<JaegerLeCoultreSeoLanding slug="jaeger-lecoultre-kaufen" />} />
        <Route path="jaeger-lecoultre-uhr-kaufen" element={<JaegerLeCoultreSeoLanding slug="jaeger-lecoultre-uhr-kaufen" />} />
        <Route path="jaeger-lecoultre-gebraucht-kaufen" element={<JaegerLeCoultreSeoLanding slug="jaeger-lecoultre-gebraucht-kaufen" />} />
        <Route path="jaeger-lecoultre-uhren-preise" element={<JaegerLeCoultreSeoLanding slug="jaeger-lecoultre-uhren-preise" />} />
        <Route path="was-kostet-eine-jaeger-lecoultre-uhr" element={<JaegerLeCoultreSeoLanding slug="was-kostet-eine-jaeger-lecoultre-uhr" />} />
        <Route path="jaeger-lecoultre-alte-modelle" element={<JaegerLeCoultreSeoLanding slug="jaeger-lecoultre-alte-modelle" />} />
        <Route path="welche-jaeger-lecoultre-kaufen" element={<JaegerLeCoultreSeoLanding slug="welche-jaeger-lecoultre-kaufen" />} />
        <Route path="jaeger-lecoultre-reverso-duoface" element={<JaegerLeCoultreSeoLanding slug="jaeger-lecoultre-reverso-duoface" />} />
        <Route path="jaeger-lecoultre-master-chronograph" element={<JaegerLeCoultreSeoLanding slug="jaeger-lecoultre-master-chronograph" />} />
        <Route path="jaeger-lecoultre/story" element={<JaegerLeCoultreSeoLanding slug="jaeger-lecoultre-story" />} />
        <Route path="jaeger-lecoultre/:slug" element={<JaegerLeCoultreCollectionPage />} />

        <Route path="cart" element={<Cart />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="about" element={<About />} />
        <Route path="authentication" element={<Authentication />} />
        <Route path="buyer-protection" element={<BuyerProtection />} />
        <Route path="customer-service" element={<CustomerService />} />
        <Route path="sell-trade" element={<SellTrade />} />
        <Route path="guides" element={<Guides />} />
        <Route path="legal/:slug" element={<LegalPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>

      {/* Admin */}
      <Route path="admin" element={<AdminLayout />}>
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

      <Route path="*" element={<LocaleRedirect />} />
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
            <LanguageProvider>
              <ScrollToTop />
              <AuthenticatedApp />
            </LanguageProvider>
          </Router>
          <Toaster />
        </CartProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App