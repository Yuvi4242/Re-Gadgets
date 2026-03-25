import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-20 relative bg-[#060e20]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[3rem] p-10 md:p-16 overflow-hidden bg-gradient-to-br from-[#121c33] to-[#0b1326] border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]"
        >
          {/* Internal Glows */}
          <div className="absolute top-0 right-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgMGg0MHY0MEgwem0zOSAzOXYtMzhIMXYzOGgzOHptLTEgMHYtMzZIMnYzNmgzNnoiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMikiLz4KPC9zdmc+')] opacity-50 z-0"></div>
          <div className="absolute -top-[50%] -left-[20%] w-[80%] h-[150%] bg-brandBlue/20 blur-[130px] rounded-full mix-blend-screen pointer-events-none"></div>
          <div className="absolute -bottom-[50%] -right-[20%] w-[80%] h-[150%] bg-brandPurple/20 blur-[130px] rounded-full mix-blend-screen pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="text-center md:text-left flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white font-bold text-xs uppercase tracking-wider mb-6">
                <Sparkles className="w-4 h-4 text-amber-400" /> Fast Service
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
                Need urgent repair?
              </h2>
              <p className="text-slate-400 font-medium text-lg leading-relaxed max-w-md mx-auto md:mx-0">
                Book now and a verified master technician will be at your doorstep within the hour.
              </p>
            </div>
            
            <div className="flex-shrink-0">
              <Link to="/book">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 bg-gradient-to-r from-brandBlue to-brandPurple text-white rounded-full font-bold text-xl shadow-[0_0_40px_-5px_var(--color-brandBlue)] hover:shadow-[0_0_60px_0px_var(--color-brandPurple)] transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                  <span className="relative z-10">Book a Repair</span>
                  <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
