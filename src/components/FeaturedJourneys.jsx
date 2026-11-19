import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock, MapPin, Sparkles } from 'lucide-react';
import { featuredPackages } from '../data/packages';
import gsap from 'gsap';

export default function FeaturedJourneys({ onSelectPackage }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const scrollContainerRef = useRef(null);

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

      if (scrollContainerRef.current) {
        const cards = scrollContainerRef.current.querySelectorAll('.journey-card');
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
                trigger: scrollContainerRef.current,
                start: 'top 85%',
              },
            }
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const filters = [
    { id: 'all', label: 'All Collections' },
    { id: 'Rajasthan', label: 'Royal Rajasthan' },
    { id: 'Northern India', label: 'Golden Triangle' },
    { id: 'North & Central India', label: 'Wildlife & Temples' },
    { id: 'Trans-Himalayan', label: 'India & Nepal' },
    { id: 'Eastern India & Buddhist Circuit', label: 'Sacred Pilgrimage' }
  ];

  const filteredPackages = activeFilter === 'all'
    ? featuredPackages
    : featuredPackages.filter(pkg => pkg.region === activeFilter || pkg.tag.toLowerCase().includes(activeFilter.toLowerCase()));

  const handleScroll = (direction) => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = direction === 'left' ? -420 : 420;
    scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <section id="journeys" ref={sectionRef} className="py-14 sm:py-24 lg:py-36 bg-cream text-earth-deep overflow-hidden grain-overlay border-y border-sand-dark/30 w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
        {/* Section Header */}
        <div ref={headingRef} className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 mb-8 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-luxury text-sage font-medium mb-3 sm:mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Curated Itineraries</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-tight text-earth-deep">
              Featured Journeys & <br className="hidden sm:inline" />
              <span className="editorial-italic font-normal">Travel Collections</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <p className="text-earth-muted text-xs sm:text-sm max-w-md font-light leading-relaxed">
              Every itinerary is handcrafted, private, and fully customizable. Accompanied by private chauffeurs, heritage accommodations, and licensed scholars.
            </p>
            
            {/* Scroll Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleScroll('left')}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-earth-deep/20 flex items-center justify-center text-earth-deep hover:bg-earth-deep hover:text-cream transition-all duration-300 focus:outline-none"
                aria-label="Previous journeys"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleScroll('right')}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-earth-deep/20 flex items-center justify-center text-earth-deep hover:bg-earth-deep hover:text-cream transition-all duration-300 focus:outline-none"
                aria-label="Next journeys"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6 sm:mb-8">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs uppercase tracking-editorial font-medium whitespace-nowrap transition-all duration-300 ${
                activeFilter === f.id
                  ? 'bg-earth-deep text-cream shadow-sm'
                  : 'bg-sand/40 text-earth-muted hover:bg-sand/80 hover:text-earth-deep'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal Storytelling Track */}
      <div className="w-full max-w-full pl-4 sm:pl-8 lg:pl-[max(1.5rem,calc((100vw-80rem)/2+3rem))] pr-4 sm:pr-8 overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="flex gap-5 sm:gap-8 overflow-x-auto no-scrollbar pb-8 sm:pb-10 scroll-smooth"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              onClick={() => onSelectPackage && onSelectPackage(pkg)}
              className="journey-card flex-shrink-0 w-[280px] xs:w-[320px] sm:w-[380px] md:w-[420px] lg:w-[420px] group cursor-pointer bg-ivory-warm rounded-2xl overflow-hidden border border-sand-dark/40 shadow-[0_10px_30px_rgba(73,57,45,0.06)] hover:shadow-[0_20px_45px_rgba(73,57,45,0.12)] hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between"
              style={{ scrollSnapAlign: 'start' }}
            >
              {/* Image Container with Badges */}
              <div className="relative aspect-[16/11] overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-earth-darker/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                
                {/* Tag pill */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-cream/90 backdrop-blur-md text-earth-deep text-[10px] uppercase tracking-luxury font-medium shadow-sm">
                    {pkg.tag}
                  </span>
                </div>

                {/* Duration chip */}
                <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-earth-deep/80 backdrop-blur-md text-cream text-xs font-medium">
                  <Clock className="w-3 h-3 text-sage-light" />
                  <span>{pkg.duration}</span>
                </div>

                {/* Action Arrow Icon */}
                <div className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-cream text-earth-deep flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:bg-sage group-hover:text-cream shadow-md">
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* Package Content */}
              <div className="p-5 sm:p-7 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-sage font-medium uppercase tracking-editorial mb-2">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="truncate">{pkg.destination}</span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-2xl text-earth-deep font-normal leading-snug group-hover:text-sage-dark transition-colors">
                    {pkg.title}
                  </h3>

                  <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-earth-muted line-clamp-3 font-light leading-relaxed">
                    {pkg.overview}
                  </p>
                </div>

                {/* Route stops & CTA Footer */}
                <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-sand-dark/30 flex items-center justify-between text-xs">
                  <div className="text-[11px] text-earth-light tracking-wide font-medium">
                    {pkg.route.slice(0, 3).join(' • ')} {pkg.route.length > 3 ? `+${pkg.route.length - 3} more` : ''}
                  </div>

                  <span className="text-xs uppercase tracking-luxury text-earth-deep font-medium group-hover:text-sage transition-colors">
                    View Itinerary &rarr;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

