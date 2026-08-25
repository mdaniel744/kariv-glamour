import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { Heart, ShieldCheck } from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import { useLocalizedField } from '@/lib/localize';
import { formatPrice } from '@/lib/constants';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { productSlug } from '@/lib/slug';
import MediaImage from '@/components/shared/MediaImage';
import { getMediaVariant } from '@/lib/media';

export default function ProductCard({ product }) {
  const { t } = useTranslation();
  const { toggleWishlist, isInWishlist } = useCart();
  const { localize } = useLocalizedField();
  const wishlisted = isInWishlist(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group min-w-0"
    >
      <LocalizedLink to={`/product/${productSlug(product)}`} className="block min-w-0">
        <div className="product-image-grid relative mb-3 md:mb-4">
          {product.featuredImage ? (
            <MediaImage
              src={getMediaVariant(product.featuredImage, 'card')}
              alt={localize(product, 'productTitle')}
              fill
              sizes="(max-width: 639px) calc(50vw - 1.5rem), (max-width: 1023px) calc(33vw - 2rem), (max-width: 1439px) calc(25vw - 2.25rem), 280px"
              quality={82}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center px-2 text-center text-muted-foreground/40">
              <span className="text-[10px] tracking-[0.18em] uppercase md:text-xs md:tracking-[0.2em]">{t('components.productCard.noImage')}</span>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNewArrival && (
              <span className="text-[9px] tracking-[0.15em] uppercase bg-primary text-primary-foreground px-2 py-1 font-medium">{t('components.productCard.new')}</span>
            )}
            {product.condition === 'Vintage' && (
              <span className="text-[9px] tracking-[0.15em] uppercase bg-foreground/10 text-foreground px-2 py-1 backdrop-blur-sm">Vintage</span>
            )}
            {product.authenticationStatus === 'Authenticated' && (
              <span className="text-[9px] tracking-[0.15em] uppercase bg-emerald-600/80 text-white px-2 py-1 backdrop-blur-sm flex items-center gap-1">
                <ShieldCheck size={10} /> {t('components.productCard.verified')}
              </span>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={e => { e.preventDefault(); toggleWishlist(product); }}
            type="button"
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-full opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100"
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart size={14} className={wishlisted ? 'fill-primary text-primary' : 'text-white'} />
          </button>

          {/* Quick view overlay */}
          <div className="absolute inset-x-0 bottom-0 hidden p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100 md:block">
            <span className="text-[10px] tracking-[0.15em] uppercase text-white">{t('components.productCard.viewDetails')}</span>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-1.5">
          <p className="text-[10px] tracking-[0.15em] uppercase text-primary font-medium">{product.brand}</p>
          <h3 className="text-sm text-foreground font-body leading-tight line-clamp-2">{localize(product, 'productTitle')}</h3>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            {product.salePrice && product.salePrice < product.price ? (
              <>
                <span className="text-sm text-primary font-medium">{formatPrice(product.salePrice)}</span>
                <span className="text-xs text-muted-foreground line-through">{formatPrice(product.price)}</span>
              </>
            ) : (
              <span className="text-sm text-foreground font-medium">{formatPrice(product.price)}</span>
            )}
          </div>
          {product.condition && (
            <p className="text-[10px] text-muted-foreground tracking-wide">{product.condition} · {product.yearOfProduction || t('components.productCard.notAvailable')}</p>
          )}
        </div>
      </LocalizedLink>
    </motion.div>
  );
}
