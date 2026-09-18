import React from 'react';

export function AboutSection() {
  return (
    <section className="py-24 bg-ivory" id="about">
      <div className="container mx-auto max-w-[1180px] px-4">
        {/* Top Story Block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Left Art Card */}
          <div className="min-h-[420px] sm:min-h-[500px] rounded-2xl overflow-hidden relative bg-gradient-to-br from-wine via-burgundy to-espresso shadow-luxury p-8 flex flex-col justify-between border border-gold/20">
            <div className="inset-7 absolute border border-ivory/30 rounded-xl pointer-events-none" />
            <div className="relative z-10">
              <span className="text-xs uppercase tracking-[3px] text-gold font-bold">Heritage & Craft</span>
            </div>
            <div className="relative z-10">
              <h3 className="font-serif text-3xl sm:text-4xl text-white max-w-[300px] leading-tight">
                Filipino Elegance & Heritage
              </h3>
              <p className="text-champagne-light text-xs uppercase tracking-widest mt-2">Est. 1912 · Makati, Manila</p>
            </div>
          </div>

          {/* Right Narrative Copy */}
          <div>
            <span className="text-xs uppercase tracking-[3px] text-gold font-bold">About Gunita Pamana</span>
            <h2 className="font-serif text-3xl sm:text-5xl text-burgundy leading-tight mt-2 mb-6">
              A Legacy of Warm Hospitality
            </h2>
            <p className="text-[#67585a] leading-relaxed mb-4 text-sm sm:text-base">
              Gunita Pamana Hotel stands as a sanctuary where timeless Filipino tradition harmonizes with contemporary 4-star luxury. Rooted in ancestral warmth, our spaces are crafted to invite peace, reflection, and memorable stays.
            </p>
            <p className="text-[#67585a] leading-relaxed mb-6 text-sm sm:text-base">
              From our hand-carved woodwork and locally sourced capiz accents to our signature Hilot spa rituals, every detail tells a story of Filipino artistry (*likha*) and heartfelt service (*malasakit*).
            </p>
            <blockquote className="border-l-2 border-gold pl-6 py-2 my-6 font-serif text-xl sm:text-2xl text-burgundy italic">
              "Where every stay becomes a memory passed through generations."
            </blockquote>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="bg-warmWhite rounded-2xl p-8 sm:p-12 border border-gold/20 shadow-card mb-16">
          <div className="text-center max-w-[600px] mx-auto mb-10">
            <span className="text-xs uppercase tracking-[3px] text-gold font-bold">Our Philosophy</span>
            <h3 className="font-serif text-2xl sm:text-3xl text-burgundy mt-1">Core Values</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-ivory p-6 rounded-xl border border-gold/20 hover:-translate-y-1 transition-transform">
              <span className="font-serif text-4xl text-gold block mb-2">P</span>
              <h4 className="font-serif text-xl text-burgundy mb-2">Pamana (Heritage)</h4>
              <p className="text-sm text-[#67585a]">
                Honoring timeless Filipino traditions, architecture, and cultural legacy in every corner.
              </p>
            </div>
            <div className="bg-ivory p-6 rounded-xl border border-gold/20 hover:-translate-y-1 transition-transform">
              <span className="font-serif text-4xl text-gold block mb-2">M</span>
              <h4 className="font-serif text-xl text-burgundy mb-2">Malasakit (Hospitality)</h4>
              <p className="text-sm text-[#67585a]">
                Providing deeply personal, attentive care that makes every guest feel at home.
              </p>
            </div>
            <div className="bg-ivory p-6 rounded-xl border border-gold/20 hover:-translate-y-1 transition-transform">
              <span className="font-serif text-4xl text-gold block mb-2">L</span>
              <h4 className="font-serif text-xl text-burgundy mb-2">Likha (Craftsmanship)</h4>
              <p className="text-sm text-[#67585a]">
                Celebrating local craftsmanship, natural materials, and curated culinary experiences.
              </p>
            </div>
          </div>
        </div>

        {/* Historical Timeline Section */}
        <div className="bg-burgundy text-white rounded-2xl p-8 sm:p-12 shadow-luxury border border-gold/20">
          <div className="mb-8">
            <span className="text-xs uppercase tracking-[3px] text-gold font-bold">Our Timeline</span>
            <h3 className="font-serif text-3xl sm:text-4xl text-champagne mt-1">The Journey of Pamana</h3>
          </div>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 p-6 rounded-xl bg-white/5 border border-champagne/20">
              <span className="font-serif text-2xl text-champagne">1912</span>
              <div>
                <h4 className="font-serif text-lg text-white mb-1">Ancestral Roots</h4>
                <p className="text-sm text-[#eee2da]">Established as a family estate in Makati, known for hosting community gatherings and ancestral feasts.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 p-6 rounded-xl bg-white/5 border border-champagne/20">
              <span className="font-serif text-2xl text-champagne">1974</span>
              <div>
                <h4 className="font-serif text-lg text-white mb-1">Family Residence & Dining</h4>
                <p className="text-sm text-[#eee2da]">Expanded into a beloved boutique residence serving heirloom Filipino dishes to travelers.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 p-6 rounded-xl bg-white/5 border border-champagne/20">
              <span className="font-serif text-2xl text-champagne">2026</span>
              <div>
                <h4 className="font-serif text-lg text-white mb-1">Modern Heritage Hotel</h4>
                <p className="text-sm text-[#eee2da]">Reimagined into a 4-star luxury destination offering automated booking, fine dining, and spa sanctuary care.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
