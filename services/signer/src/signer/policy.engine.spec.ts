import { describe, expect, it } from 'vitest';
import { PolicyEngine, type PolicyContext, type KeyPolicy } from './policy.engine.js';
import { isSalyChainError } from '@salychain/errors';

const baseContext: PolicyContext = {
  destinationChain: 'BASE',
  destinationAddress: '0x1234567890abcdef1234567890abcdef12345678',
  amountMinor: 1_000_000n, // 1 USDC
  assetSymbol: 'USDC',
};

const unlimited: KeyPolicy = {
  destinationAllowlist: ['*'],
  perTxCapMinor: null,
  dailyCapMinor: null,
  approvalThresholdMinor: null,
  requiredApprovers: 0,
};

describe('PolicyEngine', () => {
  const engine = new PolicyEngine();

  it('allows everything under the wildcard / unlimited policy', () => {
    expect(() =>
      engine.evaluate({ policy: unlimited, context: baseContext, rolling24hSpentMinor: 0n, approvers: 0 }),
    ).not.toThrow();
  });

  it('denies destinations not in the allowlist', () => {
    expect(() =>
      engine.evaluate({
        policy: { ...unlimited, destinationAllowlist: ['0xaaaa'] },
        context: baseContext,
        rolling24hSpentMinor: 0n,
        approvers: 0,
      }),
    ).toSatisfy(throws('signer.policy.destination_not_allowed'));
  });

  it('denies when the allowlist is empty (fail closed)', () => {
    expect(() =>
      engine.evaluate({
        policy: { ...unlimited, destinationAllowlist: [] },
        context: baseContext,
        rolling24hSpentMinor: 0n,
        approvers: 0,
      }),
    ).toSatisfy(throws('signer.policy.destination_allowlist_empty'));
  });

  it('enforces per-tx caps', () => {
    expect(() =>
      engine.evaluate({
        policy: { ...unlimited, perTxCapMinor: 500_000n },
        context: baseContext,
        rolling24hSpentMinor: 0n,
        approvers: 0,
      }),
    ).toSatisfy(throws('signer.policy.per_tx_cap_exceeded'));
  });

  it('enforces rolling daily caps', () => {
    expect(() =>
      engine.evaluate({
        policy: { ...unlimited, dailyCapMinor: 1_500_000n },
        context: baseContext,
        rolling24hSpentMinor: 800_000n,
        approvers: 0,
      }),
    ).toSatisfy(throws('signer.policy.daily_cap_exceeded'));
  });

  it('requires approvals above the threshold', () => {
    const policy: KeyPolicy = { ...unlimited, approvalThresholdMinor: 500_000n, requiredApprovers: 2 };
    expect(() =>
      engine.evaluate({ policy, context: baseContext, rolling24hSpentMinor: 0n, approvers: 1 }),
    ).toSatisfy(throws('signer.policy.approvals_required'));
    expect(() =>
      engine.evaluate({ policy, context: baseContext, rolling24hSpentMinor: 0n, approvers: 2 }),
    ).not.toThrow();
  });

  it('allows amounts at the per-tx cap exactly', () => {
    expect(() =>
      engine.evaluate({
        policy: { ...unlimited, perTxCapMinor: 1_000_000n },
        context: baseContext,
        rolling24hSpentMinor: 0n,
        approvers: 0,
      }),
    ).not.toThrow();
  });

  it('treats the daily cap as a hard upper bound including the incoming amount', () => {
    expect(() =>
      engine.evaluate({
        policy: { ...unlimited, dailyCapMinor: 1_000_000n },
        context: baseContext,
        rolling24hSpentMinor: 0n,
        approvers: 0,
      }),
    ).not.toThrow();
  });
});

function throws(code: string) {
  return (fn: () => unknown) => {
    try {
      fn();
      return false;
    } catch (err) {
      return isSalyChainError(err) && err.code === code;
    }
  };
}
