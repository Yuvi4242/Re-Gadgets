import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquare, ShieldCheck, CornerDownRight } from 'lucide-react';

const dummyReviews = [
  { id: 1, customer: 'Alex Johnson', avatar: 'A', rating: 5, date: '2 days ago', device: 'iPhone 13', technician: 'Sarah Jenkins', sentiment: 'POSITIVE', text: 'Fastest repair ever! My phone looks completely brand new. Sarah was extremely helpful.', reply: '' },
  { id: 2, customer: 'Marcus Lee', avatar: 'M', rating: 3, date: '1 week ago', device: 'MacBook Air M1', technician: 'Mike Ross', sentiment: 'NEUTRAL', text: 'Repair was fine but took an extra day. Communication could have been better regarding the delay.', reply: 'Hi Marcus, apologies for the delay. We had a parts shortage that day. We will do better next time!' },
  { id: 3, customer: 'Samantha White', avatar: 'S', rating: 1, date: '2 weeks ago', device: 'Galaxy S22', technician: 'Emily Davis', sentiment: 'NEGATIVE', text: 'The new battery drains just as fast as the old one. Very disappointed.', reply: '' },
  { id: 4, customer: 'David Kim', avatar: 'D', rating: 5, date: '1 month ago', device: 'iPad Pro 12.9', technician: 'Sarah Jenkins', sentiment: 'POSITIVE', text: 'Excellent service. The screen replacement was flawless.', reply: '' }
];

const distribution = [
  { stars: 5, count: 142, percentage: 75 },
  { stars: 4, count: 28, percentage: 15 },
  { stars: 3, count: 12, percentage: 6 },
  { stars: 2, count: 5, percentage: 3 },
  { stars: 1, count: 2, percentage: 1 },
];

const filters = ['All', '5★', '4★', '3★ and below', 'Unreplied'];

export default function ReviewsPanel() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [replyText, setReplyText] = useState<{ [key: number]: string }>({});
  const [reviews, setReviews] = useState(dummyReviews);

  const handleReplySubmit = (id: number) => {
    if (!replyText[id]) return;
    setReviews(reviews.map(r => r.id === id ? { ...r, reply: replyText[id] } : r));
    setReplyText({ ...replyText, [id]: '' });
  };

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case 'POSITIVE': return <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">Positive</span>;
      case 'NEUTRAL': return <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">Neutral</span>;
      case 'NEGATIVE': return <span className="bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">Negative</span>;
      default: return null;
    }
  };

  const filteredReviews = reviews.filter(r => {
    if (activeFilter === '5★') return r.rating === 5;
    if (activeFilter === '4★') return r.rating === 4;
    if (activeFilter === '3★ and below') return r.rating <= 3;
    if (activeFilter === 'Unreplied') return !r.reply;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Overall Rating Summary */}
        <div className="lg:col-span-1 bg-[#0a0a1a]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 lg:p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-white mb-6">Overall Rating</h2>
            <div className="flex items-end gap-3 mb-8">
              <span className="text-6xl font-black text-white leading-none">4.7</span>
              <div className="pb-1">
                 <div className="flex text-amber-400 mb-1">
                   {[...Array(5)].map((_, i) => (
                     <Star key={i} className={`w-5 h-5 ${i < 4 ? 'fill-current' : i === 4 ? 'fill-current opacity-50' : 'text-slate-600'}`} />
                   ))}
                 </div>
                 <p className="text-sm text-slate-400 font-medium">189 reviews</p>
              </div>
            </div>

            <div className="space-y-3">
              {distribution.map((item, i) => (
                <div key={item.stars} className="flex items-center text-sm gap-3">
                  <span className="text-slate-400 w-8 font-medium flex items-center justify-end gap-1">
                    {item.stars} <Star className="w-3 h-3 fill-current" />
                  </span>
                  <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="h-full bg-amber-500 rounded-full"
                    />
                  </div>
                  <span className="text-slate-500 w-8 text-right text-xs pt-0.5">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Feed */}
        <div className="lg:col-span-2 bg-[#0a0a1a]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 lg:p-8 flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
             <h2 className="text-xl font-bold text-white">Customer Feedback</h2>
             
             {/* Filters */}
             <div className="flex items-center gap-2 p-1 bg-black/40 rounded-xl border border-white/10 overflow-x-auto w-full sm:w-auto no-scrollbar">
                {filters.map(filter => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`relative px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors z-10 ${
                      activeFilter === filter ? 'text-amber-500' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {activeFilter === filter && (
                      <motion.div layoutId="reviewsTab" className="absolute inset-0 bg-amber-500/10 border border-amber-500/20 rounded-lg -z-10" />
                    )}
                    {filter}
                  </button>
                ))}
             </div>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 space-y-4 no-scrollbar min-h-[400px]">
            {filteredReviews.length === 0 ? (
               <p className="text-slate-500 text-center py-10">No reviews found for this filter.</p>
            ) : (
              filteredReviews.map((review, i) => (
                <motion.div 
                  key={review.id} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-5"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg shrink-0">
                        {review.avatar}
                      </div>
                      <div>
                        <p className="font-bold text-white flex items-center gap-2">
                          {review.customer}
                          {getSentimentBadge(review.sentiment)}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">{review.device} • Repaired by {review.technician}</p>
                      </div>
                    </div>
                    <div className="text-right">
                       <div className="flex text-amber-500">
                         {[...Array(5)].map((_, idx) => (
                           <motion.div 
                             key={idx}
                             initial={{ opacity: 0, scale: 0 }}
                             animate={{ opacity: 1, scale: 1 }}
                             transition={{ delay: i * 0.1 + idx * 0.05 }}
                           >
                             <Star className={`w-4 h-4 ${idx < review.rating ? 'fill-current' : 'text-slate-600'}`} />
                           </motion.div>
                         ))}
                       </div>
                       <p className="text-xs text-slate-500 mt-1">{review.date}</p>
                    </div>
                  </div>
                  
                  <p className="text-slate-300 text-sm mt-3">{review.text}</p>

                  {review.reply ? (
                    <div className="mt-4 bg-amber-500/5 border-l-2 border-amber-500 pl-4 py-2 rounded-r-lg flex gap-3">
                      <CornerDownRight className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-amber-500 flex items-center gap-1 mb-1">
                          <ShieldCheck className="w-3 h-3" /> Shop Response
                        </p>
                        <p className="text-sm text-slate-300">{review.reply}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 pt-3 border-t border-white/5 flex items-start gap-2">
                      <MessageSquare className="w-4 h-4 text-slate-500 shrink-0 mt-2" />
                      <div className="flex-1 flex gap-2">
                        <textarea 
                          rows={1}
                          placeholder="Write a public reply..." 
                          className="flex-1 bg-black/40 border border-white/10 rounded-lg text-sm text-white px-3 py-1.5 focus:border-amber-500 outline-none resize-none"
                          value={replyText[review.id] || ''}
                          onChange={(e) => setReplyText({...replyText, [review.id]: e.target.value})}
                        />
                        <button 
                          onClick={() => handleReplySubmit(review.id)}
                          disabled={!replyText[review.id]}
                          className="px-4 py-1.5 bg-white/10 hover:bg-amber-500 text-white hover:text-black focus:bg-amber-500 focus:text-black rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 disabled:hover:bg-white/10 disabled:hover:text-white h-auto"
                        >
                          Post
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
