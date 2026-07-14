# ADR-0012: B2B surface, API gateway, and partner identity

**Status**: Accepted
**Date**: 2026-05
**Slice**: S3

## Context

S0–S2 built the money core, multi-rail execution, and a complete intent pipeline. All of it has been driven by internal callers or the admin dashboard. S3 is about opening the network to external partners — developers, businesses, AI agents, and (eventually) the Saly AI consumer surface.

The decisions that needed making:

1. **Where does external traffic terminate?** A dedicated public-facing service, or do partners hit `services/intent` directly?
2. **How are partners authenticated?** API keys, OAuth, JWTs, mTLS — pick one.
3. **Where do scope checks live?** Decentralized in each downstream service, or centralized at the boundary?
4. **What is the partner data model?** Per-user, per-org, both?
5. **What does a "key" look like on the wire?** Format, prefix, secret entropy, rotation story.
6. **How does the gateway protect downstream services from misbehaving partners?** Rate limiting, idempotency, request log retention.

## Decision

We introduce a dedicated **`services/gateway`** as the public-facing entry point for the entire SalyChain network. All four are sister services to S2 services and share the same patterns (NestJS, Prisma, Postgres, NATS where applicable).

### 1. Public surface lives only at the gateway

* Public URL: `https://api.saly.network/v1/…`.
* Internal services (`intent`, `execution`, `compliance`, …) are **not exposed publicly**. They sit in the private subnet, addressable only from the gateway and other internal services.
* The gateway does no business logic — it auth/scope/rate-limit/idempotency-guards, then proxies through typed `sdk-internal` clients.

### 2. Partners authenticate with **API keys** (no JWT, no OAuth) for v1

* Two presentations: `Authorization: Bearer sk_…` or `X-API-Key: sk_…`.
* Format: `sk_{env}_{12-char-prefix}_{40-char-secret}`. Env is `test` (testnet only) or `live` (real money).
* Prefix is the index; full secret shown once on issue, never again.
* At rest: `scrypt(secret || pepper, salt)` per ADR-0012 hash params.
* OAuth + per-user delegation lands in S4 (when the consumer Saly AI surface needs it).

### 3. Scopes are **declared at the route** and **enforced at the gateway**

* Scope strings: `<resource>:(read|write|admin)`.
* `write` implies `read` for the same resource. `admin` implies both.
* Downstream services do not check scopes — they trust the gateway's `req.auth` and validate domain invariants only.
* The set of resources is small and curated (`intents`, `transactions`, `wallets`, `webhooks`, `ledger`) — coarse on purpose, since fine-grained policy is a feature of the underlying domain object (e.g. wallet ownership, intent actor binding), not a permission system.

### 4. Partner data model: **`Organization` + `Member` + `ApiKey`**

* `services/apikeys` owns all three. One DB, one service, one source of truth.
* No "user" concept yet — members are emails bound to an org, linked at a higher layer (SSO in prod, hardcoded `org_demo_acme` in dev).
* This deliberately avoids the trap of building a full IAM system in S3. We will plug into the broader SalyChain identity service in S4 when consumer accounts arrive.

### 5. Gateway-level guardrails

* **Idempotency**: `Idempotency-Key` required on mutating routes. Cached for 24h keyed by `(api_key_id, idempotency_key)`; same key + different body = 409.
* **Rate limit**: per-API-key, fixed-window 1 minute, configurable per key (default 600/min, set per env in `services/apikeys`).
* **Request log**: every request appended to `gateway.request_logs` (gateway-owned db). Surfaced in the developer portal's Logs tab.
* **Correlation id**: generated if absent (`x-correlation-id`) and threaded through every downstream call. Returned in every error payload.

### 6. SDK strategy

* `@salychain/sdk-internal` — workspace-only, used by all NestJS services for service-to-service RPC. Knows internal URLs, propagates correlation ids, etc.
* `@salychain/sdk` — published to NPM (eventually). Pure ESM, no NestJS dependency, only depends on `fetch` + `node:crypto`. Mirrors only the public gateway surface; internal endpoints are deliberately absent.

The two SDKs share **no code** by design. The internal SDK changes whenever any service changes; the public SDK only changes when the gateway's contract changes. Coupling them would mean every internal refactor risks breaking partners.

## Consequences

### Positive

* One choke point for auth/scopes/rate-limit/idempotency. Hardening the gateway hardens everything.
* Internal services stay simple; no auth or rate-limit logic in `intent`, `execution`, etc.
* Public/internal contract boundary is a hard, code-enforced line (two distinct SDK packages).
* API keys are immediately revocable; the gateway's short-TTL cache means a revoke takes effect inside 15s.

### Negative

* The gateway is now a critical single point of failure. Mitigations:
  - Fully stateless except for the idempotency table and request log (both eventually-consistent durable stores; brief unavailability is recoverable).
  - Apikeys cache failure-closes (so a degraded apikeys instance returns 401, not 500).
  - Horizontal-scale-out is trivial (no in-process state besides the Redis-backed rate-limit counters).

* API keys are simpler than OAuth but less suited to per-user delegation. Conscious choice for v1 — OAuth lands when we need it (S4).

* Two SDKs is more surface to maintain. The discipline is worth the safety: an internal refactor cannot accidentally break partners.

## Out of scope for S3

* OAuth 2.1 / JWT-based partner auth.
* Per-org / per-environment custom rate-limit tiers (basic per-key limits ship; tiered plans need a billing layer).
* mTLS for high-value partners.

## S3.1 follow-up (implemented)

* `GET /v1/logs` + portal Logs tab (via `GET /v1/internal/logs` + `X-Portal-Secret`).
* Per-endpoint quota analytics summary on `request_logs`.
* IP allow-list enforcement with CIDR matching, missing-IP deny, and cache re-check on hit.
