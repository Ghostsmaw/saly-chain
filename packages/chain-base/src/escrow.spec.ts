import { describe, expect, it } from 'vitest';
import { dealIdFromCorrelationId } from './escrow.js';

describe('dealIdFromCorrelationId', () => {
  it('returns a deterministic 32-byte hex id', () => {
    const a = dealIdFromCorrelationId('tx-abc-123');
    const b = dealIdFromCorrelationId('tx-abc-123');
    expect(a).toBe(b);
    expect(a).toMatch(/^0x[0-9a-f]{64}$/);
  });

  it('differs for different correlation ids', () => {
    const a = dealIdFromCorrelationId('tx-1');
    const b = dealIdFromCorrelationId('tx-2');
    expect(a).not.toBe(b);
  });
});
