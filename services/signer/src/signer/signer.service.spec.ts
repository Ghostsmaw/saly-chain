import { describe, expect, it, vi, beforeEach } from 'vitest';
import { serializeTransaction, type Hex } from 'viem';
import { isSalyChainError } from '@salychain/errors';
import { SignerService } from './signer.service.js';
import { PolicyEngine } from './policy.engine.js';

function throws(code: string) {
  return (err: unknown) => isSalyChainError(err) && err.code === code;
}

const DEST = '0x1234567890abcdef1234567890abcdef12345678';
const AMOUNT = 1_000_000n;

function nativeUnsigned(to: string, value: bigint): string {
  return serializeTransaction({
    chainId: 8453,
    type: 'eip1559',
    to: to as Hex,
    value,
    data: '0x',
    nonce: 0,
    maxFeePerGas: 1n,
    maxPriorityFeePerGas: 1n,
    gas: 21_000n,
  });
}

describe('SignerService.sign — policy + tx-bind before KMS', () => {
  const key = {
    keyRef: 'kms:test:1',
    chain: 'BASE' as const,
    publicAddress: DEST,
    wrappedPrivateKey: Buffer.from('wrapped'),
    wrappingKeyRef: 'local',
    status: 'ACTIVE' as const,
    label: null,
    id: 'k1',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  let kmsDecrypt: ReturnType<typeof vi.fn>;
  let recordCalls: unknown[];
  let service: SignerService;

  beforeEach(() => {
    kmsDecrypt = vi.fn(async () => Buffer.from('00'.repeat(32), 'hex'));
    recordCalls = [];
    const prisma = {
      signRequest: {
        findUnique: vi.fn(async () => null),
        create: vi.fn(async ({ data }: { data: unknown }) => {
          recordCalls.push(data);
          return data;
        }),
      },
      signerKey: {
        findUnique: vi.fn(async () => key),
      },
    };
    const kms = {
      name: 'local',
      wrappingKeyRef: 'local',
      encrypt: vi.fn(),
      decrypt: kmsDecrypt,
    };
    service = new SignerService(prisma as never, kms as never, new PolicyEngine());
  });

  const baseDto = {
    idempotency_key: 'idem-1',
    signer_key_ref: key.keyRef,
    chain: 'BASE' as const,
    unsigned_tx: nativeUnsigned(DEST, AMOUNT),
    policy: {
      destination_allowlist: [DEST],
      per_tx_cap_minor: null,
      daily_cap_minor: null,
      approval_threshold_minor: null,
      required_approvers: 0,
    },
    policy_context: {
      destination_chain: 'BASE' as const,
      destination_address: DEST,
      amount_minor: AMOUNT.toString(),
      asset_symbol: 'ETH',
    },
  };

  it('rejects missing policy without touching KMS', async () => {
    const { policy: _p, ...withoutPolicy } = baseDto;
    await expect(service.sign(withoutPolicy as never)).rejects.toSatisfy(throws('signer.policy.required'));
    expect(kmsDecrypt).not.toHaveBeenCalled();
  });

  it('rejects destination not on allowlist without touching KMS', async () => {
    await expect(
      service.sign({
        ...baseDto,
        policy: { ...baseDto.policy, destination_allowlist: ['0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'] },
      }),
    ).rejects.toSatisfy(throws('signer.policy.destination_not_allowed'));
    expect(kmsDecrypt).not.toHaveBeenCalled();
  });

  it('rejects unsigned tx that does not match policy context without touching KMS', async () => {
    await expect(
      service.sign({
        ...baseDto,
        unsigned_tx: nativeUnsigned('0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', AMOUNT),
      }),
    ).rejects.toSatisfy(throws('signer.tx_bind.destination_mismatch'));
    expect(kmsDecrypt).not.toHaveBeenCalled();
  });

  it('rejects empty allowlist (fail closed) without touching KMS', async () => {
    await expect(
      service.sign({
        ...baseDto,
        policy: { ...baseDto.policy, destination_allowlist: [] },
      }),
    ).rejects.toSatisfy(throws('signer.policy.destination_allowlist_empty'));
    expect(kmsDecrypt).not.toHaveBeenCalled();
  });
});
