# Open Events

A modern, open-source event management and ticketing starter kit. Built to be forked, customized, and deployed.

Create events, sell tickets, manage attendees, and validate access with QR codes.

---

> ### ⚠️ Project Status: Under Construction (Documentation Phase)
> **CURRENT STATE:** This project is currently in its initial bootstrap phase. The application features, database models, payment processes, and visual interfaces **do not yet exist**. This repository contains the permanent documentation foundation and technical blueprint that future scheduled AI-agent tasks and human contributors will use to incrementally implement the complete system.

---

## 🚀 Vision
Open Events provides a robust modular-monolith foundation for anyone wanting to build:
* Independent ticketing platforms (e.g., self-hosted alternatives to Eventbrite)
* Corporate conference management systems
* Local meetup and community workshop hubs
* Music festivals, sport events, and registration pipelines

By keeping the application highly configurable and separating presentation from business models, forks can customize branding, colors, logos, and visual parameters in seconds without modifying core files.

---

## 🛠️ Intended Tech Stack
The proposed architecture is built on a modern, robust, and highly type-safe backend/frontend pipeline:

* **Framework:** [Next.js](https://nextjs.org) (React-based, using App Router for API endpoints and layouts)
* **Language:** [TypeScript](https://www.typescriptlang.org) (For strict contract enforcement)
* **Styling & Components:** [Tailwind CSS](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) (Radix UI primitives)
* **Database:** [PostgreSQL](https://www.postgresql.org)
* **ORM:** [Prisma ORM](https://www.prisma.io)
* **Testing:** [Vitest](https://vitest.dev) (Unit & Integration) + [Playwright](https://playwright.dev) (End-to-End)
* **Containers:** Docker Compose for local database and environment execution

---

## 📋 Planned Core Features
1. **Event Management:** Event creation (CRUD), publishing controls, rich text descriptions, cover images, and customizable venue/capacity configuration.
2. **Ticketing & Orders:** High-performance ticket generation, order state machines, and purchase confirmation.
3. **Receipt Validation & Payments:** Decoupled payments interface starting with a manual validation flow (Mercado Pago link -> receipt upload -> organizer review) transitioning to automated integrations (Mercado Pago webhooks, Stripe checkout, etc.).
4. **Validation (QR / PDF):** Generation of beautiful PDF tickets containing secure, tamper-proof check-in QR codes.
5. **Mobile Verification:** QR validation scanner optimized for mobile-web viewports to allow quick gate entry.
6. **Analytics Dashboards:** Beautiful visualizations for organizers to track sales, attendance, and payouts.

---

## 📁 Getting Started (Planned Flow)
Once the setup phase is implemented, running the app locally will follow this process:

### 1. Requirements
* Node.js (v18+)
* Docker and Docker Compose

### 2. Installation
```bash
git clone https://github.com/your-username/open-events.git
cd open-events
npm install
```

### 3. Setup Environment
```bash
cp .env.example .env
```

### 4. Run Services
```bash
docker compose up -d
npm run db:migrate
npm run dev
```

---

## ⚙️ Customization & Forking
To build customized portals, developers won't need to dive deep into database schemas. Open Events relies on isolated site configuration variables detailed in `THEMING.md` that configure brand colors, custom typography, terms & conditions, landing metadata, and logos.

---

## 🤝 Contributing & AI Agents
We welcome human developers and AI assistants.
If you are an AI developer agent, please read `AGENTS.md` before making any contributions. It contains critical instructions about project standards, workflows, and definitions of done.

* Detailed design and design patterns: `ARCHITECTURE.md`
* Step-by-step roadmap: `ROADMAP.md`
* Payment logic and lifecycles: `PAYMENTS.md`
* Development instructions: `CONTRIBUTING.md`
* Security principles: `SECURITY.md`

---

## 📄 License
This project is licensed under the MIT License - see the `LICENSE` file for details.
