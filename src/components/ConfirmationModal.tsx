'use client';

import React from 'react';
import { formatMoney, formatDate } from '@/lib/utils';

export interface ConfirmedBookingData {
  referenceCode: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  pax: number;
  paymentType: 'PAY_NOW' | 'PAY_AT_HOTEL';
  paymentGateway?: string;
  standardTotal: number;
  discountAmount: number;
  finalTotal: number;
  status: string;
}

interface ConfirmationModalProps {
  isOpen: boolean;
  booking: ConfirmedBookingData | null;
  onClose: () => void;
}

export function ConfirmationModal({ isOpen, booking, onClose }: ConfirmationModalProps) {
  if (!isOpen || !booking) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal show" id="confirmationModal">
      <div className="modal-box">
        <button className="close" onClick={onClose}>×</button>
        <div className="eyebrow">Reservation Received</div>
        <h2>Your Stay Is Confirmed</h2>
        <p style={{ marginTop: '8px' }}>
          Thank you for choosing Gunita Pamana Hotel. Your reservation has been successfully received.
        </p>
        
        <div className="confirm" id="confirmationDetails">
          <p>Reference Code: <strong>{booking.referenceCode}</strong></p>
          <p>Guest Name: <strong>{booking.guestName}</strong></p>
          <p>Email: <strong>{booking.guestEmail}</strong> | Phone: <strong>{booking.guestPhone}</strong></p>
          <p>Accommodation: <strong>{booking.roomName}</strong> ({booking.pax} Guests)</p>
          <p>Dates: <strong>{formatDate(booking.checkIn)}</strong> to <strong>{formatDate(booking.checkOut)}</strong> ({booking.nights} nights)</p>
          <p>Payment Type: <strong>{booking.paymentType === 'PAY_NOW' ? `Pay Now (${booking.paymentGateway || 'Online Gateway'})` : 'Pay at Hotel'}</strong></p>
          <p>Standard Rate: <strong>{formatMoney(booking.standardTotal)}</strong></p>
          {booking.discountAmount > 0 && (
            <p>10% Discount: <strong>−{formatMoney(booking.discountAmount)}</strong></p>
          )}
          <p style={{ marginTop: '10px', fontSize: '1.1rem' }}>
            Final Total Amount: <strong style={{ fontSize: '1.25rem' }}>{formatMoney(booking.finalTotal)}</strong>
          </p>
        </div>

        <p style={{ fontSize: '.8rem', color: '#6d6062' }}>
          A booking confirmation has been prepared for the email address you provided. To send real emails, connect this form to an email service or hotel booking backend.
        </p>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '22px' }}>
          <button className="btn btn-primary" onClick={onClose}>Done</button>
          <button className="btn btn-outline" onClick={handlePrint}>Print Confirmation</button>
        </div>
      </div>
    </div>
  );
}
