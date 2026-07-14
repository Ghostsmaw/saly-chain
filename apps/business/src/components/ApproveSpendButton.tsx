'use client';

import { useTransition } from 'react';
import { Check } from 'lucide-react';

export function ApproveSpendButton({
  agentId,
  requestId,
  action,
}: {
  agentId: string;
  requestId: string;
  action: (agentId: string, requestId: string) => Promise<void>;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => startTransition(() => action(agentId, requestId))}
      className="inline-flex items-center gap-1.5 rounded-lg border border-success-500/30 bg-success-500/10 px-3 py-1.5 text-xs font-medium text-success-200 transition hover:bg-success-500/20 disabled:opacity-50"
    >
      <Check className="h-3.5 w-3.5" />
      {pending ? 'Approving…' : 'Approve'}
    </button>
  );
}
