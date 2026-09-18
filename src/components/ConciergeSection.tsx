import React from 'react';

export function ConciergeSection() {
  return (
    <section className="section concierge" id="concierge">
      <div className="container concierge-grid">
        <div className="contact-card">
          <div className="eyebrow">At Your Service</div>
          <h2 className="section-title">Contact Our Concierge</h2>
          <p>Whether you need assistance during your stay or simply want to learn more about Gunita Pamana Hotel, our concierge team is here to help make your experience smooth, comfortable, and meaningful.</p>
          <div className="contact-item">
            <span>Location</span>
            <strong>Makati, Manila, Philippines</strong>
          </div>
          <div className="contact-item">
            <span>Email</span>
            <strong>reservations@gunitapamana.ph</strong>
          </div>
          <div className="contact-item">
            <span>Phone</span>
            <strong>+63 2 8888 9999</strong>
          </div>
          <br />
          <a className="btn btn-primary" href="mailto:reservations@gunitapamana.ph">
            Direct Concierge Inquiry
          </a>
        </div>
        <div className="map">
          <div className="map-inner">
            <div className="eyebrow">Location</div>
            <h3>Makati, Manila</h3>
            <p>Map placeholder — connect this area to the hotel's actual Google Maps location when the exact address is finalized.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
