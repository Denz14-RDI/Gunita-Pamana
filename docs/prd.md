# Product Requirements Document (PRD)
## Project: Gunita Pamana Hotel — Full-Stack Web Application

**Document Version:** 1.0.0  
**Status:** Approved for Development  
**Target Platform:** Web (Desktop & Mobile)  
**Deployment Target:** Vercel (Free Hobby Tier)  

---

## 1. Executive Summary

**Gunita Pamana Hotel** is a Filipino-inspired 4-star boutique hotel located in Makati, Manila, Philippines. Its brand tagline, *"Where Every Stay Becomes A Memory"*, reflects its core philosophy: blending warm Filipino hospitality (*malasakit*), ancestral heritage (*pamana*), and modern luxury craftsmanship (*likha*).

This project transitions the existing static HTML mockup into a production-ready, full-stack Next.js web application. The platform provides a rich visual story of the hotel, an interactive accommodation catalog with live nightly rates, a comprehensive amenities/dining showcase, a full concierge section, an automated online booking engine with instant payment incentives (10% discount for Pay Now via GCash, Maya, or Card vs. Pay at Hotel), and an administrative portal for staff to view and manage guest reservations.

---

## 2. Product Vision & Key Objectives

1. **Brand Authenticity & Immersion**: Express the warm burgundy, gold, champagne, and ivory visual identity while highlighting Filipino heritage narrative and modern 4-star comfort.
2. **Seamless Reservation Conversion**: Provide a friction-free date picker, room selector, pax manager, payment type selector, and real-time summary calculator.
3. **Zero-Cost Production Hosting**: Architect the application to deploy 100% free on Vercel's Hobby tier using Next.js App Router, Server Actions, and Neon Serverless Postgres via Prisma ORM.
4. **End-to-End Persistence**: Store all room inventory and reservation records in a relational database with strict validation, auto-generated booking references (`GP-2026-XXXX`), and stateful tracking.
5. **Staff Operational Portal**: Include an admin dashboard to monitor guest bookings, filter by status, and update reservation lifecycle states.

---

## 3. User Personas

| Persona | Description | Primary Goal | Key Features Used |
| :--- | :--- | :--- | :--- |
| **Leisure Traveler / Staycationer** | Local resident or balikbayan looking for a refined weekend getaway in Makati. | Book a suite easily with instant discount. | Room catalog, Pay Now 10% discount, GCash/Maya payment options, Confirmation receipt. |
| **International Tourist** | Overseas guest seeking an authentic Filipino cultural experience combined with 4-star luxury. | Explore hotel story, room amenities, and dining options. | About timeline, Hilot Spa details, Dining showcase, Concierge contact. |
| **Hotel Front Desk / Admin** | Hotel reservation staff managing room bookings and check-in schedules. | Track upcoming reservations and manage status. | Admin Dashboard (`/admin/bookings`), status updates (Confirm, Check-In, Cancel). |

---

## 4. Detailed Functional Requirements

### 4.1. Navigation & Header (`FR-1`)
- **Sticky Glassmorphism Header**: Fixed top bar with background blur (`rgba(74,15,27,0.93)`) and champagne border.
- **Brand Logo & Title**: Features hotel emblem and typography ("GUNITA PAMANA HOTEL").
- **Navigation Links**: Smooth-scroll anchors to `#home`, `#about`, `#rooms`, `#dining`, `#amenities`, `#concierge`, and `#booking`.
- **Responsive Mobile Drawer**: Hamburger menu toggle for small viewports (<980px).

### 4.2. Hero Section (`FR-2`)
- **Brand Intro**: Highlighting the hotel logo, main headline (*"Where Every Stay Becomes A Memory"*), and heritage description.
- **Primary CTAs**: "Book Your Stay" (scrolls to booking form) and "Explore Accommodations" (scrolls to rooms).
- **Key Metrics Highlight Strip**:
  - Location: Makati, Manila, Philippines
  - Rating: 4.9 / 5 Guest Rating
  - Service: 24/7 Concierge & Hilot Spa

### 4.3. About & Heritage Story (`FR-3`)
- **Heritage Narrative**: Showcasing the historical journey of Gunita Pamana Hotel.
- **Historical Timeline**:
  - **1912**: Ancestral Roots — Founded as a family estate honoring traditional Filipino architecture.
  - **1974**: Family Residence — Expanded to welcome guests with traditional warmth and heirloom dishes.
  - **2026**: Modern Heritage Hotel — Reimagined into a 4-star luxury destination in Makati.
- **Core Value Cards**:
  - **P**: *Pamana* (Heritage) — Honoring timeless Filipino traditions and architecture.
  - **M**: *Hospitality* (*Malasakit*) — Genuine, attentive care from the heart.
  - **K**: *Craftsmanship* (*Likha*) — Meticulously crafted interiors, textiles, and culinary creations.

### 4.4. Rooms & Rates Catalog (`FR-4`)
Display 6 pre-configured room types dynamically fetched from the database:

| Room Type | Nightly Rate | Description | Key Amenities Highlights |
| :--- | :--- | :--- | :--- |
| **Standard Room** | ₱3,000 | A warm and welcoming room designed for comfort and simplicity, ideal for solo travelers or couples. | Cozy queen bed, Private bathroom, Wi-Fi, Television, Air conditioning, Work desk. |
| **Deluxe Room** | ₱4,500 | Enjoy a little more space and comfort with refined furniture, warm lighting, and Filipino details. | Larger room, Premium bedding, Private bathroom, Coffee & tea, Toiletries. |
| **Studio Room** | ₱6,500 | An open living space with a small kitchen area, designed for flexibility and longer stays. | Open living space, Small kitchen, Refrigerator, Dining area, Kitchen facilities. |
| **Junior Suite** | ₱8,000 | A spacious retreat combining a comfortable sleeping area with a cozy sitting space. | Spacious bedroom, Sitting area, Work desk, Premium bedding, Coffee & tea. |
| **Grand Suite** | ₱10,500 | A generous retreat for guests who value comfort, privacy, and refined surroundings. | Separate living area, Premium linens, Lounge furniture, Refrigerator. |
| **Presidential Suite** | ₱21,500 | The highest level of accommodation with generous spaces and elevated comfort. | Multiple bedrooms, Living room, Dining area, Luxury bathrooms, Premium service. |

- Each card features a badge overlay, rate display (`₱X,XXX / night`), bulleted amenity list with gold diamond bullet points (`✦`), and a "Book This Room" button that auto-selects the room in the reservation form.

### 4.5. Dining Showcase (`FR-5`)
- **Headline**: "A Taste of Filipino Heritage"
- **Description**: Highlighting heirloom recipes reimagined by executive chefs, paired with fine wines in a candlelit atmosphere.
- **CTA**: "Plan Your Stay" button linking to reservations.

### 4.6. Amenities & Experiences (`FR-6`)
Grid of 4 signature hotel experiences:
1. **Hilot Spa Sanctuary** (*Wellness*): Traditional Filipino massage and relaxation care.
2. **Swimming Pool** (*Leisure*): Quiet water escape in a calm setting.
3. **Fitness Center** (*Wellbeing*): Modern gym equipment for active routines.
4. **Dining & Lounge** (*Gather*): Refined seating for meals, drinks, and social moments.

### 4.7. Concierge & Contact (`FR-7`)
- **Contact Details**: Location (Makati, Manila), email placeholder (`reservations@gunitapamana.ph`), phone placeholder (`+63 2 8888 9999`).
- **Direct Concierge Inquiry**: `mailto:` trigger button.
- **Location Map**: Styled placeholder card ready for Google Maps Embed integration.

### 4.8. Interactive Booking Engine (`FR-8`)
- **Form Inputs**:
  - Check-In Date (`input[type="date"]`)
  - Check-Out Date (`input[type="date"]`)
  - Room Selector (`select` populated with the 6 room options)
  - Guest Count / Pax (`input[type="number"]`, default: 2, min: 1)
  - Guest Full Name (`input[type="text"]`)
  - Email Address (`input[type="email"]`)
  - Contact Number (`input[type="tel"]`)
- **Payment Type Selector (Radio Cards)**:
  - **Pay Now — Guaranteed Booking** (Default selected): 10% instant discount applied to nightly rate subtotal. Online gateway dropdown: GCash, Maya, Credit/Debit Card.
  - **Pay at Hotel — Standard Rate**: Standard rate charged upon check-in; room held until 6:00 PM on arrival date.
- **Live Booking Summary Card**:
  - Dynamically calculates:
    - Selected Room Name & Rate
    - Formatted Check-In & Check-Out dates
    - Guest count & Number of Nights (`checkoutDate - checkinDate`)
    - Subtotal Room Rate (`rate * nights`)
    - 10% Discount Amount (If Pay Now)
    - Estimated Final Total (`subtotal - discount`)
- **Cancellation Policy**: Displayed policy notice (Free cancellation up to 7 days before check-in; 50% fee within 7 days).

### 4.9. Reservation Submission & Database Persistence (`FR-9`)
- On form submission:
  - Server Action validates dates (`checkOut > checkin`), guest details, and room validity.
  - Server computes exact pricing (preventing client-side tampering).
  - Generates unique reference code (`GP-2026-XXXX`).
  - Creates `Booking` record in Postgres database via Prisma.
  - Returns booking details to front-end.

### 4.10. Confirmation Receipt & Print View (`FR-10`)
- **Confirmation Modal**: Displays reservation reference code, guest details, room choice, dates, night count, payment method, total cost, and deposit breakdown.
- **Print Action**: Includes a "Print Confirmation" button triggering `@media print` optimized CSS for printing or saving as PDF.

### 4.11. Staff Admin Dashboard (`FR-11`)
- Accessible at `/admin/bookings`.
- Displays all reservations stored in the database.
- Key Table Columns: Reference Code, Guest Name, Contact Info, Room Type, Dates, Nights, Pax, Payment Type & Gateway, Total Price, Status, Date Created.
- Status Management: Allows staff to update booking status between `PENDING`, `CONFIRMED`, `CANCELLED`, and `COMPLETED`.

---

## 5. Non-Functional Requirements (NFR)

1. **Performance & Vercel Free Tier Optimization**:
   - Server-side rendering (SSR) for static content and room catalog.
   - Dynamic client components for interactive booking form.
   - Zero unnecessary external heavy JS bundles. Target <100kB first-load JS.
2. **Security & Data Integrity**:
   - Strict server-side Zod validation for reservation inputs.
   - Environment variables for database credentials (`DATABASE_URL`, `DIRECT_URL`).
   - Sanitation of all user inputs to prevent SQL injection & XSS.
3. **Accessibility & Design Compliance**:
   - WCAG 2.1 AA contrast ratio adherence (Burgundy `#4A0F1B` on Ivory `#F5EBDD`).
   - Screen-reader accessible form labels and aria attributes (`aria-expanded`, `aria-label`).
4. **Browser & Mobile Responsiveness**:
   - Seamless performance across Google Chrome, Safari, Firefox, Edge, iOS Safari, and Android Chrome.

---

## 6. Technical Stack Summary

- **Framework**: Next.js 14+ (App Router, TypeScript)
- **Styling**: Tailwind CSS (Custom theme extension mapping mockup variables)
- **Database**: Neon Serverless Postgres / Vercel Postgres
- **ORM**: Prisma ORM with migrations & seed script
- **Form Validation**: Zod
- **Hosting**: Vercel Hobby Tier (Free)
