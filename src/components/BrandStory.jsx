import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, Compass, Sparkles } from 'lucide-react';
import gsap from 'gsap';

export default function BrandStory({ onOpenEnquiry }) {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      // Heading word reveal on scroll
      const words = headingRef.current?.querySelectorAll('.reveal-word');
      if (words) {
        gsap.fromTo(
          words,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 85%',
            },
          }
        );
      }

      // Smooth clipping mask reveal for images
      if (img1Ref.current) {
        gsap.fromTo(
          img1Ref.current,
          { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.15 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            scale: 1,
            duration: 1.5,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: img1Ref.current,
              start: 'top 80%',
            },
          }
        );
      }

      if (img2Ref.current) {
        gsap.fromTo(
          img2Ref.current,
          { clipPath: 'inset(0% 0% 100% 0%)', scale: 1.1 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            scale: 1,
            duration: 1.4,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: img2Ref.current,
              start: 'top 85%',
            },
          }
        );

        // Subtle parallax on the secondary image
        gsap.to(img2Ref.current, {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Paragraph fade in
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: textRef.current,
              start: 'top 85%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative py-14 sm:py-24 lg:py-44 bg-cream text-earth-deep overflow-hidden grain-overlay w-full max-w-full"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 text-xs uppercase tracking-luxury text-sage font-medium mb-6 sm:mb-8">
          <Compass className="w-4 h-4" />
          <span>The Torna Holidays Philosophy</span>
        </div>

        {/* Large Editorial Heading */}
        <div ref={headingRef} className="max-w-4xl">
          <h2 className="font-serif text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-normal leading-[1.15] sm:leading-[1.12] text-earth-deep">
            <span className="inline-block reveal-word mr-2 sm:mr-3">Travel</span>
            <span className="inline-block reveal-word mr-2 sm:mr-3">deeper.</span>
            <br className="hidden sm:inline" />
            <span className="inline-block reveal-word mr-2 sm:mr-3">Discover</span>
            <span className="inline-block reveal-word mr-2 sm:mr-3">something</span>
            <span className="inline-block reveal-word editorial-italic font-normal text-sage-dark">
              extraordinary
            </span>
            <span className="inline-block reveal-word">.</span>
          </h2>
        </div>

        {/* Asymmetrical Content Grid */}
        <div className="mt-10 sm:mt-16 lg:mt-24 grid grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left Column: Brand Narrative & Key Pillars */}
          <div ref={textRef} className="col-span-12 lg:col-span-6 space-y-6 sm:space-y-8 pr-0 lg:pr-6">
            <p className="text-base sm:text-lg lg:text-xl text-earth-muted leading-relaxed font-light">
              Founded in New Delhi, <strong className="text-earth-deep font-medium">Torna Holidays</strong> was conceived on a single enduring conviction: genuine travel should never feel like a hurried itinerary. It should feel like an intimate conversation between you and a civilization that has flourished for thousands of years.
            </p>

            <p className="text-sm sm:text-base text-earth-light leading-relaxed font-normal">
              Whether you are an international traveler stepping foot onto Indian soil for the first time, or an NRI returning to rediscover the architecture, scents, and stories of your ancestry, we craft each expedition from the ground up. Every palace stay is personally vetted, every private chauffeur is thoroughly seasoned, and every scholar guide is chosen for their authentic local insight.
            </p>

            <div className="pt-4 grid grid-cols-2 gap-4 sm:gap-6 border-t border-sand-dark/50">
              <div>
                <span className="block font-serif text-2xl sm:text-4xl text-earth-deep">100%</span>
                <span className="block text-[11px] sm:text-xs uppercase tracking-luxury text-earth-muted mt-1 font-medium">
                  Bespoke Planning
                </span>
                <p className="text-xs text-earth-light/80 mt-1">
                  Tailored around your personal pace, dates, and interests.
                </p>
              </div>

              <div>
                <span className="block font-serif text-2xl sm:text-4xl text-earth-deep">24 / 7</span>
                <span className="block text-[11px] sm:text-xs uppercase tracking-luxury text-earth-muted mt-1 font-medium">
                  On-Ground Assistance
                </span>
                <p className="text-xs text-earth-light/80 mt-1">
                  Unbroken logistics and concierge support from arrival to departure.
                </p>
              </div>
            </div>

            <div className="pt-2 sm:pt-4">
              <button
                onClick={() => {
                  const element = document.getElementById('enquiry');
                  if (element) {
                    if (window.lenis) window.lenis.scrollTo(element);
                    else element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center gap-2.5 text-xs uppercase tracking-luxury font-medium text-earth-deep hover:text-sage transition-colors group"
              >
                <span>Speak With Our Travel Specialists</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Editorial Layered Photography */}
          <div className="col-span-12 lg:col-span-6 relative">
            {/* Primary Large Image */}
            <div
              ref={img1Ref}
              className="relative w-full aspect-[4/3] sm:aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(73,57,45,0.12)] border border-sand"
            >
              <img
                src="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=85"
                alt="Rajasthani royal heritage palace courtyard"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-earth-darker/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-cream">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-sand-light font-medium block">
                  Heritage Sanctuary
                </span>
                <h3 className="font-serif text-lg sm:text-2xl mt-1">
                  Living history preserved within century-old walls
                </h3>
              </div>
            </div>

            {/* Secondary Floating Image with Parallax */}
            <div
              ref={img2Ref}
              className="hidden sm:block absolute -bottom-12 -left-10 w-3/5 aspect-[4/3] rounded-xl overflow-hidden shadow-[0_25px_60px_rgba(73,57,45,0.18)] border-4 border-cream z-10"
            >
              <img
                src="https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=800&q=85"
                alt="Spiritual boat journey along Varanasi ghats"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-earth-deep/80 backdrop-blur-sm text-[10px] uppercase tracking-widest text-cream">
                Sacred Riverways
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

