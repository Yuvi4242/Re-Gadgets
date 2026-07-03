import React from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Award, MapPin } from 'lucide-react';

const stats = [
  { label: 'Customers Served', value: '12k+', icon: Users },
  { label: 'Repairs Completed', value: '15k+', icon: TrendingUp },
  { label: 'Certified Technicians', value: '140+', icon: Award },
  { label: 'Cities Covered', value: '25+', icon: MapPin },
];

const team = [
  { name: 'Sarah Jenkins', role: 'CEO & Founder', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=250&h=250&fit=crop' },
  { name: 'Marcus Chen', role: 'Head of Operations', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=250&h=250&fit=crop' },
  { name: 'Elena Rodriguez', role: 'Lead Technician', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=250&h=250&fit=crop' },
];

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative isolate">
      {/* Background glow orb */}
      <div className="absolute top-20 left-[10%] w-[500px] h-[500px] bg-[oklch(0.65_0.19_35/0.05)] blur-[150px] -z-10 rounded-full pointer-events-none"></div>

      <motion.div 
         initial={{ opacity: 0, y: -20 }}
         animate={{ opacity: 1, y: 0 }}
         className="mb-20 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-[oklch(0.96_0.005_260)] tracking-tight">Our Mission</h1>
        <p className="text-[oklch(0.65_0.01_260)] font-medium mt-6 text-xl max-w-3xl mx-auto leading-relaxed">
          We believe that fixing your devices shouldn't be a hassle. Re-Gadgets is on a mission to bring transparent, high-quality, and AI-powered repairs directly to your doorstep.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[oklch(0.12_0.005_260)] border border-[oklch(0.28_0.008_260/0.5)] rounded-3xl p-6 text-center shadow-lg"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[oklch(0.65_0.19_35/0.1)] text-[oklch(0.65_0.19_35)] mb-4">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-black text-white tracking-tight">{stat.value}</h3>
              <p className="text-sm text-[oklch(0.65_0.01_260)] font-semibold uppercase tracking-wider mt-2">{stat.label}</p>
            </motion.div>
          )
        })}
      </div>

      {/* Story Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
        <motion.div 
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.2 }}
           className="relative"
        >
          <div className="aspect-square rounded-[3rem] overflow-hidden border border-[oklch(0.28_0.008_260/0.5)] shadow-2xl relative">
             <div className="absolute inset-0 bg-[oklch(0.65_0.19_35/0.1)] mix-blend-overlay z-10"></div>
             <img src="https://images.unsplash.com/photo-1581092918056-0c4c3acd37be?w=800&q=80" alt="Technician working" className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700" />
          </div>
          <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-[oklch(0.18_0.006_260)] rounded-3xl border border-[oklch(0.28_0.008_260/0.5)] p-6 flex flex-col justify-center items-center shadow-2xl z-20">
             <p className="text-4xl font-black text-[oklch(0.65_0.19_35)]">24h</p>
             <p className="text-xs text-[oklch(0.65_0.01_260)] font-bold text-center mt-1 uppercase">Avg. Repair Time</p>
          </div>
        </motion.div>
        
        <motion.div 
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.3 }}
        >
          <h2 className="text-3xl font-extrabold text-[oklch(0.96_0.005_260)] mb-6">Built for the Modern World</h2>
          <div className="space-y-4 text-[oklch(0.65_0.01_260)] leading-relaxed">
            <p>
              Started in 2024, Re-Gadgets was born out of frustration with traditional repair shops: the lack of transparency, long wait times, and unpredictable pricing.
            </p>
            <p>
              By leveraging AI to pre-diagnose issues and a network of certified mobile technicians, we've created a platform that treats your time and devices with the respect they deserve.
            </p>
            <p>
              We partner with local shop owners and freelance experts, empowering them with our tools while providing customers with a seamless, Uber-like tracking experience for their repairs.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Team Section */}
      <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.4 }}
      >
        <h2 className="text-3xl font-extrabold text-[oklch(0.96_0.005_260)] mb-12 text-center">Meet the Leadership</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <div key={idx} className="bg-[oklch(0.12_0.005_260)] border border-[oklch(0.28_0.008_260/0.5)] rounded-3xl overflow-hidden group">
              <div className="h-64 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.12_0.005_260)] to-transparent z-10"></div>
                <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 relative z-20 -mt-12 text-center">
                <h3 className="text-xl font-bold text-white">{member.name}</h3>
                <p className="text-sm text-[oklch(0.65_0.19_35)] font-bold uppercase tracking-wider mt-1">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

    </div>
  );
};

export default About;
