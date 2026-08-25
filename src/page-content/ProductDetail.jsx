import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LocalizedLink from '@/components/LocalizedLink';
import { dataClient } from '@/lib/dataClient';
import { asArray } from '@/lib/base44Data';
import { useCart } from '@/lib/cartContext';
import { useAuth } from '@/lib/AuthContext';
import { useLanguage } from '@/lib/languageContext';
import { useLocalizedField } from '@/lib/localize';
import { formatPrice } from '@/lib/constants';
import { Heart, ShieldCheck, Truck, RotateCcw, Award, ChevronRight, MessageCircle, Lock, Store } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ProductCard from '@/components/shared/ProductCard';
import TrustBar from '@/components/shared/TrustBar';
import StarRating from '@/components/dealer/StarRating';
import BuyNowAuthModal from '@/components/checkout/BuyNowAuthModal';
import SafeHtml from '@/components/shared/SafeHtml';
import { getDealerRatingSummary } from '@/actions/dealerReviews';
import ProductGallery from '@/components/product/ProductGallery';
import MediaImage from '@/components/shared/MediaImage';
import { getMediaVariant } from '@/lib/media';

function productIdFromPath() {
  if (typeof window === 'undefined') return null;
  const match = window.location.pathname.match(/\/product\/([^/?#]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

export default function ProductDetail({ id: idProp, initialProduct = null, initialRelated = [], initialDealerProfile = null }) {
  const { t } = useTranslation();
  const id = idProp || productIdFromPath();
  const router = useRouter();
  const { toggleWishlist, isInWishlist } = useCart();
  const { isAuthenticated } = useAuth();
  const { localePath } = useLanguage();
  const { localize } = useLocalizedField();
  const [product, setProduct] = useState(initialProduct);
  const [loading, setLoading] = useState(!initialProduct);
  const [related, setRelated] = useState(initialRelated);
  const [dealerProfile, setDealerProfile] = useState(initialDealerProfile);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    let mounted = true;

    const loadDealer = (data) => {
      const dealerUserId = data?.dealerId || data?.created_by_id;
      if (!dealerUserId) return;
      getDealerRatingSummary(dealerUserId)
        .then((summary) => {
          if (mounted && summary) {
            setDealerProfile((current) => ({
              ...summary,
              ...(current || {}),
              averageRating: summary.averageRating,
              totalReviews: summary.totalReviews,
            }));
          }
        })
        .catch(() => {});
    };

    if (initialProduct?.id === id) {
      setProduct(initialProduct);
      setRelated(initialRelated);
      setDealerProfile(initialDealerProfile);
      setLoading(false);
      loadDealer(initialProduct);
      window.scrollTo(0, 0);
      return () => {
        mounted = false;
      };
    }

    const load = async () => {
      setLoading(true);
      try {
        const data = await dataClient.entities.Products.get(id);
        if (!mounted) return;
        setProduct(data);
        loadDealer(data);
        const rel = asArray(await dataClient.entities.Products.filter({ brand: data.brand }, '-created_date', 4));
        if (mounted) setRelated(rel.filter((p) => p.id !== data.id).slice(0, 4));
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    if (id) load();
    window.scrollTo(0, 0);
    return () => {
      mounted = false;
    };
  }, [id, initialProduct, initialRelated, initialDealerProfile]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20 text-center">
        <h1 className="font-display text-2xl text-foreground">{t('pages.productDetail.notFound')}</h1>
        <LocalizedLink to="/shop" className="text-primary text-sm mt-4 inline-block">{t('pages.productDetail.backToShop')}</LocalizedLink>
      </div>
    );
  }

  const images = product.productImages?.length > 0 ? product.productImages :
  product.featuredImage ? [product.featuredImage] : [];
  const wishlisted = isInWishlist(product.id);

  const checkoutPath = `/checkout/${product.id}`;
  const handleBuyNow = () => {
    if (!isAuthenticated) { setShowAuthModal(true); return; }
    router.push(localePath(checkoutPath));
  };
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 md:py-4">
        <div className="no-scrollbar flex items-center gap-2 overflow-x-auto whitespace-nowrap text-[10px] tracking-[0.1em] uppercase text-muted-foreground">
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
          <span className="max-w-[220px] truncate text-foreground sm:max-w-sm">{localize(product, 'productTitle')}</span>
        </div>
      </div>

      {/* Main product */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-14 md:pb-20">
        <div className="grid gap-7 md:grid-cols-2 md:gap-16">
          {/* Image gallery */}
          <div className="min-w-0">
            <ProductGallery
              key={product.id}
              images={images}
              title={localize(product, 'productTitle')}
              labels={{
                gallery: t('pages.productDetail.galleryLabel'),
                noImage: t('pages.productDetail.noImage'),
                previous: t('pages.productDetail.previousImage'),
                next: t('pages.productDetail.nextImage'),
                view: (number) => t('pages.productDetail.viewImage', { number }),
                imageCount: (current, total) => t('pages.productDetail.imageCount', { current, total }),
                openZoom: localePath('/').startsWith('/de') ? 'Bild vergrößern' : 'Enlarge image',
                zoom: localePath('/').startsWith('/de') ? 'Produktbild vergrößert' : 'Enlarged product image',
                closeZoom: localePath('/').startsWith('/de') ? 'Vergrößerte Ansicht schließen' : 'Close enlarged view',
              }}
            />
          </div>

          {/* Product info — sticky */}
          <div className="min-w-0 space-y-5 md:sticky md:top-32 md:self-start md:space-y-6">
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
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                {product.salePrice && product.salePrice < product.price ?
                <>
                    <span className="font-display text-2xl text-primary sm:text-3xl">{formatPrice(product.salePrice)}</span>
                    <span className="text-sm text-muted-foreground line-through">{formatPrice(product.price)}</span>
                  </> :
                <span className="font-display text-2xl text-foreground sm:text-3xl">{formatPrice(product.price)}</span>
                }
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2 sm:gap-4">
                <span className={`text-[10px] tracking-[0.1em] uppercase px-2 py-1 ${product.availability === 'In Stock' ? 'bg-emerald-600/15 text-emerald-600 dark:text-emerald-400' : 'bg-red-600/15 text-red-600 dark:text-red-400'}`}>
                  {product.availability === 'In Stock' ? t('pages.productDetail.inStock') : product.availability || t('pages.productDetail.inStock')}
                </span>
                {product.condition &&
                <span className="text-[10px] tracking-[0.1em] uppercase text-muted-foreground">{product.condition}</span>
                }
              </div>
            </div>

            {/* Quick specs */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {[
              { label: t('pages.productDetail.box'), value: product.boxIncluded ? t('pages.productDetail.included') : t('pages.productDetail.notIncluded') },
              { label: t('pages.productDetail.papers'), value: product.papersIncluded ? t('pages.productDetail.included') : t('pages.productDetail.notIncluded') },
              { label: t('pages.productDetail.year'), value: product.yearOfProduction || 'N/A' },
              { label: t('pages.productDetail.size'), value: product.caseDiameter || 'N/A' }].
              map((item) =>
              <div key={item.label} className="min-w-0 bg-card border border-border p-3">
                  <p className="text-[9px] tracking-[0.15em] uppercase leading-snug text-muted-foreground">{item.label}</p>
                  <p className="text-xs text-foreground mt-0.5 break-words">{item.value}</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={handleBuyNow}
                className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium py-4 hover:bg-primary/90 transition-colors">
                <Lock size={16} />
                {t('pages.productDetail.buyNow')}
              </button>
              <BuyNowAuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} continueTo={checkoutPath} />
              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  onClick={() => toggleWishlist(product)}
                  className="flex min-h-12 items-center justify-center gap-2 border border-border px-3 py-3 text-[11px] tracking-[0.12em] uppercase text-foreground transition-colors hover:border-primary">
                  <Heart size={14} className={wishlisted ? 'fill-primary text-primary' : ''} />
                  {wishlisted ? t('pages.productDetail.saved') : t('pages.productDetail.wishlist')}
                </button>
                <LocalizedLink                   to="/customer-service"
                  className="flex min-h-12 items-center justify-center gap-2 border border-border px-3 py-3 text-[11px] tracking-[0.12em] uppercase text-foreground transition-colors hover:border-primary">
                  <MessageCircle size={14} />
                  {t('pages.productDetail.askExpert')}
                </LocalizedLink>
              </div>
            </div>

            {/* Trust cluster */}
            <div className="border border-border p-4 space-y-3 sm:p-5">
              <h3 className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">{t('pages.productDetail.guaranteeTitle')}</h3>
              {[
              { icon: ShieldCheck, text: product.authenticationStatus === 'Authenticated' ? t('pages.productDetail.guarantee1') : t('pages.productDetail.guarantee1Pending') },
              { icon: Truck, text: t('pages.productDetail.guarantee2') },
              { icon: RotateCcw, text: product.returnEligibility !== false ? t('pages.productDetail.guarantee3') : t('pages.productDetail.guarantee3Final') },
              { icon: Award, text: t('pages.productDetail.guarantee4') }].
              map((item, i) =>
              <div key={i} className="flex items-center gap-3">
                  <item.icon size={14} className="text-primary flex-shrink-0" />
                  <span className="text-xs leading-relaxed text-muted-foreground">{item.text}</span>
                </div>
              )}
            </div>

            {/* Dealer info */}
            {(product.dealerId || product.created_by_id) && (() => {
              const dealerUserId = product.dealerId || product.created_by_id;
              return (
              <LocalizedLink to={`/dealer-profile/${dealerUserId}`} className="block border border-border p-4 hover:border-primary transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {dealerProfile?.logoImage ? (
                      <MediaImage src={getMediaVariant(dealerProfile.logoImage, 'thumb')} alt="" fill sizes="40px" quality={76} className="object-cover" />
                    ) : (
                      <Store size={16} className="text-primary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground">Sold By</p>
                    <p className="text-sm text-foreground truncate group-hover:text-primary transition-colors">{dealerProfile?.displayName || product.dealerName || 'View Dealer Profile'}</p>
                    {dealerProfile?.averageRating > 0 && (
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <StarRating rating={Math.round(dealerProfile.averageRating)} size={10} />
                        <span className="text-[10px] text-muted-foreground">{dealerProfile.averageRating.toFixed(1)} ({dealerProfile.totalReviews} reviews)</span>
                      </div>
                    )}
                  </div>
                  <ChevronRight size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </LocalizedLink>
              );
            })()}
          </div>
        </div>

        {/* Description & Specs */}
        <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-2 md:gap-16">
          {localize(product, 'productDescription') &&
          <div>
              <h2 className="font-display text-2xl text-foreground font-light mb-6">{t('pages.productDetail.aboutTitle')}</h2>
              <SafeHtml
                as="div"
                html={localize(product, 'productDescription')}
                className="prose prose-sm max-w-none text-sm text-muted-foreground leading-relaxed [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-border [&_td]:p-2 [&_th]:border [&_th]:border-border [&_th]:p-2 [&_img]:max-w-full [&_img]:h-auto [&_blockquote]:border-l-2 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic"
              />
            </div>
          }
          <div>
            <h2 className="font-display text-2xl text-foreground font-light mb-6">{t('pages.productDetail.specsTitle')}</h2>
            <div className="space-y-0">
              {specs.map((spec, i) =>
              <div key={i} className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-start gap-4 border-b border-border py-3">
                  <span className="text-[10px] tracking-[0.12em] uppercase leading-snug text-muted-foreground">{spec.label}</span>
                  <span className="min-w-0 break-words text-right text-xs text-foreground">{spec.value}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 &&
      <div className="border-t border-border py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="font-display text-2xl text-foreground font-light">{t('pages.productDetail.moreFrom')} {product.brand}</h2>
              <LocalizedLink to={`/brands/${brandSlug}`} className="text-[11px] tracking-[0.15em] uppercase text-primary hover:text-foreground transition-colors">
                {t('pages.productDetail.viewAll')} {product.brand} →
              </LocalizedLink>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </div>
      }

      <TrustBar />
    </div>
  );
}
