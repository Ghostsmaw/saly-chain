# Runbook — XRPL testnet payment end-to-end (S2)

## Goal

Send 1 XRP from a freshly-provisioned SalyChain custodial wallet to a test address on the XRPL testnet. Verify the chain listener picks it up, the execution service marks the transaction `SETTLED`, and the admin dashboard reflects the lifecycle.

This is the S2 analogue of the S1 [Base Sepolia payout runbook](./s1-base-testnet-payout.md). It also doubles as the smoke test for the wider intent pipeline.

## Prerequisites

* Docker + Compose running the local infra stack (Postgres, Redis, NATS).
* `pnpm install` has been run and all workspace dependencies are resolved.
* `.env` files copied from `.env.example` in each service.

## 1. Start the infra + databases

```bash
docker compose -f infra/docker/docker-compose.yml up -d postgres redis nats
```

Run Prisma migrations across every service that now exists:

```bash
pnpm -F @salychain/service-ledger        prisma:migrate
pnpm -F @salychain/service-wallet        prisma:migrate
pnpm -F @salychain/signer                prisma:migrate
pnpm -F @salychain/service-execution     prisma:migrate
pnpm -F @salychain/service-compliance    prisma:migrate
pnpm -F @salychain/service-risk          prisma:migrate
pnpm -F @salychain/service-liquidity     prisma:migrate
pnpm -F @salychain/service-routing       prisma:migrate
pnpm -F @salychain/service-intent        prisma:migrate
pnpm -F @salychain/worker-chain-listener-xrpl prisma:generate
```

## 2. Boot the S2 services

In separate panes:

```bash
pnpm -F @salychain/service-ledger     dev   # :4001
pnpm -F @salychain/service-wallet     dev   # :4002
pnpm -F @salychain/service-execution  dev   # :4003
pnpm -F @salychain/service-compliance dev   # :4004
pnpm -F @salychain/service-risk       dev   # :4005
pnpm -F @salychain/service-liquidity  dev   # :4006
pnpm -F @salychain/service-routing    dev   # :4007
pnpm -F @salychain/service-intent     dev   # :4008
pnpm -F @salychain/signer             dev   # :4099
pnpm -F @salychain/worker-chain-listener-xrpl dev
pnpm -F @salychain/app-admin          dev   # http://localhost:3001
```

Tip: `pnpm dev` from the repo root will run them all under Turborepo.

## 3. Provision an XRPL wallet

```bash
curl -sS -X POST http://localhost:4002/v1/wallets \
  -H 'Content-Type: application/json' \
  -d '{
    "chain": "XRPL",
    "kind": "USER_CUSTODIAL",
    "owner_id": "usr_01HXR4ZP9JQ8B0N1M3GZAW9PXR",
    "owner_kind": "USER",
    "label": "xrpl-testnet-smoke"
  }'
```

Note the returned `id` (the SalyChain wallet ID) and `address` (the classic `r...` XRPL address).

## 4. Fund the wallet via the XRPL faucet

The XRPL testnet faucet auto-creates accounts:

```bash
curl -sS -X POST https://faucet.altnet.rippletest.net/accounts \
  -H 'Content-Type: application/json' \
  -d '{ "destination": "<the r... address from step 3>" }'
```

Wait ~5 seconds. Verify the wallet now holds XRP:

```bash
curl -sS http://localhost:4002/v1/wallets/<wallet_id>
```

You can also check on https://testnet.xrpl.org/accounts/<address>.

## 5. Initiate an XRPL payout

Pick any test destination (you can use the faucet API again to get a second address with starting balance):

```bash
curl -sS -X POST http://localhost:4003/v1/payouts/xrpl \
  -H 'Content-Type: application/json' \
  -d '{
    "idempotency_key": "smoke-xrpl-01",
    "source_wallet_id": "<wallet_id>",
    "destination_address": "<destination r... address>",
    "amount_minor": "1000000",
    "asset": "XRP",
    "memo": "S2 smoke test"
  }'
```

`amount_minor` is denominated in drops (1 XRP = 1,000,000 drops).

The response shows the transaction in `AWAITING_CONFIRMATION` once the wallet service has prepared, signed, and submitted. The signer audit log (visible in the signer's `sign_requests` table) confirms the signing occurred.

## 6. Wait for the chain listener

`worker-chain-listener-xrpl` polls validated ledgers every ~4s. Within ~15 seconds you should see:

* `salychain.chain.xrpl.payment_observed` event on NATS (`nats sub 'salychain.chain.xrpl.>'`).
* The execution transaction transitions to `SETTLED`.

Verify:

```bash
curl -sS http://localhost:4003/v1/transactions/<tx_id> | jq '.state, .tx_hash, .events'
```

The admin dashboard (http://localhost:3001) should also show the transaction in green on the Recent Transactions table.

## 7. End-to-end intent submission (bonus)

Try the full intent pipeline:

```bash
curl -sS -X POST http://localhost:4008/v1/intents \
  -H 'Content-Type: application/json' \
  -H 'Idempotency-Key: smoke-intent-xrpl-01' \
  -d '{
    "intent": {
      "version": "1",
      "intent_id": "itn_01HZRS7H7B5K2X8M4N6P8Q0R2T",
      "kind": "PAYOUT",
      "actor": { "type": "USER", "id": "usr_01HXR4ZP9JQ8B0N1M3GZAW9PXR" },
      "source": { "amount": { "amount_minor": "500000", "currency": "XRP" } },
      "destination": {
        "currency": "XRP",
        "beneficiary": {
          "kind": "WALLET",
          "chain": "XRPL",
          "address": "<destination r... address>",
          "memo": "S2 intent smoke"
        }
      },
      "context": { "channel": "API" }
    }
  }'
```

You should see a single `IntentRecord` in `ACCEPTED` state on the intents page; the execution service runs the full pipeline (compliance → risk → routing → wallet broadcast → chain listener → settle) and the linked transaction transitions through all states.

## Troubleshooting

| Symptom                                                       | Cause / fix                                                                                                          |
|---------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------|
| `signer.xrpl.derive_failed`                                   | Local KMS master key changed; re-generate `KMS_LOCAL_MASTER_KEY` and re-provision the wallet.                        |
| `chain.xrpl.connect_failed`                                   | XRPL public node refused; switch to another endpoint in `XRPL_WS_URL` (e.g. `wss://s.devnet.rippletest.net:51233`).  |
| Transaction stuck at `AWAITING_CONFIRMATION`                  | Check listener logs and `xrpl_listener_checkpoints`; ensure listener is running and the ledger range covers the tx.  |
| `routing.no_rail_available`                                   | Source / destination currency mismatch or ROUTING_*_ENABLED=false; check the routing service env.                    |
| `liquidity.pair_unsupported`                                  | The stub provider's rate table doesn't include this pair — add it in `stub-rate.provider.ts` for dev.                |
| `compliance.subject_not_found` when calling `/kyc/tier`       | The subject doesn't exist yet; screenings auto-create subjects so call `/screening/screen` first.                    |
