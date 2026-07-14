'use client';

import { useFormStatus } from 'react-dom';
import { SalyButton } from '@/components/saly/ui';
import { adjudicateHealthClaimAction } from '@/app/verticals/actions';

function AdjudicateButton({ label, variant }: { label: string; variant: 'primary' | 'secondary' }) {
  const { pending } = useFormStatus();
  return (
    <SalyButton type="submit" variant={variant} size="sm" disabled={pending}>
      {pending ? '…' : label}
    </SalyButton>
  );
}

export function AdjudicateClaimButtons({ claimId }: { claimId: string }) {
  if (claimId.length === 0) return null;
  return (
    <div className="flex gap-2">
      <form action={adjudicateHealthClaimAction}>
        <input type="hidden" name="claim_id" value={claimId} />
        <input type="hidden" name="approved" value="true" />
        <AdjudicateButton label="Approve" variant="primary" />
      </form>
      <form action={adjudicateHealthClaimAction}>
        <input type="hidden" name="claim_id" value={claimId} />
        <input type="hidden" name="approved" value="false" />
        <AdjudicateButton label="Reject" variant="secondary" />
      </form>
    </div>
  );
}
