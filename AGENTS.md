# AGENTS.md

## 1. Project Vision
Open Events is an open-source, beautifully minimal, and production-ready Event Management and Ticketing Starter Kit. It is built specifically to be easily forked, extensively configured, and deployed by developers looking to launch ticketing applications for events, conferences, meetups, workshops, and sports events.

The project is architected with a strong emphasis on developer-friendliness, modular design, security, and native AI-assisted development. AI agents (like Jules) must be able to understand the codebase structure and build on top of it autonomously, incrementally, and safely.

---

## 2. Technical Principles
To keep the codebase maintainable for humans and AI agents alike, we follow these core technical principles:
- **Pragmatic Simplicity:** Avoid premature optimization and unnecessary abstractions. Write clean, readable code that explains its own intent.
- **Incremental Progress:** Never rewrite entire systems if a series of targeted, backward-compatible improvements can achieve the same goal.
- **Production Quality:** Treat all features as if they are bound for production. This means rigorous validation, comprehensive error handling, logging, accessibility, and high test coverage.
- **Forkability:** All configurations (such as branding, logos, links, colors, and payment credentials) must be isolated from core business logic so that downstream forks can rebrand the system in minutes.

---

## 3. Coding Conventions
- **TypeScript First:** The codebase must use strict TypeScript. Avoid `any`. Use descriptive interfaces, types, and zod schemas for payload validation.
- **Functional Components:** React components should be written as functional components using Tailwind CSS and shadcn/ui.
- **Consistent Naming:**
  - Files: kebab-case (e.g., `event-card.tsx`).
  - Components: PascalCase (e.g., `EventCard`).
  - Hooks: camelCase with `use` prefix (e.g., `useEventDetails`).
- **Explicit Exports:** Avoid default exports when possible; prefer named exports to make searching and automated refactoring cleaner.

---

## 4. Architecture Principles
- **Modular Monolith:** Organize code around high-level business domains rather than purely technical layers (controllers, models, etc.). Keep cross-domain imports restricted or mediated through well-defined service interfaces.
- **Unidirectional Data Flow:** Ensure data flows down and events flow up.
- **Separation of Concerns:** Keep business logic outside of visual presentation components. UI components must stay presentation-focused, utilizing custom hooks or utility functions for data mutations and interactions.
- **Provider-Agnostic Interfaces:** Integrate third-party adapters (like payment gateways, mail senders, and file storages) behind generic interfaces (e.g., `PaymentProvider`, `EmailService`) to prevent vendor lock-in.

---

## 5. Feature/Domain Organization
The standard structure inside `src/` should follow:
```
src/
├── features/
│   ├── auth/          # Authentication & User Sessions
│   ├── events/        # Event Creation, Display, and Discovery
│   ├── tickets/       # Ticket PDF generation, QR codes, & Validation
│   ├── payments/      # Generic payment handlers & specific integrations
│   ├── orders/        # Order creation, status tracking, checkout
│   ├── checkin/       # Ticket scanning and attendance validation
│   ├── dashboard/     # Organizer & Admin analytics/management console
│   └── users/         # Profile management & roles
├── components/        # Shared UI components (shadcn/ui base elements)
├── lib/               # Shared utilities, hooks, database clients
├── config/            # Site configuration (theming, global metadata)
├── emails/            # React Email templates or transaction email logic
├── database/          # Prisma schema, migrations, and seed scripts
└── tests/             # Global integration and end-to-end tests
```

---

## 6. Security Requirements
Security is not an afterthought. Every action must be designed with the following threat models in mind:
- **Authentication:** All secure sessions must be managed with robust cookie-based authentication, with server-side validation of session tokens.
- **Authorization & IDOR Prevention:** Never trust user-provided identifiers (e.g., order ID, event ID) blindly. Verify that the authenticated user owns or has authorization to access/modify the resource on the server side.
- **Input Validation:** Use `zod` schema verification for all API payloads, query strings, and form submissions.
- **Safe File Uploads:** All file uploads must be checked for type (using magic bytes, not just file extensions) and file size. Upload files directly to secure objects (e.g., S3-compatible) with temporary pre-signed links.
- **Payment Verification:** Webhooks must verify incoming payloads using cryptographic signatures provided by the payment gateways (e.g., Mercado Pago secret headers).
- **Secrets Management:** Secrets must never be committed to git. Use environment variables with appropriate fallback validations during application startup.

---

## 7. Testing Expectations
- **Unit Tests:** Write unit tests for utility functions, hooks, helper logic, and pure components. Use Jest / Vitest.
- **Integration Tests:** Test database interactions, API endpoints, and critical domain flows (such as order placements and payment updates).
- **End-to-End Tests:** Write Playwright scripts for happy paths, such as event creation, ordering, manual receipt uploading, and ticket check-ins.
- **Code Coverage:** Maintain at least 80% coverage on core business logic files. Never remove tests to bypass pipeline failures.

---

## 8. Accessibility Expectations
- **Semantic HTML:** Ensure components use correct elements (`<article>`, `<button>`, `<nav>`, etc.) instead of wrapping everything in `<div>`s.
- **Keyboard Navigation:** All interactive elements must be keyboard-accessible. Ensure clear focus outlines are present.
- **ARIA Attributes:** Leverage Radix UI / shadcn/ui primitives which have ARIA attributes baked in. Ensure custom components use proper roles.
- **Contrast & Fonts:** Adhere to WCAG AA guidelines for minimum contrast ratios.

---

## 9. Documentation Rules
- **Live Updates:** When completing a task, update the corresponding `ROADMAP.md` checkbox and append any changes to `CHANGELOG.md`.
- **Architectural Decisions:** If you introduce major architecture changes or new external dependencies, create an Architectural Decision Record (ADR) file in `docs/adr/`.
- **No Outdated Comments:** Avoid writing TODO comments in code without matching tickets or Roadmap items. Clean up temporary comments before completing a task.

---

## 10. Git Conventions
- **Branching:** Use descriptive branch names (e.g., `feat/event-creation`, `fix/ticket-qr-encoding`).
- **Conventional Commits:** Every commit must follow Conventional Commits formatting:
  - `feat(<domain>): description`
  - `fix(<domain>): description`
  - `docs(<domain>): description`
- **Clear Commit Messages:** Avoid messages like "update code". Keep changes atomic, and supply descriptive body notes when helpful.

---

## 11. Dependency Rules
- **Keep it Lean:** Do not introduce third-party libraries for simple functions. Verify if a utility can be written cleanly in under 50 lines of TypeScript first.
- **Peer Dependencies:** When adding packages, check for dependency resolution conflicts. Keep the package lockfile updated.
- **Security Scans:** Ensure all installed packages are checked for vulnerabilities using `npm audit`.

---

## 12. Database Rules
- **Migrations:** All schema changes must be driven by Prisma migration scripts. Never modify live databases directly.
- **UUIDs:** Use robust, non-predictable UUID keys (e.g., `uuidv4`) for exposed IDs (like order, ticket, and user IDs) to mitigate sequence probing attacks.
- **Timestamps:** Every model must have `createdAt` and `updatedAt` fields.
- **Indices:** Always add indexes to foreign keys and highly queried fields (e.g., user profiles by email, tickets by QR hash).

---

## 13. Payment Architecture Principles
- **Decoupled Workflows:** The billing and checkout domain must not directly access database entities from other domains like events or tickets. It should communicate via events or specific service layers.
- **State Machine Auditing:** Payments must progress through explicit, immutable states: `PENDING` -> `PROCESSING` -> `COMPLETED` / `REJECTED`. Every payment state change must be logged in a payment attempts history table.
- **Provider Agnostic:** Keep the checkout handler generic, delegating specific API steps to driver adapters (e.g., `MercadoPagoAdapter`, `StripeAdapter`).

---

## 14. AI-Agent Workflow
You are an AI software engineering agent executing tasks in this codebase. Follow these step-by-step rules:
1. **Repository Inspection:** Before doing anything, inspect the repository state, read existing docs (`AGENTS.md`, `README.md`, `ROADMAP.md`), and explore current file trees. Do not assume previous state information.
2. **Prioritization:** Always look for the highest-priority, uncompleted checkbox item in `ROADMAP.md`. Work on it systematically.
3. **Draft Plan:** Run `request_plan_review` and obtain approval before running `set_plan`.
4. **Implement completely:** Write robust, production-grade code including input schema verification, proper database queries, loading states, and error handling.
5. **Verify changes:** Verify files after editing them by using `read_file`, `list_files`, or compiling/running tests. Do not mark steps complete without explicit verification.
6. **Testing:** Write or update tests, and make sure existing tests still pass.
7. **Document & Update Roadmaps:** Mark the tasks complete in `ROADMAP.md`, update `CHANGELOG.md`, and refine any applicable domain documentation.

---

## 15. Definition of Done
A task is complete only when:
- [ ] Code functions exactly as specified under all edge cases.
- [ ] All inputs are strictly validated (via Zod or equivalent).
- [ ] Proper error handling, logging, and recovery systems are in place.
- [ ] Tests exist for new code pathways and pass cleanly.
- [ ] Manual or automated verification screenshots/video are captured.
- [ ] Security boundaries (IDOR check, permission gating) are validated.
- [ ] Core configuration files (such as `ROADMAP.md` and `CHANGELOG.md`) are updated.
- [ ] Pre-commit scripts and styling checks run and pass with zero issues.
