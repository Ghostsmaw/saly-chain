'use client';

import { useFormStatus } from 'react-dom';
import { adjudicateHealthClaimAction } from '@/app/verticals/actions';

function Btn({ label, tone }: { label: string; tone: 'approve' | 'reject' }) {
  const { pending } = useFormStatus();
  const cls =
    tone === 'approve'
      ? 'rounded-md bg-emerald-600/90 px-2 py-1 text-xs font-medium text-white disabled:opacity-50'
      : 'rounded-md border border-surface-border px-2 py-1 text-xs disabled:opacity-50';
  return (
    <button type="submit" disabled={pending} className={cls}>
      {pending ? '…' : label}
    </button>
  );
}

export function AdjudicateClaimButtons({ claimId }: { claimId: string }) {
  return (
    <div className="flex gap-2">
      <form action={adjudicateHealthClaimAction}>
        <input type="hidden" name="claim_id" value={claimId} />
        <input type="hidden" name="approved" value="true" />
        <Btn label="Approve" tone="approve" />
      </form>
      <form action={adjudicateHealthClaimAction}>
        <input type="hidden" name="claim_id" value={claimId} />
        <input type="hidden" name="approved" value="false" />
        <Btn label="Reject" tone="reject" />
      </form>
    </div>
  );
}
