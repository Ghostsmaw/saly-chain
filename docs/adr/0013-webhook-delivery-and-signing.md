# ADR-0013: Webhook delivery, signing, and delivery semantics

**Status**: Accepted
**Date**: 2026-05
**Slice**: S3

## Context

Partners can't poll us forever — we need an event-push surface. The decisions we needed to make:

1. **Delivery semantics:** at-most-once, at-least-once, or exactly-once?
2. **Signing scheme:** what header shape, what algorithm, how do we handle key rotation?
3. **Retry policy:** when do we give up, where do failed deliveries land?
4. **State model:** materialize a row per (event × subscription) up-front, or lazily on attempt?
5. **Auto-disable threshold:** when does a broken endpoint stop receiving deliveries?
6. **Subject taxonomy:** what do partners get to subscribe to?

## Decision

We ship **`services/webhooks`** as a dedicated NestJS service with a BullMQ-backed delivery worker.

### 1. **At-least-once** delivery; subscribers de-dupe on `event_id`

* We will retry until we succeed or exhaust attempts.
* Every delivery carries `X-Saly-Event-Id`. Subscribers MUST de-dupe on this id.
* Exactly-once is impossible across a network without distributed transactions and we won't pretend otherwise. The docs make this explicit.

### 2. Signing: `X-Saly-Signature: t=<ms>,v1=<hex>,kid=<key_id>`

* `t` = unix ms of signing time. Receivers reject if `|now - t| > 5min` (replay protection).
* `v1` = `HEX(HMAC-SHA256(secret, t + "." + raw_body))`. The version prefix means we can add `v2` (e.g. Ed25519) without breaking existing subscribers.
* `kid` = signing-key id. Rotation issues a new `kid` so subscribers can accept both old and new during overlap.
* The official SDK exposes `verifyWebhookSignature` in `@salychain/sdk/webhooks`. Verification is **explicit on raw bytes**, not on JSON-parsed body, because key ordering / whitespace differences would otherwise silently fail the check.

### 3. Retry: exponential backoff, max 8 attempts, then dead-letter

* `attempts = 8` (configurable per env).
* Backoff: `base * 2^attempt + jitter` (base 2s, capped 1h).
* `5xx`, `408`, `429`, network/timeout/DNS → RETRYABLE.
* `4xx` (other than `408/429`) → FAILED (no retry — partner endpoint is rejecting the shape).
* When attempts are exhausted → DEAD + a row in `dead_letters`. Replay via `POST /v1/deliveries/:id/replay`.

### 4. Materialize deliveries **up front** (outbox pattern, NATS-anchored)

* When a subject fires in NATS JetStream, the webhooks service creates a `Delivery` row for every matching subscription **before** queueing the BullMQ job.
* Trade-off: more DB writes vs full auditability ("did partner X receive event Y?" is a single SQL query).
* Idempotency: `UNIQUE(subscription_id, event_id)` — same event delivered twice is a no-op at the DB layer.

### 5. Auto-disable after **20 consecutive failures**

* The webhook service tracks `consecutive_failures` per subscription.
* On 20 consecutive failures (across any events), the subscription auto-flips to `DISABLED`. The portal surfaces this; the partner re-enables manually after fixing the endpoint.
* This protects:
  - The partner's endpoint from sustained pressure when they're down.
  - Our queue from accumulating a long tail of doomed deliveries.

### 6. Subject taxonomy: **intent.\*** and **tx.\***

* Currently fanned out: `salychain.intent.{received,screened,routed,rejected}`, `salychain.tx.{created,reserved,executing,awaiting_confirmation,settled,failed,reversed}`.
* **Not** fanned out: `salychain.chain.*` (per-block observation chatter; partners don't care about block N+1).
* Wildcard subjects are accepted at subscribe time (`salychain.tx.*`); matching happens at enqueue time.

## Consequences

### Positive

* Partners get a clean, signed, retryable event surface. No polling.
* Every event delivery is auditable forever (or until DB rotation).
* HMAC-SHA256 + `kid` makes rotation safe — no flag-day, no broken integrations.
* The materialized-delivery model means a partial Redis outage doesn't lose events — we re-enqueue from PENDING rows on boot.

### Negative

* More DB writes than a "fire and forget" model. Acceptable; the writes are small and at our event volumes (single-digit thousands/sec for the foreseeable future) Postgres handles it trivially.
* Subscribers MUST implement HMAC verification + idempotency on `event_id`. Both are well-known patterns and the SDK handles the first; the docs flag the second prominently.
* Wildcard matching at enqueue time means an unexpectedly broad subject (e.g. `salychain.tx.*`) will fan out across all `tx.*` events — partners need to be selective. The portal surface lists the exact subject set so this is obvious.

## Out of scope for S3

* Per-subscriber filtering beyond subject (e.g. "only events for org_id=X").
* Webhook event versioning / schema evolution (S4 — when we have partners on an older payload shape).
* Push to a partner-owned SQS / SNS / Pub/Sub queue. The HTTP path covers the 95% case; queue integration ships when a partner asks.
