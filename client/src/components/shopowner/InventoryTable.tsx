import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Filter, AlertCircle, ShoppingCart, Info, TrendingUp, CheckCircle } from 'lucide-react';
import AddPartModal from './AddPartModal';

const dummyInventory = [
  { id: 1, name: 'iPhone 14 Pro Screen OEM', sku: 'IP14P-SCR-OEM', category: 'Screens', stock: 12, min: 5, supplier: 'Apple Parts Direct', cost: 145.00 },
  { id: 2, name: 'iPhone 13 Battery Replacement', sku: 'IP13-BAT-A15', category: 'Batteries', stock: 2, min: 10, supplier: 'BatteryWholesale', cost: 18.50 },
  { id: 3, name: 'Galaxy S23 Ultra Display Assembly', sku: 'SAM-S23U-DISP', category: 'Screens', stock: 0, min: 3, supplier: 'Samsung Parts', cost: 210.00 },
  { id: 4, name: 'MacBook Pro M1 Logic Board (Used)', sku: 'MBP-M1-LB-820', category: 'Motherboards', stock: 1, min: 1, supplier: 'RefurbTech', cost: 350.00 },
  { id: 5, name: 'Generic USB-C Fast Charger 20W', sku: 'ACC-USBC-20W', category: 'Accessories', stock: 45, min: 20, supplier: 'TechAccessories Inc', cost: 4.50 },
  { id: 6, name: 'iPad Air 4 Screen Digitizer', sku: 'IPAD-A4-DIG', category: 'Screens', stock: 6, min: 8, supplier: 'Apple Parts Direct', cost: 65.00 },
];

const categories = ['All', 'Screens', 'Batteries', 'Motherboards', 'Accessories'];

export default function InventoryTable() {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredInventory = useMemo(() => {
    return dummyInventory.filter(item => {
      if (activeTab !== 'All' && item.category !== activeTab) return false;
      if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase()) && !item.sku.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [activeTab, searchQuery]);

  const handleReorder = (item: any) => {
    const amount = item.min - item.stock + 5; // Reorder algorithm mock
    setToastMessage(`Ordered ${amount}x ${item.name}`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const totals = {
    parts: dummyInventory.length,
    lowStock: dummyInventory.filter(i => i.stock > 0 && i.stock <= i.min).length,
    outOfStock: dummyInventory.filter(i => i.stock === 0).length,
    value: dummyInventory.reduce((acc, curr) => acc + (curr.stock * curr.cost), 0)
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 bg-[#0a0a1a] border border-emerald-500/30 shadow-[0_10px_40px_rgba(16,185,129,0.2)] text-white px-5 py-3 rounded-2xl flex items-center gap-3"
          >
            <div className="bg-emerald-500/20 text-emerald-400 p-1 rounded-full"><CheckCircle className="w-5 h-5"/></div>
            <div>
              <p className="text-sm font-bold">Order Placed successfully</p>
              <p className="text-xs text-slate-400">{toastMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-[#0a0a1a]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 lg:p-8 flex flex-col min-h-[500px]">
        {/* Header & Summary */}
        <div className="flex flex-col xl:flex-row justify-between xl:items-end gap-6 mb-8 border-b border-white/10 pb-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Inventory Management</h2>
            <p className="text-slate-400 text-sm">Track stock levels, set thresholds, and reorder parts.</p>
          </div>
          
          <div className="flex gap-4 sm:gap-6 flex-wrap xl:min-w-[500px]">
             <div className="flex-1 min-w-[120px] bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-xs text-slate-400 mb-1">Total Parts</p>
                <p className="text-2xl font-bold text-white">{totals.parts}</p>
             </div>
             <div className="flex-1 min-w-[120px] bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                <p className="text-xs text-amber-500 mb-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> Low Stock</p>
                <p className="text-2xl font-bold text-amber-500">{totals.lowStock}</p>
             </div>
             <div className="flex-1 min-w-[120px] bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                <p className="text-xs text-red-500 mb-1 flex items-center gap-1"><Info className="w-3 h-3"/> Out of Stock</p>
                <p className="text-2xl font-bold text-red-500">{totals.outOfStock}</p>
             </div>
             <div className="flex-1 min-w-[120px] bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                <p className="text-xs text-emerald-400 mb-1 flex items-center gap-1"><TrendingUp className="w-3 h-3"/> Total Value</p>
                <p className="text-2xl font-bold text-emerald-400">${totals.value.toFixed(2)}</p>
             </div>
          </div>
        </div>

        {/* Filters Top */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div className="flex items-center gap-2 p-1 bg-black/40 rounded-xl border border-white/10 overflow-x-auto w-full lg:w-auto no-scrollbar">
            {categories.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors z-10 ${
                  activeTab === tab ? 'text-amber-500' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {activeTab === tab && (
                  <motion.div layoutId="inventoryTab" className="absolute inset-0 bg-amber-500/10 border border-amber-500/20 rounded-lg -z-10" />
                )}
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Search name or SKU..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-black/40 border border-white/10 text-sm text-white rounded-xl pl-9 pr-4 py-2.5 focus:border-amber-500 focus:ring-1 outline-none" />
            </div>
            <button className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all flex items-center gap-2 shrink-0" onClick={() => setIsModalOpen(true)}>
              <Plus className="w-4 h-4"/> Add Part
            </button>
          </div>
        </div>

        {/* Target Table */}
        <div className="overflow-x-auto pb-4">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 text-xs uppercase tracking-wider">
                <th className="p-4 font-semibold">Part Name & SKU</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold w-40">Stock Level</th>
                <th className="p-4 font-semibold">Supplier</th>
                <th className="p-4 font-semibold text-right">Unit Cost</th>
                <th className="p-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map(item => {
                const ratio = item.stock / item.min;
                const statusColor = item.stock === 0 ? 'bg-red-500' : ratio <= 1 ? 'bg-amber-500' : 'bg-emerald-500';
                const isLow = item.stock <= item.min;
                
                return (
                  <tr key={item.id} className={`border-b border-white/5 hover:bg-white/5 transition-colors ${item.stock === 0 ? 'bg-red-500/5' : isLow ? 'bg-amber-500/[0.02]' : ''}`}>
                    <td className="p-4">
                      <p className="font-semibold text-white text-sm flex items-center gap-2">
                        {isLow && <span className={`w-2 h-2 rounded-full ${item.stock === 0 ? 'bg-red-500 animate-pulse' : 'bg-amber-500'}`} />}
                        {item.name}
                      </p>
                      <p className="text-xs text-slate-400 mt-1 font-mono">{item.sku}</p>
                    </td>
                    <td className="p-4 text-sm text-slate-300">{item.category}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-white font-bold">{item.stock}</span>
                        <span className="text-slate-500">Min: {item.min}</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${statusColor}`} style={{ width: `${Math.min((item.stock / (item.min * 2)) * 100, 100)}%` }} />
                      </div>
                    </td>
                    <td className="p-4 text-sm text-slate-400">{item.supplier}</td>
                    <td className="p-4 text-sm text-right text-emerald-400 font-medium">${item.cost.toFixed(2)}</td>
                    <td className="p-4 text-center">
                      <button onClick={() => handleReorder(item)} className="px-3 py-1.5 bg-white/5 hover:bg-amber-500 text-slate-300 hover:text-black hover:shadow-[0_0_15px_rgba(245,158,11,0.5)] border border-white/10 hover:border-transparent rounded-lg text-xs font-bold transition-all inline-flex items-center gap-1.5">
                        <ShoppingCart className="w-3 h-3"/> Reorder
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <AddPartModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
