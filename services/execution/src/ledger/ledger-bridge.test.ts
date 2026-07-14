import { describe, expect, it } from 'vitest';
import {
  bridgeCustodyAssetAccountCode,
  pendingBridgeLiabilityAccountCode,
} from './ledger-reservation.service.js';

describe('bridge ledger account codes', () => {
  it('uses stable bridge pending liability codes', () => {
    expect(pendingBridgeLiabilityAccountCode('base_to_l3', 'USDC')).toBe(
      'liability.pending.bridge.base_to_l3.usdc',
    );
    expect(pendingBridgeLiabilityAccountCode('l3_to_base', 'USDC')).toBe(
      'liability.pending.bridge.l3_to_base.usdc',
    );
  });

  it('uses stable bridge custody asset codes', () => {
    expect(bridgeCustodyAssetAccountCode('base', 'USDC')).toBe('asset.custody.bridge.base.usdc');
    expect(bridgeCustodyAssetAccountCode('l3', 'USDC')).toBe('asset.custody.bridge.l3.usdc');
  });
});
