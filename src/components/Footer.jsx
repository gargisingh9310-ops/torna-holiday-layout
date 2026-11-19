import React from 'react';
import { Compass, Mail, MapPin, Phone, ArrowUp, Clock } from 'lucide-react';

export default function Footer() {
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (!element) return;
    if (window.lenis) {
      window.lenis.scrollTo(element, { offset: -30 });
    } else {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-earth-darker text-cream pt-14 sm:pt-20 pb-10 sm:pb-12 border-t border-earth-deep/50 grain-overlay overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
        {/* Main Footer Content */}
        <div className="grid grid-cols-12 gap-8 sm:gap-10 lg:gap-14 pb-12 sm:pb-16 border-b border-cream/15">
          {/* Brand Column */}
          <div className="col-span-12 lg:col-span-4 space-y-5 sm:space-y-6">
            <div className="flex items-center">
              <img
                src="/images/logo-white.png"
                alt="Torna Holidays"
                className="h-9 sm:h-12 w-auto object-contain filter drop-shadow-sm"
              />
            </div>

            <p className="text-xs sm:text-sm text-sand/80 font-light leading-relaxed max-w-sm">
              Curators of bespoke luxury travel across India and Nepal. Crafting deeply personal cultural encounters, living palace sanctuaries, and wild expeditions since 2016.
            </p>

            <div className="pt-1 sm:pt-2 text-[11px] sm:text-xs text-sand-light/70 font-mono">
              Torna Holidays LLP • New Delhi, India
            </div>
          </div>

          {/* Navigation Links Column */}
          <div className="col-span-6 sm:col-span-3 lg:col-span-2 space-y-4">
            <span className="block text-[11px] uppercase tracking-luxury text-sage-light font-medium">
              Navigation
            </span>
            <ul className="space-y-2.5 text-xs tracking-editorial text-sand/80">
              <li>
                <button onClick={() => scrollTo('hero')} className="hover:text-cream transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('story')} className="hover:text-cream transition-colors">
                  Our Story
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('destinations')} className="hover:text-cream transition-colors">
                  Destinations
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('journeys')} className="hover:text-cream transition-colors">
                  Featured Journeys
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('experiences')} className="hover:text-cream transition-colors">
                  Travel Experiences
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('why-torna')} className="hover:text-cream transition-colors">
                  Why Torna
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('testimonials')} className="hover:text-cream transition-colors">
                  Testimonials
                </button>
              </li>
            </ul>
          </div>

          {/* Genuine Collections Column */}
          <div className="col-span-6 sm:col-span-3 lg:col-span-3 space-y-4">
            <span className="block text-[11px] uppercase tracking-luxury text-sage-light font-medium">
              Featured Collections
            </span>
            <ul className="space-y-2.5 text-xs text-sand/80">
              <li>
                <button onClick={() => scrollTo('journeys')} className="hover:text-cream transition-colors text-left">
                  Golden Triangle Heritage
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('journeys')} className="hover:text-cream transition-colors text-left">
                  Royal Rajputana Grandeur
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('journeys')} className="hover:text-cream transition-colors text-left">
                  Royal Potpourri: Offbeat Trail
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('journeys')} className="hover:text-cream transition-colors text-left">
                  Temples & Tigers Expedition
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('journeys')} className="hover:text-cream transition-colors text-left">
                  Splendors of India & Nepal
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('journeys')} className="hover:text-cream transition-colors text-left">
                  Path of Enlightenment
                </button>
              </li>
            </ul>
          </div>

          {/* Registered Office & Contact Column */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-3 space-y-4">
            <span className="block text-[11px] uppercase tracking-luxury text-sage-light font-medium">
              Registered Office
            </span>

            <div className="space-y-3 text-xs text-sand/80 font-light leading-relaxed">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-sage-light flex-shrink-0 mt-0.5" />
                <span>
                  Shop No. 214, Krishna Plaza, Plot No. 5, Sector-12, Dwarka, New Delhi – 110078, India
                </span>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-sage-light flex-shrink-0 mt-0.5" />
                <div>
                  <a href="tel:+919311014343" className="hover:text-cream transition-colors block">
                    +91 93110 14343
                  </a>
                  <a href="tel:+918448553376" className="hover:text-cream transition-colors block">
                    +91 84485 53376
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-sage-light flex-shrink-0 mt-0.5" />
                <div>
                  <a href="mailto:info@tornaholidays.com" className="hover:text-cream transition-colors block">
                    info@tornaholidays.com
                  </a>
                  <a href="mailto:tornaholidays@gmail.com" className="hover:text-cream transition-colors block">
                    tornaholidays@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-sage-light flex-shrink-0 mt-0.5" />
                <span>Mon – Sat: 10:00 AM – 06:00 PM IST</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-sand/60">
          <div>
            &copy; {new Date().getFullYear()} Torna Holidays LLP. All rights reserved. Registered Indian Tour Operator.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sand-light hover:text-cream transition-colors group"
          >
            <span>Back to top</span>
            <div className="w-7 h-7 rounded-full border border-cream/20 flex items-center justify-center group-hover:border-cream transition-colors">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}

