import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, Compass, Quote } from 'lucide-react';
import gsap from 'gsap';

export default function CinematicStory({ onOpenEnquiry }) {
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const floatingCardRef = useRef(null);
  const textBlockRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      // Background Image zoom and parallax
      gsap.to(bgRef.current, {
        scale: 1.15,
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Text block reveal on scroll
      if (textBlockRef.current) {
        gsap.fromTo(
          textBlockRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.05,
            stagger: 0.18,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: textBlockRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // Floating card parallax opposite direction
      if (floatingCardRef.current) {
        gsap.to(floatingCardRef.current, {
          y: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[70vh] sm:min-h-[85vh] lg:min-h-[90vh] py-16 sm:py-28 lg:py-40 flex items-center justify-center overflow-hidden bg-earth-darker text-cream w-full max-w-full"
    >
      {/* Background Cinematic Visual */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2400&q=90')`,
        }}
      />
      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-earth-darker via-earth-deep/60 to-earth-darker/70" />
      <div className="absolute inset-0 bg-earth-darker/40" />

      {/* Central Storytelling Block */}
      <div ref={textBlockRef} className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 text-center flex flex-col items-center w-full">
        <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-cream/10 backdrop-blur-md border border-cream/20 text-cream text-[10px] sm:text-[11px] uppercase tracking-widest font-medium mb-5 sm:mb-8">
          <Compass className="w-3.5 h-3.5 text-sage-light" />
          <span>The Essence of Travel</span>
        </div>

        <h2 className="font-serif text-2xl xs:text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-normal leading-[1.15] sm:leading-[1.08] text-cream">
          Not just a destination. <br />
          <span className="editorial-italic text-sand-light">A story worth experiencing</span>.
        </h2>

        <p className="mt-5 sm:mt-8 text-sm sm:text-lg md:text-xl text-sand/90 font-light max-w-2xl leading-relaxed">
          From the scent of cedar and mountain prayer flags in Nepal to the sacred lamps illuminating the ancient river of Varanasi. We craft journeys that linger in your memory long after the bags are unpacked.
        </p>

        <div className="mt-8 sm:mt-12 flex flex-wrap items-center justify-center gap-6 w-full sm:w-auto">
          <button
            onClick={() => {
              if (onOpenEnquiry) onOpenEnquiry();
              else {
                const el = document.getElementById('enquiry');
                if (el) {
                  if (window.lenis) window.lenis.scrollTo(el);
                  else el.scrollIntoView({ behavior: 'smooth' });
                }
              }
            }}
            className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-cream text-earth-deep font-medium text-xs sm:text-sm tracking-luxury uppercase flex items-center justify-center gap-3 transition-all duration-300 hover:bg-sand-light hover:shadow-xl hover:-translate-y-0.5 active:bg-sand"
          >
            <span>Begin Your Story With Us</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Floating Architectural Detail Card */}
        <div
          ref={floatingCardRef}
          className="hidden md:flex items-center gap-6 mt-16 p-6 rounded-2xl bg-earth-deep/80 backdrop-blur-md border border-cream/15 text-left max-w-xl text-cream shadow-2xl"
        >
          <Quote className="w-8 h-8 text-sage-light flex-shrink-0" />
          <p className="text-xs sm:text-sm text-sand-light font-light leading-relaxed italic">
            "To travel across India is not simply to move through geography, but to journey through epochs of human art, poetry, and devotion."
          </p>
        </div>
      </div>
    </section>
  );
}

