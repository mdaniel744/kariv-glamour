import React, { useState, useEffect, useMemo } from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { dataClient } from '@/lib/dataClient';
import { asArray } from '@/lib/base44Data';
import { useTranslation } from 'react-i18next';
import { useLocalizedField } from '@/lib/localize';
import { SlidersHorizontal } from 'lucide-react';
import BrandFilterDrawer from '@/components/shared/BrandFilterDrawer';
import CartierFilterSidebar from './CartierFilterSidebar';
import CartierProductCard from './CartierProductCard';
import { CARTIER_COLLECTIONS, CARTIER_QUICK_FILTERS } from '@/lib/cartierData';
import BrandQuickFilters, { matchesBrandQuickFilter } from '@/components/shared/BrandQuickFilters';

const BRAND = 'Cartier';

const parseDiameter = (s) => { if (!s) return null; const m = String(s).match(/(\d+(\.\d+)?)/); return m ? parseFloat(m[1]) : null; };
const sizeRange = (label, d) => {
  if (d == null) return false;
  switch (label) {
    case 'Mini': return d < 30;
    case 'Small': return d >= 30 && d < 35;
    case 'Medium': return d >= 35 && d < 39;
    case 'Large': return d >= 39 && d < 43;
    case 'Extra Large': return d >= 43;
    default: return false;
  }
};

export default function CartierProductGrid() {
  const { t } = useTranslation('brandComponents');
  const { localize } = useLocalizedField();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('-created_date');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [quickFilter, setQuickFilter] = useState([]);
  const [filters, setFilters] = useState({ collection: [], caseMaterial: [], watchShape: [], movementType: [], dialColor: [], braceletMaterial: [], condition: [], gender: [], caseSize: [], boxPapers: [], availability: [], priceMin: '', priceMax: '' });

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = asArray(await dataClient.entities.Products.filter({ brand: BRAND }, '-created_date', 100));
        setProducts(data);
      } catch (e) { console.error(e); } finally { setLoading(false); }
    };
    load();
  }, []);

  const SORT_OPTIONS = [
    { value: '-created_date', label: t('productGrid.sortFeatured') },
    { value: 'newest', label: t('productGrid.sortNewest') },
    { value: 'price', label: t('productGrid.sortPriceLow') },
    { value: '-price', label: t('productGrid.sortPriceHigh') },
    { value: '-yearOfProduction', label: t('productGrid.sortYearNewest') },
    { value: 'popular', label: t('productGrid.sortPopular') },
  ];

  const filtered = useMemo(() => {
    const f = filters;
    let result = products;
    if (f.collection.length) result = result.filter((p) => f.collection.includes(p.collection));
    if (f.caseMaterial.length) result = result.filter((p) => f.caseMaterial.includes(p.caseMaterial));
    if (f.watchShape.length) result = result.filter((p) => f.watchShape.includes(p.watchShape));
    if (f.movementType.length) result = result.filter((p) => f.movementType.includes(p.movementType));
    if (f.dialColor.length) result = result.filter((p) => f.dialColor.includes(p.dialColor));
    if (f.braceletMaterial.length) result = result.filter((p) => f.braceletMaterial.includes(p.braceletMaterial));
    if (f.condition.length) result = result.filter((p) => f.condition.includes(p.condition));
    if (f.gender.length) result = result.filter((p) => f.gender.includes(p.gender));
    if (f.caseSize.length) result = result.filter((p) => { const d = parseDiameter(p.caseDiameter); return f.caseSize.some((s) => sizeRange(s, d)); });
    if (f.boxPapers.length) result = result.filter((p) => f.boxPapers.some((opt) => opt === 'Box included' && p.boxIncluded || opt === 'Papers included' && p.papersIncluded || opt === 'Full set' && p.boxIncluded && p.papersIncluded));
    if (f.availability.length) result = result.filter((p) => f.availability.includes(p.availability));
    if (f.priceMin) result = result.filter((p) => p.price >= Number(f.priceMin));
    if (f.priceMax) result = result.filter((p) => p.price <= Number(f.priceMax));
    if (quickFilter.length) result = result.filter((p) => matchesBrandQuickFilter(p, quickFilter));
    return [...result].sort((a, b) => {
      switch (sortBy) {
        case 'price': return a.price - b.price;
        case '-price': return b.price - a.price;
        case '-yearOfProduction': return (b.yearOfProduction || 0) - (a.yearOfProduction || 0);
        default: return new Date(b.created_date) - new Date(a.created_date);
      }
    });
  }, [products, filters, sortBy, quickFilter]);

  return (
    <section id="shop" className="brand-products-section bg-secondary py-5 sm:py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="hidden">
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-3 text-primary">{t('productGrid.eyebrow')}</span>
          <h2 className="text-3xl md:text-4xl text-foreground [font-family:'Cormorant_Garamond',_serif] font-semibold">{t('productGrid.heading', { brand: BRAND })}</h2>
        </div>

        <BrandQuickFilters chips={CARTIER_QUICK_FILTERS} collections={CARTIER_COLLECTIONS} activeFilter={quickFilter} getLabel={(chip) => localize(chip, 'label')} onSelect={setQuickFilter} />

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
            <CartierFilterSidebar filters={filters} setFilters={setFilters} />
          </aside>
          <div className="flex-1">
            {loading ?
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => <div key={i} className="aspect-[3/4] animate-pulse bg-card" />)}
              </div> :
              filtered.length === 0 ?
                <div className="text-center py-20">
                  <p className="text-sm text-muted-foreground">{t('productGrid.noMatches', { brand: BRAND })}</p>
                  <LocalizedLink to="/cartier-uhr-kaufen" className="text-[11px] tracking-[0.12em] uppercase underline mt-4 inline-block text-primary">{t('seoLanding.viewAll', { brand: BRAND })}</LocalizedLink>
                </div> :
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {filtered.map((p) => <CartierProductCard key={p.id} product={p} />)}
                </div>
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
        <CartierFilterSidebar filters={filters} setFilters={setFilters} />
      </BrandFilterDrawer>
    </section>
  );
}
