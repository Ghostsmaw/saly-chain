# `@salychain/service-liquidity`

The liquidity service is responsible for **two distinct things** that are easy to confuse:

1. **FX rates** — "what is 1 USDC worth in NGN right now?". This is sourced from rate providers (the default is a stub provider with hardcoded mid-market rates; the prod target is a multi-provider blender with outlier rejection).
2. **Quotes** — a *binding, signed, time-limited* promise of an exchange rate, issued before an intent executes and consumed during execution. Without a binding quote, the user would experience FX slippage between intent submission and settlement.

## Why signed quotes

A quote is signed with `LIQUIDITY_QUOTE_SIGNING_SECRET` (HMAC-SHA256) at issue time. The execution service stores the quote signature alongside the transaction and replays it back when consuming. The signature ensures the quote cannot be forged or tampered with between services, even though all of this happens inside our trust boundary. It also gives us an audit trail: "the rate used by this transaction was issued by quote `qt_…` at `ts=…` and verified at settlement."

## API

* `POST /v1/quotes` — issue a signed quote. Returns `{ quote_id, base, quote, rate, expires_at, signature }`.
* `POST /v1/quotes/:quote_id/consume` — atomically marks a quote as consumed (rejects double-consumption and expired quotes).

Swagger at `/docs`.

## Configuration

See `.env.example`. The liquidity service needs Postgres + a signing secret. The rate provider is currently the stub; swapping in a real provider is a one-line change in `quotes.module.ts`.
