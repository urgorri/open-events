# CHANGELOG.md

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.2.0] - 2026-08-08

This release marks the successful completion of **Phase 2: Application Shell**, establishing the global navigation structures, adaptive layout headers/footers, responsive dashboard sidebar, and generic empty, error, and loading state components.

### Added
- **Global Header Component**: Implemented adaptive navigation rendering that displays user controls and custom actions depending on their simulated/authenticated role (Attendee, Organizer, Admin, Guest).
- **Global Footer Component**: Designed dynamic responsive footer including brand summaries, category search options, dynamic system statistics links, custom support contacts, and social media SVG parameters.
- **Dashboard Sidebar**: Developed collapsable and mobile-ready navigation drawer designed for quick accessibility across mobile gate-scanners and desktop organizer screens.
- **Adaptive Role Selector & Simulator**: Engineered an interactive client-side selector context that sets cookie tokens and reloads the application shell dynamically to inspect multi-role layout variations.
- **Loading, Empty, and Error Boundaries**: Structured robust global loading skeletons, dynamic empty template handlers, and visual reload boundaries to handle unexpected system errors safely.
- **Multi-Role E2E and Unit Verification**: Wrote integration-level specs using Vitest and Playwright to verify that authentication flows, header visibility, and role sidebar navigation render flawlessly.

---

## [0.1.0] - 2026-08-07

This release marks the successful completion of **Phase 1: Foundation**, establishing the complete Next.js scaffolding, database configuration, site branding configs, and the testing suite framework.

### Added
- **Next.js & Tailwind CSS Scaffolding**: Initialized Next.js App Router with strict TypeScript, standard local Geist fonts, and Tailwind CSS v3.
- **shadcn/ui Configuration**: Programmed custom configurations supporting peer-dependency resolutions with React 19 and initialized shadcn/ui with base-nova style components.
- **PostgreSQL 15 & Docker Compose**: Configured PostgreSQL 15 dockerized service. Integrated the VFS storage driver to allow seamless execution inside constrained virtual sandboxes.
- **Prisma Schema & Migrations**: Developed index-optimized, relationally sound, and UUID-based database tables spanning `User` (roles), `Event` (metadata), `Order` (life-cycles), `PaymentAttempt` (receipt logs), `Ticket` (unpredictable token hashes), and `CheckInLog` (scanning history). Synchronized PostgreSQL using automatic migration runs.
- **Zero-Code Branding Configuration**: Built `src/config/site.ts` supporting rapid, site-wide dynamic visual rebranding.
- **Unit and E2E Testing Frameworks**: Fully configured Vitest (jsdom) and Playwright Chromium runners. Programmed validation tests verifying config structures and E2E system navigations, ensuring 100% pipeline passing.

---

## [0.1.0-unreleased] - Initial Development Version

This is the initial bootstrap release of the Open Events repository.

### Added
- Created foundational codebase rules inside `AGENTS.md`.
- Wrote basic layout definitions and system roadmap in `README.md` and `ROADMAP.md`.
- Outlined software modules, boundary targets, and workflows in `ARCHITECTURE.md`.
- Specified manual transaction confirmation pipelines and decoupled generic payment driver interfaces in `PAYMENTS.md`.
- Authored defensive policies targeting file uploads, authorization checks, IDOR exploits, and webhook signatures in `SECURITY.md`.
- Documented zero-code configuration parameters, custom font imports, and Tailwind variable definitions in `THEMING.md`.
- Formulated deployment patterns for self-hosted container stacks (Docker Compose) and serverless setups in `DEPLOYMENT.md`.
- Written clear contribution expectations for human developers and robotic agents in `CONTRIBUTING.md`.
- Drafted a standard Open Source MIT template in `LICENSE`.
- Built structured templates inside `.github/` to coordinate issue reports and pull requests.
