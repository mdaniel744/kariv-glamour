import React from 'react';
import { ChevronDown } from 'lucide-react';

const normalize = (value) => String(value || '')
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, ' ')
  .trim();

const fieldContains = (product, value, fields) => {
  const requested = normalize(value);
  return fields.some((field) => normalize(product[field]).includes(requested));
};

function matchesSingleQuickFilter(product, filter) {
  if (!filter) return true;

  if (filter.collection) {
    const requested = normalize(filter.collection);
    const collection = normalize(product.collection);
    const model = normalize(product.model);
    if (
      collection !== requested
      && !collection.startsWith(`${requested} `)
      && model !== requested
      && !model.startsWith(`${requested} `)
    ) return false;
  }

  if (filter.gender && normalize(product.gender) !== normalize(filter.gender)) return false;
  if (filter.caseMaterial && !fieldContains(product, filter.caseMaterial, ['caseMaterial'])) return false;
  if (filter.dialColor && !fieldContains(product, filter.dialColor, ['dialColor'])) return false;
  if (filter.movementType && !fieldContains(product, filter.movementType, ['movementType', 'functions'])) return false;
  if (filter.search && !fieldContains(product, filter.search, ['collection', 'model', 'productTitle', 'functions', 'movementType', 'caseMaterial', 'dialColor'])) return false;

  if (filter.preOwned && ['new', 'unworn'].includes(normalize(product.condition))) return false;
  if (filter.vintage && !(product.isVintage || normalize(product.condition) === 'vintage')) return false;
  if (filter.fullSet && !(product.boxIncluded && product.papersIncluded)) return false;

  return true;
}

export function matchesBrandQuickFilter(product, filters) {
  if (!Array.isArray(filters)) return matchesSingleQuickFilter(product, filters);
  if (filters.length === 0) return true;

  const groupedFilters = filters.reduce((groups, filter) => {
    Object.entries(filter).forEach(([key, value]) => {
      groups[key] = [...(groups[key] || []), value];
    });
    return groups;
  }, {});

  return Object.entries(groupedFilters).every(([key, values]) => (
    values.some((value) => matchesSingleQuickFilter(product, { [key]: value }))
  ));
}

export function BrandAttributeFilterGroup({ label, options, selected, onToggle, defaultOpen = false }) {
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        className="flex min-h-14 w-full items-center justify-between py-4 text-sm font-semibold uppercase tracking-[0.1em] text-foreground"
      >
        {label}
        {selected.length > 0 && (
          <span className="ml-2 mr-auto rounded-full bg-primary px-2 py-0.5 text-[11px] text-primary-foreground">{selected.length}</span>
        )}
        <ChevronDown size={17} className={`text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="max-h-64 space-y-1 overflow-y-auto pb-5 pr-1">
          {options.map((option) => {
            const value = typeof option === 'string' ? option : option.name;
            const checked = selected.includes(value);
            return (
              <label key={value} className="group flex min-h-10 cursor-pointer items-center gap-3 rounded-lg px-1 transition-colors hover:bg-secondary/70">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggle(value)}
                  className="h-[18px] w-[18px] flex-shrink-0 rounded border-border bg-transparent accent-primary"
                />
                <span className="text-sm leading-6 text-muted-foreground transition-colors group-hover:text-foreground">{value}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function BrandQuickFilters({ chips, activeFilter, getLabel, onSelect }) {
  const selectedFilters = Array.isArray(activeFilter) ? activeFilter : [];

  return (
    <div className="mb-10 flex flex-wrap justify-center gap-2.5" aria-label="Quick product filters">
      {chips.filter((chip) => chip.filter).map((chip) => {
        const label = getLabel(chip);
        const selected = selectedFilters.includes(chip.filter);

        return (
          <button
            key={chip.link || label}
            type="button"
            onClick={() => onSelect((current) => (
              current.includes(chip.filter)
                ? current.filter((filter) => filter !== chip.filter)
                : [...current, chip.filter]
            ))}
            aria-pressed={selected}
            className={`min-h-10 rounded-full border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] transition-all ${selected
              ? 'border-primary bg-primary text-primary-foreground shadow-sm'
              : 'border-border bg-background/80 text-foreground hover:border-primary hover:text-primary'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
