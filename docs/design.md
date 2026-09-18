# UI Design Specification & Design System
## Project: Gunita Pamana Hotel — Full-Stack Web Application

**Document Version:** 1.0.0  
**Status:** Approved for Implementation  
**Styling Framework:** Tailwind CSS (with custom theme extensions)  
**Target Design Aesthetic:** Modern Filipino Heritage & 4-Star Luxury  

---

## 1. Framework Choice & Deep Justification

The original static mockup was built using custom vanilla CSS rules mimicking Bootstrap utility patterns. For the full-stack Next.js App Router rebuild, we evaluated **Tailwind CSS** vs **Bootstrap**. 

### 1.1. Framework Comparison Matrix

| Evaluation Criteria | Tailwind CSS (Chosen Option) | Bootstrap |
| :--- | :--- | :--- |
| **Custom Brand Palette Alignment** | **Superior**: Native support for custom CSS variables (`var(--burgundy)`, `var(--gold)`) and utility extensions in `tailwind.config.ts`. | **Moderate**: Requires overriding Bootstrap's opinionated primary/secondary color maps in SASS or custom CSS. |
| **CSS Bundle Size & Performance** | **Optimal**: Automatic Just-In-Time (JIT) compilation produces tiny, tree-shaken CSS files (<15kB), perfect for Vercel free tier limits. | **Suboptimal**: Includes unused component classes and heavy base stylesheet (~150kB minified). |
| **Next.js App Router Integration** | **Native**: Default recommendation for Next.js with zero-config PostCSS integration and Server Component compatibility. | **Manual**: Requires importing Bootstrap JS bundle (which can cause hydration mismatch warnings with Server Components). |
| **Bespoke UI Flexibility** | **Complete Freedom**: Easily create custom glassmorphism, responsive grids, and decorative borders without class name conflicts. | **Restricted**: Rigid component structures (navbars, cards) that look recognizably "Bootstrap". |

### 1.2. Final Decision & Justification
**Tailwind CSS is selected as the primary styling framework.** It allows us to preserve and enhance the bespoke burgundy/gold/champagne aesthetic of the static mockup while benefiting from zero runtime overhead, instant CSS purge, and seamless Next.js App Router DX.

---

## 2. Color Palette & Design Tokens

The visual identity of Gunita Pamana Hotel is rooted in warm, rich Filipino heritage tones. The CSS custom properties from the mockup are translated into a custom Tailwind configuration.

### 2.1. Color Tokens (`tailwind.config.ts`)

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          DEFAULT: '#4A0F1B',
          dark: '#36080E',
          light: '#5E1523',
        },
        wine: {
          DEFAULT: '#681B2A',
        },
        gold: {
          DEFAULT: '#B08A52',
          hover: '#967440',
        },
        champagne: {
          DEFAULT: '#D8BE88',
          light: '#EAD8B7',
        },
        ivory: {
          DEFAULT: '#F5EBDD',
          dark: '#F0E4D5',
        },
        blush: {
          DEFAULT: '#C89A9A',
        },
        espresso: {
          DEFAULT: '#241719',
        },
        warmWhite: {
          DEFAULT: '#fffaf3',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
        sans: ['Segoe UI', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '22px',
        '3xl': '28px',
      },
      boxShadow: {
        luxury: '0 18px 50px rgba(36,23,25,0.14)',
        card: '0 8px 28px rgba(36,23,25,0.06)',
        modal: '0 25px 80px rgba(0,0,0,0.3)',
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## 3. Typography System

The typography contrasts timeless elegance (serif headers) with legibility (sans-serif body text).

- **Headings (`h1`, `h2`, `h3`, `h4`, `.font-serif`)**:
  - Font Family: `Georgia`, `Times New Roman`, serif
  - Color: `var(--burgundy)` (`#4A0F1B`) on light backgrounds; `var(--champagne)` (`#D8BE88`) on dark burgundy sections.
  - Weight: Medium (`font-normal` or `font-medium`)
- **Body & Controls (`body`, `p`, `input`, `button`)**:
  - Font Family: `Segoe UI`, `Arial`, sans-serif
  - Color: `var(--espresso)` (`#241719`) or `#67585a` for subtext.
  - Line Height: `1.7` (`leading-relaxed`)
- **Eyebrow Label**:
  - Class: `uppercase tracking-[3px] text-xs font-bold text-gold`

---

## 4. Component UI Specifications

### 4.1. Navigation Header
- **Background**: Glassmorphism with `bg-burgundy/90 backdrop-blur-md border-b border-champagne/20`.
- **Layout**: Container flexbox (`min-h-[78px] flex items-center justify-between px-4`).
- **Brand Emblem**: Circular logo with text "GUNITA PAMANA" and subtitle "HOTEL" in gold champagne.
- **Nav Links**: Text uppercase (`text-xs tracking-[1.5px] uppercase text-white hover:text-champagne transition-colors`).
- **Mobile Drawer**: Animated slide-down or overlay menu when hamburger button (`☰`) is clicked.

### 4.2. Hero Section
- **Background**: Multi-layered linear gradients (`linear-gradient(90deg, rgba(36,8,14,0.82), rgba(74,15,27,0.54), rgba(36,8,14,0.32)), linear-gradient(135deg, #4A0F1B 0%, #681B2A 45%, #241719 100%)`).
- **Decorative Elements**: Pseudo-circle line accents in champagne border.
- **Hero Logo**: Centered emblem with soft drop-shadow (`filter drop-shadow-2xl`).
- **Hero Headline**: `text-4xl md:text-6xl lg:text-7xl font-serif text-white`.
- **Tagline**: `font-serif italic text-champagne text-lg md:text-2xl mt-4 mb-6`.
- **Hero Strip**: Bottom bar (`bg-espresso/70 border-t border-champagne/20`) with 3 grid columns detailing Location, Guest Rating, and Concierge Service.

### 4.3. Story & Values Cards
- **Values Grid**: 3-column grid of cards with subtle border (`border border-gold/20 bg-ivory rounded-2xl p-8 hover:-translate-y-1 hover:shadow-luxury transition-all`).
- **Value Letter Accent**: Large decorative initial (`text-5xl font-serif text-gold`).
- **Story Timeline Box**: Dark burgundy section with gold border, 2-column grid showing year (`1912`, `1974`, `2026`) and narrative text.

### 4.4. Room Cards Grid
- **Card Container**: `bg-warmWhite rounded-2xl overflow-hidden border border-gold/20 shadow-card flex flex-col`.
- **Room Image Banner**: Decorative gradient box (`bg-gradient-to-br from-wine to-gold h-[230px] relative p-4 flex items-end`) with inner white border frame (`inset-4 border border-white/30 rounded-xl`).
- **Badge Tag**: `uppercase tracking-widest text-[0.68rem] text-white font-bold z-10`.
- **Room Title**: `text-2xl font-serif text-burgundy mt-4`.
- **Price Tag**: `text-gold font-extrabold text-lg my-2` (e.g. `₱4,500 / night`).
- **Amenity Bullets**: 2-column grid of items (`text-xs text-[#65575a] flex items-center gap-1.5`). Bullet character: `✦` in gold.
- **Button CTA**: "Book This Room" pill button (`bg-gold text-white hover:bg-burgundy rounded-full py-3 px-6 text-xs font-bold uppercase tracking-wider transition-colors w-full mt-auto`).

### 4.5. Interactive Booking Engine
- **Layout**: 2-column split (`grid grid-cols-1 lg:grid-cols-12 gap-8 items-start`). Left form takes 7 cols (`lg:col-span-7`), sticky summary takes 5 cols (`lg:col-span-5`).
- **Form Card**: `bg-white border border-gold/20 rounded-2xl p-8 shadow-card`.
- **Input Fields**: Standardized styling:
  - Class: `border border-[#d9cbbd] bg-warmWhite rounded-lg p-3 text-espresso focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none w-full text-sm`.
- **Payment Option Cards**:
  - Container: `border border-[#dfd0c2] rounded-xl p-4 flex gap-3 cursor-pointer transition-all`.
  - Selected State: `border-gold bg-[#fbf3e8] shadow-sm`.
  - Discount Tag: `inline-block mt-2 px-2.5 py-1 rounded-full bg-champagne-light text-burgundy text-[0.68rem] font-extrabold tracking-wide`.
- **Sticky Summary Card**:
  - Class: `sticky top-24 bg-burgundy text-white rounded-2xl p-8 shadow-luxury`.
  - Lines: Flexbox space-between (`flex justify-between items-center py-2.5 border-b border-white/12 text-sm`).
  - Total Line: Large text (`text-xl font-bold border-b-0 pt-4 text-champagne`).

### 4.6. Confirmation Modal & Printable Receipt
- **Modal Overlay**: `fixed inset-0 bg-espresso/75 z-50 flex items-center justify-center p-4 backdrop-blur-sm`.
- **Modal Box**: `w-full max-w-xl bg-warmWhite rounded-2xl p-8 shadow-modal text-espresso`.
- **Receipt Box**: `bg-ivory-dark rounded-xl p-6 my-6 border border-gold/20 text-sm font-sans`.
- **Print Stylesheet (`@media print`)**:
  ```css
  @media print {
    body * {
      visibility: hidden;
    }
    #confirmationModal, #confirmationModal * {
      visibility: visible;
    }
    #confirmationModal {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      background: white !important;
      color: black !important;
    }
    .modal-box {
      box-shadow: none !important;
      border: 1px solid #ccc !important;
    }
    button {
      display: none !important;
    }
  }
  ```

### 4.7. Admin Dashboard UI (`/admin/bookings`)
- **Header Bar**: Displays "Gunita Pamana Hotel — Admin Portal".
- **Data Table**: Clean tabular layout:
  - Headers: Reference Code, Guest Name, Room, Check-In / Out, Nights, Pax, Payment Type & Gateway, Total, Status, Action.
  - Status Badges:
    - `CONFIRMED`: `bg-emerald-100 text-emerald-800 border-emerald-300`
    - `PENDING`: `bg-amber-100 text-amber-800 border-amber-300`
    - `CANCELLED`: `bg-rose-100 text-rose-800 border-rose-300`
    - `COMPLETED`: `bg-blue-100 text-blue-800 border-blue-300`

---

## 5. Responsive Layout Matrix

| Breakpoint | Viewport Width | Key Layout Adjustments |
| :--- | :--- | :--- |
| **Mobile (`sm`)** | `<640px` | 1-column layout across all grids. Hero headline `text-3xl`. Sticky summary card becomes inline/static. Mobile navigation hamburger active. |
| **Tablet (`md`)** | `640px - 1024px` | 2-column grid for Room Cards, Values, and Amenities. Form and summary stack vertically. |
| **Desktop (`lg/xl`)** | `>1024px` | Full 3-column room grid, 4-column amenities grid, 2-column booking layout with sticky summary card. Full desktop navbar. |
