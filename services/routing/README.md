# `@salychain/service-routing`

The routing service decides, for a given intent, **which rail to settle on**.

## Why a separate service

Routing logic touches every rail integration and is the single most consequential decision in a payment system (cost, time, reliability, regulatory posture). Keeping it as a separate service with a persisted audit trail of every decision means:

* The execution service stays a thin orchestrator.
* New rails plug in via a single `RailEvaluator` interface.
* Every routing decision is replayable from a `RouteDecision` row — invaluable for both debugging and regulator-facing audits.

See [ADR-0009 — rail-evaluator routing model](../../docs/adr/0009-rail-routing-model.md).

## Evaluator pattern

```
RoutingInput  ──►  for each enabled RailEvaluator:
                      evaluator.evaluate(input) → RailEvaluation { rail, cost, etaSec, riskPenalty, ok, reasons }
                  normalize → weighted score → pick best
                  persist RouteDecision (input, all evaluations, winning rail)
```

The currently shipped evaluators are:

* `InternalLedgerEvaluator` — wins when both wallets are SalyChain custodial wallets on the same asset.
* `BaseUsdcEvaluator` — wins for USDC payouts to an EVM address.
* `XrplEvaluator` — wins for XRP payouts to an XRPL address.
* `FiatRailEvaluator` — NGN/GHS/etc. bank payouts via Paystack/Flutterwave; enable with `ROUTING_FIAT_ENABLED=true`.

## API

* `POST /v1/routing/decide` — returns `{ decision_id, selected_rail, evaluations, reasoning }`.
* `GET /v1/routing/decisions?limit=…` — lists recent decisions for the admin dashboard.

Swagger at `/docs`.

## Configuration

See `.env.example`. Per-rail enablement flags and the cost/time/risk weight tuning live in env so you can tilt the router without a deploy.
