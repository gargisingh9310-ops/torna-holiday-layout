import React, { useEffect, useRef } from 'react';
import { ShieldCheck, UserCheck, HeartHandshake, Sparkles, Clock, Car } from 'lucide-react';
import gsap from 'gsap';

export default function WhyTorna() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current.children,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 85%',
            },
          }
        );
      }

      const cards = gridRef.current?.querySelectorAll('.pillar-card');
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 45, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const pillars = [
    {
      num: "01",
      title: "100% Customized Itineraries",
      desc: "No rigid group itineraries or cookie-cutter routes. Every journey is designed specifically around your travel dates, preferred pace, and personal interests.",
      icon: Sparkles
    },
    {
      num: "02",
      title: "Handpicked Heritage & Luxury Stays",
      desc: "We personally vet properties for architectural character, authentic hospitality, safety, and modern comfort—from 17th-century palaces to eco-luxury tented camps.",
      icon: ShieldCheck
    },
    {
      num: "03",
      title: "Licensed Scholars & Local Guides",
      desc: "Gain deep cultural and historical perspective through government-licensed historians and master naturalists with genuine local roots.",
      icon: UserCheck
    },
    {
      num: "04",
      title: "Private Chauffeur & VIP Logistics",
      desc: "Travel in pristine, air-conditioned luxury saloon cars or coaches with seasoned, courteous professional drivers ensuring total peace of mind.",
      icon: Car
    },
    {
      num: "05",
      title: "24/7 Dedicated Trip Assistance",
      desc: "From the moment your flight touches down to your final departure, our Delhi-based concierge team remains on call via WhatsApp and phone.",
      icon: Clock
    },
    {
      num: "06",
      title: "Transparent & Honest Guidance",
      desc: "Authentic, reliable advice with no hidden fees. We advise you honestly on seasons, realistic driving distances, and culturally sensitive practices.",
      icon: HeartHandshake
    }
  ];

  return (
    <section id="why-torna" ref={sectionRef} className="py-14 sm:py-24 lg:py-36 bg-cream text-earth-deep grain-overlay border-t border-sand-dark/30 overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
        {/* Header */}
        <div ref={headingRef} className="max-w-3xl mb-10 sm:mb-16 lg:mb-24">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-luxury text-sage font-medium mb-3 sm:mb-4">
            <ShieldCheck className="w-4 h-4" />
            <span>The Torna Assurance</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-tight text-earth-deep">
            Why Discerning Travellers <br className="hidden sm:inline" />
            <span className="editorial-italic font-normal">Choose Torna Holidays</span>
          </h2>
          <p className="mt-4 sm:mt-5 text-earth-muted text-sm sm:text-base lg:text-lg font-light leading-relaxed">
            Headquartered in New Delhi, we combine deep regional expertise with the refined standards demanded by international travellers and overseas Indian families.
          </p>
        </div>

        {/* Editorial Pillars Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
          {pillars.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="pillar-card group relative p-6 sm:p-8 rounded-2xl bg-ivory-warm/70 border border-sand-dark/40 shadow-sm hover:shadow-[0_16px_40px_rgba(73,57,45,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5 sm:mb-6">
                    <span className="font-serif text-2xl sm:text-3xl text-sand-dark font-normal group-hover:text-sage transition-colors">
                      {item.num}
                    </span>
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-sand/40 flex items-center justify-center text-earth-deep group-hover:bg-earth-deep group-hover:text-cream transition-colors duration-300">
                      <IconComponent className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-serif text-lg sm:text-2xl text-earth-deep font-normal leading-snug group-hover:text-sage-dark transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-earth-muted font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-sand-dark/20 text-[10px] sm:text-[11px] uppercase tracking-widest text-earth-light/60 font-medium">
                  Torna Quality Standard
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

