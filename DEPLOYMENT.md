# DEPLOYMENT.md

This document outlines the hosting architecture, runtime targets, and deployment configurations for Open Events. It is designed to be cloud-agnostic to support self-hosting, traditional virtual machines (VMs), or serverless containers.

---

## 1. Runtime Requirements

Regardless of where Open Events is deployed, the target host must support:
- **Node.js Environment:** Active LTS Version (Node.js v18 or newer).
- **PostgreSQL Database:** PostgreSQL 14+ with pg_crypto extension enabled.
- **Persistent Asset Storage:** S3-compatible cloud storage or dedicated server local directories (for event cover graphics and manual transaction receipts).
- **Network Routing:** HTTPS termination must be configured. Webhook integrations (e.g. Mercado Pago / Stripe) require secure SSL validation.

---

## 2. Option A: Self-Hosted / Docker (Recommended)

Running the system inside a Docker container simplifies orchestration, networking, and dependency installations.

### Baseline Production `compose.prod.yaml`
```yaml
services:
  app:
    image: openevents/platform:latest
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/openevents?schema=public
      - NODE_ENV=production
      - NEXT_PUBLIC_APP_URL=https://your-domain.com
      - AUTH_SECRET=your_cryptographically_secure_auth_secret_key
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:15-alpine
    restart: always
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=openevents
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d openevents"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  pgdata:
```

---

## 3. Option B: Serverless (e.g. Vercel, Netlify)

Because Open Events is built using Next.js and Prisma, it fits perfectly on standard serverless infrastructure.

### Deployment Process:
1. **Repository Link:** Connect your GitHub fork directly to your Vercel or Netlify team dashboard.
2. **Environment Configuration:** Input all required variables (`DATABASE_URL`, `AUTH_SECRET`, etc.) inside the hosting provider's admin settings panel.
3. **Build Commands:** Configure the build dashboard settings:
   - **Build Command:** `prisma generate && next build`
   - **Output Directory:** `.next`
4. **Database Connection Pooling:** Serverless functions execute rapid, short-lived executions. Ensure your PostgreSQL connection utilizes a connection-pooling manager (such as PgBouncer, Prisma Accelerate, or Supabase Pooling) to prevent "too many connections" failures.

---

## 4. Option C: Managed PaaS (e.g. Render, Railway, Fly.io)

For low-maintenance deployments with dedicated, long-running Node.js runtimes:
1. Provisions a Managed PostgreSQL instance.
2. Connect your repository.
3. Railway or Render will parse the base `package.json` configurations, run `npm install`, execute `prisma migrate deploy` during the pre-build hook, and start the Next.js production server (`next start`) on port 3000.

---

## 5. Post-Deployment Checklist

Before welcoming ticket sales on production:
- [ ] Run `prisma migrate status` to verify all DB migrations are applied.
- [ ] Test the file upload component to confirm receipts save to object storage rather than standard local container runtimes.
- [ ] Check security configuration to ensure cookies utilize strict HTTP-only, secure rules.
- [ ] Validate SSL configurations. Webhook endpoints must respond to HTTPS request streams.
