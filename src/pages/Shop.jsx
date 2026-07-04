import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import SEO from '@/components/SEO';
import ProductCard from '@/components/shared/ProductCard';
import ShopFilters from '@/components/shop/ShopFilters';
import { SORT_OPTIONS } from '@/lib/constants';
import { SlidersHorizontal, X, Grid3X3, LayoutGrid, ChevronRight, Search, AlertCircle, RotateCcw } from 'lucide-react';

const PAGE_SIZE = 24;

// Default filter state
const DEFAULT_FILTERS = {
  search: '',
  brand: [],
  condition: [],
  gender: [],
  caseMaterial: [],
  dialColor: [],
  movementType: [],
  availability: [],
  priceMin: '',
  priceMax: '',
  yearFrom: '',
  yearTo: '',
  isNewArrival: null,
  isCertifiedPreOwned: null,
  isVintage: null
};

// Parse URL search params into filter state
function parseFiltersFromURL(searchParams) {
  const filters = { ...DEFAULT_FILTERS };
  filters.search = searchParams.get('search') || '';
  filters.brand = searchParams.getAll('brand');
  filters.condition = searchParams.getAll('condition');
  filters.gender = searchParams.getAll('gender');
  filters.caseMaterial = searchParams.getAll('caseMaterial');
  filters.dialColor = searchParams.getAll('dialColor');
  filters.movementType = searchParams.getAll('movementType');
  filters.availability = searchParams.getAll('availability');
  filters.priceMin = searchParams.get('priceMin') || '';
  filters.priceMax = searchParams.get('priceMax') || '';
  filters.yearFrom = searchParams.get('yearFrom') || '';
  filters.yearTo = searchParams.get('yearTo') || '';
  filters.isNewArrival = searchParams.get('isNewArrival') === 'true' ? true : null;
  filters.isCertifiedPreOwned = searchParams.get('isCertifiedPreOwned') === 'true' ? true : null;
  filters.isVintage = searchParams.get('isVintage') === 'true' ? true : null;
  return filters;
}

// Serialize filter state into URL search params
function serializeFiltersToURL(filters, page, sortBy) {
  const params = new URLSearchParams();
  if (filters.search) params.set('search', filters.search);
  if (filters.brand.length) filters.brand.forEach(b => params.append('brand', b));
  if (filters.condition.length) filters.condition.forEach(c => params.append('condition', c));
  if (filters.gender.length) filters.gender.forEach(g => params.append('gender', g));
  if (filters.caseMaterial.length) filters.caseMaterial.forEach(m => params.append('caseMaterial', m));
  if (filters.dialColor.length) filters.dialColor.forEach(c => params.append('dialColor', c));
  if (filters.movementType.length) filters.movementType.forEach(m => params.append('movementType', m));
  if (filters.availability.length) filters.availability.forEach(a => params.append('availability', a));
  if (filters.priceMin) params.set('priceMin', filters.priceMin);
  if (filters.priceMax) params.set('priceMax', filters.priceMax);
  if (filters.yearFrom) params.set('yearFrom', filters.yearFrom);
  if (filters.yearTo) params.set('yearTo', filters.yearTo);
  if (filters.isNewArrival) params.set('isNewArrival', 'true');
  if (filters.isCertifiedPreOwned) params.set('isCertifiedPreOwned', 'true');
  if (filters.isVintage) params.set('isVintage', 'true');
  if (page > 1) params.set('page', page.toString());
  if (sortBy && sortBy !== 'newest') params.set('sort', sortBy);
  return params;
}

// Build the backend search payload from filter state
function buildSearchPayload(filters, page, sortBy) {
  const payload = {
    search: filters.search || '',
    brands: filters.brand,
    collections: [],
    categories: [],
    conditions: filters.condition,
    availability: filters.availability,
    genders: filters.gender,
    materials: filters.caseMaterial,
    minPrice: filters.priceMin ? Number(filters.priceMin) : null,
    maxPrice: filters.priceMax ? Number(filters.priceMax) : null,
    yearFrom: filters.yearFrom ? Number(filters.yearFrom) : null,
    yearTo: filters.yearTo ? Number(filters.yearTo) : null,
    isNewArrival: filters.isNewArrival,
    isCertifiedPreOwned: filters.isCertifiedPreOwned,
    isVintage: filters.isVintage,
    sort: sortBy || 'newest',
    page: page,
    pageSize: PAGE_SIZE
  };
  // Also pass dialColor and movementType through materials if needed
  // (backend supports materials as caseMaterial for now)
  return payload;
}

// Check if filters have any active values
function hasActiveFilters(filters) {
  return !!(filters.search ||
    filters.brand.length ||
    filters.condition.length ||
    filters.gender.length ||
    filters.caseMaterial.length ||
    filters.dialColor.length ||
    filters.movementType.length ||
    filters.availability.length ||
    filters.priceMin ||
    filters.priceMax ||
    filters.yearFrom ||
    filters.yearTo ||
    filters.isNewArrival ||
    filters.isCertifiedPreOwned ||
    filters.isVintage);
}

// Generate a cache key for filter state comparison
function filterCacheKey(filters) {
  return JSON.stringify(filters);
}

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();

  // Initialize state from URL
  const [filters, setFilters] = useState(() => parseFiltersFromURL(searchParams));
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest');
  const [page, setPage] = useState(parseInt(searchParams.get('page') || '1'));

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [gridCols, setGridCols] = useState(3);

  // Refs for stale request cancellation
  const requestIdRef = useRef(0);
  const isInitializedRef = useRef(false);

  // ── Sync filter changes to URL ──
  // This runs when filters/sort/page change from user interaction.
  // We use replace to avoid polluting history on every filter toggle.
  const syncURL = useCallback((newFilters, newPage, newSort) => {
    const params = serializeFiltersToURL(newFilters, newPage, newSort);
    setSearchParams(params, { replace: false });
  }, [setSearchParams]);

  // ── Handle URL changes (back/forward navigation) ──
  // When the URL changes (e.g., back button), parse it and update state
  // WITHOUT re-syncing to URL (which would cause a loop).
  useEffect(() => {
    if (!isInitializedRef.current) {
      isInitializedRef.current = true;
      return; // Skip first render — state already initialized from URL
    }

    const urlFilters = parseFiltersFromURL(searchParams);
    const urlPage = parseInt(searchParams.get('page') || '1');
    const urlSort = searchParams.get('sort') || 'newest';

    setFilters(urlFilters);
    setPage(urlPage);
    setSortBy(urlSort);
  }, [searchParams]);

  // ── Fetch products when filters/sort/page change ──
  useEffect(() => {
    const currentRequestId = ++requestIdRef.current;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const payload = buildSearchPayload(filters, page, sortBy);
        const res = await base44.functions.invoke('searchProducts', payload);

        // Ignore stale responses — only process if this is the latest request
        if (currentRequestId !== requestIdRef.current) return;

        setProducts(res.data.items || []);
        setTotalCount(res.data.totalCount || 0);
        setTotalPages(res.data.totalPages || 0);
        setHasMore(res.data.hasMore || false);
      } catch (e) {
        if (currentRequestId !== requestIdRef.current) return;
        console.error(e);
        setError(e.response?.data?.error || t('common:error') || 'Failed to load products');
      } finally {
        if (currentRequestId === requestIdRef.current) {
          setLoading(false);
        }
      }
    };
    load();
  }, [filterCacheKey(filters), sortBy, page, t]);

  // ── Filter change handlers ──
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1); // Reset to page 1 when filters change
    syncURL(newFilters, 1, sortBy);
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    syncURL(filters, page, newSort);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    syncURL(filters, newPage, sortBy);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearFilters = () => {
    setFilters({ ...DEFAULT_FILTERS });
    setPage(1);
    syncURL({ ...DEFAULT_FILTERS }, 1, 'newest');
  };

  const handleRetry = () => {
    // Force re-fetch by incrementing request ID
    setPage(prev => prev);
    const currentRequestId = ++requestIdRef.current;
    setLoading(true);
    setError(null);
    const payload = buildSearchPayload(filters, page, sortBy);
    base44.functions.invoke('searchProducts', payload)
      .then(res => {
        if (currentRequestId !== requestIdRef.current) return;
        setProducts(res.data.items || []);
        setTotalCount(res.data.totalCount || 0);
        setTotalPages(res.data.totalPages || 0);
        setHasMore(res.data.hasMore || false);
      })
      .catch(e => {
        if (currentRequestId !== requestIdRef.current) return;
        setError(e.response?.data?.error || 'Failed to load products');
      })
      .finally(() => {
        if (currentRequestId === requestIdRef.current) setLoading(false);
      });
  };

  const getPageTitle = () => {
    if (filters.isNewArrival) return t('common:shop.newArrivals');
    if (filters.isCertifiedPreOwned) return t('common:shop.certifiedPreOwned');
    if (filters.isVintage) return t('common:shop.vintage');
    if (filters.gender.includes('Men') && filters.gender.length === 1) return t('common:shop.mensWatches');
    if (filters.gender.includes('Women') && filters.gender.length === 1) return t('common:shop.womensWatches');
    if (filters.search) return t('common:shop.searchResults', { query: filters.search });
    return t('common:shop.allWatches');
  };

  const pageTitle = getPageTitle();
  const seoTitle = `${t('common:seo.shop.title')} — ${pageTitle}`;
  const activeFilterCount = hasActiveFilters(filters);

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
        <p className="text-sm text-muted-foreground mt-2">
          {loading ? '…' : `${totalCount} ${t('common:shop.title')}`}
        </p>
      </div>

      {/* Search bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={filters.search}
            onChange={e => handleFiltersChange({ ...filters, search: e.target.value })}
            placeholder={t('common:shop.searchPlaceholder') || 'Search watches...'}
            className="w-full pl-9 pr-4 py-2.5 bg-card border border-border text-sm text-foreground outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="md:hidden flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase text-foreground"
        >
          <SlidersHorizontal size={14} /> {t('common:shop.filters')}
          {activeFilterCount > 0 && <span className="text-[9px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full">{activeFilterCount}</span>}
        </button>
        <div className="flex items-center gap-4 ml-auto">
          <select
            value={sortBy}
            onChange={e => handleSortChange(e.target.value)}
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
          {activeFilterCount > 0 && (
            <button onClick={handleClearFilters} className="flex items-center gap-1 text-[10px] tracking-[0.1em] uppercase text-primary mb-4 hover:text-foreground transition-colors">
              <X size={12} /> {t('common:shop.clearAllFilters')}
            </button>
          )}
          <ShopFilters filters={filters} setFilters={handleFiltersChange} />
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
              <AlertCircle size={32} className="text-destructive mx-auto mb-4" />
              <p className="text-destructive text-sm mb-4">{error}</p>
              <button onClick={handleRetry} className="flex items-center gap-2 text-xs px-4 py-2 border border-border hover:border-foreground transition-colors mx-auto">
                <RotateCcw size={14} /> {t('common:retry') || 'Retry'}
              </button>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-sm mb-4">{t('common:shop.noWatchesFound')}</p>
              {activeFilterCount > 0 && (
                <button onClick={handleClearFilters} className="text-xs underline text-primary">
                  {t('common:shop.clearAllFilters')}
                </button>
              )}
            </div>
          ) : (
            <>
              <div className={`grid grid-cols-2 ${gridCols === 4 ? 'md:grid-cols-4' : 'md:grid-cols-3'} gap-6`}>
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-4">
                  {page > 1 && (
                    <button
                      onClick={() => handlePageChange(page - 1)}
                      className="px-4 py-2 border border-border text-xs uppercase tracking-[0.1em] hover:border-foreground transition-colors"
                    >
                      {t('common:previous')}
                    </button>
                  )}
                  <span className="text-xs text-muted-foreground">
                    {t('common:page')} {page} / {totalPages}
                  </span>
                  {hasMore && (
                    <button
                      onClick={() => handlePageChange(page + 1)}
                      className="px-4 py-2 border border-border text-xs uppercase tracking-[0.1em] hover:border-foreground transition-colors"
                    >
                      {t('common:next')}
                    </button>
                  )}
                </div>
              )}
            </>
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
            <ShopFilters filters={filters} setFilters={handleFiltersChange} />
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="w-full mt-8 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium py-4"
            >
              {t('common:shop.showResults', { count: totalCount })}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}