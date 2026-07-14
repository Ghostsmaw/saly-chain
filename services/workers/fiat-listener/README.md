# `@salychain/worker-fiat-listener`

Ingests **Paystack** and **Flutterwave** webhooks, verifies signatures, deduplicates by PSP event id, and confirms both **payouts** (`transfer.*`) and inbound **pay-ins** (`charge.*`) in the execution service.

## Endpoints

| Method | Path                    | Description                                                                                     |
| ------ | ----------------------- | ----------------------------------------------------------------------------------------------- |
| `POST` | `/webhooks/paystack`    | Paystack events — payout (`transfer.success`/`failed`/`reversed`) and pay-in (`charge.success`) |
| `POST` | `/webhooks/flutterwave` | Flutterwave events — payout (`transfer.completed`) and pay-in (`charge.completed`)              |
| `GET`  | `/health`               | Liveness probe                                                                                  |

A single PSP webhook URL receives both event families; the listener routes by whichever parser recognizes the payload.

## Flow

1. PSP sends a webhook. Payouts carry `reference` = execution transaction id; pay-ins carry `reference`/`tx_ref` = execution transaction id (set when the pay-in was opened).
2. Listener verifies the signature (`x-paystack-signature` or `verif-hash`).
3. The event is persisted in `fiat_webhook_events` (idempotent on `provider + external_event_id`).
4. Listener calls execution: payouts → `POST /v1/internal/fiat/confirmations`; pay-ins → `POST /v1/internal/fiat/payins` (both bearer-authenticated).

## Configuration

See [`.env.example`](./.env.example). Required:

- `EXECUTION_INTERNAL_WEBHOOK_TOKEN` — shared secret with execution service
- `PAYSTACK_SECRET_KEY` and/or `FLUTTERWAVE_WEBHOOK_SECRET` for enabled providers

## Staging / production

Register webhook URLs with PSPs:

- `https://fiat-listener.staging.example.com/webhooks/paystack`
- `https://fiat-listener.staging.example.com/webhooks/flutterwave`

Terminate TLS at ingress; optionally set `WEBHOOK_ALLOWED_IPS` to PSP egress ranges.
