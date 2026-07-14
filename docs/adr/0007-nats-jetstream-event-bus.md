# ADR-0007: NATS JetStream as the domain event bus

**Status**: Accepted
**Date**: 2026-05
**Slice**: S1

## Context

SalyChain is fundamentally an event-driven system: a transaction enters one rail, a confirmation lands on another, an alert fires for ops, a notification reaches the user. We need a substrate that:

- Decouples publishers from subscribers.
- Survives consumer downtime without losing events (durable).
- Allows multiple, independent consumers per event type (fan-out).
- Is operable by a small team (low ops burden vs Kafka).
- Has first-class TypeScript / Node.js client support.

## Decision

We standardise on **NATS JetStream** as the backbone for domain events.

- One bus, two streams to start: `SALYCHAIN_TX` (transaction lifecycle, 14d retention) and `SALYCHAIN_CHAIN` (chain observations, 3d retention).
- Subjects follow `salychain.<aggregate>.<event_type>`, e.g. `salychain.tx.settled`.
- Streams are declared in code (`packages/events/src/schemas.ts`) and reconciled on service startup.
- Every event payload is wrapped in a canonical envelope (`schema_version`, `event_id`, `occurred_at`, `correlation_id`, `trace_id`) and validated against a per-subject Zod schema before publish.
- Consumers are durable and named per consumer-purpose (`execution-base-confirmations`, `notifications-tx-settled`, etc.). Delivery is at-least-once; handlers must be idempotent. We use `max_deliver: 8` and explicit ack/nack/term.
- The `@salychain/events` package is the only sanctioned API. Services never speak raw NATS.

## Consequences

### Positive

- Compliance, notifications, accounting, BI, dashboards, and downstream products can all subscribe to the same canonical events without coupling to the execution service's database.
- Schema versioning is enforced at the publisher boundary (Zod validates pre-publish), so consumers can rely on the wire format.
- JetStream's per-consumer cursor + replay support means a new consumer can backfill history without coordination.
- Operationally simpler than Kafka: one process per region in S1, with clustering as we scale.

### Negative

- One more piece of infrastructure for operators to monitor. Mitigated by Docker Compose locally and managed NATS in production.
- JetStream's clustering story is good but younger than Kafka's. We accept this for now; if we outgrow it, the publish API is small enough to swap the transport behind it.

## Event catalogue (S1)

| Subject | Producer | Consumer(s) |
|---|---|---|
| `salychain.tx.created` | execution | observability, audit |
| `salychain.tx.reserved` | execution | observability |
| `salychain.tx.executing` | execution | observability |
| `salychain.tx.awaiting_confirmation` | wallet (broadcast worker) | execution, observability |
| `salychain.tx.settled` | execution | notifications (S2), accounting (S2) |
| `salychain.tx.failed` | execution | observability, ops alerting |
| `salychain.chain.base.block_observed` | chain-listener-base | observability (liveness) |
| `salychain.chain.base.transfer_observed` | chain-listener-base | execution (settlement) |

## Alternatives considered

- **Apache Kafka** — reject for S1. Operationally heavier, Java tooling, longer setup. Reconsider at scale or for analytics-heavy pipelines.
- **AWS SNS / SQS** — reject. Cloud lock-in early, lacks JetStream's replay/cursor primitives, and harder to run locally.
- **PostgreSQL `LISTEN/NOTIFY`** — reject. Not durable; we'd reinvent half of JetStream.
- **Direct HTTP webhooks between services** — reject for inter-service events; fine for outbound webhooks to customers.
