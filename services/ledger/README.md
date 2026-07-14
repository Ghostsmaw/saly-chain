# `@salychain/service-ledger`

Double-entry accounting service — the canonical source of monetary truth for SalyChain.

## Responsibilities

- Create and manage chart-of-accounts entries.
- Post immutable, balanced journal entries.
- Maintain denormalized account balances atomically with postings.
- Reverse posted entries via offsetting entries (never edits in place).
- Expose authoritative balance reads that sum postings directly.

## Non-responsibilities

- Knows nothing about chains, wallets, or routing.
- Does not decide *whether* a transfer should happen — only records it.
- Does not perform FX. Multi-currency entries are allowed; each currency side must balance independently.

## API surface (v1)

| Method | Path | Description |
|---|---|---|
| `POST` | `/v1/accounts` | Create an account |
| `GET`  | `/v1/accounts/:id` | Read an account (cached balance) |
| `GET`  | `/v1/accounts/:id/balance` | Authoritative balance (sums postings) |
| `POST` | `/v1/journal/entries` | Post a balanced journal entry (idempotent) |
| `GET`  | `/v1/journal/entries/:id` | Fetch a journal entry with its postings |
| `POST` | `/v1/journal/entries/:id/reverse` | Reverse a posted entry |
| `POST` | `/v1/transactions` | Open a business-level transaction grouping |
| `GET`  | `/v1/transactions/:id` | Fetch a transaction with its entries |
| `GET`  | `/v1/health` | Liveness + DB health |
| `GET`  | `/docs` | OpenAPI / Swagger UI |

## Local development

```bash
pnpm install                            # from repo root
pnpm --filter @salychain/service-ledger prisma:generate
pnpm infra:up                            # starts Postgres + Redis + NATS
pnpm --filter @salychain/service-ledger prisma:deploy   # or: pnpm db:migrate from repo root
pnpm --filter @salychain/service-ledger dev
```

Migrations apply in order:

1. `20260528020731_init` — accounts, journal entries, postings, transactions, audit log (+ `pgcrypto`)
2. `20260528020732_double_entry_trigger` — deferred balance + immutability triggers

The deferred CONSTRAINT TRIGGER validates double-entry balance at COMMIT time — application code is the primary defense, the trigger is the last line.
