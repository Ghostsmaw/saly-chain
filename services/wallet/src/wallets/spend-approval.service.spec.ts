import { describe, expect, it, vi } from 'vitest';
import type { BroadcastJob, Wallet } from '../generated/prisma/index.js';
import { SpendApprovalService } from './spend-approval.service.js';

describe('SpendApprovalService', () => {
  const wallet = {
    id: 'wallet-1',
    kind: 'AGENT_CUSTODIAL',
    ownerId: 'agt_01TEST',
  } as Wallet;

  const job = {
    amountMinor: 10_000_000n,
    intentId: 'itn_01TEST',
  } as BroadcastJob;

  const policy = {
    approvalThresholdMinor: 5_000_000n,
    requiredApprovers: 2,
  };

  it('returns zero when approval threshold is not exceeded', async () => {
    const agents = { getSpendApprovalByIntent: vi.fn() };
    const svc = new SpendApprovalService(agents as never);
    const count = await svc.resolveApproversForJob(wallet, { ...job, amountMinor: 1_000n }, policy);
    expect(count).toBe(0);
    expect(agents.getSpendApprovalByIntent).not.toHaveBeenCalled();
  });

  it('returns approval count when intent is approved', async () => {
    const agents = {
      getSpendApprovalByIntent: vi.fn().mockResolvedValue({
        status: 'APPROVED',
        approval_count: 2,
      }),
    };
    const svc = new SpendApprovalService(agents as never);
    const count = await svc.resolveApproversForJob(wallet, job, policy);
    expect(count).toBe(2);
    expect(agents.getSpendApprovalByIntent).toHaveBeenCalledWith('agt_01TEST', 'itn_01TEST');
  });

  it('returns zero when approval is still pending', async () => {
    const agents = {
      getSpendApprovalByIntent: vi.fn().mockResolvedValue({
        status: 'PENDING',
        approval_count: 1,
      }),
    };
    const svc = new SpendApprovalService(agents as never);
    const count = await svc.resolveApproversForJob(wallet, job, policy);
    expect(count).toBe(0);
  });
});
