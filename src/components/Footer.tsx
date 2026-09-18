import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-espresso text-[#eee2da] pt-16 pb-8 border-t border-champagne/20 font-sans">
      <div className="container mx-auto max-w-[1180px] px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          {/* Column 1: Brand Info */}
          <div>
            <h3 className="font-serif text-xl text-champagne mb-4 tracking-wider">
              GUNITA PAMANA HOTEL
            </h3>
            <p className="font-serif italic text-champagne-light text-sm mb-3">
              Where Every Stay Becomes A Memory.
            </p>
            <p className="text-sm text-[#cdbfba] leading-relaxed">
              A 4-star Filipino-inspired hotel experience in Makati, Manila, combining modern comfort with genuine Filipino hospitality (*malasakit*).
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="font-serif text-lg text-champagne mb-4">
              Explore
            </h3>
            <ul className="list-none p-0 m-0 space-y-2 text-sm text-[#cdbfba]">
              <li>
                <a href="#about" className="hover:text-white transition-colors">About Us</a>
              </li>
              <li>
                <a href="#rooms" className="hover:text-white transition-colors">Accommodation</a>
              </li>
              <li>
                <a href="#dining" className="hover:text-white transition-colors">Dining</a>
              </li>
              <li>
                <a href="#amenities" className="hover:text-white transition-colors">Amenities</a>
              </li>
              <li>
                <a href="#concierge" className="hover:text-white transition-colors">Concierge</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Booking */}
          <div>
            <h3 className="font-serif text-lg text-champagne mb-4">
              Reservations
            </h3>
            <p className="text-sm text-[#cdbfba] mb-1">
              <strong className="text-champagne font-normal">Email:</strong> reservations@gunitapamana.ph
            </p>
            <p className="text-sm text-[#cdbfba] mb-6">
              <strong className="text-champagne font-normal">Phone:</strong> +63 2 8888 9999
            </p>
            <a
              href="#booking"
              className="inline-flex items-center justify-center bg-gold hover:bg-burgundy text-white font-bold text-xs uppercase tracking-[1.5px] px-6 py-3 rounded-full border border-gold hover:border-burgundy transition-all shadow-md"
            >
              Book Your Stay
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 text-xs text-[#9f918d] flex flex-col md:flex-row justify-between items-center gap-4">
          <span>© 2026 Gunita Pamana Hotel. All rights reserved.</span>
          <span className="tracking-wider uppercase">
            Modern Filipino Elegance · Genuine Hospitality
          </span>
        </div>
      </div>
    </footer>
  );
}
