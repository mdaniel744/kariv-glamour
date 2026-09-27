import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useUrlSearchParams } from '@/hooks/useUrlSearchParams';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import ProductCard from '@/components/shared/ProductCard';
import ShopFilters from '@/components/shop/ShopFilters';
import { SlidersHorizontal, X, ChevronRight, Search, AlertCircle, RotateCcw } from 'lucide-react';
import { positivePage, SHOP_PAGE_SIZE } from '@/lib/shopSearch';
import { searchShopProductsAction } from '@/actions/shopSearch';
import { useStorefrontPricing } from '@/lib/currencyContext';

// Default filter state
const DEFAULT_FILTERS = {
  search: '',
  brand: [],
  model: [],
  collection: [],
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
  filters.model = searchParams.getAll('model');
  filters.collection = searchParams.getAll('collection');
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
  if (filters.model.length) filters.model.forEach(m => params.append('model', m));
  if (filters.collection.length) filters.collection.forEach(c => params.append('collection', c));
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

// Build the shared catalogue search payload from filter state.
function buildSearchPayload(filters, page, sortBy, locale, exchangeRates) {
  const payload = {
    search: filters.search || '',
    brands: filters.brand,
    models: filters.model,
    collections: filters.collection,
    categories: [],
    conditions: filters.condition,
    availability: filters.availability,
    genders: filters.gender,
    materials: filters.caseMaterial,
    dialColors: filters.dialColor,
    movementTypes: filters.movementType,
    minPrice: filters.priceMin ? Number(filters.priceMin) : null,
    maxPrice: filters.priceMax ? Number(filters.priceMax) : null,
    yearFrom: filters.yearFrom ? Number(filters.yearFrom) : null,
    yearTo: filters.yearTo ? Number(filters.yearTo) : null,
    isNewArrival: filters.isNewArrival,
    isCertifiedPreOwned: filters.isCertifiedPreOwned,
    isVintage: filters.isVintage,
    sort: sortBy || 'newest',
    page: page,
    pageSize: SHOP_PAGE_SIZE,
    locale,
    exchangeRates,
  };
  return payload;
}

// Generate a cache key for filter state comparison
function filterCacheKey(filters) {
  return JSON.stringify(filters);
}

const searchProducts = (payload) => searchShopProductsAction(payload);

export default function Shop({ initialResults = null }) {
  const [searchParams, setSearchParams] = useUrlSearchParams();
  const { t } = useTranslation();
  const { locale, exchangeRates } = useStorefrontPricing();
  const sortOptions = [
    { value: 'newest', label: t('common:shop.sortNewest') },
    { value: 'price_low', label: t('common:shop.sortPriceLow') },
    { value: 'price_high', label: t('common:shop.sortPriceHigh') },
    { value: 'name_asc', label: t('common:shop.sortNameAsc') },
    { value: 'name_desc', label: t('common:shop.sortNameDesc') },
  ];

  // Initialize state from URL
  const [filters, setFilters] = useState(() => parseFiltersFromURL(searchParams));
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest');
  const [page, setPage] = useState(() => positivePage(searchParams.get('page')));

  const [products, setProducts] = useState(() => initialResults?.items || []);
  const [loading, setLoading] = useState(() => !initialResults);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(() => initialResults?.totalCount || 0);
  const [totalPages, setTotalPages] = useState(() => initialResults?.totalPages || 0);
  const [hasMore, setHasMore] = useState(() => initialResults?.hasMore || false);

  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    if (!filtersOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setFiltersOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [filtersOpen]);

  // Refs for stale request cancellation
  const requestIdRef = useRef(0);
  const isInitializedRef = useRef(false);
  const skipInitialLoadRef = useRef(Boolean(initialResults));

  // ── Sync filter changes to URL ──
  // This runs when filters/sort/page change from user interaction.
  // Keep deliberate filter changes available through back/forward navigation.
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
    const urlPage = positivePage(searchParams.get('page'));
    const urlSort = searchParams.get('sort') || 'newest';

    setFilters(urlFilters);
    setPage(urlPage);
    setSortBy(urlSort);
  }, [searchParams]);

  // ── Fetch products when filters/sort/page change ──
  useEffect(() => {
    if (skipInitialLoadRef.current) {
      skipInitialLoadRef.current = false;
      return;
    }
    const currentRequestId = ++requestIdRef.current;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const payload = buildSearchPayload(filters, page, sortBy, locale, exchangeRates);
        const results = await searchProducts(payload);

        // Ignore stale responses — only process if this is the latest request
        if (currentRequestId !== requestIdRef.current) return;

        setProducts(results.items || []);
        setTotalCount(results.totalCount || 0);
        setTotalPages(results.totalPages || 0);
        setHasMore(results.hasMore || false);
        if (results.page !== page) {
          setPage(results.page);
          syncURL(filters, results.page, sortBy);
        }
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
  }, [filterCacheKey(filters), sortBy, page, locale, exchangeRates, t, syncURL]);

  // ── Filter change handlers ──
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1); // Reset to page 1 when filters change
    syncURL(newFilters, 1, sortBy);
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    setPage(1);
    syncURL(filters, 1, newSort);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    syncURL(filters, newPage, sortBy);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearFilters = () => {
    setFilters({ ...DEFAULT_FILTERS });
    setPage(1);
    syncURL({ ...DEFAULT_FILTERS }, 1, sortBy);
  };

  const handleRetry = () => {
    // Force re-fetch by incrementing request ID
    setPage(prev => prev);
    const currentRequestId = ++requestIdRef.current;
    setLoading(true);
    setError(null);
    const payload = buildSearchPayload(filters, page, sortBy, locale, exchangeRates);
    searchProducts(payload)
      .then(results => {
        if (currentRequestId !== requestIdRef.current) return;
        setProducts(results.items || []);
        setTotalCount(results.totalCount || 0);
        setTotalPages(results.totalPages || 0);
        setHasMore(results.hasMore || false);
        if (results.page !== page) {
          setPage(results.page);
          syncURL(filters, results.page, sortBy);
        }
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
    if (filters.model.length === 1) return `${filters.brand[0] ? `${filters.brand[0]} ` : ''}${filters.model[0]}`;
    if (filters.collection.length === 1) return `${filters.brand[0] ? `${filters.brand[0]} ` : ''}${filters.collection[0]}`;
    if (filters.brand.length === 1) return `${filters.brand[0]} ${t('common:shop.title')}`;
    if (filters.gender.includes('Men') && filters.gender.length === 1) return t('common:shop.mensWatches');
    if (filters.gender.includes('Women') && filters.gender.length === 1) return t('common:shop.womensWatches');
    if (filters.search) return t('common:shop.searchResults', { query: filters.search });
    return t('common:shop.allWatches');
  };

  const pageTitle = getPageTitle();
  const activeFilterCount = Object.values(filters).reduce((count, value) => {
    if (Array.isArray(value)) return count + value.length;
    return count + (value ? 1 : 0);
  }, 0);
  const quickFilters = [
    { key: 'isNewArrival', value: true, label: t('common:shop.newArrivals') },
    { key: 'isCertifiedPreOwned', value: true, label: t('common:shop.certifiedPreOwned') },
    { key: 'isVintage', value: true, label: t('common:shop.vintage') },
    { key: 'gender', value: 'Men', label: t('common:shop.mensWatches') },
    { key: 'gender', value: 'Women', label: t('common:shop.womensWatches') },
    { key: 'dialColor', value: 'Black', label: t('common:shop.blackDial') },
    { key: 'dialColor', value: 'Blue', label: t('common:shop.blueDial') },
    { key: 'caseMaterial', value: 'Stainless Steel', label: t('common:shop.steelCase') },
    { key: 'caseMaterial', value: 'Rose Gold', label: t('common:shop.roseGoldCase') },
    { key: 'movementType', value: 'Automatic', label: t('common:shop.automaticMovement') },
  ];

  const isQuickFilterActive = ({ key, value }) => (
    Array.isArray(filters[key]) ? filters[key].includes(value) : filters[key] === value
  );

  const toggleQuickFilter = ({ key, value }) => {
    const currentValue = filters[key];
    const nextValue = Array.isArray(currentValue)
      ? (currentValue.includes(value) ? currentValue.filter(item => item !== value) : [...currentValue, value])
      : (currentValue === value ? null : value);
    handleFiltersChange({ ...filters, [key]: nextValue });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">
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
        <p className="text-sm text-muted-foreground mt-2" aria-live="polite">
          {loading ? '…' : error ? t('common:error') : `${new Intl.NumberFormat(locale).format(totalCount)} ${t('common:shop.title')}`}
        </p>
      </div>

      {/* Search bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            aria-label={t('common:shop.searchPlaceholder')}
            value={filters.search}
            onChange={e => handleFiltersChange({ ...filters, search: e.target.value })}
            placeholder={t('common:shop.searchPlaceholder') || 'Search watches...'}
            className="w-full pl-9 pr-4 py-2.5 bg-card border border-border text-sm text-foreground outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Floating quick filters and full filter trigger */}
      <div className="sticky top-[102px] z-30 -mx-2 mb-8 rounded-xl border border-border/80 bg-background/95 p-2 shadow-sm backdrop-blur-xl md:top-[154px] md:-mx-4 md:p-3">
        <div className="no-scrollbar flex items-center gap-2 overflow-x-auto overscroll-x-contain scroll-smooth">
          <button
            type="button"
            onClick={() => setFiltersOpen(true)}
            className="flex min-h-10 flex-none items-center gap-2 rounded-full border border-primary bg-primary px-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary-foreground shadow-sm"
          >
            <SlidersHorizontal size={14} /> {t('common:shop.filters')}
            {activeFilterCount > 0 && <span className="rounded-full bg-primary-foreground/20 px-2 py-0.5 text-[10px]">{activeFilterCount}</span>}
          </button>
          {quickFilters.map((quickFilter) => {
            const active = isQuickFilterActive(quickFilter);
            return (
              <button
                key={`${quickFilter.key}-${quickFilter.value}`}
                type="button"
                onClick={() => toggleQuickFilter(quickFilter)}
                aria-pressed={active}
                className={`min-h-10 flex-none whitespace-nowrap rounded-full border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors ${active
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-background/80 text-foreground hover:border-primary hover:text-primary'
                }`}
              >
                {quickFilter.label}
              </button>
            );
          })}
        </div>

        <div className="mt-2 flex items-center justify-between gap-3 border-t border-border/70 pt-2">
          <div className="min-w-0 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            {activeFilterCount > 0 ? (
              <button type="button" onClick={handleClearFilters} className="inline-flex items-center gap-1.5 text-primary hover:text-foreground">
                <X size={12} /> {t('common:shop.clearAllFilters')} ({activeFilterCount})
              </button>
            ) : (
              <span>{t('common:shop.quickFilters')}</span>
            )}
          </div>
          <select
            value={sortBy}
            onChange={e => handleSortChange(e.target.value)}
            aria-label={t('common:shop.sortLabel')}
            className="max-w-[52vw] rounded-full border border-border bg-transparent px-3 py-2 text-xs text-foreground outline-none focus:border-primary"
          >
            {sortOptions.map(opt => (
              <option key={opt.value} value={opt.value} className="bg-popover text-foreground">{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products grid */}
      <div>
          {loading ? (
            <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="mb-4 aspect-[3/4] rounded-xl bg-card" />
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
              <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} enableGallery />
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

      {/* Full off-canvas filter drawer */}
      {filtersOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-label={t('common:shop.filters')}
          onPointerDown={(event) => {
            if (event.target === event.currentTarget) setFiltersOpen(false);
          }}
        >
          <div className="mr-auto flex h-full w-full max-w-md flex-col border-r border-border bg-background shadow-2xl">
            <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-7">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">{t('common:shop.title')}</span>
                <h2 className="mt-1 font-display text-2xl font-semibold text-foreground">{t('common:shop.filters')}</h2>
              </div>
              <button onClick={() => setFiltersOpen(false)} className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground" aria-label={t('common:close')}>
                <X size={22} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 sm:px-7">
              <ShopFilters filters={filters} setFilters={handleFiltersChange} />
            </div>
            <div className="border-t border-border bg-background px-5 py-4 sm:px-7">
              <button
                onClick={() => setFiltersOpen(false)}
                className="min-h-12 w-full rounded-full bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-primary-foreground"
              >
                {loading ? t('common:shop.loadingWatches') : error ? t('common:close') : t('common:shop.showResults', { count: totalCount })}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
