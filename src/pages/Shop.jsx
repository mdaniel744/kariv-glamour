import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '@/components/shared/ProductCard';
import ShopFilters from '@/components/shop/ShopFilters';
import { SORT_OPTIONS } from '@/lib/constants';
import { SlidersHorizontal, X, Grid3X3, LayoutGrid } from 'lucide-react';

export default function Shop() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('-created_date');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [gridCols, setGridCols] = useState(3);

  const [filters, setFilters] = useState({
    brand: searchParams.getAll('brand') || [],
    condition: searchParams.getAll('condition') || [],
    gender: searchParams.getAll('gender') || [],
    caseMaterial: [],
    dialColor: [],
    movementType: [],
    priceMin: '',
    priceMax: ''
  });

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const query = {};
        const search = searchParams.get('search');

        if (filters.brand.length === 1) query.brand = filters.brand[0];
        if (filters.condition.length === 1) query.condition = filters.condition[0];
        if (filters.gender.length === 1) query.gender = filters.gender[0];

        if (searchParams.get('isNewArrival')) query.isNewArrival = true;
        if (searchParams.get('isCertifiedPreOwned')) query.isCertifiedPreOwned = true;
        if (searchParams.get('isVintage')) query.isVintage = true;

        let data = await base44.entities.Products.filter(query, sortBy, 50);

        // Client-side filtering for multi-select
        if (filters.brand.length > 1) data = data.filter(p => filters.brand.includes(p.brand));
        if (filters.condition.length > 1) data = data.filter(p => filters.condition.includes(p.condition));
        if (filters.gender.length > 1) data = data.filter(p => filters.gender.includes(p.gender));
        if (filters.caseMaterial.length > 0) data = data.filter(p => filters.caseMaterial.includes(p.caseMaterial));
        if (filters.dialColor.length > 0) data = data.filter(p => filters.dialColor.includes(p.dialColor));
        if (filters.movementType.length > 0) data = data.filter(p => filters.movementType.includes(p.movementType));
        if (filters.priceMin) data = data.filter(p => p.price >= Number(filters.priceMin));
        if (filters.priceMax) data = data.filter(p => p.price <= Number(filters.priceMax));
        if (search) {
          const q = search.toLowerCase();
          data = data.filter(p =>
            (p.productTitle || '').toLowerCase().includes(q) ||
            (p.brand || '').toLowerCase().includes(q) ||
            (p.collection || '').toLowerCase().includes(q) ||
            (p.referenceNumber || '').toLowerCase().includes(q)
          );
        }

        setProducts(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [filters, sortBy, searchParams]);

  const pageTitle = searchParams.get('isNewArrival') ? 'New Arrivals' :
    searchParams.get('isCertifiedPreOwned') ? 'Certified Pre-Owned' :
    searchParams.get('isVintage') ? 'Vintage Collection' :
    searchParams.get('gender') === 'Men' ? "Men's Watches" :
    searchParams.get('gender') === 'Women' ? "Women's Watches" :
    searchParams.get('search') ? `Results for "${searchParams.get('search')}"` :
    'All Watches';

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">
      {/* Header */}
      <div className="mb-10">
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5A367] mb-2 block">Collection</span>
        <h1 className="font-display text-3xl md:text-5xl font-light text-[#E5E5E5] tracking-tight">{pageTitle}</h1>
        <p className="text-sm text-[#8E8E93] mt-2">{products.length} timepiece{products.length !== 1 ? 's' : ''}</p>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="md:hidden flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase text-[#E5E5E5]"
        >
          <SlidersHorizontal size={14} /> Filters
        </button>
        <div className="flex items-center gap-4">
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="bg-transparent border border-white/10 text-xs text-[#E5E5E5] px-3 py-2 outline-none focus:border-[#C5A367]"
          >
            {SORT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value} className="bg-[#111]">{opt.label}</option>
            ))}
          </select>
          <div className="hidden md:flex items-center gap-2">
            <button onClick={() => setGridCols(3)} className={`p-1.5 ${gridCols === 3 ? 'text-[#C5A367]' : 'text-[#555]'}`}>
              <Grid3X3 size={16} />
            </button>
            <button onClick={() => setGridCols(4)} className={`p-1.5 ${gridCols === 4 ? 'text-[#C5A367]' : 'text-[#555]'}`}>
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
                  <div className="aspect-[3/4] bg-[#151515] mb-4" />
                  <div className="h-3 bg-[#151515] w-20 mb-2" />
                  <div className="h-3 bg-[#151515] w-full" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[#8E8E93] text-sm">No watches found matching your criteria.</p>
            </div>
          ) : (
            <div className={`grid grid-cols-2 ${gridCols === 4 ? 'md:grid-cols-4' : 'md:grid-cols-3'} gap-6`}>
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A0A0B] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl text-[#E5E5E5]">Filters</h2>
              <button onClick={() => setMobileFiltersOpen(false)} className="text-[#8E8E93]">
                <X size={20} />
              </button>
            </div>
            <ShopFilters filters={filters} setFilters={setFilters} />
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="w-full mt-8 bg-[#C5A367] text-[#0A0A0B] text-[11px] tracking-[0.15em] uppercase font-medium py-4"
            >
              Show {products.length} Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}