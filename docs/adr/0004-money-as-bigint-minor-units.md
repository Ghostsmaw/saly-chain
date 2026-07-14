# ADR-0004: Money as BIGINT minor units

- **Status:** Accepted
- **Date:** 2026-05-28

## Context
Floating point is unsafe for money. JavaScript's `number` cannot losslessly represent values above 2^53. Decimal libraries (`decimal.js`, `bignumber.js`) work but invite bugs when developers mix them with primitives.

## Decision
All monetary values are stored, transmitted, and operated on as **integers in the smallest unit** of the currency.

- Fiat: minor units per ISO-4217 (`exponent` field).
  - NGN 50.00 → `5000`
  - JPY 50 → `50`
  - USD 50.00 → `5000`
- Crypto: minimum on-chain unit.
  - 1 USDC → `1_000_000` (6 decimals)
  - 1 XRP → `1_000_000` (drops)
  - 1 ETH → `1_000_000_000_000_000_000` (wei) — represented as `BIGINT` in DB, `bigint` in TS, `string` on the wire.

## Implementation
- TypeScript: `bigint` everywhere in the domain layer. Wire format: numeric **string** to avoid JSON precision loss.
- Postgres: `BIGINT` columns. For values that may exceed 2^63 (rare; only large-decimals tokens), `NUMERIC(78,0)` is used and explicitly noted.
- Helper package: `@salychain/money` exposes `Money { amountMinor: bigint; currency: Currency }` plus arithmetic, format, and parse functions. Direct arithmetic on raw `bigint` is prohibited by lint rule.

## Consequences
- ✅ No precision loss, ever.
- ✅ Cross-language safety (Python/Rust SDKs receive strings).
- ⚠️ Developers must remember to format for display; lint rule + `Money.format()` mitigates.

## Alternatives considered
- **`decimal.js`**: works but easy to mix with `number`; loses bigint's native performance.
- **Floats with epsilon comparison**: rejected outright — unsafe for any fintech system.
