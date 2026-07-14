# `@salychain/service-intent`

Canonical intent ingestion service. The single front door for AI agents, Saly AI, and external partners to submit a canonical Intent (per `@salychain/intent-schema`).

## What it does

1. Validates the payload against the canonical Intent schema (strict; unknown fields rejected).
2. Enforces actor-scoped idempotency: `(actor.id, Idempotency-Key)` returns the same record.
3. Persists the canonical intent + emits `salychain.intent.received` on NATS.
4. Hands off to the execution service. Execution drives compliance/risk/routing/quote/settle.
5. Reflects the intent's lifecycle state locally so external observers can poll without subscribing to the execution stream.

## API

* `POST /v1/intents` — submit a canonical intent. Header `Idempotency-Key` is required.
* `GET /v1/intents/:intent_id` — fetch the record + state.
* `GET /v1/intents?state=…&limit=…` — list recent intents.

The full Swagger UI is served at `/docs`.

## How it slots into the pipeline

```
                ┌──────────┐  POST /v1/intents
   external  ─► │  intent  │ ─────────────────► persists IntentRecord (RECEIVED)
                └────┬─────┘
                     │ execution.ingestIntent()
                     ▼
                ┌────────────┐  compliance → risk → routing → (quote) → reserve → execute → settle
                │ execution  │
                └────────────┘
```

The intent service deliberately does NOT screen, route, or execute. Those responsibilities live in the execution orchestrator (which can also be called directly by trusted internal services). This keeps the ingestion boundary thin and the execution pipeline single-source-of-truth.

## Configuration

See `.env.example`. The intent service only needs Postgres + NATS + the execution base URL.

## Events emitted

| Subject | Schema |
|---|---|
| `salychain.intent.received` | `intentReceivedSchema` from `@salychain/events` |
| `salychain.intent.rejected` | `intentRejectedSchema` from `@salychain/events` |

`intent.screened` and `intent.routed` are emitted by the execution service when those phases complete.
