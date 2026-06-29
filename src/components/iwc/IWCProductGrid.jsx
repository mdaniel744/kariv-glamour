import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { SlidersHorizontal, X } from 'lucide-react';
import IWCFilterSidebar from './IWCFilterSidebar';
import IWCProductCard from './IWCProductCard';
import { IWC_QUICK_FILTERS } from '@/lib/iwcData';

const SORT_OPTIONS = [
  { value: '-created_date', label: 'Featured' },
  { value: 'newest', label: 'Neueste Ankünfte' },
  { value: 'price', label: 'Preis: Niedrig zu Hoch' },
  { value: '-price', label: 'Preis: Hoch zu Niedrig' },
  { value: '-yearOfProduction', label: 'Jahr: Neueste zuerst' },
  { value: 'limited', label: 'Limitierte Auflagen zuerst' },
];

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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('-created_date');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({ collection: [], caseMaterial: [], movementType: [], dialColor: [], features: [], braceletMaterial: [], condition: [], gender: [], caseSize: [], boxPapers: [], availability: [], type: [], priceMin: '', priceMax: '' });

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await base44.entities.Products.filter({ brand: 'IWC Schaffhausen' }, '-created_date', 100);
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
    if (f.movementType.length) result = result.filter(p => f.movementType.some(m => (p.movementType || '').toLowerCase().includes(m.toLowerCase())));
    if (f.dialColor.length) result = result.filter(p => f.dialColor.includes(p.dialColor));
    if (f.features.length) result = result.filter(p => f.features.some(feat => matchesFeature(p, feat)));
    if (f.braceletMaterial.length) result = result.filter(p => f.braceletMaterial.includes(p.braceletMaterial));
    if (f.condition.length) result = result.filter(p => f.condition.includes(p.condition));
    if (f.gender.length) result = result.filter(p => f.gender.includes(p.gender));
    if (f.caseSize.length) result = result.filter(p => { const d = parseSize(p.caseDiameter); return d != null && f.caseSize.some(s => parseSize(s) === d); });
    if (f.type.length) result = result.filter(p => f.type.some(t => (t === 'New' && ['New', 'Unworn'].includes(p.condition)) || (t === 'Pre-Owned' && !['New', 'Unworn'].includes(p.condition)) || (t === 'Vintage' && (p.isVintage || p.condition === 'Vintage'))));
    if (f.boxPapers.length) result = result.filter(p => f.boxPapers.some(opt => (opt === 'Box included' && p.boxIncluded) || (opt === 'Papers included' && p.papersIncluded) || (opt === 'Full set' && p.boxIncluded && p.papersIncluded)));
    if (f.availability.length) result = result.filter(p => f.availability.includes(p.availability));
    if (f.priceMin) result = result.filter(p => p.price >= Number(f.priceMin));
    if (f.priceMax) result = result.filter(p => p.price <= Number(f.priceMax));
    return [...result].sort((a, b) => {
      switch (sortBy) {
        case 'price': return a.price - b.price;
        case '-price': return b.price - a.price;
        case '-yearOfProduction': return (b.yearOfProduction || 0) - (a.yearOfProduction || 0);
        case 'limited': return ((b.isLimitedEdition ? 1 : 0) - (a.isLimitedEdition ? 1 : 0)) || (new Date(b.created_date) - new Date(a.created_date));
        default: return new Date(b.created_date) - new Date(a.created_date);
      }
    });
  }, [products, filters, sortBy]);

  return (
    <section id="shop" className="py-16 md:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-3 text-primary">IWC Schaffhausen Boutique</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">Shop IWC Schaffhausen Uhren</h2>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {IWC_QUICK_FILTERS.map((chip, i) => (
            <Link key={i} to={chip.link} className="text-[10px] tracking-[0.12em] uppercase px-4 py-2 border border-border text-foreground hover:border-primary hover:text-primary transition-colors">{chip.label}</Link>
          ))}
        </div>

        <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
          <button onClick={() => setMobileFiltersOpen(true)} className="md:hidden flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase text-foreground">
            <SlidersHorizontal size={14} /> Filter
          </button>
          <p className="hidden md:block text-xs text-muted-foreground">{filtered.length} Zeitmesser</p>
          <div className="flex items-center gap-2 ml-auto">
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="bg-transparent border border-border text-xs text-foreground px-3 py-2 outline-none focus:border-primary">
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value} className="bg-popover text-foreground">{o.label}</option>)}
            </select>
          </div>
        </div>

        <div className="flex gap-10">
          <aside className="hidden md:block w-64 flex-shrink-0">
            <IWCFilterSidebar filters={filters} setFilters={setFilters} />
          </aside>
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => <div key={i} className="aspect-[3/4] animate-pulse bg-card" />)}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-sm text-muted-foreground">Keine IWC Schaffhausen Uhren gefunden, die Ihren Kriterien entsprechen.</p>
                <Link to="/iwc-schaffhausen-uhr" className="text-[11px] tracking-[0.12em] uppercase underline mt-4 inline-block text-primary">Alle IWC Uhren ansehen</Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {filtered.map(p => <IWCProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl text-foreground">Filter</h2>
              <button onClick={() => setMobileFiltersOpen(false)} className="text-muted-foreground"><X size={20} /></button>
            </div>
            <IWCFilterSidebar filters={filters} setFilters={setFilters} />
            <button onClick={() => setMobileFiltersOpen(false)} className="w-full mt-8 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium py-4">
              {filtered.length} Ergebnisse anzeigen
            </button>
          </div>
        </div>
      )}
    </section>
  );
}