# `@salychain/service-gateway`

The public B2B HTTP gateway. Every external API call from a partner or AI agent goes through this service.

## Responsibilities

1. **Authentication.** `Authorization: Bearer sk_…` or `X-API-Key: sk_…`. Delegates to `services/apikeys` for verification with a short-TTL cache.
2. **Authorization (scopes).** Every route declares the scopes it needs via `@RequireScopes('intents:write')`. The `ScopeGuard` checks against the key's granted scopes (with `write ⇒ read` and `admin ⇒ *` implications).
3. **Rate limiting.** Per-API-key fixed-window via Redis `INCR`. Returns standard `X-RateLimit-*` headers and 429 on exceed.
4. **Idempotency.** `Idempotency-Key` on mutating routes. Same key + same body → cached response. Same key + different body → 409. 24h window.
5. **Request logging.** Append-only `request_logs` table feeds the developer-portal "Logs" tab via `GET /v1/logs` (scoped) and `GET /v1/internal/logs` (portal secret).
6. **Proxying.** Thin handlers that translate public DTOs into internal SDK calls. No business logic lives here.
7. **Correlation propagation.** `x-correlation-id` is generated if missing and threaded through every downstream call.

## What it deliberately does NOT do

* **No business logic.** Validation of intents lives in `@salychain/intent-schema`; routing/screening/risk live in their own services.
* **No raw access to the ledger or signer.** Those are internal-only services; the gateway never talks to them directly.
* **No WebSockets.** Real-time push to partners is via webhooks (S3) and SSE on the partner dashboard (S3 portal app). A future real-time API will be additive.

## Topology

```
              partner
                │  https://api.saly.network
                ▼
          ┌──────────┐
          │ gateway  │ ── auth ──► apikeys
          │          │ ── rate-limit ──► redis
          │          │ ── idempotency ──► postgres
          └──┬──┬──┬─┘
             │  │  │
        intent execution webhooks
```

## API surface (S3)

* `POST /v1/intents` — scopes: `intents:write`. Idempotent.
* `GET  /v1/intents/:id` — scopes: `intents:read`.
* `GET  /v1/intents` — scopes: `intents:read`.
* `GET  /v1/logs` — scopes: `logs:read`. Partner request log read.
* `GET  /v1/logs/summary` — scopes: `logs:read`. Aggregate stats.
* `GET  /v1/internal/logs` — `X-Portal-Secret` header (server-side portal only).
* `GET  /v1/transactions/:id` — scopes: `transactions:read`.
* `GET  /v1/transactions` — scopes: `transactions:read`.
* `POST /v1/webhooks` — scopes: `webhooks:write`. Returns `signing_secret` ONCE.
* `GET  /v1/webhooks` — scopes: `webhooks:read`.
* `POST /v1/webhooks/:id/status` — scopes: `webhooks:write`.
* `POST /v1/webhooks/:id/rotate-secret` — scopes: `webhooks:write`. Returns secret ONCE.
* `DELETE /v1/webhooks/:id` — scopes: `webhooks:write`.
* `GET  /v1/webhooks/:id/deliveries` — scopes: `webhooks:read`.

Swagger UI at `/docs`.

## Failure model

* **apikeys unreachable** → 401 `gateway.auth.unavailable`. We fail closed; partners can immediately see this is an auth-system outage in the response code.
* **Downstream service unreachable** → propagates the SDK's `*.unreachable` error as 502.
* **Idempotency conflict** → 409, partner is reusing a key with a different body.
* **Scope missing** → 403 `auth.missing_scope`.
* **Rate limit** → 429 with `X-RateLimit-*` headers.
