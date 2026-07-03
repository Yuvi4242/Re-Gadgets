import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Key, Shield, Code2, AlertTriangle, Zap } from 'lucide-react';

const sidebarLinks = [
  { title: 'Getting Started', icon: Zap },
  { title: 'Authentication', icon: Key },
  { title: 'Endpoints', icon: Terminal },
  { title: 'Rate Limits', icon: Shield },
  { title: 'Errors', icon: AlertTriangle },
  { title: 'Webhooks', icon: Code2 },
];

const ApiDocs = () => {
  const [activeTab, setActiveTab] = useState('Getting Started');

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative isolate flex flex-col md:flex-row gap-8">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[oklch(0.65_0.19_35/0.05)] blur-[150px] -z-10 rounded-full pointer-events-none"></div>

      {/* Sidebar Nav */}
      <motion.aside 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full md:w-64 shrink-0"
      >
        <div className="sticky top-28 bg-[oklch(0.12_0.005_260)] border border-[oklch(0.28_0.008_260/0.5)] rounded-3xl p-4 shadow-xl">
           <h3 className="text-xs font-black text-[oklch(0.65_0.01_260)] uppercase tracking-widest mb-4 px-3">Documentation</h3>
           <nav className="space-y-1">
             {sidebarLinks.map((link, idx) => {
               const Icon = link.icon;
               const isActive = activeTab === link.title;
               return (
                 <button 
                   key={idx}
                   onClick={() => setActiveTab(link.title)}
                   className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${isActive ? 'bg-[oklch(0.65_0.19_35/0.1)] text-[oklch(0.65_0.19_35)] border border-[oklch(0.65_0.19_35/0.2)] shadow-sm' : 'text-[oklch(0.96_0.005_260)] hover:bg-[oklch(0.18_0.006_260)] border border-transparent'}`}
                 >
                   <Icon className="w-4 h-4" /> {link.title}
                 </button>
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
         <div className="bg-[oklch(0.12_0.005_260)] border border-[oklch(0.28_0.008_260/0.5)] rounded-3xl p-8 lg:p-12 shadow-xl prose prose-invert max-w-none prose-headings:text-white prose-p:text-[oklch(0.65_0.01_260)] prose-a:text-[oklch(0.65_0.19_35)] prose-pre:bg-[oklch(0.18_0.006_260)] prose-pre:border prose-pre:border-[oklch(0.28_0.008_260/0.8)]">
           <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-brandBlue/10 border border-brandBlue/20 text-brandBlue font-bold text-xs uppercase tracking-wider mb-6">
             v1.0 API Reference
           </div>
           
           <h1 className="text-4xl font-extrabold tracking-tight mb-4">{activeTab}</h1>
           
           {activeTab === 'Getting Started' && (
             <>
               <p className="text-lg">The Re-Gadgets API is organized around REST. Our API has predictable resource-oriented URLs, accepts form-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.</p>
               <h3>Base URL</h3>
               <p>All API requests should be made to the following base URL:</p>
               <pre><code>https://api.re-gadgets.com/v1</code></pre>
               <h3>Quick Start Example</h3>
               <pre><code className="language-bash">{`curl https://api.re-gadgets.com/v1/repairs \\
  -H "Authorization: Bearer YOUR_API_KEY"`}</code></pre>
             </>
           )}

           {activeTab === 'Authentication' && (
             <>
               <p>The Re-Gadgets API uses API keys to authenticate requests. You can view and manage your API keys in the Re-Gadgets Dashboard.</p>
               <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl text-amber-400 text-sm font-semibold mb-6 flex gap-3 items-start">
                  <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                  Your API keys carry many privileges, so be sure to keep them secure! Do not share your secret API keys in publicly accessible areas such as GitHub, client-side code, and so forth.
               </div>
               <p>Authentication to the API is performed via HTTP Bearer Auth. Provide your API key as the bearer token value.</p>
               <pre><code>Authorization: Bearer YOUR_STRIPE_SECRET_KEY</code></pre>
             </>
           )}

           {(activeTab !== 'Getting Started' && activeTab !== 'Authentication') && (
             <>
               <p>This section is currently being documented. Please refer to our OpenAPI specification for complete details on {activeTab.toLowerCase()}.</p>
               <button className="bg-[oklch(0.18_0.006_260)] hover:bg-[oklch(0.65_0.19_35/0.1)] hover:text-[oklch(0.65_0.19_35)] hover:border-[oklch(0.65_0.19_35/0.4)] text-[oklch(0.96_0.005_260)] border border-[oklch(0.28_0.008_260/0.5)] px-5 py-2.5 rounded-xl text-sm font-bold transition-colors mt-4">
                 Download OpenAPI Spec
               </button>
             </>
           )}
         </div>
      </motion.main>
    </div>
  );
};

export default ApiDocs;
