import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

const footerLinks = {
  Product:  ['Book a Repair', 'Live Tracking', 'AI Diagnostics', 'Pricing'],
  Company:  ['About Us', 'Careers', 'Blog', 'Contact'],
  Platform: ['Shop Owner Login', 'Technician Portal', 'API Docs', 'Status'],
};

const Footer = () => {
  return (
    <footer className="relative bg-[oklch(0.12_0.005_260)] text-[oklch(0.65_0.01_260)] overflow-hidden pt-20 pb-8 border-t border-[oklch(0.28_0.008_260/0.5)]">
      {/* Ambient */}
      <div
        className="absolute -top-32 -left-20 w-[40%] h-[40%] rounded-full blur-[150px] pointer-events-none"
        style={{ background: 'oklch(0.65 0.19 35 / 0.06)' }}
      />
      <div
        className="absolute bottom-0 right-0 w-[30%] h-[50%] rounded-full blur-[150px] pointer-events-none"
        style={{ background: 'oklch(0.78 0.16 75 / 0.04)' }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-16">

          {/* Brand column */}
          <div>
            <Link to="/" className="inline-flex items-center gap-3 mb-5 group">
              <div className="w-9 h-9 rounded-[9px] bg-[oklch(0.65_0.19_35)] flex items-center justify-center shadow-[0_0_15px_oklch(0.65_0.19_35/0.4)]">
                <span className="font-display font-black text-sm text-[oklch(0.98_0_0)]">RG</span>
              </div>
              <span className="font-display font-extrabold text-base tracking-tight text-[oklch(0.96_0.005_260)] group-hover:text-[oklch(0.65_0.19_35)] transition-colors">
                RE-GADGETS
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-xs text-[oklch(0.65_0.01_260)]">
              Doorstep repair services for all your electronics. AI-powered, fast, and trusted by 12k+ customers.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Twitter,   href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Linkedin,  href: 'https://www.linkedin.com/in/yuvi42/' },
                { icon: Github,    href: '#' },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-full bg-[oklch(0.18_0.006_260)] border border-[oklch(0.28_0.008_260/0.6)] flex items-center justify-center text-[oklch(0.65_0.01_260)] hover:text-[oklch(0.65_0.19_35)] hover:border-[oklch(0.65_0.19_35/0.4)] transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h5 className="font-mono uppercase tracking-[0.16em] text-[10px] font-bold text-[oklch(0.96_0.005_260)] mb-5">
                {title}
              </h5>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      to={link === 'Book a Repair' ? '/book' : link === 'Live Tracking' ? '/tracking' : '#'}
                      className="text-sm text-[oklch(0.65_0.01_260)] hover:text-[oklch(0.96_0.005_260)] transition-colors flex items-center gap-1.5 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-[oklch(0.65_0.19_35)] opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[oklch(0.28_0.008_260/0.4)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[oklch(0.65_0.01_260/0.7)]">
            © 2026 Re-Gadgets. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link to="#" className="text-xs text-[oklch(0.65_0.01_260/0.7)] hover:text-[oklch(0.65_0.01_260)] transition-colors">Privacy</Link>
            <div className="w-1 h-1 rounded-full bg-[oklch(0.28_0.008_260/0.7)]" />
            <Link to="#" className="text-xs text-[oklch(0.65_0.01_260/0.7)] hover:text-[oklch(0.65_0.01_260)] transition-colors">Terms</Link>
            <div className="w-1 h-1 rounded-full bg-[oklch(0.28_0.008_260/0.7)]" />
            <Link to="#" className="text-xs text-[oklch(0.65_0.01_260/0.7)] hover:text-[oklch(0.65_0.01_260)] transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
