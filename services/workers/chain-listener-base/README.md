# `@salychain/worker-chain-listener-base`

Polls Base for ERC-20 Transfer logs against our custodial wallets and emits NATS settlement events.

## What it does

1. Reads the last processed block from `chain_listener_checkpoints`.
2. Polls Base RPC for new blocks (trailing the head by `LISTENER_CONFIRMATIONS` to avoid reorgs).
3. Fetches `Transfer` logs for the configured USDC contract in the new block range.
4. Joins against our wallet addresses and emits `salychain.chain.base.transfer_observed` for every relevant transfer.
5. Always emits a `salychain.chain.base.block_observed` per batch so monitoring can detect liveness.
6. Updates the checkpoint atomically per batch.

The execution service consumes `salychain.chain.base.transfer_observed` and transitions the matching transaction from `AWAITING_CONFIRMATION` → `SETTLED`.
