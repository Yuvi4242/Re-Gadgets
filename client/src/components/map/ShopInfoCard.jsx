import React from 'react';
import { Star, Phone, MapPin, Wrench, X, Calendar } from 'lucide-react';

export default function ShopInfoCard({ shop, onClose, onBookRepair }) {
  return (
    <div className="relative bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-2xl p-5 shadow-2xl text-slate-100 max-w-md w-full animate-in fade-in zoom-in-95 duration-200">
      <button 
        className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition-colors" 
        onClick={onClose}
        aria-label="Close details"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="flex items-start gap-3 pr-6">
        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400">
          <Wrench className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-display font-bold text-lg text-slate-100 leading-snug">{shop.name}</h3>
          <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
            <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            {shop.address}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-4 text-xs text-slate-300">
        <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 font-semibold border border-amber-500/20">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          {shop.rating} / 5.0
        </span>
        <span className="flex items-center gap-1 text-slate-400">
          <Phone className="w-3.5 h-3.5 text-slate-500" />
          {shop.phone}
        </span>
      </div>

      <div className="mt-4">
        <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">Available Services</p>
        <div className="flex flex-wrap gap-1.5">
          {shop.services.map((s) => (
            <span key={s} className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700/60">
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button 
          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold py-2.5 px-4 rounded-xl shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]" 
          onClick={onBookRepair}
        >
          <Calendar className="w-4 h-4" />
          Book Repair
        </button>
        <button 
          className="px-4 py-2.5 text-xs text-slate-400 hover:text-slate-200 bg-slate-800/80 hover:bg-slate-800 rounded-xl transition-colors"
          onClick={onClose}
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
