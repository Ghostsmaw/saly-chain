# S5 — Treasury FX swap (ledger SWAP)

End-to-end runbook for **cross-currency ledger swaps** via signed liquidity quotes and a 4-leg FX pool journal.

## Prerequisites

| Component | Requirement |
|-----------|-------------|
| Liquidity | `LIQUIDITY_RATE_PROVIDER=composite` (Coinbase → Frankfurter) |
| Liquidity | `LIQUIDITY_RATE_STUB_FALLBACK=false` in production |
| Liquidity | `LIQUIDITY_QUOTE_SIGNING_SECRET` shared with execution |
| Execution | `LIQUIDITY_BASE_URL`, `EXECUTION_FX_POOL_ACCOUNT_PREFIX=asset.fx` |
| Ledger | Source + destination liability accounts in matching currencies |

## 1. Enable real rate feeds

```bash
# Root .env or services/liquidity/.env
LIQUIDITY_RATE_PROVIDER=composite
LIQUIDITY_RATE_STUB_FALLBACK=false
LIQUIDITY_RATE_CACHE_TTL_MS=60000
LIQUIDITY_QUOTE_SIGNING_SECRET=your-signing-secret
```

Restart **liquidity** and **execution**.

Verify rates:

```bash
curl -s http://localhost:4006/v1/rates/pairs | jq .
curl -s http://localhost:4006/v1/rates/provider | jq .
```

Expected provider: `composite` or `composite:coinbase` — not `stub`.

## 2. Bootstrap ledger accounts

Treasury FX requires:

- **Source** liability account in source currency (e.g. USD / USDC)
- **Destination** liability account in destination currency (e.g. NGN)
- **FX pool** asset accounts auto-created: `asset.fx.USD`, `asset.fx.NGN`

Fund both user-facing accounts before swapping.

## 3. Preview quote (UI or API)

**Business dashboard:** Swap → Treasury FX → enter amount → live preview shows output + feed.

```bash
curl -s -X POST http://localhost:4006/v1/quotes/preview \
  -H 'Content-Type: application/json' \
  -d '{
    "from_currency": "USD",
    "to_currency": "NGN",
    "from_amount_minor": 1000000
  }' | jq .
```

## 4. Submit SWAP intent

```bash
curl -s -X POST http://localhost:4008/v1/intents \
  -H 'Content-Type: application/json' \
  -d '{
    "idempotency_key": "fx-smoke-1",
    "intent": {
      "version": "1",
      "intent_id": "itn_01JXXXXXXXXXXXXXXXXXXXXXXX",
      "kind": "SWAP",
      "actor": { "type": "BUSINESS", "id": "biz_01HZJKMNPQRSTVWXYZ0ABCDEFGH" },
      "source": {
        "account_ref": "<usd_ledger_account_uuid>",
        "amount": { "amount_minor": "1000000", "currency": "USD" }
      },
      "destination": {
        "currency": "NGN",
        "beneficiary": { "kind": "INTERNAL_ACCOUNT", "account_ref": "<ngn_ledger_account_uuid>" }
      },
      "constraints": { "max_slippage_bps": 100 },
      "context": { "channel": "API", "correlation_id": "fx-smoke-1" }
    }
  }'
```

## 5. Expected pipeline

```
CREATED → SCREENED → ROUTED (INTERNAL) → QUOTED (signed FX)
→ RESERVED → EXECUTING → SETTLED → quote consumed
```

### 4-leg ledger journal

| Leg | Account | Direction |
|-----|---------|-----------|
| 1 | User source (USD) | Out |
| 2 | `asset.fx.USD` | In (debit asset) |
| 3 | `asset.fx.NGN` | Out (credit asset) |
| 4 | User destination (NGN) | In |

Spread (default 50 bps) is embedded in `to_amount_minor` from the signed quote.

## 6. Rate feed details

| Provider | Coverage | API |
|----------|----------|-----|
| Coinbase | Broad fiat + USDC (incl. NGN, GHS, KES) | Public, no key |
| Frankfurter | ECB majors (USD/EUR/GBP…) | Free |
| Composite | Coinbase first, Frankfurter fallback | — |

Production: **never** enable `LIQUIDITY_RATE_STUB_FALLBACK`.

Dev offline: `LIQUIDITY_RATE_PROVIDER=stub` or `LIQUIDITY_RATE_STUB_FALLBACK=true`.

## 7. Troubleshooting

| Error | Fix |
|-------|-----|
| `liquidity.pair_unsupported` | Pair not on Coinbase/Frankfurter; add corridor provider |
| `LIQUIDITY_SLIPPAGE_EXCEEDED` | Widen `max_slippage_bps` or retry quote |
| `execution.swap.currency_mismatch` | Ledger account currency must match swap leg |
| Quote shows `stub` in UI | Enable composite; disable stub fallback |
| Preview works, swap fails | Ensure destination ledger account exists and is funded |

## Related files

- `services/liquidity/src/quotes/quote.service.ts` — signed quotes + preview
- `services/execution/src/transactions/transactions.service.ts` — `executeSwapLeg`
- `services/execution/src/transactions/swap.ts` — slippage guards
- `apps/business/src/components/SwapForm.tsx` — treasury FX UI
