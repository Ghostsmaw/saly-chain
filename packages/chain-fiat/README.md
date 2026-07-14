# `@salychain/chain-fiat`

Fiat rail adapter contract + PSP implementations for Paystack (NGN/NIP) and Flutterwave (multi-currency). Used by `services/routing` to evaluate fiat rails and by `services/execution` to dispatch bank payouts.

## What this package provides

- **`FiatAdapter`** — prepare → send → poll contract for bank rails (mirrors chain adapters). Covers both **payouts** (`send`/`getStatus`/`cancel`) and inbound **pay-ins** (`supportsPayin`/`createPayin`/`getPayinStatus`).
- **`PaystackFiatAdapter`** / **`FlutterwaveFiatAdapter`** — production PSP integrations. Pay-in opens a hosted checkout (Paystack `/transaction/initialize`) or a dynamic virtual account (Flutterwave `/virtual-account-numbers`).
- **`CompositeFiatAdapter`** — routes by destination currency/country (payout and pay-in).
- **`StubFiatAdapter`** — in-process auto-settle for dev/CI when PSP credentials are absent; pay-in issues a deterministic virtual account and settles via `getPayinStatus`.
- **Webhook helpers** — payout: `parsePaystackTransferWebhook` / `parseFlutterwaveTransferWebhook`; pay-in: `parsePaystackPayinWebhook` (`charge.success`) / `parseFlutterwavePayinWebhook` (`charge.completed`); plus the shared `verifyPaystackWebhookSignature` / `verifyFlutterwaveWebhookSignature` (consumed by `services/workers/fiat-listener`).

## Webhook correlation

Both payout and pay-in use the execution transaction UUID as the correlation key. Payout PSP webhooks echo it as `reference`; pay-in webhooks echo it as `reference` (Paystack) or `tx_ref` (Flutterwave). The fiat-listener forwards settlements/credits to execution's internal endpoints.

## Configuration

See `services/execution/.env.example` (`FIAT_PSP_PROVIDER`, PSP secret keys) and `services/workers/fiat-listener/.env.example` (webhook verification secrets).
