import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PackageSearch, PenTool, Truck, CheckCircle2, PhoneCall, Star, MapPin } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const agentIconHtml = `
  <div class="relative flex h-10 w-10 items-center justify-center">
    <div class="absolute inset-0 animate-ping rounded-full bg-brandBlue opacity-20"></div>
    <div class="absolute inset-0 rounded-full border-2 border-brandBlue bg-[#0b1326] flex items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.5)]">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>
    </div>
    <div class="absolute -top-1 -right-1 h-3 w-3 rounded-full border-2 border-[#0b1326] bg-emerald-400"></div>
  </div>
`;

const agentIcon = L.divIcon({
  html: agentIconHtml,
  className: 'custom-leaflet-icon',
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

const destIconHtml = `
  <div class="relative flex h-8 w-8 items-center justify-center">
    <div class="absolute inset-0 rounded-full border-2 border-brandPurple bg-[#0b1326] flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.5)]">
       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
    </div>
  </div>
`;

const destIcon = L.divIcon({
  html: destIconHtml,
  className: 'custom-leaflet-icon',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const Tracking = () => {
  const [agentPos, setAgentPos] = useState([40.7128, -74.0060]);
  const destPos = [40.7282, -73.9942];

  useEffect(() => {
    let start = null;
    const duration = 20000;
    const animate = (time) => {
      if (!start) start = time;
      const progress = (time - start) / duration;
      if (progress < 1) {
        const lat = 40.7128 + (40.7282 - 40.7128) * progress;
        const lng = -74.0060 + (-73.9942 - -74.0060) * progress;
        setAgentPos([lat, lng]);
        requestAnimationFrame(animate);
      } else {
        setAgentPos(destPos);
      }
    };
    requestAnimationFrame(animate);
  }, []);

  const steps = [
    { label: 'Booking Confirmed', date: 'Today, 10:30 AM', icon: CheckCircle2, status: 'completed' },
    { label: 'Agent Assigned', date: 'Today, 10:45 AM', icon: PackageSearch, status: 'completed' },
    { label: 'Device Picked Up', date: 'Today, 11:30 AM', icon: Truck, status: 'current' },
    { label: 'Repairing', date: 'Pending', icon: PenTool, status: 'upcoming' },
    { label: 'Delivered', date: 'Pending', icon: CheckCircle2, status: 'upcoming' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto relative isolate">
      <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-brandPurple/10 blur-[150px] -z-10 rounded-full pointer-events-none"></div>

      <motion.div 
         initial={{ opacity: 0, y: -20 }}
         animate={{ opacity: 1, y: 0 }}
         className="mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 py-1.5 px-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Tracking Active
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-[oklch(0.96_0.005_260)] tracking-tight">Order #RG-9823</h1>
            <p className="text-[oklch(0.65_0.01_260)] font-medium mt-1">iPhone 13 Pro Max - Screen Repair</p>
          </div>
          
          <div className="flex items-center gap-2 bg-[oklch(0.18_0.006_260/0.8)] border border-[oklch(0.28_0.008_260/0.5)] rounded-2xl p-3 shadow-lg">
             <div className="h-10 w-10 rounded-xl bg-brandBlue/10 border border-brandBlue/30 flex items-center justify-center text-brandBlue">
               <Truck className="w-5 h-5" />
             </div>
             <div className="pr-4">
                <p className="text-[10px] font-bold text-[oklch(0.65_0.01_260)] uppercase tracking-wider">Estimated Arrival</p>
                <p className="text-base font-black text-white">12 Mins <span className="text-xs text-[oklch(0.65_0.01_260)] font-medium ml-1">(2.4 km away)</span></p>
             </div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8 p-6 rounded-3xl bg-[oklch(0.14_0.005_260)] border border-[oklch(0.28_0.008_260/0.5)] shadow-xl overflow-x-auto no-scrollbar"
      >
        <div className="flex items-center min-w-[700px] justify-between relative px-2">
          <div className="absolute top-1/2 left-8 right-8 h-1 -translate-y-1/2 bg-[oklch(0.28_0.008_260/0.5)] rounded-full z-0"></div>
          <div className="absolute top-1/2 left-8 h-1 -translate-y-1/2 bg-gradient-to-r from-brandBlue to-brandPurple rounded-full z-0 w-[50%] shadow-[0_0_10px_rgba(79,70,229,0.5)]"></div>

          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isCompleted = step.status === 'completed';
            const isCurrent = step.status === 'current';
            
            return (
              <div key={idx} className="relative z-10 flex flex-col items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 border-2 shadow-lg
                  ${isCompleted ? 'bg-gradient-to-br from-brandBlue to-brandPurple border-transparent text-white' : 
                    isCurrent ? 'bg-[oklch(0.18_0.006_260)] border-brandBlue text-brandBlue scale-110 shadow-[0_0_15px_rgba(79,70,229,0.4)]' : 
                    'bg-[oklch(0.12_0.005_260)] border-[oklch(0.28_0.008_260)] text-[oklch(0.65_0.01_260)]'}`}
                >
                  <Icon className={isCurrent ? 'w-5 h-5' : 'w-5 h-5'} />
                  {isCurrent && <div className="absolute -inset-2 rounded-2xl border border-brandBlue/30 animate-pulse"></div>}
                </div>
                <div className="text-center">
                  <p className={`text-sm font-black transition-colors ${isCurrent ? 'text-white' : isCompleted ? 'text-[oklch(0.85_0.01_260)]' : 'text-[oklch(0.55_0.01_260)]'}`}>{step.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <motion.div 
           initial={{ opacity: 0, scale: 0.98 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.2 }}
           className="lg:col-span-2 overflow-hidden rounded-3xl border border-[oklch(0.28_0.008_260/0.5)] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)] bg-[oklch(0.14_0.005_260)] h-[500px] relative isolate z-0"
        >
          <MapContainer 
            center={[40.7200, -74.0000]} 
            zoom={13} 
            scrollWheelZoom={false} 
            zoomControl={false}
            className="w-full h-full z-0"
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors'
            />
            
            <Polyline 
               positions={[[40.7128, -74.0060], [40.7200, -74.0000], [40.7282, -73.9942]]} 
               color="#4f46e5" 
               weight={4} 
               opacity={0.6} 
               dashArray="10, 10" 
            />
            
            <Marker position={destPos} icon={destIcon} />
            <Marker position={agentPos} icon={agentIcon} />
          </MapContainer>

          <div className="absolute top-6 left-6 z-[400] bg-[oklch(0.14_0.005_260/0.8)] backdrop-blur-md px-4 py-2 rounded-xl border border-[oklch(0.28_0.008_260/0.5)] shadow-lg flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
             <span className="text-xs font-bold text-white tracking-widest uppercase">Live GPS Connected</span>
          </div>
        </motion.div>

        <motion.div 
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.3 }}
           className="h-[500px] flex flex-col overflow-hidden rounded-3xl border border-[oklch(0.28_0.008_260/0.5)] bg-[oklch(0.14_0.005_260)] shadow-2xl relative isolate"
        >
          <div className="h-32 bg-gradient-to-br from-brandBlue/80 to-brandPurple/80 relative">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay opacity-50"></div>
             <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[oklch(0.14_0.005_260)] to-transparent"></div>
          </div>
          
          <div className="-mt-16 relative px-6 pb-6 flex-1 flex flex-col z-10">
            <div className="flex justify-between items-start mb-4">
              <motion.img 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.5 }}
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=128&h=128&fit=crop" 
                alt="David Lee" 
                className="w-24 h-24 rounded-2xl border-4 border-[oklch(0.14_0.005_260)] shadow-xl object-cover"
              />
              <div className="mt-16 flex items-center gap-1.5 bg-[oklch(0.78_0.16_75/0.1)] text-[oklch(0.78_0.16_75)] px-3 py-1.5 rounded-xl text-sm font-extrabold border border-[oklch(0.78_0.16_75/0.2)] shadow-sm">
                <Star className="w-4 h-4 fill-current" /> 4.9
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-black text-2xl tracking-tight text-[oklch(0.96_0.005_260)]">David Lee</h3>
              <p className="text-xs font-bold text-brandBlue uppercase tracking-widest mt-1">Master Technician</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-auto">
              <div className="bg-[oklch(0.18_0.006_260/0.5)] p-4 rounded-2xl border border-[oklch(0.28_0.008_260/0.4)] text-center transition-colors hover:bg-[oklch(0.18_0.006_260)]">
                <p className="text-[10px] text-[oklch(0.65_0.01_260)] font-bold uppercase tracking-wider mb-1">Repairs Done</p>
                <p className="font-black text-xl text-white">520<span className="text-brandBlue">+</span></p>
              </div>
              <div className="bg-[oklch(0.18_0.006_260/0.5)] p-4 rounded-2xl border border-[oklch(0.28_0.008_260/0.4)] text-center transition-colors hover:bg-[oklch(0.18_0.006_260)]">
                <p className="text-[10px] text-[oklch(0.65_0.01_260)] font-bold uppercase tracking-wider mb-1">Experience</p>
                <p className="font-black text-xl text-white">4 <span className="text-brandPurple text-sm">Yrs</span></p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <motion.button 
                 whileHover={{ scale: 1.02 }}
                 whileTap={{ scale: 0.98 }}
                 className="w-full bg-[oklch(0.18_0.006_260)] text-white border border-[oklch(0.28_0.008_260/0.6)] rounded-2xl py-3.5 font-bold text-sm flex items-center justify-center gap-2 hover:bg-[oklch(0.22_0.006_260)] transition-colors"
              >
                View Profile
              </motion.button>
              <motion.button 
                 whileHover={{ scale: 1.02 }}
                 whileTap={{ scale: 0.98 }}
                 className="w-full bg-gradient-to-r from-brandBlue to-brandPurple text-white rounded-2xl py-3.5 font-bold text-sm shadow-[0_0_15px_rgba(79,70,229,0.3)] flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" /> Call Agent
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  );
};

export default Tracking;
