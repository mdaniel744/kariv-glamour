import React, { useState } from 'react';
import { BRAND_DATA, CONDITIONS, GENDERS, CASE_MATERIALS, DIAL_COLORS, MOVEMENT_TYPES } from '@/lib/constants';
import { ChevronDown, X } from 'lucide-react';

function FilterGroup({ label, options, selected, onChange, open, onToggle }) {
  return (
    <div className="border-b border-white/5">
      <button onClick={onToggle} className="w-full flex items-center justify-between py-4 text-[11px] tracking-[0.12em] uppercase text-[#E5E5E5] font-medium">
        {label}
        {selected.length > 0 && <span className="text-[9px] bg-[#C5A367] text-[#0A0A0B] px-1.5 py-0.5 rounded-full mr-auto ml-2">{selected.length}</span>}
        <ChevronDown size={14} className={`text-[#8E8E93] transition-transform ${open ? 'rotate-180' : ''}`} />
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
                  className="w-3.5 h-3.5 rounded-sm border-white/20 bg-transparent accent-[#C5A367]"
                />
                <span className="text-xs text-[#8E8E93] group-hover:text-[#E5E5E5] transition-colors">{val}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function ShopFilters({ filters, setFilters }) {
  const [openGroups, setOpenGroups] = useState({ brand: true, condition: true });

  const toggleGroup = (key) => {
    setOpenGroups(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const activeCount = Object.values(filters).filter(v => Array.isArray(v) ? v.length > 0 : v).length;

  return (
    <div>
      {activeCount > 0 && (
        <button
          onClick={() => setFilters({ brand: [], condition: [], gender: [], caseMaterial: [], dialColor: [], movementType: [], priceMin: '', priceMax: '' })}
          className="flex items-center gap-1 text-[10px] tracking-[0.1em] uppercase text-[#C5A367] mb-4 hover:text-[#E5E5E5] transition-colors"
        >
          <X size={12} /> Clear All Filters
        </button>
      )}

      <FilterGroup label="Brand" options={BRAND_DATA} selected={filters.brand} onChange={v => updateFilter('brand', v)} open={openGroups.brand} onToggle={() => toggleGroup('brand')} />
      <FilterGroup label="Condition" options={CONDITIONS} selected={filters.condition} onChange={v => updateFilter('condition', v)} open={openGroups.condition} onToggle={() => toggleGroup('condition')} />
      <FilterGroup label="Gender" options={GENDERS} selected={filters.gender} onChange={v => updateFilter('gender', v)} open={openGroups.gender} onToggle={() => toggleGroup('gender')} />
      <FilterGroup label="Case Material" options={CASE_MATERIALS} selected={filters.caseMaterial} onChange={v => updateFilter('caseMaterial', v)} open={openGroups.caseMaterial} onToggle={() => toggleGroup('caseMaterial')} />
      <FilterGroup label="Dial Color" options={DIAL_COLORS} selected={filters.dialColor} onChange={v => updateFilter('dialColor', v)} open={openGroups.dialColor} onToggle={() => toggleGroup('dialColor')} />
      <FilterGroup label="Movement" options={MOVEMENT_TYPES} selected={filters.movementType} onChange={v => updateFilter('movementType', v)} open={openGroups.movementType} onToggle={() => toggleGroup('movementType')} />

      {/* Price range */}
      <div className="border-b border-white/5 py-4">
        <p className="text-[11px] tracking-[0.12em] uppercase text-[#E5E5E5] font-medium mb-3">Price Range</p>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.priceMin}
            onChange={e => updateFilter('priceMin', e.target.value)}
            className="w-full bg-[#151515] border border-white/10 text-xs text-[#E5E5E5] px-3 py-2 placeholder:text-[#555] outline-none focus:border-[#C5A367]"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.priceMax}
            onChange={e => updateFilter('priceMax', e.target.value)}
            className="w-full bg-[#151515] border border-white/10 text-xs text-[#E5E5E5] px-3 py-2 placeholder:text-[#555] outline-none focus:border-[#C5A367]"
          />
        </div>
      </div>
    </div>
  );
}