# ADR-0014: On-chain escrow as a routing primitive

**Status**: Accepted
**Date**: 2026-05
**Slice**: S3

## Context

Most SalyChain payments are simple: source A → destination B, settle immediately. But a meaningful class of partner use-cases needs **conditional release**:

* Marketplaces ("release on delivery confirmation").
* Freelance platforms ("release on milestone approval").
* P2P sales ("release on counterparty signature").
* Cross-border payouts with regulatory hold periods.

For chain rails, we need a contract that can hold funds and release/refund on a trusted signal.

## Decision

We ship **`contracts/escrow/SalyEscrow.sol`** — a minimal, singleton-per-chain escrow contract:

* **Deal id is supplied off-chain.** ULID-derived 32-byte identifier. This means SalyChain's backend correlates on-chain deals with internal transaction ids without paying for on-chain storage of a counter.
* **Resolver is set at construction.** This is a SalyChain operator address (single key in dev, multisig in prod). It can release or refund at any time.
* **Deadline-based auto-refund.** Each deal optionally carries a `deadline`. After it passes, **anyone** can trigger a refund — so a compromised or unresponsive resolver cannot hold partner funds hostage.
* **ERC-20 only.** Native ETH/value escrow lands later if a use-case demands it.
* **Fee-on-transfer tokens explicitly rejected.** We balance-diff on `fundDeal` and revert if we didn't receive the full amount. This avoids resolver-accounting drift.
* **Re-entrancy guarded** on every state-mutating external entry.
* **Non-upgradeable.** Rotating the resolver = redeploy + migrate. Upgradeable escrow contracts are a known foot-gun; we'd rather force operational pain than ship the vector.

## Why this shape

The hardest decision was upgradeability. Three options were on the table:

1. **Upgradeable proxy** (UUPS / Transparent). Maximum flexibility but ships an upgrade vector (a compromised admin key can drain everyone's escrowed funds via a malicious implementation).
2. **Non-upgradeable, redeploy + migrate.** Simpler. The pain is operational: rotating the resolver requires draining and re-funding. We accept this — rotations should be rare events with planned operator participation.
3. **Multi-resolver with on-chain governance.** Out of scope for the S3 starter; would also pull in a governance token / DAO surface we don't want to commit to yet.

We picked option 2.

## Integration plan

* `services/execution` adds an `ESCROW_PAYOUT` transaction kind and `ESCROW` routing rail (**S3.1 — wired**).
* `services/routing` introduces an `EscrowEvaluator` (**S3.1 — wired**) that scores `ESCROW` when the intent carries `constraints.escrow_condition`.
* On `fundDeal`, execution enqueues an `ESCROW_FUND` wallet job (approve + `fundDeal`); the chain listener observes `DealFunded` to confirm settlement.
* On `release` / `refund` we record the call site (which SalyChain operator / which automation rule triggered it) — **operator CLI for S3.1; admin API lands later**.

## Consequences

### Positive

* Conditional payments become a first-class primitive without requiring any partner integration beyond submitting a normal intent with a `condition` field.
* The contract is small enough to be auditable by a human in one sitting. ~150 SLOC.
* The deadline-based auto-refund means SalyChain operational outage cannot trap partner funds.

### Negative

* Singleton contract per chain means every partner shares the same address. This is fine on Base (it's how most DeFi contracts work), but the routing service has to know which `dealId` belongs to which partner — it does, because dealIds are ULIDs and every partner-issued dealId is namespaced by SalyChain's internal correlation id.
* No partial release. A deal is fully released or fully refunded. Partial flows are modelled as N separate deals upstream.
* No native ETH/value path. ERC-20 only.

## Out of scope for S3

* External audit. The contract is testnet-only until a real partner is in flight.
* Cross-chain escrow / atomic swaps.
* Native-value escrow (ETH on Base, XRP on XRPL).
* Admin API for resolver `release` / `refund` (use `cast send` in dev; see [escrow runbook](../runbooks/s3-escrow-fund-deal.md)).
