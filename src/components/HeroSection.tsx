import React from 'react';

export function HeroSection() {
  return (
    <section className="relative min-h-screen pt-20 flex items-center justify-center text-white bg-gradient-to-br from-burgundy-dark via-burgundy to-espresso overflow-hidden" id="home">
      {/* Decorative SVG Circles background */}
      <div className="absolute top-[-140px] right-[-240px] w-[650px] h-[650px] rounded-full border border-champagne/20 pointer-events-none" />
      <div className="absolute bottom-[-390px] left-[-330px] w-[650px] h-[650px] rounded-full border border-champagne/20 pointer-events-none" />

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-[820px] mx-auto text-center px-4 py-20">
        {/* Hero Logo Emblem */}
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gold to-champagne p-1 shadow-luxury flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-burgundy flex items-center justify-center border border-champagne/40">
            <span className="font-serif font-bold text-3xl text-champagne">GP</span>
          </div>
        </div>

        {/* Title & Tagline */}
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-[0.98] text-white tracking-tight">
          GUNITA PAMANA
        </h1>
        <p className="font-serif italic text-champagne text-lg sm:text-2xl mt-4 mb-6 tracking-wide">
          Where Every Stay Becomes A Memory
        </p>
        <p className="max-w-[650px] mx-auto text-[#f8ede0] text-sm sm:text-base leading-relaxed mb-8">
          Experience modern Filipino luxury in Makati, Manila. Combining warm hospitality, heritage architecture, and thoughtfully designed suites for an unforgettable stay.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#booking"
            className="inline-flex items-center justify-center bg-gold hover:bg-burgundy text-white font-bold text-xs uppercase tracking-[1.5px] px-8 py-3.5 rounded-full border border-gold hover:border-burgundy transition-all shadow-md transform hover:-translate-y-0.5"
          >
            Book Your Stay
          </a>
          <a
            href="#rooms"
            className="inline-flex items-center justify-center bg-transparent hover:bg-white/10 text-white font-bold text-xs uppercase tracking-[1.5px] px-8 py-3.5 rounded-full border border-white/60 transition-all"
          >
            Explore Accommodations
          </a>
        </div>
      </div>

      {/* Hero Highlight Strip */}
      <div className="absolute bottom-0 left-0 w-full z-10 bg-espresso/80 backdrop-blur-sm border-t border-champagne/20">
        <div className="container mx-auto max-w-[1180px] grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
          <div className="p-4 sm:p-5 text-center">
            <strong className="block font-serif text-champagne text-lg sm:text-xl">Makati, Manila</strong>
            <span className="text-[0.7rem] uppercase tracking-[1.6px] text-white/80">Prime Financial & Cultural District</span>
          </div>
          <div className="p-4 sm:p-5 text-center">
            <strong className="block font-serif text-champagne text-lg sm:text-xl">4.9 / 5 Rating</strong>
            <span className="text-[0.7rem] uppercase tracking-[1.6px] text-white/80">Verified Guest Reviews</span>
          </div>
          <div className="p-4 sm:p-5 text-center">
            <strong className="block font-serif text-champagne text-lg sm:text-xl">24/7 Concierge</strong>
            <span className="text-[0.7rem] uppercase tracking-[1.6px] text-white/80">Dedicated Personal Service</span>
          </div>
        </div>
      </div>
    </section>
  );
}
