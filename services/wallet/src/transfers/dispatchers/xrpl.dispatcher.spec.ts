import { describe, expect, it, vi } from 'vitest';
import { XrplDispatcher } from './xrpl.dispatcher.js';

const issuer = 'rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq';

function mockWallet(overrides: Record<string, unknown> = {}) {
  return {
    id: 'wallet-1',
    address: 'rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe',
    signerKeyRef: 'signer:1',
    chain: 'XRPL',
    ...overrides,
  } as never;
}

function mockJob(overrides: Record<string, unknown> = {}) {
  return {
    id: 'job-1',
    asset: 'XRP',
    amountMinor: 1_000_000n,
    destinationAddress: 'rEb8TK3gBgk5auZkwc6sHnwrGVJH8DuaLh',
    memo: null,
    destinationTag: null,
    iouIssuer: null,
    ...overrides,
  } as never;
}

describe('XrplDispatcher', () => {
  it('dispatches native XRP payments', async () => {
    const xrpl = {
      prepareTransfer: vi.fn().mockResolvedValue({
        unsignedBlob: 'AA',
        sequence: 1,
      }),
      broadcast: vi.fn().mockResolvedValue({ txHash: 'TX_XRP', engineResult: 'tesSUCCESS' }),
    };
    const signer = {
      sign: vi.fn().mockResolvedValue({ signed_tx: '0xBB' }),
    };
    const policyService = {
      loadForBroadcast: vi.fn().mockResolvedValue({
        policy: {
          destinationAllowlist: ['*'],
          trustedIssuerAllowlist: [],
          perTxCapMinor: 0n,
          dailyCapMinor: 0n,
          approvalThresholdMinor: 0n,
          requiredApprovers: 0,
        },
        rolling24hSpentMinor: 0n,
        approvers: 0,
      }),
    };

    const dispatcher = new XrplDispatcher(xrpl as never, signer as never, policyService as never);
    const result = await dispatcher.dispatch(mockWallet(), mockJob());

    expect(result.txHash).toBe('TX_XRP');
    expect(xrpl.prepareTransfer).toHaveBeenCalledOnce();
    expect(signer.sign).toHaveBeenCalledOnce();
  });

  it('rejects IOU when issuer is not trusted', async () => {
    const xrpl = {
      hasTrustLine: vi.fn(),
      prepareTrustSet: vi.fn(),
      prepareIouPayment: vi.fn(),
      broadcast: vi.fn(),
    };
    const signer = { sign: vi.fn() };
    const policyService = {
      loadForBroadcast: vi.fn().mockResolvedValue({
        policy: {
          destinationAllowlist: ['*'],
          trustedIssuerAllowlist: [],
          perTxCapMinor: 0n,
          dailyCapMinor: 0n,
          approvalThresholdMinor: 0n,
          requiredApprovers: 0,
        },
        rolling24hSpentMinor: 0n,
        approvers: 0,
      }),
    };

    const dispatcher = new XrplDispatcher(xrpl as never, signer as never, policyService as never);
    await expect(
      dispatcher.dispatch(
        mockWallet(),
        mockJob({ asset: 'USD', iouIssuer: issuer, amountMinor: 100n }),
      ),
    ).rejects.toMatchObject({ code: 'wallet.xrpl.issuer_not_trusted' });
  });

  it('establishes trust line then sends IOU payment', async () => {
    const xrpl = {
      hasTrustLine: vi.fn().mockResolvedValue(false),
      prepareTrustSet: vi.fn().mockResolvedValue({ unsignedBlob: 'TRUST', sequence: 2 }),
      prepareIouPayment: vi.fn().mockResolvedValue({ unsignedBlob: 'PAY', sequence: 3 }),
      broadcast: vi
        .fn()
        .mockResolvedValueOnce({ txHash: 'TX_TRUST', engineResult: 'tesSUCCESS' })
        .mockResolvedValueOnce({ txHash: 'TX_IOU', engineResult: 'tesSUCCESS' }),
    };
    const signer = { sign: vi.fn().mockResolvedValue({ signed_tx: '0xCC' }) };
    const policyService = {
      loadForBroadcast: vi.fn().mockResolvedValue({
        policy: {
          destinationAllowlist: ['*'],
          trustedIssuerAllowlist: [`USD:${issuer}`],
          perTxCapMinor: 0n,
          dailyCapMinor: 0n,
          approvalThresholdMinor: 0n,
          requiredApprovers: 0,
        },
        rolling24hSpentMinor: 0n,
        approvers: 0,
      }),
    };

    const dispatcher = new XrplDispatcher(xrpl as never, signer as never, policyService as never);
    const result = await dispatcher.dispatch(
      mockWallet(),
      mockJob({ asset: 'USD', iouIssuer: issuer, amountMinor: 1234n }),
    );

    expect(result.txHash).toBe('TX_IOU');
    expect(xrpl.prepareTrustSet).toHaveBeenCalledOnce();
    expect(xrpl.prepareIouPayment).toHaveBeenCalledOnce();
    expect(signer.sign).toHaveBeenCalledTimes(2);
  });

  it('rejects unsupported assets', async () => {
    const dispatcher = new XrplDispatcher({} as never, {} as never, {
      loadForBroadcast: vi.fn(),
    } as never);

    await expect(
      dispatcher.dispatch(mockWallet(), mockJob({ asset: 'USDC' })),
    ).rejects.toMatchObject({ code: 'wallet.xrpl.asset_unsupported' });
  });
});
