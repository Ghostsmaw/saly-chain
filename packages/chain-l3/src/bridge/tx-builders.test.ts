import { describe, expect, it } from 'vitest';
import { decodeFunctionData } from 'viem';
import { L1_STANDARD_BRIDGE_ABI, L2_STANDARD_BRIDGE_ABI } from '../contracts.js';
import { encodeDepositErc20To, encodeWithdrawTo } from './tx-builders.js';

const L1 = '0x1111111111111111111111111111111111111111' as const;
const L2 = '0x2222222222222222222222222222222222222222' as const;
const RECIPIENT = '0x3333333333333333333333333333333333333333' as const;

describe('bridge tx builders', () => {
  it('encodes depositERC20To calldata', () => {
    const data = encodeDepositErc20To({
      l1Token: L1,
      l2Token: L2,
      l2Recipient: RECIPIENT,
      amountMinor: 1_000_000n,
    });
    const decoded = decodeFunctionData({ abi: L1_STANDARD_BRIDGE_ABI, data });
    expect(decoded.functionName).toBe('depositERC20To');
    expect(decoded.args[2]).toBe(RECIPIENT);
    expect(decoded.args[3]).toBe(1_000_000n);
  });

  it('encodes withdrawTo calldata', () => {
    const data = encodeWithdrawTo({
      l2Token: L2,
      l1Recipient: RECIPIENT,
      amountMinor: 2_000_000n,
    });
    const decoded = decodeFunctionData({ abi: L2_STANDARD_BRIDGE_ABI, data });
    expect(decoded.functionName).toBe('withdrawTo');
    expect(decoded.args[1]).toBe(RECIPIENT);
    expect(decoded.args[2]).toBe(2_000_000n);
  });
});
