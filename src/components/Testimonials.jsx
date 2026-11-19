import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, Quote, Sparkles } from 'lucide-react';
import { clientTestimonials } from '../data/testimonials';
import gsap from 'gsap';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = clientTestimonials[currentIndex];
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 85%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? clientTestimonials.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === clientTestimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" ref={sectionRef} className="py-14 sm:py-24 lg:py-36 bg-ivory-warm text-earth-deep grain-overlay overflow-hidden w-full max-w-full">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-luxury text-sage font-medium mb-8 sm:mb-12">
          <Sparkles className="w-4 h-4" />
          <span>Voices of Experience</span>
        </div>

        {/* Minimalist Testimonial Card */}
        <div ref={contentRef} className="relative text-center flex flex-col items-center">
          <Quote className="w-9 h-9 sm:w-12 sm:h-12 text-sand-dark mb-5 sm:mb-8 opacity-60" />

          <blockquote className="min-h-[130px] sm:min-h-[140px] flex items-center justify-center">
            <p className="font-serif text-lg sm:text-2xl md:text-3xl lg:text-4xl text-earth-deep font-normal leading-relaxed italic max-w-4xl transition-all duration-500">
              "{current.quote}"
            </p>
          </blockquote>

          {/* Author Details */}
          <div className="mt-6 sm:mt-10 flex flex-col items-center">
            <span className="font-serif text-lg sm:text-2xl text-earth-deep font-medium">
              {current.author}
            </span>
            <span className="text-[11px] sm:text-xs uppercase tracking-luxury text-sage font-medium mt-1">
              {current.role} • {current.origin}
            </span>
            <span className="text-xs text-earth-light/80 mt-1 font-light">
              Experience: {current.journey}
            </span>
          </div>

          {/* Slider Controls & Counter */}
          <div className="mt-8 sm:mt-12 flex items-center gap-6">
            <button
              onClick={prev}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-earth-deep/20 flex items-center justify-center text-earth-deep hover:bg-earth-deep hover:text-cream active:bg-earth-deep active:text-cream transition-all duration-300 focus:outline-none"
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <span className="text-xs font-mono text-earth-light tracking-widest">
              0{currentIndex + 1} / 0{clientTestimonials.length}
            </span>

            <button
              onClick={next}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-earth-deep/20 flex items-center justify-center text-earth-deep hover:bg-earth-deep hover:text-cream active:bg-earth-deep active:text-cream transition-all duration-300 focus:outline-none"
              aria-label="Next testimonial"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

