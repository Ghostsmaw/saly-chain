# `@salychain/service-compliance`

The compliance service is a **pre-condition** for every intent. It owns:

1. **Sanctions screening** of subjects (actors, counterparties, wallet addresses).
2. **KYC / KYB tier state machine** with per-tier transaction limits.
3. **Case management** for human review when a screen returns `REVIEW` or `BLOCK`.

It is intentionally split from the execution service. Compliance failures must produce auditable artifacts (subjects, screening results, cases), not just a thrown exception.

## Architecture

* `SanctionsProvider` is a swappable interface. The default implementation is `EmbeddedSanctionsProvider` — a deterministic in-memory list of test addresses, names, and high-risk country codes. The provider boundary is what we'd point at ComplyAdvantage / Chainalysis / Refinitiv in prod.
* Every screen produces:
  * One or more `ScreeningResult` rows (per provider per subject).
  * A `ComplianceCase` if the aggregate decision is `REVIEW` or `BLOCK`.
* KYC tier transitions are explicit. The execution service consults the tier and per-tier limits before approving any intent above a threshold.

See [`docs/adr/0010-compliance-and-risk-integration.md`](../../docs/adr/0010-compliance-and-risk-integration.md).

## API

* `POST /v1/screening/screen` — screen a subject (actor / counterparty / address).
* `GET /v1/kyc/tier/:subject_id` — fetch current tier + limits.
* `PATCH /v1/kyc/tier/:subject_id` — explicit tier transition (admin / KYC ops).
* `GET /v1/cases` — list open compliance cases (queue view).
* `PATCH /v1/cases/:case_id` — close / reassign / annotate a case.

Swagger UI at `/docs`.

## Configuration

See `.env.example`. The compliance service only needs Postgres; provider URLs are optional and the embedded provider is the default.
