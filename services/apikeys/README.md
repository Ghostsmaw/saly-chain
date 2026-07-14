# `@salychain/service-apikeys`

Organization, member, and API-key management for the SalyChain B2B surface.

## Responsibilities

1. **Organizations** — partner / customer entities. Own keys, members, rate limits.
2. **Members** — humans bound to an org (linked to upstream Auth at a higher layer).
3. **API keys** — issued with `sk_test_*` (testnet-only) or `sk_live_*` (real money) prefixes; scoped (`intents:write`, `tx:read`, …); rate-limited per minute; optionally IP-allow-listed; revocable and rotatable.
4. **Verification** — the only path the API gateway should ever take. Returns the key envelope (org, scopes, limits) given a presented secret.

## Secret hygiene

* The full secret is shown to the caller exactly once on issue. After that we have only `salt` + `scrypt(secret || pepper, salt)`.
* `scrypt` parameters: `N=2^14, r=8, p=1, keylen=32`. This is hot-path-safe (~10ms) but ~100,000× slower than a SHA-256 of a leaked DB row.
* The `APIKEY_HASH_PEPPER` is a server-side secret. Rotating it requires a re-hash job; do not blindly rotate in prod.
* Last-four of the secret is kept solely for the dashboard UX (`…q9aF`).

## API surface

* `POST /v1/orgs` — create an org.
* `POST /v1/orgs/:id/members` — add a member.
* `POST /v1/api-keys` — issue a new key (returns `secret` once).
* `GET /v1/api-keys?org_id=…` — list keys for an org.
* `POST /v1/api-keys/:id/revoke` — revoke.
* `POST /v1/api-keys/:id/rotate` — issue a new key and revoke the old (no overlap window — request two keys explicitly if overlap is needed).
* `POST /v1/api-keys/verify` — used by the gateway in the hot path.

Full Swagger UI at `/docs`.

## Scopes

Scopes are strings of the form `<resource>:(read|write|admin)`. The currently recognized resources are:

| Resource | Notes |
|---|---|
| `intents` | submit, list, fetch |
| `transactions` | list, fetch |
| `wallets` | list, fetch |
| `webhooks` | manage subscriptions |
| `ledger` | read-only |

The gateway enforces scopes; this service only validates the shape.
