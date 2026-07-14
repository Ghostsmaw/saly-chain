# D2 — L3 ↔ Base canonical bridge

Operational runbook for the OP-Stack bridge rail (Milestone D2).

## Prerequisites

- D1 testnet manifest with real contract addresses (`infra/l3/testnet/deployments.base-sepolia.json`)
- Base Sepolia RPC (`BASE_RPC_URL` / `L3_SETTLEMENT_RPC_URL`)
- L3 RPC (`L3_L3_RPC_URL`)
- Shared wallet Postgres for listener checkpoints
- NATS JetStream (`NATS_URL`)

## Components

| Component | Package | Port |
|-----------|---------|------|
| Bridge deposit listener | `@salychain/worker-chain-listener-base-bridge` | 9102 |
| L3 transfer listener | `@salychain/worker-chain-listener-l3` | 9101 |
| Bridge orchestration | `@salychain/service-execution` `/v1/bridge/*` | 4003 |
| Contract registry sync | `@salychain/service-contract-registry` | 4013 |

## Environment

```bash
# From manifest (auto-applied when L3_DEPLOYMENTS_FILE or default path exists)
L3_OPTIMISM_PORTAL=0x...
L3_L1_STANDARD_BRIDGE=0x...
L3_L2_STANDARD_BRIDGE=0x...
L3_NETWORK=saly-testnet
L3_L3_RPC_URL=https://...

# Base bridge listener
BASE_NETWORK=base-sepolia
BASE_RPC_URL=https://sepolia.base.org
DATABASE_URL=postgres://...   # wallet DB (checkpoints)
NATS_URL=nats://localhost:4222
METRICS_PORT=9102
```

## Local dev

```bash
pnpm install
pnpm -F @salychain/worker-chain-listener-base-bridge prisma:generate
pnpm -F @salychain/service-execution prisma:generate

# Terminal 1 — bridge listener (fail-closed without portal address)
pnpm -F @salychain/worker-chain-listener-base-bridge dev

# Terminal 2 — execution (bridge API + ledger settlement)
pnpm -F @salychain/service-execution dev
```

Health: `http://127.0.0.1:9102/health`  
Metrics: `http://127.0.0.1:9102/metrics`

## Deposit flow (Base → L3)

1. Custodial user calls `POST /v1/bridge/deposit` with Base source wallet + L3 destination wallet.
2. Execution reserves Base wallet liability and broadcasts transfer toward `L1StandardBridge`.
3. `chain-listener-base-bridge` emits `CHAIN_BASE_BRIDGE_ERC20_DEPOSIT_OBSERVED`.
4. Execution posts bridge Base-leg ledger journal (`asset.custody.bridge.base`).
5. `chain-listener-l3` emits `CHAIN_L3_TRANSFER_OBSERVED` when L3 wallet is credited.
6. Execution settles pending bridge liability into destination wallet → `SETTLED`.

## Withdraw flow (L3 → Base)

1. `POST /v1/bridge/withdraw` with L3 source wallet + Base destination address.
2. Execution reserves L3 wallet liability and broadcasts `approve` + `withdrawTo` on `L2StandardBridge`.
3. `chain-listener-l3` emits `CHAIN_L3_BRIDGE_WITHDRAWAL_INITIATED` → ledger L3 bridge leg (`liability.pending.l3` → `liability.pending.bridge.l3_to_base`).
4. When Base credits the `l1_recipient`, `chain-listener-base` emits `CHAIN_BASE_TRANSFER_OBSERVED` → execution settles bridge pending to wallet or external custody → `SETTLED`.
5. Full OP fault-proof finalization timing is environment-dependent (production hardening: D3).

## Verify

```bash
curl -s localhost:4003/v1/bridge/status | jq
curl -s localhost:4003/v1/bridge/transactions | jq '.data | length'
curl -s localhost:9102/health
```

Admin: **L3 Rollup → L3 ↔ Base bridge** panel  
Explorer: `/l3/bridge`

## Security notes

- Listener only indexes deposits from **known custodial Base addresses** (fail-safe against external noise).
- Bridge listener exits on startup if `OptimismPortal` is unset (fail-closed).
- Ledger bridge accounts are system-scoped; wallet credits require matching L3 observation.
- Mock registry row `c_l3bridge` is deprecated when manifest sync runs.
