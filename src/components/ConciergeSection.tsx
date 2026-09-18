import React from 'react';

export function ConciergeSection() {
  return (
    <section className="py-24 bg-ivory-dark" id="concierge">
      <div className="container mx-auto max-w-[1180px] px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Contact Card */}
          <div className="bg-warmWhite p-8 sm:p-12 rounded-2xl shadow-luxury border border-gold/20">
            <span className="text-xs uppercase tracking-[3px] text-gold font-bold">At Your Service</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-burgundy mt-2 mb-4">
              Contact Our Concierge
            </h2>
            <p className="text-[#67585a] text-sm leading-relaxed mb-6">
              Whether you need assistance during your stay or simply want to learn more about Gunita Pamana Hotel, our concierge team is here to help make your experience smooth, comfortable, and meaningful.
            </p>

            <div className="space-y-4 mb-8">
              <div className="pb-4 border-b border-[#dfd0c2]">
                <span className="block text-[0.68rem] uppercase tracking-[1.5px] text-gold font-extrabold">Location</span>
                <strong className="block font-serif text-lg text-burgundy mt-0.5">Makati, Manila, Philippines</strong>
              </div>
              <div className="pb-4 border-b border-[#dfd0c2]">
                <span className="block text-[0.68rem] uppercase tracking-[1.5px] text-gold font-extrabold">Email</span>
                <strong className="block font-serif text-lg text-burgundy mt-0.5">reservations@gunitapamana.ph</strong>
              </div>
              <div className="pb-4">
                <span className="block text-[0.68rem] uppercase tracking-[1.5px] text-gold font-extrabold">Phone</span>
                <strong className="block font-serif text-lg text-burgundy mt-0.5">+63 2 8888 9999</strong>
              </div>
            </div>

            <a
              href="mailto:reservations@gunitapamana.ph"
              className="inline-flex items-center justify-center bg-gold hover:bg-burgundy text-white font-bold text-xs uppercase tracking-[1.5px] px-8 py-3.5 rounded-full border border-gold hover:border-burgundy transition-all shadow-md"
            >
              Direct Concierge Inquiry
            </a>
          </div>

          {/* Map Placeholder */}
          <div className="min-h-[420px] rounded-2xl p-8 shadow-luxury flex items-center justify-center text-center text-white bg-gradient-to-br from-wine to-espresso relative overflow-hidden border border-gold/20">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(216,190,136,0.12)_0_2px,transparent_2px_28px)] pointer-events-none" />
            <div className="relative z-10 max-w-[360px]">
              <span className="text-xs uppercase tracking-[2px] text-champagne font-bold block mb-2">Location</span>
              <h3 className="font-serif text-3xl sm:text-4xl text-champagne mb-3">Makati, Manila</h3>
              <p className="text-sm text-[#f0e5dd] leading-relaxed">
                Situated in the heart of Makati's financial and heritage district, accessible from Ninoy Aquino International Airport (NAIA).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
