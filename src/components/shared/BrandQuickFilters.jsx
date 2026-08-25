import React from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, X } from 'lucide-react';
import {
  CASE_MATERIALS,
  DIAL_COLORS,
  GENDERS,
  MOVEMENT_TYPES,
  POPULAR_CASE_DIAMETERS,
} from '@/lib/constants';

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

const filterKey = (filter) => JSON.stringify(
  Object.entries(filter || {}).sort(([left], [right]) => left.localeCompare(right))
);

const existingOption = (options, requested) => (
  options.find((option) => normalize(option) === normalize(requested))
);

const COMMON_SHOPPING_CHIPS = [
  { label: 'Pre-Owned', label_en: 'Pre-Owned', label_de: 'Gebraucht', filter: { preOwned: true } },
  { label: 'Full Set', label_en: 'Full Set', label_de: 'Komplettset', filter: { fullSet: true } },
  { label: "Men's", label_en: "Men's", label_de: 'Herren', filter: { gender: existingOption(GENDERS, 'Men') } },
  { label: "Women's", label_en: "Women's", label_de: 'Damen', filter: { gender: existingOption(GENDERS, 'Women') } },
  { label: 'Black Dial', label_en: 'Black Dial', label_de: 'Schwarzes Zifferblatt', filter: { dialColor: existingOption(DIAL_COLORS, 'Black') } },
  { label: 'Blue Dial', label_en: 'Blue Dial', label_de: 'Blaues Zifferblatt', filter: { dialColor: existingOption(DIAL_COLORS, 'Blue') } },
  { label: 'Green Dial', label_en: 'Green Dial', label_de: 'Grünes Zifferblatt', filter: { dialColor: existingOption(DIAL_COLORS, 'Green') } },
  { label: 'Steel Case', label_en: 'Steel Case', label_de: 'Stahlgehäuse', filter: { caseMaterial: existingOption(CASE_MATERIALS, 'Stainless Steel') } },
  { label: 'Rose Gold Case', label_en: 'Rose Gold Case', label_de: 'Roségoldgehäuse', filter: { caseMaterial: existingOption(CASE_MATERIALS, 'Rose Gold') } },
  { label: 'Titanium Case', label_en: 'Titanium Case', label_de: 'Titangehäuse', filter: { caseMaterial: existingOption(CASE_MATERIALS, 'Titanium') } },
  ...POPULAR_CASE_DIAMETERS.map((caseDiameter) => ({
    label: `${caseDiameter} Case`,
    label_en: `${caseDiameter} Case`,
    label_de: `${caseDiameter} Gehäuse`,
    filter: { caseDiameter },
  })),
  { label: 'Automatic', label_en: 'Automatic', label_de: 'Automatik', filter: { movementType: existingOption(MOVEMENT_TYPES, 'Automatic') } },
].map((chip) => ({ ...chip, kind: 'attribute' }));

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
  if (filter.caseDiameter) {
    const requestedDiameter = Number.parseFloat(String(filter.caseDiameter).replace(',', '.'));
    const productDiameter = Number.parseFloat(String(product.caseDiameter || '').replace(',', '.'));
    if (!Number.isFinite(requestedDiameter) || productDiameter !== requestedDiameter) return false;
  }
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

export default function BrandQuickFilters({ chips, collections = [], activeFilter, getLabel, onSelect }) {
  const railRef = React.useRef(null);
  const hoverScrollFrameRef = React.useRef(null);
  const hoverScrollDelayRef = React.useRef(null);
  const selectedFilters = Array.isArray(activeFilter) ? activeFilter : [];
  const selectedKeys = new Set(selectedFilters.map(filterKey));
  const collectionChips = collections
    .filter((collection) => collection?.name)
    .map((collection) => ({
      label: collection.name,
      label_en: collection.name,
      label_de: collection.name,
      link: collection.slug,
      kind: 'collection',
      filter: { collection: collection.name },
    }));
  const supplementalChips = chips
    .filter((chip) => chip.filter && !chip.filter.collection)
    .map((chip) => ({ ...chip, kind: 'attribute' }));
  const attributeChips = [...supplementalChips, ...COMMON_SHOPPING_CHIPS].filter((chip, index, allChips) => (
    Object.values(chip.filter).every((value) => value !== undefined)
    && allChips.findIndex((item) => filterKey(item.filter) === filterKey(chip.filter)) === index
  ));
  const featuredCollectionCount = Math.min(4, collectionChips.length);
  const visibleChips = collectionChips.length > 0
    ? [
      ...collectionChips.slice(0, featuredCollectionCount),
      ...attributeChips,
      ...collectionChips.slice(featuredCollectionCount),
    ]
    : [...chips, ...COMMON_SHOPPING_CHIPS];
  const selectedChips = selectedFilters.map((filter) => {
    const matchingChip = visibleChips.find((chip) => filterKey(chip.filter) === filterKey(filter));
    return {
      filter,
      key: filterKey(filter),
      label: matchingChip ? getLabel(matchingChip) : Object.values(filter).join(', '),
    };
  });
  const selectedFiltersLabel = getLabel({ label: 'Selected filters', label_en: 'Selected filters', label_de: 'Ausgewählte Filter' });
  const clearAllLabel = getLabel({ label: 'Clear all', label_en: 'Clear all', label_de: 'Alle löschen' });
  const removeFilterLabel = getLabel({ label: 'Remove', label_en: 'Remove', label_de: 'Entfernen' });

  const stopHoverScroll = React.useCallback(() => {
    if (hoverScrollDelayRef.current !== null) {
      window.clearTimeout(hoverScrollDelayRef.current);
      hoverScrollDelayRef.current = null;
    }

    if (hoverScrollFrameRef.current !== null) {
      cancelAnimationFrame(hoverScrollFrameRef.current);
      hoverScrollFrameRef.current = null;
    }
  }, []);

  const startHoverScroll = React.useCallback((direction) => {
    stopHoverScroll();

    const moveRail = () => {
      const rail = railRef.current;
      if (!rail) return;

      const previousPosition = rail.scrollLeft;
      rail.scrollLeft += direction * 3;

      if (rail.scrollLeft === previousPosition) {
        hoverScrollFrameRef.current = null;
        return;
      }

      hoverScrollFrameRef.current = requestAnimationFrame(moveRail);
    };

    hoverScrollDelayRef.current = window.setTimeout(() => {
      hoverScrollDelayRef.current = null;
      hoverScrollFrameRef.current = requestAnimationFrame(moveRail);
    }, 300);
  }, [stopHoverScroll]);

  const nudgeRail = (direction) => {
    const rail = railRef.current;
    if (!rail) return;

    rail.scrollBy({
      left: direction * rail.clientWidth * 0.72,
      behavior: 'smooth',
    });
  };

  React.useEffect(() => stopHoverScroll, [stopHoverScroll]);

  return (
    <div className="group/collection-rail sticky top-[102px] z-30 -mx-2 mb-8 w-[calc(100%+1rem)] max-w-none rounded-xl border border-border/80 bg-background/95 px-2 py-2.5 shadow-sm backdrop-blur-xl md:top-[154px] md:-mx-4 md:mb-10 md:w-[calc(100%+2rem)] md:px-4">
      <div
        ref={railRef}
        className="no-scrollbar flex w-full max-w-full snap-x snap-proximity gap-2.5 overflow-x-auto overscroll-x-contain scroll-smooth scroll-px-1 touch-pan-x"
        aria-label="Collection and product filters"
      >
        {visibleChips.filter((chip) => chip.filter).map((chip) => {
          const label = getLabel(chip);
          const key = filterKey(chip.filter);
          const selected = selectedKeys.has(key);
          const inactiveClasses = chip.kind === 'attribute'
            ? 'border-primary/35 bg-primary/5 text-primary hover:border-primary hover:bg-primary/10'
            : 'border-border bg-background/80 text-foreground hover:border-primary hover:text-primary';

          return (
            <button
              key={`${chip.link || label}-${key}`}
              type="button"
              onClick={() => onSelect((current) => (
                current.some((filter) => filterKey(filter) === key)
                  ? current.filter((filter) => filterKey(filter) !== key)
                  : [...current, chip.filter]
              ))}
              aria-pressed={selected}
              className={`min-h-10 flex-none snap-start whitespace-nowrap rounded-full border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] transition-all ${selected
                ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                : inactiveClasses
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        aria-label="Scroll collections left"
        onClick={() => nudgeRail(-1)}
        onMouseEnter={() => startHoverScroll(-1)}
        onMouseLeave={stopHoverScroll}
        className="absolute left-0 top-2.5 hidden h-10 w-12 items-center justify-start bg-gradient-to-r from-background via-background/90 to-transparent pl-1 text-foreground opacity-0 transition-opacity hover:text-primary focus-visible:opacity-100 group-hover/collection-rail:opacity-100 md:flex"
      >
        <ChevronLeft size={22} aria-hidden="true" />
      </button>

      <button
        type="button"
        aria-label="Scroll collections right"
        onClick={() => nudgeRail(1)}
        onMouseEnter={() => startHoverScroll(1)}
        onMouseLeave={stopHoverScroll}
        className="absolute right-0 top-2.5 hidden h-10 w-12 items-center justify-end bg-gradient-to-l from-background via-background/90 to-transparent pr-1 text-foreground opacity-0 transition-opacity hover:text-primary focus-visible:opacity-100 group-hover/collection-rail:opacity-100 md:flex"
      >
        <ChevronRight size={22} aria-hidden="true" />
      </button>

      {selectedChips.length > 0 && (
        <div className="mt-2 flex items-center gap-2 border-t border-border/70 pt-2" aria-live="polite">
          <span className="flex-none text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            {selectedFiltersLabel}
          </span>
          <div className="no-scrollbar flex min-w-0 flex-1 gap-1.5 overflow-x-auto">
            {selectedChips.map((chip) => (
              <button
                key={chip.key}
                type="button"
                onClick={() => onSelect((current) => current.filter((filter) => filterKey(filter) !== chip.key))}
                aria-label={`${removeFilterLabel} ${chip.label}`}
                className="flex min-h-8 flex-none items-center gap-1.5 whitespace-nowrap rounded-full bg-primary px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-primary-foreground transition-opacity hover:opacity-85"
              >
                {chip.label}
                <X size={12} aria-hidden="true" />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => onSelect([])}
            className="min-h-8 flex-none whitespace-nowrap px-2 text-[9px] font-semibold uppercase tracking-[0.1em] text-primary transition-opacity hover:opacity-70"
          >
            {clearAllLabel}
          </button>
        </div>
      )}
    </div>
  );
}
