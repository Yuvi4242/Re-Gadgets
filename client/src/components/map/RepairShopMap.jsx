import React, { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { repairShops } from '../../data/repairShops';
import ShopInfoCard from './ShopInfoCard';
import { MapPin, Star, Wrench, AlertCircle, Phone, ArrowRight } from 'lucide-react';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function RepairShopMap({ onBookRepair }) {
  const [selectedShop, setSelectedShop] = useState(null);

  return (
    <div className="w-full bg-slate-950/80 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono uppercase tracking-wider mb-2">
            <MapPin className="w-3.5 h-3.5" />
            Delhi NCR Region
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-100">
            Interactive Repair Shop Map
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Find verified repair hubs near you in Delhi, Gurgaon, Noida & Karol Bagh
          </p>
        </div>
      </div>

      {!GOOGLE_MAPS_API_KEY ? (
        <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm">
            <p className="font-semibold">Google Maps Key Not Configured</p>
            <p className="text-amber-400/80 mt-0.5">
              Add <code className="bg-amber-950/60 px-1.5 py-0.5 rounded text-amber-200">VITE_GOOGLE_MAPS_API_KEY</code> to your <code className="bg-amber-950/60 px-1.5 py-0.5 rounded text-amber-200">client/.env</code> file to activate the map. You can still browse and book repair shops using the directory below!
            </p>
          </div>
        </div>
      ) : (
        <div className="relative w-full h-[420px] rounded-2xl overflow-hidden border border-slate-800 shadow-inner mb-6">
          <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
            <Map
              style={{ width: '100%', height: '100%' }}
              defaultCenter={{ lat: 28.6139, lng: 77.2090 }}
              defaultZoom={11}
              gestureHandling="greedy"
              disableDefaultUI={false}
              mapId="repair-shops-map"
            >
              {repairShops.map((shop) => (
                <AdvancedMarker
                  key={shop.id}
                  position={{ lat: shop.lat, lng: shop.lng }}
                  onClick={() => setSelectedShop(shop)}
                  title={shop.name}
                >
                  <Pin background="#f59e0b" glyphColor="#0f172a" borderColor="#78350f" />
                </AdvancedMarker>
              ))}
            </Map>
          </APIProvider>

          {/* Selected Shop Floating Info Modal on top of map */}
          {selectedShop && (
            <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 z-20 max-w-md">
              <ShopInfoCard
                shop={selectedShop}
                onClose={() => setSelectedShop(null)}
                onBookRepair={() => onBookRepair(selectedShop)}
              />
            </div>
          )}
        </div>
      )}

      {/* Accessible Shop Directory List */}
      <div className="mt-6">
        <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
          <Wrench className="w-4 h-4 text-amber-400" />
          Nearby Verified Repair Hubs Directory ({repairShops.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {repairShops.map((shop) => (
            <div
              key={shop.id}
              className={`p-4 rounded-2xl border transition-all duration-200 ${
                selectedShop?.id === shop.id
                  ? 'bg-amber-500/10 border-amber-500/50 shadow-lg shadow-amber-500/10'
                  : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div className="flex justify-between items-start gap-2">
                <div>
                  <h4 className="font-display font-bold text-slate-100 text-sm">{shop.name}</h4>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                    {shop.address}
                  </p>
                </div>
                <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                  <Star className="w-3 h-3 fill-amber-400" />
                  {shop.rating}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-1">
                {shop.services.map((svc) => (
                  <span key={svc} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {svc}
                  </span>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Phone className="w-3 h-3 text-slate-500" />
                  {shop.phone}
                </span>
                <button
                  onClick={() => {
                    setSelectedShop(shop);
                    onBookRepair(shop);
                  }}
                  className="flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
                >
                  Book Repair
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
