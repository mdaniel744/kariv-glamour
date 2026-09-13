import React, { useState } from 'react';
import { useAttributeLabel } from '@/hooks/useAttributeLabel';
import { useStorefrontPricing } from '@/lib/currencyContext';
import { useTranslation } from 'react-i18next';
import { ChevronDown, X } from 'lucide-react';
import { CONDITIONS, GENDERS } from '@/lib/constants';
import { TUDOR_COLLECTIONS, TUDOR_CASE_MATERIALS, TUDOR_MOVEMENTS, TUDOR_DIAL_COLORS, TUDOR_FEATURES, TUDOR_WATCH_TYPES, TUDOR_BRACELETS, TUDOR_CASE_SIZES, TUDOR_BOX_PAPERS, TUDOR_AVAILABILITY } from '@/lib/tudorData';

function FilterGroup({ label, options, selected, onChange, open, onToggle }) {
  const attributeLabel = useAttributeLabel();
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
                <input type="checkbox" checked={isSelected} onChange={() => onChange(isSelected ? selected.filter(s => s !== val) : [...selected, val])} className="w-3.5 h-3.5 rounded-sm border-border bg-transparent accent-primary" />
                <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">{attributeLabel(val)}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function TudorFilterSidebar({ filters, setFilters }) {
  const { t } = useTranslation('brandComponents');
  const { currency } = useStorefrontPricing();
  const [openGroups, setOpenGroups] = useState({ collection: true, movementType: true, watchType: true });
  const toggleGroup = (k) => setOpenGroups(p => ({ ...p, [k]: !p[k] }));
  const update = (k, v) => setFilters(p => ({ ...p, [k]: v }));
  const collectionNames = TUDOR_COLLECTIONS.map(c => c.name);
  const activeCount = Object.values(filters).filter(v => Array.isArray(v) ? v.length > 0 : v).length;
  const reset = () => setFilters({ collection: [], watchType: [], caseMaterial: [], movementType: [], dialColor: [], features: [], braceletMaterial: [], condition: [], gender: [], caseSize: [], boxPapers: [], availability: [], type: [], priceMin: '', priceMax: '' });

  return (
    <div className="brand-filter-panel">
      {activeCount > 0 && (
        <button onClick={reset} className="flex items-center gap-1 text-[10px] tracking-[0.1em] uppercase text-primary mb-4 hover:text-foreground transition-colors">
          <X size={12} /> {t('productGrid.clearFilters')}
        </button>
      )}
      <FilterGroup label={t('productGrid.type')} options={TUDOR_WATCH_TYPES} selected={filters.watchType} onChange={v => update('watchType', v)} open={openGroups.watchType} onToggle={() => toggleGroup('watchType')} />
      <FilterGroup label={t('productGrid.collection')} options={collectionNames} selected={filters.collection} onChange={v => update('collection', v)} open={openGroups.collection} onToggle={() => toggleGroup('collection')} />
      <FilterGroup label={t('productGrid.movement')} options={TUDOR_MOVEMENTS} selected={filters.movementType} onChange={v => update('movementType', v)} open={openGroups.movementType} onToggle={() => toggleGroup('movementType')} />
      <FilterGroup label={t('productGrid.caseMaterial')} options={TUDOR_CASE_MATERIALS} selected={filters.caseMaterial} onChange={v => update('caseMaterial', v)} open={openGroups.caseMaterial} onToggle={() => toggleGroup('caseMaterial')} />
      <FilterGroup label={t('productGrid.dialColor')} options={TUDOR_DIAL_COLORS} selected={filters.dialColor} onChange={v => update('dialColor', v)} open={openGroups.dialColor} onToggle={() => toggleGroup('dialColor')} />
      <FilterGroup label={t('productGrid.features')} options={TUDOR_FEATURES} selected={filters.features} onChange={v => update('features', v)} open={openGroups.features} onToggle={() => toggleGroup('features')} />
      <FilterGroup label={t('productGrid.bracelet')} options={TUDOR_BRACELETS} selected={filters.braceletMaterial} onChange={v => update('braceletMaterial', v)} open={openGroups.braceletMaterial} onToggle={() => toggleGroup('braceletMaterial')} />
      <FilterGroup label={t('productGrid.condition')} options={CONDITIONS} selected={filters.condition} onChange={v => update('condition', v)} open={openGroups.condition} onToggle={() => toggleGroup('condition')} />
      <FilterGroup label={t('productGrid.gender')} options={GENDERS} selected={filters.gender} onChange={v => update('gender', v)} open={openGroups.gender} onToggle={() => toggleGroup('gender')} />
      <FilterGroup label={t('productGrid.caseSize')} options={TUDOR_CASE_SIZES} selected={filters.caseSize} onChange={v => update('caseSize', v)} open={openGroups.caseSize} onToggle={() => toggleGroup('caseSize')} />
      <FilterGroup label={t('productGrid.boxPapers')} options={TUDOR_BOX_PAPERS} selected={filters.boxPapers} onChange={v => update('boxPapers', v)} open={openGroups.boxPapers} onToggle={() => toggleGroup('boxPapers')} />
      <FilterGroup label={t('productGrid.availability')} options={TUDOR_AVAILABILITY} selected={filters.availability} onChange={v => update('availability', v)} open={openGroups.availability} onToggle={() => toggleGroup('availability')} />
      <div className="border-b border-border py-4">
        <p className="text-[11px] tracking-[0.12em] uppercase text-foreground font-medium mb-3">{t('productGrid.priceRange')} ({currency})</p>
        <div className="flex gap-2">
          <input type="number" placeholder="Min" value={filters.priceMin} onChange={e => update('priceMin', e.target.value)} className="w-full bg-card border border-border text-xs text-foreground px-3 py-2 placeholder:text-muted-foreground/50 outline-none focus:border-primary" />
          <input type="number" placeholder="Max" value={filters.priceMax} onChange={e => update('priceMax', e.target.value)} className="w-full bg-card border border-border text-xs text-foreground px-3 py-2 placeholder:text-muted-foreground/50 outline-none focus:border-primary" />
        </div>
      </div>
    </div>
  );
}
