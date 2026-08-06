# Open Events

A modern, open-source event management and ticketing starter kit.

Built to be forked, customized and deployed.

Create events, sell tickets, manage attendees and validate access with QR codes.

---

## Features

## Event Management

- Create and manage events
- Public event pages
- Categories
- Locations
- Capacity management
- Publishing workflow


## Ticketing

- Digital tickets
- QR codes
- PDF tickets
- Ticket validation
- Event check-in


## Payments

Current support:

- Manual payment validation flow
- Mercado Pago payment links


Designed for future integrations:

- Mercado Pago Checkout Pro
- Mercado Pago Webhooks
- Stripe


## Organizer Dashboard

Manage:

- Events
- Orders
- Attendees
- Payments
- Check-ins


## Open Source First

This project is designed for:

- Forking
- Custom branding
- Community contributions
- AI-assisted development


---

# Screenshots

Coming soon.


---

# Tech Stack

Planned stack:

- TypeScript
- React
- Next.js
- Tailwind CSS
- PostgreSQL
- Prisma
- Docker


---

# Getting Started

## Requirements

Install:

- Node.js
- Docker
- PostgreSQL


## Installation

Clone repository:

```bash
git clone https://github.com/YOUR_USERNAME/open-events.git

cd open-events
````

Install dependencies:

```bash
npm install
```

Create environment file:

```bash
cp .env.example .env
```

Start services:

```bash
docker compose up -d
```

Run development server:

```bash
npm run dev
```

---

# Project Structure

```
src/

features/

components/

lib/

database/

emails/

tests/
```

The project follows a feature-oriented architecture.

---

# Configuration

The application is designed to be easily customized.

Main configuration areas:

* Branding
* Theme
* Emails
* Payments
* Authentication

---

# Payments

## Manual Mercado Pago Flow

The initial payment workflow:

```
Customer

↓

Creates order

↓

Pays through Mercado Pago link

↓

Uploads receipt

↓

Organizer validates

↓

Ticket generated
```

Future versions will support automatic payment confirmation.

---

# Deployment

The application is designed to run on:

* Vercel
* Docker
* Self-hosted servers

Deployment documentation will be available in:

```
docs/DEPLOYMENT.md
```

---

# Development

Run:

```bash
npm run dev
```

Testing:

```bash
npm run test
```

Lint:

```bash
npm run lint
```

---

# Roadmap

## Phase 1

Foundation:

* Project setup
* Authentication
* Database
* UI system

## Phase 2

Events:

* Event CRUD
* Public pages
* Organizer dashboard

## Phase 3

Tickets:

* Orders
* QR generation
* PDF tickets
* Check-in

## Phase 4

Payments:

* Manual validation
* Mercado Pago integration
* Automatic confirmations

## Phase 5

Advanced:

* Multiple ticket types
* Coupons
* Seating
* Analytics
* Mobile app

---

# Contributing

Contributions are welcome.

Before contributing:

1. Read AGENTS.md
2. Check existing issues
3. Follow project conventions

---

# License

MIT License.

You are free to:

* Use
* Modify
* Fork
* Deploy commercially

---

# Philosophy

Open Events exists to demonstrate how a complete, production-ready application can be built openly and collaboratively.

The project prioritizes:

* Simplicity
* Quality
* Documentation
* Developer experience
* AI-assisted development
