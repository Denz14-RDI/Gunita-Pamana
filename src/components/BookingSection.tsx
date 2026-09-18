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

  useEffect(() => {
    if (selectedRoomFromCatalog) {
      setRoom(selectedRoomFromCatalog);
    }
  }, [selectedRoomFromCatalog]);

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
  const payNowTotal = standardTotal - (standardTotal * 0.10);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!checkIn || !checkOut) {
      setErrorMessage('Please complete all required booking details.');
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
    <section className="section booking" id="booking">
      <div className="container">
        <div className="eyebrow">Reservations</div>
        <h2 className="section-title">Book Your Stay</h2>
        <p className="section-intro">Your next memory begins here. Choose your dates, accommodation, guests, and preferred payment option.</p>

        <div className="booking-wrap" style={{ marginTop: '40px' }}>
          <form className="form-card" id="bookingForm" onSubmit={handleSubmit}>
            <h3 className="serif" style={{ fontSize: '1.8rem', color: 'var(--burgundy)', marginBottom: '22px' }}>
              Stay Details
            </h3>

            {errorMessage && (
              <div className="policy" style={{ background: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb', marginBottom: '18px' }}>
                <strong>Note:</strong> {errorMessage}
              </div>
            )}

            <div className="form-grid">
              <div className="field">
                <label htmlFor="checkin">Check-In Date</label>
                <input
                  type="date"
                  id="checkin"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="checkout">Check-Out Date</label>
                <input
                  type="date"
                  id="checkout"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  required
                />
              </div>

              <div className="field full">
                <label htmlFor="room">Selected Accommodation</label>
                <select
                  id="room"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  required
                >
                  <option value="Standard Room">Standard Room — ₱3,000</option>
                  <option value="Deluxe Room">Deluxe Room — ₱4,500</option>
                  <option value="Studio Room">Studio Room — ₱6,500</option>
                  <option value="Junior Suite">Junior Suite — ₱8,000</option>
                  <option value="Grand Suite">Grand Suite — ₱10,500</option>
                  <option value="Presidential Suite">Presidential Suite — ₱21,500</option>
                </select>
              </div>

              <div className="field">
                <label htmlFor="guests">Guests / Pax</label>
                <input
                  type="number"
                  id="guests"
                  min="1"
                  max="10"
                  value={pax}
                  onChange={(e) => setPax(Number(e.target.value))}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="name">Guest Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="phone">Contact Number</label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="+63..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <h3 className="serif" style={{ fontSize: '1.8rem', color: 'var(--burgundy)', margin: '35px 0 10px' }}>
              Booking Guarantee & Payment Type
            </h3>

            <div className="payment-options">
              <label
                className={`payment-option ${paymentType === 'PAY_NOW' ? 'selected' : ''}`}
                id="payNowOption"
                onClick={() => setPaymentType('PAY_NOW')}
              >
                <input
                  type="radio"
                  name="payment"
                  value="Pay Now"
                  checked={paymentType === 'PAY_NOW'}
                  onChange={() => setPaymentType('PAY_NOW')}
                />
                <div>
                  <strong>Pay Now — Guaranteed Booking</strong>
                  <span>Pay online in advance using GCash, Maya, or a credit/debit card and receive a 10% discount. Your room is guaranteed and will be reserved for you regardless of your arrival time.</span>
                  <span className="discount">10% OFF INSTANT DISCOUNT</span>
                </div>
              </label>

              <label
                className={`payment-option ${paymentType === 'PAY_AT_HOTEL' ? 'selected' : ''}`}
                id="payHotelOption"
                onClick={() => setPaymentType('PAY_AT_HOTEL')}
              >
                <input
                  type="radio"
                  name="payment"
                  value="Pay at Hotel"
                  checked={paymentType === 'PAY_AT_HOTEL'}
                  onChange={() => setPaymentType('PAY_AT_HOTEL')}
                />
                <div>
                  <strong>Pay at Hotel — Standard Rate</strong>
                  <span>Pay upon check-in at the hotel counter at the standard rate. Your room will be held until 6:00 PM unless prior arrangements are made.</span>
                </div>
              </label>
            </div>

            {paymentType === 'PAY_NOW' && (
              <div id="onlineGateway" style={{ marginTop: '20px' }}>
                <div className="field">
                  <label htmlFor="gateway">Online Payment Gateway</label>
                  <select
                    id="gateway"
                    value={gateway}
                    onChange={(e) => setGateway(e.target.value as any)}
                  >
                    <option value="GCASH">GCash</option>
                    <option value="MAYA">Maya</option>
                    <option value="CARD">Credit / Debit Card</option>
                  </select>
                </div>
              </div>
            )}

            <div className="policy">
              <strong>Cancellation Policy:</strong> For paid or guaranteed bookings, cancellations made at least 7 days before the check-in date are fully refundable. Cancellations made within 7 days of check-in are subject to a 50% cancellation fee.
            </div>

            <button
              className="btn btn-primary"
              type="submit"
              disabled={isPending}
              style={{ width: '100%', marginTop: '20px' }}
            >
              {isPending ? 'Processing...' : 'Confirm Booking'}
            </button>
            <p style={{ fontSize: '.72rem', color: '#746668', marginTop: '12px' }}>
              Demo website note: this front-end calculates the booking and shows a confirmation. A real payment gateway and email service must be connected before accepting live payments or sending real confirmation emails.
            </p>
          </form>

          <aside className="summary-card">
            <h3>Booking Summary</h3>
            <div className="summary-line">
              <span>Accommodation</span>
              <strong id="sumRoom">{room || '—'}</strong>
            </div>
            <div className="summary-line">
              <span>Check-In</span>
              <strong id="sumIn">{formatDate(checkIn)}</strong>
            </div>
            <div className="summary-line">
              <span>Check-Out</span>
              <strong id="sumOut">{formatDate(checkOut)}</strong>
            </div>
            <div className="summary-line">
              <span>Guests</span>
              <strong id="sumGuests">{pax}</strong>
            </div>
            <div className="summary-line">
              <span>Nights</span>
              <strong id="sumNights">{nights}</strong>
            </div>
            <div className="summary-line">
              <span>Room Rate</span>
              <strong id="sumRate">{formatMoney(standardTotal)}</strong>
            </div>
            <div className="summary-line">
              <span>10% Discount</span>
              <strong id="sumDiscount">{discountAmount > 0 ? `−${formatMoney(discountAmount)}` : '₱0'}</strong>
            </div>
            <div className="summary-line total">
              <span>Estimated Total</span>
              <strong id="sumTotal">{formatMoney(estimatedTotal)}</strong>
            </div>
            <div className="summary-line total">
              <span>Pay Now Total</span>
              <strong id="payTotal">{formatMoney(payNowTotal)}</strong>
            </div>
            <p className="summary-note">Pay Now applies the 10% instant discount. Pay at Hotel uses the standard rate.</p>
            <div className="policy">
              <strong>Payment:</strong> GCash · Maya · Credit / Debit Card
            </div>
          </aside>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        booking={confirmedBooking}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
