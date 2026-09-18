'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Accommodation', href: '#rooms' },
    { name: 'Dining', href: '#dining' },
    { name: 'Amenities', href: '#amenities' },
    { name: 'Concierge', href: '#concierge' },
    { name: 'Book Your Stay', href: '#booking', highlight: true },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-burgundy/95 backdrop-blur-md shadow-lg border-b border-champagne/30' : 'bg-burgundy/90 backdrop-blur-md border-b border-champagne/20'
    }`}>
      <div className="container mx-auto max-w-[1180px] px-4 min-h-[78px] flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <Link href="#home" className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-champagne flex items-center justify-center border border-champagne/40 shadow-inner group-hover:scale-105 transition-transform">
            <span className="font-serif font-bold text-burgundy text-xl">GP</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg tracking-[1.2px] text-white font-medium leading-tight">
              GUNITA PAMANA
            </span>
            <span className="text-[0.56rem] tracking-[2px] text-champagne uppercase font-sans mt-0.5">
              HOTEL
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-6 list-none m-0 p-0">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className={`text-[0.72rem] tracking-[1.5px] uppercase transition-colors py-2 px-1 ${
                    link.highlight
                      ? 'bg-gold hover:bg-gold-hover text-white font-bold px-4 py-2 rounded-full border border-gold hover:border-gold-hover shadow-sm'
                      : 'text-white/90 hover:text-champagne font-medium'
                  }`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-white text-2xl p-2 focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-burgundy-dark border-b border-champagne/20 px-6 py-6 shadow-2xl animate-fadeIn">
          <ul className="flex flex-col gap-4 list-none m-0 p-0">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block text-xs tracking-[2px] uppercase py-2 transition-colors ${
                    link.highlight
                      ? 'text-gold font-bold border-b border-gold/30 pb-2'
                      : 'text-white/90 hover:text-champagne'
                  }`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
