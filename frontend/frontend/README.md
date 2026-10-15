# DHIC Frontend — Dental Health Care & Implant Centre

Next.js 14 (App Router) + React + JavaScript + Tailwind CSS. SSR/SSG/ISR throughout — no client-side SPA.

## Setup

1. Copy `.env.example` → `.env.local`, set `NEXT_PUBLIC_API_URL` to your running backend (e.g. `https://api.dentalhealthcareandimplantcentre.in/api`).
2. `npm install`
3. `npm run dev` → http://localhost:3000
4. `npm run build && npm start` for production.

Backend must be running (and seeded) first — see `dhic-backend/README.md`.

## Structure
- `app/` — App Router pages. Every public page uses `generateMetadata()` for dynamic SEO (title, description, canonical, OG).
- `app/sitemap.js`, `app/robots.js` — dynamic sitemap/robots pulling live doctors/services/blogs.
- `lib/api.js` — server-side fetch helpers with Next.js ISR caching (`revalidate`).
- `lib/apiClient.js` — client-side axios instance for authenticated patient actions (OTP login, booking, payments), attaches JWT from cookie automatically.
- `lib/schema.js` — JSON-LD builders: Dentist/MedicalBusiness, Person (doctor), MedicalProcedure (service), Article (blog), FAQPage, BreadcrumbList.
- `components/BookingWizard.jsx` — the full appointment flow: Service → Doctor → Date/Time (live slot engine) → OTP login + coupon → Razorpay payment → Confirmation.

## Pages
Home, About, Doctors (list + `[slug]` detail, SSG), Services (list + `[slug]` detail, SSG), Blog (list + `[slug]` detail, SSG), Offers, Reviews, Contact, Appointment (booking wizard), Login (OTP), Profile (patient dashboard: appointments/payments/medical history/prescriptions/edit profile).

## SEO notes
- Doctor, service and blog detail pages use `generateStaticParams` for SSG + ISR (`revalidate`).
- Each entity carries its own JSON-LD schema block.
- `/appointment`, `/login`, `/profile` are marked `noindex` (private/dynamic, not content pages).

## Next
Admin panel (React + Vite) is the last piece — connects to the same `/api/admin/*` endpoints.
