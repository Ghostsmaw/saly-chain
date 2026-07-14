# C4 — Finality policies & resilience testing

> Per-chain confirmation depth before `AWAITING_CONFIRMATION → SETTLED`, reorg-aware reversal, and CI resilience suites.

## Finality policies

| Chain | Confirmation depth | Listener env | Rationale |
|-------|-------------------:|----------------|-----------|
| **BASE** | 2 | `LISTENER_CONFIRMATIONS=2` | Trail L2 head; hash-mismatch reorg detection |
| **XRPL** | 0 | `LISTENER_CONFIRMATIONS=0` | Validated ledgers are final |
| **SALY_L3** | 2 | `LISTENER_CONFIRMATIONS=2` | Inherits L2 reorg risk on the rollup |

Canonical source: `@salychain/finality` (`FINALITY_POLICIES`).

### Enforcement points

1. **Listeners** trail chain head by `LISTENER_CONFIRMATIONS` and stamp `confirmations_depth` on observation events.
2. **Execution** (`markSettledByTxHash`) calls `assertFinalityMet` before ledger settlement; stores `finality` metadata on the SETTLED event.
3. **Reorg** — listeners detect hash mismatch at checkpoint, emit `salychain.chain.{base,l3}.reorg_detected`, rewind checkpoint; execution sweeps SETTLED txs in the orphaned block range and transitions `SETTLED → REVERSING → REVERSED` with ledger reversal.

## Reorg reversal

- Only applies to chain payout kinds (`BASE_PAYOUT`, `DEX_SWAP`, `ESCROW_PAYOUT`, `L3_PAYOUT`).
- Requires post-C4 `finality` metadata on the SETTLED event (includes `ledger_settle_entry_id`).
- Reversal idempotency key: `exec:{txId}:reorg-reverse`.
- Metric: `salychain_chain_reorgs_detected_total{chain=...}`.

## Resilience test suites

Package: `tests/resilience` (`@salychain/resilience-tests`).

| Suite | Command | CI |
|-------|---------|-----|
| E2E policy + contracts | `pnpm -F @salychain/resilience-tests test:e2e` | ✅ |
| Chaos (fail-closed) | `pnpm -F @salychain/resilience-tests test:chaos` | ✅ |
| Load script validation | `pnpm -F @salychain/resilience-tests test:load-scripts` | ✅ |
| Live k6 (staging) | `k6 run tests/resilience/load/k6/intent-submit.js` | Manual / nightly |

Optional live E2E against a running stack:

```bash
RESILIENCE_GATEWAY_URL=http://localhost:4000 pnpm -F @salychain/resilience-tests test:e2e
```

## Chaos experiments (staging)

Use Toxiproxy or dependency kill against staging — see [02-smoke-test-plan.md](../audit/02-smoke-test-plan.md) §4.6. Expected behaviour:

- Insufficient confirmations → execution NACKs observation (no SETTLED).
- Reorg in orphaned range → affected SETTLED txs reverse; no double-credit.
- NATS duplicate delivery → idempotent settle (tx still AWAITING_CONFIRMATION guard).

## Ops checklist

- [ ] Listener `LISTENER_CONFIRMATIONS` ≥ policy depth for BASE/L3.
- [ ] Alert on `salychain_chain_reorgs_detected_total` > 0.
- [ ] After reorg, verify affected txs reached `REVERSED` and ledger balances reconcile.
