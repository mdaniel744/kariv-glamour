import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useSearchParams } from 'react-router-dom';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import SEO from '@/components/SEO';
import ProductCard from '@/components/shared/ProductCard';
import ShopFilters from '@/components/shop/ShopFilters';
import { SORT_OPTIONS } from '@/lib/constants';
import { SlidersHorizontal, X, Grid3X3, LayoutGrid, ChevronRight } from 'lucide-react';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t, i18n } = useTranslation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || '-created_date');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [gridCols, setGridCols] = useState(3);
  const [page, setPage] = useState(parseInt(searchParams.get('page') || '1'));
  const [hasMore, setHasMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const [filters, setFilters] = useState({
    brand: searchParams.getAll('brand') || [],
    condition: searchParams.getAll('condition') || [],
    gender: searchParams.getAll('gender') || [],
    caseMaterial: searchParams.getAll('caseMaterial') || [],
    dialColor: searchParams.getAll('dialColor') || [],
    movementType: searchParams.getAll('movementType') || [],
    availability: searchParams.getAll('availability') || [],
    priceMin: searchParams.get('priceMin') || '',
    priceMax: searchParams.get('priceMax') || ''
  });

  // Sync filters to URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.brand.length) filters.brand.forEach(b => params.append('brand', b));
    if (filters.condition.length) filters.condition.forEach(c => params.append('condition', c));
    if (filters.gender.length) filters.gender.forEach(g => params.append('gender', g));
    if (filters.caseMaterial.length) filters.caseMaterial.forEach(m => params.append('caseMaterial', m));
    if (filters.dialColor.length) filters.dialColor.forEach(c => params.append('dialColor', c));
    if (filters.movementType.length) filters.movementType.forEach(m => params.append('movementType', m));
    if (filters.availability.length) filters.availability.forEach(a => params.append('availability', a));
    if (filters.priceMin) params.set('priceMin', filters.priceMin);
    if (filters.priceMax) params.set('priceMax', filters.priceMax);
    if (page > 1) params.set('page', page.toString());
    if (sortBy !== '-created_date') params.set('sort', sortBy);
    setSearchParams(params, { replace: true });
  }, [filters, page, sortBy, setSearchParams]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [filters]);

  // Fetch products via backend function
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        params.set('skip', ((page - 1) * 50).toString());
        params.set('limit', '50');
        params.set('sortBy', sortBy);
        
        if (filters.brand.length) filters.brand.forEach(b => params.append('brand', b));
        if (filters.condition.length) filters.condition.forEach(c => params.append('condition', c));
        if (filters.gender.length) filters.gender.forEach(g => params.append('gender', g));
        if (filters.caseMaterial.length) filters.caseMaterial.forEach(m => params.append('caseMaterial', m));
        if (filters.dialColor.length) filters.dialColor.forEach(c => params.append('dialColor', c));
        if (filters.movementType.length) filters.movementType.forEach(m => params.append('movementType', m));
        if (filters.availability.length) filters.availability.forEach(a => params.append('availability', a));
        if (filters.priceMin) params.set('priceMin', filters.priceMin);
        if (filters.priceMax) params.set('priceMax', filters.priceMax);
        
        const search = searchParams.get('search');
        if (search) params.set('search', search);
        if (searchParams.get('isNewArrival')) params.set('isNewArrival', 'true');
        if (searchParams.get('isCertifiedPreOwned')) params.set('isCertifiedPreOwned', 'true');
        if (searchParams.get('isVintage')) params.set('isVintage', 'true');

        const res = await base44.functions.invoke('searchProducts', { query: params.toString() });
        setProducts(res.data.products || []);
        setHasMore(res.data.hasMore || false);
        setTotalCount((page - 1) * 50 + (res.data.count || 0));
      } catch (e) {
        console.error(e);
        setError(t('common:error') || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [filters, sortBy, page, searchParams, t]);

  const getPageTitle = () => {
    const search = searchParams.get('search');
    if (searchParams.get('isNewArrival')) return t('common:shop.newArrivals');
    if (searchParams.get('isCertifiedPreOwned')) return t('common:shop.certifiedPreOwned');
    if (searchParams.get('isVintage')) return t('common:shop.vintage');
    if (searchParams.get('gender') === 'Men') return t('common:shop.mensWatches');
    if (searchParams.get('gender') === 'Women') return t('common:shop.womensWatches');
    if (search) return t('common:shop.searchResults', { query: search });
    return t('common:shop.allWatches');
  };

  const pageTitle = getPageTitle();
  const seoTitle = `${t('common:seo.shop.title')} — ${pageTitle}`;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">
      <SEO title={seoTitle} description={t('common:seo.shop.description')} />
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[10px] tracking-[0.1em] uppercase text-muted-foreground mb-6">
        <LocalizedLink to="/" className="hover:text-foreground">{t('common:home')}</LocalizedLink>
        <ChevronRight size={10} />
        <LocalizedLink to="/shop" className="hover:text-foreground">{t('common:shop.title')}</LocalizedLink>
        {pageTitle !== t('common:shop.allWatches') && (
          <>
            <ChevronRight size={10} />
            <span className="text-foreground">{pageTitle}</span>
          </>
        )}
      </div>

      {/* Header */}
      <div className="mb-10">
        <span className="text-[10px] tracking-[0.3em] uppercase text-primary mb-2 block">{t('common:collection')}</span>
        <h1 className="font-display text-3xl md:text-5xl font-light text-foreground tracking-tight">{pageTitle}</h1>
        <p className="text-sm text-muted-foreground mt-2">{products.length} {t('common:shop.title')}</p>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="md:hidden flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase text-foreground"
        >
          <SlidersHorizontal size={14} /> {t('common:shop.filters')}
        </button>
        <div className="flex items-center gap-4">
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="bg-transparent border border-border text-xs text-foreground px-3 py-2 outline-none focus:border-primary"
          >
            {SORT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value} className="bg-popover text-foreground">{opt.label}</option>
            ))}
          </select>
          <div className="hidden md:flex items-center gap-2">
            <button onClick={() => setGridCols(3)} className={`p-1.5 ${gridCols === 3 ? 'text-primary' : 'text-muted-foreground/50'}`}>
              <Grid3X3 size={16} />
            </button>
            <button onClick={() => setGridCols(4)} className={`p-1.5 ${gridCols === 4 ? 'text-primary' : 'text-muted-foreground/50'}`}>
              <LayoutGrid size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-10">
        {/* Desktop Filters */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <ShopFilters filters={filters} setFilters={setFilters} />
        </aside>

        {/* Products grid */}
        <div className="flex-1">
          {loading ? (
            <div className={`grid grid-cols-2 ${gridCols === 4 ? 'md:grid-cols-4' : 'md:grid-cols-3'} gap-6`}>
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[3/4] bg-card mb-4" />
                  <div className="h-3 bg-card w-20 mb-2" />
                  <div className="h-3 bg-card w-full" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-destructive text-sm">{error}</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-sm">{t('common:shop.noWatchesFound')}</p>
            </div>
          ) : (
            <div className={`grid grid-cols-2 ${gridCols === 4 ? 'md:grid-cols-4' : 'md:grid-cols-3'} gap-6`}>
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {products.length > 0 && (
            <div className="mt-12 flex items-center justify-center gap-4">
              {page > 1 && (
                <button
                  onClick={() => setPage(page - 1)}
                  className="px-4 py-2 border border-border text-xs uppercase tracking-[0.1em] hover:border-foreground transition-colors"
                >
                  {t('common:previous')}
                </button>
              )}
              <span className="text-xs text-muted-foreground">
                {t('common:page')} {page}
              </span>
              {hasMore && (
                <button
                  onClick={() => setPage(page + 1)}
                  className="px-4 py-2 border border-border text-xs uppercase tracking-[0.1em] hover:border-foreground transition-colors"
                >
                  {t('common:next')}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl text-foreground">{t('common:shop.filters')}</h2>
              <button onClick={() => setMobileFiltersOpen(false)} className="text-muted-foreground">
                <X size={20} />
              </button>
            </div>
            <ShopFilters filters={filters} setFilters={setFilters} />
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="w-full mt-8 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium py-4"
            >
              {t('common:shop.showResults', { count: products.length })}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}