'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { RoomsSection } from '@/components/RoomsSection';
import { DiningSection } from '@/components/DiningSection';
import { AmenitiesSection } from '@/components/AmenitiesSection';
import { ConciergeSection } from '@/components/ConciergeSection';
import { BookingSection } from '@/components/BookingSection';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  const [selectedRoom, setSelectedRoom] = useState<string>('Standard Room');

  const handleSelectRoom = (roomName: string) => {
    setSelectedRoom(roomName);
  };

  return (
    <div className="min-h-screen flex flex-col bg-ivory text-espresso">
      {/* Fixed Glassmorphism Navigation */}
      <Header />

      {/* Main Page Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* About & Heritage Story */}
        <AboutSection />

        {/* Rooms & Rates Catalog */}
        <RoomsSection onSelectRoom={handleSelectRoom} />

        {/* Dining Showcase */}
        <DiningSection />

        {/* Amenities & Experiences */}
        <AmenitiesSection />

        {/* Concierge & Contact */}
        <ConciergeSection />

        {/* Interactive Booking Engine */}
        <BookingSection selectedRoomFromCatalog={selectedRoom} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
