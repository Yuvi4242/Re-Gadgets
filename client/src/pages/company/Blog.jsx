import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

export const posts = [
  {
    slug: 'future-of-ai-diagnostics',
    title: 'The Future of AI in Device Diagnostics',
    excerpt: 'How machine learning is making device repair faster, cheaper, and more accurate than ever before.',
    date: 'Oct 12, 2026',
    tag: 'Technology',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop'
  },
  {
    slug: 'battery-health-tips',
    title: '5 Ways to Extend Your Smartphone Battery Life',
    excerpt: 'Stop replacing your battery every year. Follow these simple tips to keep your battery healthy.',
    date: 'Sep 28, 2026',
    tag: 'Tips & Tricks',
    image: 'https://images.unsplash.com/photo-1558562805-4bf1e2a724eb?w=600&h=400&fit=crop'
  },
  {
    slug: 'water-damage-myths',
    title: 'Busting Common Water Damage Myths',
    excerpt: 'Does rice actually work? Here is what you really need to do when your phone takes a swim.',
    date: 'Sep 15, 2026',
    tag: 'Guides',
    image: 'https://images.unsplash.com/photo-1584008658097-422fb75a1334?w=600&h=400&fit=crop'
  }
];

const Blog = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative isolate">
      <div className="absolute top-0 left-[-10%] w-[500px] h-[500px] bg-[oklch(0.78_0.16_75/0.05)] blur-[150px] -z-10 rounded-full pointer-events-none"></div>

      <motion.div 
         initial={{ opacity: 0, y: -20 }}
         animate={{ opacity: 1, y: 0 }}
         className="mb-16 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-[oklch(0.96_0.005_260)] tracking-tight">Re-Gadgets Blog</h1>
        <p className="text-[oklch(0.65_0.01_260)] font-medium mt-4 text-lg max-w-2xl mx-auto">Insights, guides, and news from the world of tech repair.</p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, idx) => (
          <motion.div 
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-[oklch(0.12_0.005_260)] border border-[oklch(0.28_0.008_260/0.5)] rounded-3xl overflow-hidden shadow-lg group flex flex-col"
          >
            <Link to={`/blog/${post.slug}`} className="block h-48 overflow-hidden relative">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-4 left-4 bg-[oklch(0.14_0.005_260/0.8)] backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[oklch(0.96_0.005_260)] border border-[oklch(0.28_0.008_260/0.5)] flex items-center gap-1.5">
                <Tag className="w-3 h-3 text-[oklch(0.65_0.19_35)]" /> {post.tag}
              </div>
            </Link>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center gap-2 text-xs font-semibold text-[oklch(0.65_0.01_260)] mb-3">
                <Calendar className="w-4 h-4" /> {post.date}
              </div>
              <Link to={`/blog/${post.slug}`}>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[oklch(0.65_0.19_35)] transition-colors leading-tight">{post.title}</h3>
              </Link>
              <p className="text-[oklch(0.65_0.01_260)] text-sm mb-6 flex-1">{post.excerpt}</p>
              <Link to={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-[oklch(0.65_0.19_35)] font-bold text-sm hover:underline mt-auto">
                Read Article <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
