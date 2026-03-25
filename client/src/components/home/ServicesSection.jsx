import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Laptop, Tv, Wind, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServicesSection = () => {
  const categories = [
    { title: 'Mobile Repair', desc: 'Screen, Battery, Speaker, and Motherboard diagnostics.', icon: Smartphone, color: 'from-blue-500 to-cyan-400', shadow: 'shadow-blue-500/20' },
    { title: 'Laptop Repair', desc: 'Hard Drive, OS, Keyboard, and premium hardware fixes.', icon: Laptop, color: 'from-purple-500 to-indigo-500', shadow: 'shadow-purple-500/20' },
    { title: 'Home TV Repair', desc: 'Display panel replacement and advanced sound fixes.', icon: Tv, color: 'from-pink-500 to-rose-400', shadow: 'shadow-pink-500/20' },
    { title: 'Appliance Repair', desc: 'AC cooling issues, refrigerators, and smart home appliances.', icon: Wind, color: 'from-orange-400 to-amber-500', shadow: 'shadow-orange-500/20' },
  ];

  return (
    <section className="py-24 relative bg-[#0b1326] z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
              Expert Repairs for <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandBlue to-brandPurple">Every Device</span>
            </h2>
            <p className="text-slate-400 font-medium text-lg leading-relaxed">
              From flagship smartphones to smart home appliances. We handle it all with certified parts and verified professionals.
            </p>
          </div>
          <Link to="/book">
            <motion.button 
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-full border border-white/10 bg-white/5 text-white font-bold text-sm tracking-wide hover:bg-brandBlue/20 hover:border-brandBlue/50 hover:text-brandBlue transition-all flex items-center gap-2 group"
            >
              View All Services
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link to="/book" className="group block h-full">
                  <div className="p-8 rounded-[2rem] bg-[#121c33] border border-white/5 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 relative overflow-hidden h-full flex flex-col hover:border-white/10">
                    {/* Background glow hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brandBlue to-brandPurple opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"></div>
                    
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-white mb-8 shadow-lg ${category.shadow} group-hover:scale-110 transition-transform duration-500 ease-out`}>
                      <Icon className="w-8 h-8" strokeWidth={2.5} />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-brandBlue transition-colors">{category.title}</h3>
                    <p className="text-slate-400 font-medium text-sm leading-relaxed mb-6 flex-1">{category.desc}</p>
                    
                    <div className="mt-auto flex items-center text-brandBlue font-bold text-sm opacity-50 group-hover:opacity-100 transition-opacity">
                      Book Now <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
