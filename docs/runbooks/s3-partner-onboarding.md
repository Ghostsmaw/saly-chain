# Runbook — Partner onboarding end-to-end (S3)

## Goal

Take a brand-new partner organization from zero to a settled, webhook-confirmed payment in under 10 minutes:

1. Provision an `Organization` and an admin `Member`.
2. Issue a `sk_test_…` API key with the right scopes.
3. Register a webhook subscription and capture its signing secret.
4. Submit an intent via the public SDK.
5. Confirm the transaction settles and the webhook fires.

This runbook also serves as the smoke test for the S3 gateway → apikeys → webhooks → intent → execution pipeline.

## Prerequisites

* The S1 / S2 stack already passing (the S2 runbook is a hard prerequisite — we re-use the same wallet, signer, and chain listener).
* `pnpm install` is current.
* `.env` files copied from `.env.example` in each S3 service.

## 1. Start the infra + databases

```bash
docker compose -f infra/docker/docker-compose.yml up -d postgres redis nats
```

Run Prisma migrations across all services (including the new S3 ones):

```bash
pnpm -F @salychain/service-ledger        prisma:migrate
pnpm -F @salychain/service-wallet        prisma:migrate
pnpm -F @salychain/signer                prisma:migrate
pnpm -F @salychain/service-execution     prisma:migrate
pnpm -F @salychain/service-compliance    prisma:migrate
pnpm -F @salychain/service-risk          prisma:migrate
pnpm -F @salychain/service-liquidity     prisma:migrate
pnpm -F @salychain/service-routing       prisma:migrate
pnpm -F @salychain/service-intent        prisma:migrate

# S3 additions
pnpm -F @salychain/service-apikeys       prisma:migrate
pnpm -F @salychain/service-webhooks      prisma:migrate
pnpm -F @salychain/service-gateway       prisma:migrate
```

## 2. Boot the S3 services

In separate panes (or `tmuxinator`/`turbo run dev`):

```bash
# S0–S2 foundations (skip if already running)
pnpm -F @salychain/service-ledger        dev    # :4001
pnpm -F @salychain/service-wallet        dev    # :4002
pnpm -F @salychain/signer                dev    # :4099
pnpm -F @salychain/service-execution     dev    # :4003
pnpm -F @salychain/service-compliance    dev    # :4004
pnpm -F @salychain/service-risk          dev    # :4005
pnpm -F @salychain/service-liquidity     dev    # :4006
pnpm -F @salychain/service-routing       dev    # :4007
pnpm -F @salychain/service-intent        dev    # :4008
pnpm -F @salychain/worker-chain-listener-xrpl dev

# S3 surface
pnpm -F @salychain/service-apikeys       dev    # :4009
pnpm -F @salychain/service-webhooks      dev    # :4010
pnpm -F @salychain/service-gateway       dev    # :4000  ← public API termination
pnpm -F @salychain/app-portal            dev    # :3003
```

Health check:

```bash
curl http://localhost:4000/v1/health     # gateway
curl http://localhost:4009/v1/health     # apikeys
curl http://localhost:4010/v1/health     # webhooks
```

## 3. Provision an organization

```bash
ORG=$(curl -s -XPOST http://localhost:4009/v1/orgs \
  -H 'content-type: application/json' \
  -d '{"name":"Acme Demo","default_rate_limit_per_min":600}' | jq -r .id)
echo "Org id: $ORG"

# (Optional) add a member — in prod this is wired to SSO.
curl -s -XPOST "http://localhost:4009/v1/orgs/$ORG/members" \
  -H 'content-type: application/json' \
  -d '{"email":"founder@acme.test","role":"owner"}' | jq
```

## 4. Issue a test API key

```bash
ISSUE_RESPONSE=$(curl -s -XPOST http://localhost:4009/v1/api-keys \
  -H 'content-type: application/json' \
  -d @<(cat <<JSON
{
  "org_id": "$ORG",
  "environment": "TEST",
  "scopes": ["intents:write", "intents:read", "transactions:read", "webhooks:write"],
  "description": "Demo key issued during onboarding"
}
JSON
))

SECRET=$(echo "$ISSUE_RESPONSE" | jq -r .secret)
echo "Save this secret — you will never see it again:"
echo "  $SECRET"
```

> **CRITICAL:** the `secret` is shown ONCE. Store it in a vault before continuing.

Alternatively, use the **developer portal** at http://localhost:3003/api-keys after setting
`PORTAL_DEMO_ORG_ID=$ORG` in `apps/portal/.env` (create keys with scopes, IP allow-list, rotate, and revoke in the UI).

## 5. Register a webhook subscription

You'll need a public endpoint that can receive POSTs. For local testing, `https://webhook.site/` is the fastest path; for CI we recommend a tiny Express server in the test harness.

```bash
WEBHOOK_URL="https://webhook.site/<your-token>"  # replace
SUB_RESPONSE=$(curl -s -XPOST http://localhost:4000/v1/webhooks \
  -H "authorization: Bearer $SECRET" \
  -H 'content-type: application/json' \
  -d @<(cat <<JSON
{
  "url": "$WEBHOOK_URL",
  "subjects": ["salychain.tx.settled", "salychain.tx.failed", "salychain.intent.routed"],
  "description": "Acme onboarding integration"
}
JSON
))

WEBHOOK_SECRET=$(echo "$SUB_RESPONSE" | jq -r .signing_secret)
SUB_ID=$(echo "$SUB_RESPONSE" | jq -r .subscription.id)
echo "Subscription: $SUB_ID"
echo "Signing secret (store now): $WEBHOOK_SECRET"
```

Or manage subscriptions at http://localhost:3003/webhooks (create, rotate secret, pause, delete).

## 6. Submit an intent via the gateway

```bash
INTENT_ID="int_$(date +%s%N)"
IDEMP="onboarding-$INTENT_ID"

curl -s -XPOST http://localhost:4000/v1/intents \
  -H "authorization: Bearer $SECRET" \
  -H "idempotency-key: $IDEMP" \
  -H 'content-type: application/json' \
  -d @<(cat <<JSON
{
  "intent": {
    "intent_id": "$INTENT_ID",
    "kind": "transfer",
    "actor": { "type": "user", "id": "user_demo_42" },
    "source": { "type": "wallet", "wallet_id": "wal_DEMO_XRPL_TEST" },
    "destination": {
      "type": "address",
      "chain": "XRPL",
      "address": "rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe"
    },
    "amount": { "value": "1000000", "currency": "XRP" }
  }
}
JSON
) | jq
```

The response should include `state: "ACCEPTED"` and an `execution_transaction_id`.

## 7. Watch the lifecycle

Three ways to observe progress:

1. **Webhook endpoint** — within seconds you should see POSTs land at `WEBHOOK_URL` with `X-Saly-Signature` headers and subjects matching `salychain.intent.routed` → `salychain.tx.settled`.

2. **Gateway** — poll the transaction directly:

   ```bash
   curl -s -H "authorization: Bearer $SECRET" \
     http://localhost:4000/v1/transactions/<execution_transaction_id> | jq
   ```

3. **Developer portal** — open `http://localhost:3003`. The dashboard shows latest transactions, the Webhooks tab shows delivery history per subscription, and the API Keys tab shows last-used timestamps.

## 8. Verify the signature on your endpoint

In your handler:

```ts
import { verifyWebhookSignature } from '@salychain/sdk/webhooks';

const raw = await readRawBody(req);
verifyWebhookSignature({
  rawBody: raw,
  signatureHeader: req.headers['x-saly-signature'],
  secret: process.env.SALY_WEBHOOK_SECRET, // the value you saved in step 5
});
// trusted from here
```

If you get `saly.webhooks.bad_signature` or `saly.webhooks.stale_signature`, see the troubleshooting section below.

## 9. Drain checklist

Before considering onboarding done:

- [ ] At least one `salychain.tx.settled` webhook delivered and verified.
- [ ] `GET /v1/transactions/<id>` returns `state: SETTLED` with a populated `tx_hash`.
- [ ] Rate-limit headers (`x-ratelimit-*`) present on responses.
- [ ] An intentional 401 (e.g. omit the auth header) returns `code: gateway.auth.missing`.
- [ ] An idempotent retry (same `idempotency-key`, same body) returns the cached response instantly.
- [ ] An idempotency conflict (same key, different body) returns `code: gateway.idempotency.conflict`.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| `gateway.auth.unavailable` | `services/apikeys` is offline | Check `pnpm -F @salychain/service-apikeys dev` is running |
| `saly.webhooks.bad_signature` | Your endpoint parsed the body before verifying | Verify against the raw bytes; don't `JSON.parse` first |
| `saly.webhooks.stale_signature` | Subscriber clock skew | Make sure your server's clock is within ±5 min of UTC |
| Subscription auto-DISABLED | 20 consecutive 5xx/timeouts from your endpoint | Fix endpoint, then `POST /v1/webhooks/:id/status {status:"ACTIVE"}` |
| Replay a missed delivery | A specific delivery failed | `POST /v1/deliveries/:id/replay` (via internal API or admin UI) |

## Production graduation

Before flipping the same partner from `TEST` to `LIVE`:

- Provision a `LIVE` key (different scope set if applicable).
- Pin `LIVE` to an IP allow-list (`ip_allow_list` on the key).
- Subscribe the production endpoint over HTTPS with a real TLS cert.
- Add the partner's correlation-id prefix to our observability dashboards (Grafana → Gateway → Partner Latency).
- Smoke-test with a sub-$1 settled real-money transaction before announcing GA.
