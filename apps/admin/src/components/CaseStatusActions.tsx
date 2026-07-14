'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Chip } from '@salychain/ui';

export function CaseStatusActions({
  caseId,
  currentStatus,
}: {
  caseId: string;
  currentStatus: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const update = (status: string) => {
    startTransition(async () => {
      await fetch(`/api/compliance/cases/${encodeURIComponent(caseId)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      router.refresh();
    });
  };

  if (currentStatus === 'APPROVED' || currentStatus === 'REJECTED') {
    return <Chip tone="neutral">{currentStatus}</Chip>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        disabled={pending}
        onClick={() => update('IN_REVIEW')}
        className="rounded-lg border border-surface-divider px-3 py-1.5 text-xs text-text-secondary hover:bg-surface-cardHover disabled:opacity-50"
      >
        Mark in review
      </button>
      <button
        type="button"
        disabled={pending}
        onClick={() => update('APPROVED')}
        className="rounded-lg bg-emerald-600/20 px-3 py-1.5 text-xs font-medium text-emerald-300 hover:bg-emerald-600/30 disabled:opacity-50"
      >
        Approve
      </button>
      <button
        type="button"
        disabled={pending}
        onClick={() => update('REJECTED')}
        className="rounded-lg bg-rose-600/20 px-3 py-1.5 text-xs font-medium text-rose-300 hover:bg-rose-600/30 disabled:opacity-50"
      >
        Reject
      </button>
    </div>
  );
}
