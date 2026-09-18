import React from 'react';

export function DiningSection() {
  return (
    <section className="py-24 bg-warmWhite" id="dining">
      <div className="container mx-auto max-w-[1180px] px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Feature Card */}
          <div className="rounded-2xl p-8 sm:p-12 bg-gradient-to-br from-burgundy to-wine text-white shadow-luxury border border-gold/20 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-[3px] text-champagne font-bold">Culinary Experience</span>
              <h3 className="font-serif text-3xl sm:text-4xl text-champagne mt-2 mb-6 leading-tight">
                A Taste of Filipino Heritage
              </h3>
              <p className="text-[#f2e5dc] text-sm sm:text-base leading-relaxed mb-4">
                Experience an exceptional dining journey where traditional flavors meet modern culinary finesse. Our executive chefs carefully reimagine beloved heirloom recipes, complemented by fine wines and an elegant, candlelit atmosphere.
              </p>
              <p className="text-[#f2e5dc] text-sm sm:text-base leading-relaxed mb-8">
                At Gunita Pamana, dining is more than a meal. It is a celebration of Filipino culture, memories, and togetherness (*salo-salo*).
              </p>
            </div>
            <div>
              <a
                href="#booking"
                className="inline-flex items-center justify-center bg-white/10 hover:bg-white hover:text-burgundy text-white font-bold text-xs uppercase tracking-[1.5px] px-8 py-3.5 rounded-full border border-white/40 transition-all"
              >
                Plan Your Stay
              </a>
            </div>
          </div>

          {/* Dining Image Showcase */}
          <div className="min-h-[420px] sm:min-h-[480px] rounded-2xl bg-gradient-to-br from-gold via-wine to-espresso shadow-luxury p-8 sm:p-10 flex items-end text-white relative overflow-hidden border border-gold/20">
            <div className="absolute inset-6 border border-white/20 rounded-xl pointer-events-none" />
            <div className="relative z-10">
              <span className="text-xs uppercase tracking-[2px] text-champagne font-bold block mb-2">
                Warm evenings · Thoughtful flavors
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium leading-snug">
                Heirloom recipes, thoughtfully reimagined.
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
