import React, { useState, useMemo } from 'react';
import { useStorefrontPricing } from '@/lib/currencyContext';
import LocalizedLink from '@/components/LocalizedLink';
import { useBrandProducts } from '@/hooks/useBrandProducts';
import { useProgressiveReveal } from '@/hooks/useProgressiveReveal';
import { useTranslation } from 'react-i18next';
import { useLocalizedField } from '@/lib/localize';
import { SlidersHorizontal } from 'lucide-react';
import BrandFilterDrawer from '@/components/shared/BrandFilterDrawer';
import JLCFilterSidebar from './JLCFilterSidebar';
import JLCProductCard from './JLCProductCard';
import { JLC_COLLECTIONS, JLC_QUICK_FILTERS } from '@/lib/jaegerLeCoultreData';
import BrandQuickFilters, { matchesBrandQuickFilter } from '@/components/shared/BrandQuickFilters';

const BRAND = 'Jaeger-LeCoultre';

const parseSize = (s) => { if (!s) return null; const m = String(s).match(/(\d+(\.\d+)?)/); return m ? parseFloat(m[1]) : null; };

const matchesFeature = (p, feat) => {
  const fl = feat.toLowerCase();
  const fields = [p.functions, p.model, p.productTitle, p.dialColor, p.caseMaterial, p.movementType, p.braceletMaterial, p.collection, p.watchShape].filter(Boolean).join(' ').toLowerCase();
  if (fl === 'limited edition') return p.isLimitedEdition;
  if (fl === 'full set') return p.boxIncluded && p.papersIncluded;
  if (fl === 'reverso') return fields.includes('reverso');
  if (fl === 'reverso duoface') return fields.includes('duoface') || fields.includes('duo face');
  if (fl === 'reverso monoface') return fields.includes('monoface') || fields.includes('mono face');
  if (fl === 'ultra-thin') return fields.includes('ultra thin') || fields.includes('ultra-thin') || fields.includes('ultrathin');
  if (fl === 'moonphase') return fields.includes('moonphase') || fields.includes('moon phase');
  if (fl === 'chronograph') return fields.includes('chronograph');
  if (fl === 'perpetual calendar') return fields.includes('perpetual');
  if (fl === 'calendar') return fields.includes('calendar') || fields.includes('date');
  if (fl === 'small seconds') return fields.includes('small seconds');
  if (fl === 'world time') return fields.includes('world time') || fields.includes('worldtimer');
  if (fl === 'alarm') return fields.includes('alarm');
  if (fl === 'tourbillon') return fields.includes('tourbillon');
  if (fl === 'minute repeater') return fields.includes('minute repeater') || fields.includes('repeater');
  if (fl === 'skeleton / openworked') return fields.includes('skeleton') || fields.includes('openworked');
  if (fl === 'high complication') return fields.includes('tourbillon') || fields.includes('repeater') || fields.includes('perpetual') || fields.includes('duometre');
  if (fl === 'dress watch') return fields.includes('dress') || fields.includes('master') || fields.includes('reverso') || fields.includes('rendez');
  if (fl === 'sport watch') return fields.includes('sport') || fields.includes('polaris') || fields.includes('compressor');
  if (fl === 'discontinued / vintage') return p.isVintage || p.condition === 'Vintage' || fields.includes('compressor');
  return fields.includes(fl);
};

export default function JLCProductGrid() {
  const { t } = useTranslation('brandComponents');
  const { getPricing } = useStorefrontPricing();
  const { localize } = useLocalizedField();
  const { products, loading } = useBrandProducts(BRAND);
  const [sortBy, setSortBy] = useState('-created_date');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [quickFilter, setQuickFilter] = useState([]);
  const [filters, setFilters] = useState({ collection: [], caseMaterial: [], movementType: [], dialColor: [], features: [], braceletMaterial: [], condition: [], gender: [], caseSize: [], watchShape: [], boxPapers: [], availability: [], type: [], priceMin: '', priceMax: '' });

  const SORT_OPTIONS = [
    { value: '-created_date', label: t('productGrid.sortFeatured') },
    { value: 'newest', label: t('productGrid.sortNewest') },
    { value: 'price', label: t('productGrid.sortPriceLow') },
    { value: '-price', label: t('productGrid.sortPriceHigh') },
    { value: '-yearOfProduction', label: t('productGrid.sortYearNewest') },
    { value: 'limited', label: t('productGrid.sortLimited') },
  ];

  const filtered = useMemo(() => {
    const f = filters;
    let result = products;
    if (f.collection.length) result = result.filter(p => f.collection.includes(p.collection));
    if (f.caseMaterial.length) result = result.filter(p => f.caseMaterial.includes(p.caseMaterial));
    if (f.movementType.length) result = result.filter(p => f.movementType.some(m => (p.movementType || '').toLowerCase().includes(m.toLowerCase())));
    if (f.dialColor.length) result = result.filter(p => f.dialColor.includes(p.dialColor));
    if (f.features.length) result = result.filter(p => f.features.some(feat => matchesFeature(p, feat)));
    if (f.braceletMaterial.length) result = result.filter(p => f.braceletMaterial.includes(p.braceletMaterial));
    if (f.condition.length) result = result.filter(p => f.condition.includes(p.condition));
    if (f.gender.length) result = result.filter(p => f.gender.includes(p.gender));
    if (f.caseSize.length) result = result.filter(p => { const d = parseSize(p.caseDiameter); return d != null && f.caseSize.some(s => parseSize(s) === d); });
    if (f.watchShape.length) result = result.filter(p => f.watchShape.includes(p.watchShape));
    if (f.type.length) result = result.filter(p => f.type.some(tp => (tp === 'New' && ['New', 'Unworn'].includes(p.condition)) || (tp === 'Pre-Owned' && !['New', 'Unworn'].includes(p.condition)) || (tp === 'Vintage' && (p.isVintage || p.condition === 'Vintage'))));
    if (f.boxPapers.length) result = result.filter(p => f.boxPapers.some(opt => (opt === 'Box included' && p.boxIncluded) || (opt === 'Papers included' && p.papersIncluded) || (opt === 'Full set' && p.boxIncluded && p.papersIncluded)));
    if (f.availability.length) result = result.filter(p => f.availability.includes(p.availability));
    if (f.priceMin) result = result.filter(p => getPricing(p).price != null && getPricing(p).price >= Number(f.priceMin));
    if (f.priceMax) result = result.filter(p => getPricing(p).price != null && getPricing(p).price <= Number(f.priceMax));
    if (quickFilter.length) result = result.filter((p) => matchesBrandQuickFilter(p, quickFilter));
    return [...result].sort((a, b) => {
      switch (sortBy) {
        case 'price': return (getPricing(a).price ?? Infinity) - (getPricing(b).price ?? Infinity);
        case '-price': return (getPricing(b).price ?? -Infinity) - (getPricing(a).price ?? -Infinity);
        case '-yearOfProduction': return (b.yearOfProduction || 0) - (a.yearOfProduction || 0);
        case 'limited': return ((b.isLimitedEdition ? 1 : 0) - (a.isLimitedEdition ? 1 : 0)) || (new Date(b.created_date) - new Date(a.created_date));
        default: return new Date(b.created_date) - new Date(a.created_date);
      }
    });
  }, [products, filters, sortBy, quickFilter, getPricing]);
  const { visibleItems, sentinelRef, hasMore } = useProgressiveReveal(filtered);

  return (
    <section id="shop" className="brand-products-section bg-secondary py-5 sm:py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="hidden">
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-3 text-primary">{t('productGrid.eyebrow')}</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">{t('productGrid.heading', { brand: BRAND })}</h2>
        </div>

        <BrandQuickFilters chips={JLC_QUICK_FILTERS} collections={JLC_COLLECTIONS} activeFilter={quickFilter} getLabel={(chip) => localize(chip, 'label')} onSelect={setQuickFilter} />

        <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
          <button onClick={() => setMobileFiltersOpen(true)} className="flex min-h-10 items-center gap-2 rounded-full bg-primary px-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary-foreground shadow-sm">
            <SlidersHorizontal size={14} /> {t('productGrid.filter')}
          </button>
          <p className="hidden md:block text-xs text-muted-foreground">{t('productGrid.timepieces', { count: filtered.length })}</p>
          <div className="flex items-center gap-2 ml-auto">
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="bg-transparent border border-border text-xs text-foreground px-3 py-2 outline-none focus:border-primary">
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value} className="bg-popover text-foreground">{o.label}</option>)}
            </select>
          </div>
        </div>

        <div className="flex gap-10">
          <aside className="brand-filter-shell">
            <JLCFilterSidebar filters={filters} setFilters={setFilters} />
          </aside>
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => <div key={i} className="aspect-[3/4] animate-pulse bg-card" />)}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-sm text-muted-foreground">{t('productGrid.noMatches', { brand: BRAND })}</p>
                <LocalizedLink to="/jaeger-lecoultre-uhr" className="text-[11px] tracking-[0.12em] uppercase underline mt-4 inline-block text-primary">{t('seoLanding.viewAll', { brand: BRAND })}</LocalizedLink>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {visibleItems.map(p => <JLCProductCard key={p.id} product={p} />)}
                </div>
                {hasMore && <div ref={sentinelRef} aria-hidden="true" className="h-1" />}
              </>
            )}
          </div>
        </div>
      </div>

      <BrandFilterDrawer
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        brand={BRAND}
        title={t('productGrid.filter')}
        resultsLabel={t('productGrid.showResults', { count: filtered.length })}
      >
        <JLCFilterSidebar filters={filters} setFilters={setFilters} />
      </BrandFilterDrawer>
    </section>
  );
}
