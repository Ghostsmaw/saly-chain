# ADR 0010 — Compliance + risk are pre-condition services

* **Status:** Accepted
* **Date:** 2026-05
* **Slice:** S2

## Context

Once SalyChain accepts canonical intents (not just typed RPC calls), every movement of value MUST be screened (sanctions / country / PEP) and risk-scored (velocity, behavior, counterparty) before any rail decision is made. Both checks need to:

* Persist immutable audit trails (regulators read these).
* Be replaceable with vendor systems without invasive refactors.
* Distinguish "let it through" / "send to a human" / "refuse" cleanly, with reasons.
* Stay fast — they're on the synchronous path of every intent.

## Decision

We split the responsibility across two services with thin, narrow APIs:

### `services/compliance`

* `POST /v1/screening/screen` — runs a `SanctionsProvider` (default `embedded`, with vendor providers behind the same interface) and returns `{ decision: ALLOW|REVIEW|BLOCK, max_score, results[], case_id? }`.
* Every result is persisted to `screening_results`. `REVIEW` or `BLOCK` automatically opens a `compliance_cases` row in the human review queue.
* KYC tier engine: `POST /v1/kyc/tier` advances a subject between `TIER_0..TIER_3` (forward only; the one exception is `TIER_REJECTED`). Vendor webhooks (Sumsub / Onfido) land in S3 and call this same endpoint.

### `services/risk`

* `POST /v1/risk/assess` — pure scoring against the `ActorProfile` snapshot + the proposed amount + counterparty edge. **Does not mutate the profile.**
* `POST /v1/risk/commit` — advances the profile after settlement (rolling 24h, lifetime count, EMA mean/stddev, counterparty edge).
* The `ScoringEngine` is a pure function with deterministic component scores (`amount`, `velocity24h`, `newCounterparty`, `newActor`, `deviation`). It is fully unit-tested without DB.
* Thresholds for `ALLOW` / `REVIEW` / `BLOCK` are configured via env (`RISK_REVIEW_THRESHOLD`, `RISK_BLOCK_THRESHOLD`). Per-actor / per-channel overrides land in S3.

### Execution pipeline

`services/execution`'s `ingestIntent()` runs both:

```
CREATED → compliance.screen → risk.assess → SCREENED
```

Either service returning `BLOCK` short-circuits to `REJECTED`. `REVIEW` is treated as `ALLOW` for now (S2) but opens cases — S3 introduces a hold-and-wait pattern that pauses execution until an analyst clears the case.

`risk.commit` runs *after* settlement, not at decision time. This means proposed-but-aborted transactions never poison the rolling window.

## Consequences

* Compliance + risk are first-class steps in every state-machine transition; the audit trail is uniform across rails.
* Both services are stateless except for their dedicated audit tables — they scale horizontally without coordination.
* Replacing the embedded sanctions provider with Chainalysis or Refinitiv is a one-class swap behind the `SanctionsProvider` interface; the rest of the system doesn't notice.
* Vendor KYC integrations call into `setTier` from webhook handlers, keeping the tier transitions auditable.

## Open items deferred to S3

* Vendor KYC integrations (Sumsub, Onfido, Persona).
* Real sanctions providers (Chainalysis, Refinitiv World-Check, Comply Advantage).
* `REVIEW` → human-in-the-loop pause-and-resume of the execution pipeline.
* Trained anomaly model bolted onto the rule-based scorer.
* Per-jurisdiction caps tied to KYC tier (`KycService.perTxLimitUsdMinor` is the seed).
