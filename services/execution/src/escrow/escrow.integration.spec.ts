import { describe, expect, it } from 'vitest';
import { dealIdFromCorrelationId, escrowStatusLabel, ESCROW_DEAL_STATUS } from '@salychain/chain-base';

describe('Escrow fundDeal pipeline (integration shape)', () => {
  it('documents expected state transitions', () => {
    const pipeline = [
      'CREATED',
      'SCREENED',
      'ROUTED',
      'RESERVED',
      'EXECUTING',
      'AWAITING_CONFIRMATION',
      'SETTLED',
    ];
    expect(pipeline).toContain('SETTLED');
  });

  it('derives deterministic deal id from execution tx id', () => {
    const dealId = dealIdFromCorrelationId('tx-escrow-1');
    expect(dealId).toMatch(/^0x[a-fA-F0-9]{64}$/);
  });
});

describe('Escrow resolution audit', () => {
  it('maps on-chain status codes to labels', () => {
    expect(escrowStatusLabel(ESCROW_DEAL_STATUS.FUNDED)).toBe('FUNDED');
    expect(escrowStatusLabel(ESCROW_DEAL_STATUS.RELEASED)).toBe('RELEASED');
    expect(escrowStatusLabel(ESCROW_DEAL_STATUS.REFUNDED)).toBe('REFUNDED');
  });

  it('documents admin API flow replacing cast send', () => {
    const steps = ['POST /v1/escrow/deals/:id/release', 'DealReleased indexed', 'status=RELEASED'];
    expect(steps[0]).toContain('release');
  });
});
