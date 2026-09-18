'use server';

import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { generateReferenceCode, calculateNights } from '@/lib/utils';

// Booking validation schema
export const bookingSchema = z.object({
  checkIn: z.string().min(1, 'Check-in date is required'),
  checkOut: z.string().min(1, 'Check-out date is required'),
  roomId: z.string().min(1, 'Please select an accommodation'),
  pax: z.coerce.number().min(1, 'At least 1 guest is required'),
  guestName: z.string().min(2, 'Full guest name is required'),
  guestEmail: z.string().email('Valid email address is required'),
  guestPhone: z.string().min(7, 'Valid contact number is required'),
  paymentType: z.enum(['PAY_NOW', 'PAY_AT_HOTEL']),
  paymentGateway: z.enum(['GCASH', 'MAYA', 'CARD', 'NONE']).optional().default('NONE'),
});

export type BookingInput = z.infer<typeof bookingSchema>;

export async function createBooking(input: BookingInput) {
  try {
    // 1. Validate form fields
    const validatedData = bookingSchema.parse(input);

    // 2. Validate dates
    const nights = calculateNights(validatedData.checkIn, validatedData.checkOut);
    if (nights <= 0) {
      return {
        success: false,
        error: 'Check-out date must be after check-in date.',
      };
    }

    // 3. Retrieve room record from database (or matching slug/name)
    let room = await prisma.room.findFirst({
      where: {
        OR: [
          { id: validatedData.roomId },
          { name: validatedData.roomId },
          { slug: validatedData.roomId },
        ],
      },
    });

    // Fallback room matching if DB is using name strings
    if (!room) {
      // Find room by name matching
      const allRooms = await prisma.room.findMany();
      room = allRooms.find(
        (r) => r.name.toLowerCase() === validatedData.roomId.toLowerCase()
      ) || null;
    }

    if (!room) {
      return {
        success: false,
        error: 'Selected room type is invalid or unavailable.',
      };
    }

    // 4. Server-Side Price Security Calculation
    const pricePerNight = Number(room.pricePerNight);
    const standardTotal = pricePerNight * nights;
    const discountAmount = validatedData.paymentType === 'PAY_NOW' ? standardTotal * 0.10 : 0;
    const finalTotal = standardTotal - discountAmount;

    // 5. Generate unique reference code
    const referenceCode = generateReferenceCode();

    // 6. Save reservation to Database
    const newBooking = await prisma.booking.create({
      data: {
        referenceCode,
        checkIn: new Date(`${validatedData.checkIn}T00:00:00`),
        checkOut: new Date(`${validatedData.checkOut}T00:00:00`),
        nights,
        pax: validatedData.pax,
        guestName: validatedData.guestName,
        guestEmail: validatedData.guestEmail,
        guestPhone: validatedData.guestPhone,
        roomId: room.id,
        paymentType: validatedData.paymentType as 'PAY_NOW' | 'PAY_AT_HOTEL',
        paymentGateway: validatedData.paymentType === 'PAY_NOW' 
          ? (validatedData.paymentGateway as 'GCASH' | 'MAYA' | 'CARD') 
          : 'NONE',
        standardTotal,
        discountAmount,
        finalTotal,
        status: 'CONFIRMED',
      },
      include: {
        room: true,
      },
    });

    return {
      success: true,
      booking: {
        id: newBooking.id,
        referenceCode: newBooking.referenceCode,
        checkIn: validatedData.checkIn,
        checkOut: validatedData.checkOut,
        nights: newBooking.nights,
        pax: newBooking.pax,
        guestName: newBooking.guestName,
        guestEmail: newBooking.guestEmail,
        guestPhone: newBooking.guestPhone,
        roomName: newBooking.room.name,
        paymentType: newBooking.paymentType,
        paymentGateway: newBooking.paymentGateway,
        standardTotal: Number(newBooking.standardTotal),
        discountAmount: Number(newBooking.discountAmount),
        finalTotal: Number(newBooking.finalTotal),
        status: newBooking.status,
      },
    };
  } catch (err: any) {
    console.error('Booking Action Error:', err);
    if (err instanceof z.ZodError) {
      return {
        success: false,
        error: err.errors.map((e) => e.message).join(', '),
      };
    }
    return {
      success: false,
      error: err.message || 'An unexpected error occurred while processing your booking.',
    };
  }
}
