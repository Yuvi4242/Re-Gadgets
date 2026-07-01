import React from 'react';
import { motion } from 'framer-motion';
import { CalendarCheck, Truck, Wrench, CheckCircle2 } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    { num: '01', title: 'Book Service', desc: 'Select your device issue and schedule a pickup time.', icon: CalendarCheck, color: 'text-[var(--color-ember-light)]' },
    { num: '02', title: 'Pickup or Drop', desc: 'A verified tech picks up your device, or you visit a shop.', icon: Truck, color: 'text-[var(--color-ember-dark)]' },
    { num: '03', title: 'Repair Process', desc: 'Real-time updates as your device is being fixed.', icon: Wrench, color: 'text-[var(--color-ember-light)]' },
    { num: '04', title: 'Delivery', desc: 'Your gadget is returned to you, working perfectly.', icon: CheckCircle2, color: 'text-[var(--color-ember-dark)]' }
  ];

  return (
    <section className="py-24 relative bg-[var(--bg-primary)] bg-film-grain bg-dot-grid">
      <div className="max-w-7xl mx-auto px-8 lg:px-12 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold text-[var(--text-primary)] tracking-tight mb-4"
          >
            How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-ember-light)] to-[var(--color-ember-dark)]">Works</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[var(--text-secondary)] font-medium text-lg leading-relaxed"
          >
            Four simple steps to get your devices running like new again. No hassle, completely transparent.
          </motion.p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-[4.5rem] left-[10%] right-[10%] h-0.5 bg-[var(--color-noir-surface-high)] rounded-full">
            <motion.div 
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
              className="h-full bg-gradient-to-r from-[var(--color-ember-light)] to-[var(--color-ember-dark)] shadow-[0_0_10px_rgba(245,166,35,0.5)]"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.2 }}
                  className="relative flex flex-col items-center text-center group"
                >
                  {/* Step Number Badge */}
                  <div className="text-6xl font-black text-white/5 absolute top-[-2rem] left-1/2 -translate-x-1/2 -z-10 group-hover:text-[var(--color-ember-light)]/10 transition-colors duration-500 select-none">
                    {step.num}
                  </div>
                  
                  {/* Icon Circle */}
                  <div className="w-20 h-20 rounded-[1.5rem] bg-[var(--color-noir-surface)] border border-[var(--border-primary)] flex items-center justify-center shadow-xl relative mb-6 group-hover:-translate-y-2 transition-transform duration-300 z-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-ember-light)] to-[var(--color-ember-dark)] opacity-0 group-hover:opacity-20 rounded-[1.5rem] transition-opacity duration-300" />
                    <Icon className={`w-8 h-8 ${step.color}`} />
                  </div>
                  
                  <h4 className="text-xl font-bold text-[var(--text-primary)] mb-3">{step.title}</h4>
                  <p className="text-sm font-medium text-[var(--text-secondary)] leading-relaxed max-w-[200px] mb-4">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
