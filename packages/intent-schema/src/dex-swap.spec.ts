import { describe, expect, it } from 'vitest';
import { parseIntent, safeParseIntent } from './index.js';

const ITN = 'itn_01ARZ3NDEKTSV4RRFFQ69G5FAV';
const BIZ = 'biz_01ARZ3NDEKTSV4RRFFQ69G5FAW';

describe('on-chain DEX SWAP intents', () => {
  it('accepts valid onchain USDC→WETH swap', () => {
    const intent = parseIntent({
      version: '1',
      intent_id: ITN,
      kind: 'SWAP',
      actor: { type: 'BUSINESS', id: BIZ },
      source: {
        amount: { amount_minor: '1000000', currency: 'USDC' },
      },
      destination: {
        currency: 'WETH',
        beneficiary: {
          kind: 'WALLET',
          chain: 'BASE',
          address: '0x1234567890123456789012345678901234567890',
        },
      },
      constraints: { swap_execution: 'onchain', max_slippage_bps: 100 },
      metadata: { source_wallet_id: 'wallet-uuid-12345678' },
    });
    expect(intent.constraints?.swap_execution).toBe('onchain');
  });

  it('rejects onchain swap with ledger account_ref', () => {
    const result = safeParseIntent({
      version: '1',
      intent_id: ITN,
      kind: 'SWAP',
      actor: { type: 'BUSINESS', id: BIZ },
      source: {
        account_ref: 'acc_123',
        amount: { amount_minor: '1000000', currency: 'USDC' },
      },
      destination: {
        currency: 'WETH',
        beneficiary: {
          kind: 'WALLET',
          chain: 'BASE',
          address: '0x1234567890123456789012345678901234567890',
        },
      },
      constraints: { swap_execution: 'onchain' },
      metadata: { source_wallet_id: 'wallet-uuid-12345678' },
    });
    expect(result.success).toBe(false);
  });
});
