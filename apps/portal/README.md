# `@salychain/app-portal`

The SalyChain developer portal. Where partners manage API keys, webhook subscriptions, inspect intents/transactions, and read the docs.

## What this is (and isn't)

This is a **partner-facing** app — distinct from `apps/admin` which is internal-only.

* **Admin (`apps/admin`, port 3001):** SalyChain operators see *everything across all orgs*.
* **Portal (`apps/portal`, port 3003):** A partner sees *only their org's surface*.

In dev, the portal uses a hardcoded `org_demo_acme` org ID (`PORTAL_DEMO_ORG_ID`). In prod the org is derived from the SSO session.

## Pages

| Route | Surface |
|---|---|
| `/` | Quickstart, KPIs, latest 5 transactions |
| `/intents` | Intents your org has submitted |
| `/transactions` | Transactions and their state |
| `/api-keys` | Issue / rotate / revoke keys (live CRUD via server actions) |
| `/webhooks` | Manage subscriptions, rotate signing secrets, pause/delete |
| `/logs` | Request log viewer (requires `PORTAL_INTERNAL_SECRET` + gateway) |
| `/docs` | Inline docs: auth, idempotency, webhooks, errors |

## Talks to

* `services/apikeys` (port 4009) — keys + orgs
* `services/webhooks` (port 4010) — subscriptions + deliveries
* `services/intent` (port 4008) — intent records
* `services/execution` (port 4003) — transactions

All four calls are server-side from Next route handlers. If a service is offline the corresponding card degrades to "service unavailable" — the portal stays usable.
