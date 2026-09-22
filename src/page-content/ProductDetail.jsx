import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LocalizedLink from '@/components/LocalizedLink';
import { dataClient } from '@/lib/dataClient';
import { asArray } from '@/lib/base44Data';
import { useCart } from '@/lib/cartContext';
import { useAuth } from '@/lib/AuthContext';
import { useLanguage } from '@/lib/languageContext';
import { useLocalizedField } from '@/lib/localize';
import { useStorefrontPricing } from '@/lib/currencyContext';
import { useAttributeLabel } from '@/hooks/useAttributeLabel';
import { ShieldCheck, Truck, RotateCcw, Award, ChevronRight, Lock, ShoppingBag, Store } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import TrustBar from '@/components/shared/TrustBar';
import BuyNowAuthModal from '@/components/checkout/BuyNowAuthModal';
import ContactSellerDialog from '@/components/product/ContactSellerDialog';
import KarivOfferDialog from '@/components/product/KarivOfferDialog';
import SafeHtml from '@/components/shared/SafeHtml';
import ProductGallery from '@/components/product/ProductGallery';
import ProductDealerCard from '@/components/product/ProductDealerCard';
import RelatedProducts from '@/components/product/RelatedProducts';
import { getProductAvailability, productLocalizedText } from '@/lib/productMerchant';
import { checkoutPath as buildCheckoutPath, isProtectedPurchase, readPurchasePolicy } from '@/lib/purchasePolicyUi';

const EMPTY_RELATED = [];

function productIdFromPath() {
  if (typeof window === 'undefined') return null;
  const match = window.location.pathname.match(/\/product\/([^/?#]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

export default function ProductDetail({ id: idProp, initialProduct = null, initialRelated = EMPTY_RELATED, initialDealerProfile = null, dealerSlot, relatedSlot, dealerReviewSlot }) {
  const { t } = useTranslation();
  const { locale, getPricing, formatMoney: formatPrice } = useStorefrontPricing();
  const attributeLabel = useAttributeLabel();
  const id = idProp || productIdFromPath();
  const router = useRouter();
  const { addToCart, toggleWishlist, isInCart, isInWishlist } = useCart();
  const { isAuthenticated } = useAuth();
  const { localePath } = useLanguage();
  const { localize } = useLocalizedField();
  const [product, setProduct] = useState(initialProduct);
  const [loading, setLoading] = useState(!initialProduct);
  const [related, setRelated] = useState(initialRelated);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    let mounted = true;

    if (initialProduct?.id === id) {
      setProduct(initialProduct);
      setRelated(initialRelated);
      setLoading(false);
      window.scrollTo(0, 0);
      return () => {
        mounted = false;
      };
    }

    const load = async () => {
      setLoading(true);
      setRelated(EMPTY_RELATED);
      try {
        const data = await dataClient.entities.Products.get(id);
        if (!mounted) return;
        setProduct(data);
        // Show the selected watch before waiting for optional recommendations.
        setLoading(false);
        if (!data) return;
        const rel = asArray(await dataClient.entities.Products.filter({ brand: data.brand }, '-created_date', 5));
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
  }, [id, initialProduct, initialRelated]);

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
  const pricing = getPricing(product);
  const availability = getProductAvailability(product);
  const purchasePolicy = readPurchasePolicy(product);
  const isKarivOwned = purchasePolicy.sellerType === 'kariv';
  const isManualReview = purchasePolicy.purchaseRoute === 'manual_review';
  const protectedPurchase = isProtectedPurchase(purchasePolicy);
  // Catalogue availability and dealer payment routing are separate concerns.
  // An in-stock, correctly priced dealer watch can enter the standard cart;
  // the server revalidates its seller/payment route at checkout.
  const canPurchase = availability.inStock && pricing.price != null && pricing.currency != null;
  const inCart = isInCart(product.id);

  const checkoutPath = buildCheckoutPath(product.id);
  const handleBuyNow = () => {
    if (!canPurchase) return;
    if (!isAuthenticated) { setShowAuthModal(true); return; }
    router.push(localePath(checkoutPath));
  };
  const handleCartAction = () => {
    if (!canPurchase) return;
    if (inCart) {
      router.push(localePath('/cart'));
      return;
    }
    addToCart(product);
  };
  const brandSlug = product.brand?.toLowerCase().replace(/\s+/g, '-');

  const specs = [
  { label: t('pages.productDetail.specs.brand'), value: product.brand },
  { label: t('pages.productDetail.specs.collection'), value: product.collection },
  { label: t('pages.productDetail.specs.model'), value: product.model },
  { label: t('pages.productDetail.specs.reference'), value: product.referenceNumber },
  { label: t('pages.productDetail.specs.year'), value: product.yearOfProduction },
  { label: t('pages.productDetail.specs.condition'), value: attributeLabel(product.condition) },
  { label: t('pages.productDetail.specs.caseDiameter'), value: product.caseDiameter },
  { label: t('pages.productDetail.specs.caseMaterial'), value: attributeLabel(product.caseMaterial) },
  { label: t('pages.productDetail.specs.dialColor'), value: attributeLabel(product.dialColor) },
  { label: t('pages.productDetail.specs.bracelet'), value: attributeLabel(product.braceletMaterial) },
  { label: t('pages.productDetail.specs.movement'), value: attributeLabel(product.movementType) },
  { label: t('pages.productDetail.specs.functions'), value: localize(product, 'functions') },
  { label: t('pages.productDetail.specs.waterResistance'), value: product.waterResistance },
  { label: t('pages.productDetail.specs.crystal'), value: attributeLabel(product.crystalType) },
  { label: t('pages.productDetail.specs.powerReserve'), value: product.powerReserve },
  { label: t('pages.productDetail.specs.shape'), value: attributeLabel(product.watchShape) },
  { label: t('pages.productDetail.specs.gender'), value: attributeLabel(product.gender) }].
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
              wishlisted={wishlisted}
              onToggleWishlist={() => toggleWishlist(product)}
              labels={{
                gallery: t('pages.productDetail.galleryLabel'),
                noImage: t('pages.productDetail.noImage'),
                previous: t('pages.productDetail.previousImage'),
                next: t('pages.productDetail.nextImage'),
                view: (number) => t('pages.productDetail.viewImage', { number }),
                imageCount: (current, total) => t('pages.productDetail.imageCount', { current, total }),
                openZoom: locale === 'cs' ? 'Zvětšit obrázek' : locale === 'de' ? 'Bild vergrößern' : 'Enlarge image',
                zoom: locale === 'cs' ? 'Zvětšený obrázek produktu' : locale === 'de' ? 'Produktbild vergrößert' : 'Enlarged product image',
                closeZoom: locale === 'cs' ? 'Zavřít zvětšený obrázek' : locale === 'de' ? 'Vergrößerte Ansicht schließen' : 'Close enlarged view',
                wishlist: wishlisted ? t('pages.productDetail.saved') : t('pages.productDetail.wishlist'),
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
              {productLocalizedText(product, 'shortDescription', locale) && (
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground" data-product-short-description>
                  {productLocalizedText(product, 'shortDescription', locale)}
                </p>
              )}
            </div>

            {/* Price */}
            <div className="border-y border-border py-5">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                {pricing.salePrice != null && pricing.currency ?
                <>
                    <span className="font-display text-2xl text-primary sm:text-3xl">{formatPrice(pricing.salePrice, pricing.currency)}</span>
                    <span className="text-sm text-muted-foreground line-through">{formatPrice(pricing.regularPrice, pricing.currency)}</span>
                  </> :
                <span className="font-display text-2xl text-foreground sm:text-3xl">{pricing.price != null && pricing.currency ? formatPrice(pricing.price, pricing.currency) : t('common:priceUnavailable')}</span>
                }
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2 sm:gap-4">
                <span className={`text-[10px] tracking-[0.1em] uppercase px-2 py-1 ${availability.inStock ? 'bg-emerald-600/15 text-emerald-600 dark:text-emerald-400' : 'bg-red-600/15 text-red-600 dark:text-red-400'}`}>
                  {t(`common:${availability.labelKey}`)}
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
              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  onClick={handleCartAction}
                  disabled={!canPurchase}
                  className="flex min-h-14 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-4 text-[11px] font-medium uppercase tracking-[0.15em] text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50">
                  <ShoppingBag size={16} />
                  {!canPurchase ? t('common:currentlyUnavailable') : inCart ? t('pages.productDetail.viewCart') : t('pages.productDetail.addToCart')}
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={!canPurchase}
                  className="flex min-h-14 items-center justify-center gap-2 rounded-xl border border-primary px-4 py-4 text-[11px] font-medium uppercase tracking-[0.15em] text-primary transition-colors hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-50">
                  <Lock size={16} />
                  {canPurchase ? t('pages.productDetail.buyNowDirect') : t('common:currentlyUnavailable')}
                </button>
              </div>
              <BuyNowAuthModal
                open={showAuthModal && canPurchase}
                onClose={() => setShowAuthModal(false)}
                continueTo={checkoutPath}
                protectedPurchase={protectedPurchase}
              />
              {isKarivOwned ? (
                <KarivOfferDialog
                  product={product}
                  localizedTitle={localize(product, 'productTitle')}
                  displayCurrency={pricing.currency}
                  locale={locale}
                  available={canPurchase}
                />
              ) : (
                <ContactSellerDialog product={product} sellerName={purchasePolicy.sellerName} />
              )}

              {!isManualReview && !isKarivOwned && (
                <div className="rounded-xl border border-border bg-card/60 p-4">
                  <div className="flex items-start gap-3">
                    {protectedPurchase ? <ShieldCheck size={16} className="mt-0.5 shrink-0 text-primary" /> : <Store size={16} className="mt-0.5 shrink-0 text-primary" />}
                    <div>
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        {protectedPurchase
                          ? t('pages.productDetail.protectedDisclosure')
                          : t('pages.productDetail.directDealerDisclosure', { seller: purchasePolicy.sellerName || t('pages.productDetail.verifiedDealer') })}
                      </p>
                    </div>
                  </div>
                </div>
              )}
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
            {dealerSlot !== undefined ? dealerSlot : <ProductDealerCard key={product.dealerId || 'kariv'} product={product} initialProfile={initialDealerProfile} />}
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
      {relatedSlot !== undefined ? relatedSlot : <RelatedProducts product={product} products={related} />}

      <TrustBar />

      {/* Approved dealer profile and customer-review preview */}
      {dealerReviewSlot !== undefined ? dealerReviewSlot : null}
    </div>
  );
}
