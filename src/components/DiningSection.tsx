import React from 'react';

export function DiningSection() {
  return (
    <section className="section dining" id="dining">
      <div className="container dining-grid">
        <div className="feature-card">
          <div className="eyebrow">Dining</div>
          <h3>A Taste of Filipino Heritage</h3>
          <p>Experience an exceptional dining journey where traditional flavors meet modern cuisine. Our executive chefs carefully reimagine beloved heirloom recipes, complemented by fine wines and an elegant, candlelit atmosphere.</p>
          <p>At Gunita Pamana, dining is more than a meal. It is a celebration of Filipino flavors, memories, and traditions.</p>
          <a className="btn btn-light" href="#booking">Plan Your Stay</a>
        </div>
        <div className="dining-image">
          <div>
            <div className="eyebrow">Warm evenings · Thoughtful flavors</div>
            <h3>Heirloom recipes, thoughtfully reimagined.</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
