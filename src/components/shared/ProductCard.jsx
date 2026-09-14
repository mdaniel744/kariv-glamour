import React, { useEffect, useRef, useState } from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { ChevronLeft, ChevronRight, Heart, ShieldCheck } from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import { useLocalizedField } from '@/lib/localize';
import { useStorefrontPricing } from '@/lib/currencyContext';
import { useTranslation } from 'react-i18next';
import { productSlug } from '@/lib/slug';
import MediaImage from '@/components/shared/MediaImage';
import { getMediaVariant } from '@/lib/media';
import SellerIdentity from '@/components/marketplace/SellerIdentity';

export default function ProductCard({ product, enableGallery = true }) {
  const { t } = useTranslation();
  const { getPricing, formatMoney: formatPrice } = useStorefrontPricing();
  const { toggleWishlist, isInWishlist } = useCart();
  const { localize } = useLocalizedField();
  const wishlisted = isInWishlist(product.id);
  const galleryRef = useRef(null);
  const gestureRef = useRef({ startX: 0, moved: false });
  const suppressClickRef = useRef(false);
  const [activeImage, setActiveImage] = useState(0);
  const title = localize(product, 'productTitle');
  const pricing = getPricing(product);
  const productPath = `/product/${productSlug(product)}`;
  const sourceImages = enableGallery
    ? [
        ...(Array.isArray(product.productImages) ? product.productImages : []),
        ...(Array.isArray(product.images) ? product.images : []),
      ]
    : [];
  const images = [...new Set([product.featuredImage, ...sourceImages].filter(Boolean))]
    .map((image) => (
      image === product.featuredImage
        ? getMediaVariant(product.featuredImage, 'card')
        : getMediaVariant(image, 'card')
    ));

  useEffect(() => {
    setActiveImage(0);
    if (galleryRef.current) galleryRef.current.scrollLeft = 0;
  }, [product.id]);

  const showImage = (nextIndex) => {
    const index = (nextIndex + images.length) % images.length;
    setActiveImage(index);
    const gallery = galleryRef.current;
    if (gallery) {
      gallery.scrollTo({ left: gallery.clientWidth * index, behavior: 'smooth' });
    }
  };

  const handleGalleryScroll = () => {
    const gallery = galleryRef.current;
    if (!gallery || !gallery.clientWidth) return;
    const nextIndex = Math.round(gallery.scrollLeft / gallery.clientWidth);
    setActiveImage(Math.max(0, Math.min(nextIndex, images.length - 1)));
  };

  const handlePointerDown = (event) => {
    gestureRef.current = { startX: event.clientX, moved: false };
  };

  const handlePointerMove = (event) => {
    if (Math.abs(event.clientX - gestureRef.current.startX) > 8) {
      gestureRef.current.moved = true;
    }
  };

  const handlePointerUp = () => {
    if (!gestureRef.current.moved) return;
    suppressClickRef.current = true;
    window.setTimeout(() => {
      suppressClickRef.current = false;
    }, 0);
  };

  const handleGalleryClick = (event) => {
    if (!suppressClickRef.current) return;
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <article
      className="group relative h-full min-w-0 cursor-pointer"
    >
      {/* This stretched link makes every non-control part of the tile navigable. */}
      <LocalizedLink
        to={productPath}
        aria-label={title}
        className="absolute inset-0 z-10 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      />

      <div className="product-image-grid relative z-20 mb-3 md:mb-4">
        {images.length > 0 ? (
          <div
            ref={galleryRef}
            onScroll={handleGalleryScroll}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => { gestureRef.current.moved = false; }}
            onClickCapture={handleGalleryClick}
            className="no-scrollbar flex h-full w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth"
          >
            {images.map((image, index) => (
              <LocalizedLink
                key={`${image}-${index}`}
                to={productPath}
                draggable={false}
                aria-label={`${title}, ${t('components.productCard.viewDetails')}, ${index + 1} / ${images.length}`}
                className="relative block h-full w-full flex-none snap-center"
              >
                <MediaImage
                  src={image}
                  alt={images.length > 1 ? `${title} — ${index + 1}` : title}
                  fill
                  sizes="(max-width: 639px) calc(50vw - 1.5rem), (max-width: 1023px) calc(33vw - 2rem), (max-width: 1439px) calc(25vw - 2.25rem), 280px"
                  quality={82}
                  draggable={false}
                  className="select-none object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                />
              </LocalizedLink>
            ))}
          </div>
        ) : (
          <LocalizedLink to={productPath} className="flex h-full w-full items-center justify-center px-2 text-center text-muted-foreground/40">
            <span className="text-[10px] tracking-[0.18em] uppercase md:text-xs md:tracking-[0.2em]">{t('components.productCard.noImage')}</span>
          </LocalizedLink>
        )}

        {/* Badges */}
        <div className="pointer-events-none absolute left-3 top-3 z-30 flex flex-col gap-1.5">
          {product.isNewArrival && (
            <span className="rounded-full bg-primary px-2 py-1 text-[9px] font-medium uppercase tracking-[0.15em] text-primary-foreground">{t('components.productCard.new')}</span>
          )}
          {product.condition === 'Vintage' && (
            <span className="rounded-full bg-foreground/10 px-2 py-1 text-[9px] uppercase tracking-[0.15em] text-foreground backdrop-blur-sm">Vintage</span>
          )}
          {product.authenticationStatus === 'Authenticated' && (
            <span className="flex items-center gap-1 rounded-full bg-emerald-600/80 px-2 py-1 text-[9px] uppercase tracking-[0.15em] text-white backdrop-blur-sm">
              <ShieldCheck size={10} /> {t('components.productCard.verified')}
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            toggleWishlist(product);
          }}
          type="button"
          className="absolute right-3 top-3 z-40 flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white opacity-100 shadow-sm backdrop-blur-sm transition-opacity md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100"
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={15} className={wishlisted ? 'fill-primary text-primary' : 'text-white'} />
        </button>

        {enableGallery && images.length > 1 && (
          <>
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                showImage(activeImage - 1);
              }}
              aria-label="Previous product image"
              className="absolute left-2 top-1/2 z-40 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 text-foreground opacity-0 shadow-md backdrop-blur transition-all hover:bg-background group-hover:opacity-100 focus-visible:opacity-100 md:flex"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                showImage(activeImage + 1);
              }}
              aria-label="Next product image"
              className="absolute right-2 top-1/2 z-40 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 text-foreground opacity-0 shadow-md backdrop-blur transition-all hover:bg-background group-hover:opacity-100 focus-visible:opacity-100 md:flex"
            >
              <ChevronRight size={20} />
            </button>
            <div className="pointer-events-none absolute inset-x-0 bottom-3 z-40 flex justify-center gap-1.5" aria-hidden="true">
              {images.map((image, index) => (
                <span
                  key={`${image}-dot`}
                  className={`h-1.5 rounded-full shadow-sm transition-all ${index === activeImage ? 'w-4 bg-white' : 'w-1.5 bg-white/60'}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Quick view overlay */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 hidden bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100 md:block">
          <span className="text-[10px] uppercase tracking-[0.15em] text-white">{t('components.productCard.viewDetails')}</span>
        </div>
      </div>

      <SellerIdentity seller={product.seller} compact />
      {/* Info remains above the link visually while clicks pass through to it. */}
      <div className="pointer-events-none relative z-20 space-y-1.5">
        <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-primary">{product.brand}</p>
        <h3 className="line-clamp-2 text-sm font-body leading-tight text-foreground">{title}</h3>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {pricing.salePrice != null && pricing.currency ? (
            <>
              <span className="text-sm font-medium text-primary">{formatPrice(pricing.salePrice, pricing.currency)}</span>
              <span className="text-xs text-muted-foreground line-through">{formatPrice(pricing.regularPrice, pricing.currency)}</span>
            </>
          ) : (
            <span className="text-sm font-medium text-foreground">{pricing.price != null && pricing.currency ? formatPrice(pricing.price, pricing.currency) : t('common:priceUnavailable')}</span>
          )}
        </div>
        {product.condition && (
          <p className="text-[10px] tracking-wide text-muted-foreground">{product.condition} · {product.yearOfProduction || t('components.productCard.notAvailable')}</p>
        )}
      </div>
    </article>
  );
}
