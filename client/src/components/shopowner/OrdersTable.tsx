import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Download, MoreVertical, CheckCircle2, Circle, AlertCircle } from 'lucide-react';
import OrderDetailDrawer from './OrderDetailDrawer';

const dummyOrders = [
  { id: '#8932', customer: 'John Doe', device: 'iPhone 14 Pro', issue: 'Screen Replacement', technician: 'Sarah Jenkins', status: 'In Progress', priority: 'Urgent', eta: 'Today 4:00 PM' },
  { id: '#8933', customer: 'Alice Smith', device: 'MacBook Air M2', issue: 'Battery Service', technician: 'Mike Ross', status: 'Pending', priority: 'Normal', eta: 'Tomorrow' },
  { id: '#8934', customer: 'Robert Johnson', device: 'Galaxy S23', issue: 'Camera Lens Broken', technician: 'Unassigned', status: 'Pending', priority: 'Urgent', eta: 'Today 6:00 PM' },
  { id: '#8935', customer: 'Emily Watson', device: 'iPad Pro', issue: 'Water Damage', technician: 'Sarah Jenkins', status: 'Completed', priority: 'High', eta: 'Delivered' },
  { id: '#8936', customer: 'Michael Brown', device: 'Pixel 7', issue: 'Charging Port', technician: 'Emily Davis', status: 'In Progress', priority: 'Low', eta: 'Friday' },
];

const tabs = ['All', 'Today', 'Pending', 'In Progress', 'Completed'];

export default function OrdersTable() {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const filteredOrders = useMemo(() => {
    return dummyOrders.filter(order => {
      // Tab filter
      if (activeTab === 'Today' && !order.eta.includes('Today')) return false;
      if (activeTab !== 'All' && activeTab !== 'Today' && order.status !== activeTab) return false;
      
      // Search filter
      const q = debouncedSearch.toLowerCase();
      if (q && !(
        order.id.toLowerCase().includes(q) ||
        order.customer.toLowerCase().includes(q) ||
        order.device.toLowerCase().includes(q) ||
        order.issue.toLowerCase().includes(q)
      )) return false;

      return true;
    });
  }, [debouncedSearch, activeTab]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending':
        return <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 text-xs font-bold flex items-center gap-1.5"><Circle className="w-2 h-2 fill-current animate-pulse" /> Pending</span>;
      case 'In Progress':
        return <span className="px-2.5 py-1 rounded-full bg-ember/10 text-ember border border-ember/20 text-xs font-bold flex items-center gap-1.5"><Circle className="w-2 h-2 fill-current animate-pulse" /> In Progress</span>;
      case 'Completed':
        return <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-xs font-bold flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3" /> Completed</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full bg-slate-500/10 text-slate-400 border border-slate-500/20 text-xs font-bold">{status}</span>;
    }
  };

  const getPriorityFlag = (priority: string) => {
    switch (priority) {
      case 'Urgent':
      case 'High':
        return <span className="text-red-400 flex items-center gap-1 text-xs font-bold"><AlertCircle className="w-3 h-3" /> URGENT</span>;
      case 'Normal':
        return <span className="text-slate-400 text-xs font-medium">Normal</span>;
      case 'Low':
        return <span className="text-slate-500 text-xs font-medium">Low</span>;
      default:
        return <span className="text-slate-400 text-xs">{priority}</span>;
    }
  };

  return (
    <>
      <div className="bg-elevated/40 backdrop-blur-xl border border-border rounded-2xl p-6 lg:p-8 flex flex-col min-h-[500px]">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Orders Management</h2>
            <p className="text-slate-400 text-sm">Process, assign, and track repair orders across your shop.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" /> Export CSV
            </button>
            <button className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black rounded-lg text-sm font-bold shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all">
              New Order
            </button>
          </div>
        </div>

        {/* Filters Area */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div className="flex items-center gap-2 p-1 bg-black/40 rounded-xl border border-white/10 overflow-x-auto w-full lg:w-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors z-10 ${
                  activeTab === tab ? 'text-amber-500' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="ordersTabActive"
                    className="absolute inset-0 bg-amber-500/10 border border-amber-500/20 rounded-lg -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search orders..."
                className="w-full bg-black/40 border border-white/10 text-sm text-white rounded-xl pl-9 pr-4 py-2.5 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="p-2.5 bg-black/40 border border-white/10 rounded-xl text-slate-400 hover:text-white hover:border-white/20 transition-colors shrink-0">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Table Area */}
        <div className="overflow-x-auto pb-4">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 text-xs uppercase tracking-wider">
                <th className="p-4 font-semibold w-24">Order ID</th>
                <th className="p-4 font-semibold">Customer & Device</th>
                <th className="p-4 font-semibold">Issue</th>
                <th className="p-4 font-semibold">Technician</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">ETA</th>
                <th className="p-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {filteredOrders.length === 0 ? (
                  <motion.tr
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <td colSpan={7} className="p-8 text-center text-slate-500">
                      No orders found matching filters.
                    </td>
                  </motion.tr>
                ) : (
                  filteredOrders.map((order, i) => (
                    <motion.tr
                      key={order.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2, delay: i * 0.05 }}
                      onClick={() => setSelectedOrder(order)}
                      className="border-b border-white/5 hover:bg-amber-500/[0.03] group transition-all cursor-pointer"
                      style={{
                        transform: 'translateY(0)', // Framer motion overwrites this when animating, but custom css for hover works on group
                      }}
                      whileHover={{ translateY: -1, zIndex: 1, boxShadow: '0 4px 20px -2px rgba(245,158,11,0.15)' }}
                    >
                      <td className="p-4">
                        <span className="font-mono text-sm font-bold text-slate-300 group-hover:text-amber-400 transition-colors">{order.id}</span>
                        <div className="mt-1">{getPriorityFlag(order.priority)}</div>
                      </td>
                      <td className="p-4">
                        <p className="font-semibold text-white text-sm">{order.customer}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{order.device}</p>
                      </td>
                      <td className="p-4">
                        <span className="text-sm text-slate-300">{order.issue}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {order.technician !== 'Unassigned' ? (
                            <>
                              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] text-white font-bold">
                                {order.technician.charAt(0)}
                              </div>
                              <span className="text-sm text-slate-300">{order.technician}</span>
                            </>
                          ) : (
                            <span className="text-xs text-slate-500 italic bg-white/5 px-2 py-1 rounded-md">Unassigned</span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="p-4 text-sm text-slate-400">
                        {order.eta}
                      </td>
                      <td className="p-4 text-center">
                        <button 
                          className="p-2 text-slate-400 hover:text-amber-500 hover:bg-amber-500/10 rounded-lg transition-colors"
                          onClick={(e) => { e.stopPropagation(); /* handle dropdown */ }}
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      <OrderDetailDrawer 
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        order={selectedOrder}
      />
    </>
  );
}
