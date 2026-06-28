import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { SlidersHorizontal, X } from 'lucide-react';
import CartierFilterSidebar from './CartierFilterSidebar';
import CartierProductCard from './CartierProductCard';
import { CARTIER_QUICK_FILTERS, CARTIER_COLORS } from '@/lib/cartierData';

const SORT_OPTIONS = [
  { value: '-created_date', label: 'Featured' },
  { value: 'newest', label: 'Neueste Ankünfte' },
  { value: 'price', label: 'Preis: Niedrig zu Hoch' },
  { value: '-price', label: 'Preis: Hoch zu Niedrig' },
  { value: '-yearOfProduction', label: 'Jahr: Neueste zuerst' },
  { value: 'popular', label: 'Beliebteste' },
];

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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('-created_date');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({ collection: [], caseMaterial: [], watchShape: [], movementType: [], dialColor: [], braceletMaterial: [], condition: [], gender: [], caseSize: [], boxPapers: [], availability: [], priceMin: '', priceMax: '' });

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await base44.entities.Products.filter({ brand: 'Cartier' }, '-created_date', 100);
        setProducts(data);
      } catch (e) { console.error(e); } finally { setLoading(false); }
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    const f = filters;
    let result = products;
    if (f.collection.length) result = result.filter(p => f.collection.includes(p.collection));
    if (f.caseMaterial.length) result = result.filter(p => f.caseMaterial.includes(p.caseMaterial));
    if (f.watchShape.length) result = result.filter(p => f.watchShape.includes(p.watchShape));
    if (f.movementType.length) result = result.filter(p => f.movementType.includes(p.movementType));
    if (f.dialColor.length) result = result.filter(p => f.dialColor.includes(p.dialColor));
    if (f.braceletMaterial.length) result = result.filter(p => f.braceletMaterial.includes(p.braceletMaterial));
    if (f.condition.length) result = result.filter(p => f.condition.includes(p.condition));
    if (f.gender.length) result = result.filter(p => f.gender.includes(p.gender));
    if (f.caseSize.length) result = result.filter(p => { const d = parseDiameter(p.caseDiameter); return f.caseSize.some(s => sizeRange(s, d)); });
    if (f.boxPapers.length) result = result.filter(p => f.boxPapers.some(opt => (opt === 'Box included' && p.boxIncluded) || (opt === 'Papers included' && p.papersIncluded) || (opt === 'Full set' && p.boxIncluded && p.papersIncluded)));
    if (f.availability.length) result = result.filter(p => f.availability.includes(p.availability));
    if (f.priceMin) result = result.filter(p => p.price >= Number(f.priceMin));
    if (f.priceMax) result = result.filter(p => p.price <= Number(f.priceMax));
    return [...result].sort((a, b) => {
      switch (sortBy) {
        case 'price': return a.price - b.price;
        case '-price': return b.price - a.price;
        case '-yearOfProduction': return (b.yearOfProduction || 0) - (a.yearOfProduction || 0);
        default: return new Date(b.created_date) - new Date(a.created_date);
      }
    });
  }, [products, filters, sortBy]);

  return (
    <section id="shop" className="py-16 md:py-24" style={{ backgroundColor: CARTIER_COLORS.ivory }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-3" style={{ color: CARTIER_COLORS.gold }}>Cartier Boutique</span>
          <h2 className="font-display text-3xl md:text-4xl font-light" style={{ color: CARTIER_COLORS.ink }}>Shop Cartier Watches</h2>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {CARTIER_QUICK_FILTERS.map((chip, i) => (
            <Link key={i} to={chip.link} className="text-[10px] tracking-[0.12em] uppercase px-4 py-2 border transition-colors hover:opacity-70" style={{ borderColor: 'rgba(138,43,43,0.25)', color: CARTIER_COLORS.red }}>{chip.label}</Link>
          ))}
        </div>

        <div className="flex items-center justify-between mb-8 pb-4 border-b" style={{ borderColor: 'rgba(28,28,28,0.12)' }}>
          <button onClick={() => setMobileFiltersOpen(true)} className="md:hidden flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase" style={{ color: CARTIER_COLORS.ink }}>
            <SlidersHorizontal size={14} /> Filter
          </button>
          <p className="hidden md:block text-xs" style={{ color: CARTIER_COLORS.muted }}>{filtered.length} Zeitmesser</p>
          <div className="flex items-center gap-2 ml-auto">
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="bg-transparent border text-xs px-3 py-2 outline-none" style={{ borderColor: 'rgba(28,28,28,0.12)', color: CARTIER_COLORS.ink }}>
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value} style={{ color: '#1C1C1C' }}>{o.label}</option>)}
            </select>
          </div>
        </div>

        <div className="flex gap-10">
          <aside className="hidden md:block w-64 flex-shrink-0">
            <CartierFilterSidebar filters={filters} setFilters={setFilters} />
          </aside>
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => <div key={i} className="aspect-[3/4] animate-pulse" style={{ backgroundColor: CARTIER_COLORS.ivoryLight }} />)}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-sm" style={{ color: CARTIER_COLORS.muted }}>Keine Cartier Uhren gefunden, die Ihren Kriterien entsprechen.</p>
                <Link to="/cartier-uhr-kaufen" className="text-[11px] tracking-[0.12em] uppercase underline mt-4 inline-block" style={{ color: CARTIER_COLORS.red }}>Alle Cartier Uhren ansehen</Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {filtered.map(p => <CartierProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" style={{ backgroundColor: CARTIER_COLORS.ivory }}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl" style={{ color: CARTIER_COLORS.ink }}>Filter</h2>
              <button onClick={() => setMobileFiltersOpen(false)} style={{ color: CARTIER_COLORS.muted }}><X size={20} /></button>
            </div>
            <CartierFilterSidebar filters={filters} setFilters={setFilters} />
            <button onClick={() => setMobileFiltersOpen(false)} className="w-full mt-8 text-[11px] tracking-[0.15em] uppercase font-medium py-4" style={{ backgroundColor: CARTIER_COLORS.red, color: '#fff' }}>
              {filtered.length} Ergebnisse anzeigen
            </button>
          </div>
        </div>
      )}
    </section>
  );
}