import React from 'react';

export function AmenitiesSection() {
  return (
    <section className="section amenities" id="amenities">
      <div className="container">
        <div className="eyebrow">Amenities & Experiences</div>
        <h2 className="section-title">Experience More</h2>
        <p className="section-intro">Every space is designed to help guests slow down, reconnect, and enjoy a stay filled with comfort and thoughtful Filipino touches.</p>
        <div className="amenity-grid">
          <article className="amenity">
            <small>Wellness</small>
            <h3>Hilot Spa Sanctuary</h3>
            <p>A peaceful sanctuary inspired by the Filipino tradition of hilot, created around relaxation, warmth, and mindful care.</p>
          </article>
          <article className="amenity">
            <small>Leisure</small>
            <h3>Swimming Pool</h3>
            <p>A refreshing escape where guests can take a quiet break by the water in a calm and elegant setting.</p>
          </article>
          <article className="amenity">
            <small>Wellbeing</small>
            <h3>Fitness Center</h3>
            <p>A comfortable fitness space for guests who want to maintain their routine while traveling.</p>
          </article>
          <article className="amenity">
            <small>Gather</small>
            <h3>Dining & Lounge</h3>
            <p>Enjoy carefully prepared meals, drinks, and quiet moments in a warm and refined setting.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
