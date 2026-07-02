import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Cpu, Zap } from 'lucide-react';
import { SectionEyebrow, SectionHeadline } from '../ui/DesignSystem';

const features = [
  {
    title: 'Scan & Diagnose',
    desc: 'Upload a clear photo of your damaged gadget. Our AI engine instantly identifies the make, model, and physical damage pattern.',
    icon: Camera,
    style: 'outlined', // ember outlined
  },
  {
    title: 'Smart Pricing Estimate',
    desc: 'Get an immediate, transparent cost breakdown based on real-time parts availability and historical repair data in your area.',
    icon: Cpu,
    style: 'filled', // amber filled — breaks pattern
  },
  {
    title: 'Algorithmic Matching',
    desc: 'Matched with the highest-rated certified technician for your exact issue within milliseconds using our routing engine.',
    icon: Zap,
    style: 'neutral', // neutral outlined
  },
];

const AIFeaturesSection = () => {
  return (
    <section className="py-32 relative bg-[oklch(0.14_0.005_260)] dot-grid-bg overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-[100%] blur-[120px] pointer-events-none"
        style={{ background: 'oklch(0.65 0.19 35 / 0.05)' }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 animate-in-up"
        >
          <SectionEyebrow color="ember">Intelligence Inside</SectionEyebrow>
          <SectionHeadline>
            AI-Powered{' '}
            <span className="text-[oklch(0.65_0.01_260)] font-normal italic">Smart Repair</span>
          </SectionHeadline>
          <p className="mt-4 text-[oklch(0.65_0.01_260)] max-w-2xl font-medium leading-relaxed">
            We got rid of the phone calls, quotes, and waiting. Point your camera at the problem, and our AI handles the rest — instantly.
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            const isFilled  = feat.style === 'filled';
            const isOutlined = feat.style === 'outlined';

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ y: -6, transition: { type: 'spring', stiffness: 350, damping: 20 } }}
                className="relative group h-72 rounded-3xl overflow-hidden"
              >
                {/* Border glow on hover */}
                <div className="absolute -inset-[1px] rounded-3xl transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                  style={{ background: isOutlined
                    ? 'linear-gradient(135deg, oklch(0.65 0.19 35 / 0.5), transparent)'
                    : isFilled
                    ? 'linear-gradient(135deg, oklch(0.78 0.16 75 / 0.5), transparent)'
                    : 'linear-gradient(135deg, oklch(0.65 0.01 260 / 0.3), transparent)'
                  }}
                />

                {/* Card body */}
                <div className="relative h-full bg-[oklch(0.18_0.006_260)] border border-[oklch(0.28_0.008_260/0.6)] rounded-3xl p-8 flex flex-col overflow-hidden group-hover:border-[oklch(0.65_0.19_35/0.35)] transition-all duration-300">
                  {/* Internal hover glow */}
                  <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: isOutlined
                      ? 'oklch(0.65 0.19 35 / 0.07)'
                      : isFilled
                      ? 'oklch(0.78 0.16 75 / 0.1)'
                      : 'oklch(0.65 0.01 260 / 0.05)'
                    }}
                  />

                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-auto shadow-lg transition-transform duration-300 group-hover:scale-110 ${
                    isFilled
                      ? 'bg-[oklch(0.78_0.16_75)] shadow-[0_0_20px_oklch(0.78_0.16_75/0.4)]'
                      : 'bg-[oklch(0.22_0.006_260)] border border-[oklch(0.28_0.008_260/0.7)]'
                  }`}>
                    <Icon className={`w-7 h-7 ${
                      isFilled
                        ? 'text-[oklch(0.15_0.02_60)]'
                        : isOutlined
                        ? 'text-[oklch(0.65_0.19_35)]'
                        : 'text-[oklch(0.65_0.01_260)]'
                    }`} />
                  </div>

                  <div className="mt-6">
                    <h3 className="font-display font-bold text-xl text-[oklch(0.96_0.005_260)] mb-3 tracking-tight">
                      {feat.title}
                    </h3>
                    <p className="text-sm text-[oklch(0.65_0.01_260)] leading-relaxed font-medium">
                      {feat.desc}
                    </p>
                  </div>
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
