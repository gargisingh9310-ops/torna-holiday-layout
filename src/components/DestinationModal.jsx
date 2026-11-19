import React, { useEffect } from 'react';
import { X, MapPin, CheckCircle2, ArrowUpRight, Compass } from 'lucide-react';

export default function DestinationModal({ destination, onClose, onPlanDestination }) {
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

  if (!destination) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-earth-darker/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-cream rounded-3xl overflow-hidden shadow-2xl border border-sand-dark/60 z-10 my-auto text-earth-deep animate-in fade-in zoom-in-95 duration-300">
        {/* Header Image */}
        <div className="relative h-52 sm:h-72 w-full overflow-hidden">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-earth-darker via-earth-deep/40 to-black/30" />

          <button
            onClick={onClose}
            className="absolute top-4 sm:top-5 right-4 sm:right-5 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-cream/20 backdrop-blur-md border border-cream/30 text-cream flex items-center justify-center hover:bg-cream hover:text-earth-deep transition-all duration-200 z-20"
            aria-label="Close destination details"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-cream">
            <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-cream/20 backdrop-blur-md text-[10px] sm:text-[11px] font-mono tracking-wider mb-1.5 sm:mb-2">
              <MapPin className="w-3 h-3 text-sage-light" />
              <span>{destination.coordinates}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl text-cream font-normal">
              {destination.name}
            </h2>
            <p className="text-sand-light text-[11px] sm:text-sm mt-0.5 sm:mt-1 uppercase tracking-luxury">
              {destination.tagline}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-8 space-y-5 sm:space-y-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-sage font-medium block mb-2">
              The Regional Experience
            </span>
            <p className="text-earth-muted text-sm sm:text-base font-light leading-relaxed">
              {destination.description}
            </p>
          </div>

          <div>
            <span className="text-xs uppercase tracking-widest text-sage font-medium block mb-3">
              Signature Encounters
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {destination.highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-earth-deep">
                  <CheckCircle2 className="w-4 h-4 text-sage mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-ivory-warm border border-sand-dark/40">
            <span className="text-xs uppercase tracking-widest text-earth-deep font-medium block mb-2">
              Curated Torna Journeys in this Region
            </span>
            <div className="flex flex-wrap gap-2">
              {destination.curatedTours.map((tour, tIdx) => (
                <span
                  key={tIdx}
                  className="px-3.5 py-1.5 rounded-full bg-cream border border-sand-dark/50 text-xs text-earth-deep font-medium"
                >
                  {tour}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-ivory-warm border-t border-sand-dark/40 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <button
            onClick={onClose}
            className="w-full sm:w-auto text-center px-6 py-2.5 rounded-full border border-earth-deep/20 text-earth-deep text-xs uppercase tracking-luxury font-medium hover:bg-sand/40 active:bg-sand/60 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              if (onPlanDestination) onPlanDestination(destination.name);
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-earth-deep text-cream text-xs uppercase tracking-luxury font-medium hover:bg-sage active:bg-sage-dark transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
          >
            <span>Plan a Journey Here</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

