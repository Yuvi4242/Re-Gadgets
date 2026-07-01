import React from 'react';
import HeroSection from '../components/home/HeroSection';
import AIFeaturesSection from '../components/home/AIFeaturesSection';
import ServicesSection from '../components/home/ServicesSection';
import ShopOwnerPreviewSection from '../components/home/ShopOwnerPreviewSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import LiveTrackingSection from '../components/home/LiveTrackingSection';
import TrustSection from '../components/home/TrustSection';
import CTASection from '../components/home/CTASection';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[var(--bg-primary)] selection:bg-[var(--color-ember-light)]/30 selection:text-white overflow-hidden">
      <HeroSection />
      <AIFeaturesSection />
      <ServicesSection />
      <ShopOwnerPreviewSection />
      <HowItWorksSection />
      <LiveTrackingSection />
      <TrustSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Home;
