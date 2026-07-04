import React, { useState } from 'react';
import { BRAND_DATA, CONDITIONS, GENDERS, CASE_MATERIALS, DIAL_COLORS, MOVEMENT_TYPES } from '@/lib/constants';
import { ChevronDown, X } from 'lucide-react';
import BrandFavicon from '@/components/shared/BrandFavicon';
import { useTranslation } from 'react-i18next';

function FilterGroup({ label, options, selected, onChange, open, onToggle }) {
  return (
    <div className="border-b border-border">
      <button onClick={onToggle} className="w-full flex items-center justify-between py-4 text-[11px] tracking-[0.12em] uppercase text-foreground font-medium">
        {label}
        {selected.length > 0 && <span className="text-[9px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full mr-auto ml-2">{selected.length}</span>}
        <ChevronDown size={14} className={`text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="pb-4 space-y-2 max-h-48 overflow-y-auto">
          {options.map(opt => {
            const val = typeof opt === 'string' ? opt : opt.name;
            const isSelected = selected.includes(val);
            return (
              <label key={val} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => {
                    onChange(isSelected ? selected.filter(s => s !== val) : [...selected, val]);
                  }}
                  className="w-3.5 h-3.5 rounded-sm border-border bg-transparent accent-primary"
                />
                {opt.slug && <BrandFavicon slug={opt.slug} className="h-3.5 w-auto" alt="" />}
                <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">{val}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function ShopFilters({ filters, setFilters }) {
  const { t } = useTranslation();
  const [openGroups, setOpenGroups] = useState({ brand: true, condition: true });

  const toggleGroup = (key) => {
    setOpenGroups(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const updateFilter = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const activeCount = Object.values(filters).filter(v => Array.isArray(v) ? v.length > 0 : v).length;

  return (
    <div>
      {activeCount > 0 && (
        <button
          onClick={() => setFilters({
            search: '', brand: [], condition: [], gender: [], caseMaterial: [],
            dialColor: [], movementType: [], availability: [], priceMin: '', priceMax: '',
            yearFrom: '', yearTo: '', isNewArrival: null, isCertifiedPreOwned: null, isVintage: null
          })}
          className="flex items-center gap-1 text-[10px] tracking-[0.1em] uppercase text-primary mb-4 hover:text-foreground transition-colors"
        >
          <X size={12} /> {t('common:shop.clearAllFilters')}
        </button>
      )}

      <FilterGroup label={t('common:shop.brand')} options={BRAND_DATA} selected={filters.brand} onChange={v => updateFilter('brand', v)} open={openGroups.brand} onToggle={() => toggleGroup('brand')} />
      <FilterGroup label={t('common:shop.condition')} options={CONDITIONS} selected={filters.condition} onChange={v => updateFilter('condition', v)} open={openGroups.condition} onToggle={() => toggleGroup('condition')} />
      <FilterGroup label={t('common:shop.gender')} options={GENDERS} selected={filters.gender} onChange={v => updateFilter('gender', v)} open={openGroups.gender} onToggle={() => toggleGroup('gender')} />
      <FilterGroup label={t('common:shop.caseMaterial')} options={CASE_MATERIALS} selected={filters.caseMaterial} onChange={v => updateFilter('caseMaterial', v)} open={openGroups.caseMaterial} onToggle={() => toggleGroup('caseMaterial')} />
      <FilterGroup label={t('common:shop.dialColor')} options={DIAL_COLORS} selected={filters.dialColor} onChange={v => updateFilter('dialColor', v)} open={openGroups.dialColor} onToggle={() => toggleGroup('dialColor')} />
      <FilterGroup label={t('common:shop.movement')} options={MOVEMENT_TYPES} selected={filters.movementType} onChange={v => updateFilter('movementType', v)} open={openGroups.movementType} onToggle={() => toggleGroup('movementType')} />

      {/* Price range */}
      <div className="border-b border-border py-4">
        <p className="text-[11px] tracking-[0.12em] uppercase text-foreground font-medium mb-3">{t('common:shop.priceRange')}</p>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder={t('common:shop.min')}
            value={filters.priceMin}
            onChange={e => updateFilter('priceMin', e.target.value)}
            className="w-full bg-card border border-border text-xs text-foreground px-3 py-2 placeholder:text-muted-foreground/50 outline-none focus:border-primary"
          />
          <input
            type="number"
            placeholder={t('common:shop.max')}
            value={filters.priceMax}
            onChange={e => updateFilter('priceMax', e.target.value)}
            className="w-full bg-card border border-border text-xs text-foreground px-3 py-2 placeholder:text-muted-foreground/50 outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Year range */}
      <div className="border-b border-border py-4">
        <p className="text-[11px] tracking-[0.12em] uppercase text-foreground font-medium mb-3">{t('common:shop.yearRange') || 'Year Range'}</p>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder={t('common:shop.from') || 'From'}
            value={filters.yearFrom}
            onChange={e => updateFilter('yearFrom', e.target.value)}
            className="w-full bg-card border border-border text-xs text-foreground px-3 py-2 placeholder:text-muted-foreground/50 outline-none focus:border-primary"
          />
          <input
            type="number"
            placeholder={t('common:shop.to') || 'To'}
            value={filters.yearTo}
            onChange={e => updateFilter('yearTo', e.target.value)}
            className="w-full bg-card border border-border text-xs text-foreground px-3 py-2 placeholder:text-muted-foreground/50 outline-none focus:border-primary"
          />
        </div>
      </div>
    </div>
  );
}