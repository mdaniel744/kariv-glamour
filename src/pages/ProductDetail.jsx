import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LocalizedLink from '@/components/LocalizedLink';
import { base44 } from '@/api/base44Client';
import { useCart } from '@/lib/cartContext';
import { useLanguage } from '@/lib/languageContext';
import { useAuth } from '@/lib/AuthContext';
import { useLocalizedField } from '@/lib/localize';
import { formatPrice } from '@/lib/constants';
import { useSEO } from '@/hooks/useSEO';
import { Heart, ShoppingBag, ShieldCheck, Truck, RotateCcw, Award, ChevronRight, MessageCircle, Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import ProductCard from '@/components/shared/ProductCard';
import TrustBar from '@/components/shared/TrustBar';
import BuyNowAuthModal from '@/components/checkout/BuyNowAuthModal';

export default function ProductDetail() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInCart, toggleWishlist, isInWishlist } = useCart();
  const { localize } = useLocalizedField();
  const { localePath } = useLanguage();
  const { isAuthenticated } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [related, setRelated] = useState([]);

  // SEO — uses localized fields, updates when product loads
  const seoTitle = product ? localize(product, 'metaTitle') || localize(product, 'productTitle') : undefined;
  const seoDescription = product ? localize(product, 'metaDescription') || localize(product, 'shortDescription') : undefined;
  const seoImage = product?.featuredImage;
  const productJsonLd = product ? {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": seoTitle,
    "description": seoDescription,
    "image": seoImage,
    "brand": { "@type": "Brand", "name": product.brand },
    "offers": {
      "@type": "Offer",
      "price": product.salePrice || product.price,
      "priceCurrency": product.currency || "EUR",
      "availability": product.availability === 'In Stock' ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "itemCondition": product.condition ? `https://schema.org/${product.condition === 'New' ? 'NewCondition' : 'UsedCondition'}` : undefined
    }
  } : null;
  useSEO({ title: seoTitle, description: seoDescription, image: seoImage, type: 'product', jsonLd: productJsonLd });

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await base44.entities.Products.get(id);
        setProduct(data);
        const rel = await base44.entities.Products.filter({ brand: data.brand }, '-created_date', 4);
        setRelated(rel.filter((p) => p.id !== data.id).slice(0, 4));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="aspect-square bg-card animate-pulse" />
          <div className="space-y-4">
            <div className="h-4 bg-card w-32" />
            <div className="h-8 bg-card w-full" />
            <div className="h-6 bg-card w-24" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="font-display text-2xl text-foreground">{t('pages.productDetail.notFound')}</h1>
        <LocalizedLink to="/shop" className="text-primary text-sm mt-4 inline-block">{t('pages.productDetail.backToShop')}</LocalizedLink>
      </div>
    );
  }

  const images = product.productImages?.length > 0 ? product.productImages :
  product.featuredImage ? [product.featuredImage] : [];
  const inCart = isInCart(product.id);
  const wishlisted = isInWishlist(product.id);
  const brandSlug = product.brand?.toLowerCase().replace(/\s+/g, '-');

  const specs = [
  { label: t('pages.productDetail.specs.brand'), value: product.brand },
  { label: t('pages.productDetail.specs.collection'), value: product.collection },
  { label: t('pages.productDetail.specs.model'), value: product.model },
  { label: t('pages.productDetail.specs.reference'), value: product.referenceNumber },
  { label: t('pages.productDetail.specs.year'), value: product.yearOfProduction },
  { label: t('pages.productDetail.specs.condition'), value: product.condition },
  { label: t('pages.productDetail.specs.caseDiameter'), value: product.caseDiameter },
  { label: t('pages.productDetail.specs.caseMaterial'), value: product.caseMaterial },
  { label: t('pages.productDetail.specs.dialColor'), value: product.dialColor },
  { label: t('pages.productDetail.specs.bracelet'), value: product.braceletMaterial },
  { label: t('pages.productDetail.specs.movement'), value: product.movementType },
  { label: t('pages.productDetail.specs.functions'), value: localize(product, 'functions') },
  { label: t('pages.productDetail.specs.waterResistance'), value: product.waterResistance },
  { label: t('pages.productDetail.specs.crystal'), value: product.crystalType },
  { label: t('pages.productDetail.specs.powerReserve'), value: product.powerReserve },
  { label: t('pages.productDetail.specs.shape'), value: product.watchShape },
  { label: t('pages.productDetail.specs.gender'), value: product.gender }].
  filter((s) => s.value);

  return (
    <div>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.1em] uppercase text-muted-foreground">
          <LocalizedLink to="/" className="hover:text-foreground">{t('pages.productDetail.home')}</LocalizedLink>
          <ChevronRight size={10} />
          <LocalizedLink to="/shop" className="hover:text-foreground">{t('pages.productDetail.shop')}</LocalizedLink>
          {product.brand &&
          <>
              <ChevronRight size={10} />
              <LocalizedLink to={`/brands/${brandSlug}`} className="hover:text-foreground">{product.brand}</LocalizedLink>
            </>
          }
          <ChevronRight size={10} />
          <span className="text-foreground truncate max-w-[200px]">{localize(product, 'productTitle')}</span>
        </div>
      </div>

      {/* Main product */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
          {/* Image gallery */}
          <div>
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-square bg-card overflow-hidden mb-4">
              
              {images.length > 0 ?
              <img src={images[selectedImage]} alt={localize(product, 'productTitle')} className="w-full h-full object-cover" /> :
              <div className="w-full h-full flex items-center justify-center text-muted-foreground/40 text-sm">{t('pages.productDetail.noImage')}</div>
              }
            </motion.div>
            {images.length > 1 &&
            <div className="flex gap-2">
                {images.map((img, i) =>
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`w-16 h-16 border ${i === selectedImage ? 'border-primary' : 'border-border'} overflow-hidden`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
              )}
              </div>
            }
          </div>

          {/* Product info — sticky */}
          <div className="md:sticky md:top-32 md:self-start space-y-6">
            <div>
              <LocalizedLink                 to={`/brands/${brandSlug}`}
                className="text-[10px] tracking-[0.2em] uppercase text-primary hover:underline">
                {product.brand}
              </LocalizedLink>
              <h1 className="text-2xl md:text-3xl mt-2 leading-tight [font-family:'Cormorant_Garamond',_serif] font-semibold text-[hsl(var(--primary))]">
                {localize(product, 'productTitle')}
              </h1>
              {product.referenceNumber &&
              <p className="text-xs text-muted-foreground mt-1">{t('pages.productDetail.ref')} {product.referenceNumber}</p>
              }
            </div>

            {/* Price */}
            <div className="border-y border-border py-5">
              <div className="flex items-baseline gap-3">
                {product.salePrice && product.salePrice < product.price ?
                <>
                    <span className="font-display text-3xl text-primary">{formatPrice(product.salePrice)}</span>
                    <span className="text-sm text-muted-foreground line-through">{formatPrice(product.price)}</span>
                  </> :
                <span className="font-display text-3xl text-foreground">{formatPrice(product.price)}</span>
                }
              </div>
              <div className="flex items-center gap-4 mt-3">
                <span className={`text-[10px] tracking-[0.1em] uppercase px-2 py-1 ${product.availability === 'In Stock' ? 'bg-emerald-600/15 text-emerald-600 dark:text-emerald-400' : 'bg-red-600/15 text-red-600 dark:text-red-400'}`}>
                  {product.availability === 'In Stock' ? t('pages.productDetail.inStock') : product.availability || t('pages.productDetail.inStock')}
                </span>
                {product.condition &&
                <span className="text-[10px] tracking-[0.1em] uppercase text-muted-foreground">{product.condition}</span>
                }
              </div>
            </div>

            {/* Quick specs */}
            <div className="grid grid-cols-2 gap-3">
              {[
              { label: t('pages.productDetail.box'), value: product.boxIncluded ? t('pages.productDetail.included') : t('pages.productDetail.notIncluded') },
              { label: t('pages.productDetail.papers'), value: product.papersIncluded ? t('pages.productDetail.included') : t('pages.productDetail.notIncluded') },
              { label: t('pages.productDetail.year'), value: product.yearOfProduction || 'N/A' },
              { label: t('pages.productDetail.size'), value: product.caseDiameter || 'N/A' }].
              map((item) =>
              <div key={item.label} className="bg-card border border-border p-3">
                  <p className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground">{item.label}</p>
                  <p className="text-xs text-foreground mt-0.5">{item.value}</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={() => {
                  if (product.availability === 'Sold' || product.availability === 'Reserved') return;
                  if (isAuthenticated) {
                    navigate(localePath(`/checkout/${product.id}`));
                  } else {
                    setShowAuthModal(true);
                  }
                }}
                className={`w-full flex items-center justify-center gap-2 text-[11px] tracking-[0.15em] uppercase font-medium py-4 transition-colors ${product.availability === 'Sold' || product.availability === 'Reserved' ? 'bg-muted text-muted-foreground cursor-not-allowed' : 'bg-primary text-primary-foreground hover:bg-primary/90'}`}>
                <Lock size={16} />
                {product.availability === 'Sold' ? t('pages.productDetail.soldOut') : product.availability === 'Reserved' ? t('pages.productDetail.reserved') : t('pages.productDetail.buyNow')}
              </button>
              <BuyNowAuthModal
                open={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                continueTo={localePath(`/checkout/${product.id}`)}
              />
              <div className="flex gap-3">
                <button
                  onClick={() => toggleWishlist(product)}
                  className="flex-1 flex items-center justify-center gap-2 border border-border text-[11px] tracking-[0.12em] uppercase text-foreground py-3 hover:border-primary transition-colors">
                  <Heart size={14} className={wishlisted ? 'fill-primary text-primary' : ''} />
                  {wishlisted ? t('pages.productDetail.saved') : t('pages.productDetail.wishlist')}
                </button>
                <LocalizedLink                   to="/customer-service"
                  className="flex-1 flex items-center justify-center gap-2 border border-border text-[11px] tracking-[0.12em] uppercase text-foreground py-3 hover:border-primary transition-colors">
                  <MessageCircle size={14} />
                  {t('pages.productDetail.askExpert')}
                </LocalizedLink>
              </div>
            </div>

            {/* Trust cluster */}
            <div className="border border-border p-5 space-y-3">
              <h3 className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">{t('pages.productDetail.guaranteeTitle')}</h3>
              {[
              { icon: ShieldCheck, text: product.authenticationStatus === 'Authenticated' ? t('pages.productDetail.guarantee1') : t('pages.productDetail.guarantee1Pending') },
              { icon: Truck, text: t('pages.productDetail.guarantee2') },
              { icon: RotateCcw, text: product.returnEligibility !== false ? t('pages.productDetail.guarantee3') : t('pages.productDetail.guarantee3Final') },
              { icon: Award, text: t('pages.productDetail.guarantee4') }].
              map((item, i) =>
              <div key={i} className="flex items-center gap-3">
                  <item.icon size={14} className="text-primary flex-shrink-0" />
                  <span className="text-xs text-muted-foreground">{item.text}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Description & Specs */}
        <div className="mt-20 grid md:grid-cols-2 gap-16">
          {localize(product, 'productDescription') &&
          <div>
              <h2 className="font-display text-2xl text-foreground font-light mb-6">{t('pages.productDetail.aboutTitle')}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{localize(product, 'productDescription')}</p>
            </div>
          }
          <div>
            <h2 className="font-display text-2xl text-foreground font-light mb-6">{t('pages.productDetail.specsTitle')}</h2>
            <div className="space-y-0">
              {specs.map((spec, i) =>
              <div key={i} className="flex justify-between py-3 border-b border-border">
                  <span className="text-[10px] tracking-[0.12em] uppercase text-muted-foreground">{spec.label}</span>
                  <span className="text-xs text-foreground">{spec.value}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 &&
      <div className="border-t border-border py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-10">
              <h2 className="font-display text-2xl text-foreground font-light">{t('pages.productDetail.moreFrom')} {product.brand}</h2>
              <LocalizedLink to={`/brands/${brandSlug}`} className="text-[11px] tracking-[0.15em] uppercase text-primary hover:text-foreground transition-colors">
                {t('pages.productDetail.viewAll')} {product.brand} →
              </LocalizedLink>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </div>
      }

      <TrustBar />
    </div>
  );
}