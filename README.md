# WanderLux Travel Agency

A full-stack **travel agency web application** with a public-facing website and a complete **Admin Portal** — built with React, Vite, and React Router. Data persists in the browser via `localStorage` (no backend required for this project phase).

---

## Live Preview

https://wanderlux-travel-agency.vercel.app/

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | UI components & SPA routing |
| **Vite 5** | Fast dev server & production build |
| **React Router v6** | Multi-page navigation |
| **Bootstrap 5** | Responsive grid & UI components |
| **Font Awesome 6** | Icons |
| **Google Fonts** | Playfair Display + Inter |
| **localStorage** | Client-side data persistence |

> **Note:** MongoDB / backend is **not required** for this internship project. All admin data (tours, bookings, customers, etc.) is stored locally in the browser. A backend can be added later for production deployment.

---

## Project Structure

```
travel-agency/
├── public/
│   └── images/              # All website images
├── src/
│   ├── admin/               # Admin Portal (Phases 2–7)
│   │   ├── components/      # AdminLayout, ProtectedRoute
│   │   ├── context/         # AdminContext (global state + localStorage)
│   │   ├── data/            # Initial empty seed data
│   │   ├── pages/           # Dashboard, Tours, Destinations, etc.
│   │   ├── utils/           # Analytics, image selector
│   │   └── admin.css
│   ├── components/          # Navbar, Footer, PageHero, etc.
│   ├── hooks/               # useCountUp, useScrollReveal
│   ├── pages/               # Public website pages
│   ├── App.jsx              # Routes (public + admin)
│   ├── main.jsx
│   └── style.css
├── index.html
├── package.json
└── README.md
```

---

## Public Website (9 Pages)

| Page | Route | Description |
|---|---|---|
| Home | `/` | Hero, destinations, packages, stats, testimonials |
| About | `/about` | Company story, team, values |
| Destinations | `/destinations` | Destination cards (admin + demo data) |
| Packages | `/packages` | Tour packages with category filters |
| Gallery | `/gallery` | Photo gallery with lightbox |
| Testimonials | `/testimonials` | Customer reviews |
| Blog | `/blog` | Travel articles |
| FAQ | `/faq` | Accordion Q&A |
| Contact | `/contact` | Booking form → syncs to Admin Portal |

---

## Admin Portal (Phases 2–7)

**Access:** Navbar → **Admin** button, or footer **Staff Portal** link  
**Login URL:** `/admin/login`

| Credential | Value |
|---|---|
| Email | `admin@wanderlux.com` |
| Password | `admin123` |

### Phase 2 — Dashboard
- KPI counters: Revenue, Bookings, Tours, Customers, Payments (received / pending / refunded)
- **Charts:** Monthly revenue, monthly bookings, popular destinations, monthly website visitors
- Recent bookings table + activity stream (live from localStorage data)

### Phase 3 — Tour Management
- Create, edit, publish, draft, **archive**, duplicate, delete tours
- Fields: title, destination (dropdown), pricing, duration, itinerary, FAQs, media, policies, status
- Multi-category tagging

### Phase 4 — Destination Management
- CRUD for countries, cities, and regions
- Tours reference destinations via dropdown (no manual typing)
- Image upload + preset gallery

### Phase 5 — Categories
- Full CRUD for reusable categories (Adventure, Family, Luxury, etc.)
- Tours can belong to one or more categories
- Public packages page uses categories for filtering

### Phase 6 — Booking Management
- Full booking lifecycle: Pending → Approved → Completed / Rejected / Cancelled
- Approve, **reject** (with reason), **reschedule**, **process refund**
- Assign tour guides
- Generate printable invoice / PDF report

### Phase 7 — Customer Management (CRM)
- Customer profiles with passport details & **visa status update**
- **Travel / booking history** and **payment history**
- Uploaded documents, wishlist, internal staff notes

---

## How to Run

### Prerequisites
- Node.js 18+ installed

### Install & Start

```bash
# Clone the repo
git clone https://github.com/Somanashraf/ezitech-tasks.git
cd ezitech-tasks/travel-agency

# Install dependencies
npm install

# Start development server
npm run dev
```

Open the URL shown in terminal (usually `http://localhost:5173`).

### Build for Production

```bash
npm run build
npm run preview
```

---

## Data Storage

All admin data is saved in the browser's **localStorage**:

| Key | Data |
|---|---|
| `wl_destinations` | Destinations |
| `wl_categories` | Tour categories |
| `wl_tours` | Tour packages |
| `wl_bookings` | Bookings |
| `wl_customers` | Customer CRM profiles |
| `wl_activity_logs` | Admin activity stream |
| `wl_monthly_visitors` | Website visitor analytics |
| `wl_admin_auth` | Admin login session |

To reset all data: use **Clear All Data** in the admin sidebar, or clear browser localStorage.

---

## Design System

| Element | Value |
|---|---|
| Primary | `#0EA5E9` (Sky Blue) |
| Secondary | `#14B8A6` (Teal) |
| Accent | `#F59E0B` (Amber) |
| Dark | `#0F172A` (Navy) |
| Background | `#F8FAFC` |
| Heading Font | Playfair Display |
| Body Font | Inter |

---

## Developer

**Developed by:** Soman Ashraf  
**Project:** WanderLux Travel Agency — EziTech Institute Internship  
**Date:** July 2026

---

## License

This project is created for educational purposes as part of EziTech Institute coursework.
