import { describe, expect, it } from 'vitest';
import { decodeFunctionData } from 'viem';
import { L1_STANDARD_BRIDGE_DEPOSIT_ABI } from './bridge-abi.js';
import { encodeDepositErc20To } from './bridge.js';

const L1 = '0x1111111111111111111111111111111111111111' as const;
const L2 = '0x2222222222222222222222222222222222222222' as const;
const RECIPIENT = '0x3333333333333333333333333333333333333333' as const;

describe('encodeDepositErc20To', () => {
  it('encodes depositERC20To calldata for L1StandardBridge', () => {
    const data = encodeDepositErc20To({
      l1Token: L1,
      l2Token: L2,
      l2Recipient: RECIPIENT,
      amountMinor: 1_000_000n,
    });
    expect(data.startsWith('0x')).toBe(true);
    const decoded = decodeFunctionData({ abi: L1_STANDARD_BRIDGE_DEPOSIT_ABI, data });
    expect(decoded.functionName).toBe('depositERC20To');
    expect(decoded.args[0]).toBe(L1);
    expect(decoded.args[1]).toBe(L2);
    expect(decoded.args[2]).toBe(RECIPIENT);
    expect(decoded.args[3]).toBe(1_000_000n);
  });
});
