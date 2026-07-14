# ADR-0015: Agent wallets and spending controls

**Status:** Accepted  
**Date:** 2026-05-28  
**Slice:** S4 — AI native

## Context

SalyChain's S4 exit criterion is: *an agent autonomously settles an invoice*. That requires:

1. A first-class **agent** actor (`agt_*`) bound to an owner (`usr_*` / `biz_*`)
2. **Custodial agent wallets** (`AGENT_CUSTODIAL`) provisioned per chain
3. **Spending controls** enforced before execution and again at sign time
4. **Consumer identity** (JWT + delegations) for the Saly AI surface, deferred from S3 (ADR-0012)

## Decision

### Agent registry (`services/agents`)

- Agents are registered via `POST /v1/agents` with owner binding and optional org linkage.
- On create, the service provisions `AGENT_CUSTODIAL` wallets (default: BASE) and seeds a spending policy.
- Policies sync to `wallet.wallet_policies` so the signer enforces caps without a second source of truth.

### Spending policy hierarchy

| Layer | Responsibility |
|---|---|
| `AgentSpendingPolicy` | Canonical policy template (per-tx cap, daily cap, allowlist) |
| `WalletPolicy` | Materialized copy on each agent wallet; signer reads this |
| `authorize-spend` | Pre-flight check in execution before compliance/routing |
| Signer `PolicyEngine` | Final gate before key unwrap (ADR-0005) |

Rolling 24h spend is computed from `wallet.broadcast_jobs` (PENDING/SUBMITTED/CONFIRMED in window).

### Identity (`services/identity`)

- Consumer users get JWT access tokens (HS256 in dev; RS256 + KMS in prod).
- **Delegation grants** link `usr_*` → `agt_*` with scopes.
- Gateway accepts **either** API keys (`sk_*`) or JWT (`Bearer eyJ…`).

### Intent kinds

- `INVOICE` — same execution path as `PAYOUT`; invoice metadata lives in `metadata.invoice_id`.
- `AGENT_PAY` — requires `actor.type === AGENT`; policy pre-check mandatory.
- Reasoning logs (`metadata.reasoning`) are persisted by the intent service for admin audit.

### Gateway surface

New routes: `/v1/agents`, `/v1/wallets` with scopes `agents:*`, `wallets:read`.

## Consequences

**Positive**

- Agents cannot spend beyond policy even if execution is compromised — signer is the final gate.
- Partners (API keys) and consumers (JWT) share one gateway without duplicating business logic.
- Reasoning logs give operators visibility into AI-driven payment decisions.

**Negative / follow-ups**

- HS256 JWT is dev-only; production needs RS256 + rotation (RS256 supported in S3.1; rotation automation still pending).
- ~~Monthly caps modeled in schema but not enforced yet.~~ Enforced in S3.1.
- ~~Approval threshold rejects at signer with `approvers: 0`.~~ Wallet resolves approval votes from agents at sign time (S3.1); admin **Approve** action at `/approvals` (S4+ runbook).

## References

- ADR-0012 — B2B surface (OAuth deferred to S4)
- ADR-0005 — Custody isolation (signer policy gate)
- Runbook: `docs/runbooks/s4-agent-invoice-settlement.md`
