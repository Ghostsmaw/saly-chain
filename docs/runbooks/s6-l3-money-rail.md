# S6 — L3 money rail (USDC on Saly OP-Stack L3)

End-to-end custodial USDC payouts on **Saly L3 devnet** — wallets, execution, listener, routing, and admin UI. Extends [ADR-0016](../adr/0016-op-stack-l3-sequencer-design.md) (settlement monitor) with the full money rail per [ADR-0017](../adr/0017-l3-money-rail.md).

## Prerequisites

- S5 devnet running (`pnpm l3:up`; op-geth RPC on `:9545`)
- L3 USDC deployed — `pnpm l3:deploy:usdc` (writes `assets.USDC` into the manifest),
  or bridge real USDC and set `L3_USDC_ADDRESS`
- `pnpm infra:up` (Postgres, Redis, NATS)
- Prisma migrations applied

## 1. Configure env

Root or service `.env`:

```bash
L3_NETWORK=saly-devnet
L3_L3_RPC_URL=http://127.0.0.1:9545
L3_USDC_ADDRESS=0xYourL3UsdcContract
ROUTING_L3_ENABLED=true
```

Optional manifest (`infra/l3/devnet/deployments.base-sepolia.json`):

```json
{
  "l3_rpc_url": "http://127.0.0.1:9545",
  "assets": { "USDC": "0x..." }
}
```

## 2. Provision L3 wallet

```bash
curl -X POST http://localhost:4002/v1/wallets \
  -H 'Content-Type: application/json' \
  -d '{
    "chain": "SALY_L3",
    "kind": "BUSINESS_CUSTODIAL",
    "label": "treasury-l3-devnet"
  }'
```

Fund the wallet with devnet USDC: either seed it at deploy time
(`L3_USDC_TREASURY_ADDRESS=<wallet> L3_USDC_TREASURY_MINT=… pnpm l3:deploy:usdc`)
or call the `SalyTestUSDC.faucet(amount)` public faucet from the wallet address.

## 3. Start workers

```bash
pnpm -F @salychain/worker-chain-listener-l3 dev
pnpm -F @salychain/worker-l3-rollup-monitor dev   # settlement (S5)
```

## 4. Payout

```bash
curl -X POST http://localhost:4003/v1/payouts/l3 \
  -H 'Content-Type: application/json' \
  -d '{
    "idempotency_key": "l3-payout-001",
    "source_wallet_id": "<uuid>",
    "destination_address": "0xRecipient",
    "amount_minor": "1000000",
    "asset": "USDC"
  }'
```

Expected lifecycle: `CREATED → … → AWAITING_CONFIRMATION → SETTLED` after listener emits `salychain.chain.l3.transfer_observed`.

## 5. Intent routing

Route USDC → USDC to `SALY_L3` or `saly-devnet` destination:

```bash
curl -X POST http://localhost:4007/routing/decide \
  -H 'Content-Type: application/json' \
  -d '{
    "source": { "type": "WALLET", "chain": "SALY_L3", "currency": "USDC" },
    "destination": { "type": "EXTERNAL_ADDRESS", "chain": "saly-devnet", "address": "0x...", "currency": "USDC" },
    "amount_minor": 1000000
  }'
```

## 6. Admin / business UI

- **Admin → L3 Rollup** (`/l3`) — settlement + money rail status
- **Admin → Wallets** — SALY_L3 custody row
- **Business → Transfers** — chain picker includes Saly L3

## Exit criteria (S6)

- [ ] L3 wallet provision + USDC payout settles via listener
- [ ] Routing selects `L3` rail for saly-\* destinations
- [ ] Ledger accounts `liability.pending.l3.usdc` / `asset.custody.l3.usdc`
- [ ] Admin `/l3` shows money rail operational status

## Out of scope

- L3 ↔ Base bridge UX
- DEX / escrow on L3
- $SALY token (S9)
