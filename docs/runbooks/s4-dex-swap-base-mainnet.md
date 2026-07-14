# S4 — On-chain DEX swap on Base Mainnet

Production runbook for **USDC ↔ WETH**, **USDC ↔ DAI**, and **WETH ↔ DAI** via Uniswap V3 through custodial wallets on Base mainnet.

## Prerequisites

| Component | Requirement |
|-----------|-------------|
| Network | `BASE_NETWORK=base-mainnet` |
| RPC | `BASE_RPC_URL=https://mainnet.base.org` (or your provider) |
| Liquidity | `DEX_QUOTE_STUB_FALLBACK=false` |
| Business UI | `NEXT_PUBLIC_BASE_NETWORK=base-mainnet` |
| Wallet / Signer | Router allowlist `0x2626664c2603336E57B271c5C0b26F421741e481` |
| Ledger | `LEDGER_CHAIN_RESERVATION_ENABLED=true` |

## 1. Verify pools & quoter

```bash
BASE_NETWORK=base-mainnet BASE_RPC_URL=https://mainnet.base.org \
  pnpm --filter @salychain/chain-base check-pool
```

Expected: all configured pairs report non-zero liquidity and QuoterV2 samples.

## 2. Supported pairs (mainnet)

| Pair | Fee tier | Notes |
|------|----------|-------|
| USDC ↔ WETH | 0.3% | Primary volatile pair |
| USDC ↔ DAI | 0.01% | Stable ↔ stable |
| WETH ↔ DAI | 0.3% | ETH exposure |

Sepolia dev/testing: see [s4-dex-swap-base-sepolia.md](./s4-dex-swap-base-sepolia.md) (USDC ↔ WETH only).

## 3. Wallet signer policy

New BASE wallets auto-allowlist the canonical SwapRouter02. For existing wallets:

```bash
curl -X POST "http://localhost:4002/v1/wallets/{wallet_id}/policy/ensure-dex"
```

## 4. Quote

```bash
curl -s -X POST http://localhost:4006/v1/quotes/dex \
  -H 'Content-Type: application/json' \
  -d '{
    "from_currency": "USDC",
    "to_currency": "DAI",
    "from_amount_minor": 1000000,
    "recipient": "0xYOUR_WALLET_ADDRESS",
    "slippage_bps": 50
  }' | jq .
```

List supported pairs:

```bash
curl -s http://localhost:4006/v1/quotes/dex/pairs | jq .
```

## 5. Live E2E test (CI / staging)

On-chain infrastructure validation (skipped by default):

```bash
DEX_E2E_LIVE=true BASE_NETWORK=base-mainnet BASE_RPC_URL=https://mainnet.base.org \
  pnpm --filter @salychain/chain-base test -- dex.live.spec.ts
```

For Sepolia:

```bash
DEX_E2E_LIVE=true BASE_NETWORK=base-sepolia \
  pnpm --filter @salychain/chain-base test -- dex.live.spec.ts
```

## 6. Expected pipeline

```
ROUTED (BASE) → QUOTED (QuoterV2) → RESERVED (ledger) → EXECUTING (DEX_SWAP)
→ AWAITING_CONFIRMATION → SETTLED
```

## Contracts (Base Mainnet)

| Contract | Address |
|----------|---------|
| SwapRouter02 | `0x2626664c2603336E57B271c5C0b26F421741e481` |
| QuoterV2 | `0x3d4e44Eb1374240CE5F1B871ab261CD16335B76a` |
| Factory | `0x33128a8fC17869897dcE68Ed026d694621f6FDfD` |
| USDC | `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913` |
| WETH | `0x4200000000000000000000000000000000000006` |
| DAI | `0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb` |

## Troubleshooting

| Error | Fix |
|-------|-----|
| `liquidity.dex.unsupported_pair` | Pair not enabled on this network — check `/v1/quotes/dex/pairs` |
| `liquidity.dex.no_pool` | Pool empty — verify with `check-pool` |
| `signer.policy.destination_not_allowed` | Run `ensure-dex` on wallet policy |
| Mainnet swap reverts | Real token balance + gas (ETH) on custodial wallet |
