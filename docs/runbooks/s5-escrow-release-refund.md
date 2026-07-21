# S5 — Escrow Tier 2: fundDeal E2E, release/refund API, indexing, audit

Complete on-chain escrow lifecycle with operator API (replacing manual `cast send`), chain event indexing, and audit tables.

## Prerequisites

- S3 escrow deploy complete — see [s3-escrow-fund-deal.md](./s3-escrow-fund-deal.md)
- `SalyEscrow` deployed; contract address in execution, wallet, chain-listener
- **Resolver wallet** provisioned in wallet service (address must match contract `resolver()`)
- Stack running: execution, wallet, signer, chain-listener-base, NATS

## 1. Configure services

| Variable | Service | Purpose |
|----------|---------|---------|
| `ESCROW_CONTRACT_ADDRESS_BASE` | execution | fundDeal target |
| `ESCROW_CONTRACT_ADDRESS` | wallet, chain-listener | validate + index events |
| `ESCROW_RESOLVER_WALLET_ID` | execution | signs release/refund |
| `EXECUTION_ADMIN_TOKEN` | execution | admin escrow API auth |
| `WALLET_INTERNAL_ADMIN_TOKEN` | wallet + execution | internal resolve auth — REQUIRED on wallet (endpoint disabled when unset); execution presents it (falls back to `EXECUTION_ADMIN_TOKEN`) |

Resolver wallet policy must allow the **escrow contract address** in `destination_allowlist` (tx `to` = SalyEscrow).

```bash
curl -X PATCH "http://localhost:4002/v1/wallets/{resolver_wallet_id}/policy" \
  -H 'Content-Type: application/json' \
  -d '{
    "destination_allowlist": ["0xYourSalyEscrowAddress"],
    "per_tx_cap_minor": "10000000000",
    "daily_cap_minor": "100000000000"
  }'
```

## 2. fundDeal E2E

Submit intent with `constraints.escrow_condition` (see S3 runbook). Expected pipeline:

```
ROUTED (ESCROW) → RESERVED → EXECUTING (fundDeal) → AWAITING_CONFIRMATION
→ DealFunded (listener) → SETTLED + escrow_deals.status=FUNDED
```

Verify:

```bash
# Funded deals
curl -s -H "Authorization: Bearer $EXECUTION_ADMIN_TOKEN" \
  "http://localhost:4003/v1/escrow/deals?status=FUNDED" | jq .

# On-chain sync
curl -s -H "Authorization: Bearer $EXECUTION_ADMIN_TOKEN" \
  "http://localhost:4003/v1/escrow/deals/$DEAL_ID/on-chain" | jq .
```

## 3. Release / refund (admin API)

Replaces manual `cast send … release/refund`:

```bash
# Release to payee (resolver wallet signs)
curl -s -X POST -H "Authorization: Bearer $EXECUTION_ADMIN_TOKEN" \
  -H 'Content-Type: application/json' \
  "http://localhost:4003/v1/escrow/deals/$DEAL_ID/release" \
  -d '{"actor":"ops@yourco.com"}' | jq .

# Refund to payer
curl -s -X POST -H "Authorization: Bearer $EXECUTION_ADMIN_TOKEN" \
  -H 'Content-Type: application/json' \
  "http://localhost:4003/v1/escrow/deals/$DEAL_ID/refund" \
  -d '{"actor":"ops@yourco.com"}' | jq .
```

After broadcast, chain-listener emits `DealReleased` / `DealRefunded` → execution updates `escrow_deals` to `RELEASED` / `REFUNDED` with audit events.

## 4. Event indexing

| NATS subject | On-chain event | Effect |
|--------------|----------------|--------|
| `salychain.chain.base.deal_funded` | `DealFunded` | Tx → SETTLED, deal → FUNDED |
| `salychain.chain.base.deal_released` | `DealReleased` | deal → RELEASED |
| `salychain.chain.base.deal_refunded` | `DealRefunded` | deal → REFUNDED |

Listener indexes all three from the configured `ESCROW_CONTRACT_ADDRESS`.

## 5. Admin dashboard

Open **Admin → Escrow** (`/escrow`) to list deals, view audit trail, and trigger release/refund.

Set `EXECUTION_ADMIN_TOKEN` in `apps/admin/.env`.

## 6. Live E2E test (optional)

Read-only contract checks (skipped by default):

```bash
ESCROW_E2E_LIVE=true \
ESCROW_CONTRACT_ADDRESS=0xYourSalyEscrow \
BASE_RPC_URL=https://sepolia.base.org \
pnpm --filter @salychain/chain-base test -- escrow.live.spec.ts
```

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| `execution.escrow.resolver_not_configured` | Set `ESCROW_RESOLVER_WALLET_ID` |
| `401` on admin API | Set `EXECUTION_ADMIN_TOKEN`; pass `Authorization: Bearer …` |
| `signer.policy.destination_not_allowed` | Add escrow contract to resolver wallet allowlist |
| Deal stuck FUNDED after release | Confirm chain-listener running; check `DealReleased` logs |
| `execution.escrow.on_chain_not_funded` | Sync with `/on-chain`; deal may already be resolved |

## References

- [S3 — fundDeal runbook](./s3-escrow-fund-deal.md)
- [ADR-0014 — Escrow contract](../adr/0014-escrow-contract-primitive.md)
