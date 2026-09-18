# System Design Document (SDD)
## Project: Gunita Pamana Hotel — Full-Stack Web Application

**Document Version:** 1.0.0  
**Status:** Approved for Architecture Implementation  
**Framework:** Next.js 14+ (App Router, TypeScript)  
**Database / ORM:** Serverless Postgres (Neon / Vercel Postgres) via Prisma ORM  
**Target Infrastructure:** Vercel Serverless (Free Hobby Tier)  

---

## 1. System Architecture Overview

The system is built as a unified full-stack application using **Next.js App Router** with TypeScript. It leverages Server Components for efficient SEO and initial rendering of room catalogs, Client Components for dynamic form state management, Server Actions and API Route Handlers for backend logic, and Prisma ORM for database interaction with Neon Serverless Postgres.

```
+-----------------------------------------------------------------------------------+
|                                 CLIENT BROWSER                                    |
|                                                                                   |
|  +--------------------+   +-----------------------+   +------------------------+  |
|  | Header & Nav       |   | Rooms & Content Cards |   | Interactive Booking    |  |
|  | (Client Component) |   | (Server Components)   |   | Form & Live Summary    |  |
|  +--------------------+   +-----------------------+   +------------------------+  |
+---------------------------------------|-------------------------------------------+
                                        | HTTP / Server Action Call
                                        v
+-----------------------------------------------------------------------------------+
|                            NEXT.JS SERVER (VERCEL)                                |
|                                                                                   |
|  +---------------------------------+      +------------------------------------+  |
|  |  Server Actions & API Routes    |      |  Zod Validator & Server Price      |  |
|  |  - app/actions/booking.ts       | ---> |  Calculation Engine                |  |
|  |  - app/api/bookings/route.ts    |      |  (Calculates Subtotal & 10% Disc.)  |  |
|  +---------------------------------+      +------------------------------------+  |
|                  |                                                                |
|                  v                                                                |
|  +---------------------------------+                                              |
|  |  Prisma Client (ORM Layer)      |                                              |
|  +---------------------------------+                                              |
+------------------|----------------------------------------------------------------+
                   | Serverless Database Connection (Pooled Connection string)
                   v
+-----------------------------------------------------------------------------------+
|                        NEON / VERCEL SERVERLESS POSTGRES                          |
|                                                                                   |
|  +---------------------------------+      +------------------------------------+  |
|  |  Room Table                     |      |  Booking Table                     |  |
|  |  (6 Pre-populated Room Types)   |      |  (Stateful Reservation Records)    |  |
|  +---------------------------------+      +------------------------------------+  |
+-----------------------------------------------------------------------------------+
```

---

## 2. Database Schema Design (Prisma)

The application database schema is defined in `prisma/schema.prisma`. It models room inventory (`Room`) and customer reservations (`Booking`).

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum PaymentType {
  PAY_NOW
  PAY_AT_HOTEL
}

enum PaymentGateway {
  GCASH
  MAYA
  CARD
  NONE
}

enum BookingStatus {
  PENDING
  CONFIRMED
  CANCELLED
  COMPLETED
}

model Room {
  id            String    @id @default(cuid())
  slug          String    @unique
  name          String
  badge         String
  pricePerNight Decimal   @db.Decimal(10, 2)
  description   String
  amenities     String[]  // Array of amenity strings (e.g. ["Larger room", "Wi-Fi"])
  capacity      Int       @default(2)
  imageUrl      String?   // Optional URL or asset path
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  bookings      Booking[]

  @@map("rooms")
}

model Booking {
  id              String         @id @default(cuid())
  referenceCode   String         @unique // Format: GP-2026-XXXX
  checkIn         DateTime
  checkOut        DateTime
  nights          Int
  pax             Int            @default(2)
  guestName       String
  guestEmail      String
  guestPhone      String
  
  roomId          String
  room            Room           @relation(fields: [roomId], references: [id])
  
  paymentType     PaymentType    @default(PAY_NOW)
  paymentGateway  PaymentGateway @default(NONE)
  
  standardTotal   Decimal        @db.Decimal(10, 2)
  discountAmount  Decimal        @db.Decimal(10, 2)
  finalTotal      Decimal        @db.Decimal(10, 2)
  
  status          BookingStatus  @default(CONFIRMED)
  
  createdAt       DateTime       @default(now())
  updatedAt       DateTime       @updatedAt

  @@map("bookings")
}
```

---

## 3. Seed Data Specification (`prisma/seed.ts`)

The seed script initializes the 6 room records with exact pricing and data from the static HTML mockup:

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const initialRooms = [
  {
    slug: 'standard-room',
    name: 'Standard Room',
    badge: 'Classic Comfort',
    pricePerNight: 3000.00,
    description: 'A warm and welcoming room designed for comfort and simplicity, ideal for solo travelers or couples.',
    capacity: 2,
    amenities: [
      'Cozy queen bed',
      'Private bathroom',
      'Wi-Fi',
      'Television',
      'Air conditioning',
      'Work desk',
      'Coffee & tea',
      'Toiletries'
    ]
  },
  {
    slug: 'deluxe-room',
    name: 'Deluxe Room',
    badge: 'Elevated Space',
    pricePerNight: 4500.00,
    description: 'Enjoy a little more space and comfort with refined furniture, warm lighting, and carefully selected Filipino-inspired details.',
    capacity: 2,
    amenities: [
      'Larger room',
      'Premium bedding',
      'Private bathroom',
      'Wi-Fi',
      'Television',
      'Work desk',
      'Coffee & tea',
      'Bottled water',
      'Toiletries',
      'Housekeeping'
    ]
  },
  {
    slug: 'studio-room',
    name: 'Studio Room',
    badge: 'Flexible Living',
    pricePerNight: 6500.00,
    description: 'An open and comfortable living space with a small kitchen area, designed for flexibility and longer stays.',
    capacity: 2,
    amenities: [
      'Open living space',
      'Small kitchen',
      'Comfortable bed',
      'Dining area',
      'Private bathroom',
      'Wi-Fi',
      'Air conditioning',
      'Refrigerator',
      'Kitchen facilities',
      'Toiletries'
    ]
  },
  {
    slug: 'junior-suite',
    name: 'Junior Suite',
    badge: 'Relaxed Luxury',
    pricePerNight: 8000.00,
    description: 'A spacious retreat combining a comfortable sleeping area with a cozy sitting space for relaxing, working, and enjoying a more elevated stay.',
    capacity: 3,
    amenities: [
      'Spacious bedroom',
      'Sitting area',
      'Premium bedding',
      'Private bathroom',
      'Work desk',
      'Wi-Fi',
      'Television',
      'Coffee & tea',
      'Bottled water',
      'Toiletries'
    ]
  },
  {
    slug: 'grand-suite',
    name: 'Grand Suite',
    badge: 'Refined Retreat',
    pricePerNight: 10500.00,
    description: 'A generous retreat for guests who value comfort, privacy, and refined surroundings, with separate areas for relaxing and sleeping.',
    capacity: 4,
    amenities: [
      'Spacious bedroom',
      'Separate living area',
      'Premium linens',
      'Lounge furniture',
      'Private bathroom',
      'Work desk',
      'Wi-Fi',
      'Refrigerator',
      'Coffee & tea',
      'Housekeeping'
    ]
  },
  {
    slug: 'presidential-suite',
    name: 'Presidential Suite',
    badge: 'Our Highest Tier',
    pricePerNight: 21500.00,
    description: 'The highest level of accommodation at Gunita Pamana Hotel, designed for an exceptional stay with generous spaces and elevated comfort.',
    capacity: 6,
    amenities: [
      'Multiple bedrooms',
      'Spacious living room',
      'Dining area',
      'Premium furnishings',
      'Luxury bathrooms',
      'Work area',
      'Wi-Fi',
      'Refrigerator',
      'Premium toiletries',
      'Service on request'
    ]
  }
];

async function main() {
  console.log('Seeding Gunita Pamana rooms database...');
  for (const roomData of initialRooms) {
    await prisma.room.upsert({
      where: { slug: roomData.slug },
      update: roomData,
      create: roomData,
    });
  }
  console.log('Seeding complete! 6 rooms created/updated.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

---

## 4. Business Logic & Server Calculation Engine

To guarantee security against front-end JavaScript manipulation, all prices and discounts are re-computed on the server inside the `createBooking` Server Action.

### 4.1. Calculation Formula
```typescript
function calculateBookingPrice(
  pricePerNight: number,
  checkIn: Date,
  checkOut: Date,
  paymentType: 'PAY_NOW' | 'PAY_AT_HOTEL'
) {
  const msPerDay = 1000 * 60 * 60 * 24;
  const nights = Math.max(0, Math.round((checkOut.getTime() - checkIn.getTime()) / msPerDay));
  
  if (nights <= 0) {
    throw new Error('Check-out date must be after check-in date.');
  }

  const standardTotal = pricePerNight * nights;
  const discountAmount = paymentType === 'PAY_NOW' ? standardTotal * 0.10 : 0;
  const finalTotal = standardTotal - discountAmount;

  return { nights, standardTotal, discountAmount, finalTotal };
}
```

### 4.2. Reference Code Generation
```typescript
function generateBookingReference(): string {
  const randomHex = Math.floor(1000 + Math.random() * 9000).toString();
  return `GP-2026-${randomHex}`;
}
```

---

## 5. API & Server Actions Interface

### 5.1. `createBooking(input: CreateBookingInput)` Server Action
- **Path**: `app/actions/bookingActions.ts`
- **Validation (Zod Schema)**:
  ```typescript
  export const bookingSchema = z.object({
    checkIn: z.string().min(1, 'Check-in date is required'),
    checkOut: z.string().min(1, 'Check-out date is required'),
    roomId: z.string().min(1, 'Please select a room'),
    pax: z.coerce.number().min(1, 'At least 1 guest required'),
    guestName: z.string().min(2, 'Guest name is required'),
    guestEmail: z.string().email('Valid email is required'),
    guestPhone: z.string().min(7, 'Valid contact number is required'),
    paymentType: z.enum(['PAY_NOW', 'PAY_AT_HOTEL']),
    paymentGateway: z.enum(['GCASH', 'MAYA', 'CARD', 'NONE']).optional(),
  });
  ```
- **Flow**:
  1. Parse & validate input with Zod.
  2. Fetch `Room` from DB by `roomId`.
  3. Calculate nights, subtotal, discount, and final total.
  4. Generate `GP-2026-XXXX` reference code.
  5. Insert `Booking` record into DB via `prisma.booking.create()`.
  6. Return `{ success: true, booking: ... }` to Client Component to display modal.

### 5.2. Admin API Endpoints
- `GET /api/admin/bookings`: Returns all bookings ordered by `createdAt desc`.
- `PATCH /api/admin/bookings/[id]`: Updates booking status (`PENDING`, `CONFIRMED`, `CANCELLED`, `COMPLETED`).

---

## 6. Directory Structure Blueprint

```
c:/Denzy/Gunita Pamana/
├── .env.example
├── .gitignore
├── AGENTS.md
├── README.md
├── docs/
│   ├── design.md
│   ├── prd.md
│   └── sdd.md
├── package.json
├── postcss.config.js
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── tailwind.config.ts
├── tsconfig.json
└── src/
    ├── app/
    │   ├── actions/
    │   │   └── bookingActions.ts
    │   ├── admin/
    │   │   └── bookings/
    │   │       └── page.tsx
    │   ├── api/
    │   │   ├── admin/
    │   │   │   └── bookings/
    │   │   │       ├── [id]/route.ts
    │   │   │       └── route.ts
    │   │   └── rooms/route.ts
    │   ├── favicon.ico
    │   ├── globals.css
    │   ├── layout.tsx
    │   └── page.tsx
    ├── components/
    │   ├── AboutSection.tsx
    │   ├── AmenitiesSection.tsx
    │   ├── BookingSection.tsx
    │   ├── ConciergeSection.tsx
    │   ├── ConfirmationModal.tsx
    │   ├── DiningSection.tsx
    │   ├── Footer.tsx
    │   ├── Header.tsx
    │   ├── HeroSection.tsx
    │   └── RoomsSection.tsx
    └── lib/
        ├── prisma.ts
        └── utils.ts
```

---

## 7. Environment Variables & Vercel Deployment Setup

### 7.1. `.env` Environment Template
```env
# Neon / Vercel Serverless Postgres Connection Strings
DATABASE_URL="postgres://default:xxx@ep-xxx-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&pgbouncer=true"
DIRECT_URL="postgres://default:xxx@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require"

# Optional App Secret & Admin Config
ADMIN_SECRET_KEY="gunita-pamana-admin-secret-2026"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 7.2. Vercel Build Command Configuration
In `package.json`:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "prisma generate && prisma db push && next build",
    "start": "next start",
    "lint": "next lint",
    "seed": "prisma db seed"
  },
  "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
  }
}
```

- When deploying to Vercel Hobby tier, setting `DATABASE_URL` and `DIRECT_URL` automatically executes Prisma migration pushes and seeds database inventory seamlessly during build time.
