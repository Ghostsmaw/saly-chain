'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import type { PublicSubscription } from '@salychain/sdk-internal';
import { Card, CardHeader, Chip } from '@salychain/ui';
import { FlashBanner } from '@/components/FlashBanner';
import { SecretRevealPanel } from '@/components/SecretRevealPanel';
import { DEFAULT_WEBHOOK_SUBJECTS, PORTAL_WEBHOOK_SUBJECTS } from '@/lib/constants';
import {
  createWebhookAction,
  deleteWebhookAction,
  rotateWebhookSecretAction,
  setWebhookStatusAction,
  type PortalActionResult,
} from './actions';

export function WebhooksPanel({
  subs,
  source,
}: {
  subs: PublicSubscription[];
  source: 'live' | 'unavailable';
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [showCreate, setShowCreate] = useState(false);
  const [flash, setFlash] = useState<{ tone: 'success' | 'error'; message: string } | null>(null);
  const [revealed, setRevealed] = useState<{ label: string; secret: string } | null>(null);
  const [selectedSubjects, setSelectedSubjects] = useState<Set<string>>(
    () => new Set(DEFAULT_WEBHOOK_SUBJECTS),
  );

  const applyResult = (result: PortalActionResult) => {
    if (!result.ok) {
      setFlash({ tone: 'error', message: result.error });
      return;
    }
    if (result.secret && result.secretLabel) {
      setRevealed({ label: result.secretLabel, secret: result.secret });
    }
    if (result.message) {
      setFlash({ tone: 'success', message: result.message });
    }
    setShowCreate(false);
    router.refresh();
  };

  const runAction = (fn: () => Promise<PortalActionResult>) => {
    startTransition(async () => {
      applyResult(await fn());
    });
  };

  const toggleSubject = (subject: string) => {
    setSelectedSubjects((prev) => {
      const next = new Set(prev);
      if (next.has(subject)) next.delete(subject);
      else next.add(subject);
      return next;
    });
  };

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-text-tertiary">
          {source === 'unavailable'
            ? 'Webhooks service unreachable.'
            : `${subs.length} subscription${subs.length === 1 ? '' : 's'}`}
        </p>
        <button
          type="button"
          disabled={source === 'unavailable' || pending}
          className="rounded-lg bg-brand-gradient px-3 py-1.5 text-xs font-medium text-white shadow-soft hover:brightness-110 disabled:opacity-50"
          onClick={() => setShowCreate((v) => !v)}
        >
          {showCreate ? 'Cancel' : '+ New subscription'}
        </button>
      </div>

      {flash && <FlashBanner message={flash.message} tone={flash.tone} />}
      {revealed && (
        <SecretRevealPanel
          title={revealed.label}
          secret={revealed.secret}
          hint="Configure your endpoint verifier with this secret before going live."
          onDismiss={() => setRevealed(null)}
        />
      )}

      {showCreate && (
        <Card className="mb-4">
          <CardHeader title="New webhook subscription" subtitle="Deliveries are HMAC-signed (X-Saly-Signature)." />
          <form
            className="flex flex-col gap-4 p-4 pt-0"
            action={(fd) => runAction(() => createWebhookAction(fd))}
          >
            <label className="flex flex-col gap-1 text-sm">
              <span className="text-text-secondary">Endpoint URL</span>
              <input
                name="url"
                type="url"
                required
                placeholder="https://api.example.com/webhooks/saly"
                className="rounded-lg border border-surface-border bg-surface-card px-3 py-2 font-mono text-xs text-text-primary"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm">
              <span className="text-text-secondary">Description</span>
              <input
                name="description"
                maxLength={200}
                placeholder="Production settlement notifications"
                className="rounded-lg border border-surface-border bg-surface-card px-3 py-2 text-text-primary"
              />
            </label>

            <fieldset>
              <legend className="mb-2 text-sm text-text-secondary">Event subjects</legend>
              <input type="hidden" name="subjects" value={[...selectedSubjects].join(',')} />
              <div className="flex max-h-40 flex-wrap gap-2 overflow-y-auto">
                {PORTAL_WEBHOOK_SUBJECTS.map((subject) => (
                  <label
                    key={subject}
                    className="flex cursor-pointer items-center gap-2 rounded-lg border border-surface-border bg-surface-cardHover/40 px-2 py-1 text-xs"
                  >
                    <input
                      type="checkbox"
                      checked={selectedSubjects.has(subject)}
                      onChange={() => toggleSubject(subject)}
                    />
                    <span className="font-mono text-text-primary">{subject}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={pending || selectedSubjects.size === 0}
                className="rounded-lg bg-brand-gradient px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
              >
                {pending ? 'Creating…' : 'Create subscription'}
              </button>
            </div>
          </form>
        </Card>
      )}

      <Card>
        <CardHeader title="Subscriptions" />
        {source === 'unavailable' ? (
          <EmptyState message="Start the webhooks service (pnpm --filter @salychain/service-webhooks dev)." />
        ) : subs.length === 0 ? (
          <EmptyState message="No subscriptions yet. Add an endpoint to receive event notifications." />
        ) : (
          <ul className="flex flex-col gap-3">
            {subs.map((s) => (
              <li
                key={s.id}
                className="flex items-start justify-between gap-4 rounded-lg border border-surface-border bg-surface-cardHover/60 p-4"
              >
                <div className="flex flex-1 flex-col gap-1">
                  <p className="text-sm font-medium text-text-primary">{s.url}</p>
                  {s.description && <p className="text-xs text-text-tertiary">{s.description}</p>}
                  <div className="mt-2 flex flex-wrap gap-1">
                    {s.subjects.map((sub) => (
                      <span
                        key={sub}
                        className="rounded bg-surface-cardHover/60 px-1.5 py-0.5 text-[11px] text-text-secondary"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                  <p className="mt-1 text-[11px] text-text-muted">
                    kid <code>{s.signing_key_id}</code> · {s.consecutive_failures} consecutive failure
                    {s.consecutive_failures === 1 ? '' : 's'} ·{' '}
                    {s.last_succeeded_at
                      ? `last success ${new Date(s.last_succeeded_at).toLocaleString()}`
                      : 'never succeeded'}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Chip
                    tone={
                      s.status === 'ACTIVE' ? 'success' : s.status === 'PAUSED' ? 'warning' : 'danger'
                    }
                  >
                    {s.status}
                  </Chip>
                  <div className="flex flex-wrap justify-end gap-2 text-xs">
                    <button
                      type="button"
                      disabled={pending || s.status === 'DISABLED'}
                      className="text-text-secondary hover:text-text-primary disabled:opacity-50"
                      onClick={() => {
                        if (!confirm('Rotate signing secret? Update your verifier immediately.')) return;
                        const fd = new FormData();
                        fd.set('subscription_id', s.id);
                        runAction(() => rotateWebhookSecretAction(fd));
                      }}
                    >
                      Rotate secret
                    </button>
                    {s.status === 'ACTIVE' ? (
                      <button
                        type="button"
                        disabled={pending}
                        className="text-text-secondary hover:text-text-primary disabled:opacity-50"
                        onClick={() => {
                          const fd = new FormData();
                          fd.set('subscription_id', s.id);
                          fd.set('status', 'PAUSED');
                          runAction(() => setWebhookStatusAction(fd));
                        }}
                      >
                        Pause
                      </button>
                    ) : s.status === 'PAUSED' ? (
                      <button
                        type="button"
                        disabled={pending}
                        className="text-text-secondary hover:text-text-primary disabled:opacity-50"
                        onClick={() => {
                          const fd = new FormData();
                          fd.set('subscription_id', s.id);
                          fd.set('status', 'ACTIVE');
                          runAction(() => setWebhookStatusAction(fd));
                        }}
                      >
                        Resume
                      </button>
                    ) : null}
                    <button
                      type="button"
                      disabled={pending}
                      className="text-danger-300 hover:text-danger-200 disabled:opacity-50"
                      onClick={() => {
                        if (!confirm(`Delete subscription for ${s.url}?`)) return;
                        const fd = new FormData();
                        fd.set('subscription_id', s.id);
                        runAction(() => deleteWebhookAction(fd));
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card className="mt-4">
        <CardHeader title="Verifying signatures" subtitle="Header: X-Saly-Signature: t=…,v1=…,kid=…" />
        <pre className="overflow-x-auto rounded-lg border border-surface-border bg-surface-cardHover/60 p-4 text-xs text-text-secondary">
          {`import { verifyWebhookSignature } from '@salychain/sdk/webhooks';

verifyWebhookSignature({
  rawBody,
  signatureHeader: req.headers['x-saly-signature'],
  secret: process.env.SALY_WEBHOOK_SECRET!,
});`}
        </pre>
      </Card>
    </>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="grid place-items-center rounded-lg border border-dashed border-surface-border bg-surface-cardHover/40 p-12 text-center">
      <p className="text-sm text-text-tertiary">{message}</p>
    </div>
  );
}
