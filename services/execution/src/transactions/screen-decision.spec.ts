import { describe, expect, it } from 'vitest';

type Decision = 'ALLOW' | 'REVIEW' | 'BLOCK';

/**
 * Pure decision matrix for screenDirectMoneyMovement / intent pipeline.
 * Keep aligned with transactions.service.ts screening branches.
 */
function resolveMoneyScreen(
  compliance: Decision,
  risk: Decision,
): 'REJECTED' | 'AWAITING_APPROVAL' | 'SCREENED' {
  if (compliance === 'BLOCK' || risk === 'BLOCK') return 'REJECTED';
  if (compliance === 'REVIEW' || risk === 'REVIEW') return 'AWAITING_APPROVAL';
  return 'SCREENED';
}

describe('direct money screening decision matrix', () => {
  it('blocks when compliance or risk says BLOCK', () => {
    expect(resolveMoneyScreen('BLOCK', 'ALLOW')).toBe('REJECTED');
    expect(resolveMoneyScreen('ALLOW', 'BLOCK')).toBe('REJECTED');
  });

  it('holds funds on REVIEW (hard hold, not soft continue)', () => {
    expect(resolveMoneyScreen('REVIEW', 'ALLOW')).toBe('AWAITING_APPROVAL');
    expect(resolveMoneyScreen('ALLOW', 'REVIEW')).toBe('AWAITING_APPROVAL');
    expect(resolveMoneyScreen('REVIEW', 'REVIEW')).toBe('AWAITING_APPROVAL');
  });

  it('screens clean when both ALLOW', () => {
    expect(resolveMoneyScreen('ALLOW', 'ALLOW')).toBe('SCREENED');
  });
});

describe('FX quote consume-before-settle ordering', () => {
  it('never posts to the ledger if quote consume fails', async () => {
    const calls: string[] = [];
    const liquidity = {
      consume: async () => {
        calls.push('consume');
        throw new Error('quote_already_consumed');
      },
    };
    const ledger = {
      post: async () => {
        calls.push('ledger_post');
      },
    };

    async function settleSwap() {
      await liquidity.consume();
      await ledger.post();
    }

    await expect(settleSwap()).rejects.toThrow(/quote_already_consumed/);
    expect(calls).toEqual(['consume']);
  });

  it('consumes the quote before any ledger post on the happy path', async () => {
    const calls: string[] = [];
    const liquidity = {
      consume: async () => {
        calls.push('consume');
      },
    };
    const ledger = {
      post: async () => {
        calls.push('ledger_post');
      },
    };

    await liquidity.consume();
    await ledger.post();
    expect(calls).toEqual(['consume', 'ledger_post']);
    expect(calls.indexOf('consume')).toBeLessThan(calls.indexOf('ledger_post'));
  });
});
