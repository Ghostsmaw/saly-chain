# `@salychain/service-webhooks`

Webhook subscriptions + HMAC-signed delivery for partners.

## Architecture

```
NATS (salychain.intent.*, salychain.tx.*)
        │
        ▼
  EventsModule  ──► DeliveryService.enqueueFromEvent
                       │  one Delivery row per (subscription, event_id)
                       ▼
                  BullMQ (webhooks:delivery)
                       │
                       ▼
                  DeliveryWorker
                       │  signs body, POSTs to subscriber URL
                       ▼
              2xx → SUCCEEDED   /   4xx → FAILED   /   5xx/timeout → RETRYABLE
                                                       │
                                            after MAX_ATTEMPTS → DEAD + DeadLetter row
```

## Why this shape

* **Materialized Delivery rows up-front.** Every (subscription, event) pair gets a row before we ever try to POST. This means we can always audit "did partner X receive event Y?" via a single SQL query, even after Redis is wiped.
* **At-least-once with idempotency on the subscriber side.** Each delivery carries `X-Saly-Event-Id` — subscribers should de-dupe on this. The `(subscription_id, event_id)` unique index ensures we never enqueue the same delivery twice.
* **Signed payloads.** `X-Saly-Signature: t=<ms>,v1=<hex>,kid=<key_id>`. The `kid` makes secret rotation safe (both old and new keys are accepted by the subscriber during overlap).
* **Auto-disable.** After N consecutive failures across all events, the subscription is auto-disabled. This protects partner endpoints from us and us from them.
* **Replay.** `POST /v1/deliveries/:id/replay` re-enqueues a single delivery, resetting attempts. Useful for "we deployed a bug, please re-fire the last hour of webhooks".

## Subjects fanned out

Currently:

* `salychain.intent.received|screened|routed|rejected`
* `salychain.tx.created|reserved|executing|awaiting_confirmation|settled|failed|reversed`

Chain-observation events (`salychain.chain.*`) are **not** fanned out — partners care about *our* transaction lifecycle, not the per-block observation chatter.

Wildcard subjects (e.g. `salychain.tx.*`) are accepted in `POST /v1/subscriptions` and matched at delivery enqueue time.

## API

* `POST /v1/subscriptions` — create. Returns `signing_secret` ONCE.
* `GET  /v1/subscriptions?org_id=…` — list.
* `GET  /v1/subscriptions/:id` / `DELETE /v1/subscriptions/:id`.
* `POST /v1/subscriptions/:id/status` — `ACTIVE|PAUSED|DISABLED`.
* `POST /v1/subscriptions/:id/rotate-secret` — returns new secret ONCE.
* `GET  /v1/subscriptions/:id/deliveries?status=…&limit=…`.
* `GET  /v1/deliveries/:id` / `POST /v1/deliveries/:id/replay`.

Full Swagger UI at `/docs`.
