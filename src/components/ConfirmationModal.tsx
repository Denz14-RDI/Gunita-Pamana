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
    <div className="fixed inset-0 z-50 bg-espresso/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div
        id="printableModalBox"
        className="w-full max-w-xl bg-warmWhite rounded-2xl p-6 sm:p-8 shadow-modal border border-gold/20 relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-2xl font-bold text-burgundy hover:text-gold transition-colors no-print"
          aria-label="Close modal"
        >
          ×
        </button>

        {/* Modal Header */}
        <div className="text-center sm:text-left">
          <span className="text-xs uppercase tracking-[3px] text-gold font-bold">
            Reservation Received
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-burgundy font-medium mt-1">
            Your Stay Is Confirmed
          </h2>
          <p className="text-xs sm:text-sm text-[#67585a] mt-1">
            Thank you for choosing Gunita Pamana Hotel. Your reservation has been recorded.
          </p>
        </div>

        {/* Confirmation Details Card */}
        <div className="my-6 p-5 sm:p-6 bg-ivory-dark rounded-xl border border-gold/20 space-y-2.5 text-sm">
          <div className="flex justify-between items-center pb-2 border-b border-[#d9cbbd]">
            <span className="text-xs uppercase tracking-wider text-[#67585a]">Reference Code</span>
            <strong className="font-serif text-lg text-burgundy font-bold tracking-wider">
              {booking.referenceCode}
            </strong>
          </div>

          <div className="flex justify-between items-center py-1">
            <span className="text-[#67585a]">Guest Name</span>
            <strong className="text-burgundy font-medium">{booking.guestName}</strong>
          </div>

          <div className="flex justify-between items-center py-1">
            <span className="text-[#67585a]">Contact Info</span>
            <span className="text-xs text-[#67585a]">{booking.guestEmail} · {booking.guestPhone}</span>
          </div>

          <div className="flex justify-between items-center py-1">
            <span className="text-[#67585a]">Accommodation</span>
            <strong className="text-burgundy font-medium">{booking.roomName}</strong>
          </div>

          <div className="flex justify-between items-center py-1">
            <span className="text-[#67585a]">Stay Dates</span>
            <span className="font-medium text-burgundy">
              {formatDate(booking.checkIn)} – {formatDate(booking.checkOut)} ({booking.nights} {booking.nights === 1 ? 'night' : 'nights'})
            </span>
          </div>

          <div className="flex justify-between items-center py-1">
            <span className="text-[#67585a]">Guests</span>
            <span className="font-medium text-burgundy">{booking.pax} Pax</span>
          </div>

          <div className="flex justify-between items-center py-1">
            <span className="text-[#67585a]">Payment Method</span>
            <strong className="text-burgundy font-medium">
              {booking.paymentType === 'PAY_NOW'
                ? `Pay Now (${booking.paymentGateway || 'Online Gateway'})`
                : 'Pay at Hotel (Counter)'}
            </strong>
          </div>

          {/* Pricing Breakdown */}
          <div className="pt-3 mt-2 border-t border-[#d9cbbd] space-y-1.5">
            <div className="flex justify-between text-xs text-[#67585a]">
              <span>Subtotal Rate:</span>
              <span>{formatMoney(booking.standardTotal)}</span>
            </div>
            {booking.discountAmount > 0 && (
              <div className="flex justify-between text-xs text-emerald-700 font-medium">
                <span>10% Instant Discount:</span>
                <span>−{formatMoney(booking.discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-bold text-burgundy pt-1">
              <span>Total Amount:</span>
              <span className="text-gold font-serif">{formatMoney(booking.finalTotal)}</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-[#6d6062] italic mb-6 no-print">
          A confirmation receipt has been generated for your record. Please present reference code <strong className="text-burgundy font-semibold">{booking.referenceCode}</strong> upon check-in.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 no-print">
          <button
            onClick={onClose}
            className="flex-1 bg-gold hover:bg-burgundy text-white font-bold text-xs uppercase tracking-[1.5px] py-3.5 px-6 rounded-full border border-gold transition-colors shadow-sm"
          >
            Done
          </button>
          <button
            onClick={handlePrint}
            className="flex-1 bg-transparent hover:bg-burgundy hover:text-white text-burgundy font-bold text-xs uppercase tracking-[1.5px] py-3.5 px-6 rounded-full border border-burgundy transition-colors"
          >
            Print Confirmation
          </button>
        </div>
      </div>
    </div>
  );
}
