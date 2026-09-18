'use client';

import React, { useState, useTransition, useEffect } from 'react';
import { createBooking, BookingInput } from '@/app/actions/bookingActions';
import { formatMoney, formatDate, calculateNights } from '@/lib/utils';
import { ConfirmationModal, ConfirmedBookingData } from './ConfirmationModal';

const roomRatesMap: Record<string, number> = {
  'Standard Room': 3000,
  'Deluxe Room': 4500,
  'Studio Room': 6500,
  'Junior Suite': 8000,
  'Grand Suite': 10500,
  'Presidential Suite': 21500,
};

interface BookingSectionProps {
  selectedRoomFromCatalog?: string;
}

export function BookingSection({ selectedRoomFromCatalog }: BookingSectionProps) {
  const [isPending, startTransition] = useTransition();

  // Form State
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [room, setRoom] = useState(selectedRoomFromCatalog || 'Standard Room');
  const [pax, setPax] = useState(2);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentType, setPaymentType] = useState<'PAY_NOW' | 'PAY_AT_HOTEL'>('PAY_NOW');
  const [gateway, setGateway] = useState<'GCASH' | 'MAYA' | 'CARD'>('GCASH');

  // Error & Modal State
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<ConfirmedBookingData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Auto update room if catalog selection changes
  useEffect(() => {
    if (selectedRoomFromCatalog) {
      setRoom(selectedRoomFromCatalog);
    }
  }, [selectedRoomFromCatalog]);

  // Set default dates (Check-in tomorrow, Check-out in 2 days)
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date(today);
    dayAfter.setDate(dayAfter.getDate() + 3);

    setCheckIn(tomorrow.toISOString().split('T')[0]);
    setCheckOut(dayAfter.toISOString().split('T')[0]);
  }, []);

  // Summary Calculations
  const ratePerNight = roomRatesMap[room] || 0;
  const nights = calculateNights(checkIn, checkOut);
  const standardTotal = ratePerNight * nights;
  const discountAmount = paymentType === 'PAY_NOW' ? standardTotal * 0.10 : 0;
  const estimatedTotal = standardTotal - discountAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!checkIn || !checkOut) {
      setErrorMessage('Please select valid check-in and check-out dates.');
      return;
    }

    if (nights <= 0) {
      setErrorMessage('Check-out date must be after check-in date.');
      return;
    }

    const payload: BookingInput = {
      checkIn,
      checkOut,
      roomId: room,
      pax: Number(pax),
      guestName: name,
      guestEmail: email,
      guestPhone: phone,
      paymentType,
      paymentGateway: paymentType === 'PAY_NOW' ? gateway : 'NONE',
    };

    startTransition(async () => {
      const res = await createBooking(payload);
      if (res.success && res.booking) {
        setConfirmedBooking(res.booking as ConfirmedBookingData);
        setIsModalOpen(true);
      } else {
        setErrorMessage(res.error || 'Failed to complete reservation.');
      }
    });
  };

  return (
    <section className="py-24 bg-warmWhite" id="booking">
      <div className="container mx-auto max-w-[1180px] px-4">
        <div>
          <span className="text-xs uppercase tracking-[3px] text-gold font-bold">Reservations</span>
          <h2 className="font-serif text-3xl sm:text-5xl text-burgundy mt-2 mb-4">
            Book Your Stay
          </h2>
          <p className="text-[#67585a] text-sm sm:text-base leading-relaxed max-w-[650px]">
            Your next memory begins here. Choose your dates, accommodation, guests, and preferred payment option.
          </p>
        </div>

        {/* Booking Form Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-12">
          {/* Left Form Card */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-7 bg-white border border-gold/20 rounded-2xl p-6 sm:p-8 shadow-card"
          >
            <h3 className="font-serif text-2xl text-burgundy mb-6 pb-2 border-b border-gold/10">
              Stay Details
            </h3>

            {errorMessage && (
              <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm">
                <strong>Error:</strong> {errorMessage}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="checkin" className="text-xs uppercase tracking-wider font-bold text-burgundy">
                  Check-In Date
                </label>
                <input
                  type="date"
                  id="checkin"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="border border-[#d9cbbd] bg-warmWhite rounded-lg p-3 text-espresso focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none w-full text-sm"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="checkout" className="text-xs uppercase tracking-wider font-bold text-burgundy">
                  Check-Out Date
                </label>
                <input
                  type="date"
                  id="checkout"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="border border-[#d9cbbd] bg-warmWhite rounded-lg p-3 text-espresso focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none w-full text-sm"
                  required
                />
              </div>

              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label htmlFor="room" className="text-xs uppercase tracking-wider font-bold text-burgundy">
                  Selected Accommodation
                </label>
                <select
                  id="room"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  className="border border-[#d9cbbd] bg-warmWhite rounded-lg p-3 text-espresso focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none w-full text-sm"
                  required
                >
                  <option value="Standard Room">Standard Room — ₱3,000 / night</option>
                  <option value="Deluxe Room">Deluxe Room — ₱4,500 / night</option>
                  <option value="Studio Room">Studio Room — ₱6,500 / night</option>
                  <option value="Junior Suite">Junior Suite — ₱8,000 / night</option>
                  <option value="Grand Suite">Grand Suite — ₱10,500 / night</option>
                  <option value="Presidential Suite">Presidential Suite — ₱21,500 / night</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="guests" className="text-xs uppercase tracking-wider font-bold text-burgundy">
                  Guests / Pax
                </label>
                <input
                  type="number"
                  id="guests"
                  min="1"
                  max="10"
                  value={pax}
                  onChange={(e) => setPax(Number(e.target.value))}
                  className="border border-[#d9cbbd] bg-warmWhite rounded-lg p-3 text-espresso focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none w-full text-sm"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-xs uppercase tracking-wider font-bold text-burgundy">
                  Guest Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Juan dela Cruz"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border border-[#d9cbbd] bg-warmWhite rounded-lg p-3 text-espresso focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none w-full text-sm"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs uppercase tracking-wider font-bold text-burgundy">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="juan@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-[#d9cbbd] bg-warmWhite rounded-lg p-3 text-espresso focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none w-full text-sm"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="phone" className="text-xs uppercase tracking-wider font-bold text-burgundy">
                  Contact Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="+63 917 123 4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="border border-[#d9cbbd] bg-warmWhite rounded-lg p-3 text-espresso focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none w-full text-sm"
                  required
                />
              </div>
            </div>

            {/* Payment Type Selection */}
            <h3 className="font-serif text-2xl text-burgundy mt-10 mb-4 pt-4 border-t border-gold/10">
              Booking Guarantee & Payment Type
            </h3>
            <div className="space-y-3">
              <label
                onClick={() => setPaymentType('PAY_NOW')}
                className={`border rounded-xl p-4 flex gap-3 cursor-pointer transition-all ${
                  paymentType === 'PAY_NOW' ? 'border-gold bg-[#fbf3e8] shadow-sm' : 'border-[#dfd0c2] bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="PAY_NOW"
                  checked={paymentType === 'PAY_NOW'}
                  onChange={() => setPaymentType('PAY_NOW')}
                  className="mt-1 text-gold focus:ring-gold"
                />
                <div>
                  <strong className="text-burgundy text-sm sm:text-base block">Pay Now — Guaranteed Booking</strong>
                  <span className="text-xs text-[#6d6062] block mt-0.5 leading-relaxed">
                    Pay online in advance using GCash, Maya, or a credit/debit card and receive a 10% discount. Your room is guaranteed and reserved regardless of arrival time.
                  </span>
                  <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-champagne-light text-burgundy text-[0.68rem] font-extrabold tracking-wide">
                    10% OFF INSTANT DISCOUNT
                  </span>
                </div>
              </label>

              <label
                onClick={() => setPaymentType('PAY_AT_HOTEL')}
                className={`border rounded-xl p-4 flex gap-3 cursor-pointer transition-all ${
                  paymentType === 'PAY_AT_HOTEL' ? 'border-gold bg-[#fbf3e8] shadow-sm' : 'border-[#dfd0c2] bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="PAY_AT_HOTEL"
                  checked={paymentType === 'PAY_AT_HOTEL'}
                  onChange={() => setPaymentType('PAY_AT_HOTEL')}
                  className="mt-1 text-gold focus:ring-gold"
                />
                <div>
                  <strong className="text-burgundy text-sm sm:text-base block">Pay at Hotel — Standard Rate</strong>
                  <span className="text-xs text-[#6d6062] block mt-0.5 leading-relaxed">
                    Pay upon check-in at the hotel counter at the standard rate. Your room will be held until 6:00 PM unless prior arrangements are made.
                  </span>
                </div>
              </label>
            </div>

            {/* Online Gateway Options */}
            {paymentType === 'PAY_NOW' && (
              <div className="mt-4 p-4 rounded-xl bg-warmWhite border border-gold/20">
                <label htmlFor="gateway" className="text-xs uppercase tracking-wider font-bold text-burgundy block mb-1.5">
                  Online Payment Gateway
                </label>
                <select
                  id="gateway"
                  value={gateway}
                  onChange={(e) => setGateway(e.target.value as any)}
                  className="border border-[#d9cbbd] bg-white rounded-lg p-3 text-espresso focus:border-gold outline-none w-full text-sm"
                >
                  <option value="GCASH">GCash</option>
                  <option value="MAYA">Maya</option>
                  <option value="CARD">Credit / Debit Card</option>
                </select>
              </div>
            )}

            {/* Cancellation Policy Note */}
            <div className="mt-6 p-4 rounded-xl bg-ivory-dark text-xs text-[#67585a] border border-gold/10">
              <strong className="text-burgundy">Cancellation Policy:</strong> For paid or guaranteed bookings, cancellations made at least 7 days before the check-in date are fully refundable. Cancellations within 7 days are subject to a 50% cancellation fee.
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="mt-6 w-full bg-gold hover:bg-burgundy text-white font-bold text-xs uppercase tracking-[1.5px] py-4 px-6 rounded-full border border-gold hover:border-burgundy transition-colors shadow-md disabled:opacity-50"
            >
              {isPending ? 'Processing Reservation...' : 'Confirm Booking'}
            </button>
          </form>

          {/* Right Sticky Summary Card */}
          <aside className="lg:col-span-5 bg-burgundy text-white rounded-2xl p-6 sm:p-8 shadow-luxury lg:sticky lg:top-24 border border-gold/20">
            <h3 className="font-serif text-2xl text-champagne mb-6 pb-2 border-b border-white/10">
              Booking Summary
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                <span className="text-white/80">Accommodation</span>
                <strong className="text-champagne font-medium">{room}</strong>
              </div>

              <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                <span className="text-white/80">Check-In</span>
                <span>{formatDate(checkIn)}</span>
              </div>

              <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                <span className="text-white/80">Check-Out</span>
                <span>{formatDate(checkOut)}</span>
              </div>

              <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                <span className="text-white/80">Guests</span>
                <span>{pax} Pax</span>
              </div>

              <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                <span className="text-white/80">Nights</span>
                <strong className="text-champagne">{nights}</strong>
              </div>

              <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                <span className="text-white/80">Room Rate</span>
                <span>{formatMoney(standardTotal)}</span>
              </div>

              <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                <span className="text-white/80">10% Discount</span>
                <strong className={discountAmount > 0 ? 'text-champagne-light' : 'text-white/60'}>
                  {discountAmount > 0 ? `−${formatMoney(discountAmount)}` : '₱0'}
                </strong>
              </div>

              <div className="flex justify-between items-center pt-3 text-lg font-bold">
                <span className="text-champagne">Estimated Total</span>
                <strong className="text-champagne font-serif text-xl">{formatMoney(estimatedTotal)}</strong>
              </div>
            </div>

            <p className="text-xs text-[#ddcfca] mt-6 leading-relaxed">
              * Pay Now applies the 10% instant discount. Pay at Hotel uses the standard rate.
            </p>
          </aside>
        </div>
      </div>

      {/* Confirmation Receipt Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        booking={confirmedBooking}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
