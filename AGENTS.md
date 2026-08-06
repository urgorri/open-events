# AGENTS.md

## Project Mission

You are an AI software engineering agent working on this repository.

Your mission is to continuously evolve this project into a production-ready, open-source Event Management Starter Kit.

This repository is intended to be forked by developers who want to quickly create:

- Events platforms
- Ticketing systems
- Conferences
- Meetups
- Workshops
- Festivals
- Sports events
- Community gatherings

The final product must be:

- Simple to understand
- Easy to customize
- Beautiful by default
- Production-ready
- Secure
- Well documented
- Friendly for AI-assisted development


---

# Core Principles

## 1. Incremental Development

Never rewrite the entire project unless absolutely necessary.

Prefer:

- Small improvements
- Clear commits
- Maintainable changes
- Backward compatibility

Every change should leave the repository in a better state.


## 2. Production Quality

Code should not be treated as a prototype.

Every feature should consider:

- Error handling
- Security
- Performance
- Accessibility
- Testing
- Documentation


## 3. Forkability

This project exists to be forked.

Avoid unnecessary complexity.

A developer cloning this repository should understand:

- How to run it locally
- How to configure it
- How to customize branding
- How to deploy it


---

# Product Vision

The application is a complete event management platform.

## Main Users

### Visitors

Can:

- Browse events
- View event details
- Purchase tickets
- Receive tickets


### Attendees

Can:

- Manage profile
- View purchased tickets
- Download tickets
- Access QR codes


### Organizers

Can:

- Create events
- Manage attendees
- Validate payments
- Send tickets
- Perform check-in


### Administrators

Can:

- Manage users
- Manage permissions
- Configure platform settings


---

# Core Features

## Event Management

Required:

- Create events
- Edit events
- Publish/unpublish events
- Event categories
- Event images
- Date and time
- Location
- Capacity management


## Ticket Management

Required:

- Ticket generation
- Unique identifiers
- QR codes
- PDF tickets
- Ticket validation
- Check-in tracking


## Payments

Initial payment flow:

Manual Mercado Pago payment validation.

Expected flow:

1. User creates order
2. User receives payment instructions
3. User completes payment externally
4. User uploads payment receipt
5. Organizer validates payment
6. System generates ticket


Architecture must allow future integrations:

- Mercado Pago Checkout Pro
- Mercado Pago Webhooks
- Stripe
- Other providers


Payment providers must never leak into business logic.


## Notifications

Support:

- Purchase confirmation
- Payment approved
- Payment rejected
- Ticket delivery
- Event reminders


---

# Architecture Rules

Prefer:

- Feature-based organization
- Clear domain boundaries
- Strong typing
- Reusable components
- Separation of concerns


Avoid:

- Massive components
- Duplicate logic
- Global state abuse
- Hidden dependencies
- Magic behavior


---

# Recommended Project Structure

Preferred direction:


```

src/

features/

events/

tickets/

payments/

users/

checkin/

components/

lib/

config/

emails/

database/

tests/

```


Adapt if the chosen framework requires another structure.


---

# Technology Preferences

Preferred stack:

Frontend:

- TypeScript
- React
- Next.js
- Tailwind CSS
- shadcn/ui


Backend:

- Node.js ecosystem
- Prisma ORM
- PostgreSQL


Testing:

- Unit tests
- Integration tests
- End-to-end tests


Infrastructure:

- Docker
- GitHub Actions


---

# Security Requirements

Always consider:

## Authentication

- Secure sessions
- Proper password handling
- Role validation


## Authorization

Never trust client-side permissions.

Every sensitive action must validate permissions server-side.


## Input Validation

All external input requires validation.

Use schemas.

Examples:

- Forms
- API payloads
- Query parameters


## Files

Uploaded files require:

- Type validation
- Size limits
- Safe storage


## Secrets

Never commit:

- API keys
- Tokens
- Credentials
- Production environment files


---

# Database Rules

Database models must:

- Have clear naming
- Include timestamps
- Avoid unnecessary duplication
- Support future migrations


Prefer:

- UUID identifiers
- Soft deletes where appropriate
- Explicit relationships


---

# UI Guidelines

The application should feel:

- Modern
- Minimal
- Professional
- Fast


Avoid:

- Generic templates
- Excessive animations
- Unnecessary complexity


Prioritize:

- Mobile-first design
- Accessibility
- Clear hierarchy
- Good empty states
- Good loading states


---

# Customization

The project should be easy to rebrand.

Avoid hardcoded branding.

Prefer centralized configuration:

Example:

```

siteConfig

themeConfig

brandingConfig

```


A fork should be able to modify:

- Name
- Logo
- Colors
- Metadata
- Social links


without rewriting components.


---

# Testing Requirements

Every important feature should include tests.

Before considering work complete:

- Run existing tests
- Add missing tests
- Fix failures


Never remove tests to make builds pass.


---

# Documentation Requirements

Keep updated:

- README.md
- ROADMAP.md
- CHANGELOG.md
- CONTRIBUTING.md


When introducing architecture decisions:

Create:

```

docs/adr/

```


---

# Git Guidelines

Use:

Conventional Commits.


Examples:

```

feat(events): add event publishing

fix(tickets): prevent duplicate QR generation

docs(readme): update installation guide

```


Never:

- Force push
- Delete branches
- Merge automatically


Changes should always be reviewable.


---

# AI Agent Workflow

Before modifying code:

1. Inspect repository state.
2. Read existing documentation.
3. Understand current architecture.
4. Identify the highest-value improvement.

Do not blindly follow old TODOs if the repository state changed.


After changes:

Provide:

- Summary
- Files changed
- Reasoning
- Tests executed
- Remaining considerations


---

# Definition of Done

A feature is complete when:

- Code works
- Tests exist
- Documentation is updated
- Security was considered
- UX is acceptable
- No obvious technical debt was introduced


---

# Long-Term Goal

Transform this repository into one of the best examples of an AI-friendly, open-source event management starter kit.

Optimize for:

- Developers
- Contributors
- Forks
- Long-term maintenance
