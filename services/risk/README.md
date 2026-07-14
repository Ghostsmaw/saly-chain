# `@salychain/service-risk`

Risk scoring engine. Like compliance, this runs as a **pre-condition** for every intent — but with a different mandate: compliance answers "is this _allowed_?", risk answers "is this _normal_?".

## Inputs

For each assessment we look at:

* The **actor profile snapshot** — lifetime volume, lifetime transaction count, rolling-24h volume, EMA mean/stddev of amount.
* The **counterparty edge** — have we seen `(actor, counterparty)` before? Is it a fresh edge?
* The **intent itself** — amount, asset, rail, destination type.

## Outputs

* A normalized risk score in `[0, 100]`.
* A `RiskDecision`: `ALLOW`, `REVIEW`, or `BLOCK`.
* A list of human-readable reasons for the score (these surface in the admin dashboard and in compliance cases when the intent is escalated).
* A persisted `RiskAssessment` row, idempotent on `(actorId, intentId)`.

## Post-settlement update

After an intent settles, the execution service calls `POST /v1/risk/commit` with the realized amount and counterparty. The risk service then atomically:

* Bumps the actor's lifetime count + lifetime volume.
* Adds to the rolling-24h volume bucket (with TTL-based expiry).
* Updates the EMA mean/stddev (so the next assessment sees a normalized baseline).
* Bumps the `CounterpartyEdge` interaction counter.

This means the risk model **learns from real flows** without needing a separate ML pipeline. It's deliberately simple — we'll graft a learned model on top of the same feature surface in a later slice.

## Configuration

See `.env.example`. The risk service needs Postgres + Redis (Redis backs the rolling-window counters).

See also: [ADR-0010 — compliance + risk integration](../../docs/adr/0010-compliance-and-risk-integration.md).
