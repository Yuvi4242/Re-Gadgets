import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight, ChevronDown, Smartphone, Laptop, Watch, Battery } from 'lucide-react';
import { Link } from 'react-router-dom';

const pricingData = [
  {
    category: 'Smartphones',
    icon: Smartphone,
    repairs: [
      { name: 'Screen Replacement', price: '$89 - $299', time: '45 mins' },
      { name: 'Battery Replacement', price: '$49 - $99', time: '30 mins' },
      { name: 'Water Damage Diagnostics', price: '$49', time: '24 hrs' },
    ]
  },
  {
    category: 'Laptops',
    icon: Laptop,
    repairs: [
      { name: 'Screen Replacement', price: '$149 - $499', time: '1-2 Days' },
      { name: 'Battery Replacement', price: '$89 - $149', time: '1 Day' },
      { name: 'Keyboard/Trackpad', price: '$99 - $199', time: '1-2 Days' },
    ]
  },
  {
    category: 'Wearables',
    icon: Watch,
    repairs: [
      { name: 'Screen Replacement', price: '$79 - $199', time: '1 Day' },
      { name: 'Battery Replacement', price: '$49 - $89', time: '1 Day' },
    ]
  }
];

const faqs = [
  { q: "Do you offer a warranty on repairs?", a: "Yes, all our repairs come with a standard 90-day warranty covering parts and labor." },
  { q: "Do I need to pay upfront?", a: "No, you only pay after the repair is completed and you have verified the device is working." },
  { q: "Are your parts original?", a: "We offer both OEM (original) and high-quality aftermarket parts. You can choose based on your budget during booking." },
];

const Pricing = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative isolate">
      <div className="absolute top-0 right-[10%] w-[500px] h-[500px] bg-[oklch(0.65_0.19_35/0.1)] blur-[150px] -z-10 rounded-full pointer-events-none"></div>

      <motion.div 
         initial={{ opacity: 0, y: -20 }}
         animate={{ opacity: 1, y: 0 }}
         className="mb-16 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-[oklch(0.96_0.005_260)] tracking-tight">Transparent Pricing</h1>
        <p className="text-[oklch(0.65_0.01_260)] font-medium mt-4 text-lg max-w-2xl mx-auto">No hidden fees, no surprises. See our estimated repair costs across various device categories.</p>
      </motion.div>

      <div className="space-y-12 mb-20">
        {pricingData.map((category, idx) => {
          const Icon = category.icon;
          return (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[oklch(0.12_0.005_260)] border border-[oklch(0.28_0.008_260/0.5)] rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="bg-[oklch(0.18_0.006_260)] px-6 py-4 flex items-center gap-3 border-b border-[oklch(0.28_0.008_260/0.5)]">
                <Icon className="w-5 h-5 text-[oklch(0.65_0.19_35)]" />
                <h3 className="font-bold text-lg text-white">{category.category}</h3>
              </div>
              <div className="divide-y divide-[oklch(0.28_0.008_260/0.3)]">
                {category.repairs.map((repair, rIdx) => (
                  <div key={rIdx} className="px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[oklch(0.14_0.005_260/0.5)] transition-colors">
                    <div>
                      <p className="font-bold text-[oklch(0.96_0.005_260)]">{repair.name}</p>
                      <p className="text-sm text-[oklch(0.65_0.01_260)] mt-1">Est. Turnaround: {repair.time}</p>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                      <p className="text-lg font-black text-white">{repair.price}</p>
                      <Link to="/book" className="bg-[oklch(0.65_0.19_35/0.1)] hover:bg-[oklch(0.65_0.19_35/0.2)] text-[oklch(0.65_0.19_35)] border border-[oklch(0.65_0.19_35/0.3)] px-4 py-2 rounded-xl text-sm font-bold transition-colors">
                        Book Now
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>

      <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 0.5 }}
         className="max-w-3xl mx-auto"
      >
        <h2 className="text-2xl font-extrabold text-[oklch(0.96_0.005_260)] mb-6 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-[oklch(0.12_0.005_260)] border border-[oklch(0.28_0.008_260/0.5)] rounded-2xl overflow-hidden">
              <button 
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="font-bold text-[oklch(0.96_0.005_260)]">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-[oklch(0.65_0.01_260)] transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {activeFaq === idx && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-5 text-[oklch(0.65_0.01_260)] leading-relaxed"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Pricing;
