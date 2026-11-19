import React, { useEffect } from 'react';
import { X, Clock, MapPin, CheckCircle2, ArrowUpRight, Compass, Shield } from 'lucide-react';

export default function JourneyModal({ pkg, onClose, onPlanJourney }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!pkg) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-earth-darker/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Content */}
      <div className="relative w-full max-w-4xl bg-cream rounded-3xl overflow-hidden shadow-2xl border border-sand-dark/60 z-10 max-h-[90vh] flex flex-col my-auto text-earth-deep animate-in fade-in zoom-in-95 duration-300">
        {/* Sticky Header with Close Button */}
        <div className="relative h-52 sm:h-80 w-full flex-shrink-0 overflow-hidden">
          <img
            src={pkg.image}
            alt={pkg.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-earth-darker via-earth-deep/40 to-black/30" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 sm:top-5 right-4 sm:right-5 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-cream/20 backdrop-blur-md border border-cream/30 text-cream flex items-center justify-center hover:bg-cream hover:text-earth-deep transition-all duration-200 z-20"
            aria-label="Close itinerary details"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Overlay Badges & Title */}
          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-cream">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
              <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-cream/90 text-earth-deep text-[9px] sm:text-[10px] uppercase tracking-luxury font-medium">
                {pkg.tag}
              </span>
              <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-earth-deep/80 backdrop-blur-sm text-cream text-[9px] sm:text-[10px] uppercase tracking-luxury font-medium inline-flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-sage-light" />
                <span>{pkg.duration}</span>
              </span>
              <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-earth-deep/80 backdrop-blur-sm text-cream text-[9px] sm:text-[10px] uppercase tracking-luxury font-medium inline-flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-sage-light" />
                <span>{pkg.destination}</span>
              </span>
            </div>

            <h2 className="font-serif text-xl sm:text-3xl md:text-4xl text-cream font-normal leading-tight">
              {pkg.title}
            </h2>
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-5 sm:p-10 overflow-y-auto space-y-6 sm:space-y-8 flex-grow">
          {/* Overview */}
          <div>
            <span className="text-xs uppercase tracking-widest text-sage font-medium block mb-2">
              Overview & Character
            </span>
            <p className="text-earth-muted text-base font-light leading-relaxed">
              {pkg.overview}
            </p>
          </div>

          {/* Route Sequence */}
          <div className="p-5 rounded-2xl bg-ivory-warm border border-sand-dark/40">
            <span className="text-xs uppercase tracking-widest text-earth-deep font-medium block mb-3">
              Journey Route
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {pkg.route.map((stop, sIdx) => (
                <React.Fragment key={sIdx}>
                  <span className="px-3 py-1.5 rounded-xl bg-cream border border-sand-dark/40 text-xs font-medium text-earth-deep">
                    {stop}
                  </span>
                  {sIdx < pkg.route.length - 1 && (
                    <span className="text-sand-dark font-serif text-sm">&rarr;</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div>
            <span className="text-xs uppercase tracking-widest text-sage font-medium block mb-3">
              Curated Highlights
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {pkg.highlights.map((item, hIdx) => (
                <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-earth-deep">
                  <CheckCircle2 className="w-4 h-4 text-sage mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Day by Day Itinerary */}
          <div>
            <span className="text-xs uppercase tracking-widest text-sage font-medium block mb-4">
              Detailed Day-by-Day Itinerary
            </span>
            <div className="space-y-4">
              {pkg.itinerary.map((dayItem, dIdx) => (
                <div
                  key={dIdx}
                  className="p-4 sm:p-5 rounded-2xl bg-cream border border-sand-dark/40 flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6"
                >
                  <div className="sm:w-28 flex-shrink-0">
                    <span className="text-xs font-mono font-bold text-sage block">
                      {dayItem.day}
                    </span>
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-serif text-base sm:text-lg text-earth-deep font-medium">
                      {dayItem.title}
                    </h4>
                    <p className="mt-1 text-xs sm:text-sm text-earth-muted font-light leading-relaxed">
                      {dayItem.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inclusions */}
          <div className="p-6 rounded-2xl bg-ivory-warm border border-sand-dark/40">
            <div className="flex items-center gap-2 text-xs uppercase tracking-luxury text-earth-deep font-medium mb-3">
              <Shield className="w-4 h-4 text-sage" />
              <span>Torna Luxury Inclusions</span>
            </div>
            <ul className="space-y-2 text-xs text-earth-muted font-light">
              {pkg.inclusions.map((inc, iIdx) => (
                <li key={iIdx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage" />
                  <span>{inc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Footer with Actions */}
        <div className="p-4 sm:p-6 bg-ivory-warm border-t border-sand-dark/40 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 flex-shrink-0">
          <div className="text-xs text-earth-muted text-center sm:text-left">
            Pacing: <strong className="text-earth-deep font-medium">{pkg.pace}</strong> • Handcrafted for private travel
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-6 py-2.5 sm:py-3 rounded-full border border-earth-deep/20 text-earth-deep text-xs uppercase tracking-luxury font-medium hover:bg-sand/40 active:bg-sand/60 transition-colors w-full sm:w-auto text-center"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                if (onPlanJourney) onPlanJourney(pkg.title);
              }}
              className="px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-earth-deep text-cream text-xs uppercase tracking-luxury font-medium hover:bg-sage active:bg-sage-dark transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto shadow-sm"
            >
              <span>Customize This Journey</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

