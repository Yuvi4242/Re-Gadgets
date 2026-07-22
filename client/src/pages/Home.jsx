import React, { useState } from 'react';
import HeroSection from '../components/home/HeroSection';
import AIFeaturesSection from '../components/home/AIFeaturesSection';
import ServicesSection from '../components/home/ServicesSection';
import RepairShopMap from '../components/map/RepairShopMap';
import BookingModal from '../components/map/BookingModal';
import ShopOwnerPreviewSection from '../components/home/ShopOwnerPreviewSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import LiveTrackingSection from '../components/home/LiveTrackingSection';
import TrustSection from '../components/home/TrustSection';
import CTASection from '../components/home/CTASection';
import Footer from '../components/Footer';

const Home = () => {
  const [activeBookingShop, setActiveBookingShop] = useState(null);

  return (
    <div className="flex flex-col w-full min-h-screen bg-[var(--bg-primary)] selection:bg-[var(--color-ember-light)]/30 selection:text-white overflow-hidden">
      <HeroSection />
      
      {/* Delhi NCR Interactive Repair Hub Map Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <RepairShopMap onBookRepair={(shop) => setActiveBookingShop(shop)} />
      </section>

      <AIFeaturesSection />
      <ServicesSection />
      <ShopOwnerPreviewSection />
      <HowItWorksSection />
      <LiveTrackingSection />
      <TrustSection />
      <CTASection />
      <Footer />

      {/* Booking Modal */}
      {activeBookingShop && (
        <BookingModal
          shop={activeBookingShop}
          onClose={() => setActiveBookingShop(null)}
        />
      )}
    </div>
  );
};

export default Home;
