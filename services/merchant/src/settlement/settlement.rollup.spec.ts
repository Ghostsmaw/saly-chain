import { describe, expect, it } from 'vitest';
import { rollupSettlement } from './settlement.rollup.js';

describe('rollupSettlement', () => {
  it('sums settled FIAT pay-ins in the period', () => {
    const result = rollupSettlement(
      [
        {
          id: 'tx-1',
          amount_minor: '1000',
          currency: 'NGN',
          settled_at: '2026-06-15T12:00:00.000Z',
        },
        {
          id: 'tx-2',
          amount_minor: '2500',
          currency: 'NGN',
          settled_at: '2026-06-20T12:00:00.000Z',
        },
        {
          id: 'tx-3',
          amount_minor: '500',
          currency: 'NGN',
          settled_at: '2026-07-01T12:00:00.000Z',
        },
      ],
      new Date('2026-06-01T00:00:00.000Z'),
      new Date('2026-06-30T23:59:59.999Z'),
      'NGN',
    );

    expect(result.transaction_count).toBe(2);
    expect(result.total_settled_minor).toBe('3500');
  });

  it('includes merchant metadata when present', () => {
    const result = rollupSettlement(
      [
        {
          id: 'tx-1',
          amount_minor: '1000',
          currency: 'NGN',
          settled_at: '2026-06-15T12:00:00.000Z',
          metadata: {
            merchant: { checkout_session_id: 'sess-1', payment_link_id: 'link-1' },
            payin: { customer_name: 'Ada Lovelace' },
          },
        },
      ],
      new Date('2026-06-01T00:00:00.000Z'),
      new Date('2026-06-30T23:59:59.999Z'),
    );

    expect(result.lines[0]).toMatchObject({
      transaction_id: 'tx-1',
      checkout_session_id: 'sess-1',
      payment_link_id: 'link-1',
      customer_name: 'Ada Lovelace',
    });
  });
});
