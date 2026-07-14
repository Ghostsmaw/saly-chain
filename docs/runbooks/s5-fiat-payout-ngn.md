# S5 — Fiat bank payout (NGN via Paystack)

End-to-end runbook for **NGN bank transfers** through Paystack NIP (and Flutterwave for multi-currency) via the FIAT rail.

## Prerequisites

| Component | Requirement |
|-----------|-------------|
| Routing | `ROUTING_FIAT_ENABLED=true` on routing service |
| Execution | `FIAT_PSP_PROVIDER=composite` (or `paystack` / `stub` for dev) |
| PSP keys | `PAYSTACK_SECRET_KEY` on execution + routing; `FLUTTERWAVE_SECRET_KEY` optional |
| Webhook token | Same `EXECUTION_INTERNAL_WEBHOOK_TOKEN` on execution + fiat-listener |
| Listener | `services/workers/fiat-listener` running (port 4020) |
| Ledger | `LEDGER_CHAIN_RESERVATION_ENABLED=true` |
| Treasury | Funded NGN liability account for the business actor |

## 1. Enable fiat routing (local or staging)

```bash
# Root .env or .env.staging
ROUTING_FIAT_ENABLED=true
FIAT_PSP_PROVIDER=composite
PAYSTACK_SECRET_KEY=sk_test_...
EXECUTION_INTERNAL_WEBHOOK_TOKEN=your-32-char-minimum-secret
```

Restart **routing**, **execution**, and **fiat-listener**.

For staging overlay see [`infra/staging/README.md`](../../infra/staging/README.md) and [`.env.staging.example`](../../.env.staging.example).

## 2. Bootstrap NGN treasury account

Fiat payouts debit a business ledger liability account. Default code:

```
liability.business.{biz_actor_id}.ngn
```

Create and fund via ledger API (example):

```bash
# Create account (execution auto-creates on first reserve if using ensureSystemAccount pattern)
curl -s -X POST http://localhost:4001/v1/accounts \
  -H 'Content-Type: application/json' \
  -d '{
    "code": "liability.business.biz_01HZJKMNPQRSTVWXYZ0ABCDEFGH.ngn",
    "type": "LIABILITY",
    "currency": "NGN",
    "owner_kind": "BUSINESS",
    "owner_id": "biz_01HZJKMNPQRSTVWXYZ0ABCDEFGH"
  }'

# Credit treasury (from clearing — adjust for your chart of accounts)
curl -s -X POST http://localhost:4001/v1/journal-entries \
  -H 'Content-Type: application/json' \
  -d '{
    "idempotency_key": "bootstrap-ngn-treasury",
    "memo": "Seed NGN fiat treasury",
    "postings": [
      { "account_code": "asset.clearing.ngn", "direction": "DEBIT", "amount_minor": "100000000", "currency": "NGN" },
      { "account_code": "liability.business.biz_01HZJKMNPQRSTVWXYZ0ABCDEFGH.ngn", "direction": "CREDIT", "amount_minor": "100000000", "currency": "NGN" }
    ]
  }'
```

In the business dashboard, set `BUSINESS_FIAT_NGN_LEDGER_ACCOUNT` to the account UUID if not using the default code path.

## 3. Register PSP webhooks

Point Paystack transfer webhooks to your fiat-listener:

```
https://<public-host>/webhooks/paystack
```

Flutterwave:

```
https://<public-host>/webhooks/flutterwave
```

Local dev: use ngrok/cloudflared to expose port **4020**.

## 4. Submit payout intent

**Business dashboard:** Transfers → Bank account → Nigeria (NGN) → submit.

Or via API:

```bash
curl -s -X POST http://localhost:4008/v1/intents \
  -H 'Content-Type: application/json' \
  -d '{
    "idempotency_key": "fiat-smoke-1",
    "intent": {
      "version": "1",
      "intent_id": "itn_01JXXXXXXXXXXXXXXXXXXXXXXX",
      "kind": "PAYOUT",
      "actor": { "type": "BUSINESS", "id": "biz_01HZJKMNPQRSTVWXYZ0ABCDEFGH" },
      "source": {
        "account_ref": "<ngn_ledger_account_uuid>",
        "amount": { "amount_minor": "500000", "currency": "NGN" }
      },
      "destination": {
        "currency": "NGN",
        "beneficiary": {
          "kind": "BANK",
          "country": "NG",
          "bank_code": "058",
          "account_number": "0123456789",
          "account_name": "Test Recipient"
        }
      },
      "constraints": { "preferred_rails": ["FIAT"] },
      "context": { "channel": "API", "correlation_id": "fiat-smoke-1" }
    }
  }'
```

## 5. Expected pipeline

```
CREATED → SCREENED → ROUTED (FIAT) → RESERVED (ledger) → EXECUTING (PSP send)
→ AWAITING_CONFIRMATION → SETTLED (webhook or poll)
```

Ledger journals:

1. **Reserve:** DR business NGN liability → CR `liability.pending.fiat.ngn`
2. **Settle:** DR pending → CR `asset.custody.fiat.ngn`

## 6. Stub adapter (dev without PSP keys)

```bash
FIAT_PSP_PROVIDER=stub
ROUTING_FIAT_ENABLED=true
```

Stub auto-settles after ~1.5s; execution poller confirms `SETTLED`. No fiat-listener required for stub-only dev.

## 7. Troubleshooting

| Error | Fix |
|-------|-----|
| `routing` selects BASE/XRPL not FIAT | Set `ROUTING_FIAT_ENABLED=true`; ensure destination is `BANK` with `country` + account |
| `execution.fiat.no_source` | Fund/create `liability.business.{actor}.ngn` or pass `source.account_ref` |
| `execution.fiat.unsupported_destination` | Paystack only supports NGN/NG; use Flutterwave for other corridors |
| `signer` N/A | Fiat does not use on-chain signer — PSP API only |
| Stuck AWAITING_CONFIRMATION | Check fiat-listener logs; verify webhook URL + `EXECUTION_INTERNAL_WEBHOOK_TOKEN` |
| Paystack insufficient balance | Fund Paystack balance in dashboard |

## PSP contracts (production)

| Provider | Corridor | Env var | Webhook secret |
|----------|----------|---------|----------------|
| Paystack | NGN / Nigeria NIP | `PAYSTACK_SECRET_KEY` | HMAC via same secret |
| Flutterwave | Multi-currency | `FLUTTERWAVE_SECRET_KEY` | `FLUTTERWAVE_WEBHOOK_SECRET` on listener |

Register live keys in secret manager; never commit to git.

## Related files

- `packages/chain-fiat/` — Paystack, Flutterwave, composite adapters
- `services/workers/fiat-listener/` — webhook ingestion
- `services/execution/src/transactions/transactions.service.ts` — `executeFiatLeg`
- `apps/business/src/components/TransferForm.tsx` — bank payout UI
