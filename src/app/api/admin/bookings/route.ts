import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        room: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      bookings: bookings.map((b) => ({
        id: b.id,
        referenceCode: b.referenceCode,
        guestName: b.guestName,
        guestEmail: b.guestEmail,
        guestPhone: b.guestPhone,
        roomName: b.room.name,
        checkIn: b.checkIn,
        checkOut: b.checkOut,
        nights: b.nights,
        pax: b.pax,
        paymentType: b.paymentType,
        paymentGateway: b.paymentGateway,
        standardTotal: Number(b.standardTotal),
        discountAmount: Number(b.discountAmount),
        finalTotal: Number(b.finalTotal),
        status: b.status,
        createdAt: b.createdAt,
      })),
    });
  } catch (error: any) {
    console.error('Fetch Admin Bookings Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bookings.' },
      { status: 500 }
    );
  }
}
