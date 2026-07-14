import { describe, expect, it } from 'vitest';
import { isRpcMethodAllowed, BLOCKED_RPC_METHODS } from './rpc-policy.js';

describe('rpc-policy', () => {
  it('allows read-only eth methods', () => {
    expect(isRpcMethodAllowed('eth_getBlockByNumber')).toBe(true);
    expect(isRpcMethodAllowed('eth_call')).toBe(true);
  });

  it('blocks transaction submission and admin methods', () => {
    for (const m of BLOCKED_RPC_METHODS) {
      expect(isRpcMethodAllowed(m)).toBe(false);
    }
  });
});
