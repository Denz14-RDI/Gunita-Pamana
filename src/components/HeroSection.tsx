import React from 'react';

export function HeroSection() {
  return (
    <section className="hero" id="home">
      <div className="hero-content container">
        <div className="hero-logo-emblem">
          <span>GP</span>
        </div>
        <h1>Gunita Pamana Hotel</h1>
        <div className="tagline">Where Every Stay Becomes A Memory.</div>
        <p>A modern Filipino 4-star hotel in Makati, Manila, combining heritage, comfort, and quiet luxury into unforgettable stays.</p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#booking">Book Your Stay</a>
          <a className="btn btn-outline btn-light" href="#rooms">Explore Rooms</a>
        </div>
      </div>

      <div className="hero-strip">
        <div className="container">
          <div className="strip-item">
            <strong>Makati, Manila</strong>
            <span>Prime location</span>
          </div>
          <div className="strip-item">
            <strong>4.9 / 5</strong>
            <span>Guest Rating</span>
          </div>
          <div className="strip-item">
            <strong>24/7 Service</strong>
            <span>Concierge & Spa</span>
          </div>
        </div>
      </div>
    </section>
  );
}
