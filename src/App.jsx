import React, { useState } from 'react';
import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BrandStory from './components/BrandStory';
import Destinations from './components/Destinations';
import FeaturedJourneys from './components/FeaturedJourneys';
import TravelExperiences from './components/TravelExperiences';
import WhyTorna from './components/WhyTorna';
import CinematicStory from './components/CinematicStory';
import Testimonials from './components/Testimonials';
import EnquirySection from './components/EnquirySection';
import Footer from './components/Footer';
import JourneyModal from './components/JourneyModal';
import DestinationModal from './components/DestinationModal';

export default function App() {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [prefilledInquiry, setPrefilledInquiry] = useState('');

  const handlePlanJourney = (packageName) => {
    setPrefilledInquiry(packageName);
    const element = document.getElementById('enquiry');
    if (element) {
      if (window.lenis) {
        window.lenis.scrollTo(element, { offset: -30 });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleOpenGeneralEnquiry = (initialSubject) => {
    if (initialSubject) setPrefilledInquiry(initialSubject);
    const element = document.getElementById('enquiry');
    if (element) {
      if (window.lenis) {
        window.lenis.scrollTo(element, { offset: -30 });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-ivory-warm text-earth-deep selection:bg-sage selection:text-cream w-full max-w-full overflow-x-hidden">
        {/* Floating / Sticky Navigation */}
        <Navbar onOpenEnquiry={() => handleOpenGeneralEnquiry()} />

        <main className="w-full max-w-full overflow-x-hidden">
          {/* SECTION 01: Premium Hero Experience */}
          <Hero onOpenEnquiry={() => handleOpenGeneralEnquiry()} />

          {/* SECTION 02: Introduction / Brand Story */}
          <BrandStory onOpenEnquiry={() => handleOpenGeneralEnquiry()} />

          {/* SECTION 03: Explore Destinations */}
          <Destinations onSelectDestination={(dest) => setSelectedDestination(dest)} />

          {/* SECTION 04: Featured Journeys / Travel Collections */}
          <FeaturedJourneys onSelectPackage={(pkg) => setSelectedPackage(pkg)} />

          {/* SECTION 05: Travel Experiences */}
          <TravelExperiences onOpenEnquiry={(style) => handleOpenGeneralEnquiry(style)} />

          {/* SECTION 06: Why Torna Holidays */}
          <WhyTorna />

          {/* SECTION 07: Immersive Storytelling Section */}
          <CinematicStory onOpenEnquiry={() => handleOpenGeneralEnquiry()} />

          {/* SECTION 08: Traveller Testimonials */}
          <Testimonials />

          {/* SECTION 09: Final Travel Enquiry CTA & Form */}
          <EnquirySection prefillPackage={prefilledInquiry} />
        </main>

        {/* SECTION 10: Premium Footer */}
        <Footer />

        {/* Interactive Modals */}
        <JourneyModal
          pkg={selectedPackage}
          onClose={() => setSelectedPackage(null)}
          onPlanJourney={handlePlanJourney}
        />

        <DestinationModal
          destination={selectedDestination}
          onClose={() => setSelectedDestination(null)}
          onPlanDestination={handlePlanJourney}
        />
      </div>
    </SmoothScroll>
  );
}

