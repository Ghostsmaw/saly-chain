'use server';

import { revalidatePath } from 'next/cache';
import { proposeContractStatus } from '@/lib/api';
import { requireSession } from '@/lib/auth';

export async function proposeContractStatusAction(
  contractId: string,
  action: 'pause' | 'resume',
): Promise<{ ok: true; message: string; status: string } | { ok: false; error: string }> {
  const session = await requireSession();
  try {
    const actor = session.email.split('@')[0] ?? session.userId;
    const res = await proposeContractStatus(contractId, action, actor);
    revalidatePath('/contracts');
    return { ok: true, message: res.message, status: res.status };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to submit proposal';
    return { ok: false, error: message };
  }
}
