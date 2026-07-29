import React, { useState, useEffect } from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { base44 } from '@/api/base44Client';
import { asArray } from '@/lib/base44Data';
import { useTranslation } from 'react-i18next';
import { useLocalizedField } from '@/lib/localize';
import { motion } from 'framer-motion';
import { Heart, ShieldCheck, Eye, SlidersHorizontal, X } from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import { formatPrice, CONDITIONS, CASE_MATERIALS, DIAL_COLORS, GENDERS, BRACELET_MATERIALS, MOVEMENT_TYPES } from '@/lib/constants';
import { OMEGA_QUICK_FILTERS, OMEGA_COLLECTIONS } from '@/lib/omegaData';

const BRAND = 'Omega';
const COLLECTION_NAMES = [...new Set(OMEGA_COLLECTIONS.map((c) => c.name))];

export default function OmegaProductGrid() {
  const { t } = useTranslation('brandComponents');
  const { localize } = useLocalizedField();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('-created_date');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({ collection: [], condition: [], caseMaterial: [], dialColor: [], gender: [], braceletMaterial: [], movementType: [], boxPapers: '', availability: '' });

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        let data = asArray(await base44.entities.Products.filter({ brand: BRAND }, sortBy, 50));
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
        setProducts(data);
      } catch (e) { console.error(e); } finally { setLoading(false); }
    };
    load();
  }, [sortBy, filters]);

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

  const OmegaProductCard = ({ product }) => {
    const { toggleWishlist, isInWishlist } = useCart();
    const wishlisted = isInWishlist(product.id);
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="group">
        <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-card">
          {product.featuredImage ?
            <img src={product.featuredImage} alt={product.productTitle} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" /> :
            <div className="w-full h-full flex items-center justify-center text-primary"><span className="text-xs tracking-[0.2em] uppercase">{BRAND}</span></div>
          }
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNewArrival && <span className="text-[9px] tracking-[0.15em] uppercase px-2 py-1 font-medium bg-primary text-primary-foreground">{t('productGrid.new')}</span>}
            {product.authenticationStatus === 'Authenticated' &&
              <span className="text-[9px] tracking-[0.15em] uppercase px-2 py-1 flex items-center gap-1 bg-foreground/10 text-foreground"><ShieldCheck size={10} /> {t('productGrid.verified')}</span>
            }
          </div>
          <button onClick={(e) => { e.preventDefault(); toggleWishlist(product); }} className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm">
            <Heart size={14} className={wishlisted ? 'fill-primary text-primary' : 'text-white'} />
          </button>
          <LocalizedLink to={`/product/${product.id}`} className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
            <Eye size={14} className="text-white" />
            <span className="text-[10px] tracking-[0.15em] uppercase text-white">{t('productGrid.quickView')}</span>
          </LocalizedLink>
        </div>
        <LocalizedLink to={`/product/${product.id}`}>
          <p className="text-[10px] tracking-[0.15em] uppercase font-medium mb-1 text-primary">{product.brand}</p>
          <h3 className="text-sm font-body leading-tight line-clamp-2 mb-1.5 text-foreground">{product.productTitle}</h3>
          <div className="flex items-center gap-3 text-[10px] mb-2 text-muted-foreground">
            {product.referenceNumber && <span>{t('product.ref')} {product.referenceNumber}</span>}
            {product.yearOfProduction && <span>· {product.yearOfProduction}</span>}
          </div>
          <div className="flex items-center gap-2 text-[10px] mb-2 text-muted-foreground">
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

  const FilterGroup = ({ label, options, selected, onToggle }) => (
    <div className="border-b border-border pb-4 mb-4">
      <h4 className="text-[10px] tracking-[0.15em] uppercase font-medium mb-3 text-foreground">{label}</h4>
      <div className="space-y-2">
        {options.map((opt) =>
          <label key={opt} className="flex items-center gap-2 cursor-pointer text-xs text-muted-foreground hover:text-foreground transition-colors">
            <input type="checkbox" checked={selected.includes(opt)} onChange={() => onToggle(opt)} className="accent-primary" />
            {opt}
          </label>
        )}
      </div>
    </div>
  );

  const FilterContent = () => (
    <>
      <FilterGroup label={t('productGrid.collection')} options={COLLECTION_NAMES} selected={filters.collection} onToggle={(v) => toggleFilter('collection', v)} />
      <FilterGroup label={t('productGrid.condition')} options={CONDITIONS} selected={filters.condition} onToggle={(v) => toggleFilter('condition', v)} />
      <FilterGroup label={t('productGrid.caseMaterial')} options={CASE_MATERIALS} selected={filters.caseMaterial} onToggle={(v) => toggleFilter('caseMaterial', v)} />
      <FilterGroup label={t('productGrid.dialColor')} options={DIAL_COLORS} selected={filters.dialColor} onToggle={(v) => toggleFilter('dialColor', v)} />
      <FilterGroup label={t('productGrid.gender')} options={GENDERS} selected={filters.gender} onToggle={(v) => toggleFilter('gender', v)} />
      <FilterGroup label={t('productGrid.bracelet')} options={BRACELET_MATERIALS} selected={filters.braceletMaterial} onToggle={(v) => toggleFilter('braceletMaterial', v)} />
      <FilterGroup label={t('productGrid.movement')} options={MOVEMENT_TYPES} selected={filters.movementType} onToggle={(v) => toggleFilter('movementType', v)} />
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
    </>
  );

  return (
    <section id="omega-products" className="py-16 md:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-4 text-primary">{t('productGrid.eyebrow')}</span>
          <h2 className="text-3xl md:text-4xl text-foreground [font-family:'Cormorant_Garamond',_serif] font-semibold">{t('productGrid.heading', { brand: BRAND })}</h2>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {OMEGA_QUICK_FILTERS.map((chip, i) =>
            <LocalizedLink key={i} to={chip.link} className="text-[10px] tracking-[0.12em] uppercase px-4 py-2 border border-border text-foreground transition-colors hover:border-primary hover:text-primary">{localize(chip, 'label')}</LocalizedLink>
          )}
        </div>

        <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
          <button onClick={() => setMobileFiltersOpen(true)} className="md:hidden flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase text-foreground">
            <SlidersHorizontal size={14} /> {t('productGrid.filter')}
          </button>
          <p className="hidden md:block text-xs text-muted-foreground">{t('productGrid.count', { count: products.length, brand: BRAND })}</p>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-transparent border border-border text-xs text-foreground px-3 py-2 outline-none focus:border-primary">
            {SORT_OPTIONS.map((opt) => <option key={opt.value} value={opt.value} className="bg-popover text-foreground">{opt.label}</option>)}
          </select>
        </div>

        <div className="flex gap-10">
          <aside className="hidden md:block w-56 flex-shrink-0"><FilterContent /></aside>
          <div className="flex-1">
            {loading ?
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
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
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">{products.map((p) => <OmegaProductCard key={p.id} product={p} />)}</div>
            }
          </div>
        </div>
      </div>

      {mobileFiltersOpen &&
        <div className="fixed inset-0 z-50 overflow-y-auto bg-background">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl text-foreground">{t('productGrid.filter')}</h2>
              <button onClick={() => setMobileFiltersOpen(false)} className="text-muted-foreground"><X size={20} /></button>
            </div>
            <FilterContent />
            <button onClick={() => setMobileFiltersOpen(false)} className="w-full mt-8 py-4 text-[11px] tracking-[0.15em] uppercase font-medium bg-primary text-primary-foreground">
              {t('productGrid.showResults', { count: products.length })}
            </button>
          </div>
        </div>
      }
    </section>
  );
}