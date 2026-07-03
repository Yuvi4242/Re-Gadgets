import React from 'react';
import { motion } from 'framer-motion';
import { NavLink, Outlet } from 'react-router-dom';
import { Shield, FileText, Cookie } from 'lucide-react';

const legalLinks = [
  { path: '/privacy', label: 'Privacy Policy', icon: Shield },
  { path: '/terms', label: 'Terms of Service', icon: FileText },
  { path: '/cookies', label: 'Cookie Policy', icon: Cookie },
];

const LegalLayout = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative isolate flex flex-col md:flex-row gap-8">
      <div className="absolute top-0 right-1/2 w-[500px] h-[500px] bg-[oklch(0.65_0.19_35/0.05)] blur-[150px] -z-10 rounded-full pointer-events-none"></div>

      {/* Sidebar Nav */}
      <motion.aside 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full md:w-64 shrink-0"
      >
        <div className="sticky top-28 bg-[oklch(0.12_0.005_260)] border border-[oklch(0.28_0.008_260/0.5)] rounded-3xl p-4 shadow-xl">
           <h3 className="text-xs font-black text-[oklch(0.65_0.01_260)] uppercase tracking-widest mb-4 px-3">Legal & Compliance</h3>
           <nav className="space-y-1">
             {legalLinks.map((link, idx) => {
               const Icon = link.icon;
               return (
                 <NavLink 
                   key={idx}
                   to={link.path}
                   className={({ isActive }) => `w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${isActive ? 'bg-[oklch(0.65_0.19_35/0.1)] text-[oklch(0.65_0.19_35)] border border-[oklch(0.65_0.19_35/0.2)] shadow-sm' : 'text-[oklch(0.96_0.005_260)] hover:bg-[oklch(0.18_0.006_260)] border border-transparent'}`}
                 >
                   <Icon className="w-4 h-4" /> {link.label}
                 </NavLink>
               )
             })}
           </nav>
        </div>
      </motion.aside>

      {/* Main Content */}
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex-1 min-w-0"
      >
         <div className="bg-[oklch(0.12_0.005_260)] border border-[oklch(0.28_0.008_260/0.5)] rounded-3xl p-8 lg:p-12 shadow-xl prose prose-invert max-w-none prose-headings:text-white prose-p:text-[oklch(0.65_0.01_260)] prose-li:text-[oklch(0.65_0.01_260)] prose-a:text-[oklch(0.65_0.19_35)] marker:text-[oklch(0.65_0.19_35)]">
            <Outlet />
         </div>
      </motion.main>
    </div>
  );
};

export default LegalLayout;
