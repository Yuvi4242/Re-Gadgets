import React, { useState, useEffect, useMemo } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { repairShops } from '../../data/repairShops';
import ShopInfoCard from './ShopInfoCard';
import { MapPin, Star, Wrench, AlertCircle, Phone, ArrowRight, Layers, ExternalLink, X, ShieldAlert } from 'lucide-react';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// Component to dynamically re-center Leaflet map on shop selection
function LeafletMapRecenter({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center && Array.isArray(center) && center.length === 2) {
      map.setView(center, Math.max(map.getZoom(), 13), { animate: true });
    }
  }, [center, map]);
  return null;
}

export default function RepairShopMap({ onBookRepair }) {
  const [selectedShop, setSelectedShop] = useState(null);
  const [googleMapsError, setGoogleMapsError] = useState(false);
  const [provider, setProvider] = useState(() => (GOOGLE_MAPS_API_KEY ? 'google' : 'osm'));
  const [dismissNotice, setDismissNotice] = useState(false);

  // Catch global Google Maps auth failure (RefererNotAllowedMapError, invalid key, quota, etc.)
  useEffect(() => {
    const originalGmAuthFailure = window.gm_authFailure;
    window.gm_authFailure = () => {
      console.warn(
        '[Re-Gadgets] Google Maps authentication failed (RefererNotAllowedMapError). ' +
        'Authorizing URL: https://re-gadgets.vercel.app/* in Google Cloud Console. ' +
        'Falling back seamlessly to OpenStreetMap (Leaflet).'
      );
      setGoogleMapsError(true);
      setProvider('osm');
      if (typeof originalGmAuthFailure === 'function') {
        try {
          originalGmAuthFailure();
        } catch (_) {}
      }
    };

    return () => {
      window.gm_authFailure = originalGmAuthFailure;
    };
  }, []);

  // Custom Leaflet DivIcon for repair shops with amber neon styling
  const customIcons = useMemo(() => {
    const getIcon = (isSelected) =>
      L.divIcon({
        className: 'custom-shop-pin-wrapper',
        html: `
          <div style="position: relative; display: flex; align-items: center; justify-content: center; cursor: pointer; width: 34px; height: 34px;">
            ${isSelected ? '<div style="position: absolute; inset: -4px; border-radius: 9999px; background: rgba(245, 158, 11, 0.4); animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>' : ''}
            <div style="position: relative; width: 32px; height: 32px; border-radius: 9999px; background: ${isSelected ? '#f59e0b' : '#0f172a'}; border: 2px solid ${isSelected ? '#ffffff' : '#f59e0b'}; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 16px rgba(245, 158, 11, ${isSelected ? '0.9' : '0.45'}); transition: all 0.2s;">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${isSelected ? '#0f172a' : '#f59e0b'}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
          </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      });

    return {
      default: getIcon(false),
      selected: getIcon(true),
    };
  }, []);

  const handleSelectShop = (shop) => {
    setSelectedShop(shop);
  };

  const centerCoordinates = selectedShop 
    ? [selectedShop.lat, selectedShop.lng] 
    : [28.6139, 77.2090]; // Delhi NCR default

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

        {/* Map Provider Selector / Status Indicator */}
        <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-900/90 border border-slate-800 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => {
              if (!googleMapsError && GOOGLE_MAPS_API_KEY) {
                setProvider('google');
              }
            }}
            disabled={googleMapsError || !GOOGLE_MAPS_API_KEY}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              provider === 'google' && !googleMapsError
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed'
            }`}
            title={
              googleMapsError
                ? 'Google Maps referrer restriction error. Switch to OpenStreetMap or authorize domain in GCP.'
                : 'View with Google Maps'
            }
          >
            Google Maps
            {googleMapsError && (
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setProvider('osm')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              provider === 'osm'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3 h-3" />
            OpenStreetMap
          </button>
        </div>
      </div>

      {/* Helpful banner if Google Maps encountered RefererNotAllowedMapError */}
      {googleMapsError && !dismissNotice && (
        <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 flex items-start justify-between gap-3 animate-in fade-in">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm">
              <p className="font-semibold text-amber-300">
                Google Maps Referrer Authorization Notice
              </p>
              <p className="text-slate-300 mt-1 leading-relaxed">
                Your Google Maps API key has website referrer restrictions enabled, and <code className="bg-amber-950/60 px-1.5 py-0.5 rounded text-amber-300 font-mono">https://re-gadgets.vercel.app/*</code> is not yet added in Google Cloud Console.
              </p>
              <p className="text-amber-400/90 mt-1 font-medium">
                The map has automatically switched to OpenStreetMap (Leaflet) view so user browsing is uninterrupted.
              </p>
              <a
                href="https://console.cloud.google.com/apis/credentials"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 underline underline-offset-4 mt-2"
              >
                Configure HTTP Referrers in Google Cloud Console
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setDismissNotice(true)}
            className="text-slate-400 hover:text-slate-200 p-1 rounded-lg hover:bg-slate-800 transition-colors"
            title="Dismiss notice"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Map Viewport Container */}
      <div className="relative w-full h-[440px] rounded-2xl overflow-hidden border border-slate-800 shadow-inner mb-6 bg-slate-950">
        {/* Case 1: Google Maps Provider (when active and error-free) */}
        {provider === 'google' && !googleMapsError && GOOGLE_MAPS_API_KEY ? (
          <APIProvider
            apiKey={GOOGLE_MAPS_API_KEY}
            onError={(err) => {
              console.warn('[RepairShopMap] APIProvider error:', err);
              setGoogleMapsError(true);
              setProvider('osm');
            }}
          >
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
                  onClick={() => handleSelectShop(shop)}
                  title={shop.name}
                >
                  <Pin
                    background={selectedShop?.id === shop.id ? '#ffffff' : '#f59e0b'}
                    glyphColor="#0f172a"
                    borderColor="#78350f"
                  />
                </AdvancedMarker>
              ))}
            </Map>
          </APIProvider>
        ) : (
          /* Case 2: OpenStreetMap (Leaflet with CartoDB Dark Matter) Fallback / Default */
          <MapContainer
            center={centerCoordinates}
            zoom={11}
            scrollWheelZoom={true}
            zoomControl={true}
            className="w-full h-full z-0"
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
            />
            <LeafletMapRecenter center={centerCoordinates} />

            {repairShops.map((shop) => {
              const isSelected = selectedShop?.id === shop.id;
              return (
                <Marker
                  key={shop.id}
                  position={[shop.lat, shop.lng]}
                  icon={isSelected ? customIcons.selected : customIcons.default}
                  eventHandlers={{
                    click: () => handleSelectShop(shop),
                  }}
                  title={shop.name}
                />
              );
            })}
          </MapContainer>
        )}

        {/* Selected Shop Floating Info Modal on top of map */}
        {selectedShop && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 z-[500] max-w-md pointer-events-auto">
            <ShopInfoCard
              shop={selectedShop}
              onClose={() => setSelectedShop(null)}
              onBookRepair={() => onBookRepair(selectedShop)}
            />
          </div>
        )}
      </div>

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
              className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                selectedShop?.id === shop.id
                  ? 'bg-amber-500/10 border-amber-500/50 shadow-lg shadow-amber-500/10'
                  : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900'
              }`}
              onClick={() => handleSelectShop(shop)}
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
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectShop(shop);
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
