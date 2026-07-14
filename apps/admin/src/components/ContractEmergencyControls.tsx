'use client';

import { useState, useTransition } from 'react';
import { AlertTriangle, PauseCircle, PlayCircle, X } from 'lucide-react';
import { Chip } from '@salychain/ui';
import type { DeployedContract } from '@/lib/api';
import { proposeContractStatusAction } from '@/app/contracts/actions';

interface Props {
  contracts: DeployedContract[];
}

export function ContractEmergencyControls({ contracts }: Props) {
  const [statuses, setStatuses] = useState<Record<string, DeployedContract['status']>>(
    Object.fromEntries(contracts.map((c) => [c.id, c.status])),
  );
  const [dialog, setDialog] = useState<{ id: string; action: 'pause' | 'resume' } | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  }

  function confirmAction() {
    if (!dialog || pending) return;
    const { id, action } = dialog;
    startTransition(async () => {
      const res = await proposeContractStatusAction(id, action);
      if (res.ok) {
        setStatuses((prev) => ({ ...prev, [id]: res.status as DeployedContract['status'] }));
        showToast(res.message);
      } else {
        showToast(res.error);
      }
      setDialog(null);
    });
  }

  const displayContracts = contracts.filter((c) => c.status !== 'Deprecated');

  return (
    <>
      <div className="flex flex-col gap-3 px-1">
        {displayContracts.map((c) => {
          const current = statuses[c.id] ?? c.status;
          return (
            <div
              key={c.id}
              className="flex items-center justify-between rounded-xl border border-surface-divider bg-surface-card/50 p-3"
            >
              <div>
                <p className="text-sm font-medium text-text-primary">{c.name}</p>
                <p className="text-[11px] text-text-muted">
                  {c.network} · {c.version}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Chip tone={current === 'Active' ? 'success' : 'warning'}>{current}</Chip>
                {current === 'Active' ? (
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() => setDialog({ id: c.id, action: 'pause' })}
                    className="flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-300 transition hover:border-amber-500/50 hover:bg-amber-500/20 active:scale-95 disabled:opacity-50"
                  >
                    <PauseCircle className="h-3.5 w-3.5" /> Pause
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() => setDialog({ id: c.id, action: 'resume' })}
                    className="flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-300 transition hover:border-emerald-500/50 hover:bg-emerald-500/20 active:scale-95 disabled:opacity-50"
                  >
                    <PlayCircle className="h-3.5 w-3.5" /> Resume
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {dialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-md rounded-2xl border border-surface-border p-6 shadow-[0_24px_80px_-12px_rgba(0,0,0,0.85)]" style={{ backgroundColor: '#15103A' }}>
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-500/15 text-amber-300">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-text-primary">
                  {dialog.action === 'pause' ? 'Pause contract?' : 'Resume contract?'}
                </h3>
                <p className="mt-1 text-sm text-text-secondary">
                  On-chain contracts submit a signed pause/resume via the governance executor wallet.
                  DB-only contracts update the registry immediately.
                </p>
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDialog(null)}
                disabled={pending}
                className="rounded-lg border border-surface-border px-4 py-2 text-sm text-text-secondary transition hover:bg-surface-cardHover hover:text-text-primary"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmAction}
                disabled={pending}
                className={[
                  'rounded-lg px-4 py-2 text-sm font-medium text-white transition active:scale-95 disabled:opacity-50',
                  dialog.action === 'pause'
                    ? 'bg-amber-600 hover:bg-amber-500'
                    : 'bg-emerald-600 hover:bg-emerald-500',
                ].join(' ')}
              >
                {pending ? 'Submitting…' : dialog.action === 'pause' ? 'Submit pause proposal' : 'Submit resume proposal'}
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-brand-500/30 px-4 py-3 shadow-xl" style={{ backgroundColor: '#120E2E' }}>
          <span className="text-sm text-text-primary">{toast}</span>
          <button type="button" onClick={() => setToast(null)} className="text-text-muted hover:text-text-primary">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </>
  );
}
