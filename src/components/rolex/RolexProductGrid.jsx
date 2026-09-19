import React, { useState, useMemo } from 'react';
import { useStorefrontPricing } from '@/lib/currencyContext';
import { useTranslation } from 'react-i18next';
import { useLocalizedField } from '@/lib/localize';
import { useBrandProducts } from '@/hooks/useBrandProducts';
import { useProgressiveReveal } from '@/hooks/useProgressiveReveal';
import { sortBrandProducts } from '@/lib/brandProductSort';
import { SlidersHorizontal } from 'lucide-react';
import BrandFilterDrawer from '@/components/shared/BrandFilterDrawer';
import { CONDITIONS, CASE_MATERIALS, DIAL_COLORS, GENDERS, BRACELET_MATERIALS, MOVEMENT_TYPES } from '@/lib/constants';
import { ROLEX_COLLECTIONS, ROLEX_QUICK_FILTERS } from '@/lib/rolexData';
import ProductCard from '@/components/shared/ProductCard';
import BrandQuickFilters, { BrandAttributeFilterGroup, matchesBrandQuickFilter } from '@/components/shared/BrandQuickFilters';

const BRAND = 'Rolex';
const COLLECTION_NAMES = ROLEX_COLLECTIONS.map((collection) => collection.name);

export default function RolexProductGrid() {
  const { t } = useTranslation('brandComponents');
  const { getPricing } = useStorefrontPricing();
  const { localize } = useLocalizedField();
  const { products: allProducts, loading } = useBrandProducts(BRAND);
  const [sortBy, setSortBy] = useState('-created_date');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [quickFilter, setQuickFilter] = useState([]);
  const [filters, setFilters] = useState({ collection: [], condition: [], caseMaterial: [], dialColor: [], gender: [], braceletMaterial: [], movementType: [], boxPapers: '', availability: '' });

  const products = useMemo(() => {
    let data = allProducts;
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
    return sortBrandProducts(data, sortBy, getPricing);
  }, [allProducts, sortBy, filters, quickFilter, getPricing]);
  const { visibleItems, sentinelRef, hasMore } = useProgressiveReveal(products);

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
    <section id="rolex-products" className="brand-products-section bg-secondary py-5 sm:py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="hidden">
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
                <>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">{visibleItems.map((p) => <ProductCard key={p.id} product={p} />)}</div>
                  {hasMore && <div ref={sentinelRef} aria-hidden="true" className="h-1" />}
                </>
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
