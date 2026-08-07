# ROADMAP.md

This roadmap maps out the phased approach to building Open Events from a blank slate to a secure, enterprise-grade, and forkable production application.

Future AI developer agents (such as Jules) and human contributors must refer to this document before starting any work. The general rule is to:
1. Inspect the codebase for currently implemented features.
2. Select the **highest-priority incomplete checkbox** on this roadmap.
3. Fully implement, test, and verify the feature.
4. Mark the item as completed (`[x]`) in this document.

---

## 🛠️ Phase 1: Foundation
Build the basic setup configuration, framework scaffolding, database connection adapters, and the base layout structure.
- [x] **1.1 Next.js Project Initializer:** Set up the Next.js (App Router) project with TypeScript, Tailwind CSS, and shadcn/ui.
- [x] **1.2 Database Hookup & Prisma Schema:** Configure Docker Compose for PostgreSQL. Set up the Prisma schema with baseline configurations (`createdAt`, `updatedAt`).
- [x] **1.3 Site Configuration Setup:** Build site configuration logic (`config/site.ts`) to manage site name, social profiles, metadata, and branding options dynamically.
- [x] **1.4 Basic Testing Pipeline:** Set up Vitest for backend/unit testing, and Playwright for E2E testing. Ensure pre-commit checking hooks are configured.

## 📦 Phase 2: Application Shell
Assemble the baseline navigation and UI structure.
- [x] **2.1 Header and Footer Navigation:** Create a beautiful, responsive global navigation header and footer that adjust based on active login state.
- [x] **2.2 Shell Sidebar / Mobile Drawer:** Responsive navigation sidebar for dashboard pages, optimized for mobile gate-controllers and desktop organizers.
- [x] **2.3 Error Boundary and Suspense Layouts:** Implement robust global loading, error boundaries, and empty state templates.

## 🔐 Phase 3: Authentication and Users
Set up multi-role user schemas, login methods, and permission middleware.
- [ ] **3.1 Session-based Authentication:** Implement secure, cookie-based sessions (using Lucent, NextAuth, or custom secure cookies).
- [ ] **3.2 User Roles Configuration:** Create clear user roles in database schema (`ADMIN`, `ORGANIZER`, `ATTENDEE`).
- [ ] **3.3 Role Gating Middleware:** Build a secure Next.js middleware / server action check to gate access based on authorization scopes.

## 📅 Phase 4: Event Management
Provide organizers the tools to create and administer events.
- [ ] **4.1 Event Schema & Migrations:** Draft event tables with fields for title, category, rich text details, start/end dates, timezone, visual banners, physical/virtual location, and capacity.
- [ ] **4.2 Organizer Event Creator UI:** Implement a secure Multi-Step Event Creation form with frontend Zod schema verification.
- [ ] **4.3 Event Dashboard Management:** Provide organizers with view/edit/publish/unpublish toggles for their own events.

## 🔍 Phase 5: Public Event Discovery
Establish public browsing landing pages so customers can search and learn about events.
- [ ] **5.1 Public Event Discovery Landing Page:** Build a responsive search engine and category grid filtering matching active, published events.
- [ ] **5.2 Search and Pagination:** Introduce paginated API structures for low-latency searches.
- [ ] **5.3 Event Detail Presentation Page:** Generate visual, SEO-optimized public detail pages presenting dates, organizers, and checkout buttons.

## 🛒 Phase 6: Orders and Checkout
Define checkout pipelines and order schemas.
- [ ] **6.1 Order State Machine Schema:** Build database models tracking order phases (`PENDING`, `AWAITING_PAYMENT`, `PAYMENT_UPLOADED`, `COMPLETED`, `CANCELLED`).
- [ ] **6.2 Checkout Reservation System:** Create backend routes checking current ticket capacity, temporarily holding slots for the buyer during their check-out process.
- [ ] **6.3 Checkout Flow Interface:** Minimal, clear step-by-step checkout page where customers supply buyer details and lock their tickets.

## 💵 Phase 7: Manual Mercado Pago Payments
Implement the introductory external-payment verification loop.
- [ ] **7.1 External Mercado Pago Redirection:** Integrate configurable payment links redirection with dynamic pricing parameters.
- [ ] **7.2 Receipt Upload Component:** Build a secure file uploading dialog inside the Attendee order status page allowing receipts (JPG, PNG, PDF) up to 5MB.
- [ ] **7.3 Organizer Verification Admin Dashboard:** Provide event organizers an interface listing orders awaiting manual review, showing receipt previews, and containing explicit `Approve` / `Reject` (with rejection reason) buttons.

## 🎫 Phase 8: Ticket Generation
Create tickets tied securely to orders once payment confirmation completes.
- [ ] **8.1 Ticket DB Schema:** Create ticket schemas utilizing unpredictable UUIDs containing verification hashes (`ticket_hash`).
- [ ] **8.2 Unique Validation Hash Generator:** Build cryptographic generation algorithms ensuring QR codes cannot be spoofed.
- [ ] **8.3 Ticket Status Dashboard:** Give attendees a dedicated view displaying active tickets and barcode/QR-code graphics.

## 📧 Phase 9: Email and PDF Tickets
Send tickets directly to customer inboxes in digital-ready formats.
- [ ] **9.1 PDF Layout Generator:** Design a structured layout for generating ticket PDFs containing event parameters and QR codes.
- [ ] **9.2 Transactional Mail Adapter:** Implement a generic mailing client layer capable of sending emails with attachments via standard SMTP, Resend, or Amazon SES.
- [ ] **9.3 Order Confirmation Email Trigger:** Fire emails with attached ticket PDFs instantly upon payment status transition to `COMPLETED`.

## 📱 Phase 10: QR Validation and Check-in
Ensure seamless ticket checks on-site.
- [ ] **10.1 Mobile-Friendly Scanning Viewport:** Build an HTML5 / WebRTC-based camera validation page accessible on mobile phones.
- [ ] **10.2 Gate Attendant Scanner Authorization:** Restrict scanning access to specific accounts delegated as "check-in staff" by the event organizer.
- [ ] **10.3 Scan Validation Logic API:** Endpoint checking validity of scanned QR ticket hashes, marking them as `CHECKED_IN`, preventing double-entry, and returning immediate color-coded alerts (Green: Verified, Red: Already Scanned / Invalid).

## 📊 Phase 11: Organizer Dashboard
Give organizers analytics and user lists.
- [ ] **11.1 Key Metric Cards:** Visual widgets tracking total revenue, tickets sold, attendance rates, and remaining capacities.
- [ ] **11.2 CSV Export Engine:** Download complete attendee directories with check-in timestamps and receipt verification statuses.
- [ ] **11.3 Bulk Messaging System:** Provide messaging overlays allowing organizers to email all attendees with vital logistical announcements.

## 👑 Phase 12: Administration
Give platform owners root-level control.
- [ ] **12.1 Global Platform Management UI:** Global admin panel to monitor total platform metrics, platform fees, and active organizers.
- [ ] **12.2 User Suspension / Gating System:** Give administrators ability to flag fraudulent events, suspend users, or approve newly registered organizers.
- [ ] **12.3 Global Settings Panel:** Interface for platform owners to define system-wide defaults (terms, support contact, platform commissions, allowed payout thresholds).

## 🛡️ Phase 13: Testing and Security Hardening
Iron-clad protection against threats.
- [ ] **13.1 Penetration Testing Simulations:** Verify role-gating blocks unauthorized actions. Scan endpoints for common IDOR patterns.
- [ ] **13.2 Automated Schema & API Verifiers:** Build strict schema checks on every API parameter using robust Zod integrations.
- [ ] **13.3 Multi-Device Responsive Testing:** Validate that scanning pipelines work seamlessly across Safari/Chrome, iOS, and Android web-views.

## 🚢 Phase 14: Production Readiness
Final compliance and performance tunings.
- [ ] **14.1 Production Configurations:** Create unified production environments. Ensure secure header policies (CSP, CORS, frame options).
- [ ] **14.2 Database Index Audits:** Add indexes on search parameters and validation hashes for low-latency queries.
- [ ] **14.3 Static Assets Caching Optimization:** Ensure event cover assets and static landing elements utilize fast, global edge caches.

## ⚡ Phase 15: Automated Payment Integrations
Eliminate manual validation for frictionless automatic payouts.
- [ ] **15.1 Provider-Agnostic Payments Engine:** Define unified abstract interfaces for automated checkouts.
- [ ] **15.2 Mercado Pago Checkout Pro Integration:** Support redirect-to-checkout flows returning instant API updates.
- [ ] **15.3 Mercado Pago Webhook Handler:** Secure webhook receiver supporting validation signature verifications, triggering immediate automated ticket generation and deliveries.
- [ ] **15.4 Stripe Integration:** Integrate Stripe Checkout sessions for global, multi-currency credit/debit collections.

## 🌟 Phase 16: Optional Future Features
Extend platform capabilities for next-generation systems.
- [ ] **16.1 Multiple Ticket Tier Types:** VIP, Early Bird, General Admission with customized dates and prices.
- [ ] **16.2 Discount Promo Codes:** Create customized promo coupons with percentage or fixed monetary reductions and max-usage limits.
- [ ] **16.3 Structured Interactive Seating Charts:** Allow buyers to visually select physical rows and numbered chairs inside structured venues.
