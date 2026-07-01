import React, { useState, useEffect, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import { Languages, RefreshCw, AlertCircle, CheckCircle2, Clock, FileText } from 'lucide-react';

const STATUS_COLORS = {
  translated: 'text-emerald-500',
  partial: 'text-amber-500',
  not_translated: 'text-red-500'
};

const STATUS_LABELS = {
  translated: 'Translated',
  partial: 'Partial',
  not_translated: 'Missing'
};

export default function AdminTranslationDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterEntity, setFilterEntity] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [translating, setTranslating] = useState({});

  const loadStatus = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await base44.functions.invoke('translationStatus', {});
      setData(res.data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load status');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadStatus(); }, [loadStatus]);

  const handleTranslate = async (entityName, contentId) => {
    const key = `${entityName}_${contentId}`;
    setTranslating(prev => ({ ...prev, [key]: true }));
    try {
      await base44.functions.invoke('processTranslation', {
        entity_name: entityName,
        entity_id: contentId,
        trigger_type: 'manual'
      });
      await loadStatus();
    } catch (e) {
      console.error('Translation failed:', e);
    } finally {
      setTranslating(prev => ({ ...prev, [key]: false }));
    }
  };

  const allItems = data?.entities?.flatMap(e => e.items || []) || [];
  const filteredItems = allItems.filter(item => {
    if (filterEntity !== 'all' && item.entityName !== filterEntity) return false;
    if (filterStatus === 'missing_en' && item.enStatus === 'translated') return false;
    if (filterStatus === 'missing_de' && item.deStatus === 'translated') return false;
    if (filterStatus === 'missing_any' && item.enStatus === 'translated' && item.deStatus === 'translated') return false;
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <RefreshCw className="animate-spin text-muted-foreground" size={24} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <AlertCircle className="mx-auto text-red-500 mb-3" size={32} />
        <p className="text-sm text-muted-foreground">{error}</p>
        <button onClick={loadStatus} className="mt-4 text-xs text-primary underline">Retry</button>
      </div>
    );
  }

  const summary = data?.summary;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display font-semibold text-foreground flex items-center gap-2">
            <Languages size={24} /> Translation Dashboard
          </h1>
          <p className="text-xs text-muted-foreground mt-1">Monitor and manage multilingual content across your store</p>
        </div>
        <button onClick={loadStatus} className="flex items-center gap-2 text-xs px-4 py-2 border border-border rounded hover:border-primary text-foreground">
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="border border-border rounded-lg p-4">
          <p className="text-[10px] tracking-wider uppercase text-muted-foreground">Total Content</p>
          <p className="text-2xl font-display font-bold text-foreground mt-1">{summary?.totalContent || 0}</p>
        </div>
        <div className="border border-border rounded-lg p-4">
          <p className="text-[10px] tracking-wider uppercase text-muted-foreground">EN Complete</p>
          <p className="text-2xl font-display font-bold text-emerald-500 mt-1">{summary?.totalEnComplete || 0}</p>
        </div>
        <div className="border border-border rounded-lg p-4">
          <p className="text-[10px] tracking-wider uppercase text-muted-foreground">DE Complete</p>
          <p className="text-2xl font-display font-bold text-emerald-500 mt-1">{summary?.totalDeComplete || 0}</p>
        </div>
        <div className="border border-border rounded-lg p-4">
          <p className="text-[10px] tracking-wider uppercase text-muted-foreground">EN Missing</p>
          <p className="text-2xl font-display font-bold text-red-500 mt-1">{summary?.totalEnMissing || 0}</p>
        </div>
        <div className="border border-border rounded-lg p-4">
          <p className="text-[10px] tracking-wider uppercase text-muted-foreground">DE Missing</p>
          <p className="text-2xl font-display font-bold text-red-500 mt-1">{summary?.totalDeMissing || 0}</p>
        </div>
      </div>

      {/* Entity breakdown */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-8">
        {data?.entities?.map(e => (
          <div key={e.entityName} className="border border-border rounded-lg p-3 text-center">
            <p className="text-[10px] tracking-wider uppercase text-muted-foreground">{e.entityName}</p>
            <p className="text-lg font-display font-bold text-foreground">{e.total || 0}</p>
            <div className="flex justify-center gap-2 mt-1 text-[10px]">
              <span className="text-emerald-500">EN: {e.enComplete || 0}</span>
              <span className="text-emerald-500">DE: {e.deComplete || 0}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <select value={filterEntity} onChange={e => setFilterEntity(e.target.value)} className="bg-background border border-border text-xs text-foreground px-3 py-2 rounded">
          <option value="all">All Content Types</option>
          {data?.entities?.map(e => <option key={e.entityName} value={e.entityName}>{e.entityName}</option>)}
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="bg-background border border-border text-xs text-foreground px-3 py-2 rounded">
          <option value="all">All Statuses</option>
          <option value="missing_en">Missing EN</option>
          <option value="missing_de">Missing DE</option>
          <option value="missing_any">Missing Any</option>
        </select>
      </div>

      {/* Content table */}
      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full text-xs">
          <thead className="bg-muted">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Title</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Type</th>
              <th className="text-center px-4 py-3 font-medium text-muted-foreground">EN</th>
              <th className="text-center px-4 py-3 font-medium text-muted-foreground">DE</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Updated</th>
              <th className="text-right px-4 py-3 font-medium text-muted-foreground">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.slice(0, 100).map(item => {
              const key = `${item.entityName}_${item.id}`;
              return (
                <tr key={item.id} className="border-t border-border hover:bg-muted/50">
                  <td className="px-4 py-3 text-foreground max-w-xs truncate">{item.title}</td>
                  <td className="px-4 py-3 text-muted-foreground">{item.entityName}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={STATUS_COLORS[item.enStatus]}>{STATUS_LABELS[item.enStatus]}</span>
                    <span className="text-muted-foreground ml-1">({item.enFieldsFilled}/{item.totalFields})</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={STATUS_COLORS[item.deStatus]}>{STATUS_LABELS[item.deStatus]}</span>
                    <span className="text-muted-foreground ml-1">({item.deFieldsFilled}/{item.totalFields})</span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{item.updatedDate ? new Date(item.updatedDate).toLocaleDateString() : '-'}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleTranslate(item.entityName, item.id)}
                      disabled={translating[key]}
                      className="text-[10px] px-3 py-1.5 bg-primary text-primary-foreground rounded hover:opacity-90 disabled:opacity-50 flex items-center gap-1 ml-auto"
                    >
                      {translating[key] ? <RefreshCw size={11} className="animate-spin" /> : <Languages size={11} />}
                      Translate
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filteredItems.length === 0 && (
          <div className="py-12 text-center text-muted-foreground text-xs">No content matches your filters</div>
        )}
        {filteredItems.length > 100 && (
          <div className="py-3 text-center text-[10px] text-muted-foreground">Showing 100 of {filteredItems.length} items</div>
        )}
      </div>
    </div>
  );
}