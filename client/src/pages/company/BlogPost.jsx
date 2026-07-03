import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Tag, Share2 } from 'lucide-react';
import { posts } from './Blog';

const BlogPost = () => {
  const { slug } = useParams();
  const post = posts.find(p => p.slug === slug) || posts[0];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto relative isolate">
      <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-[oklch(0.65_0.19_35/0.05)] blur-[150px] -z-10 rounded-full pointer-events-none"></div>

      <motion.div 
         initial={{ opacity: 0, y: -20 }}
         animate={{ opacity: 1, y: 0 }}
         className="mb-8"
      >
        <Link to="/blog" className="inline-flex items-center gap-2 text-[oklch(0.65_0.01_260)] hover:text-white transition-colors mb-8 font-semibold text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
        
        <div className="flex items-center gap-4 text-xs font-bold text-[oklch(0.65_0.01_260)] mb-6">
          <span className="flex items-center gap-1.5 bg-[oklch(0.18_0.006_260)] px-3 py-1 rounded-full border border-[oklch(0.28_0.008_260/0.5)] text-white">
             <Tag className="w-3 h-3 text-[oklch(0.65_0.19_35)]" /> {post.tag}
          </span>
          <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {post.date}</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-[oklch(0.96_0.005_260)] tracking-tight leading-tight mb-8">
          {post.title}
        </h1>

        <div className="aspect-[21/9] w-full rounded-3xl overflow-hidden border border-[oklch(0.28_0.008_260/0.5)] shadow-2xl mb-12">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>
      </motion.div>

      <motion.article 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="prose prose-invert prose-lg max-w-none text-[oklch(0.65_0.01_260)] marker:text-[oklch(0.65_0.19_35)]"
      >
        <p className="lead text-xl text-[oklch(0.96_0.005_260)] font-medium mb-8">
          {post.excerpt}
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4">The Impact of AI</h2>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-6">
          <li>Faster diagnostics using trained neural networks</li>
          <li>Lower cost due to reduced manual labor hours</li>
          <li>Higher accuracy in detecting underlying hardware faults</li>
        </ul>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4">Conclusion</h2>
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        </p>
      </motion.article>

      <div className="mt-16 pt-8 border-t border-[oklch(0.28_0.008_260/0.5)] flex items-center justify-between">
        <p className="font-bold text-white">Share this article</p>
        <div className="flex gap-3">
          <button className="w-10 h-10 rounded-full bg-[oklch(0.12_0.005_260)] border border-[oklch(0.28_0.008_260/0.5)] flex items-center justify-center hover:bg-[oklch(0.65_0.19_35)] hover:text-white transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
