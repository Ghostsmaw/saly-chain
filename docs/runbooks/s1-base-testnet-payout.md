# Runbook: end-to-end Base Sepolia payout

This walks an engineer through making a real USDC payout on Base Sepolia using the full S1 stack. ~10 minutes if your local infra is already up.

## Pre-flight

1. Boot the local infra:
   ```bash
   pnpm infra:up
   ```
   This brings up Postgres, Redis, NATS JetStream, MinIO, OTel, Prometheus, Loki, Grafana, MailHog.

2. Generate a local KMS master key for the signer:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```
   Copy the output into `services/signer/.env` → `KMS_LOCAL_MASTER_KEY=...`.

3. Run migrations and start services in this order (each in its own terminal):
   ```bash
   pnpm --filter @salychain/service-signer prisma:migrate
   pnpm --filter @salychain/service-ledger prisma:migrate
   pnpm --filter @salychain/service-wallet prisma:migrate
   pnpm --filter @salychain/service-execution prisma:migrate
   pnpm --filter @salychain/worker-chain-listener-base prisma:migrate

   pnpm --filter @salychain/service-signer dev      # :4099
   pnpm --filter @salychain/service-ledger dev      # :4001
   pnpm --filter @salychain/service-wallet dev      # :4002
   pnpm --filter @salychain/service-execution dev   # :4003
   pnpm --filter @salychain/worker-chain-listener-base dev
   ```

4. Open the admin dashboard:
   ```bash
   pnpm --filter @salychain/app-admin dev
   ```
   Visit http://localhost:3001.

## Step 1 — Bootstrap ledger accounts

Chain payouts reserve user wallet liability and settle into custody accounts. Create the system accounts once per environment:

```bash
# Pending liability pools (funds committed, not yet on-chain)
curl -X POST http://localhost:4001/v1/accounts -H 'content-type: application/json' \
  -d '{"code":"liability.pending.base.usdc","type":"LIABILITY","currency":"USDC"}'
curl -X POST http://localhost:4001/v1/accounts -H 'content-type: application/json' \
  -d '{"code":"liability.pending.xrpl.xrp","type":"LIABILITY","currency":"XRP"}'

# Custody asset accounts (on-chain funds reflected in ledger)
curl -X POST http://localhost:4001/v1/accounts -H 'content-type: application/json' \
  -d '{"code":"asset.custody.base.usdc","type":"ASSET","currency":"USDC"}'
curl -X POST http://localhost:4001/v1/accounts -H 'content-type: application/json' \
  -d '{"code":"asset.custody.xrpl.xrp","type":"ASSET","currency":"XRP"}'
```

Re-running these returns `409` if the codes already exist — that is fine.

## Step 2 — Provision a Base wallet

```bash
curl -X POST http://localhost:4002/v1/wallets \
  -H 'content-type: application/json' \
  -d '{"chain":"BASE","kind":"HOT_OPERATIONAL","label":"S1 demo hot wallet"}'
```

The response includes the wallet `id` and the Base address. **Copy both.**

```json
{
  "id": "01J...",
  "chain": "BASE",
  "address": "0xabc123...",
  "signer_key_ref": "kms:local:...",
  ...
}
```

## Step 3 — Credit the wallet liability (dev only)

Provisioning a wallet creates a linked `liability.wallet.{id}` account. Credit it so the payout can reserve funds:

```bash
# Replace with wallet id and ledger account ids from steps 2–3
WALLET_ID="<wallet id>"
WALLET_LIAB=$(curl -s http://localhost:4001/v1/accounts/by-code/liability.wallet.${WALLET_ID} | jq -r .id)
CUSTODY=$(curl -s http://localhost:4001/v1/accounts/by-code/asset.custody.base.usdc | jq -r .id)

curl -X POST http://localhost:4001/v1/journal/entries -H 'content-type: application/json' \
  -d "{
    \"idempotency_key\": \"bootstrap-wallet-${WALLET_ID}\",
    \"memo\": \"Dev credit for S1 payout\",
    \"postings\": [
      {\"account_id\":\"${CUSTODY}\",\"direction\":\"DEBIT\",\"amount_minor\":\"10000000\",\"currency\":\"USDC\"},
      {\"account_id\":\"${WALLET_LIAB}\",\"direction\":\"CREDIT\",\"amount_minor\":\"10000000\",\"currency\":\"USDC\"}
    ]
  }"
```

This debits custody (simulating prefunded omnibus) and credits the user's wallet liability.

## Step 4 — Fund the wallet with test USDC

Send some Base Sepolia USDC to the wallet's address. Easiest source: [Circle's Base Sepolia faucet](https://faucet.circle.com/) (USDC) plus [Base Sepolia ETH faucet](https://www.alchemy.com/faucets/base-sepolia) for gas.

You need:
- ~0.001 ETH on Base Sepolia (for gas).
- The USDC amount you intend to send (e.g. 5 USDC = `5000000` minor units).

Verify by checking the address on [sepolia.basescan.org](https://sepolia.basescan.org/).

## Step 5 — Initiate a payout via the execution service

```bash
curl -X POST http://localhost:4003/v1/payouts/base \
  -H 'content-type: application/json' \
  -d '{
    "idempotency_key": "demo-payout-001",
    "source_wallet_id": "<wallet id from step 1>",
    "destination_address": "0xRECIPIENT...",
    "amount_minor": "1000000",
    "asset": "USDC"
  }'
```

The response includes the transaction `id` and the initial state. The transaction will progress through:

```
CREATED → SCREENED → ROUTED → RESERVED → EXECUTING → AWAITING_CONFIRMATION → SETTLED
```

## Step 6 — Watch it land

- **Admin dashboard**: visit `/transactions/<id>` to see the state machine progressing in real time. The page refreshes on reload.
- **NATS** (optional): tail events with `nats sub "salychain.tx.>"`.
- **Basescan**: paste the `tx_hash` from the transaction detail page to see the on-chain confirmation.

The chain listener trails the head by 2 blocks (Sepolia default), so settlement typically lands within 20–40s of broadcast.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| `ledger.account.not_found` on payout | System accounts missing | Run Step 1 bootstrap |
| `ledger.insufficient_funds` on reserve | Wallet liability not credited | Run Step 3 dev credit |
| `signer.kms.local_invalid_master_key` | Wrong-sized `KMS_LOCAL_MASTER_KEY` | Regenerate (32 random bytes, base64-encoded) |
| Transaction stuck in `EXECUTING` | Wallet has no ETH for gas | Fund the wallet address with Base Sepolia ETH |
| Transaction stuck in `AWAITING_CONFIRMATION` | Listener not running | `pnpm --filter @salychain/worker-chain-listener-base dev` |
| `chain.base.rpc_error` on broadcast | Public RPC throttled | Switch `BASE_RPC_URL` to a paid provider (Alchemy, Quicknode, Infura) |
| `signer.policy.destination_not_allowed` | Wallet policy is locked down | Update `wallet_policies` to permit destination (see ADR-0005) |

## Cleanup

```bash
pnpm infra:down
```
