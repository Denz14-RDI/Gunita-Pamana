'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { formatMoney, formatDate } from '@/lib/utils';

interface AdminBooking {
  id: string;
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
  paymentGateway: string;
  standardTotal: number;
  discountAmount: number;
  finalTotal: number;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  createdAt: string;
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/bookings');
      const data = await res.json();
      if (data.success) {
        setBookings(data.bookings);
      } else {
        setError(data.error || 'Failed to load bookings');
      }
    } catch (err: any) {
      setError(err.message || 'Error connecting to database');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        fetchBookings();
      } else {
        alert(data.error || 'Failed to update status');
      }
    } catch (err: any) {
      alert(err.message || 'Network error updating status');
    }
  };

  const filteredBookings = bookings.filter((b) => {
    if (filterStatus === 'ALL') return true;
    return b.status === filterStatus;
  });

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'PENDING':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'CANCELLED':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      case 'COMPLETED':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-ivory font-sans text-espresso">
      {/* Admin Top Header */}
      <header className="bg-burgundy text-white py-4 px-6 border-b border-gold/30 shadow-md">
        <div className="container mx-auto max-w-[1280px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-serif font-bold text-xl text-champagne">
              GUNITA PAMANA
            </Link>
            <span className="text-xs uppercase tracking-widest text-champagne-light border-l border-white/20 pl-3">
              Staff Admin Portal
            </span>
          </div>
          <Link
            href="/"
            className="text-xs uppercase tracking-wider text-white hover:text-champagne font-bold bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-colors"
          >
            ← View Guest Website
          </Link>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="container mx-auto max-w-[1280px] px-4 py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="font-serif text-3xl font-bold text-burgundy">
              Reservation Management
            </h1>
            <p className="text-xs sm:text-sm text-[#67585a] mt-1">
              View, filter, and manage guest room reservations stored in the database.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 bg-warmWhite p-1.5 rounded-xl border border-gold/20">
            {['ALL', 'CONFIRMED', 'PENDING', 'CANCELLED', 'COMPLETED'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`text-xs font-bold uppercase tracking-wider px-3.5 py-2 rounded-lg transition-colors ${
                  filterStatus === status
                    ? 'bg-gold text-white shadow-sm'
                    : 'text-burgundy hover:bg-gold/10'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Loading / Error States */}
        {loading && (
          <div className="text-center py-20 bg-warmWhite rounded-2xl border border-gold/20 shadow-card">
            <div className="inline-block w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-sm font-medium text-burgundy">Loading reservations from Postgres...</p>
          </div>
        )}

        {error && (
          <div className="p-6 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl mb-6">
            <strong>Database Error:</strong> {error}
          </div>
        )}

        {/* Bookings Table */}
        {!loading && !error && (
          <div className="bg-white rounded-2xl border border-gold/20 shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-burgundy text-champagne border-b border-gold/20 font-serif text-xs uppercase tracking-wider">
                    <th className="p-4">Reference</th>
                    <th className="p-4">Guest Details</th>
                    <th className="p-4">Accommodation</th>
                    <th className="p-4">Dates & Nights</th>
                    <th className="p-4">Payment</th>
                    <th className="p-4">Total Price</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#dfd0c2]">
                  {filteredBookings.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="text-center py-12 text-[#67585a]">
                        No reservations found.
                      </td>
                    </tr>
                  ) : (
                    filteredBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-warmWhite/60 transition-colors">
                        <td className="p-4 font-mono font-bold text-burgundy text-xs">
                          {b.referenceCode}
                        </td>
                        <td className="p-4">
                          <strong className="block text-espresso">{b.guestName}</strong>
                          <span className="text-xs text-[#67585a] block">{b.guestEmail}</span>
                          <span className="text-xs text-[#67585a] block">{b.guestPhone}</span>
                        </td>
                        <td className="p-4">
                          <span className="font-medium text-burgundy block">{b.roomName}</span>
                          <span className="text-xs text-[#67585a]">{b.pax} Pax</span>
                        </td>
                        <td className="p-4 text-xs">
                          <div className="font-medium text-espresso">
                            {formatDate(b.checkIn)} – {formatDate(b.checkOut)}
                          </div>
                          <span className="text-[#67585a]">{b.nights} {b.nights === 1 ? 'night' : 'nights'}</span>
                        </td>
                        <td className="p-4 text-xs">
                          <span className="font-bold block text-burgundy">
                            {b.paymentType === 'PAY_NOW' ? 'Pay Now (10% OFF)' : 'Pay at Hotel'}
                          </span>
                          <span className="text-[#67585a]">
                            {b.paymentGateway && b.paymentGateway !== 'NONE' ? b.paymentGateway : 'Counter'}
                          </span>
                        </td>
                        <td className="p-4 font-bold text-burgundy">
                          {formatMoney(b.finalTotal)}
                          {b.discountAmount > 0 && (
                            <span className="block text-[0.68rem] text-emerald-700 font-normal">
                              Discount: −{formatMoney(b.discountAmount)}
                            </span>
                          )}
                        </td>
                        <td className="p-4">
                          <span className={`inline-block px-3 py-1 rounded-full text-[0.7rem] font-bold border ${getStatusBadgeClass(b.status)}`}>
                            {b.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <select
                            value={b.status}
                            onChange={(e) => handleUpdateStatus(b.id, e.target.value)}
                            className="text-xs border border-[#d9cbbd] rounded-lg p-1.5 bg-warmWhite focus:border-gold outline-none"
                          >
                            <option value="CONFIRMED">CONFIRMED</option>
                            <option value="PENDING">PENDING</option>
                            <option value="COMPLETED">COMPLETED</option>
                            <option value="CANCELLED">CANCELLED</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
