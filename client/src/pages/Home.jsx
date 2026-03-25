import React from 'react';
import HeroSection from '../components/home/HeroSection';
import AIFeaturesSection from '../components/home/AIFeaturesSection';
import ServicesSection from '../components/home/ServicesSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import LiveTrackingSection from '../components/home/LiveTrackingSection';
import TrustSection from '../components/home/TrustSection';
import CTASection from '../components/home/CTASection';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#020617] selection:bg-brandPurple/30 selection:text-white font-sans overflow-hidden">
      <HeroSection />
      <AIFeaturesSection />
      <ServicesSection />
      <HowItWorksSection />
      <LiveTrackingSection />
      <TrustSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Home;
