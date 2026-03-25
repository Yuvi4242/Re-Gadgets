import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Cpu, Zap } from 'lucide-react';

const AIFeaturesSection = () => {
  const steps = [
    {
      title: 'Scan & Diagnose',
      desc: 'Upload a clear photo of your damaged gadget. Our proprietary AI engine instantly identifies the make, model, and physical damage.',
      icon: Camera,
      gradient: 'from-blue-500 via-cyan-400 to-teal-400'
    },
    {
      title: 'Smart Pricing Estimate',
      desc: 'Get an immediate, transparent cost breakdown based on real-time parts availability and historical repair data in your area.',
      icon: Cpu,
      gradient: 'from-purple-500 via-fuchsia-500 to-pink-500'
    },
    {
      title: 'Algorithmic Matching',
      desc: 'Matches you with the highest-rated technician specifically certified for your exact device issue within milliseconds.',
      icon: Zap,
      gradient: 'from-emerald-400 via-emerald-500 to-green-600'
    }
  ];

  return (
    <section className="py-32 relative bg-[#020617] overflow-hidden">
      {/* Background aesthetics */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brandBlue/5 blur-[120px] rounded-[100%] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-brandPurple font-bold text-sm tracking-wide mb-6"
          >
            INTELLIGENCE INSIDE
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6"
          >
            AI-Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandPurple to-blue-400">Smart Repair</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-400 font-medium leading-relaxed"
          >
            We got rid of the phone calls, quotes, and waiting. Point your camera at the problem, and our smart engine handles the rest—instantly.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative group rounded-3xl"
              >
                {/* Animated Gradient Border Layer */}
                <div className={`absolute -inset-[2px] rounded-[1.5rem] bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-700 ease-in-out`} />
                <div className={`absolute -inset-[1px] rounded-3xl bg-gradient-to-br ${step.gradient} opacity-20 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Card Content layer */}
                <div className="relative h-full bg-[#0b1326] rounded-3xl p-8 sm:p-10 z-10 overflow-hidden flex flex-col">
                  {/* Internal Glow on Hover */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${step.gradient} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500`} />

                  <div className="mb-8 relative">
                    <div className="w-16 h-16 rounded-2xl bg-slate-800/80 border border-white/5 flex items-center justify-center shadow-lg relative overflow-hidden group-hover:scale-110 transition-transform duration-500">
                      <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                      <Icon className="w-8 h-8 text-white relative z-10" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{step.title}</h3>
                  <p className="text-slate-400 leading-relaxed font-medium text-sm flex-1">{step.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AIFeaturesSection;
