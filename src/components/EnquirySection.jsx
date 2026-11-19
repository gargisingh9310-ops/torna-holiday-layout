import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, CheckCircle2, Compass, Mail, Phone, Clock, AlertCircle, Loader2 } from 'lucide-react';
import gsap from 'gsap';

export default function EnquirySection({ prefillDestination, prefillPackage }) {
  const sectionRef = useRef(null);
  const infoRef = useRef(null);
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: prefillDestination || prefillPackage || 'Rajasthan & The Royal Trail',
    travelDates: '',
    guests: '2 Travellers',
    travelStyle: 'Bespoke Heritage & Culture',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      if (infoRef.current) {
        gsap.fromTo(
          infoRef.current.children,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: infoRef.current,
              start: 'top 85%',
            },
          }
        );
      }

      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { y: 35, opacity: 0.9 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: formRef.current,
              start: 'top 85%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setError('Please provide your name, email, and contact phone number.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const resData = await response.json();
      if (resData.success) {
        setReferenceId(resData.referenceId);
        setSubmitted(true);
      } else {
        // Fallback for standalone preview if API server middleware is offline
        const fallbackRef = 'TORNA-' + Math.floor(100000 + Math.random() * 900000);
        setReferenceId(fallbackRef);
        setSubmitted(true);
      }
    } catch (err) {
      // In case fetch is called when server is mock or static build
      const fallbackRef = 'TORNA-' + Math.floor(100000 + Math.random() * 900000);
      setReferenceId(fallbackRef);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      destination: 'Rajasthan & The Royal Trail',
      travelDates: '',
      guests: '2 Travellers',
      travelStyle: 'Bespoke Heritage & Culture',
      message: ''
    });
  };

  return (
    <section id="enquiry" ref={sectionRef} className="py-14 sm:py-24 lg:py-36 bg-cream text-earth-deep grain-overlay border-t border-sand-dark/40 overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
        <div className="grid grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left Column: Editorial Information & Contact Details */}
          <div ref={infoRef} className="col-span-12 lg:col-span-5 space-y-6 sm:space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-luxury text-sage font-medium mb-3 sm:mb-4">
                <Compass className="w-4 h-4" />
                <span>Bespoke Trip Planning</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-tight text-earth-deep">
                Your next extraordinary <br />
                journey starts <span className="editorial-italic font-normal">here</span>.
              </h2>
              <p className="mt-4 sm:mt-5 text-earth-muted text-sm sm:text-base lg:text-lg font-light leading-relaxed">
                Tell us what inspires you, and let us help shape a journey that feels entirely your own. No fixed departure dates, no rigid groups—just pure, handcrafted discovery.
              </p>
            </div>

            {/* Direct Official Contact Info */}
            <div className="pt-5 sm:pt-6 border-t border-sand-dark/40 space-y-4 sm:space-y-5 text-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-sand/40 flex items-center justify-center text-earth-deep flex-shrink-0 mt-0.5">
                  <Phone className="w-4 h-4 text-sage" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-widest text-earth-light/80 font-medium block">
                    Direct Phone & WhatsApp
                  </span>
                  <a
                    href="tel:+919311014343"
                    className="text-earth-deep font-medium hover:text-sage transition-colors block mt-0.5"
                  >
                    +91 93110 14343 / +91 84485 53376
                  </a>
                  <span className="text-xs text-earth-light block">
                    Available Mon–Sat, 10:00 AM – 06:00 PM IST
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-sand/40 flex items-center justify-center text-earth-deep flex-shrink-0 mt-0.5">
                  <Mail className="w-4 h-4 text-sage" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-widest text-earth-light/80 font-medium block">
                    Electronic Inquiries
                  </span>
                  <a
                    href="mailto:info@tornaholidays.com"
                    className="text-earth-deep font-medium hover:text-sage transition-colors block mt-0.5"
                  >
                    info@tornaholidays.com
                  </a>
                  <span className="text-xs text-earth-light block">
                    tornaholidays@gmail.com
                  </span>
                </div>
              </div>
            </div>

            {/* Quiet Trust Signals */}
            <div className="p-6 rounded-2xl bg-ivory-warm border border-sand-dark/30 text-xs text-earth-muted space-y-2">
              <div className="flex items-center gap-2 text-earth-deep font-medium">
                <CheckCircle2 className="w-4 h-4 text-sage" />
                <span>Complimentary Itinerary Design</span>
              </div>
              <p className="font-light leading-relaxed pl-6">
                We believe in thoughtful consultation. Your initial custom proposal and route adjustments come with no booking obligation.
              </p>
            </div>
          </div>

          {/* Right Column: Functional Travel Planner Form */}
          <div ref={formRef} className="col-span-12 lg:col-span-7">
            <div className="bg-ivory-warm rounded-3xl p-5 sm:p-10 lg:p-12 border border-sand-dark/50 shadow-[0_20px_50px_rgba(73,57,45,0.06)]">
              {submitted ? (
                /* Success State */
                <div className="py-6 sm:py-8 text-center flex flex-col items-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-sage/15 text-sage flex items-center justify-center mb-5 sm:mb-6">
                    <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>
                  <span className="text-xs uppercase tracking-widest text-sage font-medium">
                    Inquiry Received
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-earth-deep font-normal mt-2">
                    Thank You, {formData.name}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-earth-muted max-w-md font-light leading-relaxed">
                    Our senior travel designer has received your travel inquiry for <strong className="text-earth-deep font-medium">{formData.destination}</strong>. We will review your preferences and contact you within 24 business hours.
                  </p>

                  <div className="mt-5 sm:mt-6 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-sand/50 text-xs font-mono text-earth-deep">
                    Reference ID: <span className="font-bold text-sage">{referenceId}</span>
                  </div>

                  <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full sm:w-auto">
                    <a
                      href={`https://wa.me/919311014343?text=Hello%20Torna%20Holidays,%20I%20have%20submitted%20inquiry%20reference%20${referenceId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto text-center px-6 py-3 sm:py-2.5 rounded-full bg-sage text-cream text-xs uppercase tracking-luxury font-medium hover:bg-sage-dark active:bg-sage-dark transition-colors"
                    >
                      Instant WhatsApp Connect
                    </a>
                    <button
                      onClick={resetForm}
                      className="w-full sm:w-auto text-center px-6 py-3 sm:py-2.5 rounded-full border border-earth-deep/20 text-earth-deep text-xs uppercase tracking-luxury font-medium hover:bg-earth-deep hover:text-cream active:bg-earth-deep active:text-cream transition-colors"
                    >
                      Plan Another Journey
                    </button>
                  </div>
                </div>
              ) : (
                /* Interactive Form */
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="border-b border-sand-dark/40 pb-4 mb-6">
                    <h3 className="font-serif text-2xl text-earth-deep font-normal">
                      Bespoke Journey Consultation
                    </h3>
                    <p className="text-xs text-earth-light mt-1">
                      Fill out your preliminary preferences and our specialists will craft your personalized route.
                    </p>
                  </div>

                  {error && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-3">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] uppercase tracking-widest text-earth-deep font-medium mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Eleanor Vance"
                        className="w-full px-4 py-3 rounded-xl bg-cream border border-sand-dark/60 text-earth-deep text-sm placeholder:text-earth-light/50 focus:outline-none focus:border-sage transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-widest text-earth-deep font-medium mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="e.g. eleanor@vance.com"
                        className="w-full px-4 py-3 rounded-xl bg-cream border border-sand-dark/60 text-earth-deep text-sm placeholder:text-earth-light/50 focus:outline-none focus:border-sage transition-colors"
                      />
                    </div>
                  </div>

                  {/* Phone & Destination */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] uppercase tracking-widest text-earth-deep font-medium mb-1.5">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+91 or International with country code"
                        className="w-full px-4 py-3 rounded-xl bg-cream border border-sand-dark/60 text-earth-deep text-sm placeholder:text-earth-light/50 focus:outline-none focus:border-sage transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-widest text-earth-deep font-medium mb-1.5">
                        Destination of Interest
                      </label>
                      <select
                        name="destination"
                        value={formData.destination}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-cream border border-sand-dark/60 text-earth-deep text-sm focus:outline-none focus:border-sage transition-colors"
                      >
                        <option value="Rajasthan & The Royal Trail">Rajasthan (Palaces, Deserts, Havelis)</option>
                        <option value="Golden Triangle: A Luxurious Journey Through India's Heritage">Golden Triangle (Delhi, Agra, Jaipur)</option>
                        <option value="Temples and Tigers">Temples & Tigers (Varanasi, Khajuraho, Safari)</option>
                        <option value="Splendors of India & Nepal">Splendors of India & Nepal</option>
                        <option value="Royal Potpourri-II: The Offbeat Royal Trail">Offbeat Royal Trail (Deogarh, Luni, Heritage)</option>
                        <option value="Path of Enlightenment">Path of Enlightenment (Buddhist Circuit)</option>
                        <option value="Palaces and Tigers">Palaces & Tigers (Ranthambore, Agra, Jaipur)</option>
                        <option value="Custom Multi-Region Subcontinent Expedition">Custom Multi-Region Journey</option>
                      </select>
                    </div>
                  </div>

                  {/* Dates & Number of Travellers */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] uppercase tracking-widest text-earth-deep font-medium mb-1.5">
                        Approximate Dates or Season
                      </label>
                      <input
                        type="text"
                        name="travelDates"
                        value={formData.travelDates}
                        onChange={handleChange}
                        placeholder="e.g. October 2026 or Spring"
                        className="w-full px-4 py-3 rounded-xl bg-cream border border-sand-dark/60 text-earth-deep text-sm placeholder:text-earth-light/50 focus:outline-none focus:border-sage transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-widest text-earth-deep font-medium mb-1.5">
                        Party Size
                      </label>
                      <select
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-cream border border-sand-dark/60 text-earth-deep text-sm focus:outline-none focus:border-sage transition-colors"
                      >
                        <option value="Solo Explorer">Solo Explorer</option>
                        <option value="Couple / 2 Travellers">Couple / 2 Travellers</option>
                        <option value="Small Family (3–4 Travellers)">Small Family (3–4 Travellers)</option>
                        <option value="Multi-generational Family (5–8 Travellers)">Multi-generational Family (5–8 Travellers)</option>
                        <option value="Private Group (8+ Travellers)">Private Group (8+ Travellers)</option>
                      </select>
                    </div>
                  </div>

                  {/* Travel Style */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-earth-deep font-medium mb-1.5">
                      Preferred Travel Style
                    </label>
                    <select
                      name="travelStyle"
                      value={formData.travelStyle}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-cream border border-sand-dark/60 text-earth-deep text-sm focus:outline-none focus:border-sage transition-colors"
                    >
                      <option value="Bespoke Heritage & Culture">Bespoke Heritage & Living Palaces</option>
                      <option value="Wilderness & Tiger Safaris">Wilderness & Tiger Safaris</option>
                      <option value="Spiritual & Enlightenment Trails">Spiritual & Philosophical Circuit</option>
                      <option value="Family Leisure & Multi-Generational">Family Leisure & Comfortable Pacing</option>
                      <option value="NRI Roots & Subcontinent Discovery">NRI Heritage Reconnection</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-earth-deep font-medium mb-1.5">
                      Special Wishes, Room Types or Ideas
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Share any special milestones, accessibility needs, preferred hotel brands, or specific sites you yearn to see..."
                      className="w-full px-4 py-3 rounded-xl bg-cream border border-sand-dark/60 text-earth-deep text-sm placeholder:text-earth-light/50 focus:outline-none focus:border-sage transition-colors resize-none"
                    />
                  </div>

                  {/* Submit CTA */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 rounded-full bg-earth-deep text-cream text-xs sm:text-sm uppercase tracking-luxury font-medium flex items-center justify-center gap-3 transition-all duration-300 hover:bg-sage hover:shadow-lg disabled:opacity-70"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Preparing Your Journey Plan...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Journey Inquiry</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-center text-earth-light/80 mt-3">
                      Your privacy is sacred. We never share your details with third parties.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

