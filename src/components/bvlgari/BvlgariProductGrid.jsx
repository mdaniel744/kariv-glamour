import React, { useState, useEffect, useMemo } from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { base44 } from '@/api/base44Client';
import { asArray } from '@/lib/base44Data';
import { useTranslation } from 'react-i18next';
import { useLocalizedField } from '@/lib/localize';
import { SlidersHorizontal, X } from 'lucide-react';
import BvlgariFilterSidebar from './BvlgariFilterSidebar';
import BvlgariProductCard from './BvlgariProductCard';
import { BVLGARI_QUICK_FILTERS } from '@/lib/bvlgariData';

const BRAND = 'Bvlgari';

const parseSize = (s) => { if (!s) return null; const m = String(s).match(/(\d+(\.\d+)?)/); return m ? parseFloat(m[1]) : null; };

const isQuartz = (p) => {
  const f = [p.movementType, p.functions, p.model, p.productTitle].filter(Boolean).join(' ').toLowerCase();
  return f.includes('quartz');
};

const isMechanical = (p) => {
  const f = [p.movementType, p.functions, p.model, p.productTitle].filter(Boolean).join(' ').toLowerCase();
  return f.includes('automatic') || f.includes('manual') || f.includes('mechanical') || f.includes('calibre') || f.includes('manufacture') || f.includes('self-wind') || f.includes('tourbillon');
};

const matchesFeature = (p, feat) => {
  const fl = feat.toLowerCase();
  const fields = [p.functions, p.model, p.productTitle, p.dialColor, p.caseMaterial, p.movementType, p.braceletMaterial, p.collection].filter(Boolean).join(' ').toLowerCase();
  if (fl === 'full set') return p.boxIncluded && p.papersIncluded;
  if (fl === 'serpenti') return fields.includes('serpenti');
  if (fl === 'serpenti tubogas') return fields.includes('tubogas');
  if (fl === 'serpenti seduttori') return fields.includes('seduttori');
  if (fl === 'serpenti misteriosi') return fields.includes('misteriosi');
  if (fl === 'serpenti spiga') return fields.includes('spiga');
  if (fl === 'octo finissimo') return fields.includes('finissimo');
  if (fl === 'octo roma') return fields.includes('roma') && fields.includes('octo');
  if (fl === 'bulgari bulgari') return fields.includes('bulgari bulgari');
  if (fl === 'lvcea') return fields.includes('lvcea');
  if (fl === 'aluminium') return fields.includes('aluminium');
  if (fl === 'high jewellery') return fields.includes('high jewellery') || fields.includes('gem-set') || fields.includes('diamond-set');
  if (fl === 'jewellery watch') return fields.includes('jewellery') || fields.includes('serpenti') || fields.includes('tubogas');
  if (fl === 'ultra-thin') return fields.includes('ultra-thin') || fields.includes('finissimo');
  if (fl === 'skeleton') return fields.includes('skeleton');
  if (fl === 'chronograph') return fields.includes('chronograph') || fields.includes('chrono');
  if (fl === 'tourbillon') return fields.includes('tourbillon');
  if (fl === 'minute repeater') return fields.includes('minute repeater') || fields.includes('repeater');
  if (fl === 'integrated bracelet') return fields.includes('integrated');
  if (fl === 'tubogas bracelet') return fields.includes('tubogas');
  if (fl === 'double-spiral bracelet') return fields.includes('double-spiral') || fields.includes('double spiral');
  if (fl === 'diamond-set') return fields.includes('diamond');
  if (fl === 'gem-set') return fields.includes('gem-set') || fields.includes('gemset');
  if (fl === 'mother-of-pearl dial') return fields.includes('mother') || fields.includes('pearl');
  return fields.includes(fl);
};

export default function BvlgariProductGrid() {
  const { t } = useTranslation('brandComponents');
  const { localize } = useLocalizedField();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('-created_date');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({ collection: [], watchType: [], caseMaterial: [], movementType: [], dialColor: [], features: [], braceletMaterial: [], condition: [], gender: [], caseSize: [], boxPapers: [], availability: [], type: [], priceMin: '', priceMax: '' });

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = asArray(await base44.entities.Products.filter({ brand: BRAND }, '-created_date', 100));
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
    if (f.priceMin) result = result.filter((p) => p.price >= Number(f.priceMin));
    if (f.priceMax) result = result.filter((p) => p.price <= Number(f.priceMax));
    return [...result].sort((a, b) => {
      switch (sortBy) {
        case 'price': return a.price - b.price;
        case '-price': return b.price - a.price;
        case '-yearOfProduction': return (b.yearOfProduction || 0) - (a.yearOfProduction || 0);
        case 'limited': return (b.isLimitedEdition ? 1 : 0) - (a.isLimitedEdition ? 1 : 0) || new Date(b.created_date) - new Date(a.created_date);
        default: return new Date(b.created_date) - new Date(a.created_date);
      }
    });
  }, [products, filters, sortBy]);

  return (
    <section id="shop" className="py-16 md:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-3 text-primary">{t('productGrid.eyebrow')}</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-[hsl(var(--primary))]">{t('productGrid.heading', { brand: BRAND })}</h2>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {BVLGARI_QUICK_FILTERS.map((chip, i) =>
            <LocalizedLink key={i} to={chip.link} className="text-[10px] tracking-[0.12em] uppercase px-4 py-2 border border-border text-foreground hover:border-primary hover:text-primary transition-colors">{localize(chip, 'label')}</LocalizedLink>
          )}
        </div>

        <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
          <button onClick={() => setMobileFiltersOpen(true)} className="md:hidden flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase text-foreground">
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
          <aside className="hidden md:block w-64 flex-shrink-0">
            <BvlgariFilterSidebar filters={filters} setFilters={setFilters} />
          </aside>
          <div className="flex-1">
            {loading ?
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => <div key={i} className="aspect-[3/4] animate-pulse bg-card" />)}
              </div> :
            filtered.length === 0 ?
              <div className="text-center py-20">
                <p className="text-sm text-muted-foreground">{t('productGrid.noMatches', { brand: BRAND })}</p>
                <LocalizedLink to="/bvlgari-uhr" className="text-[11px] tracking-[0.12em] uppercase underline mt-4 inline-block text-primary">{t('seoLanding.viewAll', { brand: BRAND })}</LocalizedLink>
              </div> :
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {filtered.map((p) => <BvlgariProductCard key={p.id} product={p} />)}
              </div>
            }
          </div>
        </div>
      </div>

      {mobileFiltersOpen &&
        <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl text-foreground">{t('productGrid.filter')}</h2>
              <button onClick={() => setMobileFiltersOpen(false)} className="text-muted-foreground"><X size={20} /></button>
            </div>
            <BvlgariFilterSidebar filters={filters} setFilters={setFilters} />
            <button onClick={() => setMobileFiltersOpen(false)} className="w-full mt-8 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium py-4">
              {t('productGrid.showResults', { count: filtered.length })}
            </button>
          </div>
        </div>
      }
    </section>
  );
}