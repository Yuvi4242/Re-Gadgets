import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Loader2 } from 'lucide-react';
import { getOwnerStats, getShopReviews } from '../../services/shopService';

const filters = ['All', '5★', '4★', '3★ and below'];

export default function ReviewsPanel() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [reviews, setReviews] = useState<any[]>([]);
  const [rating, setRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [distribution, setDistribution] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const stats = await getOwnerStats();
        if (!stats.shopId) return;
        const data = await getShopReviews(stats.shopId);
        setRating(data.rating || 0);
        setReviewCount(data.reviewCount || data.total || 0);
        setReviews(
          (data.reviews || []).map((r: any) => ({
            id: r._id,
            customer: r.customer?.name || 'Customer',
            avatar: (r.customer?.name || 'C').charAt(0).toUpperCase(),
            rating: r.rating,
            date: new Date(r.createdAt).toLocaleDateString(),
            technician: r.worker?.name || '—',
            sentiment: r.rating >= 4 ? 'POSITIVE' : r.rating === 3 ? 'NEUTRAL' : 'NEGATIVE',
            text: r.comment || '',
            reply: '',
          }))
        );
        const distMap = [5, 4, 3, 2, 1].map((stars) => {
          const found = (data.distribution || []).find((d: any) => d._id === stars);
          const count = found?.count || 0;
          const total = data.total || 1;
          return { stars, count, percentage: Math.round((count / total) * 100) };
        });
        setDistribution(distMap);
      } catch (err) {
        console.error('Failed to load reviews', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case 'POSITIVE':
        return (
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
            Positive
          </span>
        );
      case 'NEUTRAL':
        return (
          <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
            Neutral
          </span>
        );
      case 'NEGATIVE':
        return (
          <span className="bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
            Negative
          </span>
        );
      default:
        return null;
    }
  };

  const filteredReviews = reviews.filter((r) => {
    if (activeFilter === '5★') return r.rating === 5;
    if (activeFilter === '4★') return r.rating === 4;
    if (activeFilter === '3★ and below') return r.rating <= 3;
    return true;
  });

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-[#0a0a1a]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 lg:p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-white mb-6">Overall Rating</h2>
            <div className="flex items-end gap-3 mb-8">
              <span className="text-6xl font-black text-white leading-none">{rating.toFixed(1)}</span>
              <div className="pb-1">
                <div className="flex text-amber-400 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.round(rating) ? 'fill-current' : 'text-slate-600'}`}
                    />
                  ))}
                </div>
                <p className="text-sm text-slate-400 font-medium">{reviewCount} reviews</p>
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
                  <span className="text-slate-500 w-8 text-right text-xs">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-[#0a0a1a]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 lg:p-8">
          <div className="flex flex-wrap gap-2 mb-6">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg ${
                  activeFilter === f ? 'text-amber-500' : 'text-slate-400'
                }`}
              >
                {activeFilter === f && (
                  <motion.div
                    layoutId="reviewsTab"
                    className="absolute inset-0 bg-amber-500/10 border border-amber-500/20 rounded-lg -z-10"
                  />
                )}
                {f}
              </button>
            ))}
          </div>

          <div className="space-y-4 max-h-[500px] overflow-y-auto no-scrollbar">
            {filteredReviews.length === 0 ? (
              <p className="text-slate-500 text-center py-10">No reviews found for this filter.</p>
            ) : (
              filteredReviews.map((r) => (
                <div key={r.id} className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center font-bold text-white">
                        {r.avatar}
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm">{r.customer}</p>
                        <p className="text-xs text-slate-500">
                          {r.date} · Tech: {r.technician}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getSentimentBadge(r.sentiment)}
                      <span className="flex text-amber-400 text-xs font-bold">
                        {r.rating} <Star className="w-3 h-3 fill-current ml-0.5" />
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-300">{r.text || 'No comment provided.'}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
