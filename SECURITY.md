# SECURITY.md

This document defines the core security principles, active threat vectors, and mitigation rules applied in Open Events.

---

## 1. Threat Areas and Defensive Tactics

### A. Authentication & Session Security
* **Threat:** Session hijacking, XSS extraction of tokens, and credential brute-forcing.
* **Defense:**
  - Standardize on secure, `HttpOnly`, `SameSite=Lax`, and `Secure`-flagged cookies to prevent script-based token access.
  - Implement rate-limiting on sensitive auth routes (`/api/auth/login`, `/api/auth/register`) to stop brute-force scanners.

### B. Authorization & IDOR (Insecure Direct Object Reference)
* **Threat:** Attackers guessing incremental integers (e.g., changing `/api/orders/14` to `/api/orders/15`) to download stranger receipts or tickets.
* **Defense:**
  - **Unpredictable IDs:** Ensure all public/API resources use UUIDs (UUIDv4) or secure nanoids instead of serial integer IDs.
  - **Ownership Verification:** Every controller/route must explicitly verify that the currently authenticated user's ID matches the owner ID of the queried resource:
    ```typescript
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (order.userId !== currentUser.id && currentUser.role !== 'ADMIN') {
      throw new UnauthorizedError();
    }
    ```

### C. File Upload Vulnerabilities
* **Threat:** Malicious hackers uploading web-shells (e.g. `.php` scripts masked as `.png` receipts) to execute remote server actions.
* **Defense:**
  - Never store uploads directly inside public server execution directories.
  - Limit file sizes strictly to a maximum of 5MB for order receipts.
  - Parse and verify **magic bytes** (mime-type headers) inside file stream payloads, rather than trusting raw filenames or user-provided content-types.
  - Store assets inside isolated, access-restricted cloud object storage buckets (S3-compatible) using secure, ephemeral presigned URLs.

### D. QR Tickets & Tamper-Proof Verification
* **Threat:** Attackers duplicating or fabricating QR tickets, leading to double-entry gate fraud.
* **Defense:**
  - QR codes must only contain an unpredictable cryptographic verification token, never plain-text order references or IDs.
  - Implement strict double-scan block lists inside checking APIs. The moment a token is marked `CHECKED_IN`, subsequent scan events on that exact token must immediately flag as a duplicate entry.
  - Sign QR payload hashes server-side using hidden cryptographic keys before rendering them.

### E. Webhook Validation & Secrets
* **Threat:** Attackers spoofing fake payment-approval webhooks to force ticket issuances without paying.
* **Defense:**
  - Always verify webhook incoming payloads using secure gateway-provided cryptographic signature headers (e.g., verifying `X-Signature` headers with local webhook secret variables).
  - Use runtime timing-safe comparisons to prevent timing attacks.

### F. Personal Data (PII) Protection
* **Threat:** Regulatory liabilities and leaks of customer booking names, emails, and phone records.
* **Defense:**
  - Strictly limit database user reads. Never output entire profile rows over API routers; serialize payload models to selectively export fields.
  - Ensure GDPR/LGPD compliance options (e.g., hard deletes on profile deletions) are supported programmatically.

---

## 2. Secrets Management

* **Zero Hardcoded Secrets:** No API keys, database credentials, mailing passwords, or token keys must ever be committed to Git.
* **Example Enforcements:** Developers must populate a local, git-ignored `.env` file following `.env.example`.
* **Runtime Assertion:** On application boots, the app must run explicit assertion checks on core environment variables:
  ```typescript
  const requiredEnv = ['DATABASE_URL', 'AUTH_SECRET', 'NEXT_PUBLIC_APP_URL'];
  for (const env of requiredEnv) {
    if (!process.env[env]) {
      throw new Error(`CRITICAL STARTUP ERROR: Missing required env ${env}`);
    }
  }
  ```

---

## 3. Reporting Vulnerabilities

If you identify any security issue within this codebase, please do not file a public GitHub issue. Instead, email a detailed report (including steps to reproduce, impact estimation, and patch recommendations) to our security team at `security@openevents.dev`.
