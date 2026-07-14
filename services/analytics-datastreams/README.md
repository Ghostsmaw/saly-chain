# @salychain/service-analytics-datastreams

**Saly Datastreams (Analytics Cloud — B6, Product #3).** Push delivery of a
**filtered** slice of the SalyChain event spine to a partner-owned destination
(sink), with at-least-once delivery, HMAC signatures, retries, dead-lettering,
and replay.

- **Port:** `4017` (HTTP + `/metrics`)
- **Datastore:** Postgres `salychain_datastreams` (Prisma)
- **Queue:** Redis / BullMQ (`datastreams-delivery`)
- **Source:** NATS JetStream — consumes **all 24 subjects**, including
  `salychain.chain.*` (which the core `webhooks` service intentionally omits)

## How it works

```
NATS JetStream (all subjects)
  → EventBusLifecycle (durable consumer per subject)
  → extract event facets  (chain / rail / asset / from·to / amount / kind / agent)
  → evaluate every ACTIVE stream's compiled filter
  → for each match: materialize a StreamDelivery row (idempotent on stream+event)
  → durable sinks: BullMQ worker dispatches by sink:
        WEBHOOK   → HMAC-signed POST  (retry + DLQ + replay)
        KAFKA     → produce to topic  (retry + DLQ + replay)
  → ephemeral sink:
        WEBSOCKET → best-effort broadcast to connected dashboard clients
```

A stream is at-least-once and idempotent: the `(stream_id, event_id)` unique
constraint dedupes redelivery from the JetStream consumer, and BullMQ jobs are
keyed by delivery id.

## Filters

Filters are declarative and **AND-ed** across clauses; values within a clause
are OR-ed. Amount thresholds are **fail-closed** — events without an amount are
excluded when a bound is set.

| Clause                              | Matches                                                                 |
| ----------------------------------- | ----------------------------------------------------------------------- |
| `subjects`                          | event subject (supports `salychain.tx.*` / `salychain.chain.>`)         |
| `chains`                            | `BASE`, `XRPL`, `SALY_L3` … (case-insensitive)                          |
| `rails`                             | tx settlement rail (`BASE`, `XRPL`, `L3`, `INTERNAL`, `FIAT`, `ESCROW`) |
| `assets`                            | token symbol (`USDC`, `XRP`, …)                                         |
| `addresses` + `direction`           | sender/recipient/either address membership                              |
| `minAmountMinor` / `maxAmountMinor` | inclusive smallest-unit bounds (bigint-safe)                            |
| `kinds`                             | tx / intent kind (`BASE_PAYOUT`, `DEX_SWAP`, …)                         |
| `agentIds`                          | agent id on agent-lifecycle events                                      |

Example — "USDC transfers over $1,000 leaving address 0xABC on Base or L3":

```json
{
  "subjects": ["salychain.chain.*.transfer_observed"],
  "chains": ["BASE", "SALY_L3"],
  "assets": ["USDC"],
  "minAmountMinor": "1000000000",
  "addresses": ["0xabc..."],
  "direction": "from"
}
```

## API (behind the gateway)

All routes are exposed by the gateway under the `streams:read` / `streams:write`
scopes and scoped to the caller's org.

| Method   | Path                            | Scope           |
| -------- | ------------------------------- | --------------- |
| `POST`   | `/v1/streams`                   | `streams:write` |
| `GET`    | `/v1/streams`                   | `streams:read`  |
| `GET`    | `/v1/streams/:id`               | `streams:read`  |
| `POST`   | `/v1/streams/:id/status`        | `streams:write` |
| `POST`   | `/v1/streams/:id/rotate-secret` | `streams:write` |
| `DELETE` | `/v1/streams/:id`               | `streams:write` |
| `GET`    | `/v1/streams/:id/deliveries`    | `streams:read`  |
| `GET`    | `/v1/streams/:id/dead-letters`  | `streams:read`  |
| `POST`   | `/v1/deliveries/:id/replay`     | (internal)      |

`signing_secret` is returned **once** on create / rotate (webhook sinks only).

## Webhook signature

Identical wire format to `services/webhooks`, so one verifier works for both:

```
X-Saly-Signature: t=<unix_ms>,v1=<hex hmac_sha256(secret, `${t}.${body}`)>,kid=<key_id>
```

Verify: parse `t`/`v1`, reject if `abs(now - t) > 5min`, recompute the HMAC over
`${t}.${rawBody}`, and compare timing-safe.

## Kafka / Redpanda sink

Disabled by default (`DATASTREAMS_KAFKA_ENABLED=false`) so the service boots
without a broker. When enabled, tenant topics must start with
`DATASTREAMS_KAFKA_TOPIC_PREFIX` (defense-in-depth). The `event_id` is used as
the message key for per-entity partition ordering + consumer-side dedupe.

## WebSocket sink (live dashboards)

For `WEBSOCKET` streams, clients open a socket and receive matching events as a
**live tail** — best-effort, no backfill, no DLQ:

```
wss://<host>/v1/streams/live?stream_id=<id>&secret=<signing_secret>
```

The secret may also be sent as the `x-saly-stream-secret` header. The connection
is authorized against the stream's signing secret (timing-safe); unauthorized
sockets are closed with code `1008`. Each delivered frame is
`{ stream_id, subject, event_id, data }`. Connections are process-local; in a
multi-replica deployment each pod broadcasts the matches it consumes, so a
client connected to any one pod still sees every match.

## Local development

```bash
cp .env.example .env                       # set DATABASE_URL etc.
pnpm --filter @salychain/service-analytics-datastreams prisma:generate
pnpm --filter @salychain/service-analytics-datastreams prisma:deploy
pnpm --filter @salychain/service-analytics-datastreams dev
```

Run tests / typecheck:

```bash
pnpm --filter @salychain/service-analytics-datastreams test
pnpm --filter @salychain/service-analytics-datastreams typecheck
```

## Observability

`/metrics` (Prometheus): `salychain_datastreams_active_streams`,
`salychain_datastreams_matched_total{sink}`,
`salychain_datastreams_deliveries_total{sink,outcome}`, plus the shared
`salychain_events_consumed_total{subject,outcome}` and HTTP RED series.
