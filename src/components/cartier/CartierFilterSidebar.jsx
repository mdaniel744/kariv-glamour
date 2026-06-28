import React, { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { CONDITIONS, GENDERS } from '@/lib/constants';
import { CARTIER_COLLECTIONS, CARTIER_CASE_MATERIALS, CARTIER_SHAPES, CARTIER_MOVEMENTS, CARTIER_DIAL_COLORS, CARTIER_BRACELETS, CARTIER_CASE_SIZES, CARTIER_AVAILABILITY, CARTIER_BOX_PAPERS, CARTIER_COLORS } from '@/lib/cartierData';

function FilterGroup({ label, options, selected, onChange, open, onToggle }) {
  return (
    <div className="border-b" style={{ borderColor: 'rgba(28,28,28,0.12)' }}>
      <button onClick={onToggle} className="w-full flex items-center justify-between py-4 text-[11px] tracking-[0.12em] uppercase font-medium" style={{ color: '#1C1C1C' }}>
        {label}
        {selected.length > 0 && <span className="text-[9px] px-1.5 py-0.5 rounded-full mr-auto ml-2" style={{ backgroundColor: '#8A2B2B', color: '#fff' }}>{selected.length}</span>}
        <ChevronDown size={14} className="transition-transform" style={{ transform: open ? 'rotate(180deg)' : 'none' }} />
      </button>
      {open && (
        <div className="pb-4 space-y-2 max-h-48 overflow-y-auto">
          {options.map(opt => {
            const val = typeof opt === 'string' ? opt : opt.name;
            const isSelected = selected.includes(val);
            return (
              <label key={val} className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" checked={isSelected} onChange={() => onChange(isSelected ? selected.filter(s => s !== val) : [...selected, val])} className="w-3.5 h-3.5 rounded-sm" style={{ accentColor: '#8A2B2B' }} />
                <span className="text-xs group-hover:opacity-70 transition-opacity" style={{ color: '#3A3A3A' }}>{val}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function CartierFilterSidebar({ filters, setFilters }) {
  const [openGroups, setOpenGroups] = useState({ collection: true, caseMaterial: true });
  const toggleGroup = (k) => setOpenGroups(p => ({ ...p, [k]: !p[k] }));
  const update = (k, v) => setFilters(p => ({ ...p, [k]: v }));
  const collectionNames = CARTIER_COLLECTIONS.map(c => c.name);
  const activeCount = Object.values(filters).filter(v => Array.isArray(v) ? v.length > 0 : v).length;
  const reset = () => setFilters({ collection: [], caseMaterial: [], watchShape: [], movementType: [], dialColor: [], braceletMaterial: [], condition: [], gender: [], caseSize: [], boxPapers: [], availability: [], priceMin: '', priceMax: '' });

  return (
    <div>
      {activeCount > 0 && (
        <button onClick={reset} className="flex items-center gap-1 text-[10px] tracking-[0.1em] uppercase mb-4" style={{ color: CARTIER_COLORS.red }}>
          <X size={12} /> Alle Filter löschen
        </button>
      )}
      <FilterGroup label="Kollektion" options={collectionNames} selected={filters.collection} onChange={v => update('collection', v)} open={openGroups.collection} onToggle={() => toggleGroup('collection')} />
      <FilterGroup label="Gehäusematerial" options={CARTIER_CASE_MATERIALS} selected={filters.caseMaterial} onChange={v => update('caseMaterial', v)} open={openGroups.caseMaterial} onToggle={() => toggleGroup('caseMaterial')} />
      <FilterGroup label="Uhrform" options={CARTIER_SHAPES} selected={filters.watchShape} onChange={v => update('watchShape', v)} open={openGroups.watchShape} onToggle={() => toggleGroup('watchShape')} />
      <FilterGroup label="Uhrwerk" options={CARTIER_MOVEMENTS} selected={filters.movementType} onChange={v => update('movementType', v)} open={openGroups.movementType} onToggle={() => toggleGroup('movementType')} />
      <FilterGroup label="Zifferblattfarbe" options={CARTIER_DIAL_COLORS} selected={filters.dialColor} onChange={v => update('dialColor', v)} open={openGroups.dialColor} onToggle={() => toggleGroup('dialColor')} />
      <FilterGroup label="Armband / Band" options={CARTIER_BRACELETS} selected={filters.braceletMaterial} onChange={v => update('braceletMaterial', v)} open={openGroups.braceletMaterial} onToggle={() => toggleGroup('braceletMaterial')} />
      <FilterGroup label="Zustand" options={CONDITIONS} selected={filters.condition} onChange={v => update('condition', v)} open={openGroups.condition} onToggle={() => toggleGroup('condition')} />
      <FilterGroup label="Geschlecht" options={GENDERS} selected={filters.gender} onChange={v => update('gender', v)} open={openGroups.gender} onToggle={() => toggleGroup('gender')} />
      <FilterGroup label="Gehäusegröße" options={CARTIER_CASE_SIZES} selected={filters.caseSize} onChange={v => update('caseSize', v)} open={openGroups.caseSize} onToggle={() => toggleGroup('caseSize')} />
      <FilterGroup label="Box & Papers" options={CARTIER_BOX_PAPERS} selected={filters.boxPapers} onChange={v => update('boxPapers', v)} open={openGroups.boxPapers} onToggle={() => toggleGroup('boxPapers')} />
      <FilterGroup label="Verfügbarkeit" options={CARTIER_AVAILABILITY} selected={filters.availability} onChange={v => update('availability', v)} open={openGroups.availability} onToggle={() => toggleGroup('availability')} />
      <div className="border-b py-4" style={{ borderColor: 'rgba(28,28,28,0.12)' }}>
        <p className="text-[11px] tracking-[0.12em] uppercase font-medium mb-3" style={{ color: '#1C1C1C' }}>Preisbereich</p>
        <div className="flex gap-2">
          <input type="number" placeholder="Min" value={filters.priceMin} onChange={e => update('priceMin', e.target.value)} className="w-full border text-xs px-3 py-2 outline-none" style={{ borderColor: 'rgba(28,28,28,0.12)', backgroundColor: '#FBF8F2', color: '#1C1C1C' }} />
          <input type="number" placeholder="Max" value={filters.priceMax} onChange={e => update('priceMax', e.target.value)} className="w-full border text-xs px-3 py-2 outline-none" style={{ borderColor: 'rgba(28,28,28,0.12)', backgroundColor: '#FBF8F2', color: '#1C1C1C' }} />
        </div>
      </div>
    </div>
  );
}