import React, { useState, useEffect, useCallback } from 'react';
import { dataClient } from '@/lib/dataClient';
import { asArray } from '@/lib/base44Data';
import { ScrollText, RefreshCw, AlertCircle } from 'lucide-react';

const STATUS_COLORS = {
  pending: 'text-amber-500',
  in_progress: 'text-blue-500',
  completed: 'text-emerald-500',
  failed: 'text-red-500'
};

export default function AdminTranslationLogs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = asArray(await dataClient.entities.TranslationJob.list('-created_date', 100));
      setJobs(data);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = jobs.filter(j => filterStatus === 'all' || j.status === filterStatus);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display font-semibold text-foreground flex items-center gap-2">
            <ScrollText size={24} /> Translation Logs
          </h1>
          <p className="text-xs text-muted-foreground mt-1">Track all translation jobs, their status, and any errors</p>
        </div>
        <button onClick={load} className="flex items-center gap-2 text-xs px-4 py-2 border border-border rounded hover:border-primary text-foreground">
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      <div className="mb-6">
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="bg-background border border-border text-xs text-foreground px-3 py-2 rounded">
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-20 text-xs text-muted-foreground">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 border border-border rounded-lg">
          <ScrollText className="mx-auto text-muted-foreground mb-3" size={32} />
          <p className="text-sm text-muted-foreground">No translation jobs logged yet</p>
        </div>
      ) : (
        <div className="border border-border rounded-lg overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-muted">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Content</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Type</th>
                <th className="text-center px-4 py-3 font-medium text-muted-foreground">Source</th>
                <th className="text-center px-4 py-3 font-medium text-muted-foreground">Target</th>
                <th className="text-center px-4 py-3 font-medium text-muted-foreground">Status</th>
                <th className="text-center px-4 py-3 font-medium text-muted-foreground">Provider</th>
                <th className="text-center px-4 py-3 font-medium text-muted-foreground">Chars</th>
                <th className="text-center px-4 py-3 font-medium text-muted-foreground">Trigger</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Completed</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Error</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(job => (
                <tr key={job.id} className="border-t border-border hover:bg-muted/50">
                  <td className="px-4 py-3 text-foreground max-w-[180px] truncate">{job.contentTitle || job.contentId}</td>
                  <td className="px-4 py-3 text-muted-foreground">{job.entityName}</td>
                  <td className="px-4 py-3 text-center text-muted-foreground uppercase">{job.sourceLanguage}</td>
                  <td className="px-4 py-3 text-center text-muted-foreground uppercase">{job.targetLanguage}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={STATUS_COLORS[job.status]}>{job.status}</span>
                  </td>
                  <td className="px-4 py-3 text-center text-muted-foreground">{job.provider}</td>
                  <td className="px-4 py-3 text-center text-muted-foreground">{job.characterCount || 0}</td>
                  <td className="px-4 py-3 text-center text-muted-foreground">{job.triggerType}</td>
                  <td className="px-4 py-3 text-muted-foreground">{job.completedAt ? new Date(job.completedAt).toLocaleString() : '-'}</td>
                  <td className="px-4 py-3 text-red-500 max-w-[200px] truncate">
                    {job.errorMessage ? (
                      <span className="flex items-center gap-1"><AlertCircle size={11} /> {job.errorMessage}</span>
                    ) : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}