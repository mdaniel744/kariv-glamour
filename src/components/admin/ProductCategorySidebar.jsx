import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Package, FolderTree } from 'lucide-react';

/**
 * Builds a brand → collection tree from product list with counts.
 * Returns: [{ brand, count, collections: [{ name, count }] }]
 */
export function buildCategoryTree(products) {
  const tree = {};
  for (const p of products) {
    const brand = p.brand || '— Unassigned';
    if (!tree[brand]) tree[brand] = { _count: 0, _collections: {} };
    tree[brand]._count++;
    const col = p.collection || '— Unclassified';
    if (!tree[brand]._collections[col]) tree[brand]._collections[col] = 0;
    tree[brand]._collections[col]++;
  }
  return Object.entries(tree)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([brand, data]) => ({
      brand,
      count: data._count,
      collections: Object.entries(data._collections)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([name, count]) => ({ name, count }))
    }));
}

export default function ProductCategorySidebar({
  products,
  selectedBrand,
  selectedCollection,
  onSelectBrand,
  onSelectCollection,
  onSelectAll
}) {
  const [expanded, setExpanded] = useState({});
  const tree = buildCategoryTree(products);
  const allCount = products.length;

  const toggle = (brand) => setExpanded(prev => ({ ...prev, [brand]: !prev[brand] }));

  return (
    <div className="w-56 flex-shrink-0 border-r border-white/5 pr-3">
      <button
        onClick={onSelectAll}
        className={`w-full flex items-center gap-2 px-3 py-2 text-xs transition-colors mb-2 ${
          !selectedBrand ? 'bg-[#C5A367]/10 text-[#C5A367]' : 'text-[#8E8E93] hover:text-[#E5E5E5]'
        }`}
      >
        <Package size={14} />
        <span className="flex-1 text-left">All Products</span>
        <span className="text-[10px] text-[#555]">{allCount}</span>
      </button>

      {tree.map(node => {
        const isSelected = selectedBrand === node.brand && !selectedCollection;
        const isExpanded = expanded[node.brand] || isSelected;
        return (
          <div key={node.brand} className="mb-0.5">
            <button
              onClick={() => { toggle(node.brand); onSelectBrand(node.brand); }}
              className={`w-full flex items-center gap-1.5 px-3 py-2 text-xs transition-colors ${
                isSelected ? 'bg-[#C5A367]/10 text-[#C5A367]' : 'text-[#E5E5E5] hover:bg-white/5'
              }`}
            >
              {isExpanded ? <ChevronDown size={12} className="text-[#555]" /> : <ChevronRight size={12} className="text-[#555]" />}
              <FolderTree size={12} className="text-[#555]" />
              <span className="flex-1 text-left truncate">{node.brand}</span>
              <span className="text-[10px] text-[#555]">{node.count}</span>
            </button>
            {isExpanded && (
              <div className="ml-7 border-l border-white/5">
                {node.collections.map(col => {
                  const isColSelected = selectedBrand === node.brand && selectedCollection === col.name;
                  return (
                    <button
                      key={col.name}
                      onClick={() => onSelectCollection(node.brand, col.name)}
                      className={`w-full flex items-center gap-1.5 pl-3 pr-2 py-1.5 text-[11px] transition-colors ${
                        isColSelected ? 'text-[#C5A367]' : 'text-[#8E8E93] hover:text-[#E5E5E5]'
                      }`}
                    >
                      <span className="flex-1 text-left truncate">{col.name}</span>
                      <span className="text-[10px] text-[#555]">{col.count}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}