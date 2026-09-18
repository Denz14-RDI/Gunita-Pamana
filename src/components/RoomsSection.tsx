'use client';

import React from 'react';
import { formatMoney } from '@/lib/utils';

export interface RoomItem {
  id: string;
  slug: string;
  name: string;
  badge: string;
  pricePerNight: number;
  description: string;
  amenities: string[];
}

interface RoomsSectionProps {
  rooms?: RoomItem[];
  onSelectRoom?: (roomName: string) => void;
}

const defaultRoomsList: RoomItem[] = [
  {
    id: '1',
    slug: 'standard-room',
    name: 'Standard Room',
    badge: 'Classic Comfort',
    pricePerNight: 3000,
    description: 'A warm and welcoming room designed for comfort and simplicity, ideal for solo travelers or couples.',
    amenities: ['Cozy queen bed', 'Private bathroom', 'Wi-Fi', 'Television', 'Air conditioning', 'Work desk', 'Coffee & tea', 'Toiletries'],
  },
  {
    id: '2',
    slug: 'deluxe-room',
    name: 'Deluxe Room',
    badge: 'Elevated Space',
    pricePerNight: 4500,
    description: 'Enjoy a little more space and comfort with refined furniture, warm lighting, and carefully selected Filipino-inspired details.',
    amenities: ['Larger room', 'Premium bedding', 'Private bathroom', 'Wi-Fi', 'Television', 'Work desk', 'Coffee & tea', 'Bottled water', 'Toiletries', 'Housekeeping'],
  },
  {
    id: '3',
    slug: 'studio-room',
    name: 'Studio Room',
    badge: 'Flexible Living',
    pricePerNight: 6500,
    description: 'An open and comfortable living space with a small kitchen area, designed for flexibility and longer stays.',
    amenities: ['Open living space', 'Small kitchen', 'Comfortable bed', 'Dining area', 'Private bathroom', 'Wi-Fi', 'Air conditioning', 'Refrigerator', 'Kitchen facilities', 'Toiletries'],
  },
  {
    id: '4',
    slug: 'junior-suite',
    name: 'Junior Suite',
    badge: 'Relaxed Luxury',
    pricePerNight: 8000,
    description: 'A spacious retreat combining a comfortable sleeping area with a cozy sitting space for relaxing, working, and enjoying a more elevated stay.',
    amenities: ['Spacious bedroom', 'Sitting area', 'Premium bedding', 'Private bathroom', 'Work desk', 'Wi-Fi', 'Television', 'Coffee & tea', 'Bottled water', 'Toiletries'],
  },
  {
    id: '5',
    slug: 'grand-suite',
    name: 'Grand Suite',
    badge: 'Refined Retreat',
    pricePerNight: 10500,
    description: 'A generous retreat for guests who value comfort, privacy, and refined surroundings, with separate areas for relaxing and sleeping.',
    amenities: ['Spacious bedroom', 'Separate living area', 'Premium linens', 'Lounge furniture', 'Private bathroom', 'Work desk', 'Wi-Fi', 'Refrigerator', 'Coffee & tea', 'Housekeeping'],
  },
  {
    id: '6',
    slug: 'presidential-suite',
    name: 'Presidential Suite',
    badge: 'Our Highest Tier',
    pricePerNight: 21500,
    description: 'The highest level of accommodation at Gunita Pamana Hotel, designed for an exceptional stay with generous spaces and elevated comfort.',
    amenities: ['Multiple bedrooms', 'Spacious living room', 'Dining area', 'Premium furnishings', 'Luxury bathrooms', 'Work area', 'Wi-Fi', 'Refrigerator', 'Premium toiletries', 'Service on request'],
  },
];

export function RoomsSection({ rooms = defaultRoomsList, onSelectRoom }: RoomsSectionProps) {
  const handleBookRoom = (roomName: string) => {
    if (onSelectRoom) {
      onSelectRoom(roomName);
    }
    const bookingElement = document.getElementById('booking');
    if (bookingElement) {
      bookingElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-warmWhite" id="rooms">
      <div className="container mx-auto max-w-[1180px] px-4">
        <div className="text-center max-w-[720px] mx-auto mb-16">
          <span className="text-xs uppercase tracking-[3px] text-gold font-bold">Accommodation</span>
          <h2 className="font-serif text-3xl sm:text-5xl text-burgundy mt-2 mb-4">
            Rooms & Suites
          </h2>
          <p className="text-[#67585a] text-sm sm:text-base leading-relaxed">
            Every room at Gunita Pamana Hotel is thoughtfully designed with Filipino architectural accents, plush bedding, modern conveniences, and warm lighting.
          </p>
        </div>

        {/* 6 Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <article
              key={room.slug}
              className="bg-warmWhite border border-gold/20 rounded-2xl overflow-hidden shadow-card flex flex-col hover:shadow-luxury hover:-translate-y-1 transition-all duration-300"
            >
              {/* Room Banner */}
              <div className="h-[220px] relative bg-gradient-to-br from-wine via-burgundy to-gold p-4 flex items-end overflow-hidden">
                <div className="absolute inset-4 border border-white/30 rounded-xl pointer-events-none" />
                <span className="relative z-10 text-[0.68rem] uppercase tracking-[2px] font-bold text-white bg-burgundy/60 backdrop-blur-sm px-3 py-1 rounded-full border border-champagne/30">
                  {room.badge}
                </span>
              </div>

              {/* Room Details */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-serif text-2xl text-burgundy font-medium">{room.name}</h3>
                <div className="text-gold font-extrabold text-lg my-2">
                  {formatMoney(room.pricePerNight)} <span className="text-xs text-[#67585a] font-normal">/ night</span>
                </div>
                <p className="text-[#67585a] text-sm leading-relaxed mb-6">
                  {room.description}
                </p>

                {/* Amenity Bullets */}
                <ul className="grid grid-cols-2 gap-2 mb-6 list-none p-0 text-xs text-[#65575a]">
                  {room.amenities.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="text-gold">✦</span>
                      <span className="truncate">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => handleBookRoom(room.name)}
                  className="mt-auto w-full bg-gold hover:bg-burgundy text-white font-bold text-xs uppercase tracking-[1.5px] py-3.5 px-6 rounded-full border border-gold hover:border-burgundy transition-colors shadow-sm"
                >
                  Book This Room
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
