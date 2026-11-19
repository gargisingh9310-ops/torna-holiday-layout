import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, Compass, MapPin } from 'lucide-react';
import { destinations } from '../data/destinations';
import gsap from 'gsap';

export default function Destinations({ onSelectDestination }) {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      // Header reveal
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

      // Staggered cards entrance
      const cards = gridRef.current?.querySelectorAll('.dest-card');
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.95,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 82%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="destinations" ref={sectionRef} className="py-14 sm:py-24 lg:py-36 bg-ivory-warm text-earth-deep relative overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
        {/* Section Header */}
        <div ref={headingRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-10 sm:mb-16 lg:mb-20">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-luxury text-sage font-medium mb-3 sm:mb-4">
              <Compass className="w-4 h-4" />
              <span>Destinations & Regions</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-tight text-earth-deep">
              The Landscapes of <br className="hidden sm:inline" />
              <span className="editorial-italic font-normal">Timeless Wonder</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-earth-muted text-sm sm:text-base font-light leading-relaxed">
              From the sandstone bastions of the Thar Desert to the sacred rituals of ancient rivers and the snow-crested Himalayas. Each destination curated with genuine local reverence.
            </p>
          </div>
        </div>

        {/* Asymmetrical Editorial Grid */}
        <div ref={gridRef} className="grid grid-cols-12 gap-5 sm:gap-8">
          {destinations.map((dest, idx) => (
            <div
              key={dest.id}
              onClick={() => onSelectDestination && onSelectDestination(dest)}
              className={`${dest.cardSpan} dest-card group relative rounded-2xl overflow-hidden cursor-pointer shadow-[0_12px_36px_rgba(73,57,45,0.08)] border border-sand/60 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(73,57,45,0.16)] hover:-translate-y-1 ${
                idx < 2
                  ? 'min-h-[320px] sm:min-h-[400px] lg:min-h-[480px]'
                  : 'min-h-[290px] sm:min-h-[350px] lg:min-h-[420px]'
              }`}
            >
              {/* Background Image with Zoom */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ backgroundImage: `url('${dest.image}')` }}
              />

              {/* Multi-layered Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-earth-darker/90 via-earth-deep/30 to-black/20 transition-opacity duration-500 group-hover:from-earth-darker/95 group-hover:via-earth-deep/45" />

              {/* Top Bar: Location Coordinate Chip */}
              <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between text-cream/90 text-xs">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream/15 backdrop-blur-md border border-cream/20 text-[10px] sm:text-[11px] font-mono tracking-wider">
                  <MapPin className="w-3 h-3 text-sage-light" />
                  <span>{dest.coordinates}</span>
                </div>

                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-cream/15 backdrop-blur-md border border-cream/20 flex items-center justify-center text-cream transition-transform duration-300 group-hover:bg-cream group-hover:text-earth-deep group-hover:scale-110">
                  <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* Bottom Information */}
              <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 text-cream">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-sand-light font-medium block mb-1.5 sm:mb-2">
                  {dest.tagline}
                </span>

                <h3 className="font-serif text-xl sm:text-3xl md:text-4xl text-cream font-normal transition-transform duration-300 group-hover:translate-x-1">
                  {dest.name}
                </h3>

                <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-sand/90 line-clamp-2 font-light leading-relaxed">
                  {dest.description}
                </p>

                {/* Highlights preview */}
                <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-cream/15 flex flex-wrap gap-1.5 sm:gap-2">
                  {dest.highlights.slice(0, 2).map((item, hIdx) => (
                    <span
                      key={hIdx}
                      className="text-[10px] sm:text-[11px] px-2.5 py-0.5 sm:py-1 rounded-full bg-cream/10 border border-cream/15 text-cream/90"
                    >
                      {item}
                    </span>
                  ))}
                  <span className="text-[10px] sm:text-[11px] text-sand-light font-medium self-center ml-auto flex items-center gap-1 group-hover:text-cream">
                    Explore Region &rarr;
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

