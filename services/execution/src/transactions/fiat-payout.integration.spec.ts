import { describe, expect, it } from 'vitest';
import { extractFiatDetail } from './fiat-settle.js';
import {
  fiatCustodyAssetAccountCode,
  pendingFiatLiabilityAccountCode,
} from '../ledger/ledger-reservation.service.js';

describe('Fiat payout detail extraction', () => {
  it('reads fiat bundle from execution events', () => {
    const detail = extractFiatDetail([
      { detail: { fiat: { psp_id: 'TRF_abc', rail: 'NIP', status: 'PROCESSING' } } },
      { detail: { route: { selected: 'FIAT' } } },
    ]);
    expect(detail?.psp_id).toBe('TRF_abc');
    expect(detail?.rail).toBe('NIP');
  });
});

describe('Fiat payout pipeline (integration shape)', () => {
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
    expect(pipeline).toContain('RESERVED');
    expect(pipeline[pipeline.length - 1]).toBe('SETTLED');
  });

  it('maps NGN ledger account codes', () => {
    expect(pendingFiatLiabilityAccountCode('NGN')).toBe('liability.pending.fiat.ngn');
    expect(fiatCustodyAssetAccountCode('NGN')).toBe('asset.custody.fiat.ngn');
  });
});
