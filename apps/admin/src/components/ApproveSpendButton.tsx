'use client';

import { useFormStatus } from 'react-dom';
import { Loader2 } from 'lucide-react';
import { approveSpendAction } from '@/app/approvals/actions';
import { SalyButton } from '@/components/saly/ui';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <SalyButton type="submit" variant="primary" size="sm" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="h-3 w-3 animate-spin" />
          Approving…
        </>
      ) : (
        'Approve'
      )}
    </SalyButton>
  );
}

export function ApproveSpendButton({
  agentId,
  requestId,
}: {
  agentId: string;
  requestId: string;
}) {
  return (
    <form action={approveSpendAction}>
      <input type="hidden" name="agent_id" value={agentId} />
      <input type="hidden" name="request_id" value={requestId} />
      <SubmitButton />
    </form>
  );
}
