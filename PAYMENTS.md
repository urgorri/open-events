# PAYMENTS.md

This document outlines the payment architecture, transaction status state-machines, and the transition strategy from manual external payments to fully automated integrations.

---

## 1. Core Principles

The Open Events payments ecosystem must remain:
* **Decoupled:** Core business models (like tickets, events, or users) should never reference API clients or specific webhooks of third-party payment providers.
* **Provider-Agnostic:** Keep the unified interfaces abstract so developers can seamlessly plug in alternative payment vendors (e.g., Stripe, PayPal, Pix adapters) without rewrites.
* **Audit-Logged:** Every status change on an order transaction must log a record detailing who initiated the shift and any associated metadata (error payloads, gateway references, etc.).

---

## 2. The Manual Payments Lifecycle (Current Baseline Setup)

For the introductory phase of the starter kit, payments are validated using manual receipt verification. This process minimizes external API complexity and works out-of-the-box for independent regional organizers.

```
+----------+              +------------------------+              +-------------------------+
| Customer |              |   External Gateway     |              |     Open Events App     |
+----+-----+              +-----------+------------+              +------------+------------+
     |                                |                                        |
     |--- 1. Create Order ----------->|--------------------------------------->| (Order: PENDING)
     |                                |                                        |
     |--- 2. Redirect to Pay -------->|                                        |
     |                                |                                        |
     |<-- 3. Completes Payment -------|                                        |
     |                                                                         |
     |--- 4. Screenshot Receipt & Upload JPG/PNG ----------------------------->| (Order: PAYMENT_UPLOADED)
     |                                                                         |
     |                                       [Organizer Admin Panel View]      |
     |                                       |-- 5. Inspects receipt image     |
     |                                       |-- 6. Confirms matching amount   |
     |                                                                         |
     |                                       |-- 7. Clicks "Approve" --------->| (Order: COMPLETED)
     |                                                                         |
     |                                                                         |----> [Generates QR Ticket]
     |<-- 8. Receives Email Confirmation with QR Ticket PDF -------------------|
```

### Steps in Detail:
1. **Order Creation:** Customer inputs checkout details. The system generates an Order in `PENDING` state and temporarily locks the requested tickets capacity.
2. **External Redirection:** The platform presents the Organizer's static/dynamic payment instructions (such as a Mercado Pago generic link, Pix key, or direct bank transfer route).
3. **Receipt Upload:** Once paid, the attendee returns to their Order Status portal, uploads an image (JPG, PNG) or PDF of the payment receipt, and the Order shifts to `PAYMENT_UPLOADED`.
4. **Manual Validation:** The Organizer visits their back-office dashboard, filters for orders awaiting review, inspects the receipt attachment, and cross-references their banking history.
5. **Approval & Issuance:** Clicking `Approve` transitions the Order to `COMPLETED` and fires the ticket generation hook. Clicking `Reject` reverts the order to `AWAITING_PAYMENT` and triggers an automated notification explaining why verification failed.

---

## 3. The Automated Payments Lifecycle (Future Goal)

In a later phase, manual approvals can be bypassed entirely in favor of real-time webhooks.

```
+----------+              +-------------------------+              +-------------------------+
| Customer |              |    Open Events App      |              |   Gateway (e.g. Stripe) |
+----+-----+              +-----------+-------------+              +------------+------------+
     |                                |                                         |
     |--- 1. Submits Checkout ------->|                                         |
     |                                |--- 2. Initializes Gateway Session ----->|
     |<-- 3. Render Hosted checkout---|                                         |
     |                                |                                         |
     |--- 4. Inputs Credit Card Details --------------------------------------->|
     |                                                                          |
     |                                                                          |-- [Payment Approved]
     |                                                                          |
     |                                |<-- 5. Dispatches Signed Webhook (POST) -|
     |                                |                                         |
     |                                |-- 6. Verifies webhook secret signature  |
     |                                |-- 7. Shifts Order to COMPLETED          |
     |                                |-- 8. Triggers Automated Ticket Delivery |
     |<-- 9. Instant Digital Receipt -|                                         |
```

---

## 4. Provider-Agnostic Engine Design

To support transitions from manual configurations to automated services without rewriting order-processing routines, Open Events uses an abstract Payment Strategy layout:

```typescript
// src/features/payments/types.ts

export type PaymentStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'REJECTED' | 'FAILED';

export interface PaymentTransaction {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  gatewayTransactionId?: string;
  metadata?: Record<string, any>;
}

export interface PaymentProvider {
  id: string; // e.g. "mercado-pago", "stripe"
  name: string;

  // Initialize checkout redirect session
  createCheckoutSession(orderId: string, amount: number): Promise<{
    checkoutUrl: string;
    gatewaySessionId: string;
  }>;

  // Process incoming webhooks
  verifyWebhook(rawBody: string, headers: Record<string, string>): Promise<{
    isValid: boolean;
    orderId?: string;
    status?: PaymentStatus;
    gatewayTransactionId?: string;
  }>;
}
```

By complying with this interface, any driver wrapper can easily hook into Open Events checkout routers seamlessly.
