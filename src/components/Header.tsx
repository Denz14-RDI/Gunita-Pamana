'use client';

import React, { useState } from 'react';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <header>
      <div className="container nav">
        <a href="#home" className="brand">
          <div className="brand-emblem">GP</div>
          <div className="brand-name">
            GUNITA PAMANA<small>HOTEL</small>
          </div>
        </a>
        <nav>
          <ul className={mobileOpen ? 'mobile-open' : ''}>
            <li>
              <a href="#home" onClick={() => setMobileOpen(false)}>Home</a>
            </li>
            <li>
              <a href="#about" onClick={() => setMobileOpen(false)}>About Us</a>
            </li>
            <li>
              <a href="#rooms" onClick={() => setMobileOpen(false)}>Accommodation</a>
            </li>
            <li>
              <a href="#dining" onClick={() => setMobileOpen(false)}>Dining</a>
            </li>
            <li>
              <a href="#amenities" onClick={() => setMobileOpen(false)}>Amenities</a>
            </li>
            <li>
              <a href="#concierge" onClick={() => setMobileOpen(false)}>Concierge</a>
            </li>
            <li>
              <a href="#booking" onClick={() => setMobileOpen(false)}>Book Your Stay</a>
            </li>
          </ul>
        </nav>
        <button className="menu-btn" aria-label="Open menu" onClick={toggleMenu}>
          ☰
        </button>
      </div>
    </header>
  );
}
