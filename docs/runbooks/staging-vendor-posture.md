# Staging Vendor Posture

> Staging must exercise **real** AML / FX / Fiat adapters (or composites with live keys). Stubs are for local `development` / `test` only.

## Why
Production fail-closed guards already reject stubs when `NODE_ENV=production`. Wave C extends the same rules to **`NODE_ENV=staging`** so staging cannot silently “pass” on embedded sanctions or stub FX/PSP.

## Required staging configuration

See [`.env.staging.example`](../../.env.staging.example). Minimum:

| Variable | Staging value | Forbidden |
|----------|---------------|-----------|
| `NODE_ENV` | `staging` | — |
| `COMPLIANCE_SANCTIONS_PROVIDER` | `composite` / vendor | `embedded` |
| `COMPLIANCE_PII_ENC_KEY` | 32-byte base64 | empty |
| `LIQUIDITY_RATE_PROVIDER` | `composite` / `coinbase` / `frankfurter` | `stub` |
| `LIQUIDITY_RATE_STUB_FALLBACK` | `false` | `true` |
| `DEX_QUOTE_STUB_FALLBACK` | `false` | `true` |
| `FIAT_PSP_PROVIDER` | `composite` / `paystack` / `flutterwave` | `stub` |
| PSP secrets | at least one live test key | both empty with composite |
| `KMS_PROVIDER` | `aws` (preferred) or documented exception | prod `local` |

## Boot-time gates
`assertProductionPosture` in `@salychain/config` runs for **`production` and `staging`**. Services that declare money-path rules (compliance, liquidity, execution, signer, …) refuse to start on violations.

## Verification
```bash
# After staging deploy
./scripts/smoke/wait-healthy.sh
./scripts/smoke/health.sh
# Partner path (needs funded demo wallet / rails)
./scripts/smoke/partner-flow.sh
```

## Evidence for go-live
- [ ] Staging boots with vendor providers (no posture errors in logs)
- [ ] One screened intent shows non-embedded sanctions path
- [ ] One FX quote signed from live/composite rates
- [ ] One fiat webhook verified with real PSP test credentials (if fiat enabled)
