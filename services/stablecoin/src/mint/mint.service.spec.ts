import { describe, expect, it, vi } from 'vitest';
import { MintService } from './mint.service.js';
import { runWithTenant } from '@salychain/sdk-internal';

describe('MintService', () => {
  const reserve = {
    id: '11111111-1111-1111-1111-111111111111',
    balanceMinor: 1_000_000n,
    authorizedCeilingMinor: 10_000_000n,
    asOf: new Date(),
  };

  const events = { publish: vi.fn() };
  const execution = { salysdMint: vi.fn() };
  const env = {
    STABLECOIN_DEFAULT_RESERVE_ACCOUNT_ID: undefined,
    STABLECOIN_ATTESTATION_MAX_AGE_MS: 86_400_000,
  };

  const prisma = {
    mintRequest: {
      findUnique: vi.fn(),
      create: vi.fn(async ({ data }: { data: Record<string, unknown> }) => ({
        id: 'mint_1',
        orgId: data.orgId,
        chain: data.chain ?? 'SALY_L3',
        amountMinor: data.amountMinor,
        ...data,
      })),
    },
    reserveAccount: {
      findUnique: vi.fn(async () => reserve),
    },
  };

  const svc = new MintService(prisma as never, events as never, execution as never, env as never);

  it('rejects mint without org context', async () => {
    await expect(
      svc.create({
        idempotency_key: 'k1',
        amount_minor: '100',
        destination_wallet_id: 'wal_1',
        reserve_account_id: reserve.id,
      }),
    ).rejects.toThrow(/Org context required/);
  });

  it('rejects mint exceeding reserve headroom', async () => {
    await expect(
      runWithTenant({ orgId: 'org_a' }, () =>
        svc.create({
          idempotency_key: 'k2',
          amount_minor: '9500000',
          destination_wallet_id: 'wal_1',
          reserve_account_id: reserve.id,
        }),
      ),
    ).rejects.toThrow(/headroom/);
  });

  it('creates mint request within headroom', async () => {
    const row = await runWithTenant({ orgId: 'org_a' }, () =>
      svc.create({
        idempotency_key: 'k3',
        amount_minor: '500000',
        destination_wallet_id: 'wal_1',
        reserve_account_id: reserve.id,
      }),
    );
    expect(row.id).toBe('mint_1');
    expect(events.publish).toHaveBeenCalled();
  });
});
