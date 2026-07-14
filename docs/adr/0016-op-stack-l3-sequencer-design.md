# ADR-0016: OP-Stack L3 sequencer design (SalyChain on Base)

**Status**: Accepted (spike)
**Date**: 2026-05
**Slice**: S5 — L3
**Supersedes**: Extends [ADR-0008](0008-base-as-primary-evm-rail.md) L3 path

## Context

SalyChain settles customer value on **Base** today (S1–S4). The official roadmap (S5) calls for a **SalyChain L3** — an OP-Stack rollup that:

1. Inherits Base’s USDC liquidity and Coinbase alignment as the **settlement layer**.
2. Gives SalyChain dedicated blockspace for high-volume intent execution, agent batches, and future $SALY utility (S9).
3. Reuses the same toolchain engineers already use (`op-geth`, `viem`, `packages/chain-base` patterns).

Base itself is an OP-Stack L2 on Ethereum. SalyChain L3 is an **L3 on Base** (settlement posts to Base Sepolia in devnet, Base mainnet in production).

## Decision

Adopt the **standard OP-Stack rollup architecture** with Base as L1 (settlement layer):

| Component | Role |
|-----------|------|
| **op-geth** | L3 execution client — EVM state, mempool, block production |
| **op-node** | Rollup driver — derives L3 blocks from batches posted to Base, syncs peers |
| **op-batcher** | Compresses L3 blocks → submits `Channel` / batch txs to Base `BatchInbox` |
| **op-proposer** | Submits L2 output roots to Base `L2OutputOracle` (or DisputeGameFactory in fault-proof mode) |
| **Sequencer** | Runs op-geth + op-node with `--sequencer.enabled`; orders L3 txs before batching |

### Settlement flow (devnet)

```text
User tx → Saly L3 (op-geth)
       → op-batcher → Base Sepolia BatchInbox
       → op-proposer → Base Sepolia L2OutputOracle.OutputProposed
       → SalyChain l3-rollup-monitor observes → NATS salychain.chain.l3.output_proposed
```

### Chain IDs (devnet spike)

| Network | Chain ID | Settlement |
|---------|----------|------------|
| Saly L3 devnet | `845320001` | Base Sepolia (`84532`) |
| Saly L3 testnet | TBD | Base Sepolia |
| Saly L3 mainnet | TBD | Base mainnet (`8453`) |

### Integration with SalyChain services

- **`packages/chain-l3`**: L3 network registry, OP-Stack contract ABIs, rollup monitor (reads settlement layer).
- **`services/workers/l3-rollup-monitor`**: Polls Base for output proposals / batch posts; emits domain events.
- **`packages/chain-base`**: Unchanged for S5 — L3 wallet adapter lands after devnet exit criteria.
- **Execution / wallet**: No L3 rail in S5 spike — monitor-only until contracts and sequencer are stable.

## Sequencer design

### Single-sequencer devnet (S5 spike)

- One trusted sequencer process (op-geth + op-node) for devnet.
- Batcher and proposer run as separate processes with hot keys funded on Base Sepolia.
- No high-availability or leader election in S5 — documented for S5+ hardening.

### Production target (post-spike)

- Sequencer HA behind consensus (e.g. Conductor + raft) or delegated sequencing partner.
- Fault-proof mode (`DisputeGameFactory`) instead of legacy `L2OutputOracle`.
- KMS-backed batcher/proposer keys (same isolation model as ADR-0005 signer).
- Rate limits and MEV policy at the sequencer RPC gateway.

### Security boundaries

- Sequencer keys ≠ custodial wallet keys (ADR-0005). Batcher/proposer only submit rollup data.
- Customer funds remain in ledger + custodial wallets on Base until L3 rail is production-ready.
- L3 bridge deposits/withdrawals are out of scope for S5 spike.

## Implementation (S5 spike scope)

1. ADR-0016 (this document).
2. `packages/chain-l3` — network config + `L3RollupMonitor`.
3. `infra/l3/devnet/` — op-deployer template + bootstrap script.
4. `services/workers/l3-rollup-monitor` — settlement observer.
5. Runbook: `docs/runbooks/s5-l3-devnet-rollup.md`.
6. Admin `/l3` dashboard — architecture + live output proposals.

## Exit criteria (S5)

- [ ] Devnet rollup deployed with Base Sepolia as settlement layer.
- [ ] At least one `OutputProposed` event observed on Base Sepolia by `l3-rollup-monitor`.
- [ ] Admin dashboard shows latest proposal + sequencer component status.
- [ ] Runbook documents full bootstrap from clean clone.
- [ ] `pnpm l3:verify` exits 0 when spike is complete (see `packages/chain-l3/src/cli/verify-spike.ts`).

## Consequences

### Positive

- Validates ADR-0008 L3 path without forking the EVM toolchain.
- Rollup monitor reuses viem + same RPC patterns as `chain-listener-base`.
- Clear separation: spike observes settlement; execution integration is a follow-on PR.

### Negative

- Devnet requires external OP-Stack tooling (optimism monorepo / op-deployer) — not fully dockerized in SalyChain repo yet.
- Single-sequencer devnet is not representative of production fault tolerance.

## Out of scope for S5

- L3 custodial wallets in `services/wallet`.
- L3 chain listener for user deposits.
- Fault-proof dispute games.
- Token ($SALY) contracts on L3 (S9).
