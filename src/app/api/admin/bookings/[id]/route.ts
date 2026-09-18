import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { BookingStatus } from '@prisma/client';

export const dynamic = 'force-dynamic';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json();

    if (!Object.values(BookingStatus).includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Invalid booking status value.' },
        { status: 400 }
      );
    }

    const updated = await prisma.booking.update({
      where: { id: params.id },
      data: { status: status as BookingStatus },
      include: { room: true },
    });

    return NextResponse.json({
      success: true,
      booking: updated,
    });
  } catch (error: any) {
    console.error('Update Booking Status Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update booking status.' },
      { status: 500 }
    );
  }
}
