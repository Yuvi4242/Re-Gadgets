import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Phone, MessageSquare } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default Leaflet icons in Vite/React
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

interface TrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  repairId: string;
}

export default function TrackingModal({ isOpen, onClose, repairId }: TrackingModalProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<L.Map | null>(null);

  useEffect(() => {
    if (isOpen && mapRef.current && !leafletMap.current) {
      // Mock location for the tech
      const techLocation: [number, number] = [40.7128, -74.0060];
      const customerLocation: [number, number] = [40.7200, -74.0150];

      leafletMap.current = L.map(mapRef.current).setView(techLocation, 14);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(leafletMap.current);

      L.marker(techLocation).addTo(leafletMap.current)
        .bindPopup('<b>Tech Location</b><br>Arriving in 15 mins.').openPopup();

      L.marker(customerLocation).addTo(leafletMap.current)
        .bindPopup('<b>Your Location</b>');

      // Draw a line connecting them
      L.polyline([techLocation, customerLocation], { color: '#06b6d4', weight: 4, dashArray: '10, 10' }).addTo(leafletMap.current);
    }

    return () => {
      if (leafletMap.current && !isOpen) {
        leafletMap.current.remove();
        leafletMap.current = null;
      }
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 m-auto z-50 max-w-2xl w-[90%] h-[80vh] bg-[#0a0a1a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40">
              <div className="flex items-center gap-3">
                <div className="bg-brandPurple/20 p-2 rounded-lg">
                  <MapPin className="w-5 h-5 text-brandPurple" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Live Tracking</h3>
                  <p className="text-xs text-slate-400">Order #{repairId}</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 text-slate-400 hover:text-white bg-white/5 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Map Container */}
            <div className="flex-1 relative w-full h-full bg-slate-900 border-b border-white/10">
              <div ref={mapRef} className="w-full h-full" />
              {/* Overlay ETA */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-[#0a0a1a]/90 backdrop-blur-md border border-brandPurple/50 px-4 py-2 rounded-full shadow-lg z-[1000] flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-brandPurple rounded-full animate-pulse" />
                <span className="text-sm font-medium text-white">ETA: 15 mins</span>
              </div>
            </div>

            {/* Tech Info Footer */}
            <div className="p-6 bg-[#0a0a1a] flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src="https://i.pravatar.cc/150?img=11" alt="Tech" className="w-12 h-12 rounded-full border-2 border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                <div>
                  <h4 className="text-white font-medium">Mike R.</h4>
                  <p className="text-xs text-slate-400">Level 4 Technician</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/10 group">
                  <MessageSquare className="w-5 h-5 text-slate-300 group-hover:text-cyan-400" />
                </button>
                <button className="flex items-center gap-2 px-4 py-3 bg-brandPurple hover:bg-brandPurple/90 text-white rounded-xl font-medium transition-colors border border-brandPurple/50 shadow-lg shadow-brandPurple/20">
                  <Phone className="w-4 h-4" />
                  Call Tech
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
