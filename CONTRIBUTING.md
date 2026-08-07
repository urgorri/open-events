# CONTRIBUTING.md

Welcome to the Open Events community! We value contributions from human developers, independent fork owners, and AI developer agents.

This document defines the contribution rules, development setup, and validation checks required for pull requests.

---

## 1. Development Workspace Setup

### Prerequisites
- Node.js (Active LTS version)
- Docker Desktop / Compose engine
- Git CLI

### Local Configuration
1. **Fork and Clone:**
   ```bash
   git clone https://github.com/your-username/open-events.git
   cd open-events
   ```
2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Environment Setup:** Create a local environment parameters configuration:
   ```bash
   cp .env.example .env
   ```
4. **Boot Docker Dependencies:**
   ```bash
   docker compose up -d
   ```
5. **Database Initialization:** Run Prisma migrations to configure local database tables:
   ```bash
   npx prisma migrate dev
   ```
6. **Start Dev Server:**
   ```bash
   npm run dev
   ```

---

## 2. General Contribution Rules

- **Strict Type Checking:** No TypeScript bypasses are allowed. Running `npm run build` or `npx tsc --noEmit` must output zero compile warnings.
- **Maintain Modular Boundaries:** Respect the feature organization rules detailed in `ARCHITECTURE.md`. Do not import styles, utilities, or internal states across domains.
- **Provide Tests:** All new features must include unit tests (Vitest) and, where applicable, E2E flow validations (Playwright).
- **Update Documentation:** If a pull request modifies feature structures or introduces configuration parameters, the author must document the updates in `THEMING.md`, `README.md`, or the `/docs` directory.

---

## 3. Human Developer Workflow

1. **Find or Create an Issue:** Always link your work to an active GitHub Issue.
2. **Create a Topic Branch:**
   ```bash
   git checkout -b feat/event-customization
   ```
3. **Write Tests First:** We encourage Test-Driven Development (TDD). Show that your tests fail, write the clean code, and verify tests pass.
4. **Code Quality Auditing:**
   - Standardize styling rules: `npm run lint`
   - Run existing test suites: `npm run test`
5. **Submit a Pull Request (PR):** Fill out the Pull Request template comprehensively (including reproduction steps and design notes).

---

## 4. AI-Agent Workflow Rules

If you are an AI developer agent (such as Jules) working on an automated task sequence:
1. **Read Core Files First:** You are strictly required to read `AGENTS.md`, `README.md`, and `ROADMAP.md` before writing code.
2. **Task Prioritization:** Locate the earliest unchecked box on `ROADMAP.md` and claim it as your current objective. Do not skip phases.
3. **Write a Plan:** Define your proposed solution and execute a plan review using `request_plan_review` before applying changes.
4. **Incremental Checks:** Perform direct read-only confirmations (using `read_file` or `list_files`) after editing or writing files to ensure no format degradation occurred.
5. **Task Completion:** Mark the corresponding roadmap item as completed, detail your implementations inside `CHANGELOG.md`, and present a clear review summary.
