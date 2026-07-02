import React from 'react';
import { motion } from 'framer-motion';
import { CalendarCheck, Truck, Wrench, CheckCircle2 } from 'lucide-react';
import { SectionHeadline } from '../ui/DesignSystem';

const steps = [
  { num: '01', title: 'Book Service',     desc: 'Select your device issue and schedule a pickup time that works for you.', icon: CalendarCheck },
  { num: '02', title: 'Pickup or Drop',   desc: 'A verified technician picks up your device, or you visit a certified shop.', icon: Truck },
  { num: '03', title: 'Repair Process',   desc: 'Real-time updates and AI diagnostics as your device is expertly fixed.', icon: Wrench },
  { num: '04', title: 'Delivery',         desc: 'Your gadget is returned to you, fully tested and working perfectly.', icon: CheckCircle2 },
];

const HowItWorksSection = () => {
  return (
    <section className="py-28 relative bg-[oklch(0.14_0.005_260)] dot-grid-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 relative z-10">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 max-w-2xl animate-in-up"
        >
          <SectionHeadline>
            How It{' '}
            <em className="text-[oklch(0.65_0.19_35)] not-italic font-extrabold">Works</em>
          </SectionHeadline>
          <p className="mt-4 text-[oklch(0.65_0.01_260)] font-medium leading-relaxed">
            Four simple steps to get your devices running like new. No hassle, fully transparent.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                whileHover={{ y: -5, transition: { type: 'spring', stiffness: 350, damping: 22 } }}
                className="relative group rounded-3xl bg-[oklch(0.18_0.006_260)] border border-[oklch(0.28_0.008_260/0.6)] p-7 overflow-hidden hover:border-[oklch(0.65_0.19_35/0.35)] hover:shadow-[0_0_25px_oklch(0.65_0.19_35/0.12)] transition-all duration-300"
              >
                {/* Giant faded step number — top right */}
                <span className="absolute top-4 right-4 font-display font-black text-6xl leading-none select-none text-[oklch(0.65_0.19_35/0.12)] group-hover:text-[oklch(0.65_0.19_35/0.18)] transition-colors duration-300">
                  {step.num}
                </span>

                {/* Icon tile — top left, ember */}
                <div className="w-12 h-12 rounded-2xl bg-[oklch(0.65_0.19_35/0.12)] border border-[oklch(0.65_0.19_35/0.3)] flex items-center justify-center mb-16 shadow-[0_0_15px_oklch(0.65_0.19_35/0.1)] group-hover:bg-[oklch(0.65_0.19_35/0.2)] transition-colors duration-300">
                  <Icon className="w-5 h-5 text-[oklch(0.65_0.19_35)]" />
                </div>

                <h4 className="font-display font-bold text-lg text-[oklch(0.96_0.005_260)] mb-2">
                  {step.title}
                </h4>
                <p className="text-sm text-[oklch(0.65_0.01_260)] leading-relaxed font-medium">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
