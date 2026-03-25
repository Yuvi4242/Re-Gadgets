import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Facebook, Twitter, Instagram, Linkedin, Mail, Zap } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <footer className="relative bg-[#020617] text-slate-300 overflow-hidden pt-32 pb-8 z-10 border-t border-white/5">
      {/* Background Effects */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brandBlue/50 to-transparent opacity-50"></div>
      <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-brandBlue/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[0%] right-[-10%] w-[40%] h-[50%] bg-brandPurple/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgMGg0MHY0MEgwem0zOSAzOXYtMzhIMXYzOGgzOHptLTEgMHYtMzZIMnYzNmgzNnoiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMikiLz4KPC9zdmc+')] opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Section (Call-to-Action) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative rounded-3xl p-8 md:p-12 mb-20 overflow-hidden border border-white/10 glass-dark shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] bg-gradient-to-br from-slate-900/90 to-[#0B0F19]/90 backdrop-blur-xl"
        >
          {/* CTA Background Gradients */}
          <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-brandBlue/20 to-transparent opacity-50 -z-10"></div>
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-brandPurple/40 blur-[80px] rounded-full -z-10"></div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div className="max-w-xl text-center md:text-left">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight flex items-center justify-center md:justify-start gap-2">
                Need a quick repair? <Zap className="w-8 h-8 text-amber-400 animate-pulse fill-amber-400/20" />
              </h3>
              <p className="text-slate-400 text-lg">Fast, reliable, and doorstep gadget repair tailored for you.</p>
            </div>
            
            <Link to="/book">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-gradient-to-r from-brandBlue to-brandPurple text-white rounded-full font-bold text-lg shadow-[0_0_30px_-5px_var(--color-brandBlue)] hover:shadow-[0_0_40px_0px_var(--color-brandPurple)] transition-all duration-300 flex items-center gap-3 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                <span className="relative z-10">Book a Repair</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16"
        >
          {/* Column 1: Brand */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <Link to="/" className="inline-block mb-6 group">
              <h2 className="text-2xl font-extrabold tracking-tighter text-white flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brandBlue to-brandPurple flex items-center justify-center shadow-lg shadow-brandPurple/20 group-hover:shadow-brandBlue/40 transition-all duration-300">
                  <span className="text-white font-black text-lg">R</span>
                </div>
                Re-Gadgets
              </h2>
            </Link>
            <p className="text-slate-400 font-medium leading-relaxed mb-6">
              Doorstep repair services for all your electronic gadgets. Fast, reliable, and trusted by thousands.
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: Twitter, href: '#' },
                { icon: Facebook, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/yuvi42/' },
              ].map((social, index) => (
                <motion.a 
                  key={index}
                  href={social.href} 
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-brandBlue/20 hover:text-brandBlue hover:border-brandBlue/30 transition-colors shadow-sm"
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Services */}
          <motion.div variants={itemVariants} className="lg:col-span-2 lg:col-start-5">
            <h4 className="text-white font-bold mb-5 tracking-wide text-sm uppercase">Services</h4>
            <ul className="space-y-3">
              {['Mobile Repair', 'Laptop Repair', 'TV Repair', 'Appliance Repair'].map((item, i) => (
                <li key={i}>
                  <Link to="/book" className="text-slate-400 hover:text-white font-medium text-sm flex items-center gap-2 group transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-brandBlue opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span className="group-hover:translate-x-1 transition-transform">{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Company */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h4 className="text-white font-bold mb-5 tracking-wide text-sm uppercase">Company</h4>
            <ul className="space-y-3">
              {['About Us', 'Careers', 'Blog', 'Contact'].map((item, i) => (
                <li key={i}>
                  <Link to="#" className="text-slate-400 hover:text-white font-medium text-sm flex items-center gap-2 group transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-brandPurple opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span className="group-hover:translate-x-1 transition-transform">{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Support */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h4 className="text-white font-bold mb-5 tracking-wide text-sm uppercase">Support</h4>
            <ul className="space-y-3">
              {['Help Center', 'Terms & Conditions', 'Privacy Policy', 'FAQs'].map((item, i) => (
                <li key={i}>
                  <Link to="#" className="text-slate-400 hover:text-white font-medium text-sm flex items-center gap-2 group transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span className="group-hover:translate-x-1 transition-transform">{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 5: Newsletter */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <h4 className="text-white font-bold mb-5 tracking-wide text-sm uppercase">Subscribe</h4>
            <p className="text-slate-400 text-sm mb-4 leading-relaxed">
              Get the latest updates, tips, and exclusive offers straight to your inbox.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); setEmail(''); }} className="relative group">
              <div className={`absolute -inset-0.5 rounded-xl bg-gradient-to-r from-brandBlue to-brandPurple opacity-0 blur transition duration-300 ${isFocused ? 'opacity-30' : 'group-hover:opacity-20'}`}></div>
              <div className="relative flex items-center h-12 rounded-xl bg-[#0F172A] border border-white/10 overflow-hidden focus-within:border-brandPurple/50 transition-colors shadow-inner">
                <div className="pl-3 text-slate-500">
                  <Mail className="w-5 h-5" />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Enter your email" 
                  className="w-full bg-transparent border-none text-white text-sm focus:outline-none focus:ring-0 px-3 py-2 placeholder-slate-500"
                  required
                />
                <button 
                  type="submit" 
                  className="h-full px-4 bg-brandBlue hover:bg-brandPurple text-white text-sm font-bold transition-colors flex items-center justify-center"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 mt-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm font-medium">
            © 2026 Re-Gadgets. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="#" className="text-slate-500 hover:text-slate-300 text-sm font-medium transition-colors">Privacy</Link>
            <div className="w-1 h-1 rounded-full bg-white/20"></div>
            <Link to="#" className="text-slate-500 hover:text-slate-300 text-sm font-medium transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
