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
    <section className="section rooms" id="rooms">
      <div className="container">
        <div className="eyebrow">Accommodation</div>
        <h2 className="section-title">Rooms & Suites</h2>
        <p className="section-intro">Every room at Gunita Pamana Hotel is thoughtfully designed with Filipino architectural accents, plush bedding, and modern conveniences.</p>

        <div className="rooms-grid">
          {rooms.map((room) => (
            <article key={room.slug} className="room-card">
              <div className="room-image">
                <span>{room.badge}</span>
              </div>
              <div className="room-body">
                <h3>{room.name}</h3>
                <div className="price">{formatMoney(room.pricePerNight)} / night</div>
                <p>{room.description}</p>
                <ul className="amenity-list">
                  {room.amenities.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
                <button
                  onClick={() => handleBookRoom(room.name)}
                  className="btn btn-primary choose-room"
                  data-room={room.name}
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
