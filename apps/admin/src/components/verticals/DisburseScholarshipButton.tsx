'use client';

import { useFormStatus } from 'react-dom';
import { SalyButton } from '@/components/saly/ui';
import { disburseEduScholarshipAction } from '@/app/verticals/actions';

function DisburseButton() {
  const { pending } = useFormStatus();
  return (
    <SalyButton type="submit" variant="primary" size="sm" disabled={pending}>
      {pending ? '…' : 'Disburse'}
    </SalyButton>
  );
}

export function DisburseScholarshipButton({ grantId }: { grantId: string }) {
  if (grantId.length === 0) return null;
  return (
    <form action={disburseEduScholarshipAction}>
      <input type="hidden" name="grant_id" value={grantId} />
      <DisburseButton />
    </form>
  );
}
