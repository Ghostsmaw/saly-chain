import Link from 'next/link';
import { Card, CardHeader } from '@salychain/ui';
import { PortalShell } from '@/components/PortalShell';

export const dynamic = 'force-static';

export default function DocsPage() {
  return (
    <PortalShell title="Documentation" subtitle="Learn the SalyChain API in five minutes.">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Getting started" />
          <ol className="flex flex-col gap-3 text-sm text-text-secondary">
            <li>
              <strong className="text-text-primary">1. Get a test key.</strong>{' '}
              Generate <code>sk_test_…</code> on the <Link className="text-brand-300" href="/api-keys">API Keys</Link> tab. Test keys touch testnet only.
            </li>
            <li>
              <strong className="text-text-primary">2. Install the SDK.</strong>
              <pre className="mt-1 rounded-md bg-surface-cardHover/60 p-3 text-xs">pnpm add @salychain/sdk</pre>
            </li>
            <li>
              <strong className="text-text-primary">3. Submit your first intent.</strong>
              <pre className="mt-1 overflow-x-auto rounded-md bg-surface-cardHover/60 p-3 text-xs">
{`import SalyChain from '@salychain/sdk';

const saly = new SalyChain({ apiKey: process.env.SALY_API_KEY! });

const { execution_transaction_id } = await saly.intents.submit({
  intent_id: 'int_my_correlation_id',
  kind: 'transfer',
  actor: { type: 'user', id: 'user_42' },
  source: { type: 'wallet', wallet_id: 'wal_xxxx' },
  destination: {
    type: 'address',
    chain: 'XRPL',
    address: 'rExampleXRPLDestinationAddr…',
  },
  amount: { value: '10000000', currency: 'XRP' },
}, { idempotencyKey: 'demo-1' });`}
              </pre>
            </li>
            <li>
              <strong className="text-text-primary">4. Listen for settlement.</strong>{' '}
              Register a webhook on the <Link className="text-brand-300" href="/webhooks">Webhooks</Link> tab; you'll get a signed POST when the transaction settles.
            </li>
          </ol>
        </Card>

        <Card>
          <CardHeader title="Authentication" />
          <p className="text-sm text-text-secondary">
            Every request needs an API key. Two presentations are accepted:
          </p>
          <pre className="mt-2 overflow-x-auto rounded-md bg-surface-cardHover/60 p-3 text-xs">
{`Authorization: Bearer sk_live_…
X-API-Key:     sk_live_…`}
          </pre>
          <p className="mt-3 text-sm text-text-secondary">
            Keys are scoped: <code>intents:write</code>, <code>transactions:read</code>, <code>webhooks:write</code>. The SDK doesn't care; the gateway enforces.
          </p>
          <h3 className="mt-4 text-sm font-medium text-text-primary">Idempotency</h3>
          <p className="mt-1 text-sm text-text-secondary">
            Every mutating request needs an <code>Idempotency-Key</code> header. Same key + same body → cached response for 24h.
            Same key + different body → 409. Use a stable key from your own correlation id, never a random one in a retry loop.
          </p>
          <h3 className="mt-4 text-sm font-medium text-text-primary">Rate limits</h3>
          <p className="mt-1 text-sm text-text-secondary">
            Per-API-key, returned on every response as <code>X-RateLimit-Limit</code>, <code>X-RateLimit-Remaining</code>,
            <code>X-RateLimit-Reset</code>. Exceeded → 429.
          </p>
        </Card>

        <Card>
          <CardHeader title="Webhooks" />
          <p className="text-sm text-text-secondary">
            We deliver an HMAC-signed POST per event to your endpoint. ACK with 2xx within ~3 seconds.
          </p>
          <pre className="mt-2 overflow-x-auto rounded-md bg-surface-cardHover/60 p-3 text-xs">
{`X-Saly-Signature: t=<ms>,v1=<hex(hmac_sha256(secret, t + "." + raw_body))>,kid=<key_id>
X-Saly-Event-Id:  evt_…
X-Saly-Subject:   salychain.tx.settled`}
          </pre>
          <p className="mt-3 text-sm text-text-secondary">
            Use <code>@salychain/sdk/webhooks</code> to verify:
          </p>
          <pre className="mt-2 overflow-x-auto rounded-md bg-surface-cardHover/60 p-3 text-xs">
{`import { verifyWebhookSignature } from '@salychain/sdk/webhooks';

verifyWebhookSignature({
  rawBody, // exact bytes, NOT JSON.parsed
  signatureHeader: req.headers['x-saly-signature'],
  secret: process.env.SALY_WEBHOOK_SECRET!,
});`}
          </pre>
        </Card>

        <Card>
          <CardHeader title="Errors" />
          <p className="text-sm text-text-secondary">
            All errors share a stable shape:
          </p>
          <pre className="mt-2 overflow-x-auto rounded-md bg-surface-cardHover/60 p-3 text-xs">
{`{
  "error": {
    "code": "compliance.sanctions.hit",
    "message": "Counterparty matches OFAC SDN list",
    "category": "COMPLIANCE",
    "http_status": 451,
    "retryable": false,
    "correlation_id": "01JABCDXYZ…",
    "details": { ... }
  }
}`}
          </pre>
          <p className="mt-3 text-sm text-text-secondary">
            <code>code</code> is stable and machine-readable; <code>message</code> is human and may change.
            Always switch on <code>code</code>.
          </p>
        </Card>
      </div>
    </PortalShell>
  );
}
