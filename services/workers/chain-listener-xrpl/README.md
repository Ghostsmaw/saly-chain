# `@salychain/worker-chain-listener-xrpl`

Polls validated XRPL ledgers for Payment transactions against our custodial wallet addresses and emits NATS settlement events.

## What it does

1. Reads the last processed ledger from `xrpl_listener_checkpoints`.
2. Connects to a rippled WebSocket endpoint via `xrpl.js`.
3. Pulls validated ledgers in batches; for each ledger, expands all transactions, filters for `Payment` types that touch our addresses.
4. Emits `salychain.chain.xrpl.payment_observed` per match and `salychain.chain.xrpl.ledger_observed` per batch (liveness).
5. Updates the checkpoint atomically.

The execution service consumes `salychain.chain.xrpl.payment_observed` and transitions matching `AWAITING_CONFIRMATION` transactions to `SETTLED`.

## Notes on finality

The XRPL has no reorgs once a ledger is validated. We always query with `ledger_index: 'validated'` and operate on the validated ledger result, so `LISTENER_CONFIRMATIONS` defaults to `0`. The S1 Base listener uses 2 confirmations because EVM rollups can reorg briefly at the tip.
