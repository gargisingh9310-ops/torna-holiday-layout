import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Phone, Compass } from 'lucide-react';

export default function Navbar({ onOpenEnquiry }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (!element) return;
    
    if (window.lenis) {
      window.lenis.scrollTo(element, { offset: -30 });
    } else {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 w-full ${
          scrolled
            ? 'bg-ivory-warm/95 backdrop-blur-md py-3.5 sm:py-4 border-b border-sand-dark/40 shadow-[0_4px_24px_rgba(73,57,45,0.06)]'
            : 'bg-gradient-to-b from-black/60 via-black/25 to-transparent py-4 sm:py-6 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between w-full">
          {/* Logo & Brand Mark */}
          <button
            onClick={() => scrollTo('hero')}
            className="flex items-center py-1 group text-left focus:outline-none transition-transform duration-300 hover:opacity-90"
            aria-label="Torna Holidays Home"
          >
            <img
              src={scrolled ? "/images/logo-dark.png" : "/images/logo-white.png"}
              alt="Torna Holidays"
              className="h-8 sm:h-10 md:h-11 w-auto object-contain transition-all duration-300 filter drop-shadow-sm"
            />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] tracking-editorial uppercase font-medium">
            {[
              { label: 'Our Story', id: 'story' },
              { label: 'Destinations', id: 'destinations' },
              { label: 'Journeys', id: 'journeys' },
              { label: 'Experiences', id: 'experiences' },
              { label: 'Why Torna', id: 'why-torna' },
              { label: 'Testimonials', id: 'testimonials' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`relative py-1 group transition-colors duration-300 focus:outline-none ${
                  scrolled
                    ? 'text-earth-muted hover:text-earth-deep'
                    : 'text-white/85 hover:text-white'
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 w-0 h-[1.5px] transition-all duration-300 group-hover:w-full ${
                    scrolled ? 'bg-sage' : 'bg-white'
                  }`}
                />
              </button>
            ))}
          </nav>

          {/* CTA Button & Mobile Toggle */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => {
                if (onOpenEnquiry) onOpenEnquiry();
                else scrollTo('enquiry');
              }}
              className={`hidden sm:inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs uppercase tracking-luxury font-medium transition-all duration-300 shadow-sm ${
                scrolled
                  ? 'bg-earth-deep text-cream hover:bg-sage hover:shadow-md'
                  : 'bg-white text-earth-deep hover:bg-cream hover:shadow-lg'
              }`}
            >
              <span>Plan Your Journey</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-colors focus:outline-none ${
                scrolled
                  ? 'text-earth-deep hover:bg-sand/40 active:bg-sand/60'
                  : 'text-white hover:bg-white/20 active:bg-white/30'
              }`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden bg-ivory-warm transition-all duration-500 overflow-y-auto overscroll-contain flex flex-col justify-between p-6 sm:p-8 pt-24 sm:pt-28 min-h-screen ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'
        }`}
      >
        <div className="flex flex-col gap-4 sm:gap-6">
          <div className="flex items-center justify-between pb-3 border-b border-sand-dark/40">
            <img
              src="/images/logo-dark.png"
              alt="Torna Holidays"
              className="h-8 sm:h-9 w-auto object-contain"
            />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-earth-light/70 font-medium">
              Navigation
            </span>
          </div>
          {[
            { label: 'Home', id: 'hero' },
            { label: 'Our Brand Story', id: 'story' },
            { label: 'Explore Destinations', id: 'destinations' },
            { label: 'Featured Journeys', id: 'journeys' },
            { label: 'Travel Experiences', id: 'experiences' },
            { label: 'Why Torna Holidays', id: 'why-torna' },
            { label: 'Traveller Testimonials', id: 'testimonials' },
            { label: 'Contact & Inquiry', id: 'enquiry' },
          ].map((item, idx) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-left font-serif text-xl sm:text-2xl text-earth-deep hover:text-sage active:text-sage transition-colors flex items-center justify-between py-2 sm:py-2.5 border-b border-sand-dark/20 sm:border-transparent min-h-[44px]"
              style={{ transitionDelay: `${idx * 30}ms` }}
            >
              <span>{item.label}</span>
              <span className="text-xs font-sans text-earth-light/60">0{idx + 1}</span>
            </button>
          ))}
        </div>

        <div className="pt-6 sm:pt-8 mt-6 border-t border-sand-dark/40 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-earth-muted text-xs sm:text-sm">
            <Phone className="w-4 h-4 text-sage flex-shrink-0" />
            <a href="tel:+919311014343" className="hover:text-earth-deep">+91 93110 14343</a>
            <span>/</span>
            <a href="tel:+918448553376" className="hover:text-earth-deep">+91 84485 53376</a>
          </div>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              if (onOpenEnquiry) onOpenEnquiry();
              else scrollTo('enquiry');
            }}
            className="w-full py-3.5 bg-earth-deep text-cream text-center rounded-full text-xs uppercase tracking-luxury font-medium hover:bg-sage active:bg-sage-dark transition-colors shadow-sm flex items-center justify-center gap-2 min-h-[44px]"
          >
            <span>Start Planning Your Journey</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </>
  );
}

