import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Phone } from 'lucide-react';
import { SectionEyebrow, SectionHeadline } from '../ui/DesignSystem';

const TRACKING_MAP = '/images/tracking-map.jpg';

const checklist = [
  'GPS-tracked doorstep pickup & delivery',
  'Turn-by-turn repair progress updates',
  'Direct chat with your assigned technician',
];

const LiveTrackingSection = () => {
  return (
    <section className="py-28 relative bg-[oklch(0.14_0.005_260)] dot-grid-bg overflow-hidden border-t border-[oklch(0.28_0.008_260/0.4)]">
      {/* Ambient */}
      <div
        className="absolute -left-20 top-1/4 w-[40%] h-[60%] rounded-full blur-[150px] pointer-events-none"
        style={{ background: 'oklch(0.65 0.19 35 / 0.06)' }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 items-center">

          {/* ── LEFT: Text content ────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="animate-in-up"
          >
            {/* Success pill */}
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[oklch(0.72_0.17_155/0.1)] border border-[oklch(0.72_0.17_155/0.3)] mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[oklch(0.72_0.17_155)] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[oklch(0.72_0.17_155)]" />
              </span>
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[oklch(0.72_0.17_155)]">
                Live Tracking System
              </span>
            </div>

            <SectionHeadline className="mb-2">
              Follow Your Repair
            </SectionHeadline>
            <SectionHeadline>
              <span className="text-[oklch(0.65_0.19_35)]">Every Step of the Way</span>
            </SectionHeadline>

            <p className="mt-5 text-[oklch(0.65_0.01_260)] font-medium leading-relaxed max-w-lg mb-8">
              From the moment our technician picks up your device to the second it's delivered back, see real-time location and status updates on a live map.
            </p>

            <ul className="space-y-4 mb-10">
              {checklist.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-3 text-[oklch(0.96_0.005_260)] font-medium"
                >
                  <CheckCircle2 className="w-5 h-5 text-[oklch(0.65_0.19_35)] shrink-0" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* ── RIGHT: Map visual ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Ember blur behind the card */}
            <div
              className="absolute -inset-8 rounded-[3rem] blur-[60px] pointer-events-none"
              style={{ background: 'oklch(0.65 0.19 35 / 0.08)' }}
            />

            {/* Map frame */}
            <div className="relative rounded-[2rem] overflow-hidden border border-[oklch(0.28_0.008_260/0.6)] shadow-[0_30px_80px_-20px_oklch(0_0_0/0.7)] bg-[oklch(0.18_0.006_260)]" style={{ aspectRatio: '4/5' }}>
              <img
                src={TRACKING_MAP}
                alt="Live tracking map"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.14_0.005_260/0.85)] via-transparent to-transparent" />

              {/* "Satellite link active" pill */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-[oklch(0.14_0.005_260/0.75)] backdrop-blur-xl border border-[oklch(0.28_0.008_260/0.5)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[oklch(0.72_0.17_155)] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[oklch(0.72_0.17_155)]" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[oklch(0.96_0.005_260)]">Satellite link active</span>
              </div>

              {/* Bottom overlay card */}
              <div className="absolute bottom-4 inset-x-4 rounded-2xl bg-[oklch(0.14_0.005_260/0.85)] backdrop-blur-xl border border-[oklch(0.28_0.008_260/0.5)] p-4">
                {/* Technician row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100&h=100&fit=crop"
                        alt="David Lee"
                        className="w-12 h-12 rounded-full object-cover border-2 border-[oklch(0.65_0.19_35/0.5)]"
                      />
                      <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[oklch(0.72_0.17_155)] border-2 border-[oklch(0.14_0.005_260)]" />
                    </div>
                    <div>
                      <p className="font-display font-bold text-sm text-[oklch(0.96_0.005_260)]">David Lee</p>
                      <p className="font-mono text-[10px] uppercase tracking-wider text-[oklch(0.65_0.19_35)]">Arriving in 12 mins</p>
                    </div>
                  </div>
                  <button className="w-9 h-9 rounded-full bg-[oklch(0.65_0.19_35/0.15)] border border-[oklch(0.65_0.19_35/0.4)] flex items-center justify-center text-[oklch(0.65_0.19_35)] hover:bg-[oklch(0.65_0.19_35)] hover:text-[oklch(0.98_0_0)] transition-all">
                    <Phone className="w-4 h-4" />
                  </button>
                </div>

                {/* 3-step progress */}
                <div className="flex items-center gap-2">
                  {/* Picked up */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-6 h-6 rounded-full bg-[oklch(0.65_0.19_35)] flex items-center justify-center shadow-[0_0_10px_oklch(0.65_0.19_35/0.6)]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[oklch(0.98_0_0)]" />
                    </div>
                    <span className="font-mono text-[8px] font-bold uppercase tracking-wide text-[oklch(0.65_0.19_35)]">Picked up</span>
                  </div>
                  {/* Line */}
                  <div className="flex-1 h-0.5 bg-[oklch(0.65_0.19_35)]" />
                  {/* In transit */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="relative w-6 h-6 rounded-full bg-[oklch(0.65_0.19_35/0.2)] border-2 border-[oklch(0.65_0.19_35)] flex items-center justify-center shadow-[0_0_10px_oklch(0.65_0.19_35/0.5)]">
                      <span className="w-2 h-2 rounded-full bg-[oklch(0.65_0.19_35)] animate-pulse" />
                    </div>
                    <span className="font-mono text-[8px] font-bold uppercase tracking-wide text-[oklch(0.65_0.19_35)]">In transit</span>
                  </div>
                  {/* Line */}
                  <div className="flex-1 h-0.5 bg-[oklch(0.28_0.008_260/0.6)]" />
                  {/* Delivered */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-6 h-6 rounded-full bg-[oklch(0.22_0.006_260)] border border-[oklch(0.28_0.008_260/0.6)] flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-[oklch(0.28_0.008_260/0.8)]" />
                    </div>
                    <span className="font-mono text-[8px] font-bold uppercase tracking-wide text-[oklch(0.65_0.01_260)]">Delivered</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LiveTrackingSection;
