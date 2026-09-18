# AGENTS.md — Orchestration Prompt for Autonomous Coding Agent (Google Antigravity)

**Project Name:** Gunita Pamana Hotel — Full-Stack Web Application Rebuild  
**Target Repository:** `c:\Denzy\Gunita Pamana`  
**Primary Specs Source:** `docs/prd.md`, `docs/sdd.md`, `docs/design.md`  

---

## 1. Persona & Master Objective

You are **Google Antigravity**, an elite agentic AI software engineer. Your task is to autonomously build, test, and deliver the **Gunita Pamana Hotel** full-stack web application from the attached specifications in `docs/` with zero manual intervention required by the user.

The final deliverable must be a production-ready Next.js 14+ (App Router, TypeScript) application, styled with Tailwind CSS, wired up to a Serverless Postgres database via Prisma ORM (with 6 room inventory items pre-seeded), featuring an automated booking engine with dynamic discount calculations, confirmation receipt generation, and a functional staff admin dashboard.

---

## 2. Technical Stack & Architectural Constraints

- **Framework**: Next.js 14+ (App Router, TypeScript)
- **Styling**: Tailwind CSS (extending custom palette: `burgundy`, `wine`, `gold`, `champagne`, `ivory`, `espresso`)
- **Database**: Serverless Postgres (Neon / Vercel Postgres)
- **ORM**: Prisma ORM (schema in `prisma/schema.prisma`, seed script in `prisma/seed.ts`)
- **Form & Server Validation**: Zod (`bookingSchema`)
- **Hosting Target**: Vercel Free Hobby Tier

---

## 3. Autonomous Execution Rules & Guidelines

1. **Strict Spec Compliance**: Never invent or alter room rates, descriptions, discount percentages, or design tokens. Follow `docs/prd.md`, `docs/sdd.md`, and `docs/design.md` explicitly.
2. **Server-Side Price Security**: Always recalculate room rates, night counts, 10% discounts, and total prices on the server inside Server Actions (`app/actions/bookingActions.ts`).
3. **No Guessing File Paths or Schemas**: Use the directory layout specified in `docs/sdd.md`.
4. **Mandatory Build Verification**: After completing each phase, execute build validation (`npm run build`, `npx prisma validate`) to ensure zero TypeScript, linting, or runtime errors.

---

## 4. Phase Breakdown & AI Dependency Risk Prioritization

To build efficiently without breaking dependencies, tasks are ordered according to their structural risk and prerequisite hierarchy:

```
+-----------------------------------------------------------------------------------+
|  PHASE 1: Project Init, Database Schema & Seed Data                              |
|  [Risk: High | Priority: 1] -> Establishes data types and room records foundation  |
+-----------------------------------------------------------------------------------+
                                         |
                                         v
+-----------------------------------------------------------------------------------+
|  PHASE 2: Design System, Tailwind Setup & Shared Layout                          |
|  [Risk: Medium | Priority: 2] -> Theme tokens, Header glassmorphic nav & Footer   |
+-----------------------------------------------------------------------------------+
                                         |
                                         v
+-----------------------------------------------------------------------------------+
|  PHASE 3: Public Content Components (Hero, Story, Rooms, Dining, Amenities)       |
|  [Risk: Low | Priority: 3] -> UI presentation & DB-driven Room Catalog rendering |
+-----------------------------------------------------------------------------------+
                                         |
                                         v
+-----------------------------------------------------------------------------------+
|  PHASE 4: Interactive Booking Engine & Server Actions                             |
|  [Risk: High | Priority: 4] -> Date math, Live summary, Zod & Prisma persistence |
+-----------------------------------------------------------------------------------+
                                         |
                                         v
+-----------------------------------------------------------------------------------+
|  PHASE 5: Booking Confirmation Receipt & Printable View                           |
|  [Risk: Low | Priority: 5] -> Confirmation modal, GP-2026-XXXX reference, print   |
+-----------------------------------------------------------------------------------+
                                         |
                                         v
+-----------------------------------------------------------------------------------+
|  PHASE 6: Staff Admin Reservation Dashboard (/admin/bookings)                     |
|  [Risk: Medium | Priority: 6] -> Reservation table & status management actions    |
+-----------------------------------------------------------------------------------+
                                         |
                                         v
+-----------------------------------------------------------------------------------+
|  PHASE 7: Final Build Verification & Vercel Deployment Preps                      |
|  [Risk: High | Priority: 7] -> Zero-error build, Prisma push script & Vercel env |
+-----------------------------------------------------------------------------------+
```

---

## 5. Step-by-Step Task Execution Blueprint

### Phase 1: Environment Setup, Database Schema & Seed Data
- [ ] **Task 1.1**: Initialize Next.js 14+ App Router project with TypeScript and Tailwind CSS in `src/`.
- [ ] **Task 1.2**: Install core dependencies: `@prisma/client`, `prisma`, `zod`, `clsx`, `tailwind-merge`, `ts-node`.
- [ ] **Task 1.3**: Create `prisma/schema.prisma` with `Room` and `Booking` models as defined in `docs/sdd.md`.
- [ ] **Task 1.4**: Create `src/lib/prisma.ts` singleton instance for Prisma Client.
- [ ] **Task 1.5**: Create `prisma/seed.ts` containing the 6 room records (Standard ₱3,000, Deluxe ₱4,500, Studio ₱6,500, Junior Suite ₱8,000, Grand Suite ₱10,500, Presidential Suite ₱21,500).
- [ ] **Task 1.6**: Run `npx prisma db push && npx prisma db seed` to verify DB schema and seed execution.

### Phase 2: Design System & Shared Layout Setup
- [ ] **Task 2.1**: Update `tailwind.config.ts` with custom color palette (`burgundy`, `wine`, `gold`, `champagne`, `ivory`, `espresso`, `blush`) and font definitions (`serif`, `sans`).
- [ ] **Task 2.2**: Configure `src/app/globals.css` with smooth scrolling, root design tokens, and utility resets.
- [ ] **Task 2.3**: Create `src/components/Header.tsx` featuring fixed glassmorphism nav (`bg-burgundy/90 backdrop-blur-md`), brand title, navigation anchors, and responsive mobile menu drawer.
- [ ] **Task 2.4**: Create `src/components/Footer.tsx` with hotel brand intro, navigation links, concierge contact details, and copyright bar.

### Phase 3: Public Content Components
- [ ] **Task 3.1**: Create `src/components/HeroSection.tsx` with gradient background, emblem drop-shadow, tagline, CTA buttons, and bottom metrics strip (Makati Manila location, 4.9/5 rating, 24/7 Concierge).
- [ ] **Task 3.2**: Create `src/components/AboutSection.tsx` featuring heritage story timeline (`1912`, `1974`, `2026`) and value cards (*Pamana*, *Malasakit*, *Likha*).
- [ ] **Task 3.3**: Create `src/components/RoomsSection.tsx` fetching room records from DB / Server Component and rendering 6 room cards with badges, prices, ✦ amenity bullets, and "Book This Room" CTAs.
- [ ] **Task 3.4**: Create `src/components/DiningSection.tsx` featuring "A Taste of Filipino Heritage" showcase card and culinary narrative.
- [ ] **Task 3.5**: Create `src/components/AmenitiesSection.tsx` displaying the 4 experience cards (Hilot Spa Sanctuary, Swimming Pool, Fitness Center, Dining Lounge).
- [ ] **Task 3.6**: Create `src/components/ConciergeSection.tsx` with contact cards and location map placeholder.

### Phase 4: Interactive Booking Engine & Server Actions
- [ ] **Task 4.1**: Create `src/app/actions/bookingActions.ts` implementing `createBooking()` Server Action:
  - Zod validation for check-in/out dates, guest details, payment type, gateway.
  - Night count computation (`checkOut - checkIn`).
  - Server-side price calculation: `subtotal`, `10% discount` if `PAY_NOW`, `finalTotal`.
  - Reference code generation: `GP-2026-XXXX`.
  - Prisma database insertion.
- [ ] **Task 4.2**: Create `src/components/BookingSection.tsx` Client Component:
  - Form state management for check-in, check-out, room choice, pax, guest name, email, phone.
  - Payment option radio cards ("Pay Now — 10% OFF" vs "Pay at Hotel").
  - Gateway selector (GCash, Maya, Card).
  - Real-time reactive Booking Summary card updating nights, rate, discount, and total.
  - Submission handler calling `createBooking()` action.

### Phase 5: Confirmation Modal & Printable View
- [ ] **Task 5.1**: Create `src/components/ConfirmationModal.tsx`:
  - Modal overlay rendered upon successful reservation creation.
  - Displays unique `GP-2026-XXXX` reference code, guest details, room, dates, payment type, price breakdown.
  - "Print Confirmation" button triggering `@media print` print dialog.

### Phase 6: Staff Admin Reservation Dashboard
- [ ] **Task 6.1**: Create `src/app/api/admin/bookings/route.ts` and `[id]/route.ts` for fetching and updating reservation status.
- [ ] **Task 6.2**: Create `src/app/admin/bookings/page.tsx`:
  - Table displaying all reservations stored in DB.
  - Status badges (`CONFIRMED`, `PENDING`, `CANCELLED`, `COMPLETED`).
  - Action buttons to update reservation status in real time.

### Phase 7: Verification & Final Polish
- [ ] **Task 7.1**: Test complete user flow locally (`npm run dev`).
- [ ] **Task 7.2**: Run `npm run build` to verify zero build errors, zero TypeScript issues, and valid page route exports.
- [ ] **Task 7.3**: Create `.env.example` documenting database connection keys for Vercel Hobby tier deployment.

---

## 6. Definition of Done (DoD)

The agent work is complete when:
1. `npm run build` compiles with 0 errors.
2. All 6 room types and rates from the mockup are stored in Postgres via Prisma seed.
3. Submitting a reservation calculates the correct 10% discount for "Pay Now", saves the booking to the DB with a `GP-2026-XXXX` code, and shows the printable confirmation modal.
4. `/admin/bookings` correctly lists reservations and allows status updates.
5. All docs in `docs/` match the working code.
