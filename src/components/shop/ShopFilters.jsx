import React, { useState } from 'react';
import { BRAND_DATA, CONDITIONS, GENDERS, CASE_MATERIALS, DIAL_COLORS, MOVEMENT_TYPES } from '@/lib/constants';
import { ChevronDown, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

function FilterGroup({ label, options, selected, onChange, open, onToggle }) {
  return (
    <div className="border-b border-border">
      <button onClick={onToggle} className="flex min-h-14 w-full items-center justify-between py-4 text-sm font-semibold uppercase tracking-[0.1em] text-foreground">
        {label}
        {selected.length > 0 && <span className="ml-2 mr-auto rounded-full bg-primary px-2 py-0.5 text-[11px] text-primary-foreground">{selected.length}</span>}
        <ChevronDown size={17} className={`text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="max-h-64 space-y-1 overflow-y-auto pb-5 pr-1">
          {options.map(opt => {
            const val = typeof opt === 'string' ? opt : opt.name;
            const isSelected = selected.includes(val);
            return (
              <label key={val} className="group flex min-h-10 cursor-pointer items-center gap-3 rounded-sm px-1 transition-colors hover:bg-secondary/70">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => {
                    onChange(isSelected ? selected.filter(s => s !== val) : [...selected, val]);
                  }}
                  className="h-[18px] w-[18px] flex-shrink-0 rounded-sm border-border bg-transparent accent-primary"
                />
                <span className="text-sm leading-6 text-muted-foreground transition-colors group-hover:text-foreground">{val}</span>
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
    <div className="w-full">
      {activeCount > 0 && (
        <button
          onClick={() => setFilters({
            search: '', brand: [], model: [], collection: [], condition: [], gender: [], caseMaterial: [],
            dialColor: [], movementType: [], availability: [], priceMin: '', priceMax: '',
            yearFrom: '', yearTo: '', isNewArrival: null, isCertifiedPreOwned: null, isVintage: null
          })}
          className="mb-4 flex min-h-10 items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-primary transition-colors hover:text-foreground"
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
      <div className="border-b border-border py-5">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.1em] text-foreground">{t('common:shop.priceRange')}</p>
        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            placeholder={t('common:shop.min')}
            value={filters.priceMin}
            onChange={e => updateFilter('priceMin', e.target.value)}
            className="min-w-0 w-full border border-border bg-card px-3 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-primary"
          />
          <input
            type="number"
            placeholder={t('common:shop.max')}
            value={filters.priceMax}
            onChange={e => updateFilter('priceMax', e.target.value)}
            className="min-w-0 w-full border border-border bg-card px-3 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-primary"
          />
        </div>
      </div>

      {/* Year range */}
      <div className="border-b border-border py-5">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.1em] text-foreground">{t('common:shop.yearRange') || 'Year Range'}</p>
        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            placeholder={t('common:shop.from') || 'From'}
            value={filters.yearFrom}
            onChange={e => updateFilter('yearFrom', e.target.value)}
            className="min-w-0 w-full border border-border bg-card px-3 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-primary"
          />
          <input
            type="number"
            placeholder={t('common:shop.to') || 'To'}
            value={filters.yearTo}
            onChange={e => updateFilter('yearTo', e.target.value)}
            className="min-w-0 w-full border border-border bg-card px-3 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-primary"
          />
        </div>
      </div>
    </div>
  );
}
