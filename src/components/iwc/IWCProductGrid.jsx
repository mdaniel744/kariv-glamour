import React, { useState, useMemo } from 'react';
import { useStorefrontPricing } from '@/lib/currencyContext';
import LocalizedLink from '@/components/LocalizedLink';
import { useBrandProducts } from '@/hooks/useBrandProducts';
import { useTranslation } from 'react-i18next';
import { useLocalizedField } from '@/lib/localize';
import { SlidersHorizontal } from 'lucide-react';
import BrandFilterDrawer from '@/components/shared/BrandFilterDrawer';
import IWCFilterSidebar from './IWCFilterSidebar';
import IWCProductCard from './IWCProductCard';
import { IWC_COLLECTIONS, IWC_QUICK_FILTERS } from '@/lib/iwcData';
import BrandQuickFilters, { matchesBrandQuickFilter } from '@/components/shared/BrandQuickFilters';

const BRAND = 'IWC Schaffhausen';

const parseSize = (s) => { if (!s) return null; const m = String(s).match(/(\d+(\.\d+)?)/); return m ? parseFloat(m[1]) : null; };

const matchesFeature = (p, feat) => {
  const fl = feat.toLowerCase();
  const fields = [p.functions, p.model, p.productTitle, p.dialColor, p.caseMaterial, p.movementType, p.braceletMaterial].filter(Boolean).join(' ').toLowerCase();
  if (fl === 'limited edition') return p.isLimitedEdition;
  if (fl === 'automatic') return fields.includes('automatic') || fields.includes('self-winding');
  if (fl === 'chronograph') return fields.includes('chronograph');
  if (fl === 'perpetual calendar') return fields.includes('perpetual');
  if (fl === 'annual calendar') return fields.includes('annual');
  if (fl === 'moonphase') return fields.includes('moonphase') || fields.includes('moon phase');
  if (fl === 'big pilot') return fields.includes('big pilot');
  if (fl === 'pilot watch') return fields.includes('pilot');
  if (fl === 'dress watch') return fields.includes('dress') || fields.includes('portofino') || fields.includes('portugieser');
  if (fl === 'dive watch') return fields.includes('dive') || fields.includes('aquatimer');
  if (fl === 'gmt / timezoner') return fields.includes('gmt') || fields.includes('timezoner');
  if (fl === 'power reserve') return fields.includes('power reserve') || fields.includes('7 days');
  if (fl === 'small seconds') return fields.includes('small seconds');
  if (fl === 'integrated bracelet') return fields.includes('integrated');
  if (fl === 'exhibition caseback') return fields.includes('exhibition') || fields.includes('caseback');
  if (fl === 'in-house calibre') return fields.includes('in-house') || fields.includes('calibre');
  if (fl === 'soft-iron inner case') return fields.includes('soft-iron') || fields.includes('anti-magnetic');
  if (fl === 'bronze case') return fields.includes('bronze');
  if (fl === 'ceramic case') return fields.includes('ceramic');
  if (fl === 'titanium case') return fields.includes('titanium');
  return fields.includes(fl);
};

export default function IWCProductGrid() {
  const { t } = useTranslation('brandComponents');
  const { getPricing } = useStorefrontPricing();
  const { localize } = useLocalizedField();
  const { products, loading } = useBrandProducts(BRAND);
  const [sortBy, setSortBy] = useState('-created_date');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [quickFilter, setQuickFilter] = useState([]);
  const [filters, setFilters] = useState({ collection: [], caseMaterial: [], movementType: [], dialColor: [], features: [], braceletMaterial: [], condition: [], gender: [], caseSize: [], boxPapers: [], availability: [], type: [], priceMin: '', priceMax: '' });

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

  return (
    <section id="shop" className="brand-products-section bg-secondary py-5 sm:py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="hidden">
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-3 text-primary">{t('productGrid.eyebrow')}</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">{t('productGrid.heading', { brand: BRAND })}</h2>
        </div>

        <BrandQuickFilters chips={IWC_QUICK_FILTERS} collections={IWC_COLLECTIONS} activeFilter={quickFilter} getLabel={(chip) => localize(chip, 'label')} onSelect={setQuickFilter} />

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
            <IWCFilterSidebar filters={filters} setFilters={setFilters} />
          </aside>
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => <div key={i} className="aspect-[3/4] animate-pulse bg-card" />)}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-sm text-muted-foreground">{t('productGrid.noMatches', { brand: BRAND })}</p>
                <LocalizedLink to="/iwc-schaffhausen-uhr" className="text-[11px] tracking-[0.12em] uppercase underline mt-4 inline-block text-primary">{t('seoLanding.viewAll', { brand: BRAND })}</LocalizedLink>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {filtered.map(p => <IWCProductCard key={p.id} product={p} />)}
              </div>
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
        <IWCFilterSidebar filters={filters} setFilters={setFilters} />
      </BrandFilterDrawer>
    </section>
  );
}
