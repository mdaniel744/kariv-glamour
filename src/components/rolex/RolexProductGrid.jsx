import React, { useState, useEffect } from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { useLocalizedField } from '@/lib/localize';
import { dataClient } from '@/lib/dataClient';
import { asArray } from '@/lib/base44Data';
import { motion } from 'framer-motion';
import { Heart, ShieldCheck, Eye, SlidersHorizontal } from 'lucide-react';
import BrandFilterDrawer from '@/components/shared/BrandFilterDrawer';
import { useCart } from '@/lib/cartContext';
import { formatPrice, CONDITIONS, CASE_MATERIALS, DIAL_COLORS, GENDERS, BRACELET_MATERIALS, MOVEMENT_TYPES } from '@/lib/constants';
import { ROLEX_COLLECTIONS, ROLEX_QUICK_FILTERS } from '@/lib/rolexData';
import { productSlug } from '@/lib/slug';
import ProductCardImage from '@/components/shared/ProductCardImage';
import BrandQuickFilters, { BrandAttributeFilterGroup, matchesBrandQuickFilter } from '@/components/shared/BrandQuickFilters';

const BRAND = 'Rolex';
const COLLECTION_NAMES = ROLEX_COLLECTIONS.map((collection) => collection.name);

export default function RolexProductGrid() {
  const { t } = useTranslation('brandComponents');
  const { localize } = useLocalizedField();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('-created_date');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [quickFilter, setQuickFilter] = useState([]);
  const [filters, setFilters] = useState({ collection: [], condition: [], caseMaterial: [], dialColor: [], gender: [], braceletMaterial: [], movementType: [], boxPapers: '', availability: '' });

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        let data = asArray(await dataClient.entities.Products.filter({ brand: BRAND }, sortBy, 50));
        if (filters.collection.length) data = data.filter((p) => filters.collection.includes(p.collection));
        if (filters.condition.length) data = data.filter((p) => filters.condition.includes(p.condition));
        if (filters.caseMaterial.length) data = data.filter((p) => filters.caseMaterial.includes(p.caseMaterial));
        if (filters.dialColor.length) data = data.filter((p) => filters.dialColor.includes(p.dialColor));
        if (filters.gender.length) data = data.filter((p) => filters.gender.includes(p.gender));
        if (filters.braceletMaterial.length) data = data.filter((p) => filters.braceletMaterial.includes(p.braceletMaterial));
        if (filters.movementType.length) data = data.filter((p) => filters.movementType.includes(p.movementType));
        if (filters.boxPapers === 'box+papers') data = data.filter((p) => p.boxIncluded && p.papersIncluded);
        if (filters.boxPapers === 'box') data = data.filter((p) => p.boxIncluded);
        if (filters.boxPapers === 'papers') data = data.filter((p) => p.papersIncluded);
        if (filters.availability) data = data.filter((p) => p.availability === filters.availability);
        if (quickFilter.length) data = data.filter((p) => matchesBrandQuickFilter(p, quickFilter));
        setProducts(data);
      } catch (e) { console.error(e); } finally { setLoading(false); }
    };
    load();
  }, [sortBy, filters, quickFilter]);

  const toggleFilter = (key, value) => setFilters((prev) => { const arr = prev[key]; return { ...prev, [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value] }; });

  const SORT_OPTIONS = [
    { value: '-created_date', label: t('productGrid.sortNewest') },
    { value: 'price', label: t('productGrid.sortPriceLow') },
    { value: '-price', label: t('productGrid.sortPriceHigh') },
    { value: '-yearOfProduction', label: t('productGrid.sortYearNewest') },
    { value: 'featured', label: t('productGrid.sortFeatured') },
  ];

  const AVAILABILITY_OPTIONS = [
    { value: 'In Stock', label: t('productGrid.inStock') },
    { value: 'Sold', label: t('productGrid.sold') },
    { value: 'Reserved', label: t('productGrid.reserved') },
    { value: 'Coming Soon', label: t('productGrid.comingSoon') },
  ];

  const BOX_PAPERS_OPTIONS = [
    { value: 'box+papers', label: t('productGrid.boxPapers') },
    { value: 'box', label: t('productGrid.boxOnly') },
    { value: 'papers', label: t('productGrid.papersOnly') },
  ];

  const ProductCard = ({ product }) => {
    const { toggleWishlist, isInWishlist } = useCart();
    const wishlisted = isInWishlist(product.id);
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="group min-w-0">
        <div className="relative aspect-[3/4] overflow-hidden mb-3 bg-card md:mb-4">
          {product.featuredImage ?
            <ProductCardImage src={product.featuredImage} alt={product.productTitle} /> :
            <div className="w-full h-full flex items-center justify-center text-primary"><span className="text-xs tracking-[0.2em] uppercase">{BRAND}</span></div>
          }
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNewArrival && <span className="text-[9px] tracking-[0.15em] uppercase px-2 py-1 font-medium bg-primary text-primary-foreground">{t('productGrid.new')}</span>}
            {product.authenticationStatus === 'Authenticated' &&
              <span className="text-[9px] tracking-[0.15em] uppercase px-2 py-1 flex items-center gap-1 bg-foreground/10 text-foreground"><ShieldCheck size={10} /> {t('productGrid.verified')}</span>
            }
          </div>
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full opacity-100 transition-opacity bg-black/40 backdrop-blur-sm md:opacity-0 md:group-hover:opacity-100"
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart size={14} className={wishlisted ? 'fill-primary text-primary' : 'text-white'} />
          </button>
          <LocalizedLink to={`/product/${productSlug(product)}`} className="absolute inset-x-0 bottom-0 hidden p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100 md:flex items-center gap-2">
            <Eye size={14} className="text-white" />
            <span className="text-[10px] tracking-[0.15em] uppercase text-white">{t('productGrid.quickView')}</span>
          </LocalizedLink>
        </div>
        <LocalizedLink to={`/product/${productSlug(product)}`} className="block min-w-0">
          <p className="text-[10px] tracking-[0.15em] uppercase font-medium mb-1 text-primary">{product.brand}</p>
          <h3 className="text-sm font-body leading-tight line-clamp-2 mb-1.5 text-foreground">{product.productTitle}</h3>
          <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-muted-foreground">
            {product.referenceNumber && <span>{t('productGrid.ref')} {product.referenceNumber}</span>}
            {product.yearOfProduction && <span>· {product.yearOfProduction}</span>}
          </div>
          <div className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] text-muted-foreground">
            {product.condition && <span>{product.condition}</span>}
            <span>·</span>
            <span>{product.boxIncluded ? t('productGrid.box') : t('productGrid.noBox')}</span>
            <span>·</span>
            <span>{product.papersIncluded ? t('productGrid.papers') : t('productGrid.noPapers')}</span>
          </div>
          <p className="text-sm font-medium text-foreground">{formatPrice(product.price, product.currency)}</p>
          <span className="text-[10px] tracking-[0.12em] uppercase mt-2 inline-block group-hover:opacity-70 text-primary">{t('productGrid.viewDetails')} →</span>
        </LocalizedLink>
      </motion.div>
    );
  };

  const FilterContent = () => (
    <div className="brand-filter-panel">
      <BrandAttributeFilterGroup label={t('productGrid.collection')} options={COLLECTION_NAMES} selected={filters.collection} onToggle={(v) => toggleFilter('collection', v)} defaultOpen />
      <BrandAttributeFilterGroup label={t('productGrid.condition')} options={CONDITIONS} selected={filters.condition} onToggle={(v) => toggleFilter('condition', v)} />
      <BrandAttributeFilterGroup label={t('productGrid.caseMaterial')} options={CASE_MATERIALS} selected={filters.caseMaterial} onToggle={(v) => toggleFilter('caseMaterial', v)} />
      <BrandAttributeFilterGroup label={t('productGrid.dialColor')} options={DIAL_COLORS} selected={filters.dialColor} onToggle={(v) => toggleFilter('dialColor', v)} />
      <BrandAttributeFilterGroup label={t('productGrid.gender')} options={GENDERS} selected={filters.gender} onToggle={(v) => toggleFilter('gender', v)} />
      <BrandAttributeFilterGroup label={t('productGrid.bracelet')} options={BRACELET_MATERIALS} selected={filters.braceletMaterial} onToggle={(v) => toggleFilter('braceletMaterial', v)} />
      <BrandAttributeFilterGroup label={t('productGrid.movement')} options={MOVEMENT_TYPES} selected={filters.movementType} onToggle={(v) => toggleFilter('movementType', v)} />
      <div className="border-b border-border pb-4 mb-4">
        <h4 className="text-[10px] tracking-[0.15em] uppercase font-medium mb-3 text-foreground">{t('productGrid.boxPapers')}</h4>
        <select value={filters.boxPapers} onChange={(e) => setFilters((p) => ({ ...p, boxPapers: e.target.value }))} className="w-full text-xs p-2 border border-border bg-card text-foreground outline-none focus:border-primary">
          <option value="">{t('productGrid.any')}</option>
          {BOX_PAPERS_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </div>
      <div className="pb-4">
        <h4 className="text-[10px] tracking-[0.15em] uppercase font-medium mb-3 text-foreground">{t('productGrid.availability')}</h4>
        <select value={filters.availability} onChange={(e) => setFilters((p) => ({ ...p, availability: e.target.value }))} className="w-full text-xs p-2 border border-border bg-card text-foreground outline-none focus:border-primary">
          <option value="">{t('productGrid.any')}</option>
          {AVAILABILITY_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </div>
    </div>
  );

  return (
    <section id="rolex-products" className="brand-products-section bg-secondary py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-4 text-primary">{t('productGrid.eyebrow')}</span>
          <h2 className="text-3xl md:text-4xl text-foreground [font-family:'Cormorant_Garamond',_serif] font-semibold">{t('productGrid.heading', { brand: BRAND })}</h2>
        </div>

        <BrandQuickFilters chips={ROLEX_QUICK_FILTERS} collections={ROLEX_COLLECTIONS} activeFilter={quickFilter} getLabel={(chip) => localize(chip, 'label')} onSelect={setQuickFilter} />

        <div className="mb-8 flex items-center justify-between gap-4 border-b border-border pb-4">
          <button onClick={() => setMobileFiltersOpen(true)} className="flex min-h-10 items-center gap-2 rounded-full bg-primary px-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary-foreground shadow-sm">
            <SlidersHorizontal size={14} /> {t('productGrid.filter')}
          </button>
          <p className="hidden md:block text-xs text-muted-foreground">{t('productGrid.count', { count: products.length, brand: BRAND })}</p>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="max-w-[60vw] bg-transparent border border-border text-xs text-foreground px-3 py-2 outline-none focus:border-primary sm:max-w-none">
            {SORT_OPTIONS.map((opt) => <option key={opt.value} value={opt.value} className="bg-popover text-foreground">{opt.label}</option>)}
          </select>
        </div>

        <div className="flex gap-10">
          <aside className="brand-filter-shell"><FilterContent /></aside>
          <div className="flex-1">
            {loading ?
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
                {[...Array(6)].map((_, i) =>
                  <div key={i} className="animate-pulse">
                    <div className="aspect-[3/4] mb-4 bg-card" />
                    <div className="h-3 w-20 mb-2 bg-card" />
                    <div className="h-3 w-full bg-card" />
                  </div>
                )}
              </div> :
              products.length === 0 ?
                <div className="text-center py-20"><p className="text-sm text-muted-foreground">{t('productGrid.noMatches', { brand: BRAND })}</p></div> :
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">{products.map((p) => <ProductCard key={p.id} product={p} />)}</div>
            }
          </div>
        </div>
      </div>

      <BrandFilterDrawer
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        brand={BRAND}
        title={t('productGrid.filter')}
        resultsLabel={t('productGrid.showResults', { count: products.length })}
      >
        <FilterContent />
      </BrandFilterDrawer>
    </section>
  );
}
