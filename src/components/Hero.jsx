import React, { useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight, ShieldCheck, MapPin, Sparkles } from 'lucide-react';
import gsap from 'gsap';

export default function Hero({ onOpenEnquiry }) {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const bgImageRef = useRef(null);
  const indicatorRef = useRef(null);
  const eyebrowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Respect prefers-reduced-motion
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      // Background Image subtle cinematic scale-in and reveal
      gsap.fromTo(
        bgImageRef.current,
        { scale: 1.16, filter: 'blur(6px)', opacity: 0.85 },
        { scale: 1.0, filter: 'blur(0px)', opacity: 1, duration: 2.2, ease: 'power2.out' }
      );

      // Parallax scroll on the background image
      gsap.to(bgImageRef.current, {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Eyebrow pill reveal
      if (eyebrowRef.current) {
        gsap.fromTo(
          eyebrowRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
        );
      }

      // Split line reveal for headline
      const lines = headlineRef.current?.querySelectorAll('.headline-line');
      if (lines) {
        gsap.fromTo(
          lines,
          { y: 65, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.2,
            ease: 'power3.out',
            delay: 0.4,
          }
        );
      }

      // Subtitle fade up
      gsap.fromTo(
        subtitleRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power2.out', delay: 0.85 }
      );

      // CTAs reveal
      gsap.fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power2.out', delay: 1.05 }
      );

      // Indicator bounce
      gsap.to(indicatorRef.current, {
        y: 6,
        repeat: -1,
        yoyo: true,
        duration: 1.4,
        ease: 'power1.inOut',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (!element) return;
    if (window.lenis) {
      window.lenis.scrollTo(element, { offset: -30 });
    } else {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen w-full max-w-full flex flex-col justify-between overflow-hidden bg-earth-darker text-cream"
    >
      {/* Background Cinematic Visual with Layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          ref={bgImageRef}
          className="absolute -top-[10%] -left-[5%] -right-[5%] -bottom-[10%] bg-cover bg-center will-change-transform"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=2400&q=90')`,
          }}
        />
        {/* Gradients for readability and luxury warmth */}
        <div className="absolute inset-0 bg-gradient-to-t from-earth-darker via-earth-deep/50 to-black/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-earth-darker/70 via-transparent to-earth-darker/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-earth-deep/20 to-earth-darker/60" />
      </div>

      {/* Top Spacer for fixed navbar */}
      <div className="h-20 sm:h-28 lg:h-32" />

      {/* Hero Central Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full my-auto py-8 sm:py-12">
        {/* Eyebrow Pill */}
        <div
          ref={eyebrowRef}
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full max-w-full bg-cream/10 backdrop-blur-md border border-cream/20 text-cream/90 text-[10px] sm:text-[11px] uppercase tracking-editorial sm:tracking-widest font-medium mb-4 sm:mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-sage-light flex-shrink-0" />
          <span className="truncate sm:whitespace-normal">Curated Travel Across the Subcontinent</span>
        </div>

        {/* Huge Editorial Headline */}
        <div ref={headlineRef} className="overflow-hidden w-full max-w-5xl">
          <h1 className="font-serif text-[1.95rem] xs:text-[2.2rem] sm:text-6xl md:text-7xl lg:text-8xl tracking-tight font-normal leading-[1.14] sm:leading-[1.08] text-cream">
            <span className="block headline-line overflow-hidden">
              Some journeys take you places.
            </span>
            <span className="block headline-line overflow-hidden mt-1 sm:mt-2 text-sand-light">
              Others <span className="editorial-italic font-normal text-cream">bring you closer</span>.
            </span>
          </h1>
        </div>

        {/* Supporting Editorial Description */}
        <div ref={subtitleRef} className="mt-5 sm:mt-8 max-w-2xl">
          <p className="text-[13px] sm:text-lg md:text-xl text-sand/90 font-light leading-relaxed">
            Discover extraordinary journeys across India and beyond, thoughtfully designed around the places, people, and experiences that stay with you.
          </p>
        </div>

        {/* Action CTAs & Highlights */}
        <div
          ref={ctaRef}
          className="mt-7 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6 w-full sm:w-auto"
        >
          <button
            onClick={() => {
              if (onOpenEnquiry) onOpenEnquiry();
              else scrollToSection('enquiry');
            }}
            className="group px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-cream text-earth-deep font-medium text-xs sm:text-sm tracking-luxury uppercase flex items-center justify-center gap-3 transition-all duration-300 hover:bg-sand-light hover:shadow-[0_10px_30px_rgba(250,248,243,0.18)] hover:-translate-y-0.5 active:bg-sand w-full sm:w-auto"
          >
            <span>Plan Your Journey</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          <button
            onClick={() => scrollToSection('journeys')}
            className="group px-6 py-3.5 sm:py-4 rounded-full bg-cream/10 backdrop-blur-md border border-cream/25 text-cream font-medium text-xs sm:text-sm tracking-luxury uppercase flex items-center justify-center gap-2.5 transition-all duration-300 hover:bg-cream/20 hover:border-cream/40 active:bg-cream/30 w-full sm:w-auto"
          >
            <span>Explore Collections</span>
          </button>

          <div className="hidden md:flex items-center gap-3 ml-4 pl-6 border-l border-cream/20 text-cream/80 text-xs tracking-editorial">
            <ShieldCheck className="w-4 h-4 text-sage-light" />
            <span>100% Tailor-made • Vetted Heritage Stays • 24/7 Support</span>
          </div>
        </div>
      </div>

      {/* Bottom Floating Bar & Scroll Indicator */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full pb-6 sm:pb-8 flex items-end justify-between">
        {/* Curated destination ticker indicator */}
        <div className="hidden sm:flex items-center gap-3 text-cream/70 text-xs tracking-widest uppercase">
          <MapPin className="w-3.5 h-3.5 text-sage-light" />
          <span>Rajasthan • Golden Triangle • Varanasi • Central Wilds • Nepal</span>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={() => scrollToSection('story')}
          className="flex items-center gap-2.5 sm:gap-3 text-cream/80 hover:text-cream text-[10px] sm:text-[11px] uppercase tracking-luxury sm:tracking-widest font-medium transition-colors ml-auto sm:ml-0 group focus:outline-none"
        >
          <span>Scroll to Discover</span>
          <div
            ref={indicatorRef}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-cream/30 flex items-center justify-center group-hover:border-cream group-hover:bg-cream/10 transition-colors"
          >
            <ArrowDown className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </div>
        </button>
      </div>
    </section>
  );
}

