import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, CheckCircle } from 'lucide-react';

const TrustSection = () => {
  const reviews = [
    { name: 'Sarah Jenkins', role: 'Verified Customer', text: 'Absolutely incredible service. My MacBook screen was replaced within 2 hours at my home.', rating: 5, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
    { name: 'Michael Chen', role: 'Verified Customer', text: 'The tracking feature is a game-changer. I knew exactly when the technician would arrive.', rating: 5, avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop' },
    { name: 'Emily Rodriguez', role: 'Verified Customer', text: 'Transparent pricing, no hidden fees. The tech was highly professional and fixed my TV fast.', rating: 5, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' }
  ];

  return (
    <section className="py-24 relative bg-[#0b1326] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <h2 className="text-4xl font-extrabold text-white tracking-tight mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-slate-400 font-medium text-lg leading-relaxed">
              Don't just take our word for it. Join the community of users who have experienced the future of device repair.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-black text-white">4.9</span>
              <div className="flex text-amber-500 my-1"><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/></div>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Overall Rating</span>
            </div>
            <div className="w-px h-12 bg-white/10"></div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-black text-white flex items-center gap-1"><ShieldCheck className="w-6 h-6 text-emerald-400" /> 100%</span>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Verified Pros</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-8 rounded-[2rem] bg-slate-900/40 border border-white/5 shadow-2xl backdrop-blur-md hover:-translate-y-2 transition-transform duration-300 group"
            >
              <div className="flex items-center gap-4 mb-6">
                <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full border border-slate-700 object-cover" />
                <div>
                  <div className="text-white font-bold">{review.name}</div>
                  <div className="flex items-center text-xs text-emerald-400 font-semibold gap-1">
                    <CheckCircle className="w-3 h-3" /> {review.role}
                  </div>
                </div>
              </div>
              <p className="text-slate-400 font-medium leading-relaxed italic">
                "{review.text}"
              </p>
              <div className="mt-6 flex text-amber-500 opacity-80 group-hover:opacity-100 transition-opacity">
                {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
