# `@salychain/service-merchant`

Merchant product surface (Milestone C3): **payment links**, **hosted checkout**, and **settlement reports**. Org-scoped via C1 tenant context; money movement stays on the existing execution FIAT_PAYIN rail (C2).

## Port & database

- **Port:** `4021`
- **Database:** `salychain_merchant`

## Capabilities

| Area | Endpoints |
|---|---|
| Payment links | `POST/GET /v1/payment-links`, `PATCH /v1/payment-links/:id/archive` |
| Hosted checkout | `POST /v1/checkout/sessions`, `GET /v1/checkout/sessions/:id` |
| Payer-facing (public) | `GET /v1/public/payment-links/:slug`, `POST /v1/public/checkout/:slug/sessions`, `GET /v1/public/checkout/sessions/:id` |
| Settlement reports | `POST/GET /v1/settlement-reports`, `GET /v1/settlement-reports/:id/export` |

Checkout opens a canonical **TOPUP** intent, then a real **FIAT_PAYIN** via execution. A poller syncs session status from execution settlement state.

## Gateway scopes

- `merchant:read` — list/get links, sessions, reports
- `merchant:write` — create links, open checkout, generate reports

## Local dev

```bash
pnpm --filter @salychain/service-merchant prisma:generate
pnpm --filter @salychain/service-merchant prisma:deploy
pnpm --filter @salychain/service-merchant dev
```

Business app hosted checkout: `http://localhost:3002/pay/{slug}` (configure `MERCHANT_CHECKOUT_BASE_URL`).
