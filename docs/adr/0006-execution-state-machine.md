# ADR-0006: Explicit transaction state machine in the execution service

**Status**: Accepted
**Date**: 2026-05
**Slice**: S1

## Context

Every SalyChain transaction passes through several stages: intent capture, screening, routing, ledger reservation, chain dispatch, confirmation, and (optionally) reversal. A bug or race in any one of these stages — a duplicate broadcast, a settled transaction marked failed, a reversal that runs after a settlement — can lose customer money or, worse, leak it.

We need:

1. A single source of truth for the state of any transaction.
2. Hard guarantees about which transitions are legal.
3. A complete audit trail (who moved this transaction, when, why).
4. Idempotency at every entrypoint.

## Decision

The execution service owns a strict, table-driven state machine with these states:

```
CREATED ──► SCREENED ──► ROUTED ──► RESERVED ──► EXECUTING ──► AWAITING_CONFIRMATION ──► SETTLED
    └────► REJECTED                                       └────► FAILED ──► REVERSING ──► REVERSED
```

- The transition table lives in [`services/execution/src/state/state-machine.ts`](../../services/execution/src/state/state-machine.ts) and is the only authority on what's legal.
- Every transition runs inside a `prisma.$transaction`, atomically updating the transaction row and writing an immutable `ExecutionTransactionEvent` row.
- Illegal transitions throw `execution.tx.invalid_state` (HTTP 409). This is preferable to silently overwriting state.
- `SETTLED`, `REVERSED`, and `REJECTED` are absorbing states; nothing can mutate them.
- Every transition emits a `salychain.tx.*` NATS event so dashboards and downstream consumers stay in sync (see ADR-0007).
- Idempotency is enforced at the top level via the caller-supplied `idempotency_key`, mapped to a unique constraint on `execution_transactions.idempotency_key`. Replays return the existing transaction row.

## Consequences

### Positive

- A misbehaving service trying to skip screening or re-settle a reversed transaction is rejected by the state machine, not by hope.
- The event log is reconstructable from `ExecutionTransactionEvent` alone — useful for compliance, debugging, and ops.
- Tests can exercise the state machine in pure unit form (`state-machine.spec.ts`), without spinning up Prisma.

### Negative

- Adding a new flow requires updating the transition table and the test matrix. We treat this as a feature, not a bug — every new pathway should be explicit.
- Long-running transactions (e.g. payouts that wait minutes for confirmations) hold a row in `AWAITING_CONFIRMATION` for that period. We accept the cost; the chain listener's checkpointing means crashes don't lose them.

## Alternatives considered

- **Status field with implicit transitions** — reject. Allows any service to set any status; the bug surface is the whole codebase.
- **External state machine library** (XState, Statecharts) — reject for S1. The simple, hand-rolled table keeps the runtime dependency surface minimal and the tests trivial. Revisit if the state space outgrows our heads.
- **Event-sourcing the whole transaction** — reject for S1. Beautiful in theory; expensive in operational complexity (rebuild projections, snapshots). The hybrid we have (current state + immutable event log) gets 90% of the benefits at 10% of the cost. We can always migrate event-sourced later.
