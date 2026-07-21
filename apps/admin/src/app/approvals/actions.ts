'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { voteSpendApproval } from '@/lib/api';
import { requireSession } from '@/lib/auth';

export async function approveSpendAction(formData: FormData): Promise<void> {
  await requireSession();
  const agentId = String(formData.get('agent_id') ?? '');
  const requestId = String(formData.get('request_id') ?? '');

  if (!agentId || !requestId) {
    redirect('/approvals?error=Missing+approval+request');
  }

  try {
    const result = await voteSpendApproval(agentId, requestId);
    revalidatePath('/approvals');

    if (result.status === 'APPROVED') {
      redirect(
        `/approvals?ok=${encodeURIComponent(`Approved — execution resumed for intent ${result.intent_id ?? 'unknown'}.`)}`,
      );
    }

    redirect(
      `/approvals?ok=${encodeURIComponent(
        `Vote recorded (${result.approval_count}/${result.required_approvers} approvers).`,
      )}`,
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Approval failed';
    redirect(`/approvals?error=${encodeURIComponent(message)}`);
  }
}
