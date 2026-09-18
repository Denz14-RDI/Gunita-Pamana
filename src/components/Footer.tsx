import React from 'react';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h3>GUNITA PAMANA HOTEL</h3>
            <p>Where Every Stay Becomes A Memory.</p>
            <p style={{ marginTop: '12px' }}>
              A 4-star Filipino-inspired hotel experience in Makati, Manila, combining modern comfort with genuine Filipino hospitality.
            </p>
          </div>
          <div>
            <h3>Explore</h3>
            <ul className="footer-links">
              <li><a href="#about">About Us</a></li>
              <li><a href="#rooms">Accommodation</a></li>
              <li><a href="#dining">Dining</a></li>
              <li><a href="#amenities">Amenities</a></li>
              <li><a href="#concierge">Concierge</a></li>
            </ul>
          </div>
          <div>
            <h3>Reservations</h3>
            <p>reservations@gunitapamana.ph</p>
            <p>+63 2 8888 9999</p>
            <br />
            <a className="btn btn-primary" href="#booking">Book Your Stay</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Gunita Pamana Hotel. All rights reserved.</span>
          <span>Modern Filipino Elegance · Genuine Hospitality</span>
        </div>
      </div>
    </footer>
  );
}
