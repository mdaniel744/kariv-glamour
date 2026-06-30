import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { Heart, ShieldCheck, Box, FileText } from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import { formatPrice } from '@/lib/constants';
import { motion } from 'framer-motion';

export default function JLCProductCard({ product }) {
  const { toggleWishlist, isInWishlist } = useCart();
  const wishlisted = isInWishlist(product.id);
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="group">
      <LocalizedLink to={`/product/${product.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-card">
          {product.featuredImage ? (
            <img src={product.featuredImage} alt={product.productTitle} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground/40">
              <span className="text-xs tracking-[0.3em] uppercase">Jaeger-LeCoultre</span>
            </div>
          )}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNewArrival && <span className="text-[9px] tracking-[0.15em] uppercase bg-primary text-primary-foreground px-2 py-1 font-medium">Neu</span>}
            {product.condition === 'Vintage' && <span className="text-[9px] tracking-[0.15em] uppercase bg-foreground/10 text-foreground px-2 py-1">Vintage</span>}
            {product.authenticationStatus === 'Authenticated' && <span className="text-[9px] tracking-[0.15em] uppercase bg-foreground/10 text-foreground px-2 py-1 flex items-center gap-1"><ShieldCheck size={10} /> Verifiziert</span>}
          </div>
          <button onClick={(e) => { e.preventDefault(); toggleWishlist(product); }} className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <Heart size={14} className={wishlisted ? 'fill-primary text-primary' : 'text-white'} />
          </button>
          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-[10px] tracking-[0.15em] uppercase text-white">Details ansehen</span>
          </div>
        </div>
        <div className="space-y-1.5">
          <p className="text-[10px] tracking-[0.15em] uppercase font-medium text-primary">{product.brand}</p>
          <h3 className="text-sm font-body leading-tight line-clamp-2 text-foreground">{product.productTitle}</h3>
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
            {product.referenceNumber && <span>Ref. {product.referenceNumber}</span>}
            {product.yearOfProduction && <span>· {product.yearOfProduction}</span>}
          </div>
          <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
            {product.condition && <span>{product.condition}</span>}
            {product.movementType && <span>· {product.movementType}</span>}
            {product.boxIncluded && <span className="flex items-center gap-0.5"><Box size={10} /> Box</span>}
            {product.papersIncluded && <span className="flex items-center gap-0.5"><FileText size={10} /> Papers</span>}
          </div>
          <p className="text-sm font-medium pt-1 text-foreground">{formatPrice(product.price, product.currency)}</p>
        </div>
      </LocalizedLink>
    </motion.div>
  );
}