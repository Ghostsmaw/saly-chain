'use client';

import { useFormStatus } from 'react-dom';
import { disburseEduScholarshipAction } from '@/app/verticals/actions';

function DisburseButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-md bg-emerald-600/90 px-2 py-1 text-xs font-medium text-white hover:bg-emerald-500 disabled:opacity-50"
    >
      {pending ? '…' : 'Disburse'}
    </button>
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
