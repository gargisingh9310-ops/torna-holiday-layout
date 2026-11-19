# Torna Holidays — Premium Travel Website Redesign

A luxury, editorial, and visually immersive single-page website built for **Torna Holidays** (`tornaholidays.com`). Designed to appeal to international tourists, NRIs exploring their ancestral roots, and discerning Indian travelers seeking handcrafted, personalized journeys across India and Nepal.

---

## 🌟 Design Direction & Philosophy

Inspired by international luxury travel brands (Armenia Travel, Flyward, Tours Chanteclerc, Red Dot Tours, and Wildroot Retreats):
- **Warm & Natural Editorial Palette**:
  - Warm Ivory: `#F3EDE3`
  - Soft Cream: `#FAF8F3`
  - Sand Beige: `#E7DDCE`
  - Deep Earth Brown: `#49392D`
  - Muted Sage Green: `#69764C`
  - Olive Green: `#78815C`
  - Light Taupe: `#D9CDBD`
- **Typography**:
  - Headings: `Cormorant Garamond` (Oversized editorial serif with italic emphasis)
  - Body & Micro-copy: `Plus Jakarta Sans` / `DM Sans`
- **Atmosphere**: Calm, spacious, heritage-driven, photography-first, eliminating aggressive gradients and standard budget travel agency clutter.

---

## 🏛️ Authentic Content & Offering Integration

All business details, destinations, packages, and contact information derive directly from the authentic Torna Holidays platform:

- **Registered Office**: Shop No. 214, Krishna Plaza, Plot No. 5, Sector-12, Dwarka, New Delhi – 110078, India (*Torna Holidays LLP*)
- **Phone / WhatsApp**: `+91 93110 14343` / `+91 84485 53376`
- **Official Emails**: `info@tornaholidays.com` / `tornaholidays@gmail.com`
- **Operating Hours**: Monday – Saturday: 10:00 AM – 06:00 PM IST
- **Authentic Client Testimonial**: Features the genuine review from client Sarah J., alongside international & NRI verified feedback.

---

## 🗺️ Homepage Architecture (10 Sections)

1. **Section 01 – Premium Hero Experience**:
   - Full-bleed cinematic photography with slow zoom and parallax.
   - Transparent floating header that transitions to frosted ivory on scroll.
   - Editorial headline: *"Some journeys take you places. Others bring you closer."*
   - Animated scroll indicator and quick CTAs.

2. **Section 02 – Introduction / Brand Story**:
   - Inspired by Wildroot Retreats: asymmetrical layout and generous whitespace.
   - Large headline: *"Travel deeper. Discover something extraordinary."*
   - Scroll-triggered word reveals and clip-path image reveals.
   - Torna Holidays New Delhi heritage and bespoke commitment.

3. **Section 03 – Explore Destinations**:
   - Asymmetrical editorial cards for authentic regional hubs: Rajasthan, Delhi & Golden Triangle, Sacred Varanasi & Rivers, Central Wilds & Tiger Reserves, and Nepal & Trans-Himalayas.
   - GPS coordinate tags, image hover zoom, and deep-dive modal drawer.

4. **Section 04 – Featured Journeys / Travel Collections**:
   - The 8 authentic Torna Holidays packages:
     1. *Golden Triangle: A Luxurious Journey Through India's Heritage* (6 Days)
     2. *Royal Rajputana* (14 Days)
     3. *Royal Potpourri-II: The Offbeat Royal Trail* (8 Days)
     4. *Temples and Tigers* (11 Days)
     5. *Splendors of India & Nepal* (13 Days)
     6. *The Rajasthan Tour* (10 Days)
     7. *Palaces and Tigers* (9 Days)
     8. *Path of Enlightenment* (10 Days)
   - Category filtering, smooth horizontal scroll track, and comprehensive day-by-day itinerary modal (`JourneyModal`).

5. **Section 05 – Travel Experiences**:
   - 5 authentic pillars: Heritage & Living Palaces, Wilderness & Tiger Safaris, Spiritual & Philosophical Trails, Culinary & Artisan Immersion, and NRI & International Guest Care.
   - Interactive split layout with curated inclusions.

6. **Section 06 – Why Torna Holidays**:
   - 6 numbered pillars: 100% Customized Itineraries, Vetted Heritage Stays, Licensed Scholars & Guides, Private Chauffeurs & VIP Logistics, 24/7 Trip Assistance, and Transparent Guidance.

7. **Section 07 – Immersive Storytelling Section**:
   - Cinematic scroll section: *"Not just a destination. A story worth experiencing."*
   - Parallax background imagery and architectural philosophy quote.

8. **Section 08 – Traveller Testimonials**:
   - Minimalist slider featuring genuine client words (including Sarah J.) in large serif quotation styling with author details.

9. **Section 09 – Final Travel Enquiry CTA & Interactive Planner**:
   - *"Your next extraordinary journey starts here."*
   - Complete bespoke journey planner form with validation, connection to `/api/enquiry` endpoint, unique Reference ID generation (`TORNA-XXXXXX`), and direct WhatsApp link.

10. **Section 10 – Premium Footer**:
    - Brand mark & crest, corporate address in Dwarka New Delhi, phone lines, emails, working hours, anchor navigation, and legal copyright.

---

## 🛠️ Technology Stack

- **React 18** + **Vite 6**
- **GSAP 3** + **ScrollTrigger** (Word-by-word reveal, clip-path reveals, parallax)
- **Lenis** (`lenis`) for ultra-smooth inertia scrolling
- **Tailwind CSS 3** with custom luxury editorial configuration
- **Lucide React** for minimalist iconography
- **Custom Node / Vite API Middleware** handling `/api/enquiry` submissions

---

## 🚀 Getting Started

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```
The server will start at: `http://localhost:5176/`

### Build for Production
```bash
npm run build
```
Generates optimized assets inside the `dist/` folder.

