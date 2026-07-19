import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { createInventoryItem } from '../../services/shopService';
import { toast } from 'react-hot-toast';

interface AddPartModalProps {
  isOpen: boolean;
  onClose: () => void;
  shopId?: string | null;
  onCreated?: () => void;
}

export default function AddPartModal({ isOpen, onClose, shopId, onCreated }: AddPartModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    sku: '',
    category: 'Screens',
    stock: 0,
    minStock: 5,
    supplier: '',
    cost: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shopId) {
      toast.error('Shop not found');
      return;
    }
    setIsSubmitting(true);
    try {
      await createInventoryItem(shopId, form);
      toast.success('Part added');
      setForm({ name: '', sku: '', category: 'Screens', stock: 0, minStock: 5, supplier: '', cost: 0 });
      onCreated?.();
      onClose();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to add part');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 10 }}
            className="relative w-full max-w-xl bg-[#0a0a1a] border border-white/10 shadow-2xl rounded-2xl overflow-hidden flex flex-col"
          >
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-amber-500" /> Add New Part
              </h2>
              <button onClick={onClose} className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1 col-span-2">
                  <label className="text-xs text-slate-400 ml-1">Part Name</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 text-white rounded-xl focus:border-amber-500 p-3 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400 ml-1">SKU</label>
                  <input
                    required
                    value={form.sku}
                    onChange={(e) => setForm({ ...form, sku: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 text-white rounded-xl focus:border-amber-500 p-3 outline-none font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400 ml-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 text-white rounded-xl focus:border-amber-500 p-3 outline-none"
                  >
                    {['Screens', 'Batteries', 'Motherboards', 'Accessories', 'Other'].map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400 ml-1">Stock</label>
                  <input
                    type="number"
                    min={0}
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
                    className="w-full bg-black/40 border border-white/10 text-white rounded-xl focus:border-amber-500 p-3 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400 ml-1">Min Stock</label>
                  <input
                    type="number"
                    min={0}
                    value={form.minStock}
                    onChange={(e) => setForm({ ...form, minStock: Number(e.target.value) })}
                    className="w-full bg-black/40 border border-white/10 text-white rounded-xl focus:border-amber-500 p-3 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400 ml-1">Supplier</label>
                  <input
                    value={form.supplier}
                    onChange={(e) => setForm({ ...form, supplier: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 text-white rounded-xl focus:border-amber-500 p-3 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400 ml-1">Unit Cost</label>
                  <input
                    type="number"
                    min={0}
                    step="0.01"
                    value={form.cost}
                    onChange={(e) => setForm({ ...form, cost: Number(e.target.value) })}
                    className="w-full bg-black/40 border border-white/10 text-white rounded-xl focus:border-amber-500 p-3 outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={onClose} className="px-5 py-2.5 bg-white/5 border border-white/10 text-white rounded-xl">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-black rounded-xl font-bold disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : 'Save Part'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
