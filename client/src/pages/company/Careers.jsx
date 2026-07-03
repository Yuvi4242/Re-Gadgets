import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Briefcase, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const departments = [
  {
    name: 'Engineering',
    roles: [
      { title: 'Senior Full-Stack Engineer', location: 'Remote', type: 'Full-time' },
      { title: 'AI Diagnostics Lead', location: 'New York, NY', type: 'Full-time' },
    ]
  },
  {
    name: 'Operations & Support',
    roles: [
      { title: 'Partner Success Manager', location: 'Remote', type: 'Full-time' },
      { title: 'Customer Support Specialist', location: 'Austin, TX', type: 'Part-time' },
    ]
  },
  {
    name: 'Technician Network',
    roles: [
      { title: 'Master Repair Technician', location: 'Multiple Cities', type: 'Contract' },
    ]
  }
];

const Careers = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto relative isolate">
      <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-[oklch(0.65_0.19_35/0.05)] blur-[150px] -z-10 rounded-full pointer-events-none"></div>

      <motion.div 
         initial={{ opacity: 0, y: -20 }}
         animate={{ opacity: 1, y: 0 }}
         className="mb-16 text-center"
      >
        <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[oklch(0.18_0.006_260)] border border-[oklch(0.28_0.008_260)] text-[oklch(0.65_0.01_260)] font-bold text-xs uppercase tracking-wider mb-4 shadow-sm">
          <Briefcase className="w-4 h-4" />
          We're Hiring
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[oklch(0.96_0.005_260)] tracking-tight">Join the Revolution</h1>
        <p className="text-[oklch(0.65_0.01_260)] font-medium mt-4 text-lg max-w-2xl mx-auto">Help us build the future of device repair. We're looking for passionate individuals to join our growing team.</p>
      </motion.div>

      <div className="space-y-12">
        {departments.map((dept, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <h2 className="text-2xl font-extrabold text-[oklch(0.96_0.005_260)] mb-6 flex items-center gap-3">
               <span className="w-8 h-1 bg-[oklch(0.65_0.19_35)] rounded-full"></span>
               {dept.name}
            </h2>
            <div className="space-y-4">
              {dept.roles.map((role, rIdx) => (
                <div key={rIdx} className="bg-[oklch(0.12_0.005_260)] border border-[oklch(0.28_0.008_260/0.5)] rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[oklch(0.14_0.005_260/0.8)] transition-colors group">
                  <div>
                    <h3 className="font-bold text-lg text-white group-hover:text-[oklch(0.65_0.19_35)] transition-colors">{role.title}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-[oklch(0.65_0.01_260)]">
                      <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {role.location}</span>
                      <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {role.type}</span>
                    </div>
                  </div>
                  <button className="bg-[oklch(0.18_0.006_260)] hover:bg-[oklch(0.65_0.19_35/0.1)] hover:text-[oklch(0.65_0.19_35)] hover:border-[oklch(0.65_0.19_35/0.4)] text-[oklch(0.96_0.005_260)] border border-[oklch(0.28_0.008_260/0.5)] px-5 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2">
                    Apply <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-20 p-8 rounded-3xl bg-[oklch(0.65_0.19_35/0.05)] border border-[oklch(0.65_0.19_35/0.2)] text-center">
        <h3 className="text-xl font-bold text-white mb-2">Don't see a fit?</h3>
        <p className="text-[oklch(0.65_0.01_260)] mb-6">We're always looking for talented people. Send us your resume.</p>
        <Link to="/contact" className="inline-flex items-center gap-2 text-[oklch(0.65_0.19_35)] font-bold hover:underline">
          Contact Us <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
};

export default Careers;
