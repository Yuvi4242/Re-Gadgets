import React, { useState, useEffect } from 'react';
import { Search, Loader2, AlertCircle, History, Filter } from 'lucide-react';
import { getDeviceRepairHistory } from '../../services/repairRecordService';
import RepairHistoryCard, { RepairRecordData } from '../repair/RepairHistoryCard';

export default function RepairHistoryPanel() {
  const [deviceSearch, setDeviceSearch] = useState('');
  const [records, setRecords] = useState<RepairRecordData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!deviceSearch.trim()) return;

    setLoading(true);
    setError('');
    setSearched(true);

    try {
      const data = await getDeviceRepairHistory(deviceSearch.trim());
      setRecords(data);
    } catch (err: any) {
      console.error('Error fetching device history:', err);
      setError(err.response?.data?.message || 'Failed to fetch device repair history');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#0a0a1a]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <History className="w-6 h-6 text-cyan-400" />
            Device Repair Service History
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Search full repair records, parts, warranties, and visual proof before and after repair.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by device model or S/N..."
              value={deviceSearch}
              onChange={(e) => setDeviceSearch(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:border-cyan-500 outline-none"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-sm rounded-xl transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]"
          >
            Search
          </button>
        </form>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="py-20 flex flex-col items-center justify-center space-y-3">
          <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
          <p className="font-mono text-xs text-slate-400 uppercase tracking-widest">
            Searching device service records...
          </p>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Records list */}
      {!loading && !error && searched && records.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
            <span>Found {records.length} repair service record(s)</span>
          </div>
          <div className="space-y-6">
            {records.map((rec) => (
              <RepairHistoryCard key={rec._id} record={rec} />
            ))}
          </div>
        </div>
      )}

      {/* Empty state after search */}
      {!loading && !error && searched && records.length === 0 && (
        <div className="py-20 text-center rounded-3xl border border-dashed border-white/10 bg-white/[0.02] p-8 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-slate-400">
            <History className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">No Repair Records Found</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            No service history records found matching "{deviceSearch}". Check the device model or serial number and try again.
          </p>
        </div>
      )}

      {/* Initial state before search */}
      {!searched && !loading && (
        <div className="py-20 text-center rounded-3xl border border-white/5 bg-[#0a0a1a]/30 backdrop-blur-xl p-8 space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto text-cyan-400">
            <Search className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-white">Device History Lookup</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Enter a device model (e.g. "iPhone 13 Pro", "MacBook Pro") or serial number above to inspect previous repairs, warranties, and visual proof photos.
          </p>
        </div>
      )}
    </div>
  );
}
