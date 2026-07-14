# `@salychain/service-execution`

The transaction orchestrator. Owns the state machine and dispatches work to the ledger, wallet, and signer services.

## What it does

- Accepts business-level transaction requests (`POST /v1/transfers`, `POST /v1/payouts/base`).
- Opens real fiat **pay-ins** (`POST /v1/payins`) via a PSP virtual account / hosted checkout; credits the ledger only on confirmed settlement (`asset.bank.<psp>.<ccy>` → destination treasury). Confirmations arrive via the fiat-listener (`POST /v1/internal/fiat/payins`) or a recovery poller.
- Reconciles the fiat pay-in rail (execution ↔ ledger) on a schedule, recording durable break records; ops surface at `POST /v1/admin/reconciliation/run` and `GET /v1/admin/reconciliation/runs` (admin token).
- Drives every transaction through the explicit state machine (`docs/ARCHITECTURE.md §6`).
- Persists every transition as an immutable event row.
- Emits domain events on NATS (`salychain.tx.*`) at every transition.
- Subscribes to chain observations and finalizes `AWAITING_CONFIRMATION` transactions when their tx hash is observed on-chain.

## What it does **not** do

- Hold monetary truth (the ledger does).
- Hold key material (the signer does).
- Decide rails beyond S1's hard-coded "ledger or Base" — routing lands in S2.

## State machine

```
CREATED ──► SCREENED ──► ROUTED ──► RESERVED ──► EXECUTING ──► AWAITING_CONFIRMATION ──► SETTLED
    └────► REJECTED                                       └────► FAILED ──► REVERSING ──► REVERSED
```

See `src/state/state-machine.ts` for the authoritative transition table and `src/state/state-machine.spec.ts` for the test suite.
