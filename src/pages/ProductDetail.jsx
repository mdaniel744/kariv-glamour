import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LocalizedLink from '@/components/LocalizedLink';
import { base44 } from '@/api/base44Client';
import { useCart } from '@/lib/cartContext';
import { useLanguage } from '@/lib/languageContext';
import { formatPrice } from '@/lib/constants';
import { useLocalizedField } from '@/lib/localize';
import { useSEO } from '@/hooks/useSEO';
import { Heart, ShoppingBag, ShieldCheck, Truck, RotateCcw, Award, ChevronRight, MessageCircle, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/shared/ProductCard';
import TrustBar from '@/components/shared/TrustBar';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart, isInCart, toggleWishlist, isInWishlist } = useCart();
  const { localize } = useLocalizedField();
  const { localePath } = useLanguage();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
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
      </div>);

  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="font-display text-2xl text-foreground">Produkt nicht gefunden</h1>
        <LocalizedLink to="/shop" className="text-primary text-sm mt-4 inline-block">Zurück zum Shop</LocalizedLink>
      </div>);

  }

  const images = product.productImages?.length > 0 ? product.productImages :
  product.featuredImage ? [product.featuredImage] : [];
  const inCart = isInCart(product.id);
  const wishlisted = isInWishlist(product.id);
  const brandSlug = product.brand?.toLowerCase().replace(/\s+/g, '-');

  const specs = [
  { label: "Marke", value: product.brand },
  { label: "Kollektion", value: product.collection },
  { label: "Modell", value: product.model },
  { label: "Referenz", value: product.referenceNumber },
  { label: "Jahr", value: product.yearOfProduction },
  { label: "Zustand", value: product.condition },
  { label: "Gehäusedurchmesser", value: product.caseDiameter },
  { label: "Gehäusematerial", value: product.caseMaterial },
  { label: "Zifferblattfarbe", value: product.dialColor },
  { label: "Armband", value: product.braceletMaterial },
  { label: "Uhrwerk", value: product.movementType },
  { label: "Funktionen", value: product.functions },
  { label: "Wasserdichtigkeit", value: product.waterResistance },
  { label: "Glas", value: product.crystalType },
  { label: "Gangreserve", value: product.powerReserve },
  { label: "Uhrenform", value: product.watchShape },
  { label: "Geschlecht", value: product.gender }].
  filter((s) => s.value);

  return (
    <div>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.1em] uppercase text-muted-foreground">
          <LocalizedLink to="/" className="hover:text-foreground">Start</LocalizedLink>
          <ChevronRight size={10} />
          <LocalizedLink to="/shop" className="hover:text-foreground">Shop</LocalizedLink>
          {product.brand &&
          <>
              <ChevronRight size={10} />
              <LocalizedLink to={`/brands/${brandSlug}`} className="hover:text-foreground">{product.brand}</LocalizedLink>
            </>
          }
          <ChevronRight size={10} />
          <span className="text-foreground truncate max-w-[200px]">{product.productTitle}</span>
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
              <img src={images[selectedImage]} alt={product.productTitle} className="w-full h-full object-cover" /> :

              <div className="w-full h-full flex items-center justify-center text-muted-foreground/40 text-sm">Kein Bild verfügbar</div>
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
                {product.productTitle}
              </h1>
              {product.referenceNumber &&
              <p className="text-xs text-muted-foreground mt-1">Ref. {product.referenceNumber}</p>
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
                  {product.availability === 'In Stock' ? 'Auf Lager' : product.availability || 'Auf Lager'}
                </span>
                {product.condition &&
                <span className="text-[10px] tracking-[0.1em] uppercase text-muted-foreground">{product.condition}</span>
                }
              </div>
            </div>

            {/* Quick specs */}
            <div className="grid grid-cols-2 gap-3">
              {[
              { label: "Box", value: product.boxIncluded ? "Inklusive" : "Nicht inklusive" },
              { label: "Papiere", value: product.papersIncluded ? "Inklusive" : "Nicht inklusive" },
              { label: "Jahr", value: product.yearOfProduction || "N/A" },
              { label: "Größe", value: product.caseDiameter || "N/A" }].
              map((item) =>
              <div key={item.label} className="bg-card border border-border p-3">
                  <p className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground">{item.label}</p>
                  <p className="text-xs text-foreground mt-0.5">{item.value}</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <LocalizedLink
                to={`/checkout/${product.id}`}
                className={`w-full flex items-center justify-center gap-2 text-[11px] tracking-[0.15em] uppercase font-medium py-4 transition-colors ${product.availability === 'Sold' ? 'bg-muted text-muted-foreground cursor-not-allowed pointer-events-none' : 'bg-primary text-primary-foreground hover:bg-primary/90'}`}>
                <Lock size={16} />
                {product.availability === 'Sold' ? 'Sold Out' : product.availability === 'Reserved' ? 'Reserved' : 'Buy Now — Secure Escrow'}
              </LocalizedLink>
              <div className="flex gap-3">
                <button
                  onClick={() => toggleWishlist(product)}
                  className="flex-1 flex items-center justify-center gap-2 border border-border text-[11px] tracking-[0.12em] uppercase text-foreground py-3 hover:border-primary transition-colors">
                  
                  <Heart size={14} className={wishlisted ? 'fill-primary text-primary' : ''} />
                  {wishlisted ? 'Gespeichert' : 'Wunschliste'}
                </button>
                <LocalizedLink                   to="/customer-service"
                  className="flex-1 flex items-center justify-center gap-2 border border-border text-[11px] tracking-[0.12em] uppercase text-foreground py-3 hover:border-primary transition-colors">
                  
                  <MessageCircle size={14} />
                  Experten fragen
                </LocalizedLink>
              </div>
            </div>

            {/* Trust cluster */}
            <div className="border border-border p-5 space-y-3">
              <h3 className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Die Kariv Garantie</h3>
              {[
              { icon: ShieldCheck, text: product.authenticationStatus === 'Authenticated' ? 'Von Kariv Glamour authentifiziert' : 'Authentifizierung ausstehend' },
              { icon: Truck, text: "Weltweit versicherter Versand" },
              { icon: RotateCcw, text: product.returnEligibility !== false ? "Rückgabe innerhalb von 14 Tagen" : "Finaler Verkauf — keine Rückgabe" },
              { icon: Award, text: "Transparente Zustandsbewertung" }].
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
          {product.productDescription &&
          <div>
              <h2 className="font-display text-2xl text-foreground font-light mb-6">Über diesen Zeitmesser</h2>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{product.productDescription}</p>
            </div>
          }
          <div>
            <h2 className="font-display text-2xl text-foreground font-light mb-6">Technische Spezifikationen</h2>
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
              <h2 className="font-display text-2xl text-foreground font-light">Mehr von {product.brand}</h2>
              <LocalizedLink to={`/brands/${brandSlug}`} className="text-[11px] tracking-[0.15em] uppercase text-primary hover:text-foreground transition-colors">
                Alle {product.brand} ansehen →
              </LocalizedLink>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </div>
      }

      <TrustBar />
    </div>);

}