'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import type { PublicApiKey } from '@salychain/sdk-internal';
import { Card, CardHeader, Chip } from '@salychain/ui';
import { FlashBanner } from '@/components/FlashBanner';
import { SecretRevealPanel } from '@/components/SecretRevealPanel';
import { DEFAULT_API_KEY_SCOPES, PORTAL_API_KEY_SCOPES } from '@/lib/constants';
import {
  createApiKeyAction,
  revokeApiKeyAction,
  rotateApiKeyAction,
  type PortalActionResult,
} from './actions';

export function ApiKeysPanel({
  keys,
  source,
}: {
  keys: PublicApiKey[];
  source: 'live' | 'unavailable';
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [showCreate, setShowCreate] = useState(false);
  const [flash, setFlash] = useState<{ tone: 'success' | 'error'; message: string } | null>(null);
  const [revealed, setRevealed] = useState<{ label: string; secret: string } | null>(null);
  const [selectedScopes, setSelectedScopes] = useState<Set<string>>(
    () => new Set(DEFAULT_API_KEY_SCOPES),
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

  const toggleScope = (scope: string) => {
    setSelectedScopes((prev) => {
      const next = new Set(prev);
      if (next.has(scope)) next.delete(scope);
      else next.add(scope);
      return next;
    });
  };

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-text-tertiary">
          {source === 'unavailable'
            ? 'API keys service unreachable.'
            : `${keys.length} key${keys.length === 1 ? '' : 's'}`}
        </p>
        <button
          type="button"
          disabled={source === 'unavailable' || pending}
          className="rounded-lg bg-brand-gradient px-3 py-1.5 text-xs font-medium text-white shadow-soft hover:brightness-110 disabled:opacity-50"
          onClick={() => setShowCreate((v) => !v)}
        >
          {showCreate ? 'Cancel' : '+ New API Key'}
        </button>
      </div>

      {flash && <FlashBanner message={flash.message} tone={flash.tone} />}
      {revealed && (
        <SecretRevealPanel
          title={revealed.label}
          secret={revealed.secret}
          hint="Store this in your secrets manager. SalyChain cannot recover it."
          onDismiss={() => setRevealed(null)}
        />
      )}

      {showCreate && (
        <Card className="mb-4">
          <CardHeader title="Issue API key" subtitle="TEST keys use testnet rails only." />
          <form
            className="flex flex-col gap-4 p-4 pt-0"
            action={(fd) => runAction(() => createApiKeyAction(fd))}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-text-secondary">Environment</span>
                <select
                  name="environment"
                  defaultValue="TEST"
                  className="rounded-lg border border-surface-border bg-surface-card px-3 py-2 text-text-primary"
                >
                  <option value="TEST">TEST</option>
                  <option value="LIVE">LIVE</option>
                </select>
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-text-secondary">Rate limit (req/min)</span>
                <input
                  name="rate_limit_per_min"
                  type="number"
                  min={1}
                  placeholder="600 (org default)"
                  className="rounded-lg border border-surface-border bg-surface-card px-3 py-2 text-text-primary"
                />
              </label>
            </div>

            <label className="flex flex-col gap-1 text-sm">
              <span className="text-text-secondary">Description</span>
              <input
                name="description"
                maxLength={200}
                placeholder="Production checkout integration"
                className="rounded-lg border border-surface-border bg-surface-card px-3 py-2 text-text-primary"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm">
              <span className="text-text-secondary">IP allow-list (optional)</span>
              <textarea
                name="ip_allow_list"
                rows={2}
                placeholder="203.0.113.0/24, 198.51.100.42"
                className="rounded-lg border border-surface-border bg-surface-card px-3 py-2 font-mono text-xs text-text-primary"
              />
              <span className="text-[11px] text-text-muted">Leave empty to allow any IP. CIDR supported.</span>
            </label>

            <fieldset>
              <legend className="mb-2 text-sm text-text-secondary">Scopes</legend>
              <input type="hidden" name="scopes" value={[...selectedScopes].join(',')} />
              <div className="flex flex-wrap gap-2">
                {PORTAL_API_KEY_SCOPES.map((scope) => (
                  <label
                    key={scope}
                    className="flex cursor-pointer items-center gap-2 rounded-lg border border-surface-border bg-surface-cardHover/40 px-2 py-1 text-xs"
                  >
                    <input
                      type="checkbox"
                      checked={selectedScopes.has(scope)}
                      onChange={() => toggleScope(scope)}
                    />
                    <span className="font-mono text-text-primary">{scope}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={pending || selectedScopes.size === 0}
                className="rounded-lg bg-brand-gradient px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
              >
                {pending ? 'Creating…' : 'Create key'}
              </button>
            </div>
          </form>
        </Card>
      )}

      <Card>
        <CardHeader title="Active credentials" subtitle="Test keys touch testnet only; live keys execute real money." />
        {source === 'unavailable' ? (
          <EmptyState message="Start the apikeys service (pnpm --filter @salychain/service-apikeys dev)." />
        ) : keys.length === 0 ? (
          <EmptyState message="No keys yet. Create one to start calling the SalyChain API." />
        ) : (
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wide text-text-tertiary">
              <tr>
                <th className="pb-2 font-medium">Key</th>
                <th className="pb-2 font-medium">Env</th>
                <th className="pb-2 font-medium">Scopes</th>
                <th className="pb-2 font-medium">Rate&nbsp;limit</th>
                <th className="pb-2 font-medium">IP&nbsp;allow-list</th>
                <th className="pb-2 font-medium">Last&nbsp;used</th>
                <th className="pb-2 font-medium">Status</th>
                <th className="pb-2 font-medium" />
              </tr>
            </thead>
            <tbody>
              {keys.map((k) => (
                <tr key={k.id} className="border-t border-surface-divider">
                  <td className="py-3">
                    <p className="font-mono text-text-primary">
                      {k.prefix}…{k.last_four}
                    </p>
                    {k.description && <p className="text-[11px] text-text-tertiary">{k.description}</p>}
                  </td>
                  <td className="py-3">
                    <Chip tone={k.environment === 'LIVE' ? 'danger' : 'info'}>{k.environment}</Chip>
                  </td>
                  <td className="py-3">
                    <div className="flex flex-wrap gap-1">
                      {k.scopes.map((s) => (
                        <span
                          key={s}
                          className="rounded bg-surface-cardHover/60 px-1.5 py-0.5 text-[11px] text-text-secondary"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 text-text-secondary">{k.rate_limit_per_min}/min</td>
                  <td className="py-3 text-text-tertiary">
                    {k.ip_allow_list.length === 0 ? (
                      <span className="text-text-tertiary">Any</span>
                    ) : (
                      <span className="font-mono text-[11px]">{k.ip_allow_list.join(', ')}</span>
                    )}
                  </td>
                  <td className="py-3 text-text-tertiary">
                    {k.last_used_at ? new Date(k.last_used_at).toLocaleString() : '—'}
                  </td>
                  <td className="py-3">
                    <Chip tone={k.status === 'ACTIVE' ? 'success' : 'danger'}>{k.status}</Chip>
                  </td>
                  <td className="py-3 text-right">
                    {k.status === 'ACTIVE' && (
                      <div className="flex justify-end gap-2 text-xs">
                        <button
                          type="button"
                          disabled={pending}
                          className="text-text-secondary hover:text-text-primary disabled:opacity-50"
                          onClick={() => {
                            if (!confirm(`Rotate ${k.prefix}…${k.last_four}? The current secret will stop working immediately.`)) {
                              return;
                            }
                            const fd = new FormData();
                            fd.set('key_id', k.id);
                            runAction(() => rotateApiKeyAction(fd));
                          }}
                        >
                          Rotate
                        </button>
                        <button
                          type="button"
                          disabled={pending}
                          className="text-danger-300 hover:text-danger-200 disabled:opacity-50"
                          onClick={() => {
                            if (!confirm(`Revoke ${k.prefix}…${k.last_four}? This cannot be undone.`)) {
                              return;
                            }
                            const fd = new FormData();
                            fd.set('key_id', k.id);
                            runAction(() => revokeApiKeyAction(fd));
                          }}
                        >
                          Revoke
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      <Card className="mt-4">
        <CardHeader title="Scope reference" subtitle="Coarse-grained scopes — gateway enforces, services validate." />
        <table className="w-full text-sm">
          <tbody className="divide-y divide-surface-divider">
            <ScopeRow scope="intents:write" desc="Submit canonical intents to /v1/intents." />
            <ScopeRow scope="intents:read" desc="List and fetch intents you've submitted." />
            <ScopeRow scope="transactions:read" desc="List and fetch transactions." />
            <ScopeRow scope="webhooks:write" desc="Create, rotate, and delete webhook subscriptions." />
            <ScopeRow scope="webhooks:read" desc="List subscriptions and inspect delivery attempts." />
            <ScopeRow scope="wallets:read" desc="List your custodial wallets." />
            <ScopeRow scope="logs:read" desc="Read request logs and analytics in the portal." />
          </tbody>
        </table>
      </Card>
    </>
  );
}

function ScopeRow({ scope, desc }: { scope: string; desc: string }) {
  return (
    <tr>
      <td className="py-2 pr-4 font-mono text-text-primary">{scope}</td>
      <td className="py-2 text-text-tertiary">{desc}</td>
    </tr>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="grid place-items-center rounded-lg border border-dashed border-surface-border bg-surface-cardHover/40 p-12 text-center">
      <p className="text-sm text-text-tertiary">{message}</p>
    </div>
  );
}
