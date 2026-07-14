# S4 — On-chain DEX swap on Base Sepolia

End-to-end runbook for **USDC ↔ WETH** swaps via Uniswap V3 through custodial wallets.

## Prerequisites

| Component | Requirement |
|-----------|-------------|
| Network | `BASE_NETWORK=base-sepolia` |
| RPC | `BASE_RPC_URL=https://sepolia.base.org` |
| Liquidity service | `BASE_NETWORK`, `BASE_RPC_URL`, `DEX_QUOTE_STUB_FALLBACK=false` |
| Wallet service | Router auto-allowlisted on new BASE wallets |
| Signer | Policy allows router `0x94cC0AaC535CCDB3C01d6787D6413C739ae12bc4` |
| Ledger | `LEDGER_CHAIN_RESERVATION_ENABLED=true` |

## 1. Verify pool & quoter

```bash
pnpm --filter @salychain/chain-base check-pool
```

Expected: pool address + non-zero liquidity + sample QuoterV2 output.

If no pool:

1. Fund custodial wallet with **Sepolia ETH** (gas) and **Circle test USDC** on Base Sepolia.
2. Add **USDC/WETH 0.3%** liquidity at [Uniswap](https://app.uniswap.org/) (Base Sepolia).
3. Re-run the script.

## 2. Wallet signer policy (existing wallets)

New BASE wallets get the router in `destination_allowlist` automatically.

For **existing** wallets, patch policy or use the idempotent helper:

```bash
curl -X POST "http://localhost:4002/v1/wallets/{wallet_id}/policy/ensure-dex"
```

Or patch manually:

```bash
curl -X PATCH "http://localhost:4002/v1/wallets/{wallet_id}/policy" \
  -H 'Content-Type: application/json' \
  -d '{
    "destination_allowlist": ["0x94cc0aac535ccdb3c01d6787d6413c739ae12bc4"],
    "per_tx_cap_minor": "10000000000",
    "daily_cap_minor": "100000000000"
  }'
```

## 3. Bootstrap ledger custody accounts

System accounts are created automatically on first DEX settle. Optionally pre-create:

| Code | Type | Currency |
|------|------|----------|
| `liability.pending.base.usdc` | LIABILITY | USDC |
| `liability.pending.base.weth` | LIABILITY | WETH |
| `asset.custody.base.usdc` | ASSET | USDC |
| `asset.custody.base.weth` | ASSET | WETH |

## 4. Quote (on-chain)

```bash
curl -s -X POST http://localhost:4006/v1/quotes/dex \
  -H 'Content-Type: application/json' \
  -d '{
    "from_currency": "USDC",
    "to_currency": "WETH",
    "from_amount_minor": 1000000,
    "recipient": "0xYOUR_WALLET_ADDRESS",
    "slippage_bps": 100
  }' | jq .
```

Check `dex.quote_source` is `"onchain"` and `dex.min_amount_out` matches QuoterV2 − slippage.

## 5. Submit swap intent

Business dashboard → **Swap → On-chain Base**, or submit intent with:

- `constraints.swap_execution: "onchain"`
- `metadata.source_wallet_id: "<uuid>"`
- destination: BASE `WALLET` beneficiary (same address)

## 6. Expected pipeline

```
ROUTED (BASE) → QUOTED (QuoterV2) → RESERVED (ledger) → EXECUTING (DEX_SWAP broadcast)
→ AWAITING_CONFIRMATION → SETTLED (4-leg DEX ledger + chain confirm)
```

## 7. Troubleshooting

| Error | Fix |
|-------|-----|
| `liquidity.dex.no_pool` | Add Uniswap V3 liquidity (step 1) |
| `chain.dex.quote_failed` | Pool empty or RPC issue; verify with check-pool script |
| `signer.policy.destination_not_allowed` | Patch wallet allowlist (step 2) |
| `wallet.dex_router_not_allowed` | Quote used non-canonical router — regenerate quote |
| Swap reverts on-chain | Insufficient wallet balance or minOut too high |

## Contracts (Base Sepolia)

| Contract | Address |
|----------|---------|
| SwapRouter02 | `0x94cC0AaC535CCDB3C01d6787D6413C739ae12bc4` |
| QuoterV2 | `0xC5290058841028F1614F3A6F0F5816cAd0df5E27` |
| Factory | `0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24` |
| USDC | `0x036CbD53842c5426634e7929541eC2318f3dCF7e` |
| WETH | `0x4200000000000000000000000000000000000006` |

**Mainnet** (USDC/WETH/DAI): see [s4-dex-swap-base-mainnet.md](./s4-dex-swap-base-mainnet.md).

## Live E2E test

```bash
DEX_E2E_LIVE=true BASE_NETWORK=base-sepolia pnpm --filter @salychain/chain-base test -- dex.live.spec.ts
```
