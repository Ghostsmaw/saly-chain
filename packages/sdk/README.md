# `@salychain/sdk`

The official SalyChain SDK for Node.js (≥ 20.11) and modern runtimes (Deno, Bun, Cloudflare Workers).

> **Status:** beta — the surface is stable for the S3 milestone (intents / transactions / webhooks). Breaking changes will land in `0.x` minor versions with a clear migration note.

## Install

```bash
pnpm add @salychain/sdk
# or
npm install @salychain/sdk
```

## Quickstart

```ts
import SalyChain from '@salychain/sdk';

const saly = new SalyChain({ apiKey: process.env.SALY_API_KEY! });

// 1. Submit an intent
const { intent_id, execution_transaction_id } = await saly.intents.submit({
  intent_id: 'int_my_correlation_id',
  kind: 'transfer',
  actor: { type: 'user', id: 'user_42' },
  source: { type: 'wallet', wallet_id: 'wal_…' },
  destination: { type: 'address', chain: 'XRPL', address: 'rExampleXRPLDestinationAddr…' },
  amount: { value: '10000000', currency: 'XRP' },
}, { idempotencyKey: 'my-app:payout:42' });

// 2. Poll until settled (or subscribe to a webhook — much better)
const tx = await saly.transactions.get(execution_transaction_id!);
console.log(tx.state); // RESERVED → EXECUTING → AWAITING_CONFIRMATION → SETTLED
```

## Verifying webhooks

In your webhook handler (any framework):

```ts
import { verifyWebhookSignature, WebhookSignatureError } from '@salychain/sdk/webhooks';

// Express / Fastify / Hono / Bun — all the same
async function handler(req, res) {
  const raw = await readRawBody(req); // do NOT use req.body — verify the exact bytes
  try {
    verifyWebhookSignature({
      rawBody: raw,
      signatureHeader: req.headers['x-saly-signature'] as string,
      secret: process.env.SALY_WEBHOOK_SECRET!,
    });
  } catch (err) {
    if (err instanceof WebhookSignatureError) {
      res.status(401).json({ error: err.code });
      return;
    }
    throw err;
  }
  // Trusted. Enqueue and ACK fast — SalyChain expects 2xx within ~3s.
  await jobs.enqueue('saly.event', raw);
  res.status(204).end();
}
```

## Idempotency

Every mutating call accepts an `idempotencyKey`. The gateway caches the response for 24h. If you don't supply one, the SDK auto-generates a random key — but for safety in your own retry loop, *always* derive a stable key from your own correlation identifier.

## Error handling

```ts
import { SalyApiError, SalyNetworkError } from '@salychain/sdk';

try {
  await saly.intents.submit(intent);
} catch (err) {
  if (err instanceof SalyApiError) {
    // Server returned a 4xx/5xx. `err.code` is stable, `err.message` is human.
    if (err.code === 'compliance.sanctions.hit') return decline(err.details);
    if (err.code === 'auth.missing_scope') return refreshScopes();
    if (err.retryable) return backoffAndRetry();
    throw err;
  }
  if (err instanceof SalyNetworkError) {
    // The SDK retried 3× with exponential backoff and still couldn't reach us.
    return queueForLater();
  }
  throw err;
}
```

## Pinning the API base URL

By default the SDK talks to `https://api.saly.network`. Override for staging:

```ts
const saly = new SalyChain({
  apiKey: process.env.SALY_API_KEY!,
  baseUrl: 'https://api.staging.saly.network',
});
```

## Runtime support

The SDK only depends on `fetch`, `URL`, and `node:crypto`. It works out-of-the-box on:

* Node.js ≥ 20.11
* Deno ≥ 1.40
* Bun ≥ 1.0
* Cloudflare Workers (set `fetch` and pass it explicitly if you want to)
