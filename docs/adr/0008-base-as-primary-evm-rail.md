# ADR-0008: Base as the primary EVM rail for S1

**Status**: Accepted
**Date**: 2026-05
**Slice**: S1

## Context

SalyChain needs at least one production EVM rail by the end of S1 to demonstrate end-to-end value movement. Candidates: Ethereum mainnet, Base, Arbitrum, Polygon PoS, Optimism, Polygon zkEVM.

## Decision

We adopt **Base** as the primary EVM rail for S1 and the eventual L3 deployment target.

Rationale:

- **Cost**: Base mainnet fees are typically <$0.01 for an ERC-20 transfer at the time of writing. Ethereum mainnet is 100–1000× higher. Customer-facing rails cannot be expensive.
- **USDC liquidity**: Native USDC (Circle) is live on Base; Coinbase routes large volumes through it. This is the asset SalyChain settles in.
- **Coinbase alignment**: Base is built and operated by Coinbase, which is the most likely fiat off-ramp partner for our network in many corridors. Lower integration friction.
- **L3 path**: Base ships an OP Stack rollup; our planned L3 inherits the same toolchain (Op-Geth, etc.). Engineers stay productive across L2 and L3.
- **viem ecosystem**: First-class TypeScript support. The signing path we picked for the signer (`viem/accounts`) targets Base natively.

## Implementation

- `packages/chain-base` is the only place that talks to Base. Other services consume it via `BaseChainAdapter` (build/sign/broadcast split per ADR-0005).
- Network selection is config-driven (`BASE_NETWORK=base-sepolia|base-mainnet`). All asset addresses (USDC, etc.) are registered per network in `packages/chain-base/src/assets.ts` to avoid wrong-network footguns.
- The chain listener (`services/workers/chain-listener-base`) trails the head by a configurable number of blocks (`LISTENER_CONFIRMATIONS`, default 2 on Sepolia, will be tuned higher on mainnet) to avoid reorg-induced double-settlements.

## Consequences

### Positive

- One rail to harden end-to-end before fanning out.
- Cheap testnet (Base Sepolia) for CI / staging — no real money required for the happy-path tests.
- Clean migration path to L3: same RPC shape, same tooling, same adapter.

### Negative

- Limited rail diversity in S1; failure of the Base sequencer hurts. Mitigated by:
  - Stateful retries on RPC failure (HttpClient + viem retry).
  - Multiple RPC providers behind a single `BASE_RPC_URL` (Cloudflare-fronted in prod).
  - The execution service holds funds in the ledger before broadcast, so an outage delays settlement but does not lose value.

## Out of scope for S1

- Ethereum mainnet adapter (deferred to S3 when whales need it).
- Polygon PoS / Arbitrum adapters (deferred to S2/S3 based on demand).
- ERC-4337 account abstraction / paymasters (deferred to S2+).
