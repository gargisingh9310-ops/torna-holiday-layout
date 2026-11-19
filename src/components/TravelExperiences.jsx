import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, CheckCircle2, Compass, Sparkles } from 'lucide-react';
import { travelExperiences } from '../data/experiences';
import gsap from 'gsap';

export default function TravelExperiences({ onOpenEnquiry }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeExp = travelExperiences[activeIndex];
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef(null);
  const showcaseRef = useRef(null);

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

      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 85%',
            },
          }
        );
      }

      if (showcaseRef.current) {
        gsap.fromTo(
          showcaseRef.current,
          { y: 35, opacity: 0.9 },
          {
            y: 0,
            opacity: 1,
            duration: 0.95,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: showcaseRef.current,
              start: 'top 85%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experiences" ref={sectionRef} className="py-14 sm:py-20 lg:py-24 bg-ivory-warm text-earth-deep relative overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
        {/* Section Header */}
        <div ref={headingRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-10 mb-8 sm:mb-12">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-luxury text-sage font-medium mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>Way of Travelling</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-normal leading-[1.15] text-earth-deep">
              Immersive Forms of <br className="hidden sm:inline" />
              <span className="editorial-italic font-normal text-sage-dark">Travel &amp; Discovery</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-earth-muted text-xs sm:text-base font-light italic leading-relaxed border-l-2 border-sand-dark/60 pl-3 sm:pl-4 py-1">
              "Travel is personal. Whether seeking architectural reverence in restored forts or peaceful dawn rituals along sacred rivers, every journey reveals a different side of India."
            </p>
          </div>
        </div>

        {/* Travel Experience Selection Options (Well-Spaced Editorial Cards) */}
        <div ref={cardsRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4 lg:gap-5 mb-6 sm:mb-10">
          {travelExperiences.map((exp, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={exp.id}
                onClick={() => setActiveIndex(idx)}
                className={`group text-left p-3.5 sm:p-5 rounded-2xl transition-all duration-300 relative flex flex-col justify-between min-h-[88px] sm:min-h-[104px] border ${
                  idx === 4 ? 'col-span-2 sm:col-span-1 lg:col-span-1' : 'col-span-1'
                } ${
                  isActive
                    ? 'bg-cream border-sage shadow-[0_8px_20px_rgba(105,118,76,0.12)] ring-1 ring-sage -translate-y-0.5'
                    : 'bg-cream/60 border-sand-dark/40 hover:bg-cream hover:border-sand-dark hover:-translate-y-0.5 text-earth-muted'
                }`}
                aria-pressed={isActive}
              >
                <div className="flex items-center justify-between w-full mb-2 sm:mb-3">
                  <span
                    className={`text-[10px] sm:text-[11px] font-mono font-medium transition-colors ${
                      isActive ? 'text-sage font-bold' : 'text-earth-light/60 group-hover:text-earth-deep'
                    }`}
                  >
                    0{idx + 1}
                  </span>
                  <span
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      isActive ? 'bg-sage scale-100' : 'bg-transparent scale-0'
                    }`}
                  />
                </div>

                <h4
                  className={`text-xs sm:text-sm font-medium leading-snug transition-colors ${
                    isActive
                      ? 'text-earth-deep font-serif sm:text-base'
                      : 'text-earth-muted group-hover:text-earth-deep'
                  }`}
                >
                  {exp.title}
                </h4>
              </button>
            );
          })}
        </div>

        {/* Two-Column Editorial Showcase (Compact & Balanced Landscape Ratio) */}
        <div ref={showcaseRef} className="bg-cream rounded-3xl overflow-hidden border border-sand-dark/50 shadow-[0_16px_40px_rgba(73,57,45,0.06)] grid grid-cols-12 items-center">
          {/* Left Column: Landscape Image */}
          <div className="col-span-12 lg:col-span-6 p-4 sm:p-6 lg:p-7">
            <div className="relative w-full aspect-[16/10] max-h-[240px] sm:max-h-[340px] rounded-2xl overflow-hidden shadow-sm group">
              <img
                src={activeExp.image}
                alt={activeExp.title}
                key={activeExp.id}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-earth-darker/65 via-transparent to-transparent" />
              
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 px-2.5 sm:px-3 py-1 rounded-full bg-cream/90 backdrop-blur-md text-earth-deep text-[9px] sm:text-[11px] uppercase tracking-luxury font-medium shadow-sm">
                Experience 0{activeIndex + 1} of 0{travelExperiences.length}
              </div>

              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-cream">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-sand-light font-medium block">
                  {activeExp.subtitle}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Text & Features */}
          <div className="col-span-12 lg:col-span-6 p-5 sm:p-8 lg:p-10 flex flex-col justify-center">
            <div>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-luxury text-sage font-medium block mb-1.5 sm:mb-2">
                Curated Perspective
              </span>
              <h3 className="font-serif text-xl sm:text-3xl text-earth-deep font-normal leading-snug">
                {activeExp.title}
              </h3>
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-earth-muted font-light leading-relaxed">
                {activeExp.description}
              </p>

              {/* Curated Inclusions */}
              <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {activeExp.features.map((item, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2 text-xs text-earth-deep">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sage mt-0.5 flex-shrink-0" />
                    <span className="leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-sand-dark/40 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
              <button
                onClick={() => {
                  if (onOpenEnquiry) onOpenEnquiry(activeExp.title);
                  else {
                    const el = document.getElementById('enquiry');
                    if (el) {
                      if (window.lenis) window.lenis.scrollTo(el);
                      else el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 rounded-full bg-earth-deep text-cream text-xs uppercase tracking-luxury font-medium hover:bg-sage active:bg-sage-dark transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <span>Inquire About This Style</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <span className="text-[11px] text-earth-light font-mono hidden sm:inline">
                Tailor-Made Route
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
