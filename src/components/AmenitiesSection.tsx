import React from 'react';

export function AmenitiesSection() {
  const experiences = [
    {
      category: 'Wellness',
      title: 'Hilot Spa Sanctuary',
      description: 'A peaceful sanctuary inspired by the Filipino tradition of hilot, created around relaxation, warmth, and mindful care.',
    },
    {
      category: 'Leisure',
      title: 'Swimming Pool',
      description: 'A refreshing escape where guests can take a quiet break by the water in a calm and elegant setting.',
    },
    {
      category: 'Wellbeing',
      title: 'Fitness Center',
      description: 'A comfortable fitness space for guests who want to maintain their routine while traveling.',
    },
    {
      category: 'Gather',
      title: 'Dining & Lounge',
      description: 'Enjoy carefully prepared meals, drinks, and quiet moments in a warm and refined setting.',
    },
  ];

  return (
    <section className="py-24 bg-ivory-dark" id="amenities">
      <div className="container mx-auto max-w-[1180px] px-4">
        <div className="max-w-[720px] mb-12">
          <span className="text-xs uppercase tracking-[3px] text-gold font-bold">Amenities & Experiences</span>
          <h2 className="font-serif text-3xl sm:text-5xl text-burgundy mt-2 mb-4">
            Experience More
          </h2>
          <p className="text-[#67585a] text-sm sm:text-base leading-relaxed">
            Every space is designed to help guests slow down, reconnect, and enjoy a stay filled with comfort and thoughtful Filipino touches.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((item, idx) => (
            <article
              key={idx}
              className="min-h-[280px] p-7 rounded-2xl flex flex-col justify-end text-white bg-gradient-to-br from-wine to-gold relative overflow-hidden shadow-card border border-gold/20 hover:shadow-luxury hover:-translate-y-1 transition-all"
            >
              {/* Decorative Circle accent */}
              <div className="absolute top-[-60px] right-[-45px] w-[170px] h-[170px] rounded-full border border-white/25 pointer-events-none" />
              
              <div className="relative z-10">
                <small className="text-champagne uppercase tracking-[1.4px] text-[0.7rem] font-bold block mb-1">
                  {item.category}
                </small>
                <h3 className="font-serif text-2xl font-medium mb-2">{item.title}</h3>
                <p className="text-[#f5ebe4] text-xs leading-relaxed">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
