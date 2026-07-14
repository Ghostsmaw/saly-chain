# ADR-0017: L3 money rail (SalyChain OP-Stack)

**Status**: Accepted  
**Date**: 2026-05  
**Slice**: S6 — L3 money rail  
**Extends**: [ADR-0016](0016-op-stack-l3-sequencer-design.md)

## Context

S5 validated settlement observation (output roots on Base). S6 adds **custodial USDC movement on L3 execution RPC** using the same wallet → execution → routing → confirmations pipeline as Base (ADR-0008).

## Decision

Introduce **`SALY_L3`** as a first-class chain and **`L3`** as a routing rail:

| Layer | Component |
|-------|-----------|
| Adapter | `L3ChainAdapter` in `packages/chain-l3` |
| Wallet | `L3Dispatcher`, `Chain.SALY_L3` |
| Listener | `chain-listener-l3` on L3 execution RPC |
| Execution | `L3_PAYOUT`, `POST /v1/payouts/l3` |
| Routing | `L3UsdcEvaluator`, `ROUTING_L3_ENABLED` |
| Ledger | `liability.pending.l3.*`, `asset.custody.l3.*` |
| Events | `salychain.chain.l3.transfer_observed` |

### Stable devnet RPC + assets

- RPC: `L3_L3_RPC_URL` → manifest `l3_rpc_url` → default `http://127.0.0.1:9545`
- USDC: `L3_USDC_ADDRESS` → manifest `assets.USDC`

### Distinction from S5 monitor

| Worker | Observes | Purpose |
|--------|----------|---------|
| `l3-rollup-monitor` | Base Sepolia `L2OutputOracle` | Settlement / spike exit |
| `chain-listener-l3` | L3 op-geth USDC transfers | Payout confirmation |

## Consequences

### Positive

- Dedicated L3 blockspace for high-volume intents without leaving SalyChain custody model.
- Reuses viem EVM adapter pattern — no new signing primitive.

### Negative

- Devnet USDC address is deploy-specific until standard bridge tooling is dockerized.
- Two listeners (Base + L3) increase ops surface.

## Out of scope

- Customer-facing L3 bridge deposits/withdrawals
- L3 DEX / escrow
- Production sequencer HA (post-S6)
