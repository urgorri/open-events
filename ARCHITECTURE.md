# ARCHITECTURE.md

This document describes the intended software architecture, domain boundaries, data structures, and tech decisions for Open Events.

---

## 1. Modular Monolith Architecture

Open Events is designed as a **Modular Monolith**. While it runs within a single runtime (a unified Next.js application accessing one PostgreSQL instance), the system is strictly decoupled along logical domain boundaries.

```
                  +-----------------------------------+
                  |             Next.js UI            |
                  |     (tailwind / shadcn-components)|
                  +-----------------+-----------------+
                                    |
+-----------------------------------v-----------------------------------+
|                           DOMAIN BOUNDARIES                           |
|                                                                       |
|   +---------------+   +---------------+   +---------------+           |
|   |  auth / users |   |    events     |   |    orders     |           |
|   +-------+-------+   +-------+-------+   +-------+-------+           |
|           |                   |                   |                   |
|   +-------v-------+   +-------v-------+   +-------v-------+           |
|   |    tickets    |   |    checkin    |   |   payments    |           |
|   +---------------+   +---------------+   +---------------+           |
|                                                                       |
+-----------------------------------+-----------------------------------+
                                    |
                        +-----------v-----------+
                        |  Prisma Database Core |
                        +-----------------------+
```

### Why a Modular Monolith?
* **Development Simplicity:** Single repository, simple deployment pipeline, atomic commits, and painless local environment orchestration.
* **Domain Autonomy:** Each feature resides in its own folder under `src/features/`. Cross-domain calls must go through explicitly defined services/API contracts rather than direct file imports.
* **Migration Path to Microservices:** Should performance dictate separating domains (e.g., separating the scanning/checkin API or PDF generation into serverless functions), each folder inside `src/features/` is isolated enough to split out with minimal friction.

---

## 2. Core Domain Boundaries

### A. Auth & Users (`src/features/auth` & `src/features/users`)
* **Responsibilities:** Multi-role user creation, secure session management, and server-side RBAC (Role-Based Access Control).
* **Dependencies:** None. This is a foundational module.

### B. Events (`src/features/events`)
* **Responsibilities:** Event metadata storage, search queries, visual cover listings, and category taxonomies.
* **Dependencies:** Accesses user details via session queries to designate event owners.

### C. Orders & Checkout (`src/features/orders`)
* **Responsibilities:** Order lifecycle state-machine transitions, locking/holding active capacities while checkout sessions expire, and capturing buyer detail payloads.
* **Dependencies:** Queries `events` database tables to read ticket pricing and subtract event capacity.

### D. Payments (`src/features/payments`)
* **Responsibilities:** Registering payment gateways, providing redirections to external checkout hosts, receiving webhook callbacks, and supporting manual upload receipt processing.
* **Dependencies:** Interacts with the `orders` domain to trigger status adjustments upon successful collection.

### E. Tickets (`src/features/tickets`)
* **Responsibilities:** Generating tamper-proof random ticket tokens, layout rendering for physical PDF exports, and dispatching digital mail attachments.
* **Dependencies:** Hooks into `orders` (to wait for confirmation flags) and `events` (to extract logistical parameters).

### F. Checkin (`src/features/checkin`)
* **Responsibilities:** Secure mobile QR camera viewfinders, parsing gate scans, validating ticket authenticity against duplicate attempts, and logging check-in logs.
* **Dependencies:** Queries `tickets` domain directly to retrieve state vectors and mark codes `CHECKED_IN`.

---

## 3. Data Flow Diagrams

### A. Booking Flow
```
Attendee               Public Event Info               Orders Domain            Payments Domain
   |                           |                             |                         |
   |---- 1. View Event ------->|                             |                         |
   |---- 2. Click Buy -------->|                             |                         |
   |                             |---- 3. Hold Capacity ---->|                         |
   |                             |---- 4. Create Pending --->|                         |
   |<--- 5. Render Checkout <----|                                                     |
   |---- 6. Complete Details ------------------------------->|                         |
   |                                                         |---- 7. Forward Link --->|
   |<--- 8. Present External Payment Link / Receipt Page <---|                         |
```

### B. Verification Flow
```
Gate Attendant App          Scanner API API Routing             Tickets Domain
       |                               |                              |
       |---- 1. Scan Ticket Hash ---->|                              |
       |                               |---- 2. Query Ticket Hash --->|
       |                               |                              |
       |                               |-- [IF VALID & NOT USED] ---->|
       |                               |   Mark Ticket checked_in:true|
       |<--- 3. Return GREEN (Valid) --|                              |
       |                               |                              |
       |                               |-- [IF ALREADY SCAN / EXPIRED] |
       |<--- 4. Return RED (Error) ----|                              |
```

---

## 4. Key Technical Decisions (ADRs Preview)

### Decision 1: Use Next.js App Router
* **Context:** We need a framework that provides high-speed Static Site Generation (SSG) for SEO-friendly public event finders, plus Server-Side Rendering (SSR) and API routes for organizer back-offices.
* **Consequence:** Next.js allows combining these paradigms out-of-the-box. We use Route Handlers for payments and third-party webhooks, and Server Actions for lightweight interactive mutations.

### Decision 2: Prisma ORM for Type-Safe Queries
* **Context:** Database query logic must be strict and prevent schema drift.
* **Consequence:** Prisma models provide direct TypeScript autocomplete profiles, auto-generate declarative PostgreSQL migration files, and compile schemas cleanly.

### Decision 3: Abstracted Provider Integrations (Adapter Pattern)
* **Context:** The starter kit should not be hard-gated to Mercado Pago or AWS.
* **Consequence:** Payment actions rely on a abstract interface (`PaymentProvider`). Switching from manual Mercado Pago links to automated Stripe Checkouts requires replacing the active runtime driver inside configurations without refactoring core order-processing loops.
