# ADR 0009 — Rail-evaluator routing model

* **Status:** Accepted
* **Date:** 2026-05
* **Slice:** S2

## Context

Once SalyChain supports more than one settlement rail (internal ledger, Base USDC, XRPL native, future fiat schemes), every money movement has to answer: *which rail?*

Three properties matter:

1. **Deterministic + auditable.** Regulators and analysts must be able to ask "why did this transaction go through Base instead of XRPL?" and get a complete answer, including the inputs, candidate scores, and the rule applied.
2. **Pluggable.** New rails get added without touching the decider. New scoring dimensions (e.g. carbon cost, regulatory exposure) also slot in without rewrites.
3. **Honest about uncertainty.** Some rails are unavailable for a given intent (wrong currency, disabled by ops, destination address shape). The decider must be able to say "no rail is available" cleanly rather than picking something pointless.

We considered:

* **Hardcoded `if/else` per intent kind.** Fast to ship, opaque, untestable.
* **A trained ML model.** Right destination, wrong starting point — we have zero labeled data yet, and the audit story is harder.
* **Rules-engine DSL (e.g. JSON-based).** Too much new vocabulary for the value it adds; we'd still need to compose it with score functions.

## Decision

`services/routing` exposes a single `POST /v1/routing/decide` endpoint. Internally:

1. Each rail is implemented as a `RailEvaluator` returning a `RailEvaluation`:
   `{ rail, available, expectedCostUsdMinor, expectedSeconds, reliability, privacy, notes[] }`.
2. The `RoutingDecider` runs every evaluator in parallel and normalizes each to four sub-scores in `[0, 100]`: cost, speed, reliability, privacy.
3. The four sub-scores are blended via configurable weights (must sum to 100), with two adjustments:
   - small bonus for the user's stated `preference` ("cheapest" / "fastest" / "most_private")
   - penalty for high-risk intents on rails with weak claw-back semantics
4. The highest-scoring **available** rail wins. The full input, every evaluation, and the rationale are persisted as a `RouteDecision` row.

## Rail evaluators in S2

| Rail        | Source contract                                   | Notes                                                 |
| ----------- | ------------------------------------------------- | ----------------------------------------------------- |
| `INTERNAL`  | both endpoints are SalyChain accounts, same ccy   | zero cost, ~1s settle, score≈100                      |
| `BASE`      | USDC→USDC on a `base-*` chain                     | ~$0.05 gas, 12s soft finality                         |
| `XRPL`      | XRP→XRP on an `xrpl-*` chain                      | sub-cent fee, ~4s validated finality                  |
| `FIAT`      | placeholder, disabled                             | bank-partner integration lands in S3                  |

## Consequences

* Adding a new rail = implementing one class. No core code changes.
* A rail going offline is an ops switch (`ROUTING_<RAIL>_ENABLED=false`), not a deploy.
* Every routing decision is replayable: given the persisted input, the same code path produces the same answer (modulo intentional weight changes — those are versioned by recording the weights snapshot inside the candidates blob in S3).
* The score breakdown is human-readable in the admin UI — analysts can immediately tell which dimension drove the pick.

## Open items deferred to S3

* Persisting the scoring-weights snapshot per decision (so weight changes don't break replay).
* Per-actor preference profiles ("this user always prefers fastest").
* Counterfactual analysis ("what if BASE were down?") via an admin replay endpoint.
* ML-trained scoring head for the weights, with the rule-based decider remaining as fallback.
