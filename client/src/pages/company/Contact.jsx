import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, Loader2 } from 'lucide-react';

const Contact = () => {
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative isolate">
      <div className="absolute top-0 right-[20%] w-[400px] h-[400px] bg-[oklch(0.65_0.19_35/0.1)] blur-[150px] -z-10 rounded-full pointer-events-none"></div>

      <motion.div 
         initial={{ opacity: 0, y: -20 }}
         animate={{ opacity: 1, y: 0 }}
         className="mb-16 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-[oklch(0.96_0.005_260)] tracking-tight">Get in Touch</h1>
        <p className="text-[oklch(0.65_0.01_260)] font-medium mt-4 text-lg max-w-2xl mx-auto">Have a question about a repair? Want to partner with us? We'd love to hear from you.</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Contact Info */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          <div className="bg-[oklch(0.12_0.005_260)] border border-[oklch(0.28_0.008_260/0.5)] rounded-3xl p-8 shadow-lg h-full flex flex-col justify-between">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[oklch(0.18_0.006_260)] border border-[oklch(0.28_0.008_260/0.5)] flex items-center justify-center text-[oklch(0.65_0.19_35)] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Email Support</h3>
                  <a href="mailto:support@re-gadgets.com" className="text-[oklch(0.65_0.01_260)] hover:text-white transition-colors">support@re-gadgets.com</a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[oklch(0.18_0.006_260)] border border-[oklch(0.28_0.008_260/0.5)] flex items-center justify-center text-[oklch(0.65_0.19_35)] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Phone</h3>
                  <a href="tel:+18005550199" className="text-[oklch(0.65_0.01_260)] hover:text-white transition-colors">1-800-555-0199</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[oklch(0.18_0.006_260)] border border-[oklch(0.28_0.008_260/0.5)] flex items-center justify-center text-[oklch(0.65_0.19_35)] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Business Hours</h3>
                  <p className="text-[oklch(0.65_0.01_260)]">Mon-Fri: 8am - 8pm<br/>Sat-Sun: 10am - 6pm</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[oklch(0.18_0.006_260)] border border-[oklch(0.28_0.008_260/0.5)] flex items-center justify-center text-[oklch(0.65_0.19_35)] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Headquarters</h3>
                  <p className="text-[oklch(0.65_0.01_260)]">123 Tech Lane, Suite 400<br/>San Francisco, CA 94105</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <form onSubmit={handleSubmit} className="bg-[oklch(0.12_0.005_260)] border border-[oklch(0.28_0.008_260/0.5)] rounded-3xl p-8 shadow-xl">
            {status === 'success' ? (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
                  <Send className="w-8 h-8 ml-1" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-[oklch(0.65_0.01_260)]">Thanks for reaching out. Our team will get back to you within 24 hours.</p>
                <button onClick={() => setStatus('idle')} className="mt-8 text-[oklch(0.65_0.19_35)] font-bold hover:underline">Send another message</button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-[oklch(0.65_0.01_260)] mb-2">Your Name</label>
                    <input required type="text" placeholder="John Doe" className="w-full bg-[oklch(0.18_0.006_260/0.4)] border border-[oklch(0.28_0.008_260/0.5)] rounded-xl p-3 text-[oklch(0.96_0.005_260)] placeholder:text-[oklch(0.65_0.01_260)] focus:outline-none focus:border-[oklch(0.65_0.19_35/0.8)] focus:ring-1 focus:ring-[oklch(0.65_0.19_35)] transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[oklch(0.65_0.01_260)] mb-2">Email Address</label>
                    <input required type="email" placeholder="john@example.com" className="w-full bg-[oklch(0.18_0.006_260/0.4)] border border-[oklch(0.28_0.008_260/0.5)] rounded-xl p-3 text-[oklch(0.96_0.005_260)] placeholder:text-[oklch(0.65_0.01_260)] focus:outline-none focus:border-[oklch(0.65_0.19_35/0.8)] focus:ring-1 focus:ring-[oklch(0.65_0.19_35)] transition-all" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-[oklch(0.65_0.01_260)] mb-2">Subject</label>
                  <select className="w-full bg-[oklch(0.18_0.006_260/0.4)] border border-[oklch(0.28_0.008_260/0.5)] rounded-xl p-3 text-[oklch(0.96_0.005_260)] focus:outline-none focus:border-[oklch(0.65_0.19_35/0.8)] focus:ring-1 focus:ring-[oklch(0.65_0.19_35)] transition-all">
                    <option>General Inquiry</option>
                    <option>Support & Repair Status</option>
                    <option>Partnership/Shop Owner</option>
                    <option>Careers</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[oklch(0.65_0.01_260)] mb-2">Message</label>
                  <textarea required placeholder="How can we help you?" className="w-full h-32 resize-none bg-[oklch(0.18_0.006_260/0.4)] border border-[oklch(0.28_0.008_260/0.5)] rounded-xl p-4 text-[oklch(0.96_0.005_260)] placeholder:text-[oklch(0.65_0.01_260)] focus:outline-none focus:border-[oklch(0.65_0.19_35/0.8)] focus:ring-1 focus:ring-[oklch(0.65_0.19_35)] transition-all"></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-[oklch(0.65_0.19_35)] hover:bg-[oklch(0.65_0.19_35/0.8)] disabled:opacity-50 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  {status === 'submitting' ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  {status === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
