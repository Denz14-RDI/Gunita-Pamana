import React from 'react';

export function AboutSection() {
  return (
    <>
      <section className="section about" id="about">
        <div className="container about-grid">
          <div className="art-card">
            <div className="art-label">Filipino Elegance & Heritage</div>
          </div>
          <div className="about-copy">
            <div className="eyebrow">About Gunita Pamana</div>
            <h2 className="section-title">A Legacy of Warm Hospitality</h2>
            <p>Gunita Pamana Hotel is designed as a sanctuary where modern comfort meets timeless Filipino warmth. Every room, hallway, and service is thoughtfully created to offer guests a quiet break from the busy pace of Manila.</p>
            <p>Our identity is rooted in memory, heritage, and genuine care. From curated local materials to subtle ancestral architectural touches, we invite every guest to experience modern Filipino living at its finest.</p>
            <div className="quote">"Where every stay becomes a memory passed through generations."</div>
          </div>
        </div>
      </section>

      <section className="section values">
        <div className="container">
          <div className="eyebrow">Our Philosophy</div>
          <h2 className="section-title">Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-letter">P</div>
              <h3>Pamana (Heritage)</h3>
              <p>Honoring timeless Filipino traditions, architecture, and cultural legacy in every corner.</p>
            </div>
            <div className="value-card">
              <div className="value-letter">M</div>
              <h3>Hospitality (Malasakit)</h3>
              <p>Providing deeply personal, attentive care that makes every guest feel at home.</p>
            </div>
            <div className="value-card">
              <div className="value-letter">K</div>
              <h3>Craftsmanship (Likha)</h3>
              <p>Celebrating local craftsmanship, natural materials, and curated culinary experiences.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section story">
        <div className="container">
          <div className="eyebrow">Our Timeline</div>
          <h2 className="section-title">The Journey of Pamana</h2>
          <p className="section-intro">From ancestral roots to a modern 4-star hotel experience.</p>
          <div className="story-box">
            <div className="story-year">1912</div>
            <p>Established as a family estate in Makati, known for hosting community gatherings and ancestral feasts.</p>
          </div>
          <div className="story-box">
            <div className="story-year">1974</div>
            <p>Expanded into a beloved family residence serving heirloom dishes to traveling guests.</p>
          </div>
          <div className="story-box">
            <div className="story-year">2026</div>
            <p>Reimagined into a modern 4-star hotel offering automated booking, fine dining, and spa sanctuary care.</p>
          </div>
        </div>
      </section>
    </>
  );
}
