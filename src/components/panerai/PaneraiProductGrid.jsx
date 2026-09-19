import React, { useState, useMemo } from 'react';
import { useStorefrontPricing } from '@/lib/currencyContext';
import LocalizedLink from '@/components/LocalizedLink';
import { useBrandProducts } from '@/hooks/useBrandProducts';
import { useProgressiveReveal } from '@/hooks/useProgressiveReveal';
import { useTranslation } from 'react-i18next';
import { useLocalizedField } from '@/lib/localize';
import { SlidersHorizontal } from 'lucide-react';
import BrandFilterDrawer from '@/components/shared/BrandFilterDrawer';
import PaneraiFilterSidebar from './PaneraiFilterSidebar';
import PaneraiProductCard from './PaneraiProductCard';
import { PANERAI_COLLECTIONS, PANERAI_QUICK_FILTERS } from '@/lib/paneraiData';
import BrandQuickFilters, { matchesBrandQuickFilter } from '@/components/shared/BrandQuickFilters';

const BRAND = 'Panerai';

const parseSize = (s) => { if (!s) return null; const m = String(s).match(/(\d+(\.\d+)?)/); return m ? parseFloat(m[1]) : null; };

const isQuartz = (p) => {
  const f = [p.movementType, p.functions, p.model, p.productTitle].filter(Boolean).join(' ').toLowerCase();
  return f.includes('quartz');
};

const isMechanical = (p) => {
  const f = [p.movementType, p.functions, p.model, p.productTitle].filter(Boolean).join(' ').toLowerCase();
  return f.includes('automatic') || f.includes('manual') || f.includes('mechanical') || f.includes('calibre') || f.includes('manufacture') || f.includes('self-wind') || f.includes('p.9010') || f.includes('p.5000') || f.includes('p.6000') || f.includes('p.4000');
};

const matchesFeature = (p, feat) => {
  const fl = feat.toLowerCase();
  const fields = [p.functions, p.model, p.productTitle, p.dialColor, p.caseMaterial, p.movementType, p.braceletMaterial, p.waterResistance, p.collection].filter(Boolean).join(' ').toLowerCase();
  if (fl === 'full set') return p.boxIncluded && p.papersIncluded;
  if (fl === 'luminor') return fields.includes('luminor') && !fields.includes('marina') && !fields.includes('due') && !fields.includes('submersible');
  if (fl === 'luminor marina') return fields.includes('marina');
  if (fl === 'radiomir') return fields.includes('radiomir');
  if (fl === 'submersible') return fields.includes('submersible');
  if (fl === 'luminor due') return fields.includes('due');
  if (fl === 'small seconds') return fields.includes('small second') || fields.includes('sub-dial') || fields.includes('subdial') || fields.includes('seconds');
  if (fl === 'gmt') return fields.includes('gmt');
  if (fl === 'chronograph') return fields.includes('chronograph') || fields.includes('chrono');
  if (fl === 'power reserve') return fields.includes('power reserve') || fields.includes('gangreserve');
  if (fl === '8 days') return fields.includes('8 day') || fields.includes('acht tage');
  if (fl === '3 days') return fields.includes('3 day') || fields.includes('drei tage');
  if (fl === 'marina militare') return fields.includes('marina militare');
  if (fl === 'destro / left-handed crown') return fields.includes('destro') || fields.includes('left-handed');
  if (fl === 'sandwich dial') return fields.includes('sandwich');
  if (fl === 'california dial') return fields.includes('california');
  if (fl === 'cushion case') return fields.includes('cushion') || fields.includes('panerai');
  if (fl === 'crown-protecting bridge') return fields.includes('crown') || fields.includes('bridge');
  if (fl === 'dive watch') return fields.includes('dive') || fields.includes('submersible') || fields.includes('water resistance');
  if (fl === 'limited edition') return p.isLimitedEdition;
  return fields.includes(fl);
};

export default function PaneraiProductGrid() {
  const { t } = useTranslation('brandComponents');
  const { getPricing } = useStorefrontPricing();
  const { localize } = useLocalizedField();
  const { products, loading } = useBrandProducts(BRAND);
  const [sortBy, setSortBy] = useState('-created_date');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [quickFilter, setQuickFilter] = useState([]);
  const [filters, setFilters] = useState({ collection: [], watchType: [], caseMaterial: [], movementType: [], dialColor: [], features: [], braceletMaterial: [], condition: [], gender: [], caseSize: [], boxPapers: [], availability: [], type: [], priceMin: '', priceMax: '' });

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
    if (f.watchType.length) result = result.filter((p) => f.watchType.some((tp) => tp === 'Mechanical' && isMechanical(p) || tp === 'Quartz' && isQuartz(p)));
    if (f.collection.length) result = result.filter((p) => f.collection.includes(p.collection));
    if (f.caseMaterial.length) result = result.filter((p) => f.caseMaterial.includes(p.caseMaterial));
    if (f.movementType.length) result = result.filter((p) => f.movementType.some((m) => (p.movementType || '').toLowerCase().includes(m.toLowerCase())));
    if (f.dialColor.length) result = result.filter((p) => f.dialColor.includes(p.dialColor));
    if (f.features.length) result = result.filter((p) => f.features.some((feat) => matchesFeature(p, feat)));
    if (f.braceletMaterial.length) result = result.filter((p) => f.braceletMaterial.includes(p.braceletMaterial));
    if (f.condition.length) result = result.filter((p) => f.condition.includes(p.condition));
    if (f.gender.length) result = result.filter((p) => f.gender.includes(p.gender));
    if (f.caseSize.length) result = result.filter((p) => { const d = parseSize(p.caseDiameter); return d != null && f.caseSize.some((s) => parseSize(s) === d); });
    if (f.type.length) result = result.filter((p) => f.type.some((tp) => tp === 'New' && ['New', 'Unworn'].includes(p.condition) || tp === 'Pre-Owned' && !['New', 'Unworn'].includes(p.condition) || tp === 'Vintage' && (p.isVintage || p.condition === 'Vintage')));
    if (f.boxPapers.length) result = result.filter((p) => f.boxPapers.some((opt) => opt === 'Box included' && p.boxIncluded || opt === 'Papers included' && p.papersIncluded || opt === 'Full set' && p.boxIncluded && p.papersIncluded));
    if (f.availability.length) result = result.filter((p) => f.availability.includes(p.availability));
    if (f.priceMin) result = result.filter((p) => getPricing(p).price != null && getPricing(p).price >= Number(f.priceMin));
    if (f.priceMax) result = result.filter((p) => getPricing(p).price != null && getPricing(p).price <= Number(f.priceMax));
    if (quickFilter.length) result = result.filter((p) => matchesBrandQuickFilter(p, quickFilter));
    return [...result].sort((a, b) => {
      switch (sortBy) {
        case 'price': return (getPricing(a).price ?? Infinity) - (getPricing(b).price ?? Infinity);
        case '-price': return (getPricing(b).price ?? -Infinity) - (getPricing(a).price ?? -Infinity);
        case '-yearOfProduction': return (b.yearOfProduction || 0) - (a.yearOfProduction || 0);
        case 'limited': return (b.isLimitedEdition ? 1 : 0) - (a.isLimitedEdition ? 1 : 0) || new Date(b.created_date) - new Date(a.created_date);
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
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-[hsl(var(--primary))]">{t('productGrid.heading', { brand: BRAND })}</h2>
        </div>

        <BrandQuickFilters chips={PANERAI_QUICK_FILTERS} collections={PANERAI_COLLECTIONS} activeFilter={quickFilter} getLabel={(chip) => localize(chip, 'label')} onSelect={setQuickFilter} />

        <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
          <button onClick={() => setMobileFiltersOpen(true)} className="flex min-h-10 items-center gap-2 rounded-full bg-primary px-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary-foreground shadow-sm">
            <SlidersHorizontal size={14} /> {t('productGrid.filter')}
          </button>
          <p className="hidden md:block text-xs text-muted-foreground">{t('productGrid.timepieces', { count: filtered.length })}</p>
          <div className="flex items-center gap-2 ml-auto">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-transparent border border-border text-xs text-foreground px-3 py-2 outline-none focus:border-primary">
              {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value} className="bg-popover text-foreground">{o.label}</option>)}
            </select>
          </div>
        </div>

        <div className="flex gap-10">
          <aside className="brand-filter-shell">
            <PaneraiFilterSidebar filters={filters} setFilters={setFilters} />
          </aside>
          <div className="flex-1">
            {loading ?
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => <div key={i} className="aspect-[3/4] animate-pulse bg-card" />)}
              </div> :
            filtered.length === 0 ?
              <div className="text-center py-20">
                <p className="text-sm text-muted-foreground">{t('productGrid.noMatches', { brand: BRAND })}</p>
                <LocalizedLink to="/panerai-uhr" className="text-[11px] tracking-[0.12em] uppercase underline mt-4 inline-block text-primary">{t('seoLanding.viewAll', { brand: BRAND })}</LocalizedLink>
              </div> :
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {visibleItems.map((p) => <PaneraiProductCard key={p.id} product={p} />)}
                </div>
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
        resultsLabel={t('productGrid.showResults', { count: filtered.length })}
      >
        <PaneraiFilterSidebar filters={filters} setFilters={setFilters} />
      </BrandFilterDrawer>
    </section>
  );
}
