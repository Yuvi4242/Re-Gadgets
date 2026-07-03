import React, { useState } from 'react';
import { ToggleLeft, ToggleRight } from 'lucide-react';

const Cookies = () => {
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);

  return (
    <>
      <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-brandIndigo/10 border border-brandIndigo/20 text-brandIndigo font-bold text-xs uppercase tracking-wider mb-6">
        Last Updated: Oct 2026
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight mb-8">Cookie Policy</h1>
      
      <p>This Cookie Policy explains how Re-Gadgets ("we", "us", or "our") uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.</p>

      <h2>1. What are cookies?</h2>
      <p>Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.</p>
      
      <div className="not-prose my-10 bg-[oklch(0.12_0.005_260)] border border-[oklch(0.28_0.008_260/0.5)] rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-white mb-6">Manage Cookie Preferences</h3>
        
        <div className="space-y-6">
          <div className="flex items-start justify-between gap-4">
             <div>
               <h4 className="font-bold text-white">Essential Cookies</h4>
               <p className="text-sm text-[oklch(0.65_0.01_260)] mt-1">These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as access to secure areas.</p>
             </div>
             <div className="flex items-center text-[oklch(0.65_0.19_35)] shrink-0">
               <ToggleRight className="w-10 h-10" /> <span className="text-xs font-bold ml-1 uppercase tracking-wider">Required</span>
             </div>
          </div>
          
          <div className="h-px w-full bg-[oklch(0.28_0.008_260/0.3)]"></div>

          <div className="flex items-start justify-between gap-4 cursor-pointer" onClick={() => setAnalytics(!analytics)}>
             <div>
               <h4 className="font-bold text-white">Analytics & Performance</h4>
               <p className="text-sm text-[oklch(0.65_0.01_260)] mt-1">These cookies collect information that is used either in aggregate form to help us understand how our website is being used or how effective our marketing campaigns are.</p>
             </div>
             <div className="shrink-0 text-[oklch(0.65_0.19_35)] transition-colors">
               {analytics ? <ToggleRight className="w-10 h-10" /> : <ToggleLeft className="w-10 h-10 text-[oklch(0.28_0.008_260)]" />}
             </div>
          </div>

          <div className="h-px w-full bg-[oklch(0.28_0.008_260/0.3)]"></div>

          <div className="flex items-start justify-between gap-4 cursor-pointer" onClick={() => setMarketing(!marketing)}>
             <div>
               <h4 className="font-bold text-white">Targeting & Marketing</h4>
               <p className="text-sm text-[oklch(0.65_0.01_260)] mt-1">These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing.</p>
             </div>
             <div className="shrink-0 text-[oklch(0.65_0.19_35)] transition-colors">
               {marketing ? <ToggleRight className="w-10 h-10" /> : <ToggleLeft className="w-10 h-10 text-[oklch(0.28_0.008_260)]" />}
             </div>
          </div>
        </div>
      </div>

      <h2>2. How can I control cookies?</h2>
      <p>You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager above. The Cookie Consent Manager allows you to select which categories of cookies you accept or reject. Essential cookies cannot be rejected as they are strictly necessary to provide you with services.</p>
    </>
  );
};

export default Cookies;
