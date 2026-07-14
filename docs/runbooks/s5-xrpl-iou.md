# S5 — XRPL IOU payouts (USD/EUR gateways)

Issued-currency transfers on XRPL using custodial wallets, trust-line policy, and
the `chain-xrpl/iou.ts` builders.

## Prerequisites

- Wallet service on `xrpl-testnet` (or target network)
- Source XRPL wallet funded with **native XRP** for fees and IOU balance for the payout asset
- Destination account holds a **TrustSet** for the same `(currency, issuer)` pair
- Migration applied:

```bash
cd services/wallet && npx prisma migrate deploy
```

## Environment

```bash
# services/wallet/.env
XRPL_NETWORK=xrpl-testnet
XRPL_WS_URL=wss://s.altnet.rippletest.net:51233

# Map IOU codes to gateway issuer addresses (JSON)
XRPL_IOU_ISSUERS={"USD":"rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq"}

# Auto TrustSet limit when custodial wallet lacks a line
XRPL_DEFAULT_TRUST_LIMIT=1000000

WALLET_XRPL_DEFAULT_PER_TX_CAP_MINOR=1000000000
WALLET_XRPL_DEFAULT_DAILY_CAP_MINOR=10000000000
```

Use your network’s gateway issuer — the example above is a well-known Bitstamp USD issuer.

## Policy setup

1. Provision or select an XRPL wallet.
2. Allowlist payout destinations and IOU issuers:

```bash
curl -X POST "$WALLET_BASE_URL/v1/wallets/$WALLET_ID/policy/ensure-iou" \
  -H "Authorization: Bearer $TOKEN"

curl -X PATCH "$WALLET_BASE_URL/v1/wallets/$WALLET_ID/policy" \
  -H "Content-Type: application/json" \
  -d '{
    "destination_allowlist": ["rDestinationAddressHere"],
    "trusted_issuer_allowlist": ["USD:rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq"],
    "per_tx_cap_minor": "100000000",
    "daily_cap_minor": "1000000000"
  }'
```

Trust-line entries use `CURRENCY:issuerAddress` or `*` for any issuer (dev only).

## Direct wallet transfer (IOU USD)

Amount is **minor units** (USD cents):

```bash
curl -X POST "$WALLET_BASE_URL/v1/transfers" \
  -H "Content-Type: application/json" \
  -d '{
    "idempotency_key": "iou-usd-demo-1",
    "wallet_id": "'"$WALLET_ID"'",
    "destination_address": "rEb8TK3gBgk5auZkwc6sHnwrGVJH8DuaLh",
    "amount_minor": "1234",
    "asset": "USD",
    "memo": "invoice-42"
  }'
```

The dispatcher will:

1. Resolve issuer from `XRPL_IOU_ISSUERS` (or `iou_issuer` override)
2. Verify issuer is in `trusted_issuer_allowlist`
3. Submit **TrustSet** if the custodial account lacks a line
4. Submit **Payment** with `Amount: { currency, value, issuer }`

## Execution API (XRPL payout)

```bash
curl -X POST "$EXECUTION_BASE_URL/v1/payouts/xrpl" \
  -H "Content-Type: application/json" \
  -d '{
    "idempotency_key": "exec-xrpl-usd-1",
    "source_wallet_id": "'"$WALLET_ID"'",
    "destination_address": "rEb8TK3gBgk5auZkwc6sHnwrGVJH8DuaLh",
    "amount_minor": "5000",
    "asset": "USD",
    "memo": "vendor-payment"
  }'
```

Settlement is confirmed when `chain-listener-xrpl` emits
`salychain.chain.xrpl.payment_observed` (native or IOU amount).

## Troubleshooting

| Symptom | Likely cause |
|--------|----------------|
| `wallet.xrpl.issuer_not_trusted` | Issuer not in wallet `trusted_issuer_allowlist` |
| `wallet.xrpl.iou_issuer_missing` | Asset not in `XRPL_IOU_ISSUERS` and no `iou_issuer` on request |
| `tecNO_LINE` / failed IOU payment | Recipient has no trust line for that issuer |
| Insufficient IOU balance | Fund custodial wallet via gateway deposit first |
| TrustSet rejected | Account needs ≥10 XRP reserve (standard XRPL rules) |

## Related code

- Builders: `packages/chain-xrpl/src/iou.ts`
- Adapter autofill: `packages/chain-xrpl/src/adapter.ts` (`prepareTrustSet`, `prepareIouPayment`)
- Dispatcher: `services/wallet/src/transfers/dispatchers/xrpl.dispatcher.ts`
- Policy: `trusted_issuer_allowlist` on `wallet_policies`
